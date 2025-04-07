use actix_cors::Cors;
use actix_web::{App, HttpResponse, HttpServer, Responder, get, post, web};
use bcrypt;
use dotenv::dotenv;
use serde::{Deserialize, Serialize};
use sqlx::mysql::MySqlPool;
use std::env;

#[derive(Debug, Serialize, Deserialize, Clone)]
struct User {
    username: String,
    password_hash: String,
}

#[derive(Debug, Deserialize)]
struct RegisterRequest {
    username: String,
    password: String,
}

#[derive(Debug, Deserialize)]
struct LoginRequest {
    username: String,
    password: String,
}

#[derive(Debug, Serialize)]
struct ApiResponse {
    message: String,
}

struct AppState {
    db_pool: MySqlPool,
}

#[post("/register")]
async fn register(
    data: web::Data<AppState>,
    user_data: web::Json<RegisterRequest>,
) -> impl Responder {
    let pool = &data.db_pool;

    // 检查用户是否已经存在
    let exists: (bool,) = sqlx::query_as("SELECT EXISTS(SELECT 1 FROM users WHERE username = ?)")
        .bind(&user_data.username)
        .fetch_one(pool)
        .await
        .unwrap();

    if exists.0 {
        return HttpResponse::BadRequest().json(ApiResponse {
            message: "用户名已经存在".to_string(),
        });
    }

    // 哈希密码
    let password_hash = match bcrypt::hash(&user_data.password, bcrypt::DEFAULT_COST) {
        Ok(hash) => hash,
        Err(_) => {
            return HttpResponse::InternalServerError().json(ApiResponse {
                message: "对密码的哈希处理失败".to_string(),
            });
        }
    };

    // 将用户信息插入数据库
    sqlx::query("INSERT INTO users (username, pwd) VALUES (?, ?)")
        .bind(&user_data.username)
        .bind(&password_hash)
        .execute(pool)
        .await
        .unwrap();

    HttpResponse::Ok().json(ApiResponse {
        message: "注册成功".to_string(),
    })
}

#[post("/login")]
async fn login(data: web::Data<AppState>, login_data: web::Json<LoginRequest>) -> impl Responder {
    let pool = &data.db_pool;

    let user: Option<(String, String)> =
        sqlx::query_as("SELECT username, pwd FROM users WHERE username = ?")
            .bind(&login_data.username)
            .fetch_optional(pool)
            .await
            .unwrap();

    match user {
        Some((_, password_hash)) => {
            if bcrypt::verify(&login_data.password, &password_hash).unwrap_or(false) {
                HttpResponse::Ok().json(ApiResponse {
                    message: "登录成功".to_string(),
                })
            } else {
                HttpResponse::Unauthorized().json(ApiResponse {
                    message: "用户名或密码无效".to_string(),
                })
            }
        }
        None => HttpResponse::Unauthorized().json(ApiResponse {
            message: "用户名或密码无效".to_string(),
        }),
    }
}

#[get("/")]
async fn hello() -> impl Responder {
    HttpResponse::Ok().body("这是rust的后端喵")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok(); // 加载 .env 文件

    // 获取数据库连接池
    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let pool = MySqlPool::connect(&database_url).await.unwrap();

    // 创建应用状态
    let app_state = web::Data::new(AppState { db_pool: pool });

    println!("Starting server at http://localhost:3001");

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .app_data(app_state.clone())
            .service(hello)
            .service(register)
            .service(login)
    })
    .bind("127.0.0.1:3001")?
    .run()
    .await
}

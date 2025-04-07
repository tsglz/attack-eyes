import React, { useState } from 'react';
import { registerUser, loginUser } from '../services/api';
import axios from 'axios';

const Auth: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // 重置消息状态
        setErrorMessage(null);
        setSuccessMessage(null);
        
        try {
            if (isLogin) {
                const response = await loginUser(username, password);
                setSuccessMessage('登录成功！');
                console.log('登录响应:', response);
            } else {
                const response = await registerUser(username, password);
                setSuccessMessage('注册成功！');
                console.log('注册响应:', response);
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                // 提取详细错误信息
                const errorData = error.response?.data;
                let detailedError = '';
                
                if (typeof errorData === 'object' && errorData !== null) {
                    // 如果错误数据是对象，尝试提取message字段
                    if ('message' in errorData) {
                        detailedError = errorData.message as string;
                    } else {
                        // 否则将整个对象转换为字符串
                        detailedError = JSON.stringify(errorData);
                    }
                } else if (typeof errorData === 'string') {
                    // 如果错误数据是字符串，直接使用
                    detailedError = errorData;
                } else {
                    // 回退到错误消息
                    detailedError = error.message;
                }
                
                setErrorMessage(`操作失败：${detailedError}`);
                console.error('请求错误:', error.response);
            } else {
                setErrorMessage('操作失败，发生未知错误。');
                console.error('未知错误:', error);
            }
        }
    };

    return (
        <div className="auth-container" style={{ maxWidth: '400px', margin: '0 auto', padding: '20px' }}>
            <h2>{isLogin ? '登录' : '注册'}</h2>
            
            {errorMessage && (
                <div style={{ 
                    backgroundColor: '#ffebee', 
                    color: '#c62828', 
                    padding: '10px', 
                    borderRadius: '4px', 
                    marginBottom: '15px' 
                }}>
                    {errorMessage}
                </div>
            )}
            
            {successMessage && (
                <div style={{ 
                    backgroundColor: '#e8f5e9', 
                    color: '#2e7d32', 
                    padding: '10px', 
                    borderRadius: '4px', 
                    marginBottom: '15px' 
                }}>
                    {successMessage}
                </div>
            )}
            
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '5px' }}>用户名：</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <div style={{ marginBottom: '15px' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>密码：</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                    />
                </div>
                <button 
                    type="submit"
                    style={{ 
                        backgroundColor: '#1976d2', 
                        color: 'white', 
                        padding: '10px 15px', 
                        border: 'none', 
                        borderRadius: '4px', 
                        cursor: 'pointer',
                        marginRight: '10px'
                    }}
                >
                    {isLogin ? '登录' : '注册'}
                </button>
                <button 
                    type="button"
                    onClick={() => {
                        setIsLogin(!isLogin);
                        setErrorMessage(null);
                        setSuccessMessage(null);
                    }}
                    style={{ 
                        backgroundColor: '#f5f5f5', 
                        color: '#333', 
                        padding: '10px 15px', 
                        border: '1px solid #ccc', 
                        borderRadius: '4px', 
                        cursor: 'pointer' 
                    }}
                >
                    切换到{isLogin ? '注册' : '登录'}
                </button>
            </form>
        </div>
    );
};

export default Auth;
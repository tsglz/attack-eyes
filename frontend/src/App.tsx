import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import MindMap from "./components/MindMap";
import Auth from "./pages/Auth";

// 导航栏组件
const Navbar = () => (
  <nav className="App-header">
    <Link to="/">首页</Link> | <Link to="/about">关于</Link> |{" "}
    <Link to="/diagram">视图</Link> | <Link to="/auth">登录/注册</Link>
  </nav>
);

// 思维导图页面
const Diagram = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    }}
  >
    <h1 className="diagram-title">视图</h1>
    <p>点击节点跳转到对应页面</p>
    <br />
    <MindMap />
  </div>
);

// 主要 App 组件
function App() {
  return (
    <Router>
      <Navbar />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/diagram" element={<Diagram />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

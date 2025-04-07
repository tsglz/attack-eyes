import React, { useEffect } from "react";
import { Graph } from "@antv/x6";
import { useNavigate } from "react-router-dom";

const MindMap: React.FC = () => {
  const navigate = useNavigate();  // 获取 React Router 的导航方法

  useEffect(() => {
    const graph = new Graph({
      container: document.getElementById("mindmap")!,
      width: 800,
      height: 600,
      grid: true,
      interacting: { nodeMovable: true },
    });

    // 创建节点
    const node1 = graph.addNode({
      x: 100,
      y: 100,
      width: 100,
      height: 40,
      label: "首页",
      data: { link: "/" },  // 这里存放链接
    });

    const node2 = graph.addNode({
      x: 300,
      y: 100,
      width: 100,
      height: 40,
      label: "关于",
      data: { link: "/about" },
    });

    graph.addEdge({
      source: node1,
      target: node2,
      label: "跳转",
    });

    // 监听点击事件
    graph.on("node:click", ({ node }) => {
      const link = node.getData()?.link;
      if (link) {
        navigate(link);  // 使用 React Router 进行页面跳转
      }
    });

  }, [navigate]);

  return <div id="mindmap" className="border border-gray-300"></div>;
};

export default MindMap;

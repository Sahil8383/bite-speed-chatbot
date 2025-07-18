"use client";

import React, { useCallback, useRef, useState } from "react";
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  Connection,
  Edge,
  Node,
  NodeTypes,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  ReactFlowInstance,
} from "reactflow";
import "reactflow/dist/style.css";
import { TextNodeData } from "@/lib/types";
import { TextNode } from "./nodes/text-node";

const nodeTypes: NodeTypes = {
  textNode: TextNode,
};

const initialNodes: Node<TextNodeData>[] = [];
const initialEdges: Edge[] = [];

interface ChatbotFlowProps {
  onNodeClick: (event: React.MouseEvent, node: Node<TextNodeData>) => void;
  onPaneClick: () => void;
  onConnect: OnConnect;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onInit: (instance: ReactFlowInstance) => void;
  nodes: Node<TextNodeData>[];
  edges: Edge[];
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
}

const ChatbotFlow: React.FC<ChatbotFlowProps> = ({
  onNodeClick,
  onPaneClick,
  onConnect,
  onDrop,
  onDragOver,
  onInit,
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
}) => {
  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onInit={onInit}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        className="bg-gray-50"
        style={{ width: "100%", height: "100%" }}
      >
        <Background color="#f1f5f9" gap={20} />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default ChatbotFlow;

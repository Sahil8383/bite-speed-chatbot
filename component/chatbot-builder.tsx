"use client";

import React from "react";
import { useChatbotFlow } from "@/hooks";
import { ChatbotFlow, NodesPanel, Header } from "./flow";
import SettingsPanel from "./settings-panel";

const ChatbotFlowBuilder: React.FC = () => {
  const {
    nodes,
    edges,
    selectedNode,
    errorMessage,
    reactFlowWrapper,
    onNodesChange,
    onEdgesChange,
    onNodeClick,
    onConnect,
    onDragStart,
    onDragOver,
    onDrop,
    updateNode,
    validateAndSave,
    closeSettingsPanel,
    onPaneClick,
    setReactFlowInstance,
  } = useChatbotFlow();

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {selectedNode ? (
        <SettingsPanel
          selectedNode={selectedNode}
          onUpdateNode={updateNode}
          onClose={closeSettingsPanel}
        />
      ) : (
        <NodesPanel onDragStart={onDragStart} />
      )}

      <div className="flex-1 flex flex-col min-h-0">
        <Header onSave={validateAndSave} errorMessage={errorMessage} />

        <div className="flex-1 min-h-0" ref={reactFlowWrapper}>
          <ChatbotFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
          />
        </div>
      </div>
    </div>
  );
};

export default ChatbotFlowBuilder;

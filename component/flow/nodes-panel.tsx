import React from "react";
import { NodeTypeConfig } from "@/lib/types";

interface NodesPanelProps {
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => void;
}

const NodesPanel: React.FC<NodesPanelProps> = ({ onDragStart }) => {
  const nodeTypes: NodeTypeConfig[] = [
    {
      type: "textNode",
      label: "Message",
      icon: "💬",
      description: "Send a text message",
    },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Nodes Panel</h3>
      <div className="space-y-2">
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.type}
            className="flex items-center p-3 bg-blue-50 border border-blue-200 rounded-lg cursor-grab hover:bg-blue-100 transition-colors"
            draggable
            onDragStart={(event) => onDragStart(event, nodeType.type)}
          >
            <span className="text-2xl mr-3">{nodeType.icon}</span>
            <div>
              <div className="font-medium text-gray-800">{nodeType.label}</div>
              <div className="text-sm text-gray-600">
                {nodeType.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodesPanel;

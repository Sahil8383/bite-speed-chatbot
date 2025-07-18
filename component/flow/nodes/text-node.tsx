import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { TextNodeData } from "@/lib/types";

export const TextNode: React.FC<NodeProps<TextNodeData>> = ({
  data,
  selected,
}) => {
  return (
    <div
      className={`px-4 py-2 shadow-md rounded-md bg-white border-2 ${
        selected ? "border-blue-500" : "border-gray-200"
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-blue-500"
      />

      <div className="flex items-center">
        <div className="ml-2">
          <div className="text-xs font-bold text-gray-500 mb-1">
            💬 Send Message
          </div>
          <div className="text-sm text-gray-800 max-w-xs break-words">
            {data.message || "Click to edit message"}
          </div>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-blue-500"
      />
    </div>
  );
};

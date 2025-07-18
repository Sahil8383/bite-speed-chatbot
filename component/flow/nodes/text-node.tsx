import React from "react";
import { Handle, Position, NodeProps } from "reactflow";
import { TextNodeData } from "@/lib/types";
import { Facebook, MessageCircleMore } from "lucide-react";

export const TextNode: React.FC<NodeProps<TextNodeData>> = ({
  data,
  selected,
}) => {
  return (
    <div
      className={`shadow-md max-w-[200px] w-full rounded-md bg-white border-2 ${
        selected ? "border-blue-500" : "border-gray-200"
      } overflow-hidden`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-blue-500"
        style={{ top: "50%" }}
      />

      {/* Header Section */}
      <div className="bg-green-100 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm mr-2">
            <MessageCircleMore size={12} className="text-black" />
          </span>
          <span className="text-sm font-bold text-gray-800">Send Message</span>
        </div>
        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
          <span className="text-white text-xs">
            <Facebook size={12} className="text-white" />
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="px-3 py-2 bg-white">
        <div className="text-sm text-gray-800">
          {data.message || "Click to edit message"}
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-blue-500"
        style={{ top: "50%" }}
      />
    </div>
  );
};

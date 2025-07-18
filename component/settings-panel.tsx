import { TextNodeData } from "@/lib/types";
import { useState, useEffect } from "react";
import { Node } from "reactflow";

interface SettingsPanelProps {
  selectedNode: Node<TextNodeData> | null;
  onUpdateNode: (nodeId: string, newData: Partial<TextNodeData>) => void;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  selectedNode,
  onUpdateNode,
  onClose,
}) => {
  const [message, setMessage] = useState<string>(
    selectedNode?.data?.message || ""
  );

  useEffect(() => {
    setMessage(selectedNode?.data?.message || "");
  }, [selectedNode]);

  const handleSave = (): void => {
    if (selectedNode) {
      onUpdateNode(selectedNode.id, { message });
    }
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Settings Panel</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Message Text
          </label>
          <textarea
            value={message}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setMessage(e.target.value)
            }
            className="w-full text-black p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={4}
            placeholder="Enter your message here..."
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
        >
          Update Message
        </button>
      </div>
    </div>
  );
};

export default SettingsPanel;

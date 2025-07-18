import { Node } from "reactflow";

export interface TextNodeData {
  message: string;
}

export interface NodeTypeConfig {
  type: string;
  label: string;
  icon: string;
  description: string;
}

export interface NodesPanelProps {
  onDragStart: (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ) => void;
}

export interface SettingsPanelProps {
  selectedNode: Node<TextNodeData> | null;
  onUpdateNode: (nodeId: string, newData: Partial<TextNodeData>) => void;
  onClose: () => void;
}

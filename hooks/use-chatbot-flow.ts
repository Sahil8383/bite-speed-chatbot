import { useState, useCallback, useRef } from "react";
import {
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  ReactFlowInstance,
} from "reactflow";
import { TextNodeData } from "@/lib/types";
import { toast } from "sonner";

const initialNodes: Node<TextNodeData>[] = [];
const initialEdges: Edge[] = [];

export const useChatbotFlow = () => {
  const [nodes, setNodes, onNodesChange]: [
    Node<TextNodeData>[],
    any,
    OnNodesChange
  ] = useNodesState(initialNodes);

  const [edges, setEdges, onEdgesChange]: [Edge[], any, OnEdgesChange] =
    useEdgesState(initialEdges);

  const [selectedNode, setSelectedNode] = useState<Node<TextNodeData> | null>(
    null
  );

  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const nodeIdCounter = useRef<number>(0);

  // Handle node selection
  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node<TextNodeData>): void => {
      setSelectedNode(node);
    },
    []
  );

  // Handle connection creation with validation
  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      // Check if source handle already has a connection
      const sourceHasConnection = edges.some(
        (edge) =>
          edge.source === params.source &&
          edge.sourceHandle === params.sourceHandle
      );

      if (sourceHasConnection) {
        setErrorMessage("Source handle can only have one outgoing connection");
        setTimeout(() => setErrorMessage(""), 3000);
        return;
      }

      setEdges((eds: any) => addEdge(params, eds));
      setErrorMessage("");
    },
    [edges, setEdges]
  );

  // Handle drag start for nodes panel
  const onDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    nodeType: string
  ): void => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  // Handle drag over
  const onDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>): void => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    },
    []
  );

  // Handle drop to create new node
  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>): void => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (
        typeof type === "undefined" ||
        !type ||
        !reactFlowInstance ||
        !reactFlowBounds
      ) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node<TextNodeData> = {
        id: `node_${nodeIdCounter.current++}`,
        type,
        position,
        data: { message: `Text message ${nodeIdCounter.current}` },
      };

      setNodes((nds: any) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  // Update node data
  const updateNode = useCallback(
    (nodeId: string, newData: Partial<TextNodeData>): void => {
      setNodes((nds: any) =>
        nds.map((node: any) => {
          if (node.id === nodeId) {
            return {
              ...node,
              data: {
                ...node.data,
                ...newData,
              },
            };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  // Validate and save flow
  const validateAndSave = (): void => {
    if (nodes.length <= 1) {
      setErrorMessage("");
      toast.error("Cannot save flow: At least 2 nodes are required");
      return;
    }

    // Check for nodes with empty target handles (no incoming connections)
    const nodesWithoutIncomingConnections = nodes.filter((node) => {
      return !edges.some((edge) => edge.target === node.id);
    });

    if (nodesWithoutIncomingConnections.length > 1) {
      setErrorMessage(
        "Cannot save flow: More than one node has empty target handles"
      );
      setTimeout(() => setErrorMessage(""), 5000);
      return;
    }

    setErrorMessage("");
    toast.success("Flow saved successfully!");
  };

  // Close settings panel
  const closeSettingsPanel = (): void => {
    setSelectedNode(null);
  };

  // Handle pane click to deselect nodes
  const onPaneClick = (): void => {
    setSelectedNode(null);
  };

  return {
    nodes,
    edges,
    selectedNode,
    reactFlowInstance,
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
  };
};

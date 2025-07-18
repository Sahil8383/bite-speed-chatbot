// store/slices/flowSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge, Connection } from "reactflow";

interface TextNodeData {
  message: string;
}

interface FlowState {
  nodes: Node<TextNodeData>[];
  edges: Edge[];
  selectedNode: Node<TextNodeData> | null;
  errorMessage: string;
  nodeIdCounter: number;
}

const initialState: FlowState = {
  nodes: [],
  edges: [],
  selectedNode: null,
  errorMessage: "",
  nodeIdCounter: 0,
};

const flowSlice = createSlice({
  name: "flow",
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node<TextNodeData>[]>) => {
      state.nodes = action.payload;
    },

    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },

    addNode: (
      state,
      action: PayloadAction<{
        type: string;
        position: { x: number; y: number };
      }>
    ) => {
      const { type, position } = action.payload;
      const newNode: Node<TextNodeData> = {
        id: `node_${state.nodeIdCounter}`,
        type,
        position,
        data: { message: `Text message ${state.nodeIdCounter + 1}` },
      };
      state.nodes.push(newNode);
      state.nodeIdCounter += 1;
    },

    updateNode: (
      state,
      action: PayloadAction<{ nodeId: string; newData: Partial<TextNodeData> }>
    ) => {
      const { nodeId, newData } = action.payload;
      const nodeIndex = state.nodes.findIndex((node) => node.id === nodeId);
      if (nodeIndex !== -1) {
        state.nodes[nodeIndex] = {
          ...state.nodes[nodeIndex],
          data: {
            ...state.nodes[nodeIndex].data,
            ...newData,
          },
        };
      }
    },

    addConnection: (state, action: PayloadAction<Connection>) => {
      const connection = action.payload;

      // Check if source handle already has a connection
      const sourceHasConnection = state.edges.some(
        (edge) =>
          edge.source === connection.source &&
          edge.sourceHandle === connection.sourceHandle
      );

      if (sourceHasConnection) {
        state.errorMessage =
          "Source handle can only have one outgoing connection";
        return;
      }

      const newEdge: Edge = {
        id: `edge_${connection.source}_${connection.target}_${Date.now()}`,
        source: connection.source!,
        target: connection.target!,
        sourceHandle: connection.sourceHandle,
        targetHandle: connection.targetHandle,
      };

      state.edges.push(newEdge);
      state.errorMessage = "";
    },

    setSelectedNode: (
      state,
      action: PayloadAction<Node<TextNodeData> | null>
    ) => {
      state.selectedNode = action.payload;
    },

    setErrorMessage: (state, action: PayloadAction<string>) => {
      state.errorMessage = action.payload;
    },

    clearError: (state) => {
      state.errorMessage = "";
    },

    validateAndSave: (state) => {
      if (state.nodes.length <= 1) {
        state.errorMessage = "";
        return;
      }

      // Check for nodes with empty target handles (no incoming connections)
      const nodesWithoutIncomingConnections = state.nodes.filter((node) => {
        return !state.edges.some((edge) => edge.target === node.id);
      });

      if (nodesWithoutIncomingConnections.length > 1) {
        state.errorMessage =
          "Cannot save flow: More than one node has empty target handles";
        return;
      }

      state.errorMessage = "";
      // In a real app, you would dispatch an async action here to save to backend
    },
  },
});

export const {
  setNodes,
  setEdges,
  addNode,
  updateNode,
  addConnection,
  setSelectedNode,
  setErrorMessage,
  clearError,
  validateAndSave,
} = flowSlice.actions;

export default flowSlice.reducer;

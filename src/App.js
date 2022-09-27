import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  updateEdge,
  Background,
  ConnectionLineType
} from "react-flow-renderer";
import Sidebar from "./Sidebar";
import "./index.css";
import MainModal from "./Modal";
import FlowInfo from "./FlowInfo";
import { Link } from "react-router-dom";
import { initialNodes, initialEdges } from "./nodes-edges";
import dagre from 'dagre';



const flowKey = "flowJSON";

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};

const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
  initialNodes,
  initialEdges
);

const DnDFlow = () => {
  let generatedid = 0;
  const reactFlowWrapper = useRef(null);
  // const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  // const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [isModal, setIsModal] = useState(false);
  const [currDataFlowId, setCurrDataFlowId] = useState("");
  const [rfInstance, setRfInstance] = useState(null);


  const getId = () => {
    var id = localStorage.getItem("id")
      ? parseInt(localStorage.getItem("id")) + 1
      : 0;
    localStorage.setItem("id", id);
    return `dndnode_${localStorage.getItem("id")}`;
  };

  // const onConnect = useCallback(
  //   (params) => setEdges((eds) => addEdge(params, eds)),
  //   [setEdges]
  // );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)),
    []
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const inputData = event.dataTransfer
        .getData("application/reactflow")
        .split(",");
      const type = inputData[0];
      const label = inputData[1];
      // check if the dropped element is valid
      if (typeof type === "undefined" || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${label}` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );

  const onEdgeUpdate = (oldEdge, newConnection) =>
    setEdges((els) => updateEdge(oldEdge, newConnection, els));

  const onSave = useCallback(() => {
    console.log("hello");
    if (rfInstance) {
      const flow = rfInstance.toObject();

      localStorage.setItem(flowKey, JSON.stringify(flow));
      console.log(JSON.stringify(flow));
      console.log(rfInstance);
      console.log(rfInstance.toObject());
      console.log(rfInstance.toObject().edges);
    }
  }, [rfInstance]);

  useEffect(() => {
    if (localStorage.getItem("flowJSON")) {
      let commingData = JSON.parse(localStorage.getItem("flowJSON"));
      setNodes(commingData.nodes);
      setEdges(commingData.edges);
    }
  }, []);

  return (
    <>
      {isModal ? (
        <MainModal modalData={{ isModal, setIsModal, currDataFlowId }} />
      ) : (
        ""
      )}
      <div className="dndflow">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={(e) => {
                setRfInstance(e);
                setReactFlowInstance(e);
              }}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onEdgeUpdate={onEdgeUpdate}
              fitView
              onClick={(e) => {
                let id = e.target.getAttribute("data-id");
                console.log("hello");
                setIsModal(!isModal);
                setCurrDataFlowId(
                  nodes.find((innerData) => innerData.id == id).data.label
                );
              }}
            ></ReactFlow>
            <div className="save__controls">
              <button
                className="save__controls__buttons button1"
                onClick={onSave}
              >
                save
              </button>
              <Link to="/flows">
                <button className="save__controls__buttons button2">
                  Back to Flows
                </button>
              </Link>
            </div>
            <Controls />
            <FlowInfo />
            <Background />
          </div>
          <Sidebar />
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default DnDFlow;

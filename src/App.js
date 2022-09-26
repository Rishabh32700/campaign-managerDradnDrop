import React, { useState, useRef, useCallback, useEffect } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  updateEdge,
  Background,
} from "react-flow-renderer";
import Sidebar from "./Sidebar";
import "./index.css";
import MainModal from "./Modal";
import FlowInfo from "./FlowInfo";
import { Link } from "react-router-dom";
import data from "./original json for flow creation";

const initialNodes = [
  {
    id: "0",
    type: "input",
    data: { label: "hello" },
    position: { x: 0, y: 0 },
  },
];

if (data[0].ivrCampFlowData.flow.language[0].actions.length !== 0) {
  data[0].ivrCampFlowData.flow.language[0].actions.forEach((element, idx) => {
    console.log("ele", element, idx);
    initialNodes.push({
      id: element.id+"_"+idx,
      type: "processing",
      data: { label: element.languageName + "language node"},
      position: { x: (idx+1)*80, y: 40 },
    });
    console.log("initial", initialNodes);
  });
} else {
  console.log("zero");
}

if(data[0].ivrCampFlowData.flow.actions[0].length !== 0){
  data[0].ivrCampFlowData.flow.actions.forEach((element, idx)=>{
    initialNodes.push({
      id: element.level+"_"+element.dtmf_key+"_"+idx,
      type: "processing",
      data: { label:"DTMF"+ element.dtmf_key },
      position: { x: (idx+1)*120, y:(idx+1)*40  },
    });
    console.log("dtmf ", element);
    if(data[0].ivrCampFlowData.flow.actions[0].actions.length !== 0){
      data[0].ivrCampFlowData.flow.actions[0].actions.forEach((element, idx)=>{
        initialNodes.push({
          id: element.level+"_"+element.dtmf_key+"_"+idx,
          type: "processing",
          data: { label:"DTMF"+ element.id },
          position: { x: (idx+1)*160, y:(idx+1)*80  },
        });
        console.log("subdtmf ", element);
      
      })
      console.log("action length not zero");
    }else {
      console.log("action zero");
    }
  
  })
  console.log("action length not zero");
}else {
  console.log("action zero");
}





const flowKey = "flowJSON";

const DnDFlow = () => {
  let generatedid = 0;
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
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

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
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

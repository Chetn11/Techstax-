import React, { useCallback, useEffect, useState, useRef } from "react";
import { MarkerType } from "reactflow";
import ReactFlow, {
  addEdge,
  Background,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
} from "reactflow";
import Sidebar from "./SideBar";
import { isNodeConnected } from "../NodeConnection";
import Node from "./CustomNodes";
import "reactflow/dist/style.css";
import "../styles/dnd.css";
import axios from "axios";

let id = 0;
const getId = () => `dndnode_${id++}`;

const initialNodes = [];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
  },
];
const TypeOfNode = { node: Node };
const WorkFlow = () => {
  const reactFlowWrapper = useRef(null);
  const textRef = useRef(null);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState(null);
  const [isSelected, setIsSelected] = useState(false);
  const [jsonData, setJsonData] = useState(null);
  const [flag, setFlag] = useState(false);

  const [timer, setTimer] = useState(60);

  const onInit = (reactFlowInstance) => setReactFlowInstance(reactFlowInstance);

  const handleFileChange = (event) => {
    setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      const file = event.target.files[0];
      const reader = new FileReader();
      const result = [];

      reader.onload = (e) => {
        const content = e.target.result;
        const lines = content.split("\n");
        const headers = lines[0].split(",");

        for (let i = 1; i < lines.length; i++) {
          const obj = {};
          const currentLine = lines[i].split(",");

          for (let j = 0; j < headers.length; j++) {
            obj[headers[j].trim()] = currentLine[j].trim();
          }

          result.push(obj);
        }
      };

      setFlag(true);
      setJsonData(result);
      reader.readAsText(file);
    }, 5000);
  };

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const onDrop = (event) => {
    event.preventDefault();
    const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();

    console.log(event);
    const type = event.dataTransfer.getData("application/reactflow");
    console.log(type);
    const label = event.dataTransfer.getData("content");
    console.log(label);
    console.log(reactFlowInstance, "reactIns");
    const position = reactFlowInstance.project({
      x: event.clientX - reactFlowBounds.left,
      y: event.clientY - reactFlowBounds.top,
    });

    if (label === "csv") {
      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          heading: "Upload CSV",
          content: (
            <>
              <input type="file" onChange={handleFileChange} name="filename" />
            </>
          ),
        },
      };

      console.log(newNode);
      setNodes((e) => e.concat(newNode));
      setSelectedNode(newNode.id);
    } else if (label === "wait") {
      const newNode = {
        id: getId(),
        type,
        position,
        data: { heading: "Wait 60 sec", content: timer },
      };

      console.log(newNode);
      setNodes((e) => e.concat(newNode));
      setSelectedNode(newNode.id);
    } else if (label === "convert") {
      const newNode = {
        id: getId(),
        type,
        position,
        data: {
          heading: "Convert into JSON",
          content: (
            <>
              {flag && (
                <div>
                  <h2>JSON Data</h2>
                  <p>{JSON.stringify(jsonData, null, 2)}</p>
                </div>
              )}
            </>
          ),
        },
      };

      console.log(newNode);
      setNodes((es) => es.concat(newNode));
      setSelectedNode(newNode.id);
    }
  };

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, markerEnd: { type: "arrowclosed" } }, eds)
      ),
    [setEdges]
  );

  const [nodeName, setNodeName] = useState("Node 1");

  useEffect(() => {
    const node = nodes.filter((node) => {
      if (node.selected) return true;
      return false;
    });
    if (node[0]) {
      setSelectedNode(node[0]);
      setIsSelected(true);
    } else {
      setSelectedNode("");
      setIsSelected(false);
    }
  }, [nodes]);
  useEffect(() => {
    setNodeName(selectedNode?.data?.content || selectedNode);
  }, [selectedNode]);
  useEffect(() => {
    textRef?.current?.focus();
  }, [selectedNode]);
  useEffect(() => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === selectedNode?.id) {
          node.data = {
            ...node.data,
            content: nodeName || " ",
          };
        }
        return node;
      })
    );
  }, [nodeName, setNodes]);

  const Savework = async () => {
    if (isNodeConnected(nodes, edges)) {
      const payload = {
        node: nodes,
        edges: edges,
      };
      console.log(payload);
      try {
        await axios.post("http://localhost:8080/workflows/save", payload);
        alert("Work is saved");
      } catch (error) {
        alert("Cannot Save Flow");
      }
    } else {
      alert("Cannot Save Flow");
    }
  };

  return (
    <>
      <div className="DND">
        <ReactFlowProvider>
          <div className="reactflow-wrapper" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={onInit}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={TypeOfNode}
            >
              <Background color="red" gap={14} />
            </ReactFlow>
          </div>

          {isSelected ? (
            <div>
              <label>Change Text</label>
              <textarea
                ref={textRef}
                value={nodeName}
                onChange={(e) => setNodeName(e.target.value)}
              />
            </div>
          ) : (
            <>
              <button
                style={{
                  width: "150px",
                  height: "30px",
                  borderRadius: "10px",
                  marginTop:"50px",
                }}
                onClick={Savework}
              >
                Save Work
              </button>
              <Sidebar />
            </>
          )}
        </ReactFlowProvider>
      </div>
    </>
  );
};

export default WorkFlow;

import React from 'react'

function SideBar() {
    const onDragStart = (event, nodeType, content) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.setData("content", content);
        event.dataTransfer.effectAllowed = "move";
      };
    
  return (
    <aside>
        <div
        style={{border:'1px solid blue'}}
          className="DNDnode"
          onDragStart={(event) => onDragStart(event, "node", "csv")}
          draggable
        >
          Upload CSV
        </div>
        <div
        style={{border:'1px solid green'}}
        className="DNDnode"
        onDragStart={(event) => onDragStart(event, "node", "filter")}
        draggable
        >
          Filter
        </div>
        <div
        style={{border:'1px solid green'}}
        className="DNDnode"
        onDragStart={(event) => onDragStart(event, "node", "wait")}
        draggable
      >
        Wait
      </div>
      <div
      style={{border:'1px solid grey'}}
        className="DNDnode"
        onDragStart={(event) => onDragStart(event, "node", "convert")}
        draggable
      >
        Convert to JSON
      </div>
      <div
      style={{border:'1px solid red'}}
        className="DNDnode"
        onDragStart={(event) => onDragStart(event, "node", "convert")}
        draggable
      >
        POST Request
      </div>
    </aside>
  )
}

export default SideBar

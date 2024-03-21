import React from 'react'
import "../styles/styles.css"
function SideBar() {
    const onDragStart = (event, nodeType, content) => {
        event.dataTransfer.setData("application/reactflow", nodeType);
        event.dataTransfer.setData("content", content);
        event.dataTransfer.effectAllowed = "move";
      };
    
  return (
    <aside className='sideBar' style={{backgroundColor:"#333"}}>
        <div
        style={{border:'none', backgroundColor:"blue", color:"white"}}
          className="DNDnode"
          onDragStart={(event) => onDragStart(event, "node", "csv")}
          draggable
        >
          Upload CSV
        </div>
        <div
        style={{border:'none', backgroundColor:"purple", color:"white"}}
        className="DNDnode"
        onDragStart={(event) => onDragStart(event, "node", "filter")}
        draggable
        >
          Filter
        </div>
        <div
        style={{border:'none', backgroundColor:"green", color:"white"}}
        className="DNDnode"
        onDragStart={(event) => onDragStart(event, "node", "delay")}
        draggable
      >
        Delay
      </div>
      <div
      style={{border:'none', backgroundColor:"red", color:"white"}}
        className="DNDnode"
        onDragStart={(event) => onDragStart(event, "node", "convert")}
        draggable
      >
        Convert CSV to JSON
      </div>
      <div
      style={{border:'none', backgroundColor:"orange", color:"white"}}
        className="DNDnode"
        onDragStart={(event) => onDragStart(event, "node", "convert")}
        draggable
      >
        Post Request
      </div>
    </aside>
  )
}

export default SideBar

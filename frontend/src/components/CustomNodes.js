import { Handle, Position } from "reactflow";

const style = {
    body: {
      display: "flex",
      flexDirection: "column",
      boxShadow: "rgba(0, 0, 0, 0.35) 5px 5px 15px",
      backgroundColor:"white",
      fontSize: "medium",
      
    },
    box: {
      boxShadow: "rgba(0, 0, 0, 0.35) 5px 5px 15px"
    },
    title: {
      position: "relative",
      padding: "10px",
    },
    content: {
      padding: "20px",
      textAlign: 'center'
    }
  };


const CustomNodes= ({ data, selected }) => {
  let Title = { ...style.title };
  Title.backgroundColor = "gray";
  Title.textAlign = 'center'
  Title.color="white"
  Title.fontWeight = 'Italic'

  return (
    <div className="textEditor">
      <div style={{ ...style.body, ...(selected ? style.box : []) }}>
        <div style={Title}>{data.heading}</div>
        <div style={style.content}>{data.content}</div>
      </div>
      <Handle type="source" position={Position.Top} id="x" />
      <Handle type="target" position={Position.Bottom} id="y" />
    </div>
  );
};

export default CustomNodes;
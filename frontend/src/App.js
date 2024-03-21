import React, { useCallback } from 'react';
import ReactFlow from 'react-flow-renderer';
import SideBar from './components/SideBar';
import DnDFlow from './components/Dndflow';
import WorkFlow from './components/WorkFlow';

 

 
export default function App() {


 
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
        <WorkFlow/>
    </div>
  );
}
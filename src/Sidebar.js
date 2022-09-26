import React from 'react';
import { START_NODE_LABEL,
        WELCOME_NODE_LABEL,
        PROCESSING_NODE_LABEL,
        LANGUAGE_SELECTION_NODE_LABEL,
        STOP_NODE_LABEL, } from './LabelNames';

export default () => {
  const onDragStart = (event, nodeType, nodeLabel) => {
    event.dataTransfer.setData('application/reactflow', `${nodeType},${nodeLabel}`,);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className='sidebar'>
      <div className="description">You can drag these nodes to the pane on the right.</div>
      <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input', START_NODE_LABEL)} draggable>
        Start
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default', WELCOME_NODE_LABEL)} draggable>
        Welcome
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default', LANGUAGE_SELECTION_NODE_LABEL)} draggable>
        Language selection
      </div>
      <div className="dndnode" onDragStart={(event) => onDragStart(event, 'default', PROCESSING_NODE_LABEL)} draggable>
        Processing node
      </div>
      <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output', STOP_NODE_LABEL)} draggable>
        Stop
      </div>
    </aside>
  );
};

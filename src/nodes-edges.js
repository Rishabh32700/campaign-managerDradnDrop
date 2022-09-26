import data from "./original json for flow creation"

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';


const createNodes = () =>{
    const initialNodes = [
        {
          id: "0",
          type: "input",
          data: { label: "hello" },
          position
        },
      ];
      
      if (data[0].ivrCampFlowData.flow.language[0].actions.length !== 0) {
        data[0].ivrCampFlowData.flow.language[0].actions.forEach((element, idx) => {
          console.log("ele", element, idx);
          initialNodes.push({
            id: element.id+"_"+idx,
            type: "processing",
            data: { label: element.languageName + "language node"},
            position
          });
          console.log("initial", initialNodes);
        });
      } else {
        console.log("zero");
      }
      
      if(data[0].ivrCampFlowData.flow.actions.length !== 0){
        data[0].ivrCampFlowData.flow.actions.forEach((element, idx)=>{
          initialNodes.push({
            id: element.level+"_"+element.dtmf_key+"_"+idx,
            type: "processing",
            data: { label:"DTMF"+ element.dtmf_key },
            position
          });
          console.log("dtmf ", element);
          if(element.actions.length !== 0){
            element.actions.forEach((element, idx)=>{
              initialNodes.push({
                id: element.level+"_"+element.dtmf_key+"_"+idx+Math.random(),
                type: "processing",
                data: { label:"DTMF"+ element.id },
                position
              });
              console.log("subdtmf ", element, initialNodes);
            
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

return initialNodes
}


export const initialNodes = createNodes()

console.log('Nitin', initialNodes)
  



export const initialEdges = [
    { id: 'e12', source: '1', target: '2', type: edgeType },
    { id: 'e13', source: '1', target: '3', type: edgeType },
    { id: 'e22a', source: '2', target: '2a', type: edgeType },
    { id: 'e22b', source: '2', target: '2b', type: edgeType },
    { id: 'e22c', source: '2', target: '2c', type: edgeType },
    { id: 'e2c2d', source: '2c', target: '2d', type: edgeType },
    { id: 'e45', source: '4', target: '5', type: edgeType },
    { id: 'e56', source: '5', target: '6', type: edgeType },
    { id: 'e57', source: '5', target: '7', type: edgeType },
    { id: '2d8', source: '2d', target: '8', type: edgeType }
  ];
  
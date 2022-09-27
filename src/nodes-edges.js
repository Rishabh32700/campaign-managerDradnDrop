import data from "./original json for flow creation"

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';


const createNodesAndEdges = () =>{
    let initialNodes = [
        {
          id: "0",
          type: "input",
          data: { label: "hello" },
          position
        },
      ];
      let initialEdges = []
      
      if (data[0].ivrCampFlowData.flow.language[0].actions.length !== 0) {
        data[0].ivrCampFlowData.flow.language[0].actions.forEach((element, idx) => {
          console.log("ele", element, idx);
          initialNodes = [...initialNodes, {
            id: element.id+"_"+idx,
            type: "processing",
            data: { label: element.languageName + "language node"},
            position
          }];
            initialEdges = [...initialEdges,   { id: 'e0'+element.id+"_"+idx, source: '0', target: element.id+"_"+idx, type: edgeType}]    
          console.log("initial", initialNodes);
          data[0].ivrCampFlowData.flow.actions.forEach((ele, index)=>{
                initialEdges = [...initialEdges,  {id: 'e'+element.id+"_"+idx+ele.level+"_"+ele.dtmf_key+"_"+index, source: element.id+"_"+idx, target: ele.level+"_"+ele.dtmf_key+"_"+index, type: edgeType}]
          })
        });
      } else {
        console.log("zero");
      }
      
      if(data[0].ivrCampFlowData.flow.actions.length !== 0){
        data[0].ivrCampFlowData.flow.actions.forEach((element, idx)=>{
            initialNodes =  [...initialNodes, {
            id: element.level+"_"+element.dtmf_key+"_"+idx,
            type: "processing",
            data: { label:"DTMF"+ element.dtmf_key },
            position
          }];
          
          if(element.actions.length !== 0){
            element.actions.forEach((ele, index)=>{
                let randomness = Math.random()
                initialNodes = [...initialNodes, {
                id: ele.level+"_"+ele.dtmf_key+"_"+index+randomness,
                type: "processing",
                data: { label:"DTMF"+ ele.id },
                position
            }];
            initialEdges = [...initialEdges,  {id: 'e'+element.level+"_"+element.dtmf_key+"_"+idx+ele.level+"_"+ele.dtmf_key+"_"+index+randomness, source: element.level+"_"+element.dtmf_key+"_"+idx, target: ele.level+"_"+ele.dtmf_key+"_"+index+randomness, type: edgeType}]
            console.log("subdtmf ", ele, initialNodes);
            console.log('nitin node', {
                id: ele.level+"_"+ele.dtmf_key+"_"+index+randomness,
                type: "processing",
                data: { label:"DTMF"+ ele.id },
                position
            })
            console.log('nitin edge', {id: 'e'+element.level+"_"+element.dtmf_key+"_"+idx+ele.level+"_"+ele.dtmf_key+"_"+index+randomness, source: element.level+"_"+element.dtmf_key+"_"+idx, target: ele.level+"_"+ele.dtmf_key+"_"+index+randomness, type: edgeType})
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

return {initialNodes, initialEdges}
}


export const {initialNodes, initialEdges} = createNodesAndEdges()

console.log('nitin listx', initialEdges, initialNodes)
  
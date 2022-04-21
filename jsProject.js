var nodeDataArray = [];
var linkDataArray = [];
// init BP diagram
let myBPdiagram = new BPDiagram();
var  flow= new BPFlow("main.flow.json ", "0.0.1", "main.flow.json", "main.flow.json", "entry");
myBPdiagram.setFlow(flow);


myDiagram = new go.Diagram(
  {// have mouse wheel events zoom in and out instead of scroll up and down
    "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
    "linkingTool.direction": go.LinkingTool.ForwardsOnly,
    "undoManager.isEnabled": true,
  } );

  myDiagram.model = new go.GraphLinksModel(nodeDataArray,linkDataArray);
  myDiagram.model.linkFromPortIdProperty="fromPort";  // required information:
  myDiagram.model.linkToPortIdProperty= "toPort";
  var SelectedNode = myDiagram.selection.first();

function init(){
    var   $ = go.GraphObject.make;
    myDiagram.div = document.getElementById("myDiagramDiv");
    myDiagram.nodeTemplate =
        $(go.Node, "Spot", { click: showDivprop},
        new go.Binding("location", "location", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "RoundedRectangle", { figure: "RoundedRectangle", fill: "white", stroke: "#f5f5f5" ,cursor: "pointer",
              width: 190, height: 100}
              ),
        $(go.TextBlock, "TEXT",new go.Binding("text", "text"),{ font: "bold 12pt serif",width: 150, height: 80,margin:5}),
        $(go.Panel, "Vertical",
            new go.Binding("itemArray", "items"),
                 {
                    itemTemplate:
                        $(go.Panel, "Auto",{ margin:3 },
                        $(go.Shape, "RoundedRectangle",{ fill: "white" ,stroke: "#e8e8e8",width: 180, height: 20}),
                        $(go.TextBlock, new go.Binding("text",""),
                      )
        ) , // end of itemTemplate
      }),
    
      
      $(go.Shape,  "Ellipse",
        { click: addLink,
          fill:"black",
          desiredSize:new go.Size(5,5),alignment: go.Spot.Left,
          portId: "out",fromSpot: go.Spot.Left,toSpot:go.Spot.Left,
          fromLinkable: true, toLinkable: true,
          cursor: "pointer"

        } 
      ),  
      
      $(go.Shape,  "Ellipse",
        { click: addLink,
          fill:"black",
          desiredSize:new go.Size(5,5),alignment: go.Spot.Right,
          portId: "out0",fromSpot: go.Spot.Right,toSpot:go.Spot.Right,
          fromLinkable: true,toLinkable: true ,
          cursor: "pointer"
        }   
          
        ),
         );
         
   myDiagram.linkTemplate =
        $(go.Link,{routing:  go.Link.Orthogonal, curve: go.Link.Bezier  },
          new go.Binding("points","points",go.Point.parse).makeTwoWay(),
        $(go.Shape,{stroke: "#898282", strokeWidth: 2 }),
        
              
  );
 
}


function generate() {
       
  let id = () => {    
   return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);}
   return "node-"+id();
}

function entierAleatoire(){
  return Math.floor(Math.random() * (200 - 800 + 1)) + 200;
}


function addNode(){
    var myPoint = (go.Point, {x: entierAleatoire(), y:-entierAleatoire()});
       let x=myPoint.x;
       let y=myPoint.y;
       let txt = "entry";
       var x1= parseFloat(x);
       var y1 = parseFloat(y); 
       if(nodeDataArray.length!=0)
        txt=generate();
        var b = {key: txt, text: txt, items: [ "always", enEnterSysomething() ],location: x+" "+y}
        myDiagram.model.addNodeData(b);
        var bpnode=new BPNode(b.key,b.text, x1,y1,new Date());
        console.log(bpnode);
        myBPdiagram.flow.addNode(bpnode);
}

function addLink(){
  //myDiagram.model.isLinked("fromport", "toport");
    let datalink = myDiagram.model.linkDataArray[0];
    let source=datalink.from;
    let sourcePort=datalink.fromPort;
    let link=new BPLink(source, sourcePort,"5abeb92305"); 
    // let p1=datalink.Link.points.getPoint(0);
    // let p2=datalink.Link.points.getPoint(1);
    // link.addpoint(p1);
    // link.addpoint(p2);
    console.log(link);
 }
 
   ////////changer le nom d'un noued   
function changeNodeText(){
  var fieldText = document.getElementById("nameNode").value;
  SelectedNode= myDiagram.selection.first();
  const node = myDiagram.findNodeForKey(SelectedNode.data.key);
  myDiagram.model.set(node.data, "text",  fieldText);
  myBPdiagram.flow.getNodeById(SelectedNode.data.key).setName(fieldText);
}
///////////// on Enter actions////////////
function enEnterSysomething(){
  var fieldText = document.getElementById("createText").value; 
  var SelectedNode = myDiagram.selection.first();
  var b="say: ";
   if (SelectedNode !== null) {
    SelectedNode.data.items.push(fieldText);
    myDiagram.model.addArrayItem(SelectedNode.data.items,b+fieldText)
    let param1 = new BPActionParameter("texttosay","#!builtin_text-7aOCSN");
    let action1=new BPAction(BPActionType.say);
    action1.addParameter(param1)
    myBPdiagram.flow.getNodeById(SelectedNode.data.key).addEnterAction(action1.getString());

   }
  }

function enEnterExecuteCodeanalytics_set(){
  var metric= document.getElementById("panalytics1").value;
  var group= document.getElementById("panalytics2").value;
  var count= document.getElementById("panalytics3").value;
  let param1 = new BPActionParameter("metric",metric);
  let param2 = new BPActionParameter("group",group);
  let param3 = new BPActionParameter("count",count);
  let action2=new BPAction(BPActionType.analytics_set);
    action2.addParameter(param1);
    action2.addParameter(param2);
    action2.addParameter(param3);
  var SelectedNode = myDiagram.selection.first();
    if (SelectedNode !== null) {
      console.log(action2.getString());
      myBPdiagram.flow.getNodeById(SelectedNode.data.key).addEnterAction(action2.getString());
    }
}
function enEnterExecuteChannel_web(){
  var Data= document.getElementById("val2").value;
  let param1 = new BPActionParameter("data",Data);
  let action2=new BPAction(BPActionType.basic_skills_slot_reset);
    action2.addParameter(param1);
  var SelectedNode = myDiagram.selection.first();
    if (SelectedNode !== null) {
      console.log(action2.getString());
      myBPdiagram.flow.getNodeById(SelectedNode.data.key).addEnterAction(action2.getString());
    }
}
function enEnterExecuteSetVariable(){
  var type= document.getElementById("valsetV1").value;
  var name= document.getElementById("valsetV2").value;
  var val= document.getElementById("valset3").value;
  let param1 = new BPActionParameter("type",type);
  let param2 = new BPActionParameter("name",name);
  let param3 = new BPActionParameter("value",val);
  let action2=new BPAction(BPActionType.builtin_setVariable);
    action2.addParameter(param1);
    action2.addParameter(param2);
    action2.addParameter(param3);
  var SelectedNode = myDiagram.selection.first();
    if (SelectedNode !== null) {
      console.log(action2.getString());
      myBPdiagram.flow.getNodeById(SelectedNode.data.key).addEnterAction(action2.getString());
    }

}
///////////////////on Receive action////////////
function onReceiveSysomething(){
  var fieldText = document.getElementById("createText1").value; 
  var SelectedNode = myDiagram.selection.first();
  var b="say: ";
   if (SelectedNode !== null) {
    SelectedNode.data.items.push(fieldText);
    myDiagram.model.addArrayItem(SelectedNode.data.items,b+fieldText)
    let param1 = new BPActionParameter("texttosay","#!builtin_text-pzqrjW");
    let action1=new BPAction(BPActionType.say);
    action1.addParameter(param1)
    myBPdiagram.flow.getNodeById(SelectedNode.data.key).addReceiveAction(action1.getString());

   }
  }

function onReceiveExecuteCodeanalytics_set(){
  var metric= document.getElementById("panalytics 1").value;
  var group= document.getElementById("panalytics 2").value;
  var count= document.getElementById("panalytics 3").value;
  let param1 = new BPActionParameter("metric",metric);
  let param2 = new BPActionParameter("group",group);
  let param3 = new BPActionParameter("count",count);
  let action2=new BPAction(BPActionType.analytics_set);
    action2.addParameter(param1);
    action2.addParameter(param2);
    action2.addParameter(param3);
  var SelectedNode = myDiagram.selection.first();
    if (SelectedNode !== null) {
      console.log(action2.getString());
      myBPdiagram.flow.getNodeById(SelectedNode.data.key).addReceiveAction(action2.getString());
    }
}
function onReceiveExecuteChannel_web(){
  var Data= document.getElementById("val02").value;
  let param1 = new BPActionParameter("data",Data);
  let action2=new BPAction(BPActionType.basic_skills_slot_reset);
    action2.addParameter(param1);
  var SelectedNode = myDiagram.selection.first();
    if (SelectedNode !== null) {
      console.log(action2.getString());
      myBPdiagram.flow.getNodeById(SelectedNode.data.key).addReceiveAction(action2.getString());
    }
}
function onReceiveExecuteSetVariable(){
  var type= document.getElementById("valsetV01").value;
  var name= document.getElementById("valsetV02").value;
  var val= document.getElementById("valset03").value;
  let param1 = new BPActionParameter("type",type);
  let param2 = new BPActionParameter("name",name);
  let param3 = new BPActionParameter("value",val);
  let action2=new BPAction(BPActionType.builtin_setVariable);
    action2.addParameter(param1);
    action2.addParameter(param2);
    action2.addParameter(param3);
  var SelectedNode = myDiagram.selection.first();
    if (SelectedNode !== null) {
      console.log(action2.getString());
      myBPdiagram.flow.getNodeById(SelectedNode.data.key).addReceiveAction(action2.getString());
    }
}
//////////transition
function AddTransition(){
  SelectedNode= myDiagram.selection.first();
  if (SelectedNode !== null) {
    for(let i=0;i<nodeDataArray.length;i++){ 
      if(nodeDataArray.length===1){
        transition=new BPTransition("true",""); 
        myBPdiagram.flow.getNodeById(SelectedNode.data.key).addTransition(transition);
      }
      else{
        transition=new BPTransition("true",nodeDataArray[i+1]); 
        myBPdiagram.flow.getNodeById(SelectedNode.data.key).addTransition(transition);
      }
    }      
  }
}
  
   

function elementselect(){
  for (var i=0;i<nodeDataArray.length;i++){
    document.write("<option>"+nodeDataArray[i].text+"</option>");
  }
}

function save() {
    document.getElementById("mySavedModel").value = myDiagram.model.toJson();
    myDiagram.isModified = false;
}

function saveBP() {
  document.getElementById("mySavedBPModel").value = JSON.stringify(myBPdiagram);
}

///function for div Property
function showDivprop() {
    return document.getElementById('myNodeProperties').style.display = "";
  }

function showDivOnEnter() {
    return document.getElementById('onEnter').style.display = "";
  }
  function showDivOnEnter1() {
    return document.getElementById('onEnter').style.display = "none";
  }
  function showDivRecieve() {
    return document.getElementById('onRecieve').style.display = "";
  }
  function showDivRecieve1() {
    return document.getElementById('onRecieve').style.display = "none";
  }
  function showDivTransition(){
    return document.getElementById('transition').style.display = "";
  }
  function showDivTransition1(){
    return document.getElementById('transition').style.display = "none";
  }


function show1() {
    return document.getElementById('dropdown-content').style.display = "";
  }

function show2() {
    return document.getElementById('dropdown-content').style.display = "none";
  }

function show01() {
    return document.getElementById('dropdown-content2').style.display = "";
  }
        
function show02() {
    return document.getElementById('dropdown-content2').style.display = "none";  
  }

function show3() {
    return document.getElementById('dropdown-content3').style.display = ""; 
  }

function show4() {
    return document.getElementById('dropdown-content3').style.display = "none";

  }

function show03() {
    return document.getElementById('dropdown-content4').style.display = "";

  }
        
function show04() {
    return document.getElementById('dropdown-content4').style.display = "none"; 
 }


 



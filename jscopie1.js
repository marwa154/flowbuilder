var nodeDataArray = [];
var linkDataArray = [];

// init BP diagram
let myBPdiagram = new BPDiagram();
var  flow= new BPFlow("main.flow.json ", "0.0.1", "main.flow.json", "main.flow.json", "entry");
myBPdiagram.setFlow(flow);

let mygDiagram = new go.Diagram(
{
  "undoManager.isEnabled": true  // enable undo & redo
});





function init(){
  // var   $ = go.GraphObject.make;
  // mygDiagram = $(go.Diagram ,"myDiagramDiv",
  //   {   
  //     // have mouse wheel events zoom in and out instead of scroll up and down
  //     "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
  //     initialAutoScale: go.Diagram.Uniform,
  //     "linkingTool.direction": go.LinkingTool.ForwardsOnly,
  //     "undoManager.isEnabled": true
  //   });
    mygDiagram.div = document.getElementById('myDiagramDiv');
    mygDiagram.nodeTemplate =
        $(go.Node, "Spot", { click: showDivprop},
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "RoundedRectangle", { figure: "RoundedRectangle", fill: "white", stroke: "#f5f5f5" ,
              width: 190, height: 100, toEndSegmentLength: 50, fromEndSegmentLength: 100}
              ),
        $(go.TextBlock, new go.Binding("text", "text"),{ font: "bold 12pt serif",width: 150, height: 80,margin:5}),
        $(go.Panel, "Vertical",
            new go.Binding("itemArray", "items"),
                 {
                    itemTemplate:
                      $(go.Panel, "Auto",{ margin:3 },
                        $(go.Shape, "RoundedRectangle",{ fill: "white" ,stroke: "#e8e8e8",width: 180, height: 20}),
                        $(go.TextBlock, new go.Binding("text", ""),
                      )
        ) , // end of itemTemplate
      }),
    
      
      $(go.Shape,  "Ellipse",
        {
          fill:"black",
          desiredSize:new go.Size(5,5),alignment: go.Spot.Left,
          portId: "l",fromSpot: go.Spot.Left,toSpot:go.Spot.Left,
          fromLinkable: true, toLinkable: true

        } 
      ),  
      
      $(go.Shape,  "Ellipse",
        { 
          fill:"black",
          desiredSize:new go.Size(5,5),alignment: go.Spot.Right,
          portId: "out",fromSpot: go.Spot.Right,toSpot:go.Spot.Right,
          fromLinkable: true,toLinkable: true ,
          mouseDrop:addLink
        }   
          
        ), );
    mygDiagram.linkTemplate =
        $(go.Link,{ routing:  go.Link.Orthogonal, curve: go.Link.Bezier  },
        $(go.Shape, { stroke: "#898282", strokeWidth: 2 }),
             
  );
     
}


function generate() {
       
         let id = () => {
            
           return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);}
         
         
           
           return "node-"+id();
}


function generateKey(){     
  for(i=0; i<nodeDataArray.length ;i++){
    i++; 
  }
  return i;
}


function entierAleatoire(){
  return Math.floor(Math.random() * (200 - 800 + 1)) + 200;
}


function addNode(){
  
    var myPoint = (go.Point, {x: entierAleatoire(), y:-entierAleatoire()});
      if(nodeDataArray.length!=0){
        var b = {key:generateKey(), text: generate(), items: [ "always", enEnterSysomething() ],loc: myPoint.x+" "+ myPoint.y};
        var bpnode=new BPNode(b.key,b.text, b.loc.x,b.loc.y,new Date());
        console.log(bpnode);
        //nodeDataArray.push(b);
        myBPdiagram.flow.addNode(bpnode);
        mygDiagram.model.nodeDataArray.push(b);
        
      }
   else{
      var a = {key:0, text: 'entry', items: [ "always" , enEnterSysomething()],loc:-myPoint.x+" "+ myPoint.y}
      var bpnode1=new BPNode(a.key,a.text, a.loc.x,a.loc.y,new Date());
      console.log(bpnode1);
      nodeDataArray.push(a);
      myBPdiagram.flow.addNode(bpnode1);
      mygDiagram.model.nodeDataArray.push(a);
 
       
    }
    
  }
function addLink(){

  console.log("hi");
}   


function enEnterSysomething(){
  var fieldText = document.getElementById("createText").value; 
  var SelectedNode = mygDiagram.selection.first();
  b="say: ";
  if (SelectedNode !== null) {
   
     SelectedNode.data.items[2]=b+fieldText;
     create();
          }
  }
 
function changeNodeText(){
  var fieldText = document.getElementById("nameNode").value;
  var SelectedNode = mygDiagram.selection.first();
 
  if (SelectedNode !== null) {
     SelectedNode.data.text=fieldText;
   
  }
  create();
}

function save() {
    document.getElementById("mySavedModel").value = myDiagram.model.toJson();
    myDiagram.isModified = false;
}

function saveBP() {
  document.getElementById("mySavedBPModel").value = JSON.stringify(myBPdiagram);
}

function showDivprop() {
    return document.getElementById('myNodeProperties').style.display = "";
  }

function showDivEnEnter() {
    return document.getElementById('onEnter').style.display = "";
  }
ven 13:54
Marwa
Marwa Saidi Mirå
var nodeDataArray = [];
var linkDataArray = [];

// init BP diagram
let myBPdiagram = new BPDiagram();
var  flow= new BPFlow("main.flow.json ", "0.0.1", "main.flow.json", "main.flow.json", "entry");
myBPdiagram.setFlow(flow);
function create(){
  mygDiagram.model = new go.GraphLinksModel(nodeDataArray,linkDataArray);
  mygDiagram.model.linkFromPortIdProperty="fromPort";  // required information:
  mygDiagram.model.linkToPortIdProperty= "toPort";
}
function init(){
  var   $ = go.GraphObject.make;
  mygDiagram = $(go.Diagram ,"myDiagramDiv",
    {   
      // have mouse wheel events zoom in and out instead of scroll up and down
      "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
      initialAutoScale: go.Diagram.Uniform,
      "linkingTool.direction": go.LinkingTool.ForwardsOnly,
      "undoManager.isEnabled": true
    });
    mygDiagram.div = document.getElementById('myDiagramDiv');
    mygDiagram.nodeTemplate =
        $(go.Node, "Spot", { click: showDivprop},
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "RoundedRectangle", { figure: "RoundedRectangle", fill: "white", stroke: "#f5f5f5" ,
              width: 190, height: 100, toEndSegmentLength: 50, fromEndSegmentLength: 100}
              ),
        $(go.TextBlock, new go.Binding("text", "text"),{ font: "bold 12pt serif",width: 150, height: 80,margin:5}),
        $(go.Panel, "Vertical",
            new go.Binding("itemArray", "items"),
                 {
                    itemTemplate:
                      $(go.Panel, "Auto",{ margin:3 },
                        $(go.Shape, "RoundedRectangle",{ fill: "white" ,stroke: "#e8e8e8",width: 180, height: 20}),
                        $(go.TextBlock, new go.Binding("text", ""),
                      )
        ) , // end of itemTemplate
      }),
    
      
      $(go.Shape,  "Ellipse",
        {
          fill:"black",
          desiredSize:new go.Size(5,5),alignment: go.Spot.Left,
          portId: "l",fromSpot: go.Spot.Left,toSpot:go.Spot.Left,
          fromLinkable: true, toLinkable: true

        } 
      ),  
      
      $(go.Shape,  "Ellipse",
        { 
          fill:"black",
          desiredSize:new go.Size(5,5),alignment: go.Spot.Right,
          portId: "out",fromSpot: go.Spot.Right,toSpot:go.Spot.Right,
          fromLinkable: true,toLinkable: true ,
         
        }   
          
        ), );
    mygDiagram.linkTemplate =
        $(go.Link,{ routing:  go.Link.Orthogonal, curve: go.Link.Bezier  },
        $(go.Shape, { stroke: "#898282", strokeWidth: 2 }),
             
  );
  create()
}


function generate() {
       
         let id = () => {
            
           return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);}
         
         
           
           return "node-"+id();
}


function generateKey(){     
  for(i=0; i<nodeDataArray.length ;i++){
    i++; 
  }
  return i;
}


function entierAleatoire(){
  return Math.floor(Math.random() * (200 - 800 + 1)) + 200;
}


function addNode(){
  
    var myPoint = (go.Point, {x: entierAleatoire(), y:-entierAleatoire()});
      if(nodeDataArray.length!=0){
        var b = {key:generateKey(), text: generate(), items: [ "always", enEnterSysomething() ],loc: myPoint.x+" "+ myPoint.y};
        var bpnode=new BPNode(b.key,b.text, b.loc.x,b.loc.y,new Date());
        console.log(bpnode);
        nodeDataArray.push(b);
        myBPdiagram.flow.addNode(bpnode);
        create()
        let param1 = new BPActionParameter("texttosay","#!builtin_text-LkFuYV");
        let action1=new BPAction(BPActionType.say);
        action1.addParameter(param1)
        
        bpnode.addEnterAction(action1.getString());
      }
   else{
      var a = {key:0, text: 'entry', items: [ "always" , enEnterSysomething()],loc:-myPoint.x+" "+ myPoint.y}
      var bpnode1=new BPNode(a.key,a.text, a.loc.x,a.loc.y,new Date());
      console.log(bpnode1);
      nodeDataArray.push(a);
      myBPdiagram.flow.addNode(bpnode1);
      create()
      let param1 = new BPActionParameter("texttosay","#!builtin_text-LkFuYV");
      let action1=new BPAction(BPActionType.say);
      action1.addParameter(param1)
      
      bpnode1.addEnterAction(action1.getString());
       
    }
    
  }
function addLink(){

  console.log("hi");
}   


function enEnterSysomething(){
  var fieldText = document.getElementById("createText").value; 
  var SelectedNode = mygDiagram.selection.first();
  b="say: ";
  if (SelectedNode !== null) {
   
     SelectedNode.data.items[2]=b+fieldText;

     create();
          }


        }
function enEnterExecuteCode(){

}
function changeNodeText(){
  var fieldText = document.getElementById("nameNode").value;
  var SelectedNode = mygDiagram.selection.first();
 
  if (SelectedNode !== null) {
     SelectedNode.data.text=fieldText;
   
  }
  create();
}

function save() {
    document.getElementById("mySavedModel").value = mygDiagram.model.toJson();
    mygDiagram.isModified = false;
}

function saveBP() {
  document.getElementById("mySavedBPModel").value = JSON.stringify(myBPdiagram);
}

function showDivprop() {
    return document.getElementById('myNodeProperties').style.display = "";
  }

function showDivEnEnter() {
    return document.getElementById('onEnter').style.display = "";
  }
Marwa
Marwa Saidi Mirå
var nodeDataArray = [];
var linkDataArray = [];

// init BP diagram
let myBPdiagram = new BPDiagram();
var  flow= new BPFlow("main.flow.json ", "0.0.1", "main.flow.json", "main.flow.json", "entry");
myBPdiagram.setFlow(flow);
function create(){
  mygDiagram.model = new go.GraphLinksModel(nodeDataArray,linkDataArray);
  mygDiagram.model.linkFromPortIdProperty="fromPort";  // required information:
  mygDiagram.model.linkToPortIdProperty= "toPort";
}
function init(){
  var   $ = go.GraphObject.make;
  mygDiagram = $(go.Diagram ,"myDiagramDiv",
    {   
      // have mouse wheel events zoom in and out instead of scroll up and down
      "toolManager.mouseWheelBehavior": go.ToolManager.WheelZoom,
      initialAutoScale: go.Diagram.Uniform,
      "linkingTool.direction": go.LinkingTool.ForwardsOnly,
      "undoManager.isEnabled": true
    });
    mygDiagram.div = document.getElementById('myDiagramDiv');
    mygDiagram.nodeTemplate =
        $(go.Node, "Spot", { click: showDivprop},
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        $(go.Shape, "RoundedRectangle", { figure: "RoundedRectangle", fill: "white", stroke: "#f5f5f5" ,
              width: 190, height: 100, toEndSegmentLength: 50, fromEndSegmentLength: 100}
              ),
        $(go.TextBlock, new go.Binding("text", "text"),{ font: "bold 12pt serif",width: 150, height: 80,margin:5}),
        $(go.Panel, "Vertical",
            new go.Binding("itemArray", "items"),
                 {
                    itemTemplate:
                      $(go.Panel, "Auto",{ margin:3 },
                        $(go.Shape, "RoundedRectangle",{ fill: "white" ,stroke: "#e8e8e8",width: 180, height: 20}),
                        $(go.TextBlock, new go.Binding("text", ""),
                      )
        ) , // end of itemTemplate
      }),
    
      
      $(go.Shape,  "Ellipse",
        {
          fill:"black",
          desiredSize:new go.Size(5,5),alignment: go.Spot.Left,
          portId: "l",fromSpot: go.Spot.Left,toSpot:go.Spot.Left,
          fromLinkable: true, toLinkable: true

        } 
      ),  
      
      $(go.Shape,  "Ellipse",
        { 
          fill:"black",
          desiredSize:new go.Size(5,5),alignment: go.Spot.Right,
          portId: "out",fromSpot: go.Spot.Right,toSpot:go.Spot.Right,
          fromLinkable: true,toLinkable: true ,
         
        }   
          
        ), );
    mygDiagram.linkTemplate =
        $(go.Link,{ routing:  go.Link.Orthogonal, curve: go.Link.Bezier  },
        $(go.Shape, { stroke: "#898282", strokeWidth: 2 }),
             
  );
  create()
}


function generate() {
       
         let id = () => {
            
           return Math.floor((1 + Math.random()) * 0x10000)
               .toString(16)
               .substring(1);}
         
         
           
           return "node-"+id();
}


function generateKey(){     
  for(i=0; i<nodeDataArray.length ;i++){
    i++; 
  }
  return i;
}


function entierAleatoire(){
  return Math.floor(Math.random() * (200 - 800 + 1)) + 200;
}


function addNode(){
  
    var myPoint = (go.Point, {x: entierAleatoire(), y:-entierAleatoire()});
      if(nodeDataArray.length!=0){
        var b = {key:generateKey(), text: generate(), items: [ "always", enEnterSysomething() ],loc: myPoint.x+" "+ myPoint.y};
        var bpnode=new BPNode(b.key,b.text, b.loc.x,b.loc.y,new Date());
        console.log(bpnode);
        nodeDataArray.push(b);
        myBPdiagram.flow.addNode(bpnode);
        create()
        let param1 = new BPActionParameter("texttosay","#!builtin_text-LkFuYV");
        let action1=new BPAction(BPActionType.say);
        action1.addParameter(param1)
        
        bpnode.addEnterAction(action1.getString());
      }
   else{
      var a = {key:0, text: 'entry', items: [ "always" , enEnterSysomething()],loc:-myPoint.x+" "+ myPoint.y}
      var bpnode1=new BPNode(a.key,a.text, a.loc.x,a.loc.y,new Date());
      console.log(bpnode1);
      nodeDataArray.push(a);
      myBPdiagram.flow.addNode(bpnode1);
      create()
      let param1 = new BPActionParameter("texttosay","#!builtin_text-LkFuYV");
      let action1=new BPAction(BPActionType.say);
      action1.addParameter(param1)
      
      bpnode1.addEnterAction(action1.getString());
       
    }
    
  }
function addLink(){

  console.log("hi");
}   


function enEnterSysomething(){
  var fieldText = document.getElementById("createText").value; 
  var SelectedNode = mygDiagram.selection.first();
  b="say: ";
  if (SelectedNode !== null) {
   
     SelectedNode.data.items[2]=b+fieldText;

     create();
          }


        }
function enEnterExecuteCode(){

}
function changeNodeText(){
  var fieldText = document.getElementById("nameNode").value;
  var SelectedNode = mygDiagram.selection.first();
 
  if (SelectedNode !== null) {
     SelectedNode.data.text=fieldText;
   
  }
  create();
}

function save() {
    document.getElementById("mySavedModel").value = mygDiagram.model.toJson();
    mygDiagram.isModified = false;
}

function saveBP() {
  document.getElementById("mySavedBPModel").value = JSON.stringify(myBPdiagram);
}

function showDivprop() {
    return document.getElementById('myNodeProperties').style.display = "";
  }

function showDivEnEnter() {
    return document.getElementById('onEnter').style.display = "";
  }
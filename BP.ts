enum BPActionType {
    say,
    analytics_set,
    channel_web_sendDataToChat,
    builtin_switchLanguage,
    misunderstood_flag,
    builtin_sendFeedback,
    builtin_appendContext,
    builtin_removeContext,
    builtin_resetContext,
    basic_skills_slot_reset,
    builtin_getGlobalVariable,
    builtin_getNumberOfConversations,
    builtin_incrementNumberOfConversations,
    builtin_resetGlobalVariable,
    builtin_resetSession,
    builtin_setGlobalVariable,
    builtin_setVariable,
    builtin_storeFileLocally,
    builtin_wait,
    hitlnext_handoff,
    builtin_README
}
class  BPActionParameter{
    key: string
    value:string
    
    constructor(key:string, value:string){
        this.key=key;
        this.value =value;
    }

    getValue(){
        return this.value;
    }

    setValue(v:string){
        this.value = v;
    }
    getkey(){
        return this.key;
    }
    setkey(k:string){
        this.key = k;
    } 
    

    // add logic to create the action string out of other directives 
}

class  BPAction{
    

    type:BPActionType
    params:Array<BPActionParameter>
    
    constructor(type:BPActionType){
        this.type=type;
        this.params = new Array<BPActionParameter>();
    }

    getType(){
        return this.type;
    }

    setType(v:BPActionType){
       return this.type = v
    }

    addParameter(p: BPActionParameter){
        this.params.push(p)
    }

    getFirstParameter(){
        return this.params[0].getValue();
    }
    geSecondParameter(){
        return this.params[1].getValue();
    }
    getThirdParameter(){
        return this.params[2].getValue();
    }

    getString(){
        switch(this.type){
            case BPActionType.say :
                return  "say "+ this.getFirstParameter();
            case BPActionType.analytics_set :
                return "analytics/set "+this.getFirstParameter() +","+this.geSecondParameter()+","+this.getThirdParameter();
                //analytics/set {\"metric\":\"val1\",\"group\":\"all\",\"count\":\"1\"}
            case BPActionType.basic_skills_slot_reset :
                return "channel-web/sendDataToChat"+ this.getFirstParameter()+this.geSecondParameter();  
            case 3 :
                return "builtin/switchLanguage"+ this.getFirstParameter();  
            case 4 :
                return "misunderstood/flag"+ this.getFirstParameter(); 
            case 5 :
                return "builtin/sendFeedback"+ this.getFirstParameter();
            case 6 :
                return "builtin/appendContext"+ this.getFirstParameter();
            case 7 :
                return "builtin/removeContext"+ this.getFirstParameter();
            case 8 :
                return "builtin/resetContext"+ this.getFirstParameter();
            case 9 :
                return "basic-skills/slot_reset"+ this.getFirstParameter();
            case 10 :
                return "builtin/getGlobalVariable"+ this.getFirstParameter();  
            case 11 :
                return "builtin/getNumberOfConversations"+ this.getFirstParameter();  
            case 12 :
                return "builtin/incrementNumberOfConversations"+ this.getFirstParameter();  
            case 13 :
                return "builtin/resetGlobalVariable"+ this.getFirstParameter();  
            case 14 :
                return "builtin/resetSession"+ this.getFirstParameter();  
            case 15 :
                return "builtin/setGlobalVariable"+ this.getFirstParameter();  
            case 16 :
                return "builtin/setVariable"+ this.getFirstParameter();
            case 17 :
                return "builtin/storeFileLocally"+ this.getFirstParameter();  
            case 18 :
                return "builtin/wait " + this.getFirstParameter();  
            case 19 :
                return "hitlnext/handoff"+ this.getFirstParameter();  
            case 20 :
                return "builtin/README"+ this.getFirstParameter();                                                 
        }
    }

    // add logic to create the action string out of other directives 
}


class  BPTransition{
    condition:string
    node:string
    conditiontype?:string
    
    constructor(condition:string,node:string,conditiontype?:string){
        this.condition=condition;
        this.node=node;
        this.conditiontype=conditiontype;
    }
}

class BPNode{
    id:	string
    name: string
	next:Array < BPTransition>
	onEnter: Array <BPAction>
    onReceive: Array<BPAction>
    x:	number
    y:	number
    lastModified: Date
    type?: string


    constructor(id:string, name:string,x:number,y:number,lastlastModified:Date,type?:string){
        this.id=id;
        this.name=name;
        this.next = new Array<BPTransition>();
        this.onEnter = new Array<BPAction>();
        this.onReceive = new Array<BPAction>();
        this.x=x;
        this.y=y;
        this.lastModified=new Date();
        this.type=type;
    }

    addTransition(transition:BPTransition)
    {
        this.next.push(transition);
    }
    
    addEnterAction(action: BPAction)
    {
        this.onEnter.push(action);
    }
    
    addReceiveAction(action: BPAction){
       
        this.onReceive.push(action);
    }
}






class Point{
    x:number
    y:number
    constructor(x:number,y:number){
        this.x=x;
        this.y=y;
    }
}


class BPLink  
{  
    source:string
    sourcePort:string
    target:string
    points: Array<Point>
    constructor(source:string, sourcePort:string,target:string)
    {
        this.source=source;
        this.sourcePort=sourcePort;
        this.target=target;
        this.points = new Array<Point>();
    }

    addpoint(p: Point){
        this.points.push(p);
    }
                
}

class CatchAll {
    onReceive:Array<any>;
    next: Array<any>;
    constructor(){
        this.onReceive=new Array<any>();
        this.next=new Array<any>();
    }
   

}


class BPFlow {
    name: string
    location?: string
    version?: string
    flow: string
    // The name of the first node of the flow
    startNode: string
    nodes: Array<BPNode>
    links: Array<BPLink>
   // catchAll :Array<CatchAll>
    catchAll: CatchAll
    //timeoutNode?: string

    // "standard" by default
 


    constructor (name: string ,version: string,flow: string,location: string, startNode: string){
        this.name=name;
        this.version=version;
        this.flow=flow;
        this.location=location;
        this.startNode=startNode;
      //  this.catchAll=new Array<CatchAll>();
      this.catchAll=this.catchAll;
        this.links = new Array<BPLink>();
        this.nodes = new Array<BPNode>();
        this.catchAll=new CatchAll();
        
    }
   
    
    addNode(node: BPNode){
      
        this.nodes.push(node);
    }

    addLink(link: BPLink){
        this.links.push(link);

    }
  /* addcatchall(catchall:CatchAll){
        this.catchAll.push(catchall);
    }*/

}

class BPDiagram{
    flow: BPFlow
    constructor(){
        this.flow = null
    }
    setFlow(flow: BPFlow){
        this.flow= flow
    }
}

function serializer(key:any, value:any) {
    
    if (value instanceof BPAction) {
      return value.getString()
    }
/*
   if (Array.isArray(value)) {
        if(value.length == 0) return null
    }*/




    return value
}

function createFlow(){

     
    
    let param1 = new BPActionParameter("texttosay","#!builtin_text-LkFuYV");
    let action1=new BPAction(BPActionType.say);
    action1.addParameter(param1)
    
    let param2 = new BPActionParameter("texttosay","#!builtin_text-py3YT7");
    
    let action2=new BPAction(BPActionType.say);
    action2.addParameter(param2)


    let node1= new BPNode("entry","entry",125,-30,new Date());
    let node2= new BPNode("5abeb92305","node-0576",415,-35,new Date());

    
    node1.addEnterAction(action1);
    node2.addEnterAction(action2);


    let t1=new BPTransition("true","node-0576"); 
    node1.addTransition(t1);
    
    let t2=new BPTransition("true","END","always");
    node2.addTransition(t2);

    let link1=new BPLink("entry", "out0","5abeb92305");  
    let p1=new Point(325,44);

    let p2=new Point(411,23);
    link1.addpoint(p1);
    link1.addpoint(p2);
   
    
   
    let flow1=new BPFlow("main.flow.json","0.0.1" ,"main.flow.json","main.flow.json","entry");
   
    flow1.addNode(node1);
    flow1.addNode(node2);
    flow1.addLink(link1);
    
     
    let mydiagram = new BPDiagram()
    mydiagram.setFlow(flow1)
    console.log(JSON.stringify(mydiagram, serializer));
}
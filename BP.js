var BPActionType;
(function (BPActionType) {
    BPActionType[BPActionType["say"] = 0] = "say";
    BPActionType[BPActionType["analytics_set"] = 1] = "analytics_set";
    BPActionType[BPActionType["channel_web_sendDataToChat"] = 2] = "channel_web_sendDataToChat";
    BPActionType[BPActionType["builtin_switchLanguage"] = 3] = "builtin_switchLanguage";
    BPActionType[BPActionType["misunderstood_flag"] = 4] = "misunderstood_flag";
    BPActionType[BPActionType["builtin_sendFeedback"] = 5] = "builtin_sendFeedback";
    BPActionType[BPActionType["builtin_appendContext"] = 6] = "builtin_appendContext";
    BPActionType[BPActionType["builtin_removeContext"] = 7] = "builtin_removeContext";
    BPActionType[BPActionType["builtin_resetContext"] = 8] = "builtin_resetContext";
    BPActionType[BPActionType["basic_skills_slot_reset"] = 9] = "basic_skills_slot_reset";
    BPActionType[BPActionType["builtin_getGlobalVariable"] = 10] = "builtin_getGlobalVariable";
    BPActionType[BPActionType["builtin_getNumberOfConversations"] = 11] = "builtin_getNumberOfConversations";
    BPActionType[BPActionType["builtin_incrementNumberOfConversations"] = 12] = "builtin_incrementNumberOfConversations";
    BPActionType[BPActionType["builtin_resetGlobalVariable"] = 13] = "builtin_resetGlobalVariable";
    BPActionType[BPActionType["builtin_resetSession"] = 14] = "builtin_resetSession";
    BPActionType[BPActionType["builtin_setGlobalVariable"] = 15] = "builtin_setGlobalVariable";
    BPActionType[BPActionType["builtin_setVariable"] = 16] = "builtin_setVariable";
    BPActionType[BPActionType["builtin_storeFileLocally"] = 17] = "builtin_storeFileLocally";
    BPActionType[BPActionType["builtin_wait"] = 18] = "builtin_wait";
    BPActionType[BPActionType["hitlnext_handoff"] = 19] = "hitlnext_handoff";
    BPActionType[BPActionType["builtin_README"] = 20] = "builtin_README";
})(BPActionType || (BPActionType = {}));
var BPActionParameter = /** @class */ (function () {
    function BPActionParameter(key, value) {
        this.key = key;
        this.value = value;
    }
    BPActionParameter.prototype.getValue = function () {
        return this.value;
    };
    BPActionParameter.prototype.setValue = function (v) {
        this.value = v;
    };
    BPActionParameter.prototype.getkey = function () {
        return this.key;
    };
    BPActionParameter.prototype.setkey = function (k) {
        this.key = k;
    };
    return BPActionParameter;
}());
var BPAction = /** @class */ (function () {
    function BPAction(type) {
        this.type = type;
        this.params = new Array();
    }
    BPAction.prototype.getType = function () {
        return this.type;
    };
    BPAction.prototype.setType = function (v) {
        return this.type = v;
    };
    BPAction.prototype.addParameter = function (p) {
        this.params.push(p);
    };
    BPAction.prototype.getFirstParameter = function () {
        return this.params[0].getValue();
    };
    BPAction.prototype.geSecondParameter = function () {
        return this.params[1].getValue();
    };
    BPAction.prototype.getThirdParameter = function () {
        return this.params[2].getValue();
    };
    BPAction.prototype.getString = function () {
        switch (this.type) {
            case BPActionType.say:
                return "say " + this.getFirstParameter();
            case BPActionType.analytics_set:
                return "analytics/set " + this.getFirstParameter() + "," + this.geSecondParameter() + "," + this.getThirdParameter();
            //analytics/set {\"metric\":\"val1\",\"group\":\"all\",\"count\":\"1\"}
            case BPActionType.basic_skills_slot_reset:
                return "channel-web/sendDataToChat" + this.getFirstParameter() + this.geSecondParameter();
            case 3:
                return "builtin/switchLanguage" + this.getFirstParameter();
            case 4:
                return "misunderstood/flag" + this.getFirstParameter();
            case 5:
                return "builtin/sendFeedback" + this.getFirstParameter();
            case 6:
                return "builtin/appendContext" + this.getFirstParameter();
            case 7:
                return "builtin/removeContext" + this.getFirstParameter();
            case 8:
                return "builtin/resetContext" + this.getFirstParameter();
            case 9:
                return "basic-skills/slot_reset" + this.getFirstParameter();
            case 10:
                return "builtin/getGlobalVariable" + this.getFirstParameter();
            case 11:
                return "builtin/getNumberOfConversations" + this.getFirstParameter();
            case 12:
                return "builtin/incrementNumberOfConversations" + this.getFirstParameter();
            case 13:
                return "builtin/resetGlobalVariable" + this.getFirstParameter();
            case 14:
                return "builtin/resetSession" + this.getFirstParameter();
            case 15:
                return "builtin/setGlobalVariable" + this.getFirstParameter();
            case 16:
                return "builtin/setVariable" + this.getFirstParameter();
            case 17:
                return "builtin/storeFileLocally" + this.getFirstParameter();
            case 18:
                return "builtin/wait " + this.getFirstParameter();
            case 19:
                return "hitlnext/handoff" + this.getFirstParameter();
            case 20:
                return "builtin/README" + this.getFirstParameter();
        }
    };
    return BPAction;
}());
var BPTransition = /** @class */ (function () {
    function BPTransition(condition, node, conditiontype) {
        this.condition = condition;
        this.node = node;
        this.conditiontype = conditiontype;
    }
    return BPTransition;
}());
var BPNode = /** @class */ (function () {
    function BPNode(id, name, x, y, lastlastModified, type) {
        this.id = id;
        this.name = name;
        this.next = new Array();
        this.onEnter = new Array();
        this.onReceive = new Array();
        this.x = x;
        this.y = y;
        this.lastModified = new Date();
        this.type = type;
    }
    BPNode.prototype.addTransition = function (transition) {
        this.next.push(transition);
    };
    BPNode.prototype.addEnterAction = function (action) {
        this.onEnter.push(action);
    };
    BPNode.prototype.addReceiveAction = function (action) {
        this.onReceive.push(action);
    };
    return BPNode;
}());
var Point = /** @class */ (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
var BPLink = /** @class */ (function () {
    function BPLink(source, sourcePort, target) {
        this.source = source;
        this.sourcePort = sourcePort;
        this.target = target;
        this.points = new Array();
    }
    BPLink.prototype.addpoint = function (p) {
        this.points.push(p);
    };
    return BPLink;
}());
var CatchAll = /** @class */ (function () {
    function CatchAll() {
        this.onReceive = new Array();
        this.next = new Array();
    }
    return CatchAll;
}());
var BPFlow = /** @class */ (function () {
    //timeoutNode?: string
    // "standard" by default
    function BPFlow(name, version, flow, location, startNode) {
        this.name = name;
        this.version = version;
        this.flow = flow;
        this.location = location;
        this.startNode = startNode;
        //  this.catchAll=new Array<CatchAll>();
        this.catchAll = this.catchAll;
        this.links = new Array();
        this.nodes = new Array();
        this.catchAll = new CatchAll();
    }
    BPFlow.prototype.addNode = function (node) {
        this.nodes.push(node);
    };
    BPFlow.prototype.addLink = function (link) {
        this.links.push(link);
    };
    return BPFlow;
}());
var BPDiagram = /** @class */ (function () {
    function BPDiagram() {
        this.flow = null;
    }
    BPDiagram.prototype.setFlow = function (flow) {
        this.flow = flow;
    };
    return BPDiagram;
}());
function serializer(key, value) {
    if (value instanceof BPAction) {
        return value.getString();
    }
    /*
       if (Array.isArray(value)) {
            if(value.length == 0) return null
        }*/
    return value;
}
function createFlow() {
    var param1 = new BPActionParameter("texttosay", "#!builtin_text-LkFuYV");
    var action1 = new BPAction(BPActionType.say);
    action1.addParameter(param1);
    var param2 = new BPActionParameter("texttosay", "#!builtin_text-py3YT7");
    var action2 = new BPAction(BPActionType.say);
    action2.addParameter(param2);
    var node1 = new BPNode("entry", "entry", 125, -30, new Date());
    var node2 = new BPNode("5abeb92305", "node-0576", 415, -35, new Date());
    node1.addEnterAction(action1);
    node2.addEnterAction(action2);
    var t1 = new BPTransition("true", "node-0576");
    node1.addTransition(t1);
    var t2 = new BPTransition("true", "END", "always");
    node2.addTransition(t2);
    var link1 = new BPLink("entry", "out0", "5abeb92305");
    var p1 = new Point(325, 44);
    var p2 = new Point(411, 23);
    link1.addpoint(p1);
    link1.addpoint(p2);
    var flow1 = new BPFlow("main.flow.json", "0.0.1", "main.flow.json", "main.flow.json", "entry");
    flow1.addNode(node1);
    flow1.addNode(node2);
    flow1.addLink(link1);
    var mydiagram = new BPDiagram();
    mydiagram.setFlow(flow1);
    console.log(JSON.stringify(mydiagram, serializer));
}

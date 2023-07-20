export class NetworkConnection{
    static idNumber = 1;
    constructor(name = "", role = "", linkToLinkedin = "", appliedMe = false){
        this.name = name;
        this.role = role;
        this.linkToLinkedin = linkToLinkedin;
        this.appliedMe = appliedMe;
        this.id = NetworkConnection.idNumber++;
    }
}

export class HomeAssignment{
    static idNumber = 1;
    constructor(path = "", name = ""){
        this.path = path;
        this.name = name;
        this.file = new File([path], name);
        this.id = HomeAssignment.idNumber++;
    }
}

export class QuestionsAndAnswer{
    static idNumber = 1;
    constructor(question = "", answer = ""){
        this.question = question;
        this.answer = answer;
        this.id = QuestionsAndAnswer.idNumber++;
    }
}

export class Interview{
    static idNumber = 1;
    constructor(date=new Date(), title = "", conclusions = "", file = null){
        this.date = date;
        this.title = title;
        this.conclusions = conclusions;
        this.file = file;
        this.id = Interview.idNumber++;
    }
}

export const ProcessStatus = {
    Pending : "pending process",
    Open : "open process",
    Closed : "closed process"
}

export class ProcessStep{
    static idNumber = 1;
    constructor(step = "", isCompletedStep = false){
        this.step = step;
        this.isCompletedStep = isCompletedStep;
        this.id = ProcessStep.idNumber++;
    }
}

export class PositionInfo{
    static idNumber = 1;
    constructor(companyName = "", positionLink = "", role = "", connections = 0, steps, status = ProcessStatus.Pending, about = "", techStack = []){
        this.date = new Date();
        this.companyName = companyName;
        this.positionLink = positionLink;
        this.role = role;
        this.connections = connections;
        this.steps = steps ?? [new ProcessStep('Connect with people', false), new ProcessStep('Send CV', false)];
        this.status = status;
        this.about = about;
        this.techStack = techStack;
        this.id = PositionInfo.idNumber++;
    }
}

export class Todo{
    static idNumber = 1;
    constructor(todo = "", isCompleted = false){
        this.todo = todo;
        this.isCompleted = isCompleted;
        this.id = Todo.idNumber++;
    }
}

export class Position{
    // static idNumber = 1;
    constructor(positionInfo = new PositionInfo(), interviews = [], questionsAndAnswers = [], homeAssignments = [], networkConnections = [], todoList = []){
        this.positionInfo = positionInfo;
        this.interviews = interviews;
        this.questionsAndAnswers = questionsAndAnswers;
        this.homeAssignments = homeAssignments;
        this.networkConnections = networkConnections;
        this.todoList = todoList;
        // this.id = Position.idNumber++;
    }
}
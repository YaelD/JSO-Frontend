export class NetworkConnection{
    static idNumber = 1;
    constructor(name, role, linkToLinkedin, appliedMe){
        this.name = name;
        this.role = role;
        this.linkToLinkedin = linkToLinkedin;
        this.appliedMe = appliedMe ?? false;
        this.id = NetworkConnection.idNumber++;
    }
}
export class HomeAssignment{
    static idNumber = 1;
    constructor(path, name){
        this.path = path;
        this.name = name;
        this.file = new File([path], name);
        this.id = HomeAssignment.idNumber++;
    }
}
export class QuestionsAndAnswer{
    static idNumber = 1;
    constructor(question, answer){
        this.question = question;
        this.answer = answer;
        this.id = QuestionsAndAnswer.idNumber++;
    }
}
export class Interview{
    static idNumber = 1;
    constructor(date, title, conclusions, file){
        this.date = date;
        this.title = title;
        this.conclusions = conclusions;
        this.file = file;
        this.id = Interview.idNumber++;
    }
}
export class PositionInfo{
    static idNumber = 1;
    constructor(companyName, positionLink, role, connections, status, about, techStack){
        this.companyName = companyName;
        this.positionLink = positionLink;
        this.role = role;
        this.connections = connections;
        this.status = status;
        this.about = about;
        this.techStack = techStack;
        this.id = PositionInfo.idNumber++;
    }
}
export class Position{
    static idNumber = 1;
    constructor(positionInfo = new PositionInfo(), interviews = [], questionsAndAnswers = [], homeAssignments = [], networkConnections = []){
        this.positionInfo = positionInfo;
        this.interviews = interviews;
        this.questionsAndAnswers = questionsAndAnswers;
        this.homeAssignments = homeAssignments;
        this.networkConnections = networkConnections;
        this.id = Position.idNumber++;
    }
}
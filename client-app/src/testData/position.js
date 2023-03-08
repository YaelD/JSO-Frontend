
let positionId = 0;
let positionQuestionsId = 1;
let interviewId = 1;
let connectionId = 1;
let homeAssignmentsId = 1;

export function incrementConnectionId(){
    return connectionId++;
}

export function createNetworkConnections(name, role, linkToLinkedin, applied){
    const id = connectionId++;
    const appliedMe = applied ?? false;
    return {name, role, linkToLinkedin, appliedMe, id};
}

const networkConnections = [
    createNetworkConnections("Yael davidov", "Software Developer", "https://www.linkedin.com/in/yael-davidov/", true),
    createNetworkConnections("Eldar Sehayek", "Senior Software Architect", "https://www.linkedin.com/in/eldar-sehayek/", false),
    createNetworkConnections("Matan Peretz", "Software Developer", "https://www.linkedin.com/in/matan-peretz/", false)
]

function createFile(path, name){
    return new File([path], name);
}

export function incrementHomeAssignmentsId(){
    return homeAssignmentsId++;
}

const homeAssignments = [
    createFile(["../testData/files/file1.docx"], "file1.docx"),
    createFile(["../testData/files/file2.docx"], "file2.docx"),
    createFile(["../testData/files/file3.pdf"], "file3.pdf")
];

export function incrementPositionQuestionId(){
    return positionQuestionsId++;
}

function createQuestionsForInterviewers(question, answer){
    const id = positionQuestionsId++;
    return { question, answer, id };
}

const questionsAndAnswers = [
    createQuestionsForInterviewers("What is the tech stack?", "Java, MySQL, JS, React"),
    createQuestionsForInterviewers("What is the tech stack?", "Java, MySQL, JS, React"),
    createQuestionsForInterviewers("How many steps are there in the process?", ""),
]

export function incrementInterviewsId(){
    return interviewId++;
}

function createInterview(date, title, conclusions, file){
    const id = interviewId++;
    return { date, title, conclusions, file, id };
}

const interviews = [
    createInterview(new Date(2023, 1, 15).toLocaleDateString(), "HR interview", "need to practice more"),
    createInterview(new Date(2023, 1, 17).toLocaleDateString(), "Tech interview no.1", "need to do more leetcode questions"),
    createInterview(new Date(2023, 1, 30).toLocaleDateString(), "Tech interview no.2", "need to do more leetcode questions"),
    createInterview(new Date(2023, 2, 15).toLocaleDateString(), "CTO interview", "need to do more leetcode questions"),
    // createInterview(new Date(), "HR interview", "need to practice more"),
    // createInterview(new Date(), "Tech interview no.1", "need to do more leetcode questions"),
    // createInterview(new Date(), "Tech interview no.2", "need to do more leetcode questions"),
    // createInterview(new Date(), "CTO interview", "need to do more leetcode questions"),

];

function createPositionInfo(companyName, positionLink, role, connections, status, about, techStack){
    return {companyName, positionLink, role, connections, status, about, techStack}
}

const positionInfo =  createPositionInfo("Google", "lknfnw", "fullStack", 5, "not applied", "something", "C#, MySQL, js...");
    // createPositionInfo("Microsoft", "lknfnw", "fullStack", 5, "not applied", "something", "C#, MySQL, js..."),
    // createPositionInfo("Wix", "lknfnw", "fullStack", 5, "not applied", "something", "C#, MySQL, js..."),
    // createPositionInfo("Facebook", "lknfnw", "fullStack", 5, "not applied", "something", "C#, MySQL, js..."),
    // createPositionInfo("Intel", "lknfnw", "fullStack", 5, "not applied", "something", "C#, MySQL, js..."),


function createPosition(positionInfo, interviews, questionsAndAnswers, homeAssignments, networkConnections){
    const id = positionId++;
    return {id ,positionInfo, interviews, questionsAndAnswers, homeAssignments, networkConnections};
}

const positions = [
    createPosition(positionInfo, interviews, questionsAndAnswers, homeAssignments, networkConnections)
];

export default positions;
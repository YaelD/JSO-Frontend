import { HomeAssignment, Interview, NetworkConnection,
    Position, PositionInfo, QuestionsAndAnswer, ProcessStep, ProcessStatus, Todo } from "../utils/position";

const networkConnections = [
    new NetworkConnection("Yael davidov", "Software Developer", "https://www.linkedin.com/in/yael-davidov/", true),
    new NetworkConnection("Eldar Sehayek", "Senior Software Architect", "https://www.linkedin.com/in/eldar-sehayek/", false),
    new NetworkConnection("Matan Peretz", "Software Developer", "https://www.linkedin.com/in/matan-peretz/", false)
]

const homeAssignments = [
    new HomeAssignment(["../testData/files/file1.docx"], "file1.docx"),
    new HomeAssignment(["../testData/files/file2.docx"], "file2.docx"),
    new HomeAssignment(["../testData/files/file3.pdf"], "file3.pdf")
];

const questionsAndAnswers = [
    new QuestionsAndAnswer("What is the tech stack?", "Java, MySQL, JS, React"),
    new QuestionsAndAnswer("What is the tech stack?", "Java, MySQL, JS, React"),
    new QuestionsAndAnswer("How many steps are there in the process?", ""),
]

const interviews = [
    new Interview(new Date(2023, 1, 15), "HR interview", "need to practice more"),
    new Interview(new Date(2023, 1, 17), "Tech interview no.1", "need to do more leetcode questions"),
    new Interview(new Date(2023, 1, 30), "Tech interview no.2", "need to do more leetcode questions"),
    new Interview(new Date(2023, 2, 15), "CTO interview", "need to do more leetcode questions"),
];

const processSteps = [
    new ProcessStep('Connect with people', true),
    new ProcessStep('Send CV', false),
    new ProcessStep('Wait for response', false),
];

const todoList = [
    new Todo('hug Matan'),
    new Todo('send CV', true),
    new Todo('to do home assignment'),
    new Todo('learn SQL', true)
]
 
const positionInfo =  new PositionInfo("Google", "lknfnw", "fullStack", 5, processSteps, ProcessStatus.Pending , "something", "C#, MySQL, js...");

const positions = {"positions" : []};
const newPosition = new Position(positionInfo, interviews, questionsAndAnswers, homeAssignments, networkConnections, todoList);
const positionId = newPosition.id;

const positionsArr = positions["positions"];
positionsArr.push(newPosition);
// console.log(JSON.stringify(positions));

export default positions;
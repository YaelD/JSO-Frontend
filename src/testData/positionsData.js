import { HomeAssignment, Interview, NetworkConnection,
    Position, PositionInfo, QuestionsAndAnswer, ProcessStep, ProcessStatus } from "../utils/position";

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
    new Interview(new Date(2023, 1, 15).toLocaleDateString(), "HR interview", "need to practice more"),
    new Interview(new Date(2023, 1, 17).toLocaleDateString(), "Tech interview no.1", "need to do more leetcode questions"),
    new Interview(new Date(2023, 1, 30).toLocaleDateString(), "Tech interview no.2", "need to do more leetcode questions"),
    new Interview(new Date(2023, 2, 15).toLocaleDateString(), "CTO interview", "need to do more leetcode questions"),
];

const processSteps = [
    new ProcessStep('Connect with people', true),
    new ProcessStep('Send CV', false),
    new ProcessStep('Wait for response', false),
];
 
const positionInfo =  new PositionInfo("Google", "lknfnw", "fullStack", 5, processSteps, ProcessStatus.Pending , "something", "C#, MySQL, js...");

const positions = new Map();
const newPosition = new Position(positionInfo, interviews, questionsAndAnswers, homeAssignments, networkConnections);

positions.set(newPosition.id, newPosition);

export default positions;
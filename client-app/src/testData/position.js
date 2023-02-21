
let positionId = 1;


function createInterview(date, title, conclusions){
    return { date, title, conclusions }
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


function createPosition(positionInfo, interviews){
    const id = positionId++;
    return {id ,positionInfo, interviews}
}

const positions = [
    createPosition(positionInfo, interviews)
];

export default positions;
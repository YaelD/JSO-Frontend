
let rowId = 1;

function createData(companyName, positionLink, position, connections, status, ) {
    const id = rowId++;
    return { companyName, positionLink, position, connections, status, id};
}
  
const rows = [
    createData("Google", "lknfnw", "fullStack", 5, "not applied"),
    createData("Microsoft", "lknfnw", "fullStack", 5, "not applied"),
    createData("Wix", "lknfnw", "fullStack", 5, "not applied"),
    createData("Facebook", "lknfnw", "fullStack", 5, "not applied"),
    createData("Intel", "lknfnw", "fullStack", 5, "not applied"),
];

export default rows;
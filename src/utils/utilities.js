export function handleDownloadFile(file) {
    try {
        //create a temporary URL for the file
        const fileURL = URL.createObjectURL(file);

        //create a temporary link element and trigger the download
        const link = document.createElement('a');
        link.href = fileURL;
        link.download = file.name;
        link.click();

        //clean up the temporary URL
        URL.revokeObjectURL(fileURL);
    }
    catch (error) {
        console.error('Error downloading file:', error);
    }
}

export function createAllTodos(positions) {
    const res = [];
    positions.forEach((position) => {
        res.push(...position.todoList);
    });
    return res;
}

export function filterAndSortPositions(positions, status, order) {
    let filteredPositions = positions.slice();
    if (status !== "All positions") {
        filteredPositions = filteredPositions.filter((currPosition) => {
            return currPosition.positionInfo.status === status
        });
    }
    const sortedPositions = filteredPositions.sort((obj1, obj2) => {
        if (order === 'desc') {
            return obj2.positionInfo.date - obj1.positionInfo.date;
        }
        else {
            return obj1.positionInfo.date - obj2.positionInfo.date;
        }
    });
    return sortedPositions;
}
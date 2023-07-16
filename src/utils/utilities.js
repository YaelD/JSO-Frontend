export function handleDownloadFile(file){
    try{
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
    catch(error){
        console.error('Error downloading file:', error);
    }
}
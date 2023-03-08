import { useState } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import CardActions from '@mui/material/CardActions';
import FileDownloadIcon from '@mui/icons-material/FileDownload';


function FileCard({ file }){

  function handleDownload(){
    // Creating new object file
    const fileURL = window.URL.createObjectURL(file);
    // Setting various property values
    let alink = document.createElement('a');
    alink.href = fileURL;
    alink.download = file.name;
    alink.click();
  }

    return (
        <Card sx={{ width: 275, height: 200 }} >
            <CardActions>
                <IconButton aria-label="download" name="downloadButton" onClick={handleDownload}>
                    <FileDownloadIcon />
                </IconButton>
                <IconButton aria-label="download" name="deleteButton" onClick={(event)=>{
                    alert("file deleted");
                    }}>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
            <CardMedia
                component="img"
                sx={{ height: 100, objectFit: "contain" }}
                image={"/images/file_icon.png"}
                alt="Paella dish"
            />
            <CardContent>
                <Typography variant="p" component="div">
                    {file.name} 
                </Typography>
            </CardContent>
        </Card>
    );
}


export default function HomeAssignments({ position }) {
  const [fileList, setFileList] = useState(position.homeAssignments);

  const handleFileChange = (e) => {
    setFileList((prevFileList)=>{
      let newFileList = [...prevFileList, ...e.target.files];
      position.homeAssignments = newFileList;
      return newFileList;
    });
  };

//   const handleUploadClick = () => {
//     if (!fileList) {
//       return;
//     }

//     // 👇 Create new FormData object and append files
//     const data = new FormData();
//     files.forEach((file, i) => {
//       data.append(`file-${i}`, file, file.name);
//     });

//     // 👇 Uploading the files using the fetch API to the server
//     fetch('https://httpbin.org/post', {
//       method: 'POST',
//       body: data,
//     })
//       .then((res) => res.json())
//       .then((data) => console.log(data))
//       .catch((err) => console.error(err));
//   };

  // 👇 files is not an array, but it's iterable, spread to get an array of files

  return (
    <div>
        <Button variant="contained" component="label" sx={{mb:5, mt:3}}>
            Upload Files
            <input type="file" hidden onChange={handleFileChange} multiple/>
        </Button>

      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {fileList.map((file, index) => {
            return(
                <Grid item xs={2} sm={4} md={4} key={index}>
                  <FileCard 
                    key={index}
                    file={file}
                  />
                </Grid>
            );
          })}
      </Grid>
    </div>
  );
}

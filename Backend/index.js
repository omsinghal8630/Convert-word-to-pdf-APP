const express = require('express')
const multer = require('multer')
const cors = require("cors");
const docxToPDF = require('docx-pdf');
const fs = require('fs')
const path = require("path")
const app = express()
const port = 3000
app.use(cors());

const storage = multer.diskStorage({
  destination: function(req,file, cb) {
    cb(null,'uploads')
  
  },
  filename: function (req, file, cb) {
    
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage })


// const outputDir = path.join(__dirname, 'files');
// if (!fs.existsSync(outputDir)) {
//   fs.mkdirSync(outputDir, { recursive: true });
// }




app.post("/convertFile", upload.single("file"), (req, res, next) =>
{
  try
  {
    if (!req.file)
    {
      return res.status(400).json({
        message: "No file uploaded",
      })
    }
    let outputPath = path.join(__dirname, "files", `${req.file.originalname}.pdf`);
    docxToPDF(req.file.path,outputPath,(err,result)=> {
  if(err){
    console.log(err);
    return res.status(500).json({
      message: "Error converting docx to pdf",
    })
      }
      res.download(outputPath, () =>
      {
        console.log("file downloaded")
      })
  console.log('result'+result);
});
  } catch (error)
  {
    console.log(error)
    res.status(500).json({
      message:"Internal server error",
    })
    
  }
})

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})


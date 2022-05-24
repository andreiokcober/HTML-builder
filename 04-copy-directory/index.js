const fs = require('fs/promises')
const path = require('path')
const newFile = path.join(__dirname,'files-copy')
const oldFile = path.join(__dirname, 'files')

 async function copyDir(){
      fs.rm(path.join(__dirname,'files-copy'),{recursive:true,force:true})
      .then(()=>{
           fs.mkdir(newFile,{recursive:true})
             fs.readdir(oldFile,{withFileTypes: true})
             .then((files)=>{
                 files.forEach((file)=>{
                     if(file.isFile()){
                         let firstFilePath = path.join(oldFile,file.name)
                         let secondFilePath = path.join(newFile,file.name)
                         fs.copyFile(firstFilePath,secondFilePath)
                     }
                 })
             })    
          
      })        
     } 
copyDir()
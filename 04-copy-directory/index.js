const fs = require('fs/promises')
const fss = require('fs')
const path = require('path')

async function copyDir(){
     const copy = async () => {
         const readFile = await fs.readdir(path.join(__dirname, 'files'), (err,data) => {
          if(err) throw err
     })
         readFile.forEach((file) =>{
          fss.copyFile(path.join(__dirname, 'files',file),path.join(__dirname,'files-copy',file),(err)=>{
               if(err) throw err
          } )
     })
     } 
     const readFileCopy = await fs.readdir(path.join(__dirname),(err,data)=>{
          if(err) throw err  
     })
     if(readFileCopy.includes('files-copy')){
         const deleteFile = await fs.rm(path.join(__dirname,'files-copy'),{recursive:true})
         const fileDir = await fs.mkdir(path.join(__dirname,'files-copy'),{recursive:true})  
         copy() 
     }
     else{
          const mkdir = await fs.mkdir(path.join(__dirname,'files-copy'),{recursive:true})
          copy()
     }     
}
copyDir()
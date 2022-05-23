const fs = require('fs')
const fss = require('fs/promises')
const path = require('path')


async function createCssStyles(){
    const readStyles = await fss.readdir(path.join(__dirname, 'styles'),{encoding:'utf-8', withFileTypes:true} )
    const arrCssFile = []   
    for(file of readStyles){
        if(!file.isDirectory() && path.extname(file.name) === '.css'){
            arrCssFile.push(file.name)
        }
    }
    console.log(arrCssFile)
    const creatDir = await fs.writeFile(path.join(__dirname,'project-dist','bundle.css'),'',(err,data)=>{
        if(err) throw err
        
    })
    arrCssFile.forEach(async (file)=>{
     
         fs.copyFile(path.join(__dirname,'styles',file),path.join(__dirname,'project-dist','bundle.css'),(err)=>{
            if(err) throw err
            
        })  
    })
    
    
        
    
}
createCssStyles()
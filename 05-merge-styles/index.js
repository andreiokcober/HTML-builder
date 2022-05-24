const fs = require('fs')
const path = require('path')
const bundle = fs.createWriteStream(path.join(__dirname,'project-dist','bundle.css'))

const createCssFile = (way)=>{
    fs.readdir(way,{withFileTypes: true},(err,files)=>{
        if(err) throw err
       files.forEach((file)=>{
           if(file.isFile() && path.extname(file.name) === '.css'){
            copyCssFile(file.name)
           }
       })
    })
}
createCssFile(path.join(__dirname,'styles'))


function copyCssFile(file){
    const rs = fs.createReadStream(path.join(__dirname,'styles',file),'utf-8')
    rs.pipe(bundle)
    rs.on('error', err=> console.log(err))


}
// async function createCssStyles(){
//     const readStyles = await fss.readdir(path.join(__dirname, 'styles'),{encoding:'utf-8', withFileTypes:true} )
//     const arrCssFile = []   
//     for(file of readStyles){
//         if(!file.isDirectory() && path.extname(file.name) === '.css'){
//             arrCssFile.push(file.name)
//         }
//     }
//     console.log(arrCssFile)
//     const creatDir = await fs.writeFile(path.join(__dirname,'project-dist','bundle.css'),'',(err,data)=>{
//         if(err) throw err
        
//     })
//     arrCssFile.forEach(async (file)=>{
     
//          fs.copyFile(path.join(__dirname,'styles',file),path.join(__dirname,'project-dist','bundle.css'),(err)=>{
//             if(err) throw err
            
//         })  
//     })
    
    
        
    
// }
// createCssStyles()
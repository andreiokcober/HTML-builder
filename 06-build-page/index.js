const path = require('path')
const fs = require('fs')

const bundle = fs.createWriteStream(path.join(__dirname,'project-dist','style.css'))
const styles = path.join(__dirname,'styles')
const assetsOld = path.join(__dirname,'assets')
const assetsNew = path.join(__dirname,'project-dist','assets')


const projectBuld = path.join(__dirname,'project-dist')

async function projectBuild() {
    fs.promises.mkdir(projectBuld,{recursive:true})
    createCssFile(styles)
    copyDir(assetsNew)
}

const createCssFile = (direction) =>{
    fs.readdir(direction,{withFileTypes: true},(err,files)=>{
        if(err) throw err
        files.forEach((file)=>{
           if(file.isFile() && path.extname(file.name) === '.css'){
            copyCssFile(file.name)
           }
        })
    })
} 

function copyCssFile(file) {
    const rs = fs.createReadStream(path.join(__dirname,'styles',file),'utf-8')
    rs.pipe(bundle)
    rs.on('error', err=> console.log(err))
}

async function copyDir(){
    fs.promises.rm( path.join(__dirname,'project-dist','assets'), {recursive:true,force:true})
    .then( () => {
        fs.promises.mkdir(assetsNew,{recursive:true})
        fs.promises.readdir(assetsOld,{withFileTypes: true})
        .then((files) => {
            for(let file of files){
                if(file.isDirectory()){
                    fs.promises.mkdir(path.join(__dirname,'project-dist','assets',`${file.name}`),{recursive:true})
                }
                // if(file.isFile()){
                //     console.log('file')
                // }
                // let firstFilePath = path.join(assetsOld,file.name)
                // let secondFilePath = path.join(assetsNew,file.name)
                // fs.promises.copyFile(firstFilePath,secondFilePath)
            }
            
                
                 
            
        }) 
          
    })        
} 
projectBuild()
const path = require('path')
const fs = require('fs')

const bundle = fs.createWriteStream(path.join(__dirname,'project-dist','style.css'))
const styles = path.join(__dirname,'styles')
const assetsOld = path.join(__dirname,'assets')
const assetsNew = path.join(__dirname,'project-dist','assets')
const projectBuld = path.join(__dirname,'project-dist')
const templateHtml = path.join(__dirname,'template.html')
const components = path.join(__dirname,'components')
const indexHtml = path.join(__dirname,'project-dist', 'index.html')

async function projectBuild() {
    fs.rm(assetsNew,{recursive:true,force:true}, (err) => {
        if(err) throw err
    })
    fs.promises.mkdir(projectBuld,{recursive:true}, (err) => {
        if(err) throw err
    })
    createCssFile(styles)
    copyDir(assetsOld,assetsNew)
    createHtmlBuild()
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

async function copyDir(src,dist){
       await fs.promises.rm(dist, {force:true,recursive:true}, (err) => {
            if(err) throw err
        })
        await fs.mkdir(dist,{recursive:true},(err) => {
            if(err) throw err
        }) 
        fs.readdir(src, {withFileTypes: true}, (err, files) => {
            if(err) throw err
            files.forEach( file => {
                let newSrc = path.join(src,file.name)
                let newdist = path.join(dist,file.name)
                if(file.isFile()) {
                    fs.promises.copyFile(newSrc,newdist)
                } else if (file.isDirectory()){
                    copyDir(newSrc,newdist)
                }
            })
        })         
}

function createHtmlBuild() {
    let template = fs.createReadStream(templateHtml)
    template.on('data',data => {
        let innerHtml = data.toString()
        fs.readdir(components,{withFileTypes:true,}, (err, data) => {
            if(err) throw err
            data.forEach( file => {
                if(file.isFile && path.extname(file.name) === '.html') {
                    const componentsFile = path.join(components,file.name)
                    fs.readFile(componentsFile, (err,data) => {
                        if(err) throw err
                        data = data.toString()
                        innerHtml = innerHtml.replace(`{{${file.name.slice(0,-5)}}}`, data)
                        const newHtmlFile = fs.createWriteStream(indexHtml)
                        newHtmlFile.write(innerHtml)
                    })
                }
            })
        })
    })
}

projectBuild()
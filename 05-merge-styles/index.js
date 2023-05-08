const fs = require('fs')
const path = require('path')
const styles = path.join(__dirname,'styles')
const bundle = fs.createWriteStream(path.join(__dirname,'project-dist','bundle.css'))

const createCssFile = (direction)=>{
    fs.readdir(direction,{withFileTypes: true},(err,files)=>{
        if(err) throw err
       files.forEach((file)=>{
           if(file.isFile() && path.extname(file.name) === '.css'){
            copyCssFile(file.name)
           }
       })
    })
}  
createCssFile(styles) 
function copyCssFile(file){
    const rs = fs.createReadStream(path.join(__dirname,'styles',file),'utf-8')
    rs.pipe(bundle)
    rs.on('error', err=> console.log(err))
}




                                        /* 2-й вариант решения не доделанный*/
// async function createCssStyles(){
//     fs.writeFile(
//         path.join(__dirname,'project-dist','bundle.css'),
//         '',
//         ( err ) => {
//             if(err) throw err
//         }
//     ) 
//     fs.readdir(path.join(__dirname, 'styles'),{encoding:'utf-8', withFileTypes:true},(err,data) => {
//         if(err) throw err  
//     for(let file of data){
//         if(!file.isDirectory() && path.extname(file.name) === '.css') {
//             const rs = fs.createReadStream(path.join(__dirname,'styles',file.name,(err, data) => {
//                 console.log(data)
//             }))
//             fs.appendFile(
//                 path.join(__dirname,'project-dist','bundle.css'),
//                 `${rs}`,
//                 (err) => {
//                 if(err) throw err
//             })
            
        
//         }
//     }
//     })
// }
// createCssStyles()
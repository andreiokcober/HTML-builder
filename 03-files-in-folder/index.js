const path = require('path')
const fs = require('fs/promises')
const {stat} = require('fs')



async function readdir() {
  try {
    const files = await fs.readdir(path.join(__dirname,'secret-folder'),{encoding:'utf-8', withFileTypes:true});
    for (const file of files)
      if(!file.isDirectory()) {
        const ext = path.extname(file.name)
        const baseName = path.basename(file.name,ext)
        stat(path.join(__dirname,`secret-folder/${file.name}`),(err,stats)=>{
          if(err) throw err  
          let fileSize = stats.size + 'kb'
          console.log(`${baseName} - ${ext.slice(1)} - ${fileSize} `)
        })
      }
  } catch (err) {
  console.error(err);
}
}
readdir()
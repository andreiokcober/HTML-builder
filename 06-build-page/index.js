const fs = require('fs');
const fss = require('fs/promises');
const path = require('path');

fs.access(path.join(__dirname, 'project-dist'), err=>{
    if(err){
        const htmlFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
        const tempHtml = fs.createReadStream(path.join(__dirname, 'template.html'), 'utf-8');
        tempHtml.pipe(htmlFile);
        htmlCreate(path.join(__dirname, 'template.html'));
    }else{
        htmlCreate(path.join(__dirname, 'project-dist', 'index.html'));
    }
});
fs.mkdir(path.join(__dirname, 'project-dist'), {recursive:true}, err=>err);
let wayCopyAssets = path.join(__dirname, 'project-dist', 'assets');
fs.mkdir(wayCopyAssets, {recursive:true}, err=>err);



const css = fs.createWriteStream(path.join(__dirname, 'project-dist', 'style.css'));

function copyCssFile(way, copyWay){ 
    fss.rm(copyWay, {recursive: true, force: true,})
    .then(() => {
        fss.mkdir(copyWay, {recursive: true});
        fss.readdir(way, {withFileTypes: true})
            .then((files) => {
                files.forEach( (item)=>{
                    if (item.isFile()) {
                        fss.copyFile(path.join(way, item.name), path.join(copyWay, item.name));
                    }else{
                        copyCssFile(path.join(way, item.name), path.join(copyWay, item.name));
                    }
                });
            });
    });
}

copyCssFile(path.join(__dirname, 'assets'), wayCopyAssets);

function copyStyleFiles(way){
    fs.readdir(way, {withFileTypes: true}, (err, files)=>{
        if(err) throw err;
        files.forEach(item=>{
            if(item.isFile()){
                pipeCssfile(item.name);
            }else{
                // console.log('Folder, not file');
            }
        });
    });
}
copyStyleFiles(path.join(__dirname, 'styles'));

function pipeCssfile(file){
    const rs = fs.createReadStream(path.join(__dirname, 'styles', file));
    rs.pipe(css);
    rs.on('error', err=> console.log(err));
}

function saveToIndex (str)  {
    let htmlFile = fs.createWriteStream(path.join(__dirname, 'project-dist', 'index.html'));
    htmlFile.write(str);
}
function htmlCreate(way){
    fs.readFile(way, 'utf-8', (err, data)=>{
        if(err)console.log(err);
        let templateOrg = data;
        if(!data.match(/{{(.*?)}}/g)){
            return '';
        }
        let allTemplateTags = data.match(/{{(.*?)}}/g).map( function(val) {
            return val;
        });
    
        allTemplateTags.forEach( (item,index) => {
            let component_name = item.replace('{{', '').replace('}}', '');
    
            fs.readFile(path.join(__dirname, 'components', `${component_name}.html` ), 'utf-8', (err, data)=>{
                if(err)console.log(err);
                
                templateOrg = templateOrg.replace(item, data);
                
                if(allTemplateTags.length -1 === index){
                    saveToIndex(templateOrg);
                }
            }); 
        });
    });
}
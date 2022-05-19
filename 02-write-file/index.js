const fs = require('fs')
const path = require('path')
const {stdin,stdout,exit} = process

fs.writeFile(
    path.join(__dirname,'text.txt'),
    '',
    (err) => {
        if(err) throw err
    }
    )
stdout.write('Приветствую тебя. Введите пожалуйста текст\n')
stdin.on('data', (data) => {
        let exit = data.toString().trim()
        let dataTextDouble = data.toString()
        if(exit === 'exit' ) process.exit()
        fs.appendFile(
            path.join(__dirname, 'text.txt'),
            `${dataTextDouble}`,
            (err) => {
                if(err) throw err
            }
        )
        
})
 process.on('SIGINT',()=> {
     process.exit()
    })
process.on('exit', ()=> stdout.write('Удачи в изучении Node js\n'))

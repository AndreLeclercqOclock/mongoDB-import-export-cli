#!/usr/bin/env node

const { exec } = require('child_process')
const readline = require('readline')
const fs = require('fs')
const config = require('./config_mcli.json')

// Manage arguments from command-line
if(config.db === '' || config.folder === ''){
    editConfig()
} else if(process.argv.includes('config')){
    if(process.argv.includes('show')){
        console.log(config)
    } else if (process.argv.includes('edit')){
        editConfig()
    }
} else if(process.argv.includes('export')){
    impExp('mongoexport')
} else if(process.argv.includes('import')){
    impExp('mongoimport')
} else if(process.argv.includes('backup')) {
    backup()
}else if(process.argv.includes('help')){
    console.log(` 
Usage : mcli < command >
where command is one of :
 config edit (Edit config file)
 config show (Show config file)
 import --c=myCollection (Import collection 'myCollection' from JSON file)
 export --c=myCollection (Export collection 'myCollection' to JSON file)
 import --c=myCollection --f=my-folder/my-file.json (Import collection 'MyCollection' from specific JSON file
 export --c=myCollection --f=my-folder/my-file.json (Export collection 'MyCollection' to specific JSON file
 help (List all commands)
 `)
}

/**
 * BackUp and Compress BackUp all Database
 * @function
 */
function backup(){
    let backUpName = `backUp_${Date.now()}`
    let backUpFolder = `${config.folder}/${backUpName}`
    exec(`mongodump --db=${config.db} --out=${backUpFolder}`, (e, stdout, stderr) => {
        if(e){
            console.log(`error: ${e.message}`)
            return
        }
        if(stderr){
            console.log(`${stderr}`)
            if(process.argv.includes('--tar')){
                exec(`tar -czvf ${backUpFolder}.tar.gz ${backUpFolder}`, (e, stdout, stderr) => {
                    if(e){
                        console.log(`error: ${e.message}`)
                        return
                    }
                    if(stderr){
                        console.log(`${stderr}`)
                        exec(`cd ${config.folder} && rm -rf ${backUpName}`, (e, stdout, stderr) => {
                            if(e){
                                console.log(`error: ${e.message}`)
                                return
                            }
                            if(stderr){
                                console.log(`${stderr}`)
                                return
                            }
                            console.log(`stdout: ${stdout}`)
                        })
                        return
                    }
                    console.log(`stdout: ${stdout}`)

                })
            }
            return
        }
        console.log(`stdout: ${stdout}`)
    })

}

/**
 * Import / Export collection from/to JSON
 * @function
 * @param action {string}
 */
function impExp(action){
    let cArg = action === 'mongoimport' ? '--drop --file=' : '--out='
    let collection = ''
    let jsonFile = ''

    process.argv.forEach(a => {
        if (a.substring(0, 4) === '--c=')
            collection = a.replace(a.substring(0, 4), '')
        else if (a.substring(0, 4) === '--f=')
            jsonFile = a.replace(a.substring(0, 4), '')
    })

    if(jsonFile === '')
        jsonFile = `${config.folder}/${collection}.json`
    else if(jsonFile.substr(jsonFile.length - 5) !== '.json')
        jsonFile += '.json'

    if(collection !== ''){
        exec(`${action} --collection=${collection} --db=${config.db} ${cArg}${jsonFile}`, (e, stdout, stderr) => {
            if(e){
                console.log(`error: ${e.message}`)
                return
            }
            if(stderr){
                console.log(`${stderr}`)
                return
            }
            console.log(`stdout: ${stdout}`)
        })
    } else console.log('Collection not defined, add arguments --c=collection in your command line')
}

/**
 * Edit config file
 * @function
 */
function editConfig(){
    let dataConfig = config
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.question(`What's your database Name ? `, (dbName) => {
        rl.question(`What's the default folder to save JSON files ? `, (folder) => {
            if(folder.slice(-1) === '/')
                folder = folder.slice(0, -1)
            dataConfig.folder = folder
            dataConfig.db = dbName
            console.log('The config file has been updated')
            rl.close()
            fs.writeFile('./node_modules/mongodb-import-export-cli/config_mcli.json', JSON.stringify(dataConfig, null, 4), e => e ? console.log(e) : null)
        })
    })
}
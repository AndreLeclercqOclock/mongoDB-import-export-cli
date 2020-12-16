#!/usr/bin/env node

// TODO: Add backup commands

const { exec } = require('child_process')
const readline = require('readline')
const config = require('./config_mcli.json')
const fs = require('fs')
let dataConfig = config
let collection = ''
let jsonFile = ''


process.argv.forEach(a => {
    if (a.substring(0, 4) === '--c=') {
        collection = a.replace(a.substring(0, 4), '')
    } else if (a.substring(0, 4) === '--j='){
        jsonFile = a.replace(a.substring(0, 4), '')
    }
})

if(jsonFile !== ''){
    jsonFile = `${config.folder}/${collection}.json`
} else if(jsonFile.substring(0, -5) !== '.json') {
    jsonFile += '.json'
}

if(config.db === '' || config.folder === ''){
    editConfig()
} else if(process.argv.includes('config')){
    if(process.argv.includes('show')){
        console.log(config)
    } else if (process.argv.includes('edit')){
        editConfig()
    }
} else if(process.argv.includes('export')){
    if(collection !== ''){
        exec(`mongoexport --collection=${collection} --db=${config.db} --out=${jsonFile}`, (e, stdout, stderr) => {
            if (e) {
                console.log(`error: ${e.message}`)
                return
            }
            if (stderr) {
                console.log(`${stderr}`)
                return
            }
            console.log(`stdout: ${stdout}`)
        });
    } else console.log('Collection not defined, add arguments --c=collection in your command line')

} else if(process.argv.includes('import')){
    if(collection){
        exec(`mongoimport --collection=${collection} --db=${config.db} --drop --file=${jsonFile}`, (e, stdout, stderr) => {
            if (e) {
                console.log(`error: ${e.message}`)
                return
            }
            if (stderr) {
                console.log(`${stderr}`)
                return
            }
            console.log(`stdout: ${stdout}`)
        });
    } else console.log('Collection not defined, add arguments --c=collection in your command line')
} else if(process.argv.includes('help')){
    console.log('')
    console.log("Usage : mcli <command>")
    console.log("where command is one of :")
    console.log(" config edit (Edit config file)")
    console.log(" config show (Show config file)")
    console.log(" import --c=myCollection (Import collection 'myCollection' from JSON file)")
    console.log(" export --c=myCollection (Export collection 'myCollection' to JSON file)")
    console.log(" import --c=myCollection --j=my-folder/my-file.json (Import collection 'MyCollection' from specific JSON file")
    console.log(" export --c=myCollection --j=my-folder/my-file.json (Export collection 'MyCollection' to specific JSON file")
    console.log(" help (List all commands)")
    console.log('')
}


function editConfig(){
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rl.question(`What's your database Name ? `, (dbName) => {
        rl.question(`What's the default folder to save JSON files ? `, (folder) => {
            dataConfig.db = dbName
            if(folder.slice(-1) === '/')
                folder = folder.slice(0, -1)
            dataConfig.folder = folder
            console.log('The config file has been updated')
            rl.close()
            writeConfig()
        })
    })
}

function writeConfig(){
    fs.writeFile('./node_modules/mongodb-import-export-cli/config_mcli.json', JSON.stringify(dataConfig, null, 4), e => e ? console.log(e) : null)
}
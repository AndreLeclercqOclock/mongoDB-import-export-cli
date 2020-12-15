#!/usr/bin/env node

/**
 * TODO: Create CLI command
 * TODO: Add advanced commands
 * TODO: Create package
 * TODO: Test package
 * TODO: Review code
 * TODO: Publish package
 * TODO: Change GIT source to Public
 */

const { exec } = require('child_process')
const readline = require('readline')
const config = require('./config.json')
const fs = require('fs')
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
let dataConfig = config
let collection

process.argv.forEach(a => {
    if (a.substring(0, 4) === '--c=') {
        collection = a.replace(a.substring(0, 4), '')
    }
})

checkConfigDb()

if(process.argv.includes('config')){
    if(process.argv.includes('show')){
        console.log(config)
    } else if (process.argv.includes('edit')){
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        rl.question(`What's your database Name ? `, (dbName) => {
            rl.question(`What's the default folder to save JSON files ? `, (folder) => {
                dataConfig.db = dbName
                dataConfig.folder = folder
                console.log('The config file has been updated')
                rl.close()
                writeConfig()
            })
        })
    }
} else if(process.argv.includes('export')){
    if(collection){
        exec(`mongoexport --collection=${collection} --db=${config.db} --out=${config.folder}/${collection}.json`, (e, stdout, stderr) => {
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
        exec(`mongoimport --collection=${collection} --db=${config.db} --drop --file=${config.folder}/${collection}.json`, (e, stdout, stderr) => {
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
    console.log(" help (List all commands)")
    console.log('')
}

function checkConfigDb(){
    if(config.db === ''){
        console.log('Database Name not defined')
        rl.question(`What's your database Name ? `, (dbName) => {
            dataConfig.db = dbName
            checkConfigFolder()
        })
    } else checkConfigFolder()
}

function checkConfigFolder(){
    if(config.folder === '') {
        console.log('Default folder to export/import JSON files not defined')
        rl.question(`What's the default folder to save JSON files ? `, (folder) => {
            dataConfig.folder = folder
            rl.close()
            writeConfig()
        })
    } else {
        rl.close()
        writeConfig()
    }
}

function writeConfig(){
    fs.writeFile('./config.json', JSON.stringify(dataConfig, null, 4), e => e ? console.log(e) : null)
}
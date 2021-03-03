# mongoDB-import-export-cli

**THIS PROJECT IS DEPENDENCIES FREE**

Import and Export mongoDB collection to JSON file and create Backup from your database.
You can use it for database versionning or just export/import your DB.
Works only in localhost mongodb://localhost/.

## Help Me
This project need your help, if you find any bug you can create a new issue [here](https://github.com/AndreLeclercq/mongoDB-import-export-cli/issues)

## Install
You need to have MongoDB on your computer/server. [Read Mongo Docs](https://docs.mongodb.com/manual/installation/)

Install the package `npm i mongodb-import-export-cli`

__Doesn't work in global.__

## Use it (command)

### Config & Help
- Edit Config : `mcli config edit`
- Show Config : `mcli config show`
- Help : `mcli help`

### Import / Export Collection(s)

- Import Collection : `mcli import --c=collection_name`
- Export Collection : `mcli export --c=collection_name`
- Import Collection from specific file :

`mcli import --c=collection_name --f=my-folder/my-file.json`
- Export Collection to specific file :
  
`mcli export --c=collection_name --f=my-folder/my-file.json`

### BackUp / Restore Database

- BackUp Database : `mcli backup`
- BackUp and compress (tar.gz) Database : `mcli backup --tar`

## ToDo

### Multiple Import/Export
- Add multiple Import `mcli import --c=collection1,collection2`
- Add multiple Export `mcli export --c=collection1,collection2`

### Restore
- Add Restore from backup directory or archive

## Links
* [Sources From Github](https://github.com/AndreLeclercq/mongoDB-import-export-cli)

* [NPM package](https://www.npmjs.com/package/mongodb-import-export-cli)

* [Buy my a coffee](https://www.buymeacoffee.com/aleclercq) ☕

## Licence

MIT Licence

Copyright (c) 2020 André LECLERCQ

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
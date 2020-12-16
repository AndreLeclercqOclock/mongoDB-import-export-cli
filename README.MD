# mongoDB-import-export-cli

**DOESN'T WORK IN GLOBAL, NEW VERSION COMING SOON**

Import and Export mongoDB collection to JSON file.
You can use it for database versionning or just export/import your DB.
Works only in localhost mongodb://localhost/

## Install
You need to have MongoDB on your computer/server. [Read Mongo Docs](https://docs.mongodb.com/manual/installation/)

Install the package in Global `npm i mongodb-import-export-cli`

## Use it (command)

### Basics
- Edit Config : `mcli config edit`
- Show Config : `mcli config show`
- Import : `mcli import --c=collection_name`
- Export : `mcli export --c=collection_name`
- Help : `mcli help`

### Advanced (Not yet ready)
**Coming Soon ;)**
- Import from specific file (other than default config) `mcli import --c=collection_name --f=my-folder/my-file.json`
- Export to specific file (other than default config) `mcli export --c=collection_name --f=my-folder/my-file.json`

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
#! /usr/bin/env node
'use strict';
const path = require('path');
const program = require('commander');
const app = require('../app');
const tree = require('/routes/tree')
program
    .version('0.1.0')
    .option('-p, --path[path]', '指定项目路径')
    .option('-s, --src[src]', '指定vue文件夹路径')
    .parse(process.argv);

const prjPath = program.path || path.resolve()
const src = program.path || '/src'

app.get('/getData', tree({ path: prjPath, src }));
const port = 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))

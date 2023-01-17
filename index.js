#!/usr/bin/env node

const fs = require('fs');

const createFile = (fileName, fileContent) => {
    fs.writeFile(fileName, fileContent, (err) => {
        if (err) {
            return console.log(`Error creating file: ${err}`);
        }

        console.log(`Successfully created file ${fileName}`);
    });
}

const [,, fileName, fileContent] = process.argv;
createFile(fileName, fileContent)
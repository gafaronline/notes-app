// const fs = require('fs');
// fs.writeFileSync('notes.txt', 'This file was created using Node.js');
// fs.appendFileSync('notes.txt', ' I appended this part of the message synchronously');
const validator = require('validator');
const chalk =  require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

// const msg = notes();
// console.log(msg);

// console.log(validator.isEmail('gafaronline@hotmail.com'));
// console.log(validator.isURL('https://online.com'));
// console.log(chalk.red.bgYellow.bold.underline('Success!!!'))

// if(process.argv[2] === 'add'){
//     console.log('Adding notes...')
// } else if(process.argv[2]==='remove'){
//     console.log('removing notes...')
// } else{
//     console.log('what do you intend doing with ' + process.argv[2] + ' ?')
// }

// console.log(process.argv);

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add a new note', 
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body:{
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: (argv) => notes.addNotes(argv.title, argv.body)
        // console.log('Adding a new note!', argv)
        
    
});

yargs.command({
    command: 'remove',
    describe: 'Removing a note',
    builder: {
        title:{
            describe: 'Note title',
            demandOption: true, 
            type: 'string'
        },
        body:{
            describe: 'Note body',
            demandOption: false,
            type: 'string'
        }
    },
    handler: (argv) => {
        // console.log('Removing a note...', argv.title, argv.body)
        notes.removeNote(argv.title);
        // console.log(argv.title)
    }
});

yargs.command({
    command: 'list',
    describe: 'list all the items in the note',
    handler: (argv) => {
        // console.log('List all the items in the note-app')
        notes.listNotes(argv.title)
        console.log(chalk.bgGreen.inverse(argv.title));
    }
    
})

yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
        title: {
            describe: 'note title',
            type: 'string',
            demandOption: 'true'
        }
    },
    handler: (argv) => {
        // console.log('Reading a note...')
        notes.readNote(argv.title)
    }
})

yargs.parse()
// console.log(yargs.argv);
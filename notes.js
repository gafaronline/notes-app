const fs = require('fs');
const chalk =  require('chalk');

const getNotes = function(){
    return "Your notes..."
}

const addNotes = (title, body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note) => note.title === title)
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
        title: title,
        body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added...'))
    } else{
        console.log(chalk.red.inverse('Note title already taken!'))
    }  
}

const removeNote = (title) => {
    const notes = loadNotes();
    
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notesToKeep.length !== notes.length){
        console.log(chalk.bgGreen('Note removed!'))
    } else if(notesToKeep.length === notes.length){
        console.log(chalk.bgRed('No note found!'))
    }
    saveNotes(notesToKeep)
}

const listNotes = (title) => {
    const notes = loadNotes();

    notes.filter((note) => {
        console.log(note);
    })
}

const readNote = (title) => {
    const notes = loadNotes();

    const noteFound = notes.find((note) => note.title === title)

    if(noteFound){
        console.log(chalk.bgGreen(noteFound.title))
        console.log(chalk.green(noteFound.body))
    } else{
        console.log(chalk.bgRed('No such note...'))
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON)
    } catch (e){
        return []
    } 
}

module.exports = {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}
const con = require("./db_connect");


async function createTable() {
  let sql=`CREATE TABLE IF NOT EXISTS Notedata (
    noteID INT NOT NULL AUTO_INCREMENT,
    Notesdata VARCHAR(255) NOT NULL,
    userID INT NOT NULL,
    CONSTRAINT note_pk PRIMARY KEY(noteID),
    CONSTRAINT note_fk FOREIGN KEY(userID) REFERENCES users(userID)
   
  ); `
  await con.query(sql);
}
createTable();
async function getallnotes() {
  const sql = `SELECT * FROM Notedata;`;
  let notes = await con.query(sql);
  return notes;
} 
getallnotes();

async function createNote(note){

  let sql=`INSERT INTO Notedata (userID,Notesdata) VALUES ("${note.userID}", "${note.Notesdata}");`

await con.query(sql);
return {message:"Successfully added notes"};

}

async function getNote(note) {
  let sql;

  if(note.userID) {
    sql = `
      SELECT * FROM Notedata
       WHERE userID = "${note.userID}"
    `
  } else {
    sql = `
    SELECT * FROM Notedata 
      WHERE noteID = "${note.noteID}"
  `;
  }
  return await con.query(sql);  
}



async function editNote(note) {
  let sql = `UPDATE Notedata 
    SET Notesdata = "${note.Notesdata}"
    WHERE noteID = ${note.noteID}
  `;
  await con.query(sql);
  let newNote = await getNote(note);
  return newNote[0];
  }

async function deleteNote(note){
  let sql=`DELETE FROM Notedata where noteID="${note.noteID}"`;

  return await con.query(sql);
}


module.exports = {getallnotes,getNote,createNote,deleteNote,editNote};

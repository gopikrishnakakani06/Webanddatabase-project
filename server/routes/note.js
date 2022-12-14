const express = require('express');
const  NoteR = require('../models/note');
const router = express.Router();
router
.post('/getNote', async (req, res) => {
    try {
      let notes = await NoteR.getNote(req.body);
      res.send(notes)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .get('/getallnotes', async (req, res) => {
    try {
      let allnotes = await NoteR.getallnotes(req.body);
      res.send(allnotes)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  .post('/createNote', async (req, res) => {
    try {
      let NoteCreation = await NoteR.createNote(req.body);
      res.send(NoteCreation)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })
  

  .delete('/deleteNote', async (req, res) => {
    try {
      await NoteR.deleteNote(req.body);
      res.send({success: "Successfully deleted the notes :("})
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })
  .put('/editNote', async (req, res) => {
    try {
      let Noteedit= await NoteR.editNote(req.body);
      res.send(Noteedit)
    } catch(err) {
      res.status(401).send({message: err.message});
    }
  })

  
module.exports=router;
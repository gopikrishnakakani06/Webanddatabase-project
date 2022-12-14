import {fetchData, setCurrentUser ,getCurrentUser} from './project.js'
// const { getCurrentUser } = require("./project");

class User{


    constructor(FName,LName,Email,pwd,MobileNumber){

        this.FirstName=FName;
        this.LastName=LName;
        this.email=Email;
        this.password=pwd;
       // this.RePassword=ReEnterPwd;
        this.MN=MobileNumber;  
    }

    getFirstName(){
        return this.FirstName;
    
    }
    getLastName(){
        return this.LastName;
    }
    getemail(){
        return this.email;

    }
    getpassword()
    {
        return this.password;

    }
    //getRePassword()
   // {
    //    return this.RePassword;

    //}
    getMN(){
        return this.MN;

    }
    
    setFirstName(FName){
        this.FirstName=FName;
    }
    setLastName(LName){
        this.LastName=LName;
    }
    setemail(Email){
        this.email=Email;

    }
    setpassword(pwd){
        this.password=pwd;
    }
    //setRePassword(ReEnterPwd){
    //    this.RePassword=ReEnterPwd;
    //}
    setMN(MobileNumber){
        this.MN=MobileNumber;
    }
   
}

class UNote{
    constructor(Note)
    {
        this.Notesdata=Note;
    }

    setNotes(Note){
        this.NNotesdataotes=Note;
    }

    getNotes(){
        return this.Notesdata;
    }
}


let Login= document.getElementById("LoginForm");
if(Login) Login.addEventListener('submit',acclogin)

function acclogin(l){
 l.preventDefault();
 let eml=document.getElementById("email").value;
 let pass=document.getElementById("password").value;

 const logindata=new User(null,null,eml,pass,null);
 fetchData("/users/login", logindata,"POST")
 .then((data) => {
    setCurrentUser(data)
     console.log(data);
    window.location.href = "Note.html";
  })
  .catch((err) => {
    console.log(`Error!!! ${err.message}`)
  }) 

 let luser=new User(eml,pass);
 console.log(`${eml}`);
 console.log(`${pass}`);

 Login.reset();

}



let Register=document.getElementById("RegisterForm");
if(Register) Register.addEventListener('submit',acccr)

function acccr(c){
    c.preventDefault();
    let Firstuser= document.getElementById("FirstName").value;
    let Luser=document.getElementById("LastName").value;
    let eml=document.getElementById("email").value;
    let pass=document.getElementById("password").value;
   // let preset=document.getElementById("RePassword").value;
    let Num=document.getElementById("MN").value;
    let Ruser= new User(Firstuser,Luser,eml,pass,Num);
 fetchData("/users/register", Ruser, "POST")
  .then((data) => {
    setCurrentUser(data);
    alert("Registration success")
    window.location.href = "Note.html";
  })
  .catch((err) =>{
   alert("Registration not success")
   Register.reset();
    let p = document.querySelector('.error');
    p.innerHTML = err.message;
  })
}
/*
    console.log(`${Firstuser}`);
    console.log(`${Luser}`);
    console.log(`${eml}`);
    console.log(`${pass}`);
    console.log(`${preset}`);
    console.log(`${Num}`);
     */
let user=getCurrentUser()   

let UsrNote= document.getElementById("NoteForm");
if(UsrNote) UsrNote.addEventListener('submit',PNote)

function PNote(p){
    p.preventDefault();
    let Notep= document.getElementById("Notes").value;
    let Nuser= new UNote(Notep);
    Nuser.userID=user.userID;
    fetchData("/Notedata/createNote",Nuser, "POST")
    .then((data) => {
        alert("Notes added");
      window.location.href = "Note.html";
    })
    .catch((err) => {
     console.log(`Error!!! ${err.message}`)
     alert("Error in adding notes");
    })
    console.log(`${Notep}`);

   //  UsrNote.reset();
}

if(user&&UsrNote) getallnotes();

function getallnotes(){
    let Notep= document.getElementById("Notes");
    fetchData("/Notedata/getNote",user,"POST")
    .then((data) => {
 console.log(data);
 for(let i=0;i<data.length;i++){
 Notep.value='\n'+data[i].Notesdata
 }

    })
}

// getUsers button 
// document.getElementById("btn-users").addEventListener('click', getUsers);

// function getUsers() {
 //  fetch("http://localhost:3000/users/")
 // .then((res)=> res.json())
 // .then((data) => console.log(data))
  //.catch((err)=> console.log(err))
//}

// Fetch method implementation:
async function fetchData(route = '', data = {}, methodType) {
    const response = await fetch(`http://localhost:3000${route}`, {
      method: methodType, // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    if(response.ok) {
      return await response.json(); // parses JSON response into native JavaScript objects
    } else {
      throw await response.json();
    }
  }
  
class User{


    constructor(FName,LName,Email,pwd,ReEnterPwd,MobileNumber){

        this.FirstName=FName;
        this.LastName=LName;
        this.email=Email;
        this.password=pwd;
        this.RePassword=ReEnterPwd;
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
    getRePassword()
    {
        return this.RePassword;

    }
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
    setRePassword(ReEnterPwd){
        this.RePassword=ReEnterPwd;
    }
    setMN(MobileNumber){
        this.MN=MobileNumber;
    }
   
}

class UNote{
    constructor(Note)
    {
        this.Notes=Note;
    }

    setNotes(Note){
        this.Notes=Note;
    }

    getNotes(){
        return this.Notes;
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
    let preset=document.getElementById("RePassword").value;
    let Num=document.getElementById("MN").value;
    let Ruser= new User(Firstuser,Luser,eml,pass,preset,Num);
    console.log(`${Firstuser}`);
    console.log(`${Luser}`);
    console.log(`${eml}`);
    console.log(`${pass}`);
    console.log(`${preset}`);
    console.log(`${Num}`);
     
    Register.reset();


    
}

let UsrNote= document.getElementById("NoteForm");
if(UsrNote) UsrNote.addEventListener('submit',PNote)

function PNote(p){
    p.preventDefault();
    let Notep= document.getElementById("Notes").value;
    let Nuser= new UNote(Notep);
    console.log(`${Notep}`);

    UsrNote.reset();
}

/*
function setCurrentUser(user){
    localStorage.setItem('user',JSON.stringify(user))
}
*/










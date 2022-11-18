const users=[
    {
        email: "gopikrishnakakani06@gmail.com",
        password: "kgk7897"
    },

    {
        email: "gopi@gmail.com",
        password: "gopi78"

    },
    {
        email: "Krishna@gmail.com",
        password: "Krishna"

    },
    {
        email: "Kakani@gmail.com",
        password:"Kakani"
    }


];

function getAllUsers() {
    return users;
  }
  
  function login(user) { // {userName: "sda", password: "gsdhjsga"}
    let cUser = users.filter( u => u.email === user.email);
    
    if(!cUser[0]) throw Error("Email not found");
    if(cUser[0].password !== user.password) throw Error("Password incorrect");
  
    return cUser[0];
  }
  
  module.exports = { getAllUsers, login };
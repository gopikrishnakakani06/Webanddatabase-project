const users=[
    {
        Email: "gopikrishnakakani06@gmail.com",
        Password: "kgk7897"
    },

    {
        Email: "gopi@gmail.com",
        Password: "gopi78"

    },
    {
        Email: "Krishna@gmail.com",
        Password: "Krishna"

    },
    {
        Email: "Kakani@gmail.com",
        Password:"Kakani"
    }


];

function getAllUsers() {
    return users;
  }
  
  function login(user) { // {userName: "sda", password: "gsdhjsga"}
    let cUser = users.filter( u => u.Email === user.Email);
    
    if(!cUser[0]) throw Error("Email not found");
    if(cUser[0].Password !== user.Password) throw Error("Password incorrect");
  
    return cUser[0];
  }
  
  module.exports = { getAllUsers, login };

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


  /*
  function login(user) { // {userName: "sda", password: "gsdhjsga"}
    let cUser = users.filter( u => u.email === user.email);
    
    if(!cUser[0]) throw Error("Email not found");
    if(cUser[0].password !== user.password) throw Error("Password incorrect");
  
    return cUser[0];
  }
  
  module.exports = { getAllUsers, login };
  */

const con = require("./db_connect");

async function createTable() {
  let sql=`CREATE TABLE IF NOT EXISTS users (
    userID INT NOT NULL AUTO_INCREMENT,
    FirstName VARCHAR(255) NOT NULL,
    LastName VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    MN NUMERIC,
    CONSTRAINT userPK PRIMARY KEY(userID)
  ); `
  await con.query(sql);
}
createTable();

async function getAllUsers() {
  const sql = `SELECT * FROM users;`;
  let users = await con.query(sql);
  return users;
}
getAllUsers();

// Create  User - Registering
async function register(user) {
  let cUser = await getUser(user);
  if(cUser.length > 0) throw Error("Username already in use");

  const sql = `INSERT INTO users (FirstName,LastName,email,password,MN)
    VALUES ("${user.FirstName}","${user.LastName}","${user.email}","${user.password}","${user.MN}");
  `
  await con.query(sql);
  return await login(user);
}



// Read User -- login user
async function login(user) { // {userName: "sda", password: "gsdhjsga"}
  let cUser = await getUser(user); //[{userName: "cathy123", password: "icecream"}]
  if(!cUser[0]) throw Error("email not found");
  if(cUser[0].password !== user.password) throw Error("Password incorrect");
  console.log(cUser[0]);
  return cUser[0];
}


// Update User function
async function editUser(user) {
  let sql = `UPDATE users 
    SET email = "${user.email}"
    WHERE userID = ${user.userID}
  `;

  await con.query(sql);
  let updatedUser = await getUser(user);
  return updatedUser[0];
}

// Delete User function
async function deleteUser(user) {
  let sql = `DELETE FROM users
    WHERE userID = ${user.userID}
  `
  await con.query(sql);
}

// Useful Functions
async function getUser(user) {
  let sql;

  if(user.userID) {
    sql = `
      SELECT * FROM users
       WHERE userID = ${user.userID}
    `
  } else {
    sql = `
    SELECT * FROM users 
      WHERE email = "${user.email}"
  `;
  }
  return await con.query(sql);  
}

/*
let cathy = {
  userID: 5,
  userName: "cathy123",
  password: "icecream"
}; 
login(cathy);
*/

module.exports = { getAllUsers, login, register, editUser, deleteUser};
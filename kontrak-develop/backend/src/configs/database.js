const { Client } = require("pg");

//const client = new Client(process.env.DB_URL); //Configuring PostgresSQL Database
const client = new Client({
    connectionString: "postgres://cjvhdfcfwnubvr:058ecc704b46a5753a87821f0f35e97a352f1688b4f97fc7b9b1e55f91fa63c6@ec2-52-4-87-74.compute-1.amazonaws.com:5432/d3ob9fe99ppbc5",
    ssl:{
       require: true,
        rejectUnauthorized: false //allows external access to database when using nodejs
    }
});
module.exports = client;
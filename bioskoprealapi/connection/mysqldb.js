const mysql=require('mysql')

const db=mysql.createConnection({
    host:'localhost',
    user:'dino9611',
    password:'tungkal01',
    database:'bioskop',
    port:'3306'
})

module.exports=db
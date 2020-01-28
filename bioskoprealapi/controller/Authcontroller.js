const hashpassword=require('./../helper/encrypt')
const {db}=require('./../connection')
const {createJWTToken,createJWTTokenemail}=require('./../helper/jwt')
const transporter=require('./../helper/mailer')
module.exports={
    Authlogin:(req,res)=>{
        const {id}=req.params
        const {username,password}=req.query
        if(username&&password){
            // buat login
            var encryptpass=hashpassword(password)
            var sql=`select * from users where username='${username}' and password='${encryptpass}'`
            db.query(sql,(err,results)=>{
                if (err) res.status(500).send({status:'error',err})
                const token=createJWTToken({userid:results[0].id,username:results[0].username})
                // console.log(token)
                return res.status(200).send({result:results,token})
            })
        }else if(id){
            // ini buat keeplogin
            var sql=`select * from users where id=${id}`
            db.query(sql,(err,results)=>{
                if (err) res.status(500).send({status:'error',err})
                const token=createJWTToken({userid:results[0].id,username:results[0].username})
                return res.status(200).send({result:results[0],token})
            })
        }else{
            return res.status(500).send({message:'error bro'})
        }
    },
    register:(req,res)=>{
        const {username,password,email}=req.body
        var encryptpass=hashpassword(password)
        var sql=`select * from users where username='${username}' and password='${encryptpass}'`
        db.query(sql,(err,results)=>{
            if (err) res.status(500).send({status:'error',err})
            if(results.length===0){
                sql=`insert into users set ?`
                var data={
                    username,
                    password:hashpassword(password),
                    roleid:2,
                    email,
                    verified:0
                }
                db.query(sql,data,(err,results1)=>{
                    if (err) res.status(500).send({status:'error insert',err})
                    console.log(results1.insertId)
                    sql=`select * from users where id=${results1.insertId}`
                    db.query(sql,(err,results2)=>{
                        if (err) res.status(500).send({status:'error select',err})
                        // email disini
                        const tokenemail=createJWTTokenemail({userid:results2[0].id,username:results2[0].username})

                        var LinkVerifikasi=`http://localhost:3000/verified?token=${tokenemail}`
                        var mailoptions={
                            from:'hokage <aldinorahman36@gmail.com>',
                            to:email,
                            subject:`verifikasi Email app bioskop`,
                            html:`tolong klik link ini untuk verifikasi :
                            <a href=${LinkVerifikasi}>Join apps ini</a>`
                        }
                        transporter.sendMail(mailoptions,(err,res2)=>{
                            if(err2){
                                console.log(err2)
                                return res.status(500).send({status:'error',err:err2})
                            }
                            const token=createJWTToken({userid:results2[0].id,username:results2[0].username})
                            //
                            return res.status(200).send({result:results2[0],token})
                        })
                    })
                })  
            }else{
                return res.status(500).send({message:'user sudah ada '})
            }
        })
    }
}
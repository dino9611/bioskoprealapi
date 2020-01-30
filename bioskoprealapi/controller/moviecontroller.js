const {db}=require('./../connection')

// function untuk looping dbquery karena async maka harus dibuat promise
const queryAsync = query => new Promise((resolve, reject) => {
    db.query(query, (err, result) => {
      if(err) return reject(err)
      resolve(result)
    })
})

module.exports={
    getmovies:(req,res)=>{
        var sql=`select * from movies`
        db.query(sql,(err,result)=>{
            if (err) res.status(500).send({status:'error',err})
            var arr=[]
            result.forEach(element => {
                arr.push(queryAsync(`select s.nama as studio,j.jadwal from moviesdetails md join studios s on md.studioid=s.idstudios join jadwal j on  md.jadwalid=j.idjadwal where md.movieid=${element.idmovies}`))
            });
            Promise.all(arr)
            .then(result1=>{
                result1.forEach((element,index)=>{
                    result[index].studiojadwal=element
                })
                result[0].genre=JSON.parse(result[0].genre)
                return res.status(200).send(result)
            })
        })
    },
    
}
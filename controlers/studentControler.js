import User from "../models/student.js"

export function getuser(req,res){
 
    Student.find().then(
     (userlist)=>{[
        res.json({
            list : userlist
        })
     ]}
   )
}

export function creatuser(req,res){
  
    const User = new User(req.body)
    user.save().then(()=>{
        res.json({
            massege: "student created"
        })
    }).catch(()=>{
        res.json({
            massege: "student not created"
        })
    }) 
}

export function deleteuser(req,res){
     user.deleteOne({name : req.body.name}).then(
        ()=>{
            res.json(
                {
                    message : "Student Deleted Successfully"
                }
            )
        }
     )
     
}
const db = require("../config/db")

exports.addActivity = (req,res)=>{

 const {user_id,activity_type,distance,date} = req.body

 const emission = distance * 0.192

 db.query(
  "INSERT INTO activities(user_id,activity_type,distance,date) VALUES (?,?,?,?)",
  [user_id,activity_type,distance,date],
  (err,result)=>{
   if(err) return res.json(err)

   const activityId = result.insertId

   db.query(
    "INSERT INTO emissions(activity_id,factor_used,co2_value,calculation_date) VALUES (?,?,?,CURDATE())",
    [activityId,0.192,emission]
   )

   res.json("Activity added with emission")
  }
 )
}
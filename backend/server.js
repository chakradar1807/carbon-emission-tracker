const express = require("express");
const cors = require("cors");
const db = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());


/* ---------------- USERS WITH CO2 ---------------- */

app.get("/users", (req, res) => {

const query = `
SELECT 
u.user_id,
u.name,
u.email,
u.city,
COALESCE(SUM(e.co2_value),0) AS total_co2

FROM USER u

LEFT JOIN ACTIVITY a 
ON u.user_id = a.user_id

LEFT JOIN EMISSION e 
ON a.activity_id = e.activity_id

GROUP BY u.user_id, u.name, u.email, u.city
`;

db.query(query,(err,result)=>{

 if(err){
  console.log(err);
  return res.status(500).json({error:"Database error"});
 }

 res.json(result);

});

});


/* ---------------- ACTIVITIES ---------------- */

app.get("/activities", (req, res) => {

db.query("SELECT * FROM ACTIVITY",(err,result)=>{

 if(err){
  console.log(err);
  return res.status(500).json({error:"Database error"});
 }

 res.json(result);

});

});


/* ---------------- TOTAL EMISSION ---------------- */

app.get("/totalEmission",(req,res)=>{

const query = "SELECT COALESCE(SUM(co2_value),0) AS total FROM EMISSION";

db.query(query,(err,result)=>{

 if(err){
  console.log(err);
  return res.status(500).json({error:"Database error"});
 }

 res.json(result[0]);

});

});


/* ---------------- DASHBOARD ---------------- */

app.get("/dashboard",(req,res)=>{

const query = `
SELECT
(SELECT COUNT(*) FROM USER) AS totalUsers,
(SELECT COUNT(*) FROM ACTIVITY) AS totalActivities,
(SELECT COALESCE(SUM(co2_value),0) FROM EMISSION) AS totalCO2
`;

db.query(query,(err,result)=>{

 if(err){
  console.log(err);
  return res.status(500).json({error:"Database error"});
 }

 res.json(result[0]);

});

});


/* ---------------- ADD ACTIVITY ---------------- */

app.post("/activity",(req,res)=>{

const {user_id, activity_type_id, location_id} = req.body;

const query = `
INSERT INTO ACTIVITY
(user_id, activity_type_id, activity_date, location_id)
VALUES (?, ?, CURDATE(), ?)
`;

db.query(query,[user_id,activity_type_id,location_id],(err,result)=>{

 if(err){
  console.log(err);
  return res.status(500).json({error:"Insert failed"});
 }

 res.json({message:"Activity added successfully"});

});

});


/* ---------------- EMISSION TEST RESULTS ---------------- */

app.get("/emissions",(req,res)=>{

const threshold = 4;

const query = `
SELECT
emission_id,
activity_id,
factor_used,
co2_value,
calculation_date,

CASE
WHEN co2_value <= ? THEN 'PASS'
ELSE 'FAIL'
END AS result,

CASE
WHEN co2_value <= ? THEN 0
ELSE 1
END AS failed

FROM EMISSION

ORDER BY calculation_date DESC
`;

db.query(query,[threshold,threshold],(err,rows)=>{

 if(err){
  console.log(err);
  return res.status(500).json({error:"Database error"});
 }

 res.json(rows);

});

});


/* ---------------- START SERVER ---------------- */

app.listen(5001,()=>{
console.log("Server running on port 5001");
});
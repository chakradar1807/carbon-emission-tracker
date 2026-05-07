const API = "http://localhost:5001";

/* ---------------- USERS ---------------- */

async function loadUsers(){

 const res = await fetch(API + "/users");
 const data = await res.json();

 let html = `
 <table>
 <tr>
 <th>ID</th>
 <th>Name</th>
 <th>Email</th>
 <th>City</th>
 <th>CO₂ Emission</th>
 <th>Status</th>
 </tr>
 `;
data.forEach(user => {

let emission = user.total_co2 || 0;

let status="";
let color="";

if(emission <=4){
 status="Safe";
 color="green";
}
else if(emission <=6){
 status="Warning";
 color="orange";
}
else{
 status="Failed";
 color="red";
}

html += `
<tr>
<td>${user.user_id}</td>
<td>${user.name}</td>
<td>${user.email}</td>
<td>${user.city}</td>
<td>${emission}</td>
<td style="color:${color}; font-weight:bold">${status}</td>
</tr>
`;

});
 

 

 html += "</table>";

 document.getElementById("users").innerHTML = html;

}


/* ---------------- FAILURE LIST ---------------- */

async function loadFailures(){

 const res = await fetch(API + "/emissions");
 const data = await res.json();

 let html = `
 <table>
 <tr>
 <th>Activity</th>
 <th>CO₂ Value</th>
 <th>Status</th>
 </tr>
 `;

 data.forEach(e => {

 if(e.failed === 1){

 html += `
 <tr class="toxic">
 <td>${e.activity_id}</td>
 <td>${e.co2_value}</td>
 <td>❌ Failed</td>
 </tr>
 `;

 }

 });

 html += "</table>";

 document.getElementById("failureList").innerHTML = html;

}


/* ---------------- DASHBOARD ---------------- */

async function loadDashboard(){

 const res = await fetch(API + "/dashboard");
 const data = await res.json();

 document.getElementById("totalUsers").innerText = data.totalUsers;
 document.getElementById("totalActivities").innerText = data.totalActivities;
 document.getElementById("totalCO2").innerText = data.totalCO2;

}

if(document.getElementById("totalUsers")){
 loadDashboard();
}


/* ---------------- ADD ACTIVITY ---------------- */

const form = document.getElementById("activityForm");

if(form){

 form.addEventListener("submit", async (e)=>{

  e.preventDefault();

  const user_id = document.getElementById("user_id").value;
  const activity_type_id = document.getElementById("activity_type_id").value;
  const location_id = document.getElementById("location_id").value;

  await fetch(API + "/activity",{

   method:"POST",
   headers:{ "Content-Type":"application/json" },

   body: JSON.stringify({
    user_id,
    activity_type_id,
    location_id
   })

  });

  alert("Activity Added Successfully");

 });

}


/* ---------------- CHART ---------------- */

async function loadChart(){

 const res = await fetch(API + "/emissions");
 const data = await res.json();

 const labels = data.map(e => "Activity " + e.activity_id);
 const values = data.map(e => e.co2_value);

 new Chart(document.getElementById("emissionChart"),{

  type:"bar",

  data:{
   labels:labels,
   datasets:[{
    label:"CO₂ Emission",
    data:values,
    backgroundColor:"#22c55e"
   }]
  }

 });

}

if(document.getElementById("emissionChart")){
 loadChart();
}


/* AUTO LOAD USERS PAGE */

if(document.getElementById("users")){
 loadUsers();
}

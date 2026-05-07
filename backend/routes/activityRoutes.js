const router = require("express").Router()
const {addActivity} = require("../controllers/activityController")

router.post("/add",addActivity)

module.exports = router
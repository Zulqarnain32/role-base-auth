const express = require("express")
const verifyToken = require("../middlewares/authMiddleware")
const authoziRoles = require("../middlewares/roleMiddleware")
const router = express.Router();

// only admin can access this routes
router.get("/admin",verifyToken,authoziRoles("admin"),(req,res) => {
    res.json({message:"Welcome Admin"})
})

// only admin and manager can access this routes
router.get("/manager",verifyToken, verifyToken,authoziRoles("admin","manager"),(req,res) => {
    res.json({message:"Welcome Manager"})
})

// All can access this routes
router.get("/user",verifyToken,authoziRoles("admin","manager","user"),(req,res) => {
    res.json({message:"Welcome User"})
})

module.exports = router;
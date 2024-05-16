import express from "express";
const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login"); 
})

router.get("/register", (req, res) => {
    res.render("register");
})



export default router; 
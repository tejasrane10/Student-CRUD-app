import methodOverride from "method-override";
import express from "express";
import bodyParser from "body-parser";
//const express= require("express");
//const path=require("path");
const app=express();
const port=3000;


let students=[];
let idCounter=1;


app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));

app.listen(port,()=>{
    console.log("App is listening on port 3000");
});

//Home route
app.get("/",(req,res)=>{
    res.render("index",{students});
});

app.get("/students/new", (req,res)=>{
    res.render("new");
})

//Create new student
app.post("/students",(req, res)=>{
    const {name, age, course}= req.body;
    const newStudents={id:idCounter++, name, age, course};
    students.push(newStudents);
    res.redirect("/");
});

//Show edit form
app.get("/students/:id/edit", (req,res)=>{
    const student= students.find(s=> s.id == req.params.id);
    res.render("edit", {student});
})

app.put("/students/:id", (req,res)=>{
    const student=students.find(s=> s.id== req.params.id);
    student.name = req.body.name;
    student.age = req.body.age;
    student.course = req.body.course;
    res.redirect("/");
});

//Delete student
app.delete("/students/:id",(req,res)=>{
    students=students.filter(s=> s.id != req.params.id);
    res.redirect("/");

});
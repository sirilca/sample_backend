const express=require("express")
const bodyparser=require("body-parser")
const mongoose= require("mongoose")
const cors=require("cors")

const app =express()
app.use(cors())
app.use(bodyparser.json())

mongoose.connect("mongodb+srv://first:1234@cluster0.iqcs46f.mongodb.net/samplefirst?retryWrites=true&w=majority").then(()=>{console.log("mongo connected")})
.catch(err=>{console.log("errorcooured",err)})

// mongoose.connect('mongodb://localhost/test').then(()=>{console.log("mongo connected")}).catch(err=>console.log(err))
const Dataschema=new mongoose.Schema({
    name:String
})

const mon = mongoose.model("new",Dataschema)


app.get('/',async (req,res)=>{
    const sdata= await mon.find()
    res.json(sdata)
})

app.post('/',async (req,res)=>{
    const {name}=req.body
    console.log(name)
    const sdata= mon({name:name})
    sdata.save()
    res.send("data aquired")
})


app.listen(5000,()=>{console.log("server connected")})
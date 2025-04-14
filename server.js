
const express = require ("express")
const mongoose = require ("mongoose")
const cors = require ("cors")
const multer = require ("multer")


const app = express ()

//waxa ka awiya isku xirka f &  BACKEND
app.use(cors())


// meshaa aad ku arki karto data ad xareyso
app.use(express.json())



//importiga scheemka 
const dalxiisModel = require ("./modal/dalxiisModel")

//isku jirka mongooseka
mongoose.connect("mongodb+srv://Hassan:KAkzGdlknyQTa9le@cluster0.xfh2pae.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>{
    console.log("database ki waa laxareyyey ")
}).catch((err)=>{
    console.log(err)
})

//Api post tiiga 
app.post("/create" , async (req , res)=>{
    const NewData = dalxiisModel (req.body)
    const NewSave = await NewData.save()
    if (NewSave){
        res.send(" xxogta waa la save gareyye")
    }
    else {
        res.send("Error ayaaa dhaceyyy")
    }
})
// Api get wye 
app.get("/get" ,async (req , res )=>{
    const GetData = await dalxiisModel.find ()
        res.send(GetData)
})

// Api Update ka wye 
app.put("/update/:id", async (req, res)=>{
    const updateData = await dalxiisModel.updateOne(
        {_id:req.params.id},
        {$set: req.body}
    )
    if (updateData){
        res.send("data has been update")
    }
})
//remove  Api 

app.delete("/remove/:id" ,  async (req, res)=> {
    const GetDalete = await dalxiisModel.deleteOne(
        {_id: req.params.id},

    )
    if (GetDalete){
        res.send("data has been deleted ")
    }
})

// Api soo bandhigagaayo tatal of booking

app.get("/total" , async (req , res)=>{
    const total = await dalxiisModel.countDocuments()
    res.send({total})
})


const AdminModel = require ("./modal/AdminModel")


// API register

app.post("/admin/register", async (req , res)=>{
    const newAdmin = AdminModel(req.body)
    const saveAdmin = await newAdmin.save() 

      if (saveAdmin){
        res.send("databse has bee seccessfully ")
      }

})
/// login api oo radinaayo

app.post("/admin/login", async (req,res)=>{
    const admin = await AdminModel.findOne(req.body).select("-password")

    if (admin){
        res.send(
            {success: "Login successfully"})
            data: admin
    }
    else{
        res.send({error: "username or password incorrect" })
    }
})



/// Api isoo bandhigaayo Male iyo Female

app.get("/goaan", async (req, res) => {
  try {
    // si loo tiriyo Male iyo Female
    const LabAmadhigi = await dalxiisModel.aggregate([
      {
        $group: {
          _id: "$Type", // Ku saleysan Type ("Male" ama "Female")
          count: { $sum: 1 } // Tirinta document-ada ku saleysan "Male" ama "Female"
        }
      }
    ]);

    let Male = 0;
    let Female = 0;

    
    LabAmadhigi.forEach((data) => {
      if (data._id.toLowerCase() === "male") {
        Male = data.count;
      } else if (data._id.toLowerCase() === "female") {
        Female = data.count;
      }
    });
    
    res.status(200).send({ Male, Female }); 
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ message: "Server Error", error: error.message }); 
  }
});


////
const loginModel = require("./modal/loginModel")



/// qeynta LOginka io Sign Up ka 
app.post("/sign" ,async (req, res)=>{
  const getLogin = loginModel(req.body)
  const newlogin = await getLogin.save()
  if (newlogin) {
    res.send("xogta wa la xarey")
  }
})
/// login api oo radinaayo

app.post("/login", async (req,res)=>{
  const admin = await loginModel.findOne(req.body).select("-password")

  if (admin){
      res.send(
          {success: "Login successfully"})
          data: admin
  }
  else{
      res.send({error: "username or password incorrect" })
  }
})

// Api soo bandhigagaayo tatal of users

app.get("/user/total", async (req, res) => {
  try {
    // Tirakoobka guud ee users-ka database-ka
    const totalUsers = await loginModel.countDocuments(); 

    // Xogta waxaa loogu jawaabayaa JSON format
    res.json({ totalUsers }); 
  } catch (error) {
    // Haddii wax qalad ah dhacaan, waxaa la soo celinayaa error response
    res.status(500).json({ error: "Internal Server Error" }); 
  }
});



const Payment = require("./modal/Payment")

app.post("/payment" ,async (req, res)=>{
  const getpay = Payment(req.body)
  const newunpay = await getpay.save()
  if (newunpay) {
    res.send("xogta wa la xarey")
  }
})

app.get("/pay", async (req,res)=>{
  const Pay = await Payment.find()
  res.send(Pay)
})






 app.listen(500 ,()=>{
    console.log("server ka wuu shaqeynaa")
 })
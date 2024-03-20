const express = require('express');
const cors = require('cors');
const connection=require("./db")
const workflowRoutes = require('./routes/workflow.routes');


const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/workflows', workflowRoutes);

app.get("/",async (req,res)=>{
  res.send({message:"Workflow api is Working"})
})

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("connected to database")
    console.log(`Server is running on port ${PORT}`);
  } catch (error) {
    console.log("Error connecting to database")
    console.log(error)
  }
});

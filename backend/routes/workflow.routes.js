const express = require('express');
const router = express.Router();
const {WorkflowModel} = require('../models/Workflow.model');



router.get("/",async (req,res)=>{
    try {
        const data=await WorkflowModel.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
    
})


  

// to save the WorkflowModel
router.post('/save', async (req, res) => {
    try {
      const { node, edges } = req.body;
      await WorkflowModel.create({node,edges});
      res.send({ message: 'WorkflowModel Saved Successfully!..',body:node});
    } catch (error) {
      console.error('Error :', error);
      res.send({ error: 'server error', body:req.body });
    }
  });


router.post('/:workflowId', async (req, res) => {
    try {
      
      res.send({ message: 'Workflow Executed Successfully!..' });
    } catch (error) {
      console.error('Error in Workflow Execution :', error);
      res.send({ error: 'Server error' });
    }
  }
  );

module.exports = router;

const express = require('express');
const router = express.Router();
const Workflow = require('../models/Workflow.model');



router.get("/",async (req,res)=>{
    try {
        const data=await Workflow.find();
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({message:"server error"})
    }
    
})


  

// to save the workflow
router.post('/save', async (req, res) => {
    try {
      const { node, connection } = req.body;
      const workflow = new Workflow({ node, connection });
      await workflow.save();
      res.send({ message: 'Workflow Saved Successfully!..'});
    } catch (error) {
      console.error('Error :', error);
      res.send({ error: 'server error' });
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

const Workflow = require('../models/Workflow.model');

// for executing a workflow
exports.executeWorkflow = async (req, res) => {
  try {
    
    res.send({ message: 'Workflow Executed Successfully!..' });
  } catch (error) {
    console.error('Error in Workflow Execution :', error);
    res.send({ error: 'Server error' });
  }
};


// for save work flow
exports.saveWorkflow = async (req, res) => {
  try {
    const { nodes, connections } = req.body;
    const workflow = new Workflow({ nodes, connections });
    await workflow.save();
    res.send({ message: 'Workflow Saved Successfully!..'});
  } catch (error) {
    console.error('Error :', error);
    res.send({ error: 'server error' });
  }
};



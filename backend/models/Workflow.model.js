const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const workflowSchema = new mongoose.Schema({
  node:[Schema.Types.Mixed],
  edges:[Schema.Types.Mixed],
});

const WorkflowModel = mongoose.model('workflow', workflowSchema);
module.exports={WorkflowModel}
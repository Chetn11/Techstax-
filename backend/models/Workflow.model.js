const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
  node: [{ type: String }],
  connection: [{ type: String }],
});

module.exports = mongoose.model('workflow', workflowSchema);

const mongoose = require('mongoose');

const workflowSchema = new mongoose.Schema({
  nodes: [{ type: String }],
  connections: [{ type: String }],
});

module.exports = mongoose.model('workflow', workflowSchema);

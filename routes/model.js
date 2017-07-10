var mongoose = require('mongoose');
var TaskeeSchema = require('../models/taskee');
var UsereeSchema = require('../models/useree');
var Taskee = mongoose.model('Taskee', TaskeeSchema);
var Useree = mongoose.model('Useree', UsereeSchema);

module.exports.Taskee = Taskee;
module.exports.Useree = Useree;
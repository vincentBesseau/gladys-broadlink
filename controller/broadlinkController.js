learningMode = require('../lib/broadlink.learningMode.js');

module.exports = {

  learningMode: function(req, res, next){
    learningMode(req.body)
  },

}
/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Mathieu Andrade
*/

learningMode = require('../lib/broadlink.learningMode.js');

module.exports = {

  learningMode: function(req, res, next){
    learningMode(req.body)
      .then((result) => res.json(result))
  },

}
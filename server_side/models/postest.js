const mongoose = require('mongoose');
const config = require('../config/database');

const PostSchema = mongoose.Schema({
  id: {
    type: String
  },
  pw: {
    type: String,
    required: true
  }
});

const Postest1 = mongoose.model('Postest', PostSchema);

Postest1.add = function (parsedata, callback) {
  //Postest1.save(parsedata, callback);

  var postestGo = new Postest1({ id: parsedata.id, pw:parsedata.pw});

    // save model to database
    postestGo.save(function (callback) {
      if (callback) return console.log(callback);
      else console.log("saved success");
    });
}

Postest1.getAll = function (callback) {
  Postest1.find(callback);
}

module.exports = Postest1;

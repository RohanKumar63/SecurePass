const mongoose = require('mongoose');

const userSchema = mongoose.Schema({

      fullname: String,
      email: String,
      password: String,

      datas : [{
        type :  mongoose.Schema.Types.ObjectId,
        ref: "data",
      }],
     

});

module.exports =mongoose.model("user", userSchema);
const mongoose = require('mongoose');

const dataSchema = mongoose.Schema({
    
      url: String,
      username: String,
      password: String,
      
      user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref : "user",
    }],

});

module.exports =mongoose.model("data", dataSchema);
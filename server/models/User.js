const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const jwt = require('jsonwebtoken');
const config = require('config');


const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 225,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minlength: 3,
        maxlength: 225,
        validate: {
            validator: email => validator.isEmail(email),
            message: 'please enter valid email'
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 4,
        maxlength: 1024,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
   /* shop:[{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Shop',
    }],

    rel:[{
        shopID:{
            type:'string',
        },
        role:{
            type:String,
            default:'admin'
        }
    }],*/

  /*  rel:[{
      shopID:{
        type:String,
      },
      shopRole:{
        type:String,
        default:'admin'
      }
    }],*/
    
        
    creationDate: {
        type: Date,
        default: Date.now()
    }

});

userSchema.plugin(uniqueValidator, { message: 'Email and UserName should be unique' });

userSchema.methods.generateToken = function () {
    const token = jwt.sign({ _id: this._id, role: this.role, email: this.email }, config.get('jwtprivatekey'));
    return token;
}


const User = mongoose.model('User', userSchema);


module.exports.User = User;

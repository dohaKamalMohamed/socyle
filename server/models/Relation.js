const mongoose = require('mongoose');
const ObjectId=mongoose.Types.ObjectId
const relSchema = new mongoose.Schema({
    ShopID:{
        type:mongoose.Schema.Types.ObjectId,
    },
    UserID:{
        type:mongoose.Schema.Types.ObjectId,
    },
    shopRole: {
        type: String,
        enum: ['subscribed', 'admin', 'NoRelation', 'wantAdmin'],
        default: 'NoRelation'
    },   

});


const Rel = mongoose.model('Rel', relSchema);
module.exports.Rel = Rel ;
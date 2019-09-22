const mongoose = require('mongoose');
const shopSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 225,
    },
    subTitle: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 4000,
    },
    imgURL: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 4000,
    },
    contnent: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 4000,
    },
});


const Shop = mongoose.model('Shop', shopSchema);


module.exports.Shop = Shop;
module.exports.shopSchema = shopSchema;
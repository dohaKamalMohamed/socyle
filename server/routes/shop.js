const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Shop } = require('../models/shops');
const { Rel } = require('../models/Relation');
const mongoose = require('mongoose');
const ObjectId=mongoose.Types.ObjectId;
router.post('/', async (req, res, next) => {
    // try {
    //     let shops = await Shop.find();
    //      return  res.send(shops);
    // } catch (err) {
    //     next(err)
    // }
    try {
        Shop.aggregate([
            {
                $lookup: {
                   from: "rels",
                   localField: "_id",
                   foreignField: "ShopID",
                   as: "Inforole"
                }
            },
               { $project: {
                title:1,
                subTitle:1,
                imgURL:1,
                contnent:1,
                    'Inforole': {
                       $filter: {
                          input: "$Inforole",
                          as: "item",
                          cond: { $eq: [ "$$item.UserID",ObjectId( req.body.UserID )  ] }
                       }
                    }
                 }
            }
            
        ]).exec(function(err, results){
        return  res.send(results)
         })

    } catch (err) {
        next(err)

    }
});

router.get('/read/:id', async (req, res, next) => {
    try {
        let shop = await Shop.findOne({ _id: req.params.id });
        if (!shop) {
            return res.status(404).json('this user is not exist');
        }
        return res.json(shop);
    } catch (err) {
        next(err)
    }
});

router.post('/create', async (req, res, next) => {
    try { 
        let shop = new Shop(_.pick(req.body, [
            'title',
            'subTitle',
            'imgURL',
            'contnent',
        ]));
        await shop.save();
       
        return res.json(shop);

    } catch (err) {
        next(err)
            
    }
});

router.put('/update/:id', async (req, res, next) => {

    try {

        let shop = await Shop.findOneAndUpdate({_id: req.params.id}, _.pick(req.body, [
            'title',
            'subTitle',
            'imgURL',
            'contnent',
        ]));

        if (!shop) {
            return res.status(404).json('this shop is not exist');
        }
console.log(shop)
       return res.json(shop);
    } catch (err) {
        next(err)
    }

});

router.delete('/delete/:id', async (req, res, next) => {

    try {
        let shop = await Shop.findOneAndDelete({ _id: req.params.id });

        if (!shop) {
            return res.status(400).json('this shop is not exist');
        }

        res.json(shop);
    } catch (err) {
        next(err)
    }

});

module.exports = router;
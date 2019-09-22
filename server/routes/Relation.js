const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { Rel } = require('../models/Relation');
const mongoose = require('mongoose');
const ObjectId=mongoose.Types.ObjectId;


router.post('/create', async (req, res, next) => {
    try {
        let rel = new Rel(_.pick(req.body, [
            'ShopID',
            'UserID',
            'shopRole',
        ]));
        await rel.save();

        return res.json(rel);

    } catch (err) {
        next(err)

    }
});

router.post('/getSubscribtion', async (req, res, next) => {
    try {
        Rel.aggregate([
            {
                $lookup: {
                   from: "users",
                   localField: "UserID",
                   foreignField: "_id",
                   as: "userInfo"
                }
            },
            {
                $unwind: "$userInfo"
            },
            {
                $lookup: {
                    from: "shops",
                    localField: "ShopID",
                    foreignField: "_id",
                    as: "shopInfo"
                }
            },
            {
                $unwind: "$shopInfo"
            },{
                $match: {
                   
                         "UserID":ObjectId( req.body.UserID )
                        
                }
            },
            
        ]).exec(function(err, results){
        return  res.send(results)
         })

    } catch (err) {
        next(err)

    }
});

router.put('/update/:id', function (req,res,next){
  
     Rel.updateOne({_id:req.params.id},{shopRole:req.body.shopRole},function(err,result)
     {
         res.send(result)
     })
     
     
    })


module.exports = router;
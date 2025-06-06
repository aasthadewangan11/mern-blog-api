const express = require('express');
const router = express.Router();
const Category = require('../model/category');
const mongoose = require("mongoose");

// Add new category
router.post('/', (req, res) => {
    console.log(req.body);
    const category = new Category({
        id: new mongoose.Types.ObjectId,
        name: req.body.name
    })

        category.save()
        .then(result => {
            res.status(200).json({
                new_data: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
    })
   //get all category
   router.get('', (req, res) => {
    Category.find()
    .then(result => {
        res.status(200).json({
            category: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })  
       
})
// delete
router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    Category.findByIdAndDelete(req.params.id)
    .then(result => {
        res.status(200).json({
            msg: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })

})


module.exports = router;
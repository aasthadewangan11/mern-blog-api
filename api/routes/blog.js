const express = require('express');
const router = express.Router();
const Blog = require('../model/blog');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const checkAuth=require('../middleware/checkAuth');
cloudinary.config({//photo 
    cloud_name: 'dfgoxtq2i',
    api_key: '779272488342316',
    api_secret: 'njRTVPw330_TJUKW8QzghU_JQQ4'
})
//post new blog
//checkauth
router.post('',checkAuth,(req, res) => {
    //file/
//   console.log(req.body);
//     console.log(req.files);
//    res.status(200).json({
//         msg: 'ok'
//      })
//   })
const file=req.files.photo;
cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
    console.log(result);
const blog = new Blog({
    _id: new mongoose.Types.ObjectId,
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    category: req.body.category,
    photo: result.url
})

blog.save()
    .then(result => {
        res.status(200).json({
            new_blog: result
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
})
})

// Get all blogs
router.get('', (req, res) => {
    Blog.find()
        .then(result => {
            res.status(200).json({
                blogs: result
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
});

// Get by category
router.get('/category/:category', (req, res) => {
    Blog.find({ category: req.params.category })
        .then(result => {
            res.status(200).json({
                blogs: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});
//get by author
router.get('/author/:author', (req, res) => {
    Blog.find({ author: req.params.author })
        .then(result => {
            res.status(200).json({
                blogs: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//get blog by id
router.get('/:id', (req, res) => {
    Blog.findById(req.params.id)
    .then(result => {
        res.status(200).json({
            blog: result
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
});
//update blog
// update blog
router.put('/:id',(req,res)=>{
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath,(err,result)=>{
        Blog.findOneAndUpdate({_id:req.params.id},{
            $set:{
                title:req.body.title,
                description:req.body.description,
                author:req.body.author,
                category:req.body.category,
                photo:result.url
            }
        })
        .then(result=>{
            res.status(200).json({
                updatedBlog:result
            })
        })
        .catch(err=>{
            console.log(err)
            res.status(500).json({
                error:err
            })
        })
        
    })

        })
  //delete blog
  router.delete('',(req,res)=>{
   

    //url se name nikal ske
            const imageUrl = req.query.imageUrl;
            const urlArray = imageUrl.split('/');
            const image = urlArray[urlArray.length - 1];
            const imageName = image.split('.')[0];
            console.log(imageName);
    
            Blog.findByIdAndDelete(req.query.id)
            .then(result=>{
            cloudinary.uploader.destroy(imageName, (err, data) => {
                console.log(data);
            })
        
            

            res.status(200).json({
                deletedBlog: result
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

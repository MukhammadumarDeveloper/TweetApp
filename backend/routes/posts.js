const express = require("express");

const router = express.Router();

const Post = require('../models/post');

router.post('', (req, res, next) => {
    const post = new Post({
        title: req.body.title,
        content: req.body.content
    })
    post.save().then(CreatedPost => {
        res.status(201).json({
            message: 'Maqola muvofaqqiyatli qo\'shildi!',
            postId: CreatedPost._id
        });
    })
});

router.put('/:id', (req, res, next) => {
    const post = new Post({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content
    })
    Post.updateOne({ _id: req.params.id }, post)
        .then((resp) => {
            return res.status(200).json({
                message: 'Maqola muvofaqqiyatli o\'zgartirildi!'
            })
        })
        .catch((err) => {
            console.log(err);
        })
})

router.get('', (req, res, next) => {
    Post.find()
        .then(documents => {
            res.status(200).json({
                message: 'Maqolalar muvofaqqiyatli qabul qilindi!',
                posts: documents
            });
        })
});

router.get('/:id', (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                return res.status(200).json(post)
            } else {
                return res.status(404).json({
                    message: 'Maqola topilmadi!'
                })
            }
        })
})

router.get('/:id', (req, res, next) => {
    Post.find({ _id: req.params.id })
        .then((Res) => {
            console.log(res);
        })
})

router.delete("/:id", (req, res, next) => {
    Post.deleteOne({ _id: req.params.id })
        .then(result => {
            console.log(result)
        })
    res.status(200).json({
        message: 'Post deleted!'
    })
    next();
});

module.exports = router;
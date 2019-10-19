'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getPosts = getPosts;
exports.createPost = createPost;
exports.upDataPost = upDataPost;
exports.deletePost = deletePost;

var _post = require('../models/post');

var _post2 = _interopRequireDefault(_post);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//next for to prevent situion that the code stack because it
//is not send back response
function getPosts(req, res, next) {
    var pageSize = +req.query.pageSize;
    var pageCurrent = +req.query.page;
    var postQuery = (0, _post.find)();
    if (pageCurrent && pageSize) {
        postQuery.skip(pageSize * (pageCurrent - 1)).limit(pageSize);
    }

    postQuery.find().then(function (datas) {
        res.json({ messege: "all post", post: datas });
    });
}

function createPost(req, res, next) {

    console.log(req.file.filename);
    var url = req.protocol + '://' + req.get("host");
    var newpost = new _post2.default({
        title: req.body.title,
        content: req.body.content,
        imagePath: url + "/images/" + req.file.filename,
        creator: req.userData.userId
    });

    newpost.save().then(function (result) {
        res.status(200).json(newpost);
    }).catch(function (e) {
        res.status(400).json({ messege: "create post is fail" });
    });
}
function upDataPost(req, res, next) {

    console.log(req.body);
    var upPost = new _post2.default({
        _id: req.body.id,
        title: req.body.title,
        content: req.body.content,
        creator: req.body.creator
    });

    (0, _post.updateOne)({ _id: req.body.id, creator: req.userData.userId }, upPost).then(function (result) {
        if (result.nModified > 0) res.status(200).json({});else res.status(400).json({ messege: "updata post is fail" });
    });
}

function deletePost(req, res, next) {
    (0, _post.deleteOne)({ _id: req.params.id, creator: req.userData.userId }).then(function (result) {
        if (result.n > 0) res.status(200).json({});else res.status(400).json({ messege: "delete post failed" });
    }).catch(function (e) {
        res.status(400).json({ messege: "delete post failed" });
    });
}
import Post, { find, updateOne, deleteOne } from '../models/post';



//next for to prevent situion that the code stack because it
//is not send back response
export function getPosts(req, res, next){
  const pageSize =+req.query.pageSize
  const pageCurrent =+ req.query.page;
  const postQuery=find();
  if(pageCurrent && pageSize){
      postQuery.skip(pageSize*(pageCurrent-1))
      .limit(pageSize)
  }

  postQuery.find().then(datas =>{
      res.json({messege:"all post",post:datas })
  })
  
}

 export function  createPost(req, res, next){

   console.log(req.file.filename)
    const url =req.protocol +'://'+req.get("host")
    let newpost= new Post({
        title:req.body.title,
        content:req.body.content,
        imagePath:url +"/images/"+req.file.filename,
        creator:req.userData.userId
     })

    newpost.save().then(result=>{
        res.status(200).json(newpost)
    }).catch(e=>{
    res.status(400).json({messege:"create post is fail"})
   })
}
export function upDataPost(req, res, next){

    console.log(req.body)
    let upPost= new Post({
        _id:req.body.id,
        title:req.body.title,
        content:req.body.content,
        creator:req.body.creator
     })

    updateOne({_id:req.body.id, creator:req.userData.userId},upPost )
        .then(result=>{
            if(result.nModified>0)
            res.status(200).json({})
            else
            res.status(400).json({messege:"updata post is fail"})
        
    })
  

}



export function deletePost(req, res, next){
    deleteOne({ _id: req.params.id,creator:req.userData.userId })
        .then(result=>{
            if(result.n>0)
            res.status(200).json({})
            else
            res.status(400).json({messege:"delete post failed"})
    
            }).catch(e=>{
                res.status(400).json({messege:"delete post failed"})
            })
}


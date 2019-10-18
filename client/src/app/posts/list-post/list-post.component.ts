import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import {postService} from '../post.service'
import {post} from '../post.model'
import { Subscription} from 'rxjs'
import { PageEvent} from '@angular/material'
import { userService } from 'src/app/auth/user.service';


@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit,OnDestroy {

   posts:post[]=[];
   isUserAuth=false;
   userId:string
   private postsSub:Subscription;
   private userAuthenected:Subscription;
   totalPosts=10
   postsPerPage=2
   currentPage=1
   pageSizeOptions=[1,2,5,10]

  constructor(public postService:postService,
   private  useService:userService ) { }

  deletePost(id){
    this.postService.deletePosts(id)
  }
  ngOnInit() {
    this.postService.getPosts(this.postsPerPage, 1);

    this.postsSub= this.postService.getPostsUpdateListener()
    .subscribe((posts:post[]) =>{
     this.posts=posts;
    })
    this.isUserAuth=this.useService.getAuthPost();
    this.userId=this.useService.getUserId()
    this.userAuthenected= this.useService.getAuthListener().subscribe(isAuth=>{
      this.userId=this.useService.getUserId()
      this.isUserAuth=isAuth
      
      
    console.log(" this.userId", this.userId)
     })
  }
  
  onChangePage(page:PageEvent){
    this.currentPage=page.pageIndex+1
    this.postsPerPage=page.pageSize
    this.postService.getPosts(this.currentPage,this.postsPerPage)
  }

   ngOnDestroy(){
     this.postsSub.unsubscribe();//free memory
     this.userAuthenected.unsubscribe()
   }
}

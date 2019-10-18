
import {post} from './post.model'
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {HttpClient} from '@angular/common/http'
 import {map} from 'rxjs/operators'
import {Router} from '@angular/router'
Injectable()
export class postService{

 private storePost:post[]=[]
 private postsUpdate=new Subject<post[]>();

 port ="http://localhost:3000/api/"

 constructor(private http:HttpClient,
    private router:Router){}

 // for access to postsUpdate , cuse it is private
 public getPostsUpdateListener(){
    return this.postsUpdate.asObservable();
  }

public getPosts( postPerPages:number,currentPage:number ){
  const paramsQuery=`?pageSize=${postPerPages}&&page=${currentPage} `  
      this.http.get<{messege:string,post:any }>(this.port+"post"+paramsQuery)
      .pipe( map (( postdata )=>{
          return postdata.post.map( d =>{
            console.log("this.creator server",d.creator)
              return{
                    title:d.title,
                    content:d.content,
                    id:d._id,
                    imagePath:d.imagePath,
                    creator:d.creator
                 }
            
                });
            })
    ).subscribe((respost)=>{
        console.log(respost)
        this.storePost=respost;
        this.postsUpdate.next([...this.storePost])
      })
       
   }

  upLodePost(post:post){
    this.http.put(this.port+"post",post)
    .subscribe((resdata:post)=>{
        let index= this.storePost.findIndex(t=>
            t.id==post.id)
            this.storePost[index]=post;
       
        this.postsUpdate.next([...this.storePost])
        this.router.navigate(['/'])
    })

  }

 getPostToEdite(id :string){

     return {... this.storePost.find(t=> t.id===id)}
 }

 public deletePosts(id){      
    this.http.delete(this.port+"post/"+id)
    .subscribe(()=>{     
       
        this.storePost= this.storePost.filter( t=> t.id !==id);
        //manage memoriy dynmicaly
        this.postsUpdate.next([...this.storePost])
        
    },
   error=>{
    console.error(error)
   }
    
    )
     
 }





public addPosts(title:string , content:string ,image:File){
   const postData= new FormData();
     postData.append('title', title)
     postData.append('content', content)
     postData.append('image', image)

    this.http.post(this.port+"post",postData)
    .subscribe((resdata:post)=>{
        this.storePost.push(resdata)
        //manage memoriy dynmicaly
        this.postsUpdate.next([...this.storePost])
        this.router.navigate(['/'])
    })
       
       
   }

} 
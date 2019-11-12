 import {Component, Output,EventEmitter} from '@angular/core' 
import {post} from '../post.model'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {postService} from'../post.service';
import { ActivatedRoute,ParamMap } from '@angular/router';
import { from } from 'rxjs';
import { mimeType} from './mime-type.validator'
import { tick } from '@angular/core/testing';
 @Component({
     selector:"post-create",
     templateUrl:"./post-create.component.html",
     styleUrls:["./post-create.component.css"]
 })

 export class postCreate {
 // @Output() sendPost=new EventEmitter<post>();
   sendPost:post;
   postId:string=''
   mode:string=''
   post:post;
   isLoading=false
  form:FormGroup
  imagePreview:string

    constructor( public postService:postService,
        public route:ActivatedRoute){}

     
    ngOnInit(){
       this.initForm();
        this.isLoading=true;
        this.route.paramMap.subscribe((paramMap:ParamMap)=>{
            this.isLoading=false;
            
        if(paramMap.has("postId")){
        this.mode='edit'
        this.postId=paramMap.get("postId");
        this.post=this.postService.getPostToEdite(this.postId)

        this.form.setValue({
            title:this.post.title,
            content:this.post.content,
            image:this.post.imagePath
        })
       
    }
    else{
        this.mode='create'
        this.postId=null
    }

    })
    }   

 onImagePicked(event:Event){
   const file=(event.target as HTMLInputElement).files[0]
   this.form.patchValue({image:file})
   this.form.get("image").updateValueAndValidity();
   const reader= new FileReader();
   reader.onload=()=>{
        this.imagePreview=reader.result  as string;
      }
   reader.readAsDataURL(file)
}

private initForm(){
    this.form=new FormGroup({
        title:new FormControl(null,{
            validators:[Validators.required,Validators.minLength(3)]
        }),
        content:new FormControl(null,{
            validators:[Validators.required]
        }),
        image:new FormControl(null,{
            validators:[Validators.required],
            asyncValidators:[mimeType]
        })
    })
  }  
    addpost( ){
        if(this.mode=="create")
          this.postService.addPosts(this.form.value.title,
            this.form.value.content, this.form.value.image,
            );
        else
          {
             this.postService.upLodePost({
                 id:this.postId,
                 title:this.form.value.title,
                 content:this.form.value.content,
                 imagePath:this.form.value.image,
                 creator:this.post.creator
             }) 
          }
          //אתחול from בין  ts ל-html
     this.form.reset();
    }
 }
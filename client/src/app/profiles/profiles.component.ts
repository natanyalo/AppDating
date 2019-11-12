import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { profileService } from './profile.service';
import { Profile } from './profile.model';
import { Observable, Subscription } from 'rxjs';
import { stringify } from '@angular/compiler/src/util';
import { formatNumber } from '@angular/common';
import { mimeType } from '../posts/post-create/mime-type.validator'

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {


  agies: number[]
  cities: string[]
  status: boolean
  profile: Profile;
  typeButton: String
  private profileSub: Subscription;
  form: FormGroup
  imagePreview: string

  constructor(private profileService: profileService) { }

   ngOnInit() {
    this.initForm();
    this.imagePreview = "http://localhost:3000/assets/images/images.png"
    this.status = false;
    this.typeButton = "Save"
    this.cities = ["dimona", "Tel-aviv", "Eilat", "hadera", "haifa"]
    this.agies = [18, 19, 20, 21, 22, 23, 24, 25, 26]
    this.profileService.getProfileApi().subscribe(
        (profile: Profile) => {
          this.profile = { ...profile }
          this.status = true;
          this.imagePreview = this.profile.imagePath;
          this.typeButton = "Edit"
        },(err)=>{
          console.log(err)
        })
  }
  saveProfile() {
    if (this.form.valid) {
      if (this.profile === undefined)
        this.profileService.createProfile(this.form.value)
      else
        this.profileService.updataProfile(this.form.value)
      this.typeButton = "Edite";
      this.status = true;
      this.profile = { ... this.form.value }
      this.form.reset();
    }
  }

  edite() {
    this.form.reset();
    this.profileService.getProfile().subscribe(res => {
      this.profile = res;
    })
    this.form.setValue({
      firstName: this.profile.firstName,
      lastName: this.profile.lastName,
      age: this.profile.age,
      phoneNumber: this.profile.phoneNumber,
      city: this.profile.city,
      minimum: this.profile.minimum,
      maximum: this.profile.maximum,
      range: this.profile.range,
      summery: this.profile.summery,
      favorite: this.profile.favorite,
      image: this.imagePreview
    })
    this.typeButton = "Save";
    this.status = false;

  }

  EditeImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]
    this.form.patchValue({ image: file })
    this.form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  getImage() {
    return this.imagePreview;
  }




  private initForm() {

    this.form = new FormGroup({
      firstName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required]
      }),
      range: new FormControl(null, {
        validators: [Validators.required]

      }),
      age: new FormControl(null, {
        validators: [Validators.required]
      }),
      city: new FormControl(null, {
        validators: [Validators.required]

      }),
      favorite: new FormControl(null, {
        validators: [Validators.required]
      }),
      minimum: new FormControl(null, {
        validators: [Validators.required]

      }),
      maximum: new FormControl(null, {
        validators: [Validators.required]

      }),
      phoneNumber: new FormControl(null, {
        validators: [Validators.required]

      }),
      summery: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    })

    this.form.reset();
  }

}

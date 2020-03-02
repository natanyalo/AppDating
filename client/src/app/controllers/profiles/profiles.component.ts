import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from '../../services/profile.service'
import { Profile } from '../../models/profile.model';
import { Subscription } from 'rxjs';
import { Cities } from '../../models/cities';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Gender } from 'src/app/models/enum';


@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit, OnDestroy {
  public _agies: number[];
  public _min: number;
  public _max: number;
  public _cities: string[];
  public _ClassCities: Cities;
  public _profile: Profile;
  public _typeButton: String;
  private _profileSub: Subscription;;
  public _form: FormGroup;
  public _imagePreview: string;
  public _gender: string;
  constructor(
    private _profileService: ProfileService,
    private _router: Router,
    private _snackbar: MatSnackBar
  ) {
    this._min = 18
    this._gender = Gender.Female;
    this._max = 50;
    this._ClassCities = Cities.getCities();
    this._imagePreview = "http://localhost:4200/assets/images/person.png"
    this._typeButton = "Save";
    this._cities = Array.from(this._ClassCities.MapCities.keys());
    this.setAges();
  }
  ngOnInit() {
    this.initForm();
    this._profileService.getProfileApi();
    this._profileSub = this._profileService.getProfile()
      .subscribe(
        (profile: Profile) => {
          if (profile.image) {
            this._profile = profile;
            this._imagePreview = this._profile.image
            this.edit();
          }
        },
        () => {
          this._snackbar.open(
            'אירעה שגיאה בעת עדכון',
            'סגירה'
          );
        }
      )
  }
  private setAges() {
    this._agies = [];
    while (this._min < this._max) {
      this._agies.push(this._min);
      this._min++;
    }
  }
  private getAddress(value: any) {
    return {
      'address': {
        'coordinates': { ... this._ClassCities.MapCities.get(value) },
        'city': value
      }
    }
  }
  public saveProfile() {
    let tempProfile: Profile;
    this._form.setValue({ 
      ...this._form.value,
       gender: this._gender,
       });
    if (this._form.valid) {
      tempProfile = {
        ...this._form.value,
        ...this.getAddress(this._form.value.city),
        'gender': this._gender === Gender.Female ? false : true,
      }
      if (this._profile === undefined)
        this._profileService.createProfile(tempProfile)
      else {
        tempProfile.id = this._profile.id;
        this._profileService.updataProfile(tempProfile)
      }
      this._router.navigate(['/profile/display'])
    }
  }
  public setGender(type: string) {
    this._gender = type;
  }
  public edit() {
    this._profile.gender === false ? this._gender = Gender.Female : this._gender = Gender.Male,
      this._form.setValue({
        firstName: this._profile.firstName,
        lastName: this._profile.lastName,
        age: this._profile.age,
        gender: this._gender,
        phoneNumber: this._profile.phoneNumber,
        city: this._profile.address.city,
        minimum: this._profile.minimum,
        maximum: this._profile.maximum,
        range: this._profile.range,
        summery: this._profile.summery,
        favorite: this._profile.favorite,
        image: this._imagePreview,
      })
    this._typeButton = "Save";
  }
  public EditeImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]
    const reader = new FileReader();
    reader.onload = () => {
      this._imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  public onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0]
    this._form.patchValue({ image: file })
    this._form.get("image").updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this._imagePreview = reader.result as string;
    }
    reader.readAsDataURL(file)
  }
  public getImage() {
    return this._imagePreview;
  }
  private initForm() {
    this._form = new FormGroup({
      firstName: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(2)]
      }),
      lastName: new FormControl(null, {
        validators: [Validators.required]
      }),
      gender: new FormControl(Gender.Female, {
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
        asyncValidators: []
      })
    })
    this._form.reset();
  }
  ngOnDestroy() {
    this._profileSub.unsubscribe();
  }
}

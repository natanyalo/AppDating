import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilesDisplayComponent } from './profiles-display/profiles-display.component';
import { ProfilesComponent } from './profiles.component';
import { AppRoutinProfilegModule } from './app-routing.module';
import { AngularMatrialModule } from 'src/app/angular-matrial-module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
    declarations: [
        ProfilesComponent,
        ProfilesDisplayComponent,
    ],
    imports: [
        CommonModule,
        AppRoutinProfilegModule,
        AngularMatrialModule,
        ReactiveFormsModule,
        HttpClientModule,
        FormsModule,
    ]
})
export class ProfileModule { }

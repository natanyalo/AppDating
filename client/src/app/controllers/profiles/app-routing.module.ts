import {ProfilesComponent} from './profiles.component'
import {ProfilesDisplayComponent} from './profiles-display/profiles-display.component'
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
const routes: Routes = [
    { path: '', component: ProfilesDisplayComponent },
    { path: 'edit', component: ProfilesComponent },
    { path: 'display', component: ProfilesDisplayComponent },
];
@NgModule({
    imports: [
        [RouterModule.forChild(routes)],
    ],
    exports: [RouterModule]
})
export class AppRoutinProfilegModule { }
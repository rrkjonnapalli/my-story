import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from '@angular/router'

import {AppComponent} from './app.component';
import {ProfileComponent} from './profile/profile.component';
import {AboutComponent} from './about/about.component';
import {TitleService} from './title.service';


const routes: Routes = [
  {path: '', component: ProfileComponent},
  {path: 'about', component: AboutComponent},
  {path: ':username', component: ProfileComponent},
  {path: '**', component: ProfileComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

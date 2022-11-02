import {  NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FotgotPasswordComponent } from './auth/fotgot-password/fotgot-password.component';

import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

import { ClientLandingPageComponent } from './client/client-landing-page/client-landing-page.component';
import { ClientModule } from './client/client.module';



import { RatingComponent } from './client/rating/rating.component';
import { ViewReviewsComponent } from './client/view-reviews/view-reviews.component';
import { ContractorModule } from './contractor/contractor.module';

// Service class

//

const routes: Routes = [
 {path: 'forgot', component: FotgotPasswordComponent},
 {path: 'ratings', component: ViewReviewsComponent},
 {path:'write', component:RatingComponent},
 {path:'', component:LoginComponent},
 {path: 'register', component: RegisterComponent},
 {path:'client/landingPage',component: ClientLandingPageComponent},
 {path:'forgot', component: FotgotPasswordComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ],
  exports: [RouterModule,ContractorModule, ClientModule]
})
export class AppRoutingModule { 
  
  

}

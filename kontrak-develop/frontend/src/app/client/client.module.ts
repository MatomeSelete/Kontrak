import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { Routes, RouterModule } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { DialogModule } from "primeng/dialog";
import { ToastModule } from "primeng/toast";
import { ClientLandingPageComponent } from "./client-landing-page/client-landing-page.component";
import { ClientComponent } from "./client/client.component";
import { CreatejobComponent } from "./components/createjob/createjob.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { NavbarcComponent } from "./navbarc/navbarc.component";
import { RatingComponent } from "./rating/rating.component";
import { RequestQuoteComponent } from "./request-quote/request-quote.component";
import { TrackerComponent } from "./tracker/tracker.component";
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { ViewReviewsComponent } from "./view-reviews/view-reviews.component";
import { UserActivePageComponent } from './user-active-page/user-active-page.component';




const route: Routes = [
  {
    path: 'client', component: ClientComponent, children: [
      { path: 'navbar', component: NavbarcComponent },
      { path: 'landingPage', component: ClientLandingPageComponent },
      { path: 'job', component: CreatejobComponent },
      { path: 'app-request-quote', component: RequestQuoteComponent },
      { path: 'gallery', component: GalleryComponent },
      {path: 'userProfile', component: UserProfileComponent},
      {path:'tracker/:id', component:TrackerComponent},
      {path:'activeJob', component:UserActivePageComponent},
      
    ]
  }
]

@NgModule({
  declarations: [
    ClientComponent,
    NavbarcComponent,
    ClientLandingPageComponent,
    CreatejobComponent,
    TrackerComponent,
    RequestQuoteComponent,
    GalleryComponent,
    UserProfileComponent,
    RatingComponent,ViewReviewsComponent, UserActivePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    ConfirmPopupModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule



  ], 
   providers: [ConfirmationService,MessageService],
  
})
export class ClientModule { }

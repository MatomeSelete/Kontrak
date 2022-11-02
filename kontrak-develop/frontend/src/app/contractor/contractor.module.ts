
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';



import { ButtonModule } from "primeng/button";
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ActiveJobsPageComponent } from './active-jobs-page/active-jobs-page.component';
import { ContractorDashboardComponent } from './contractor-dashboard/contractor-dashboard.component';
import { ContractorLandingPageComponent } from './contractor-landing-page/contractor-landing-page.component';
import { ContractorPrifileComponent } from './contractor-prifile/contractor-prifile.component';
import { ContractorComponent } from './contractor/contractor.component';
import { FinishRegistrationComponent } from './finish-registration/finish-registration.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ContractorTrackerComponent } from './contractor-tracker/contractor-tracker.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const routes: Routes = [
  {path:'contractor',component:ContractorComponent,children:[
    {path:'navbar', component:NavbarComponent},
    {path: 'profile', component: ContractorPrifileComponent},
    {path:'contractor-dashboard', component:ContractorDashboardComponent},
    {path: 'finish', component: FinishRegistrationComponent},
    {path: 'app-active-jobs-page', component: ActiveJobsPageComponent},
    {path: 'contracktorTracker/:id', component: ContractorTrackerComponent}
  ]}
];



@NgModule({
  declarations: [
    ContractorComponent,
    ContractorPrifileComponent,
    ContractorDashboardComponent,
    ContractorLandingPageComponent,
    FinishRegistrationComponent,
    ActiveJobsPageComponent,
    NavbarComponent,
    ContractorTrackerComponent,
    //NavbarcComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    ConfirmPopupModule,
    DialogModule,
    ToastModule,
    ConfirmDialogModule,
    DragDropModule
  ]
})
export class ContractorModule { }

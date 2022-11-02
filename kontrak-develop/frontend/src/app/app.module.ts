
import { FinishRegistrationComponent } from "./contractor/finish-registration/finish-registration.component";
import { NavbarComponent } from "./contractor/navbar/navbar.component";
import { RatingComponent } from "./client/rating/rating.component";
import { ContractorModule } from "./contractor/contractor.module";
import { ClientModule } from "./client/client.module";

import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import { DialogModule } from "primeng/dialog";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterModule } from "@angular/router";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { FotgotPasswordComponent } from "./auth/fotgot-password/fotgot-password.component";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FotgotPasswordComponent,
    
  ],



  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    DragDropModule,
    BrowserAnimationsModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    ConfirmPopupModule
  
  ],
  providers: [ConfirmationService,MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }

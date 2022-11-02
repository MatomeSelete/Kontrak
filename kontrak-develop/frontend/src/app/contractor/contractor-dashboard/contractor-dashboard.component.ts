import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { ContractorProfileService } from 'src/app/services/contractor-profile.service';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LoginService } from 'src/app/services/login.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
interface USERS {
  id: Number;
  name: String;
  phonenumber: String;
  email: String;
  jobTitle: String;
  description: String;
}

@Component({
  selector: 'app-contractor-dashboard',
  templateUrl: './contractor-dashboard.component.html',
  styleUrls: ['./contractor-dashboard.component.scss'],
})
export class ContractorDashboardComponent implements OnInit {
  Users: any;
  oneUser = {
    description: 'yesssssir',
    email: 'teebee@gmail.com',
    firstname: 'Ipelo',
    job_date: '2022-09-30T22:00:00.000Z',
    job_id: 53,
    jobimg:
      'https://res.cloudinary.com/dz6spwzrw/image/upload/v1664622579/jobpost/jtaruxnyofj8pdrmcox2.png',
    phonenumber: '0755579908',
  };
  userProfile: any;
  ratings: any;
  average!: number;
  work: any;

  constructor(
    private dashboard: DashboardService,
    private auth: LoginService,
    private profile: ContractorProfileService,
    private confirmationService:ConfirmationService,
    private messageService:MessageService
  ) {}

  ngOnInit(): void {
    this.getJobDetauils();
    this.getAvgRating();
    this.getActi();
   
  }

  //============================get details forone user for modal===============
  ind: any;
  call(index: any) {
    this.oneUser = this.Users[index];
    this.ind = index;
  }
  //============================decline button ========================
  decline() {
    let status = { status: 'decline' };
    console.log(this.oneUser.job_id);
    this.dashboard
      .updateStatus(this.oneUser.job_id, status)
      .subscribe((data) => {
        console.log(data);
        this.getJobDetauils();
        this.getAvgRating();
        this.getActi();
      });
  }

  //============================Accept Button //============================
  accept() {
    let status = { status: 'active' };
    // console.log(this.oneUser.job_id);
    // console.log('status : ', status.status);
    this.dashboard
      .updateStatus(this.oneUser.job_id, status)
      .subscribe((data) => {
        console.log(data);
        this.getJobDetauils();
        this.getAvgRating();
        this.getActi();
      });
  }

  //============================ get requests //============================

  getJobDetauils() {
    let token = this.auth.decodeToken(localStorage.getItem('access_token'));
    let data = {
      user_id: token.user.user_id,
    };

    this.profile.getProfile(data.user_id).subscribe((data) => {
      this.userProfile = data[0];
      this.dashboard
        .getjobdetails(this.userProfile.contractor_id)
        .subscribe((data) => {
          this.Users = data;
        });
    });
  }

  //============================get and calculate the average rating //============================
  getAvgRating() {
    let token = this.auth.decodeToken(localStorage.getItem('access_token'));
    let data = {
      user_id: token.user.user_id,
    };

    this.profile.getProfile(data.user_id).subscribe((data) => {
      this.userProfile = data[0];
      // console.log('my pofile ', this.userProfile);
      // console.log(' my id ', this.userProfile.contractor_id);

      this.dashboard
        .getAvgRating(this.userProfile.contractor_id)
        .subscribe((data) => {
          let temp = 0;
          // console.log('rating ', data);
          this.ratings = data;
          this.ratings.forEach((element: any) => {
            temp += element.rating;
          });
          // console.log(' temp ', temp);
          this.average = temp / this.ratings.length;
          // this.average = Math.round(this.average)
          
          // console.log(this.average);
        });
    });
  }

  //============================get active/accepted jobs //============================
  getActi() {
  
    let token = this.auth.decodeToken(localStorage.getItem('access_token'));
    let data = {
      user_id: token.user.user_id,
    };

    this.profile.getProfile(data.user_id).subscribe((data) => {
      this.userProfile = data[0];

      this.dashboard
        .activeJob(this.userProfile.contractor_id)
        .subscribe((data) => {
          this.work = data;
        });
    });
  }

  //============================ modal controller functions //============================
  @ViewChild('myDiv')
  myDiv!: ElementRef<HTMLElement>;

  modal() {
    let el: HTMLElement = this.myDiv.nativeElement;
    el.click();
  }

  @ViewChild('gallery')
  gallery!: ElementRef<HTMLElement>;

  galleryModal() {
    let el: HTMLElement = this.gallery.nativeElement;
    el.click();
  }
     //=====================confirm   decline======================
confirmdecline(){
  this.confirmationService.confirm({
    //  target: event.target,
      message: "Are you sure you want to decline this request?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.messageService.add({
          severity:"success",
          summary: "Confirmed",
          detail: "Request declined",
       
        });
       this.decline() ;
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have cancelled"
        });
      }
    });
}
  
  //=====================confirm   accept======================
  confirmaccept(){
    this.confirmationService.confirm({
      //  target: event.target,
        message: "Are you sure you want to accept this request??",
        icon: "pi pi-exclamation-triangle",
        accept: () => {
          this.messageService.add({
            severity:"success",
            summary: "Confirmed",
            detail: "Request accepted!",
         
          });
         this.accept() ;
        },
        reject: () => {
          this.messageService.add({
            severity: "error",
            summary: "Rejected",
            detail: "You have cancelled"
          });
        }
      });
  }
}

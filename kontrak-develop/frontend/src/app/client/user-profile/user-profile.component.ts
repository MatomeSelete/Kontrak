import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ContractorProfileService } from 'src/app/services/contractor-profile.service';
import { LoginService } from 'src/app/services/login.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  decodedToken: any;
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  userProfile = {
    user_id: '26',
    category_name: 'Mason',
    contractor_id: 14,
    email: 'brandon',
    firstname: 'brandon',
    password: '$2b$10$akNzzGQQqF3WG5KIgFHSo.nB0vYIMP/mPBRyl6o2qYevMZWG8HRwK',
    phonenumber: '0127650998',
  };

  constructor(
    private formBuilder: FormBuilder,
    private auth: LoginService,
    private profile: ProfileService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
  ) {}

  Form = new FormGroup({
    firstname: new FormControl(''),
    subcategory: new FormControl(''),
    email: new FormControl(''),
    jobtype: new FormControl(''),
    skill: new FormControl(''),
    location: new FormControl(''),
    phonenumber: new FormControl(''),
    img: new FormControl(''),
    newPassword: new FormControl(''),
  });
  get f(): { [key: string]: AbstractControl } {
    return this.Form.controls;
  }
  ngOnInit(): void {
    this.getProfile();

    this.Form = this.formBuilder.group({
      firstname: ['', Validators.required],
      newPassword: ['', Validators.required],
      subcategory: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      jobtype: ['', Validators.required],
      skill: ['', Validators.required],
      location: ['', Validators.required],
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.pattern('[0-9]{3}[0-9]{3}[0-9]{4}'),
          Validators.maxLength(12),
        ],
      ],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      oldPassword: ['', Validators.required],
      occupation: ['', Validators.required],
      skills: ['', Validators.required],
      img: ['', Validators.required],
    });
  }

  getProfile() {
    this.decodedToken = this.auth.decodeToken(
      localStorage.getItem('access_token')
    );
    console.log('toekn ', this.decodedToken.user);

    this.userProfile = this.decodedToken.user;

    console.log('my things ', this.userProfile);
  }
  updatePassord() {
    let data = {
      user_id: this.userProfile.user_id.toString(),
      password: this.Form.value.newPassword,
    };

    console.log(data);

    this.profile.updatePassord(data).subscribe(
      (data) => {
        location.reload();
        console.log(data);
      },
      (err) => {}
    );
  }
  updateContacts() {
    let data = {
      user_id: this.userProfile.user_id.toString(),
      email: this.Form.value.email,
      phonenumber: this.Form.value.phonenumber,
    };
    this.profile.updatContacts(data).subscribe(
      (data) => {
        location.reload();
        console.log(data);
      },
      (err) => {}
    );
  }

  updateName() {
    let data = {
      user_id: this.userProfile.user_id.toString(),
      firstname: this.Form.value.firstname,
    };
    this.profile.updateName(data).subscribe(
      (data) => {
        this.getProfile()
        location.reload()
        console.log(data);
      },
      (err) => {}
    );
  }
  //=====================confirm name edit======================
confirmName(){
  this.confirmationService.confirm({
    //  target: event.target,
      message: "Are you sure you want to complete this edit??",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.messageService.add({
          severity:"success",
          summary: "Confirmed",
          detail: "Edit successful",
       
        });
        this.updateName();
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
//=====================confirm password edit======================
confirmPass(){
  this.confirmationService.confirm({
    //  target: event.target,
      message: "Are you sure you want to complete this edit??",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.messageService.add({
          severity:"success",
          summary: "Confirmed",
          detail: "Edit successful",
       
        });
        this.updatePassord();
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

//=====================confirm name contacts edit======================
confirmContacts(){
  this.confirmationService.confirm({
    //  target: event.target,
      message: "Are you sure you want to complete this edit??",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.messageService.add({
          severity:"success",
          summary: "Confirmed",
          detail: "Edit successful",
       
        });
        this.updateContacts();
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

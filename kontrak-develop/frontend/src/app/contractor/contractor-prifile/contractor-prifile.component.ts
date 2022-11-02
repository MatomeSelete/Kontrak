import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { ContractorProfileService } from 'src/app/services/contractor-profile.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-contractor-prifile',
  templateUrl: './contractor-prifile.component.html',
  styleUrls: ['./contractor-prifile.component.scss']
})
export class ContractorPrifileComponent implements OnInit {
  file: any;
  locations:any = ['Gauteng', 'Voslorus','Pretoria', 'Sunnyside ', 'HydePark' , 'Berea', 'Bryanston', ' West Park','Mamelodi','Johannesburg','Roodepoort','Sandton','Polokwane','Alexandra','Soweto','Randburg','Midrand']

  contractor={
    "contractor_id": 14, "job_count": 6, "user_id": 26, "location": 'roodepoord', "images": 'https://res.cloudinary.com/dz6spwzrw/image/upload/v1664531249/jobs/agfyovgpjpxvebxpai5b.png'
  };
  category={
    "category_id": 15, "category_name": 'Mason', "contractor_id": 14
  };
  user={
    "user_id": 26, 
    "firstname": 'brandon', 
    "lastname": 'mnguni', 
    "email": 'tshifhiwamnguni@gmail.com',
     "phonenumber": '0127650998',
     "images":"https://res.cloudinary.com/dz6spwzrw/image/upload/v1664263965/jobs/rnbim2xkgjc56t48hrwp.jpg"
  };
  decodedToken: any;
  submitted = false;
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  formData = new FormData;
  userProfile={
    "user_id": "",
    "category_name": "",
    "contractor_id" :26 ,
    "email": "",
    "firstname": "",
    "images": "",
    "job_count": 6,
    "location": "",
    "password": "",
    "phonenumber": "",
  "sub_catname": ""
  };


  constructor(
    private formBuilder: FormBuilder,
    private auth: LoginService,
    private profile: ContractorProfileService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
  ) {}
  

 Form = new FormGroup({
   firstname : new FormControl(''),
   subcategory: new FormControl(''),
   email: new FormControl(''),
   jobtype: new FormControl(''),
   skill: new FormControl(''),
   location: new FormControl(''),
   phonenumber: new FormControl(''),
   img: new FormControl(''),
   newPassword : new FormControl(''),
  

 })
 get f(): { [key: string]: AbstractControl } {
   return this.Form.controls;
 }
 ngOnInit(): void {
     this.getProfile()

   this.Form = this.formBuilder.group({
     firstname: ['', Validators.required],
     newPassword: ['', Validators.required],
     subcategory: ['', Validators.required],
     email: ['', [Validators.required, Validators.email]],
     jobtype: ['',Validators.required],
     skill: ['',Validators.required],
     location: ['',Validators.required],
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
 onSubmit(): void {
  let data={
    
  }
 }
 preview: string = '';
handleFileInput(event:any) {
    const image = (event.target as any ).files[0];
    this.file = image  
    //Show image preview
    let reader = new FileReader();
    reader.onload = (event: any) => {
      this.preview = event.target.result;
    }
    reader.readAsDataURL(image);
  }
  getProfile(){
    this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))
    console.log('toekn ' , this.decodedToken.user);
    
  
    let data ={
      user_id: this.decodedToken.user.user_id
    }
    console.log( 'mine  ' , data.user_id);
    
    this.profile.getProfile(data.user_id).subscribe(
      (data)=>{
        this.userProfile = data[0]
        
        
        console.log('my pofile ' ,this.userProfile);
        
    },(err)=>{
      console.log(err);
      
    })
  }
  updatePassord(){
  
    let data = {
      user_id: this.userProfile.user_id.toString(),
      password: this.Form.value.newPassword
    }

    console.log(
      data
    );
    
    this.profile.updatePassord(data).subscribe(
     (data)=>{    
      location.reload()
         console.log(data);
         
     },
     (err)=>{})
  }
  updateContacts() { 

   let data = {
    user_id: this.userProfile.user_id.toString(),
      email: this.Form.value.email,
      phonenumber: this.Form.value.phonenumber
   }
   this.profile.updatContacts(data).subscribe(
    (data)=>{
      location.reload()
        console.log(data);
        
    },
    (err)=>{})
  }
  updateCategory(){ 
 
    let data = {
      category_name: this.Form.value.occupation,
      contractor_id: this.userProfile.contractor_id.toString()
    }

    console.log(data);
    
    this.profile.updateCategory(data).subscribe(
     (data)=>{
      location.reload()
         console.log(data);
         
     },
     (err)=>{})
  }
  updateimg(){ 
 

    this.formData.append('image', this.file)

    this.profile.updateImg(this.formData, this.userProfile.contractor_id).subscribe(
     (data)=>{
      location.reload()
         console.log(data)
  
     },
     (err)=>{})
  }
  updatSkills(users : any){ 
  }
  updateLocation(){ 

    let data = {
      user_id: this.userProfile.user_id,
      location: this.Form.value.location
     }
     this.profile.updateLocation(data).subscribe(
      (data)=>{
        location.reload()
          console.log(data);
   
      },
      (err)=>{})
  }
   //=====================confirm   Category edit======================
confirm(){
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
       this.updateCategory();
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

  //=====================confirm  location edit======================
  confirmloc(){
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
         this.updateLocation();
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
//=====================confirm  contacts edit======================
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
  //=====================confirm   image edit======================
  confirmImg(){
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
         this.updateimg();
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

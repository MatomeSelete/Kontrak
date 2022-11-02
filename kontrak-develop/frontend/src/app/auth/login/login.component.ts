import { Component, OnChanges, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl, 
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ContractorProfileService } from 'src/app/services/contractor-profile.service';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';
import { LoginService } from 'src/app/services/login.service';
import { LookupServiceService } from 'src/app/services/lookup-service.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit , OnChanges {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    forgotPasssword: new FormControl('')
  });

  form2= new FormGroup({
    
    forgotPasssword: new FormControl('')
  });
  // ======declaring all the variables that are to be used in the ts form
  currentUser = {};
  userToken: any = {};
  submitted = false;
  errorMessage: String = ' ';
  checked = false;
  LoginService: any;
  Form: any;
  store: any;
  authenticateService: any;
  type: string | undefined;
  result: string[] = [];
  git:any
  decodedToken:any;
  sub:string[] = [];
  temp_sub:any;
  oneTime:any

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: LoginService,
     private forgotpassword: ForgotPasswordService,
    private profile: ContractorProfileService,
    private messageService:MessageService
     
  ) {}

  ngOnInit(): void {

  
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      forgotPasssword:['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
    });
    this.form2 = this.formBuilder.group({
  
      forgotPasssword:['', [Validators.required, Validators.email]],
    
    });
 
  }

  ngOnChanges(){
    console.log(this.sub);
  }
  //================= lets catch this errors
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls; //it traps errors in the form
  }
  get f2(): { [key: string]: AbstractControl } {
    return this.form2.controls; //it traps errors in the form
  }

  // ============ the onsubmit function to be used in the button submit

  onSubmit() {
    this.submitted = true;
//if user credentials are
    // if(!this.form.value.email || !this.form.value.password){

    //   return 
    // }


    let user = {
      email: this.form.value.email,
      password: this.form.value.password,
    };

    console.log("user");
    
   this.auth.login(user).subscribe ({next: (data) => {
    
    this.userToken = data;
      // console.log(this.userToken.token);
      
      localStorage.setItem('access_token', this.userToken.token);
      this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))
      console.log('token is ' ,this.decodedToken);
      
      // console.log(this.decodedToken.user.usertype)
    
      if (this.decodedToken.user.usertype == 'Contractor') {
        let user_id = {
          user_id:this.decodedToken.user.user_id
        }
        console.log(user_id);
        
        this.profile.onceOff(user_id.user_id).subscribe(
          (data)=>{

            this.oneTime=data
            if(this.oneTime.length==0){
              this.router.navigate(['/contractor/finish'])
            }else{
              this.router.navigate(['/contractor/contractor-dashboard'])
            }
          }
        )


       // this.router.navigate(['/contractor/contractor-dashboard'])
      } else  {

        this.router.navigate(['/client/landingPage']);
      }
    },error:(err) =>{
     
      this.errorMessage = err.error.error;

      if (err.error.error == undefined || err.error.error == "") {
        this.errorMessage = "Please Check with our HELP_LINE, If the Server is not Down";
      }
      console.log(this.errorMessage);
      return this.errorM();
      
    },
   
    })
 
   
  }

 submitted2 = false;
 onSubmit2(): void{
    this.submitted2 =true
    let user = {
      email: this.form2.value.forgotPasssword,
      
    };


 
    if(user.email =="" ){
      console.log("fill in all fields");
    }else{
    this.forgotpassword.forgotPassword(user).subscribe((data) => {
        localStorage.setItem('code', data.code);
      })
      this.router.navigateByUrl('/forgot')
    }
  }
errorM(){
  this.messageService.add({
    severity:"error",
    summary: "Error",
    detail: "Incorrect username or Password",
 
  });
}

   //=====================confirm   Category edit======================
}
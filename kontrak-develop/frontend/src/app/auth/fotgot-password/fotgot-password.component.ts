import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordService } from 'src/app/services/forgot-password.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-fotgot-password',
  templateUrl: './fotgot-password.component.html',
  styleUrls: ['./fotgot-password.component.scss']
})
export class FotgotPasswordComponent implements OnInit {
  decodedToken: any;

 
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private forgotPassword: ForgotPasswordService,     private auth: LoginService,
   ) { }

  
  submitted = false;
  form = new FormGroup({
    code: new FormControl(''),
    password: new FormControl(''),
    confirmpassword : new FormControl('')
  });
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      code: ['', [Validators.required, Validators.email]],
   
      password: [ '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ]],      confirmpassword: ['', Validators.required],
    })
  }

  
 
  get f():{ [key: string]: AbstractControl }{
    return this.form.controls;
  }


  

  onSubmit(): void {
    
    this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))
    this.submitted = true;
     let code =  localStorage.getItem('code');
     console.log(code);
     
     if(code === this.form.value.code){
       if(this.form.value.password === this.form.value.confirmpassword){
        let data ={
          email: this.decodedToken.user.email,
          password:this.form.value.password
        }
         this.forgotPassword.change(data).subscribe((data) => {
         console.log(data);
         this.router.navigateByUrl('/')
         
        })
       }
       else{
        console.log('password dont match');
        
       }
     }else{
      console.log('incorrect code');
      
     }
  
     

  }  


}

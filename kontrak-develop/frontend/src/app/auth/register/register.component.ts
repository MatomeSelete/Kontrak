import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
 constructor(
    private messageService:MessageService,
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private router:Router
    ) {
    
  }
  form: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    phonenumber: new FormControl(''),
    password: new FormControl(''),
    confirmPassword: new FormControl(''),
    usertype: new FormControl('')
    // acceptTerms: new FormControl(false),
  });
  submitted = false;

  

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  ngOnInit(): void {
    
    this.form = this.formBuilder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      usertype: ['',Validators.required],
      phonenumber: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(12),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(40),
        ],
      ],
      confirmPassword: ['', Validators.required],

    });
  }
  onSubmit(): void {
    this.submitted = true;
   
    let user = {
      firstname:this.form.value.firstname,
      lastname:this.form.value.lastname,
      phonenumber:this.form.value.phonenumber,
      email:this.form.value.email,
      password:this.form.value.password,
      usertype : this.form.value.usertype

      // acceptTerms:this.form.value.acceptTerms
      
     }
     if(this.form.invalid)   {   
      return  
 }
 
       this.registerService.signup(user).subscribe(
      (data) => {
        console.log(data);
        
        this.router.navigateByUrl('/');
        this.errorM();
      },
       )
    if (this.form.invalid) {
      return;
    }
    console.log(JSON.stringify(this.form.value, null, 2));
     
   
  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  set_registerForm(){
   

    
  }
  errorM(){
    this.messageService.add({
      severity:"error",
      summary: "Error",
      detail: "Incorrect username or Password",
   
    });
  }


}



import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, AbstractControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContractorProfileService } from 'src/app/services/contractor-profile.service';
import { LoginService } from 'src/app/services/login.service';
import { LookupServiceService } from 'src/app/services/lookup-service.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-finish-registration',
  templateUrl: './finish-registration.component.html',
  styleUrls: ['./finish-registration.component.scss']
})
export class FinishRegistrationComponent implements OnInit {
  category: any;
  temp_sub: any;
  sub: any;
  locations: any = ['Gauteng', 'Mpumalanga', 'Limpopo', 'Western cape ', 'Kwa-Zulu Natal ', 'Eastern Cape', 'Northen Cape', 'North West', '']
  cat: any
  subcat: any
  file: any;
  formData = new FormData;
  contra: any;
  ca: any;
  constructor(
    private contractorFinish: ContractorProfileService,
    private formBuilder: FormBuilder,
    private router: Router,
    private categro: LookupServiceService,
    private auth: LoginService,
    private messageService:MessageService,
    private confirmationService :ConfirmationService


  ) {

  }
  form: FormGroup = new FormGroup({
    location: new FormControl(''),
    category: new FormControl(''),
    subCategory: new FormControl(''),
    callout: new FormControl(''),


  });
  submitted = false;



  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  ngOnInit(): void {
    this.getCategro()
    this.getcon()
    this.form = this.formBuilder.group({
      location: ['', Validators.required],
      category: ['', Validators.required],
      subCategory: ['', [Validators.required, Validators.email]],
      callout: ['', Validators.required]



    });
  }




  onSubmit(): void {
    this.submitted = true;
    let token = this.auth.decodeToken(localStorage.getItem('access_token'))
    let contractor = {
      user_id: token.user.user_id,
      location: this.form.value.location,
      calloutfee: this.form.value.callout
    }
    console.log('con ', contractor);





    this.contractorFinish.finishProfile(contractor).subscribe(
      (data) => {
        this.cat = data
        this.getcon()
        console.log('this cat', this.cat);
        let cat = {
          category_name: this.form.value.category.category,
          contractor_id: this.contra[0].contractor_id

        }
        this.getca()
        console.log('this cat', cat);

        this.contractorFinish.addCategory(cat).subscribe(
          (data) => {
            console.log('this sub ', data);

            let subcat = {
              sub_catname: this.form.value.subCategory,
              category_id: this.ca[0].category_id

            }
            console.log('sub cattt', subcat);


            this.contractorFinish.addSubCategory(subcat).subscribe(
              (data) => {
                console.log(data)
              }
            )

          }
        )
      },
      (error) => {
        console.log(error);

      }
    )




  }
  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  getCategro() {

    this.categro.getCategories().subscribe(
      (data) => {
        this.category = data
        console.log(this.category);

      })

    this.categro.getSubCategories().subscribe(
      (data) => {
        this.temp_sub = data;
        console.log("sub", this.temp_sub);

      })
  }

  select(e: any) {
    let data = e.target.value;
    console.log('1st ', data[0] - 1);
    console.log('2nd', this.temp_sub);

    this.sub = []

    let temp = Object.values(this.temp_sub[data[0] - 1]);
    console.log(temp);


    temp.forEach((sub_Category: any) => {

      if (isNaN(sub_Category)) {
        console.log('ok');

        this.sub.push(sub_Category);
      }
    });



  }
  getcon() {
    let token = this.auth.decodeToken(localStorage.getItem('access_token'))
    console.log('tok ', token);

    this.contractorFinish.getcon(token.user.user_id).subscribe(
      (data) => {
        this.contra = data
        console.log('this contra ', this.contra[0]);

      }
    )
  }
  getca() {
    this.contractorFinish.getca(this.contra[0].contractor_id).subscribe(
      (data) => {
        this.ca = data

        console.log(' apwa ' , this.ca);
        
      }
    )
  }
  //=====================confirm submit======================
confirm(){
  this.confirmationService.confirm({
    //  target: event.target,
      message: "Complete profile creation?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.messageService.add({
          severity:"success",
          summary: "Confirmed",
          detail: "Successful",
       
        });
        this.onSubmit();
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



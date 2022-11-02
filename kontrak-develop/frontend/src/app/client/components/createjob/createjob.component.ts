import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { JobService } from 'src/app/services/job.service';
import { LoginService } from 'src/app/services/login.service';
import { LookupServiceService } from 'src/app/services/lookup-service.service';
import { RequestQuoteService } from 'src/app/services/request-quote.service';
import { StorageService } from 'src/app/services/storage.service';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-createjob',
  templateUrl: './createjob.component.html',
  styleUrls: ['./createjob.component.scss']
})


export class CreatejobComponent implements OnInit {

file : any ;


  submitted = false ;
   locations:any = ['Gauteng', 'Voslorus','Pretoria', 'Sunnyside ', 'HydePark' , 'Berea', 'Bryanston', ' West Park','Mamelodi','Johannesburg','Roodepoort','Sandton','Polokwane','Alexandra','Soweto','Randburg','Midrand']
  temp_sub: any;
 sub : string[]=[]

  constructor(
    public jobService :JobService ,
       private formBuilder: FormBuilder ,
        public router:Router ,
        public fb: FormBuilder,
        private filter:RequestQuoteService,
        private categro : LookupServiceService ,
         private auth: LoginService,
         private storage : StorageService,
         private confirmationService: ConfirmationService,
         private messageService: MessageService,
         private primengConfig: PrimeNGConfig) {}


  // ===== to preview the image before posting them 
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
      console.log('this file ' , this.file);
      
    }
jobform  :any = new FormGroup ({

  contractor: new FormControl(''),
      subCategory: new FormControl(''),
      location : new FormControl(''),
      description: new FormControl(''),
      image: new FormControl(''),
      job_date: new FormControl(''),
      category:new FormControl(''),
      
});

ngOnInit(): void {


 //================== using the service to get the data from the backend 

this.jobService.getContractor().subscribe((respond:any)=>{
  console.log(respond)
})
 this.getCategro()


  this.jobform = this.formBuilder.group({

    contractor: ['', [Validators.required]],
    subCategory: [ '',[Validators.required ],],
    location: ['',[Validators.required]],
    description:['',[Validators.required]],
    image:['',[Validators.required]],
   job_date: ['',[Validators.required]],
   category:['',[Validators.required]]

})
}








get Location(){

  return this.jobService.getLocation('location');

}

//============= access the formcontrols for posting 

onSubmit(): void {
  this.getCategro()
  // console.log(this.jobform);
  this.submitted = true;


  //========================= decoding the token to get the user id =========

  let decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))



//========the job variable to be passed to a service to be posted in tne backend =====

 let job = {
 
  category: this.jobform.value.category.category,
  subcategory: this.jobform.value.subCategory,
  location:this.jobform.value.location,
  description:this.jobform.value.description,
 user_id: decodedToken.user.user_id,
  job_date:this.jobform.value.job_date,
  image: this.jobform.value.image 
  
 
};

this.storage.filterDails = job
localStorage.setItem('filterDetails', JSON.stringify(job))

//this.filter.getFilter(this.jobform.value.location,this.jobform.value.category.category, this.jobform.value.subCategory)
console.log(job);

this.formData.append('image', this.file)
this.formData.append('category', job.category)
this.formData.append('subcategory', job.subcategory)
this.formData.append('description', job.description)
this.formData.append('job_date', job.job_date)
this.formData.append('location', job.location)
this.formData.append('user_id', job.user_id.toString())
console.log('this image ' ,this.formData.get('image'));

console.log('form data : ' ,this.formData);
console.log('obj data' , job);


this.jobService.postJob(this.formData).subscribe(
  (data) => {
    console.log(data);
    this.router.navigateByUrl('/client/app-request-quote');
  },
)


  if (!this.jobform.valid) {
    false;
  } 
  
  else {
    console.log(JSON.stringify(this.jobform.value));
  }



  console.log( 'storage ' , this.storage.filterDails
  );
  
}

//================ in here lets change the value we get on the dropdown

changeContractor(e:any) {
  
  this.jobform.get('contractor').setValue(e.target.value, {
     onlySelf: true
  })
}
//==================== lets catch errors =============

get f(): { [key:string]: AbstractControl } {
    return this.jobform.controls; 
  } 

//================ reset the from after each and every submit 
  onReset(): void {
  this.submitted = false;
  this.jobform.reset();


}


//============ posting an image ===============

formData= new FormData;

postingImg(){ 

  this.formData.append('image', this.file)

  this.jobService.postImg(this.jobform).subscribe(
   (data)=>{
       console.log(data)
   },
   (err)=>{})
}


category:any;

getCategro(){

this.categro.getCategories().subscribe(
  (data)=>{
    this.category = data
    console.log(this.category);

  })

  this.categro.getSubCategories().subscribe(
    (data)=>{
      this.temp_sub = data;
      console.log("sub",this.temp_sub);

    })
}
 
select(e:any){
  let data = e.target.value;
  console.log('1st ' , data[0]-1);
  console.log('2nd' , this.temp_sub);
  
  this.sub = []

  let temp = Object.values(this.temp_sub[data[0]-1]);
   console.log(temp);
   
 
  temp.forEach((sub_Category:any) => {

    if(isNaN(sub_Category)){
      console.log('ok');

     this.sub.push(sub_Category);
    }
  });
 


  }

  confirm() {
    this.confirmationService.confirm({
    //  target: event.target,
      message: "Are you sure you want to post this job?",
      icon: "pi pi-exclamation-triangle",
      accept: () => {
        this.messageService.add({
          severity:"success",
          summary: "Confirmed",
          detail: "Job posted",
       
        });
        this.onSubmit();
        this.postingImg
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Cancelled",
          detail: "You have opted not to post this job"
        });
      }
    });
  }
}




import { Component, OnInit } from '@angular/core';
import { JobStatus } from 'src/app/interfaces/jobstatus';
import { ActivePageService } from 'src/app/services/active-page.service';
import { LoginService } from 'src/app/services/login.service';
import { RequestQuoteService } from 'src/app/services/request-quote.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-user-active-page',
  templateUrl: './user-active-page.component.html',
  styleUrls: ['./user-active-page.component.scss']
})
export class UserActivePageComponent implements OnInit {

  requestedJobs = {
    description: "yesssssir",
    status: "active",
    firstname: "brandon"
  }

  Jobs: JobStatus[] = [];
  details: any;
  users: any;
  contractor:any;
  id:any ;
  decodedToken: any;


  

  constructor(private activeJobs: ActivePageService, private storage : StorageService, private auth:LoginService,private req:RequestQuoteService) { }


  numberofActive: number = 0;
  numberofPending: number = 0;

  ngOnInit(): void {

      this.decodedToken = this.auth.decodeToken(localStorage.getItem('access_token'))
     console.log('toekn ', this.decodedToken.user);
    this.id = this.decodedToken.user.user_id;

    let data ={
      // contractor_id: this.decodedToken.user.user_id
      contractor_id: 18
    }
  
    this.req.getContractor(data).subscribe((cont:any)=>{
      this.contractor = cont
      console.log(cont);
      
    })
   
    console.log( 'mine  ' , data);
  
    
    this.activeJobs.getRequestedJob(data).subscribe((job:any)=>{
      this.Jobs = job
      console.log( this.Jobs)

      for (let index = 0; index < job.length; index++) {
        if(this.Jobs[index].status === 'active'){
          // this.Jobs.push(job[index])
          this.numberofActive++;
        }else{
          this.numberofPending++;
        }
      }
  
    })
  
  //console.log(requestedJobs);

  // this.getJobs(this.requestedJobs)
  }

  // getJobs(id:any) {

  //   this.activeJobs.getRequestedJob(this.requestedJobs).subscribe((job)=>{
  //     console.log(job)
  //     this.Jobs = job
  //   })
  

    
  // }
  getUserInfo(index:any){
    this.details = this.Jobs[index]
    console.log(this.Jobs[index],"Function")
  

}
}
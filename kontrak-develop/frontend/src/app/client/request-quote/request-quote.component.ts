import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {
  ConfirmationService,
  MessageService,
  PrimeNGConfig,
} from 'primeng/api';

import { Observable } from 'rxjs';
import { DashboardService } from 'src/app/services/dashboard.service';
import { LoginService } from 'src/app/services/login.service';
import { RequestQuoteService } from 'src/app/services/request-quote.service';
import { ReviewsService } from 'src/app/services/reviews.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-request-quote',
  templateUrl: './request-quote.component.html',
  styleUrls: ['./request-quote.component.scss'],
})
export class RequestQuoteComponent implements OnInit {
  starRating = 0;
  imageInfos?: Observable<any>;
  review: any;

  requestContractor = {
    firstname: '',
    user_id: '',
    contractor_id: '',
    contractorLocation: '',
    contractorImages: '',
    reviewRating: '',
    contractorCalloutfee: '',
    category_category_name: '',
    sub_category_sub_catname: '',
  };

  contractorName: any;
  contactorDetails: any;
  RequestQoute: any;
  galleryImg: any;
  Fdata: any;
  status: any = false;
  Cid: any;

  btnstate: boolean = false;
  ratings: any;
  average: any;
  average2!: number;

  constructor(
    private RequestQuote: RequestQuoteService,
    private auth: LoginService,
    private storage: StorageService,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private dashboard: DashboardService
  ) {}

  ngOnInit(): void {
    this.showimages();

    this.Fdata = localStorage.getItem('filterDetails');

    this.Fdata = JSON.parse(this.Fdata);

    const data = {
      location: this.Fdata.location,
      category_name: this.Fdata.category,
      sub_catname: this.Fdata.subcategory,
    };

    this.RequestQuote.getContractor(data).subscribe((contractor) => {
      this.contractorName = contractor;
    });

    this.getReviews();
    console.log('show', this.show);
    this.inner()
    
  }

  //========================== showing contacts in the contractor contacts modal from backend ==============================
  showContacts(id: any) {
    this.RequestQuote.getContacts(id).subscribe((contact) => {
      this.contactorDetails = contact;
    });
  }

  //========================== showing imgaes in the contractor gallery from backend ==============================
  showimages() {
    this.Fdata = localStorage.getItem('filterDetails');

    this.Fdata = JSON.parse(this.Fdata);

    const data = {
      location: this.Fdata.location,
      category_name: this.Fdata.category,
      sub_catname: this.Fdata.subcategory,
    };

    this.RequestQuote.getContractor(data).subscribe((contractor) => {
      this.contractorName = contractor;

      const img = {
        contractor_id: this.contractorName[0].contractor_id,
      };

      this.RequestQuote.showimages(img).subscribe((img) => {
        this.galleryImg = img;
        console.log('gallery' ,this.galleryImg);
        
      });
    });
  }

  //========================== reviews ==============================
  reviews() {
    let data = {
      contractor_id: this.contractorName[0].contractor_id,
    };
    localStorage.setItem('review',this.contractorName[0].contractor_id)

    this.storage.contractor_id = data.contractor_id;
    this.router.navigateByUrl('/ratings');
  }

  //=============================== requesting qoutes from backend ===========================================
  btnVal = 'Request Quote';

  sendQoute() {
    let token = this.auth.decodeToken(localStorage.getItem('access_token'));

    this.Fdata = localStorage.getItem('filterDetails');

    this.Fdata = JSON.parse(this.Fdata);

    const data2 = {
      location: this.Fdata.location,
      category_name: this.Fdata.category,
      sub_catname: this.Fdata.subcategory,
    };

    this.RequestQuote.getContractor(data2).subscribe((contractor) => {
      this.contractorName = contractor;

      const data = {
        contractor_id: this.contractorName[0].contractor_id,
        user_id: token.user.user_id,
      };

      this.RequestQuote.postRequest(data).subscribe((qoute) => {
        this.RequestQoute = qoute;
      });

      this.btnVal = 'Requested';
      this.btnstate = true;
    });
  }

  getReviews() {
    this.Fdata = localStorage.getItem('filterDetails');

    this.Fdata = JSON.parse(this.Fdata);

    const data2 = {
      location: this.Fdata.location,
      category_name: this.Fdata.category,
      sub_catname: this.Fdata.subcategory,
    };

    this.RequestQuote.getContractor(data2).subscribe((contractor) => {
      this.contractorName = contractor;

      this.dashboard
        .getAvgRating(this.contractorName[0].contractor_id)
        .subscribe((data) => {
          let temp = 0;

          this.ratings = data;
          this.ratings.forEach((element: any) => {
            temp += element.rating;
          });

          this.average = temp / this.ratings.length;
          this.average2 = parseInt(this.average);
        });
    });
  }

  @ViewChild('gallery')
  gallery!: ElementRef<HTMLElement>;

  galleryModal() {
    let el: HTMLElement = this.gallery.nativeElement;
    el.click();
  }
  @ViewChild('contact')
  contact!: ElementRef<HTMLElement>;

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to post this request?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmed',
          detail: 'Request sent',
        });
        this.sendQoute();
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have cancelled',
        });
      },
    });
  }

  contactModal() {
    let el: HTMLElement = this.contact.nativeElement;
    el.click();
  }
  x=0
  show:any
  next(){

    console.log('next');
    this.show = this.galleryImg[this.x]
    this.x++
    if(this.x > this.galleryImg.length){
      this.x = 0
    }
    
  }
  prev(){

    console.log('prev');
    this.show = this.galleryImg[this.x]
    this.x--
    if(this.x < 0){
      this.x = 2
    }
    
  }
  inner(){
    
    this.show = {
      contractor_id: 18,
      image: "https://res.cloudinary.com/dz6spwzrw/image/upload/v1666684425/jobs/acu2kdljh7ammygyccbf.jpg"
      ,img_id: 7
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { LoginService } from '../../services/login.service';
import { ReviewsService } from '../../services/reviews.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-view-reviews',
  templateUrl: './view-reviews.component.html',
  styleUrls: ['./view-reviews.component.scss']
})
export class ViewReviewsComponent implements OnInit {


  rating: any;

  reviews: any = [];

  constructor(
    private storage: StorageService,
    private reviewService: ReviewsService,
    public router: Router,  
  ) {}


  ngOnInit(): void {
    this.getReviews();
  }


  getReviews() {
    let id = {
      contactor_id: localStorage.getItem('review')
    };
    console.log(this.storage.contractor_id);
    console.log(id.contactor_id);

    this.reviewService.getReview(id.contactor_id).subscribe((data) => {
      this.reviews = data;
      console.log(this.reviews);
    });
  }
}

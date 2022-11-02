import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  AbstractControl,
  Validators,
} from '@angular/forms';
import { loadTranslations } from '@angular/localize';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { ReviewsService } from '../../services/reviews.service';
import { StorageService } from '../../services/storage.service';
import {
  ConfirmationService, MessageService, PrimeNGConfig} from "primeng/api";
  import { ConfirmPopupModule } from "primeng/confirmpopup";


@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss'],
})
export class RatingComponent implements OnInit {
  submitted = false;

  rating: any;

  reviews: any = [];

  constructor(
    private storage: StorageService,
    private auth: LoginService,
    private formBuilder: FormBuilder,
    private reviewService: ReviewsService,
    public router: Router,
    private route: ActivatedRoute,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    
  ) {}

  //=========== building the attributes of the form ==================

  Form = new FormGroup({
    rating: new FormControl(''),
    name: new FormControl(''),
    comment: new FormControl(''),
  });

  ngOnInit(): void {
    this.getReviews();
    //============== validating attributes of then form =============
    this.Form = this.formBuilder.group({
      rating: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.name]],
      comment: ['', [Validators.required]],
      
    });
  }
  //============== the validator =============
  get f(): { [key: string]: AbstractControl } {
    return this.Form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    let decodedToken = this.auth.decodeToken(
      localStorage.getItem('access_token')
    );
    let id = {
      contractor_id: this.storage.contractor_id,
    };
    let review = {
      rating: this.rating,
      firstname: this.Form.value.name,
      comment: this.Form.value.comment,

      contractor_id: id.contractor_id,
      user_id: decodedToken.user.user_id,
    };

    console.log(review);

    //======= post a review ============

    this.reviewService.postReview(review).subscribe((data) => {
      console.log(data);
      this.getReviews(); // ========= to be added =========
    });

    //========= check if the form is valid and console info ============

    if (this.Form.invalid) {
      return;
    }
    this.Form.reset()
    console.log(review);
  }
  yes(e: any) {
    console.log('es');
    console.log(e.target.value);

    this.rating = e.target.value;
  }

  
  //=============== get review reviews =========================

  getReviews() {
    let id = {
      contactor_id: localStorage.getItem('review')
    };
    console.log(this.storage.contractor_id);
    console.log(id.contactor_id);

    this.reviewService.getReview(id.contactor_id).subscribe((data) => {
      // this.rating = data

      this.reviews = data;

      console.log(this.reviews);
    });
  }

  //=============alerts==================

confirm() {
  this.confirmationService.confirm({
  //  target: event.target,
    message: "Are you sure you want to post this review?",
    icon: "pi pi-exclamation-triangle",
    accept: () => {
      this.messageService.add({
        severity:"success",
        summary: "Confirmed",
        detail: "Review posted",
     
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

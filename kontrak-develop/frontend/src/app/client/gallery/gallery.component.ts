import { Component, OnInit } from '@angular/core';
import { RequestQuoteService } from 'src/app/services/request-quote.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  galleryImg: any;

  constructor(private RequestQuote: RequestQuoteService) { }

  ngOnInit(): void {
    this.showimages()
  }

   //========================== showing imgaes in the contractor gallery from backend ============================== 
   showimages() {
    const img = {
      contractor_id: 14
    }
    console.log('101;',img)

    this.RequestQuote.showimages(img).subscribe((img) => {
      console.log(img)
      this.galleryImg = img
    })
  }



}

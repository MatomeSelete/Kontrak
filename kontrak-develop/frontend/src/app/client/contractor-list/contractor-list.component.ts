import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-contractor-list',
  templateUrl: './contractor-list.component.html',
  styleUrls: ['./contractor-list.component.scss']
})
export class ContractorListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  @ViewChild('gallery')
  gallery!: ElementRef<HTMLElement>;

  galleryModal() {
    let el: HTMLElement = this.gallery.nativeElement;
    el.click();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { elementAt } from 'rxjs/operators';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { DisplayService } from 'src/app/services/display.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {
  @Input() media_id: any;
  @Input() media_type: any;

  public reviews: any;
  public counter: any;
  isMobile: boolean = false;

  constructor(private displayService: DisplayService, breakpointObserver: BreakpointObserver) {

    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.isMobile = true
      }
    });
  }

  ngOnInit(): void {
    this.getReviews();
  }


  getReviews() {
    this.displayService.getReview(this.media_id, this.media_type).subscribe((res: any) => {
      this.reviews = res;

      this.reviews.forEach((element: any) => {
        console.log("created_at", element.created_at);
        var options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        element.created_at = new Date(element.created_at).toLocaleString('en-US', options);
      });
      if (this.reviews.length >= 10) {
        this.reviews = this.reviews.slice(0, 10);
        this.counter = 10;
      } else {
        this.counter = this.reviews.length;
      }
    })
  }


}

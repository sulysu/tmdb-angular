import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  public media_id: any;
  public media_type: any;
  public header: any;
  constructor(private _route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.media_id = params.get("id");
      this.media_type = params.get("media_type");
      this.header = this.convertMediaString(this.media_type);
    })
    this.router.routeReuseStrategy.shouldReuseRoute = function(){
      return false;
    }
  }



  convertMediaString(media_type: string) {
    if (media_type == "movie") {
      return "Movies"
    } else {
      return "TV Shows"
    }
  }
}
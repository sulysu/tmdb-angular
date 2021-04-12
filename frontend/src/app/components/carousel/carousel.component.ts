import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarouselService } from '../../services/carousel.service'
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

const STORAGE_KEY: string = "continue_watching";

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  @Input() title: any;
  @Input() url: any;
  @Input() media_type: any;
  @Input() media_id: any;
  @Input() carousel_type: any;

  public data_formatted: any = [];

  isMobile: boolean = false;

  constructor(private carouselService: CarouselService, breakpointObserver: BreakpointObserver) {
   
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

    switch (this.carousel_type) {
      case "mix": {
        this.fetchMedia();
        break;
      }
      case "normal": {
        this.fetchImage();
        break;
      }
      case "recommendation": {
        this.fetchRecommendation();
        break;
      }
      case "similar": {
        this.fetchSimilar();
        break;
      }
    }
  }

  fetchImage() {
    let data: any = [];
    this.carouselService.getResponse(this.url).subscribe((res: any) => {
      data = res;
      data.forEach((element: any) => {
        if (this.media_type == "tv") {
          element.title = element.name;
        }
      });

      this.carouselService.filterNullImage(data, this.data_formatted);
    })
  }

  fetchRecommendation() {
    this.carouselService.getRecommendation(this.media_id, this.media_type).subscribe((res: any) => {
      
      res.forEach((element: any) => {
        if (this.media_type == "tv") {
          element.title = element.name;
        }
      });
      this.carouselService.filterNullImage(res, this.data_formatted);

    })
  }

  fetchSimilar() {
    
    this.carouselService.getSimilar(this.media_id, this.media_type).subscribe((res: any) => {
      res.forEach((element: any) => {
        if (this.media_type == "tv") {
          element.title = element.name;
        }
      });
      this.carouselService.filterNullImage(res, this.data_formatted);
    })
  }

  fetchMedia() {
    let watch_list = JSON.parse(window.localStorage.getItem(STORAGE_KEY)!);
    if (watch_list == null) {
      this.data_formatted = null;
    } else {
      this.carouselService.filterNullImage(watch_list.reverse(), this.data_formatted)
    }
  }


  storeOnLocalStorage(media_type: string, media_id: number, poster_path: string, title: string) {

    let continue_watch_list = JSON.parse(window.localStorage.getItem(STORAGE_KEY)!) || null;


    if (continue_watch_list == null) {
      continue_watch_list = [];
    } else if (!(continue_watch_list instanceof Array)) {
      continue_watch_list = [continue_watch_list];
    }

    const record = {
      "media_type": media_type,
      "id": media_id,
      "poster_path": poster_path,
      "title": title,
    }

    for (let i = 0; i < continue_watch_list.length; i++) {
      if (continue_watch_list[i].id == record.id) {
        continue_watch_list.splice(i, 1);
      }
    }

    continue_watch_list.push(record);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(continue_watch_list));
  }

}
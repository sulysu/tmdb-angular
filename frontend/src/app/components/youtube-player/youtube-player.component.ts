import { Component, Input, OnInit } from '@angular/core';
import {YouTubePlayerModule} from '@angular/youtube-player';
import { DisplayService } from 'src/app/services/display.service';
import { Router,NavigationEnd  } from '@angular/router';

let apiLoaded = false;

@Component({
  selector: 'app-youtube-player',
  template: '<youtube-player videoId={{id}} [width]="900"></youtube-player>',
  styleUrls: ['./youtube-player.component.css']
})


export class YoutubePlayerComponent implements OnInit {

  @Input() media_id:any;
  @Input() media_type:any;
  public id : any;

  constructor(private displayService:DisplayService, private router: Router) {}

  ngOnInit(): void {
    this.fetchVideoId();
    if (!apiLoaded) {
      this.fetchVideoId();
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      document.body.appendChild(tag);
      apiLoaded = true;
    }
  }

  fetchVideoId(){
   this.displayService.getVideo(this.media_id, this.media_type).subscribe(res =>{
     this.id = res;
   });
  }

}

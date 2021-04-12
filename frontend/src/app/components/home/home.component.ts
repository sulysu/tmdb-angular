import { Component, Input, OnInit } from '@angular/core';
import { CarouselService } from '../../services/carousel.service'
import{environment} from '../../../environments/environment'

 
const STORAGE_KEY: string = "continue_watching";
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  private now_playing: any;
  public now_playing_formatted: any = [];

  public trending_movie_formatted: any = [];  
  
  public apiUrl:any = environment.apiUrl;

  public isMobile:boolean =false;

  public intervalTime:number=0;

  constructor(private carouselService: CarouselService) {
    this.isMobile = this.carouselService.isMobile();
    if(!this.isMobile){
      this.intervalTime = 1000;
    }
   }

  ngOnInit(): void {
    this.fetchNowPlaying();
  }

  storeOnLocalStorage(media_type: string, media_id: number, poster_path: string, title: string) {
    let continue_watch_list = JSON.parse(window.localStorage.getItem(STORAGE_KEY)!) || null ;

    if(continue_watch_list == null){
      continue_watch_list = [];
    }else if(!(continue_watch_list instanceof Array)) {
      continue_watch_list = [continue_watch_list];
    }

    const record = {
      "media_type": media_type,
      "id": media_id,
      "poster_path": poster_path,
      "title": title,
    }
    
    for(let i = 0; i < continue_watch_list.length; i++){
      if(continue_watch_list[i].id == record.id){
        continue_watch_list.splice(i,1);
      }
    }

    continue_watch_list.push(record);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(continue_watch_list));
  }
  fetchNowPlaying() {
    let URL = this.apiUrl+"movie/now_playing";
    this.carouselService.getResponse(URL).subscribe(res => {
      this.now_playing = res;

      let i: number = 0;
      while (i < 5) {
        if (this.now_playing[i].backdrop_path != null) {
          this.now_playing_formatted.push(this.now_playing[i]);
          i++;
        }
      }
    })
  }
}

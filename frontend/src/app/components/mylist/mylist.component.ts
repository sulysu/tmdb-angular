import { Component, OnInit } from '@angular/core';
import { CarouselService } from 'src/app/services/carousel.service';
import { DisplayService } from 'src/app/services/display.service';
const STORAGE_KEY: string = "my_watch_list";
const CONTINUE_KEY:string = "continue_watching";
@Component({
  selector: 'app-mylist',
  templateUrl: './mylist.component.html',
  styleUrls: ['./mylist.component.css']
})


export class MylistComponent implements OnInit {
  public my_watch_list: any;
  public isMobile:boolean = false;
  constructor(private displayService: DisplayService, private carouselService: CarouselService) {
    this.isMobile = carouselService.isMobile();
   }

  ngOnInit(): void {
    this.displayData();
  }

  displayData() {
    this.my_watch_list = JSON.parse(window.localStorage.getItem(STORAGE_KEY)!) || null;
    if (this.my_watch_list == null) {
      return;
    } else if (!(this.my_watch_list instanceof Array)) {
      this.my_watch_list = [this.my_watch_list];
    }
    this.my_watch_list.forEach((element: any) => {
      this.displayService.getDetails(element.id, element.media_type).subscribe((res: any) => {
        element["poster_path"] = res.poster_path;
      })
    });
  }


  storeOnLocalStorage(media_type: string, media_id: number, poster_path: string, title: string) {

    let continue_watch_list = JSON.parse(window.localStorage.getItem(CONTINUE_KEY)!) || null ;

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

    window.localStorage.setItem(CONTINUE_KEY, JSON.stringify(continue_watch_list));
  }
}

import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbAlert } from '@ng-bootstrap/ng-bootstrap';

import { DisplayService } from 'src/app/services/display.service';

const STORAGE_KEY: string = "my_watch_list";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  @Input() media_id: any;
  @Input() media_type: any;

  public title: any;
  public tagline: any;
  public release_year: any;
  public vote_average: any;
  public runtime: any;
  public genres: any;
  public spoken_languages: any;
  public overview: any;

  public addState: boolean = false;
  public alertState: any;
  public alertMessage: any;

  @ViewChild('selfClosingAlert', { static: false })
  selfClosingAlert!: NgbAlert;
  
  constructor(private displayService: DisplayService) { }

  
  ngOnInit(): void {
  

    this.displayService.getDetails(this.media_id, this.media_type).subscribe((res: any) => {
      this.isAdded();
      if (this.media_type == "tv") {
        this.title = res.name;
        this.release_year = res.first_air_date.slice(0, 4);
        this.runtime = this.getRuntimeHour(res.episode_run_time)
      } else {
        this.release_year = res.release_date.slice(0, 4);
        this.runtime = this.getRuntimeHour(res.runtime);
        this.title = res.title;
      }

      this.tagline = res.tagline;
      this.vote_average = res.vote_average;
      this.genres = this.getGenre(res.genres);
      this.spoken_languages = this.getLanguages(res.spoken_languages);
      this.overview = res.overview;


    })
  }


  stateChnange() {
    switch (this.addState) {
      case true: {
        this.addState = false;
        this.alertState = "danger";
        this.alertMessage = "Removed from watchlist."
        setTimeout(() =>{
          this.selfClosingAlert.close();
        },5000);
        this.removeItem();
        break;
      }
      case false: {
        this.addState = true;
        this.alertState = "success";
        this.alertMessage = "Added to watchlist."
        setTimeout(() =>{
          this.selfClosingAlert.close();
        },5000);
        this.addItem();
        break;
      }
    }
  }



  addItem() {
    let watch_list = JSON.parse(window.localStorage.getItem(STORAGE_KEY)!) || null;

    if (watch_list == null) {
      watch_list = [];
    } else if (!(watch_list instanceof Array)) {
      watch_list = [watch_list];
    }

    const record = {
      "media_type": this.media_type,
      "id": this.media_id,
      "title": this.title,
    }

    for (let i = 0; i < watch_list.length; i++) {
      if (watch_list[i].id == record.id) {
        watch_list.splice(i, 1);
      }
    }

    watch_list.push(record);

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(watch_list));

  }

  removeItem() {
    let watch_list = JSON.parse(window.localStorage.getItem(STORAGE_KEY)!)|| null;

    if (watch_list == null) {
      watch_list = [];
    } else if (!(watch_list instanceof Array)) {
      watch_list = [watch_list];
    }

    for (let i = 0; i < watch_list.length; i++) {
      if (watch_list[i].id == this.media_id) {
        watch_list.splice(i, 1);
      }
    }

    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(watch_list));

  }
  getRuntimeHour(runtime: number) {
    let time_template: string;
    if (runtime < 60) {
      time_template = runtime + "mins";
    } else {
      let hour_time = Math.floor(runtime / 60);
      let min_time = runtime % 60;
      let hour: string;
      let min: string;
      if (hour_time == 1) {
        hour = "hr"
      } else {
        hour = "hr"
      }
      if (min_time == 0) {
        min = "";
      } else if (min_time == 1) {
        min = "min"
      } else {
        min = "mins"
      }
      time_template = hour_time + hour + " " + min_time + min;
    }
    return time_template;
  }


  getGenre(genres: any) {
    let genre_template = "";
    genres.forEach((element: any) => {
      genre_template += element.name + ",";
    });
    return genre_template.slice(0, genre_template.length - 1);
  }

  getLanguages(spoken_languages: any) {
    let language_template = "";
    spoken_languages.forEach((element: any) => {
      language_template += element.english_name + ",";
    });
    return language_template.slice(0, language_template.length - 1)
  }

  isAdded(){
    let watch_list = JSON.parse(window.localStorage.getItem(STORAGE_KEY)!) || null;
    if (watch_list == null) {
      watch_list = [];
    } else if (!(watch_list instanceof Array)) {
      watch_list = [watch_list];
    }

    this.addState = false;

    for (let i = 0; i < watch_list.length; i++) {
      if (watch_list[i].id == this.media_id) {
        this.addState = true;
      }
    }
  }
}



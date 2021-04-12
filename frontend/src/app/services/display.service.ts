import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import{environment} from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DisplayService {
  private videos: any;
  public apiUrl:any = environment.apiUrl;


  constructor(private httpClient: HttpClient) { }

  getResponse(url: string) {
    return this.httpClient.get(url);
  }

  getPosterPath(media_id: number, media_type:string){
    this.getDetails(media_id,media_type).subscribe((res:any)=>{
      return res.poster_path;
    })
  }

  getVideo(media_id: number, media_type:string) {
    let URL = this.apiUrl+media_type+"/videos?id=" + media_id;
    let video_key: any = "tzkWB85ULJY";


    return new Observable((observer: any) => {

      this.getResponse(URL).subscribe(res => {
        this.videos = res;
        var i: number;
        for (i = 0; i < this.videos.length; i++) {
          var record = this.videos[i]; 
          if (record.type == "Trailer") {
            video_key = record.key;
            break;
          }
          if (record.type == "Teaser") {
            video_key = record.key;
            break;
          }
        }
        observer.next(video_key);
      });
    });
  };

  getDetails(media_id: number, media_type:string){
   let URL = this.apiUrl+media_type+"/details?id=" + media_id;

   return new Observable((observer:any) =>{
      this.getResponse(URL).subscribe(res=>{
        observer.next(res);
      });
    });
  };

  getCast(media_id:number, media_type:string){
    let URL = this.apiUrl+media_type+"/cast?id=" + media_id;
    return new Observable((observer:any) =>{
      this.getResponse(URL).subscribe(res=>{
        observer.next(res);
      });
    });
  };

  getPersonDetails(person_id:number){
    let URL = this.apiUrl+"person/details?id=" + person_id;  
    return new Observable((observer:any) =>{
      this.getResponse(URL).subscribe(res=>{
        observer.next(res);
      });
    });
  }

  getPersonExternalIds(person_id:number){
    let URL = this.apiUrl+"person/external_ids?id=" + person_id;  
    return new Observable((observer:any) =>{
      this.getResponse(URL).subscribe(res=>{
        observer.next(res);
      });
    });
  }

  getReview(media_id:number, media_type:string){
    let URL = this.apiUrl+media_type+"/reviews?id=" + media_id;
    return new Observable((observer:any) =>{
      this.getResponse(URL).subscribe(res=>{
        observer.next(res);
      });
    });
  }

}

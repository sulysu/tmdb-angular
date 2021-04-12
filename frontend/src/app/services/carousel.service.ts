import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import {environment} from '../../environments/environment'

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})

export class CarouselService {
  
  constructor(private httpClient: HttpClient) { }

  getResponse(url: string) {
    return this.httpClient.get(url);
  }

  getRecommendation(media_id: number, media_type: string) {
    let URL = apiUrl + media_type + "/recommendation?id=" + media_id;
    return new Observable((observer: any) => {
      this.getResponse(URL).subscribe((res: any) => {
        observer.next(res);
      });
    });
  };

  getSimilar(media_id: number, media_type: string) {
    let URL = apiUrl + media_type + "/similar?id=" + media_id;
    return new Observable((observer: any) => {
      this.getResponse(URL).subscribe((res: any) => {
        observer.next(res);
      });
    });

  }

  filterNullImage(data: any, data_formatted: any): void {
    if (this.isMobile()) {
      (data || []).slice(0, 24).forEach((item: any) => {
        data_formatted.push(item);
      });
      console.log(data_formatted);
      return;
    }

    var j = -1;
    let length = (data.length > 24) ? 24 : data.length;

    for (var i = 0; i < length; i++) {
      if (i % 6 == 0) {
        j++;
        data_formatted[j] = [];
        data_formatted[j].push(data[i]);
      } else {
        data_formatted[j].push(data[i]);
      }
    }
    console.log("data-formatted", data_formatted);
  }

  isMobile() {
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      return true;
    } else {
      return false;
    }
  }

}


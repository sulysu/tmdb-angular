import { Component, Input, OnInit } from '@angular/core';
import { DisplayService } from 'src/app/services/display.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  @Input() media_id: any;
  @Input() media_type: any;

  public facebook_share:any;
  public twitter_share:any;
  private video_url:any;
  private video_key:any;
  private video_title:any;

  constructor(private displayService:DisplayService) { 
    
  }

  ngOnInit(): void {
    this.getTwitterShare();
    this.getFacebookShare();
  }

  getFacebookShare(){
    this.displayService.getVideo(this.media_id,this.media_type).subscribe((res:any)=>{
      this.video_key = res;
      this.facebook_share = encodeURI(this.video_key);
      console.log(this.facebook_share);
    })
  }

  getTwitterShare(){
    this.displayService.getDetails(this.media_id, this.media_type).subscribe((res:any)=>{
      if(this.media_type == "tv"){
        this.video_title = res.name;
      }else{
        this.video_title = res.title;
      }

      this.displayService.getVideo(this.media_id,this.media_type).subscribe((res:any)=>{
        this.video_url = "https://www.youtube.com/watch?v=" + res;
        let title_line ="Watch" + this.video_title+" " ;
        let tag = "%20%23USC %20%23CSCI571 %20%23FightOn"
       this.twitter_share = title_line +  this.video_url + tag;
      })
    })
  }

  

}

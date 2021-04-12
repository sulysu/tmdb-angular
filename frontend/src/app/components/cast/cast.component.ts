import { Component, Input, OnInit } from '@angular/core';
import { DisplayService } from 'src/app/services/display.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cast',
  templateUrl: './cast.component.html',
  styleUrls: ['./cast.component.css']
})
export class CastComponent implements OnInit {
  @Input() media_id: any;
  @Input() media_type: any;
  public cast_formatted: any;// = [{ "id": 1292479, "name": "Deborah Ayorinde", "character": "Lucky Emory", "profile_path": "https://image.tmdb.org/t/p/w185/bZcATu78JTkFLPREgVdqMS86ZoL.jpg" }, { "id": 1636813, "name": "Ashley Thomas", "character": "Henry Emory", "profile_path": "https://image.tmdb.org/t/p/w185/rdNgke4IL7x3mORHKE8HtbOAF8F.jpg" }, { "id": 17486, "name": "Alison Pill", "character": "Betty Wendell", "profile_path": "https://image.tmdb.org/t/p/w185/ebcCkhqFtHvHx5dkBfVmlAknDxC.jpg" }, { "id": 1915962, "name": "Shahadi Wright Joseph", "character": "Ruby Emory", "profile_path": "https://image.tmdb.org/t/p/w185/czIRGtcbXty1oZp7GtRi2oMgHkC.jpg" }, { "id": 2331360, "name": "Melody Hurd", "character": "Gracie Emory", "profile_path": "https://image.tmdb.org/t/p/w185/6LTywFzIw8yZPfljizuf6JfDSuj.jpg" }, { "id": 133212, "name": "Ryan Kwanten", "character": "George Bell", "profile_path": "https://image.tmdb.org/t/p/w185/vvbEabUWIeaHMBA2wrUChiLTjch.jpg" }];
  public person: any;
  public person_profile: any;
  public person_ids: any;
  constructor(private displayService: DisplayService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getCardArray();
  }

  open(person_id: number, person_img: string, content: any) {
    this.getPerson(person_id);
    this.getPersonExternalId(person_id);
    this.person_profile = person_img;
    this.modalService.open(content);

  }

  getCardArray() {
    this.displayService.getCast(this.media_id, this.media_type).subscribe((res: any) => {
      this.cast_formatted = res;
    })
  }

  getPerson(person_id: number) {
    this.displayService.getPersonDetails(person_id).subscribe((res: any) => {
      this.person = res;
    })
  }

  getPersonExternalId(person_id: number) {
    this.displayService.getPersonExternalIds(person_id).subscribe((res: any) => {
      this.person_ids = res;
      console.log("external id", this.person_ids);
    })
  }

}

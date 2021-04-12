import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CarouselService } from 'src/app/services/carousel.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isMobile:boolean=false;
  public isMenuCollapsed = true;

  constructor(private carouselService: CarouselService) {
    this.isMobile = this.carouselService.isMobile();
  }

  ngOnInit(): void {
  }

  
}

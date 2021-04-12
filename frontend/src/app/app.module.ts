import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module'
import {YouTubePlayerModule} from '@angular/youtube-player';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { DisplayComponent } from './components/display/display.component';
import { MylistComponent } from './components/mylist/mylist.component';
import { HomeComponent } from './components/home/home.component';
import { NgbModule, NgbTypeaheadModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from './components/carousel/carousel.component';
import { FormsModule } from '@angular/forms';
import { SearchComponent } from './components/search/search.component';
import { Routes, RouterModule } from '@angular/router';
import { YoutubePlayerComponent } from './components/youtube-player/youtube-player.component';
import { DetailsComponent } from './components/details/details.component';
import { ShareComponent } from './components/share/share.component';
import { CastComponent } from './components/cast/cast.component';
import { ReviewComponent } from './components/review/review.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';
import { FooterComponent } from './components/footer/footer.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DisplayComponent,
    MylistComponent,
    HomeComponent,
    CarouselComponent,
    SearchComponent,
    YoutubePlayerComponent,
    DetailsComponent,
    ShareComponent,
    CastComponent,
    ReviewComponent,
    WatchListComponent,
    FooterComponent
  ], 
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    YouTubePlayerModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

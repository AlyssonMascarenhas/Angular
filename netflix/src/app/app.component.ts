import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Movies } from './models/movies';
import { MoviesService } from './services/movies.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  sticky = false;
  subscriptions$: Subscription[] = [];

  trending!: Movies;
  popular!: Movies;
  topRated!: Movies;
  originals!: Movies;
  nowPlaying!: Movies;

  sliderConfig = {
    slidesToShow: 9,
    slidesToScroll: 2,
    arrows: true,
    autoplay: false,
  };

  @ViewChild('StickerHeader') header!: ElementRef;
  headerBGUrl!: string;

  constructor(private moviesService: MoviesService) {}

  ngAfterViewInit() {}

  ngOnInit(): void {
    this.subscriptions$.push(
      this.moviesService.getTrending().subscribe((data) => {
        this.trending = data;
        this.headerBGUrl =
          'https://image.tmdb.org/t/p/original' +
          this.trending.results[0].backdrop_path;
      })
    );
    this.subscriptions$.push(
      this.moviesService
        .getPopularMovies()
        .subscribe((data) => (this.popular = data))
    );
    this.subscriptions$.push(
      this.moviesService
        .getTopRated()
        .subscribe((data) => (this.topRated = data))
    );
    this.subscriptions$.push(
      this.moviesService
        .getOriginals()
        .subscribe((data) => (this.originals = data))
    );
    this.subscriptions$.push(
      this.moviesService
        .getNowPlaying()
        .subscribe((data) => (this.nowPlaying = data))
    );
  }

  ngOnDestroy() {
    this.subscriptions$.map((subscriptions) => subscriptions.unsubscribe());
  }

  @HostListener('window:scroll', ['$event'])
  handleScroll() {
    const windowScroll = window.pageYOffset;
    if (windowScroll >= this.header.nativeElement.offsetHeight) {
      this.sticky = true;
    } else {
      this.sticky = false;
    }
  }
}

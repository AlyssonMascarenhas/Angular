import { Component, Input, OnInit } from '@angular/core';
import { Movies } from 'src/app/models/movies';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.less'],
})
export class SliderComponent implements OnInit {
  @Input() sliderConfig!: any;
  @Input() movies!: Movies;
  @Input() titleSection!: string;

  constructor() {}

  ngOnInit(): void {}
}

import {Location} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {TitleService} from '../title.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor (private titleService: TitleService, private locationService: Location) {}

  ngOnInit(): void {
    this.titleService.resetTitle();
  }

  back() {
    this.locationService.back();
  }


}

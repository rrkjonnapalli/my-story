import {Injectable} from '@angular/core';
import {Title} from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor (private ttlService: Title) {}

  setTitle(title: string) {
    return this.ttlService.setTitle(title);
  }

  resetTitle() {
    return this.ttlService.setTitle('My Story');
  }
}

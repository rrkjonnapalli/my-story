import {Component, OnInit} from '@angular/core';
import {Profile} from '../profile';
import {load} from 'js-yaml';
import {ActivatedRoute} from '@angular/router';
import {TitleService} from '../title.service';


/**
 * https://javascript.info/xmlhttprequest
 */


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  profile?: Profile;
  showLoader = true;
  invalidProfileMessage = 'Unable to load profile.';
  username = 'rrkjonnapalli';

  constructor (private titleService: TitleService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username') || this.username;
    this.init().then(() => {
      this.showLoader = false;
      console.log('Initialization successful');
      if (this.profile) {
        this.titleService.setTitle(this.profile.title);
      }
    }).catch(() => {
      this.showLoader = false;
      console.log('Initialization failed');
    });
  }

  async init() {
    try {
      this.profile = await this.fetchProfile();
    } catch (error) {
      console.log(error);
    }
    if (!this.profile) {
      return;
    }
  }

  isDataLoaded() {
    return this.showLoader;
  }


  fetchLocalProfile(): any {
    console.log('Unable to load github profile');
    if (this.username !== 'rrkjonnapalli') {
      return Promise.resolve(undefined);
    }
    return Promise.resolve({
      title: 'R Ravikiran Jonnapalli',
      headline: 'Associate consultant @ Rythmos',
      about: '',
      mobile: '+919494124972',
      email: 'r.ravikiranjonnapallli@gmail.com',
      dp: '/assets/rrkjonnapalli.png',
      summary: [
        'A Node.js and Mongo db professional with around 3 years of experience in the MEAN stack development.',
        'Good at understanding of the product and architecture, quick analysis and debugging skills.',
        'Developed end to end APIs for multiple projects'
      ],
      timeline: [
        {
          name: 'Rythmos',
          from: 'Apr 2019',
          to: 'present',
          position: 'Associate consultant',
          website: 'www.rythmos.com',
          headline: 'Reactor CX is the product',
          about: `RCX is a real-time, cloud-based application used to execute pricing strategies and
          loyalty programs to encourage customers. It is developed to be distributed in SaaS
          model.`,
          responsibilities: [
            'Development of critical product APIs.',
            'Writing test cases for critical parts the product.',
            'Analyzing the finding the root causes for the production issues, and solving them.',
            'Analyzing and optimizing the APIs for reduce the times',
            'Developing cron jobs for handling multiple kinds of data migrations from clients',
            'Developing bash and mongo shell scripts for migrations',
            'Developing event based processors to handle data consistency.'
          ]
        },
        {
          name: 'Way2Online',
          from: 'May 2017',
          to: 'Feb 2019',
          position: 'Product Engineer',
          about: `Way2online is leading the martech industry in India by providing world class data-
          driven marketing solutions at scale with disruptive marketing technology.`,
          responsibilities: [
            `Development of data point processing to profile user for targeting (core python)`,
            `Development Way2push, a push notification campaigning system (Node JS, Angular,
            Mongodb)`,
            `Development of APIs for adwords and facebook ad campaigns for internal campaign
            management (Node JS, Mongodb)`
          ]
        }
      ],
      projects: [
        {
          name: 'Ajv Error Parser',
          url: 'https://www.npmjs.com/package/ajv-error-parser',
          about: 'An error message parser for ajv schema validator errors'
        }
      ]
    });
  }

  fetchProfileFromGithub(): any {
    let xhr = new XMLHttpRequest();
    const url = `https://raw.githubusercontent.com/${this.username}/${this.username}/main/${this.username}.yml`;
    xhr.open('GET', url);
    return new Promise((resolve, reject) => {
      try {
        xhr.send();
        xhr.onloadend = () => {
          if (xhr.status === 200) {
            const profile = load(xhr.response);
            return resolve(profile);
          } else {
            console.log('unknown');
            return resolve(undefined);
          }
        };
        xhr.onerror = () => {
          console.log(xhr.response);
          return reject(xhr.response);
        }
      } catch (error) {
        console.log('rejecting');
        console.log(error);
        return reject(error);
      }
    });
  }
  fetchProfile() {
    return this.fetchProfileFromGithub()
      .then((profile: any) => {
        if (!profile) {
          return this.fetchLocalProfile();
        }
        return profile;
      }).catch((error: any) => {
        return this.fetchLocalProfile();
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { XApiService } from './service/x-api.service';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  isAuth = new BehaviorSubject<boolean>(false);
  auth$ = this.isAuth.asObservable();

  username: string;
  password: string;
  authHash: string;
  events: any;

  constructor(
    private xas: XApiService
  ) {}

  ngOnInit() {
    this.events = [];
    this.auth$.subscribe(val => {
      if (val === true) {
        // TODO: handle API errors
        this.subscription = this.xas.getAllEvents(this.authHash).subscribe(
          response => {
            for (const record of response) {
              // tslint:disable-next-line:no-string-literal
              if (record.object['objectType'] === 'Activity') {
                let actor = this.filterActor(record.actor);
                const verb = this.filterVerb(record.verb);
                const object = this.filterObject(record.object);
                if (actor === '') {
                  actor = this.getDefaultId(record);
                }
                this.events.push({
                  actor,
                  verb,
                  object
                });
              }
            }
          }
        );
      }
    });
  }

  // Unsubscribe: Memory leaks = BAD!
  ngOnDestry() {
    this.subscription.unsubscribe();
  }

  // Filter Actor information, getting name,
  // and then email if no name is provided
  filterActor(act) {
    let filteredAction = '';
    if ('name' in act) {
      filteredAction = act.name;
    } else if ('mbox' in act) {
      filteredAction = act.mbox;
    }
    return filteredAction;
  }

  // Filter Verb information, getting
  // English value first, then an arbitrary
  // language if no english is available.
  // TODO: Clean up the if statements:
  // it should search if the key contains en
  filterVerb(verb) {
    let filteredVerb = '';
    if ('display' in verb) {
      if ('en-US' in verb.display) {
        filteredVerb = verb.display['en-US'];
      } else if ('en' in verb.display) {
        filteredVerb = verb.display.en;
      } else {
        const arbitraryKey = Object.keys(verb.display)[0];
        filteredVerb = verb.display[arbitraryKey];
      }
    }
    return filteredVerb;
  }

  // Filter Object information, getting
  // English value first, then an arbitrary
  // language if no english is available.
  // TODO: Clean up the if statements:
  // it should search if the key contains en
  filterObject(obj) {
    let filteredObject = '';
    if ('definition' in obj) {
      if ('name' in obj.definition) {
        if ('en-US' in obj.definition.name) {
          filteredObject = obj.definition.name['en-US'];
        } else if ('en' in obj.definition.name) {
          filteredObject = obj.definition.name.en;
        } else {
          const arbitraryKey = Object.keys(obj.definition.name)[0];
          filteredObject = obj.definition.name[arbitraryKey];
        }
      }
    } else {
      filteredObject = obj.id;
    }
    return filteredObject;
  }

  // If no name or email is available, get the id first from
  // verb.id, then from object.id
  getDefaultId(val) {
    let defaultId = '';
    if ('id' in val.verb) {
      defaultId = val.verb.id;
    } else if ('id' in val.object) {
      defaultId = val.object.id;
    }
    return defaultId;
  }

  // Get the next 25 values from API
  getMore() {
    this.subscription = this.xas.getAllEvents(this.authHash).subscribe(
      response => {
        for (const record of response) {
          // tslint:disable-next-line:no-string-literal
          if (record.object['objectType'] === 'Activity') {
            let actor = this.filterActor(record.actor);
            const verb = this.filterVerb(record.verb);
            const object = this.filterObject(record.object);
            if (actor === '') {
              actor = this.getDefaultId(record);
            }
            this.events.push({
              actor,
              verb,
              object
            });
          }
        }
      }
    );
  }

  /**
   * Login portion of code here
   */
  onSubmit() {
    if (this.username !== undefined && this.password !== undefined) {
      this.authHash = 'Basic ' + window.btoa(this.username + ':' + this.password);
      this.isAuth.next(true);
    }
  }
}

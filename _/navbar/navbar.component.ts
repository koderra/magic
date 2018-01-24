import {Component, HostListener, OnInit} from '@angular/core';
import {Router, NavigationStart, NavigationEnd, ActivatedRoute} from '@angular/router';
import {MgNavComponent} from './nav.component';
import {EventService, Signal} from '../../common-ui/services/event.service';
import {SharedDataService} from '../../common-ui/services/shared-data.service';

@Component({
  selector: 'mg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class MgNavBarComponent implements OnInit, Signal {

  public transparent: boolean;
  public home: boolean;

  private navs: Array<MgNavComponent> = [];
  private _zone;
  private _active;
  private user;

  constructor(private router: Router,
              private shared: SharedDataService,
              private events: EventService) {

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const url = event.url.substring(1);
        const cnf = this.router.config;

        for (const c of cnf) {
          if (c.path === url && c.data && c.data.zone) {
            this._zone = c.data.zone;
            console.log('ZONE: ' + JSON.stringify(c.data.zone));
          }
        }

        this.refreshNavs();
        window.scrollTo(0, 0);
      }
    });

    this.user = this.shared.get('logged_in_user_info');
    this.events.subscribe(['data_changed_logged_in_user_info', 'refresh_listings'], this);
  }

  get active() {
    return this._active;
  }

  register(nav: MgNavComponent) {
    this.navs.push(nav);
    this.refreshNavs();
  }

  activate(nav: MgNavComponent) {
    this._active = nav;
    this.refreshNavs();
  }

  ngOnInit(): void {
    this.refreshNavs();
  }

  signal(event: string, data: any) {
    switch (event) {
      case 'data_changed_logged_in_user_info':
        this.user = data;
        this.refreshNavs();
        break;
    }
  }


  /// private

  private refreshNavs() {
    for (const nav of this.navs) {
      nav.refresh(this._active, this._zone, this.user ? this.user.permissions || [] : []);
    }
  }
}

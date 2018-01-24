import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarNavComponent } from './navbar-nav.component';

describe('NavBarNavComponent', () => {
  let component: NavBarNavComponent;
  let fixture: ComponentFixture<NavBarNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

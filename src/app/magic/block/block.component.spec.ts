import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MgInputComponent } from './input.component';

describe('NavBarNavComponent', () => {
  let component: MgInputComponent;
  let fixture: ComponentFixture<MgInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MgInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MgInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmCartazComponent } from './em-cartaz.component';

describe('EmCartazComponent', () => {
  let component: EmCartazComponent;
  let fixture: ComponentFixture<EmCartazComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmCartazComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmCartazComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

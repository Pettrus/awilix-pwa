import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelarInscricaoComponent } from './cancelar-inscricao.component';

describe('CancelarInscricaoComponent', () => {
  let component: CancelarInscricaoComponent;
  let fixture: ComponentFixture<CancelarInscricaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CancelarInscricaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CancelarInscricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

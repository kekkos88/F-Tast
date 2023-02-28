import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaVisitaPazienteComponent } from './visualizza-visita-paziente.component';

describe('VisualizzaVisitaPazienteComponent', () => {
  let component: VisualizzaVisitaPazienteComponent;
  let fixture: ComponentFixture<VisualizzaVisitaPazienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizzaVisitaPazienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizzaVisitaPazienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

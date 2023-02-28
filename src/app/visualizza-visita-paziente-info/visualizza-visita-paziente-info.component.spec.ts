import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizzaVisitaPazienteInfoComponent } from './visualizza-visita-paziente-info.component';

describe('VisualizzaVisitaPazienteInfoComponent', () => {
  let component: VisualizzaVisitaPazienteInfoComponent;
  let fixture: ComponentFixture<VisualizzaVisitaPazienteInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizzaVisitaPazienteInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizzaVisitaPazienteInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistraPazienteComponent } from './registra-paziente.component';

describe('RegistraPazienteComponent', () => {
  let component: RegistraPazienteComponent;
  let fixture: ComponentFixture<RegistraPazienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistraPazienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistraPazienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

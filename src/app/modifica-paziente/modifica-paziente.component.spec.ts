import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificaPazienteComponent } from './modifica-paziente.component';

describe('ModificaPazienteComponent', () => {
  let component: ModificaPazienteComponent;
  let fixture: ComponentFixture<ModificaPazienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificaPazienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificaPazienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

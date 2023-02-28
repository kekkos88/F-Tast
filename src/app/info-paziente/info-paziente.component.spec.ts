import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPazienteComponent } from './info-paziente.component';

describe('InfoPazienteComponent', () => {
  let component: InfoPazienteComponent;
  let fixture: ComponentFixture<InfoPazienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPazienteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPazienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

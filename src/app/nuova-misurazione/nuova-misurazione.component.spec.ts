import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovaMisurazioneComponent } from './nuova-misurazione.component';

describe('NuovaMisurazioneComponent', () => {
  let component: NuovaMisurazioneComponent;
  let fixture: ComponentFixture<NuovaMisurazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuovaMisurazioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovaMisurazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

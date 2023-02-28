import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PianoGiornalieroComponent } from './piano-giornaliero.component';

describe('PianoGiornalieroComponent', () => {
  let component: PianoGiornalieroComponent;
  let fixture: ComponentFixture<PianoGiornalieroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PianoGiornalieroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PianoGiornalieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastoComponent } from './pasto.component';

describe('PastoComponent', () => {
  let component: PastoComponent;
  let fixture: ComponentFixture<PastoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PastoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PastoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

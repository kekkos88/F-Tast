import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScegliDietaComponent } from './scegli-dieta.component';

describe('ScegliDietaComponent', () => {
  let component: ScegliDietaComponent;
  let fixture: ComponentFixture<ScegliDietaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScegliDietaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScegliDietaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

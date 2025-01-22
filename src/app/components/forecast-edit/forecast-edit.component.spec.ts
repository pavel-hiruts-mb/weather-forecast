import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastEditComponent } from './forecast-edit.component';

describe('ForecastEditComponent', () => {
  let component: ForecastEditComponent;
  let fixture: ComponentFixture<ForecastEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForecastEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForecastEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

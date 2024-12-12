import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlcoholComponent } from './alcohol.component';

describe('AlcoholComponent', () => {
  let component: AlcoholComponent;
  let fixture: ComponentFixture<AlcoholComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlcoholComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlcoholComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnTopComponent } from './btn-top.component';

describe('BtnTopComponent', () => {
  let component: BtnTopComponent;
  let fixture: ComponentFixture<BtnTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BtnTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

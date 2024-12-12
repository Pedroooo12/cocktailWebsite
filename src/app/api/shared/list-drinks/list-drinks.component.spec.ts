import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDrinksComponent } from './list-drinks.component';

describe('ListDrinksComponent', () => {
  let component: ListDrinksComponent;
  let fixture: ComponentFixture<ListDrinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListDrinksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDrinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

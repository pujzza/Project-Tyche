import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockReturnRecordsComponent } from './stock-return-records.component';

describe('StockReturnRecordsComponent', () => {
  let component: StockReturnRecordsComponent;
  let fixture: ComponentFixture<StockReturnRecordsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StockReturnRecordsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StockReturnRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

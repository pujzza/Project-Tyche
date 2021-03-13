import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSalesInvoiceComponent } from './new-sales-invoice.component';

describe('NewSalesInvoiceComponent', () => {
  let component: NewSalesInvoiceComponent;
  let fixture: ComponentFixture<NewSalesInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSalesInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSalesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

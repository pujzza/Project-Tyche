import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSalesInvoiceComponent } from './manage-sales-invoice.component';

describe('ManageSalesInvoiceComponent', () => {
  let component: ManageSalesInvoiceComponent;
  let fixture: ComponentFixture<ManageSalesInvoiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSalesInvoiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSalesInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

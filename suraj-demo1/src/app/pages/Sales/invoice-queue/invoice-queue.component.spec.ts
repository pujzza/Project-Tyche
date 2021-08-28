import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceQueueComponent } from './invoice-queue.component';

describe('InvoiceQueueComponent', () => {
  let component: InvoiceQueueComponent;
  let fixture: ComponentFixture<InvoiceQueueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvoiceQueueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvoiceQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

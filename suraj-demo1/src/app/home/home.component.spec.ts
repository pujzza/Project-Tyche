import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonService } from '../services/common.service';
import { FormsModule } from '@angular/forms';

import { HomeComponent } from './home.component';
import { Router } from '@angular/router';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service: Partial<CommonService>;
  const routerSpy = jasmine.createSpyObj('Router', ['url', 'navigateByUrl']);
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        MatSnackBarModule,
        FormsModule,
      ],
      providers: [
        { provide: CommonService, useValue: service },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('logout should be called', () => {
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    app.isprofclicked = true;
    let spyobj = spyOn(app,'logout');
    app.logout();
    fixture.detectChanges();
    expect(spyobj).toHaveBeenCalled();
  });

  it('when logout called, route should change', () => {
    const fixture = TestBed.createComponent(HomeComponent);

    const app = fixture.componentInstance;
    app.isprofclicked = true;
    app.logout();
    fixture.detectChanges();
    expect(routerSpy.navigateByUrl).toHaveBeenCalled();
  });
});

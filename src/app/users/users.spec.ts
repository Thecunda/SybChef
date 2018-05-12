import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from '../services/user.service';
import { AlerteService } from "../services/alerte.service";
import { TestBed, async } from '@angular/core/testing';

import { UserComponent } from './users';

describe('UserComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        UserComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        //NgbModule.forRoot()
      ],
      providers: [
        UserService
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app'`, async(() => {
    const fixture = TestBed.createComponent(UserComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app');
  }));

  it('should render a form control of user title', async(() => {
    const fixture = TestBed.createComponent(UserComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('input[name="title"]')).toBeTruthy();
  }));
});

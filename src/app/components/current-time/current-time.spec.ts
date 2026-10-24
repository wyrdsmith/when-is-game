import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentTimeComponent } from './current-time';

describe('CurrentTimeComponent', () => {
  let component: CurrentTimeComponent;
  let fixture: ComponentFixture<CurrentTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentTimeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentTimeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CurrentTimeListComponent } from './current-time-list';

describe('CurrentTimeListComponent', () => {
  let component: CurrentTimeListComponent;
  let fixture: ComponentFixture<CurrentTimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentTimeListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentTimeListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameTimeListComponent } from './game-time-list';

describe('GameTimeListComponent', () => {
  let component: GameTimeListComponent;
  let fixture: ComponentFixture<GameTimeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTimeListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameTimeListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

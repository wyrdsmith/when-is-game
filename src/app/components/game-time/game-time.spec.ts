import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameTimeComponent } from './game-time';

describe('GameTimeComponent', () => {
  let component: GameTimeComponent;
  let fixture: ComponentFixture<GameTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameTimeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GameTimeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

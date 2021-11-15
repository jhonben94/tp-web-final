import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PuntosEditComponent } from './puntos-edit.component';

describe('PuntosEditComponent', () => {
  let component: PuntosEditComponent;
  let fixture: ComponentFixture<PuntosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PuntosEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PuntosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

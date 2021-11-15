import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPuntosComponent } from './asignar-puntos.component';

describe('AsignarPuntosComponent', () => {
  let component: AsignarPuntosComponent;
  let fixture: ComponentFixture<AsignarPuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarPuntosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

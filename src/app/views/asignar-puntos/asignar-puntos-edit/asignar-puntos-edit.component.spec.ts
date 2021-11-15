import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarPuntosEditComponent } from './asignar-puntos-edit.component';

describe('AsignarPuntosEditComponent', () => {
  let component: AsignarPuntosEditComponent;
  let fixture: ComponentFixture<AsignarPuntosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarPuntosEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarPuntosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

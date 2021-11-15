import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VencimientoPuntosEditComponent } from './vencimiento-puntos-edit.component';

describe('VencimientoPuntosEditComponent', () => {
  let component: VencimientoPuntosEditComponent;
  let fixture: ComponentFixture<VencimientoPuntosEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VencimientoPuntosEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VencimientoPuntosEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

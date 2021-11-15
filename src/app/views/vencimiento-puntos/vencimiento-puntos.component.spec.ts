import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VencimientoPuntosComponent } from './vencimiento-puntos.component';

describe('VencimientoPuntosComponent', () => {
  let component: VencimientoPuntosComponent;
  let fixture: ComponentFixture<VencimientoPuntosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VencimientoPuntosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VencimientoPuntosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

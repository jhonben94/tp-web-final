import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasEditComponent } from './ventas-edit.component';

describe('VentasEditComponent', () => {
  let component: VentasEditComponent;
  let fixture: ComponentFixture<VentasEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentasEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VentasEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

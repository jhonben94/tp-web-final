import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscadorProductoComponent } from './buscador-producto.component';

describe('BuscadorProductoComponent', () => {
  let component: BuscadorProductoComponent;
  let fixture: ComponentFixture<BuscadorProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscadorProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscadorProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteExtendidoComponent } from './reporte-extendido.component';

describe('ReporteExtendidoComponent', () => {
  let component: ReporteExtendidoComponent;
  let fixture: ComponentFixture<ReporteExtendidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteExtendidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteExtendidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

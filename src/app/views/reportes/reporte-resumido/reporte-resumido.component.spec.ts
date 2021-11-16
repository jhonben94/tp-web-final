import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteResumidoComponent } from './reporte-resumido.component';

describe('ReporteResumidoComponent', () => {
  let component: ReporteResumidoComponent;
  let fixture: ComponentFixture<ReporteResumidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteResumidoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteResumidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

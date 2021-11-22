import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ReportesService, VentasService } from 'src/app/services';

@Component({
  selector: 'app-reporte-extendido',
  templateUrl: './reporte-extendido.component.html',
  styleUrls: ['./reporte-extendido.component.css']
})
export class ReporteExtendidoComponent implements OnInit {

  /**
   * @type {boolean}
   * @description Flag que maneja el Expansion Panel de filtros
   */
  expanded = true;

  sub: any;

  idVenta: string;

  venta: any;
  
  constructor(
    private router: ActivatedRoute,
    private service: VentasService,
    private reportesService: ReportesService) {
      
  }
  
  ngOnInit(): void {
    this.sub = this.router.params.subscribe(params => {
      console.log(params['idVenta']);
      this.idVenta = params['idVenta'];
      this.getVenta();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getVenta() {
    this.service.obtenerRecurso(this.idVenta).subscribe( venta => {
      this.venta = venta;
      console.log(this.venta);
    })
  }

  downloadExcel() {
    this.reportesService.exportExcel(this.venta.detalle, this.venta.idVenta);
  }

  downloadPdf() {
    let columnas = [
      {
        matDef: "idProducto",
        label: "idProducto",
        descripcion: "ID Producto",
      },
      {
        matDef: "nombreProducto",
        label: "nombreProducto",
        descripcion: "Nombre Producto",
      },
      {
        matDef: "cantidad",
        label: "cantidad",
        descripcion: "Cantidad",
      },
      {
        matDef: "precio",
        label: "precio",
        descripcion: "Precio",
      },
      {
        matDef: "subtotal",
        label: "subtotal",
        descripcion: "Subtotal",
      },
    ]
    this.reportesService.exportPdf(this.venta.detalle, columnas);
  }
}

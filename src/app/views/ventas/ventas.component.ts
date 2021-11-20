import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { merge, of } from "rxjs";
import {
  CANTIDAD_PAG_DEFAULT,
  CANTIDAD_PAG_LIST,
  deleteEmptyData,
  formatearFecha,
} from "../../utils";
import { startWith, switchMap, catchError, map } from "rxjs/operators";
import {
  BolsasService,
  ClientesService,
  VencimientoPuntosService,
  VentasService,
} from "src/app/services";
import { MatDialog } from "@angular/material/dialog";
import swal from "sweetalert2";
import { Router } from "@angular/router";
import { BuscadorClienteComponent } from "../buscadores/buscador-cliente/buscador-cliente.component";
@Component({
  selector: "app-ventas",
  templateUrl: "./ventas.component.html",
  styleUrls: ["./ventas.component.css"],
})
export class VentasComponent implements OnInit {
  selectedRow: any;

  /**
   * @type {boolean}
   * @description Flag que maneja el Expansion Panel de filtros
   */
  expanded = true;

  /**
   * @type {object}
   * @description Form para capturar los datos a ser utilizado como filtros para la grilla
   */
  filtrosForm = this.fb.group({
    descripcion: [""],
  });

  /**
   * @type {number}
   * @description Cantidad total de registros obtenidos para la grilla.
   */
  resultsLength = 0;

  /**
   * @type {boolean}
   * @description Flag utilizado para confirmar verificar el estado de la peticion de la grilla
   */
  isLoadingResults = true;

  /**
   * @type {boolean}
   */
  isRateLimitReached = false;

  /**
   * @type {Array}
   * @description Definicion de las columnas a ser visualizadas
   */
  displayedColumns: string[] = [
    "idVenta",
    "idCliente",
    "fecha",
    "nroFactura",
    "total",
    "accion",
  ];

  opcionPagina = CANTIDAD_PAG_LIST;
  /**
   * @type {Array}
   * @description Definicion dinamica de las columnas a ser visualizadas
   */
  listaColumnas: any = [
    {
      matDef: "idCliente",
      label: "idCliente",
      descripcion: "CLIENTE",
      cliente: true,
    },
    {
      matDef: "idVenta",
      label: "idVenta",
      descripcion: "ID",
    },
    {
      matDef: "fecha",
      label: "fecha",
      descripcion: "FECHA",
      fecha: true,
    },
    {
      matDef: "nroFactura",
      label: "nroFactura",
      descripcion: "NRO FACTURA",
      factura: true,
    },
    {
      matDef: "total",
      label: "total",
      descripcion: "TOTAL",
    },
  ];
  /**
   * @type {Array}
   * @description Lista que contiene los valores para la grilla
   */
  data: any[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private fb: FormBuilder,
    private service: VentasService,
    public dialog: MatDialog,
    private router: Router,
    private clieService: ClientesService
  ) {
    this.filtrosForm = this.fb.group({
      fechaAsignacion: [""],
      fechaCaducidad: [""],
      puntajeUtilizado: [""],
      saldoPuntos: [""],
      montoOperacion: [""],
      idCliente: [""],
      nombreCliente: [""],
    });
  }

  ngOnInit(): void {
    this.paginator.pageSize = CANTIDAD_PAG_DEFAULT;
  }

  ngAfterViewInit() {
    // Si se cambia el orden, se vuelve a la primera pag.
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
    this.buscar();
  }

  get f() {
    return this.filtrosForm.controls;
  }

  buscar() {
    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          const params = {
            cantidad: this.paginator.pageSize,
            inicio: this.retornaInicio(),
            orderBy: this.sort.active,
            orderDir: this.sort.direction,
            like: "S",
            ejemplo: this.filtrosForm.value,
          };
          return this.service.listarRecurso(params);
        }),
        map((data: any) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.totalDatos;
          return data.lista;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return of([]);
        })
      )
      .subscribe((data) => (this.data = data));
  }

  agregar(): void {
    this.router.navigate(["ventas/agregar"]);
  }

  acciones(data, e) {
    const id = "idVencimientoPunto";
    const actionType = e.target.getAttribute("data-action-type");
    switch (actionType) {
      case "activar":
        break;
      case "eliminar":
        swal
          .fire({
            title: "Está seguro que desea eliminar el registro?",
            text: "Esta acción no se podrá revertir!",
            icon: "warning",
            showCancelButton: true,
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger",
            },
            confirmButtonText: "Eliminar",
            buttonsStyling: false,
          })
          .then((result) => {
            if (result.value) {
              this.service.eliminarRecurso(data[id]).subscribe((res) => {
                swal
                  .fire({
                    title: "Éxito!",
                    text: "El registro fue eliminado correctamente.",
                    icon: "success",
                    customClass: {
                      confirmButton: "btn btn-success",
                    },
                    buttonsStyling: false,
                  })
                  .then(() => {
                    this.limpiar();
                  });
              });
            }
          });
        break;
      case "editar":
        this.router.navigate(["vencimiento-puntos/modificar", data[id]]);
        break;
      default:
        break;
    }
  }
  mostrarCampo(row, columna) {
    if (columna.relacion) {
      if (row[columna.label] == null) return "";
      if (Array.isArray(columna.columnaRelacion)) {
        return this.multipleColumnas(
          row[columna.label],
          columna.columnaRelacion
        );
      }
      return row[columna.label][columna.columnaRelacion];
    } else {
      if (typeof columna.estados != "undefined") {
        const label = row[columna.label]
          ? columna.estados[0]
          : columna.estados[1];
        return label;
      }
      if (columna.fecha) {
        return formatearFecha(new Date(row.fecha));
      }
      if (columna.factura) {
        return row.prefijoFactura + " " + row.nroFactura;
      }
      if (columna.cliente) {
        let lista = JSON.parse(localStorage.getItem("lista-clientes"));
        const cliente = lista.find((item) => item.idCliente == row.idCliente);
        return cliente.nombre + "  " + cliente.apellido;
      }

      return row[columna.label];
    }
  }

  multipleColumnas(valor: any, listaCol: any[]) {
    let valorRetorno = "";
    for (let index = 0; index < listaCol.length; index++) {
      const property = listaCol[index];
      valorRetorno += valor[property] + " ";
    }
    return valorRetorno;
  }
  limpiar() {
    this.filtrosForm.reset();
    this.buscar();
  }
  retornaInicio() {
    const cantidad = this.paginator.pageSize;
    let inicio: any = this.paginator.pageIndex;

    if (this.paginator.pageIndex > 0) {
      return (
        cantidad *
        (0 == this.paginator.pageIndex ? 1 : this.paginator.pageIndex)
      );
    }
    return inicio;
  }

  onRowClicked(row) {
    this.selectedRow = row;
  }

  buscadores(buscador) {
    let dialogRef = null;
    switch (buscador) {
      case "cliente":
        dialogRef = this.dialog.open(BuscadorClienteComponent, {
          data: {
            title: "Buscador de Clientes",
          },
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          console.log(result);
          if (result) {
            this.f.nombreCliente.setValue(
              result.nombre + " " + result.apellido
            );
            this.f.idCliente.setValue(result.idCliente);
          } else {
            this.f.nombreEmpleado.setValue(null);
          }
        });
        break;

      default:
        break;
    }
  }
}

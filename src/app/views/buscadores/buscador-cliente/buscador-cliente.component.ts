import { Component, Inject, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { merge, of } from "rxjs";
import {
  CANTIDAD_PAG_DEFAULT,
  CANTIDAD_PAG_LIST,
  deleteEmptyData,
} from "../../../utils";
import { startWith, switchMap, catchError, map } from "rxjs/operators";
import { ClientesService } from "src/app/services";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import swal from "sweetalert2";
import { Router } from "@angular/router";
@Component({
  selector: "app-buscador-cliente",
  templateUrl: "./buscador-cliente.component.html",
  styleUrls: ["./buscador-cliente.component.css"],
})
export class BuscadorClienteComponent implements OnInit {
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
    "idCliente",
    "nombre",
    "apellido",
    "email",
    "telefono",
    "idTipoDocumento",
    "documento",
    "fechaNacimiento",
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
    },
    {
      matDef: "nombre",
      label: "nombre",
      descripcion: "NOMBRE",
    },

    {
      matDef: "apellido",
      label: "apellido",
      descripcion: "APELLIDO",
    },
    {
      matDef: "telefono",
      label: "telefono",
      descripcion: "TELÉFONO",
    },

    {
      matDef: "email",
      label: "email",
      descripcion: "CORREO",
    },
    {
      matDef: "telefono",
      label: "telefono",
      descripcion: "TELÉFONO",
    },

    {
      matDef: "idTipoDocumento",
      label: "idTipoDocumento",
      descripcion: "TIPO DOCUMENTO",
      relacion: true,
      columnaRelacion: "descripcion",
    },
    {
      matDef: "documento",
      label: "documento",
      descripcion: "NRO. DOCUMENTO",
    },
    {
      matDef: "fechaNacimiento",
      label: "fechaNacimiento",
      descripcion: "FECHA NAC.",
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
    private service: ClientesService,
    public dialog: MatDialog,
    private router: Router,
    public dialogRef: MatDialogRef<BuscadorClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public dataModal: any
  ) {
    this.filtrosForm = this.fb.group({
      descripcion: [""],
      nombre: [""],
      apellido: [""],
      email: [""],
      telefono: [""],
      documento: [""],
      correo: [""],
      tipoPersona: [""],
      fechaNacimiento: [""],
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
            ejemplo: JSON.stringify(deleteEmptyData(this.filtrosForm.value)),
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

  mostrarCampo(row, columna) {
    if (columna.relacion) {
      if (row[columna.label] == null) return "";
      return row[columna.label][columna.columnaRelacion];
    } else {
      if (typeof columna.estados != "undefined") {
        const label = row[columna.label]
          ? columna.estados[0]
          : columna.estados[1];
        return label;
      }
      return row[columna.label];
    }
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
}

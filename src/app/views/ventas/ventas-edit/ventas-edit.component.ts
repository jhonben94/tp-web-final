import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ClientesService,
  PuntosService,
  TipoDocumentoService,
  VentasService,
} from "src/app/services";
import { OtrosService } from "src/app/services/otros.service";
import { formatearFecha } from "src/app/utils";
import swal from "sweetalert2";
import { BuscadorClienteComponent } from "../../buscadores/buscador-cliente/buscador-cliente.component";
import { BuscadorProductoComponent } from "../../buscadores/buscador-producto/buscador-producto.component";
@Component({
  selector: "app-ventas-edit",
  templateUrl: "./ventas-edit.component.html",
  styleUrls: ["./ventas-edit.component.css"],
})
export class VentasEditComponent implements OnInit {
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
    "idProducto",
    "nombreProducto",
    "cantidad",
    "precio",
    "subtotal",
    "accion",
  ];

  /**
   * @type {Array}
   * @description Definicion dinamica de las columnas a ser visualizadas
   */
  listaColumnas: any = [
    {
      matDef: "idProducto",
      label: "idProducto",
      descripcion: "ID",
    },
    {
      matDef: "nombreProducto",
      label: "nombreProducto",
      descripcion: "NOMBRE",
    },
    {
      matDef: "cantidad",
      label: "cantidad",
      descripcion: "CANTIDAD",
    },
    {
      matDef: "precio",
      label: "precio",
      descripcion: "PRECIO",
    },
    {
      matDef: "subtotal",
      label: "subtotal",
      descripcion: "SUBTOTAL",
    },
  ];
  /**
   * @type {Array}
   * @description Lista que contiene los valores para la grilla
   */
  data: any[] = [];

  form: FormGroup;
  id: any;
  titulo: any;
  formDetalle: FormGroup;
  constructor(
    private fb: FormBuilder,
    private service: VentasService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      nroFactura: ["", Validators.required],
      fecha: [""],
      idCliente: ["", Validators.required],
      nombreCliente: [""],

      idProducto: ["", Validators.required],
      total: [0, Validators.required],
      nombreProducto: [""],
    });

    this.formDetalle = this.fb.group({
      cantidad: ["", Validators.required],
      precio: ["", Validators.required],
      subtotal: ["", Validators.required],
      idProducto: ["", Validators.required],
      nombreProducto: [""],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.titulo = "MODIFICAR CONCEPTO DE PUNTOS";
      //obtener datos de la persona.
      // settear en el formulario.

      this.service.obtenerRecurso(this.id).subscribe((r: any) => {
        this.f.concepto.setValue(r.concepto);
        this.f.rangoInicial.setValue(r.rangoInicial);
        this.f.rangoFinal.setValue(r.rangoFinal);
        this.f.puntosRequeridos.setValue(r.puntosRequeridos);
      });
    } else {
      this.data = [];
      this.titulo = "GENERAR VENTA";
      this.f.fecha.setValue(new Date());
      this.f.nroFactura.setValue(this.service.obtenerNroFactura());
    }
  }

  confirmar() {
    let valorForm = this.form.value;

    if (this.id) {
      this.service.modificarRecurso(valorForm, this.id).subscribe(
        (res) => {
          swal
            .fire({
              title: "Éxito!",
              text: "El registro fue modificado correctamente.",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-success",
              },
              buttonsStyling: false,
            })
            .then(() => {
              this.form.reset();
            });
        },
        (err) => {
          swal.fire({
            title: "Error!",
            text: "Error al modificar el registro.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-info",
            },
            buttonsStyling: false,
          });
        }
      );
    } else {
      this.service.agregarRecurso(valorForm).subscribe(
        (res) => {
          swal
            .fire({
              title: "Éxito!",
              text: "El registro fue creado correctamente.",
              icon: "success",
              customClass: {
                confirmButton: "btn btn-success",
              },
              buttonsStyling: false,
            })
            .then(() => {
              this.form.reset();
            });
        },
        (err) => {
          swal.fire({
            title: "Error!",
            text: "Error al guardar el registro.",
            icon: "error",
            customClass: {
              confirmButton: "btn btn-info",
            },
            buttonsStyling: false,
          });
        }
      );
    }
  }

  cancelar() {
    this.router.navigate(["/ventas"]);
  }

  get f() {
    return this.form.controls;
  }
  get fd() {
    return this.formDetalle.controls;
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
      case "producto":
        dialogRef = this.dialog.open(BuscadorProductoComponent, {
          data: {
            title: "Buscador de Clientes",
          },
        });

        dialogRef.afterClosed().subscribe((result: any) => {
          if (result) {
            this.fd.nombreProducto.setValue(result.nombre);
            this.fd.idProducto.setValue(result.idProducto);
            this.fd.precio.setValue(result.precioVenta);
          } else {
            this.f.nombreEmpleado.setValue(null);
          }
        });
        break;

      default:
        break;
    }
  }

  changeAmountDetail(newValue) {
    console.log("onchage");

    const cant = newValue;
    const precio = this.fd.precio.value ? this.fd.precio.value : 0;
    this.fd.subtotal.setValue(cant * precio);
  }
  acciones(data, e) {
    const id = "idProducto";
    const actionType = e.target.getAttribute("data-action-type");
    switch (actionType) {
      case "activar":
        break;
      case "eliminar":
        swal
          .fire({
            title: "Está seguro que desea eliminar el detalle?",
            text: "En caso de eliminar el registro deberá volver a cargarlo.",
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
              let lista = this.data.slice(0);
              console.log(
                lista.filter((item) => item.idProducto != this.selectedRow[id])
              );

              this.data = lista.filter(
                (item) => item.idProducto != this.selectedRow[id]
              );
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

  addRow() {
    let lista = this.data.slice(0);
    lista.push(this.formDetalle.value);
    this.data = lista;
    this.formDetalle.reset();
  }
  onRowClicked(row) {
    this.selectedRow = row;
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
      if (columna.fecha) {
        return formatearFecha(new Date(row.fechaNacimiento));
      }
      return row[columna.label];
    }
  }
}

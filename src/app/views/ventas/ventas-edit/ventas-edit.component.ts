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

declare const $: any;
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
  prefijoFactura: any;
  constructor(
    private fb: FormBuilder,
    private service: VentasService,
    private route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.form = this.fb.group({
      nroFactura: ["", Validators.required],
      fecha: ["", Validators.required],
      idCliente: [null, Validators.required],
      nombreCliente: [""],
      total: [0, Validators.required],
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
      console.log(!this.form.valid, this.form.value);
      this.f.nroFactura.disable();
      this.f.fecha.disable();
      this.f.total.disable();
      this.prefijoFactura = this.service.obtenerPrefijo();
    }
  }

  confirmar() {
    this.f.fecha.enable();
    this.f.nroFactura.enable();
    this.f.total.enable();
    let valorForm = this.form.value;

    if (!valorForm.idCliente) {
      this.showNotification("top", "center");
    }
    valorForm.detalle = this.data;
    valorForm.prefijoFactura = this.prefijoFactura;
    console.log(valorForm);

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
              this.data = [];
              this.formDetalle.reset();
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
          if (result) {
            this.f.nombreCliente.setValue(
              result.nombre + " " + result.apellido
            );
            this.f.idCliente.setValue(result.idCliente);
          } else {
            this.f.nombreCliente.setValue(null);
            this.f.idCliente.setValue(null);
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
            this.fd.nombreProducto.setValue(null);
            this.fd.idProducto.setValue(null);
            this.fd.sutotal.setValue(null);
            this.fd.precio.setValue(null);
          }
        });
        break;

      default:
        break;
    }
  }

  changeAmountDetail(newValue) {
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
              this.data = lista.filter(
                (item) => item.idProducto != this.selectedRow[id]
              );
            }
          });
        break;

      default:
        break;
    }
  }

  addRow() {
    const detalle = this.formDetalle.value;
    let lista = this.data.slice(0);
    lista.push(this.formDetalle.value);
    this.data = lista;
    this.formDetalle.reset();
    const total = this.f.total.value;
    const subtotal = detalle.cantidad * detalle.precio;
    this.f.total.setValue(total + subtotal);

    console.log(!this.form.valid);
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

  showNotification(from: any, align: any) {
    $.notify(
      {
        icon: "notifications",
        message: "Por favor, seleccione un cliente para realizar la venta.",
      },
      {
        type: "danger",
        timer: 3000,
        placement: {
          from: from,
          align: align,
        },
        template:
          '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-raised-button type="button" aria-hidden="true" class="close" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          "</div>" +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          "</div>",
      }
    );
  }
}

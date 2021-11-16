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
@Component({
  selector: "app-ventas-edit",
  templateUrl: "./ventas-edit.component.html",
  styleUrls: ["./ventas-edit.component.css"],
})
export class VentasEditComponent implements OnInit {
  form: FormGroup;
  id: any;
  titulo: any;
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
      idCliente: ["", Validators.required],
      nombreCliente: [""],
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

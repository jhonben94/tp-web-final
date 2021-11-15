import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ClientesService,
  PuntosService,
  TipoDocumentoService,
  VencimientoPuntosService,
} from "src/app/services";
import { OtrosService } from "src/app/services/otros.service";
import { fechaDatePicker, formatearFecha } from "src/app/utils";
import swal from "sweetalert2";
@Component({
  selector: "app-vencimiento-puntos-edit",
  templateUrl: "./vencimiento-puntos-edit.component.html",
  styleUrls: ["./vencimiento-puntos-edit.component.css"],
})
export class VencimientoPuntosEditComponent implements OnInit {
  form: FormGroup;
  id: any;
  titulo: any;
  constructor(
    private fb: FormBuilder,
    private service: VencimientoPuntosService,
    private tipoDocumentoService: TipoDocumentoService,
    private nacionalidadService: OtrosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      fechaInicioValidez: ["", Validators.required],
      fechaFinValidez: ["", Validators.required],
      cantDiasDuracion: ["", Validators.required],
    });
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id) {
      this.titulo = "MODIFICAR VENCIMIENTO DE PUNTOS";
      //obtener datos de la persona.
      // settear en el formulario.

      this.service.obtenerRecurso(this.id).subscribe((r: any) => {
        console.log(r);

        this.f.fechaInicioValidez.setValue(
          new Date(fechaDatePicker(r.fechaInicioValidez))
        );
        this.f.fechaFinValidez.setValue(
          new Date(fechaDatePicker(r.fechaFinValidez))
        );
        this.f.cantDiasDuracion.setValue(r.cantDiasDuracion);
      });
    } else {
      this.titulo = "AGREGAR VENCIMIENTO DE PUNTOS";
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
    this.router.navigate(["/vencimiento-puntos"]);
  }

  get f() {
    return this.form.controls;
  }
}

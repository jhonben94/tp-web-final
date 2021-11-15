import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ClientesService,
  PuntosService,
  TipoDocumentoService,
} from "src/app/services";
import { OtrosService } from "src/app/services/otros.service";
import { formatearFecha } from "src/app/utils";
import swal from "sweetalert2";
@Component({
  selector: "app-puntos-edit",
  templateUrl: "./puntos-edit.component.html",
  styleUrls: ["./puntos-edit.component.css"],
})
export class PuntosEditComponent implements OnInit {
  form: FormGroup;
  id: any;
  titulo: any;
  constructor(
    private fb: FormBuilder,
    private service: PuntosService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      concepto: ["", Validators.required],
      puntosRequeridos: ["", Validators.required],
      rangoInicial: [""],
      rangoFinal: [""],
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
      this.titulo = "AGREGAR CONCEPTO DE PUNTOS";
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
    this.router.navigate(["/puntos"]);
  }

  get f() {
    return this.form.controls;
  }
}

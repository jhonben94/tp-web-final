import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class TipoDocumentoService {
  recurosBaseURL: string = environment.URL_BASE + "lista_tipoDocumento.json";

  constructor(private http: HttpClient) {}
  activarRecurso(id) {
    return this.http.put(this.recurosBaseURL + id + "/activar", {});
  }

  agregarRecurso(recurso) {
    return this.http.post(this.recurosBaseURL, recurso);
  }
  modificarRecurso(recurso, id) {
    return this.http.put(this.recurosBaseURL + id, recurso);
  }
  eliminarRecurso(id) {
    return this.http.delete(this.recurosBaseURL + id);
  }
  obtenerRecurso(id) {
    return this.http.get(this.recurosBaseURL + id);
  }
  listarRecurso(ejemplo) {
    return of({
      lista: [
        {
          idTipoDocumento: 1,
          codigo: "CI",
          descripcion: "CÉDULA DE IDENTIDAD",
        },
        {
          idTipoDocumento: 1,
          codigo: "RUC",
          descripcion: "REGISTRO UNICO DEL CONTRIBUYENTE",
        },
      ],
      total: 2,
    });

    // return this.http.get(this.recurosBaseURL, { params: ejemplo });
  }
}

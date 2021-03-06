import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class ProductosService {
  idLocalStorage: string = "lista-productos";
  constructor(private http: HttpClient) {}
  activarRecurso(id) {
    return [];
  }

  agregarRecurso(recurso) {
    var uniq = "id" + new Date().getTime();
    recurso.idProducto = uniq;
    let lista = JSON.parse(localStorage.getItem(this.idLocalStorage));
    if (lista) {
      lista.push(recurso);
      localStorage.setItem(this.idLocalStorage, JSON.stringify(lista));
    } else {
      localStorage.setItem(this.idLocalStorage, JSON.stringify([recurso]));
    }
    return of(recurso);
  }
  modificarRecurso(recurso, id) {
    let lista = JSON.parse(localStorage.getItem(this.idLocalStorage));
    recurso.idProducto = id;
    lista = lista.filter((item) => item.idProducto != id);

    lista.push(recurso);
    localStorage.setItem(this.idLocalStorage, JSON.stringify(lista));
    return of([]);
  }
  eliminarRecurso(id) {
    let lista = JSON.parse(localStorage.getItem(this.idLocalStorage));
    lista = lista.filter((item) => item.idProducto != id);
    localStorage.setItem(this.idLocalStorage, JSON.stringify(lista));
    return of([]);
  }
  obtenerRecurso(id) {
    let lista = JSON.parse(localStorage.getItem(this.idLocalStorage));
    const producto = lista.find((item) => item.idProducto == id);
    return of(producto);
    // return this.http.get(this.recurosBaseURL + id);
  }
  listarRecurso(ejemplo) {
    const lista = this.filtrarData(ejemplo);

    return of(lista);
    // return this.http.get(this.recurosBaseURL, { params: ejemplo });
  }

  filtrarData(ejemplo: any) {
    let lista: any[] = JSON.parse(localStorage.getItem(this.idLocalStorage));

    Object.entries(ejemplo.ejemplo).forEach(([key, value]) => {
      if (value && value != "") {
        const filtrado: any[] = lista.filter((item: any) =>
          item[key].includes(value)
        );
        lista = filtrado;
      }
    });

    const data = {
      lista: this.pagination(lista, ejemplo.cantidad, ejemplo.inicio),
      totalDatos: lista.length,
    };
    return data;
  }
  pagination(lista: any[], pageSize, pageStart) {
    return lista.slice(pageStart, pageStart + pageSize);
  }
}

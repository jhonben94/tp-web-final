import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment";
@Injectable({
  providedIn: "root",
})
export class VentasService {
  idLocalStorage: string = "lista-ventas";
  idNroFactura: string = "nro-factura";
  constructor(private http: HttpClient) {}
  activarRecurso(id) {
    return [];
  }

  agregarRecurso(recurso) {
    var uniq = "id" + new Date().getTime();
    recurso.idCliente = uniq;
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
    recurso.idCliente = id;
    lista = lista.filter((item) => item.idCliente != id);

    lista.push(recurso);
    localStorage.setItem(this.idLocalStorage, JSON.stringify(lista));
    return of([]);
  }
  eliminarRecurso(id) {
    let lista = JSON.parse(localStorage.getItem(this.idLocalStorage));
    lista = lista.filter((item) => item.idCliente != id);
    localStorage.setItem(this.idLocalStorage, JSON.stringify(lista));
    return of([]);
  }
  obtenerRecurso(id) {
    let lista = JSON.parse(localStorage.getItem(this.idLocalStorage));
    const cliente = lista.find((item) => item.idCliente == id);
    return of(cliente);
    // return this.http.get(this.recurosBaseURL + id);
  }
  listarRecurso(ejemplo) {
    const lista = this.filtrarData(ejemplo);

    return of(lista);
    // return this.http.get(this.recurosBaseURL, { params: ejemplo });
  }

  filtrarData(ejemplo: any) {
    let lista: any[] = JSON.parse(localStorage.getItem(this.idLocalStorage));
    let listaAux: [] = [];

    Object.entries(ejemplo.ejemplo).forEach(([key, value]) => {
      if (value && value != "") {
        console.log("filtrado", value, key);

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
  obtenerNroFactura() {
    let nroFactura = JSON.parse(localStorage.getItem(this.idNroFactura));
    if (!nroFactura) {
      localStorage.setItem(this.idNroFactura, JSON.stringify(100000000));
      nroFactura = 100000000;
    }
    return nroFactura;
  }
}

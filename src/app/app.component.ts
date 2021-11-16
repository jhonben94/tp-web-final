import { Component, OnInit } from "@angular/core";
import { Router, NavigationEnd, NavigationStart } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
const productos = [
  {
    idProducto: "id10000001",
    codigo: "PROD1",
    nombre: "Xiaomi Note 8 pro",
    precioVenta: 1800000,
    existencia: true,
  },
  {
    idProducto: "id10000002",
    codigo: "PROD2",
    nombre: "Monitor Samnung XLAS12 24''",
    precioVenta: 2100000,
    existencia: true,
  },
  {
    idProducto: "id10000003",
    codigo: "PROD3",
    nombre: "Mouse HyperX Pulsefire",
    precioVenta: 350000,
    existencia: true,
  },
  {
    idProducto: "id10000004",
    codigo: "PROD4",
    nombre: "Pendrive Sandisk Mini 32GB",
    precioVenta: 90000,
    existencia: true,
  },
  {
    idProducto: "id10000005",
    codigo: "PROD5",
    nombre: "Pendrive Kingston 64GB",
    precioVenta: 130000,
    existencia: true,
  },
  {
    idProducto: "id10000006",
    codigo: "PROD6",
    nombre: "Pendrive Kingston 64GB",
    precioVenta: 130000,
    existencia: true,
  },
];

const clientes = [
  {
    nombre: "Jhony",
    apellido: "Benitez",
    email: "jhony@mail.com",
    telefono: "323154123",
    nacionalidad: "CM",
    documento: "4231233",
    idTipoDocumento: 1,
    fechaNacimiento: "1994-10-02T03:00:00.000Z",
    idCliente: "id100000001",
  },
  {
    nombre: "Lorena",
    apellido: "Acosta",
    email: "lore@mail.com",
    telefono: "43212412",
    nacionalidad: "PY",
    documento: "4231233",
    idTipoDocumento: 1,
    fechaNacimiento: "1995-08-09T03:00:00.000Z",
    idCliente: "id100000002",
  },
  {
    nombre: "Kuki",
    apellido: "Amarilla",
    email: "kuki@mail.com",
    telefono: "41123134",
    nacionalidad: "PY",
    documento: "5123312",
    idTipoDocumento: 1,
    fechaNacimiento: "1996-03-09T03:00:00.000Z",
    idCliente: "id100000003",
  },
  {
    nombre: "Martin",
    apellido: "Aponte",
    email: "martin@mail.com",
    telefono: "4576711",
    nacionalidad: "PY",
    documento: "9787512",
    idTipoDocumento: 1,
    fechaNacimiento: "1993-05-09T03:00:00.000Z",
    idCliente: "id100000004",
  },
  {
    nombre: "Nerea",
    apellido: "Ortiz",
    email: "nerea@mail.com",
    telefono: "3541312",
    nacionalidad: "PY",
    documento: "4123545",
    idTipoDocumento: 1,
    fechaNacimiento: "1997-09-02T03:00:00.000Z",
    idCliente: "id100000005",
  },
  {
    nombre: "Kahani",
    apellido: "Twitch",
    email: "kahani@mail.com",
    telefono: "5512313",
    nacionalidad: "PY",
    documento: "4512312",
    idTipoDocumento: 1,
    fechaNacimiento: "1997-09-02T03:00:00.000Z",
    idCliente: "id100000006",
  },
];

@Component({
  selector: "app-my-app",
  templateUrl: "./app.component.html",
})
export class AppComponent implements OnInit {
  private _router: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    localStorage.setItem("lista-productos", JSON.stringify(productos));
    localStorage.setItem("lista-ventas", JSON.stringify([]));
    localStorage.setItem("lista-clientes", JSON.stringify(clientes));
    localStorage.setItem("nro-factura", JSON.stringify(10000000));
    localStorage.setItem("prefijo-factura", JSON.stringify("001-001 "));
    this._router = this.router.events
      .filter((event) => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        const body = document.getElementsByTagName("body")[0];
        const modalBackdrop =
          document.getElementsByClassName("modal-backdrop")[0];
        if (body.classList.contains("modal-open")) {
          body.classList.remove("modal-open");
          modalBackdrop.remove();
        }
      });
  }
}

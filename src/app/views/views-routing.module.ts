import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BolsasComponent } from "./bolsas/bolsas.component";
import { ClientesEditComponent } from "./clientes/clientes-edit/clientes-edit.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { PuntosEditComponent } from "./puntos/puntos-edit/puntos-edit.component";
import { PuntosComponent } from "./puntos/puntos.component";
import { VencimientoPuntosEditComponent } from "./vencimiento-puntos/vencimiento-puntos-edit/vencimiento-puntos-edit.component";
import { VencimientoPuntosComponent } from "./vencimiento-puntos/vencimiento-puntos.component";
import { VentasEditComponent } from "./ventas/ventas-edit/ventas-edit.component";
import { VentasComponent } from "./ventas/ventas.component";
import {ProductosComponent} from './productos/productos.component';
import { ProductosEditComponent } from "./productos/productos-edit/productos-edit.component";

export const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "clientes",
        component: ClientesComponent,
      },
      {
        path: "clientes/agregar",
        component: ClientesEditComponent,
      },

      {
        path: "clientes/modificar/:id",
        component: ClientesEditComponent,
      },

      {
        path: "ventas",
        component: VentasComponent,
      },
      {
        path: "ventas/agregar",
        component: VentasEditComponent,
      },
      {
        path: "ventas/ver/:id",
        component: VentasEditComponent,
      },
      {
        path: "productos",
        component: ProductosComponent,
      },
      {
        path: "productos/agregar",
        component: ProductosEditComponent,
      },

      {
        path: "productos/modificar/:id",
        component: ProductosEditComponent,
      },
    ],
  },
];

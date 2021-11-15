import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BolsasComponent } from "./bolsas/bolsas.component";
import { ClientesEditComponent } from "./clientes/clientes-edit/clientes-edit.component";
import { ClientesComponent } from "./clientes/clientes.component";
import { PuntosEditComponent } from "./puntos/puntos-edit/puntos-edit.component";
import { PuntosComponent } from "./puntos/puntos.component";
import { VencimientoPuntosEditComponent } from "./vencimiento-puntos/vencimiento-puntos-edit/vencimiento-puntos-edit.component";
import { VencimientoPuntosComponent } from "./vencimiento-puntos/vencimiento-puntos.component";

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
        path: "puntos",
        component: PuntosComponent,
      },
      {
        path: "puntos/agregar",
        component: PuntosEditComponent,
      },

      {
        path: "puntos/modificar/:id",
        component: PuntosEditComponent,
      },
      {
        path: "vencimiento-puntos",
        component: VencimientoPuntosComponent,
      },
      {
        path: "vencimiento-puntos/agregar",
        component: VencimientoPuntosEditComponent,
      },
      {
        path: "vencimiento-puntos/modificar/:id",
        component: VencimientoPuntosEditComponent,
      },
      {
        path: "bolsas",
        component: BolsasComponent,
      },
    ],
  },
];

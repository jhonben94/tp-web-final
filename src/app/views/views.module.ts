import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MaterialModule } from "src/app/app.module";
import { MdModule } from "src/app/md/md.module";
import { routes } from "./views-routing.module";
import { ClientesComponent } from "./clientes/clientes.component";
import { ClientesEditComponent } from "./clientes/clientes-edit/clientes-edit.component";
import { PuntosComponent } from "./puntos/puntos.component";
import { PuntosEditComponent } from "./puntos/puntos-edit/puntos-edit.component";
import { AsignarPuntosComponent } from "./asignar-puntos/asignar-puntos.component";
import { AsignarPuntosEditComponent } from "./asignar-puntos/asignar-puntos-edit/asignar-puntos-edit.component";
import { VencimientoPuntosComponent } from './vencimiento-puntos/vencimiento-puntos.component';
import { VencimientoPuntosEditComponent } from './vencimiento-puntos/vencimiento-puntos-edit/vencimiento-puntos-edit.component';
import { BuscadorClienteComponent } from './buscadores/buscador-cliente/buscador-cliente.component';
import { BolsasComponent } from './bolsas/bolsas.component';

@NgModule({
  declarations: [
    ClientesComponent,
    ClientesEditComponent,
    PuntosComponent,
    PuntosEditComponent,
    AsignarPuntosComponent,
    AsignarPuntosEditComponent,
    VencimientoPuntosComponent,
    VencimientoPuntosEditComponent,
    BuscadorClienteComponent,
    BolsasComponent,
  ],
  imports: [
    CommonModule,
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    MdModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ViewsModule {}

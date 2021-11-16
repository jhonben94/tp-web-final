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
import { VentasComponent } from './ventas/ventas.component';
import { VentasEditComponent } from './ventas/ventas-edit/ventas-edit.component';
import { ProductosComponent } from './productos/productos.component';
import { ProductosEditComponent } from './productos/productos-edit/productos-edit.component';
import { BuscadorProductoComponent } from './buscadores/buscador-producto/buscador-producto.component';

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
    VentasComponent,
    VentasEditComponent,
    ProductosComponent,
    ProductosEditComponent,
    BuscadorProductoComponent,
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TiendaPage } from './tienda.page';

const routes: Routes = [
  {
    path: '',
    component: TiendaPage,
    children: [
      {
        path: 'listadeseo',
        loadChildren: () => import('../lista-deseo/lista-deseo.module').then(m => m.ListaDeseoPageModule)
      }
    ]
  },  {
    path: 'pagina-juego',
    loadChildren: () => import('./pagina-juego/pagina-juego.module').then( m => m.PaginaJuegoPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TiendaPageRoutingModule {}

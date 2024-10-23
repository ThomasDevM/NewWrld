import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./seguridad/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./seguridad/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'tienda',
    loadChildren: () => import('./menu/tienda/tienda.module').then(m => m.TiendaPageModule)
  },
  {
    path: 'perfil/:id',
    loadChildren: () => import('./seguridad/perfil/perfil.module').then(m => m.PerfilPageModule)
  },
  {
    path: 'notificaciones',
    loadChildren: () => import('./tab/notificaciones/notificaciones.module').then(m => m.NotificacionesPageModule)
  },
  {
    path: 'lista-deseo',
    loadChildren: () => import('./menu/lista-deseo/lista-deseo.module').then(m => m.ListaDeseoPageModule)
  },
  {
    path: 'categoria',
    loadChildren: () => import('./menu/categoria/categoria.module').then(m => m.CategoriaPageModule)
  },
  {
    path: 'noticias',
    loadChildren: () => import('./tab/noticias/noticias.module').then(m => m.NoticiasPageModule)
  },
  {
    path: 'carrito',
    loadChildren: () => import('./pago/carrito/carrito.module').then(m => m.CarritoPageModule)
  },
  {
    path: 'metodo-pago',
    loadChildren: () => import('./pago/metodo-pago/metodo-pago.module').then(m => m.MetodoPagoPageModule)
  },
  {
    path: 'realizacion-pago',
    loadChildren: () => import('./pago/realizacion-pago/realizacion-pago.module').then(m => m.RealizacionPagoPageModule)
  },
  {
    path: 'olvidala',
    loadChildren: () => import('./seguridad/olvidala/olvidala.module').then(m => m.OlvidalaPageModule)
  },
  {
    path: 'config',
    loadChildren: () => import('./tab/config/config.module').then(m => m.ConfigPageModule)
  },
  {
    path: 'pagina-juegos/:page',//el page es para que la ruta pueda mandar datos
    loadChildren: () => import('./menu/tienda/pagina-juego/pagina-juego.module').then(m => m.PaginaJuegoPageModule)
  },
  {
    path: 'soporte',
    loadChildren: () => import('./seguridad/soporte/soporte.module').then( m => m.SoportePageModule)
  },
  {
    path: 'comentarios-app',
    loadChildren: () => import('./seguridad/soporte/comentarios-app/comentarios-app.module').then( m => m.ComentariosAppPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./seguridad/configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  },
  {
    path: 'seleccion-crud',
    loadChildren: () => import('./administracion/seleccion-crud/seleccion-crud.module').then( m => m.SeleccionCrudPageModule)
  },
  {
    path: 'listar-juego',
    loadChildren: () => import('./administracion/cruds/juego/listar-juego/listar-juego.module').then( m => m.ListarJuegoPageModule)
  },
  {
    path: 'crud-juego',
    loadChildren: () => import('./administracion/cruds/juego/crud-juego/crud-juego.module').then( m => m.CrudJuegoPageModule)
  },
  {
    path: 'crud-usuario',
    loadChildren: () => import('./administracion/cruds/usuario/crud-usuario/crud-usuario.module').then( m => m.CrudUsuarioPageModule)
  },
  {
    path: 'listar-usuario',
    loadChildren: () => import('./administracion/cruds/usuario/listar-usuario/listar-usuario.module').then( m => m.ListarUsuarioPageModule)
  },
  {
    path: 'listar-categoria',
    loadChildren: () => import('./administracion/cruds/categoria/listar-categoria/listar-categoria.module').then( m => m.ListarCategoriaPageModule)
  },
  {
    path: 'crud-categoria',
    loadChildren: () => import('./administracion/cruds/categoria/crud-categoria/crud-categoria.module').then( m => m.CrudCategoriaPageModule)
  },
  {
    path: 'detalle-juego/:id',
    loadChildren: () => import('./administracion/cruds/juego/detalle-juego/detalle-juego.module').then( m => m.DetalleJuegoPageModule)
  },
  {
    path: 'detalle-categoria/:id',
    loadChildren: () => import('./administracion/cruds/categoria/detalle-categoria/detalle-categoria.module').then( m => m.DetalleCategoriaPageModule)
  },
  {
    path: 'detalle-chat',
    loadChildren: () => import('./comunidad/detalle-chat/detalle-chat.module').then( m => m.DetalleChatPageModule)
  },
  {
    path: 'listado-chat',
    loadChildren: () => import('./comunidad/listado-chat/listado-chat.module').then( m => m.ListadoChatPageModule)
  },
  {
    path: 'listado-amigo',
    loadChildren: () => import('./comunidad/listado-amigo/listado-amigo.module').then( m => m.ListadoAmigoPageModule)
  },
  {
    path: 'listado-bloqueado',
    loadChildren: () => import('./comunidad/listado-bloqueado/listado-bloqueado.module').then( m => m.ListadoBloqueadoPageModule)
  },
  {
    path: 'anadir-amigo',
    loadChildren: () => import('./comunidad/anadir-amigo/anadir-amigo.module').then( m => m.AnadirAmigoPageModule)
  },
  {
    path: 'solicitud-pendiente',
    loadChildren: () => import('./comunidad/solicitud-pendiente/solicitud-pendiente.module').then( m => m.SolicitudPendientePageModule)
  },
  {
    path: 'agregar-noticia',
    loadChildren: () => import('./administracion/cruds/noticia/agregar-noticia/agregar-noticia.module').then( m => m.AgregarNoticiaPageModule)
  },
  {
    path: 'detalle-noticia/:id',
    loadChildren: () => import('./administracion/cruds/noticia/detalle-noticia/detalle-noticia.module').then( m => m.DetalleNoticiaPageModule)
  },
  {
    path: 'listado-noticia',
    loadChildren: () => import('./administracion/cruds/noticia/listado-noticia/listado-noticia.module').then( m => m.ListadoNoticiaPageModule)
  },
  {
    path: 'editar-perfil/:id',  // Asegúrate de incluir el parámetro `id`
    loadChildren: () => import('./seguridad/editar-perfil/editar-perfil.module').then(m => m.EditarPerfilPageModule)
  },
  {
    path: 'regalo',
    loadChildren: () => import('./tab/regalo/regalo.module').then( m => m.RegaloPageModule)
  },
  {
    path: 'listar-desarro',
    loadChildren: () => import('./administracion/cruds/desarrolladora/listar-desarro/listar-desarro.module').then( m => m.ListarDesarroPageModule)
  },
  {
    path: 'agregar-desarro',
    loadChildren: () => import('./administracion/cruds/desarrolladora/agregar-desarro/agregar-desarro.module').then( m => m.AgregarDesarroPageModule)
  },
  {
    path: 'detalle-desarro/:id',
    loadChildren: () => import('./administracion/cruds/desarrolladora/detalle-desarro/detalle-desarro.module').then( m => m.DetalleDesarroPageModule)
  },
  {
    path: 'cartera',
    loadChildren: () => import('./menu/cartera/cartera.module').then( m => m.CarteraPageModule)
  }
 ,
  {
    path: 'cartera',
    loadChildren: () => import('./menu/cartera/cartera.module').then( m => m.CarteraPageModule)
  },
  {
    path: 'gifcard',
    loadChildren: () => import('./menu/gifcard/gifcard.module').then( m => m.GifcardPageModule)
  },
  {
    path: 'ver-noticia/:id',
    loadChildren: () => import('./tab/ver-noticia/ver-noticia.module').then( m => m.VerNoticiaPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}

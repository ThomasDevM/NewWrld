import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';  // Importa el Router
import { CarritoService } from 'src/app/services/carrito.service';
import { SJuegoService } from 'src/app/services/sjuego.service';
import { SUsuarioService } from 'src/app/services/susuario.service'; // Importa el servicio de usuario

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
})
export class TiendaPage implements OnInit { 
  menuOpen = false;
  itemCount: number = 0;
  juegos: any[] = [];
  filteredJuegos: any[] = [];
  idUsuario: string | null = null; // Cambia el tipo a string | null ya que Firebase UID es una cadena
  searchQuery: string = ''; // Variable para la búsqueda
  imagenPerfil: string | null = null;

  constructor(
    private router: Router, 
    private carritoService: CarritoService, 
    private juegoService: SJuegoService,
    private usuarioService: SUsuarioService 
  ) { }

  async ngOnInit() {
    this.getJuegoImage();

    // Obtener el ID de usuario de manera asíncrona
    this.idUsuario = await this.usuarioService.getUsuarioId(); 
    if (!this.idUsuario) {
      console.error('Error: No se pudo obtener el ID de usuario');
    } else {
      console.log(`ID de usuario obtenido: ${this.idUsuario}`);
      // Cargar la imagen del usuario después de obtener el idUsuario
      await this.cargarImagenUsuario();
    }

    // Suscribirse al carrito para obtener la cantidad de ítems
    this.carritoService.cart$.subscribe(cart => {
      this.itemCount = cart.length;
    });
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  selectOption(option: string) {
    console.log('Seleccionaste:', option);
    this.menuOpen = false; // Cierra el menú después de seleccionar una opción
  }

  navigateTo(game: any) {
    this.router.navigate(['/pagina-juegos', game.page], {
      queryParams: {
        price: game.price,
        subtitle: game.subtitle,
        genre: game.genre,
        imageUrl: game.imageUrl,
        carpeta: game.carpeta,
        idUsuario: this.idUsuario // Añade el ID de usuario a los parámetros de consulta
      }
    });
  }

  navigateA(juego: any) {
    this.router.navigate(['/pagina-juegos', juego.id], {
      queryParams: { 
        idJuego: juego.id,
        idUsuario: this.idUsuario // Añade el ID de usuario a los parámetros de consulta
      }
    });
  }

  alPerfil() {
    if (this.idUsuario) {
      this.router.navigate(['/perfil/', this.idUsuario], { 
        queryParams: { idUsuario: this.idUsuario }
      });
    } else {
      console.error('Error: ID de usuario es null o indefinido. No se puede navegar al perfil.');
    }
  }

  getJuegoImage() {
    this.juegoService.getJuegoImg().subscribe(
      (data) => {
        console.log('Datos recibidos de Firebase:', data); // Verifica los datos que llegan
        this.juegos = data;
        this.filteredJuegos = data; // Inicializa los juegos filtrados
      },
      (error) => {
        console.error('Error al obtener el juego', error);
      }
    );
  }

  // Método para cargar la imagen del usuario
  async cargarImagenUsuario() {
    try {
      if (this.idUsuario) {
        this.imagenPerfil = await this.usuarioService.getImagenUsuario(this.idUsuario);
      } else {
        console.error('Error: ID de usuario es null o indefinido.');
        this.imagenPerfil = null;
      }
    } catch (error) {
      console.error('Error al obtener la imagen del usuario:', error);
      this.imagenPerfil = null;
    }
  }

  // Método para filtrar juegos según la búsqueda
  searchJuegos() {
    if (this.searchQuery.trim() === '') {
      this.filteredJuegos = this.juegos; // Si no hay búsqueda, muestra todos los juegos
    } else {
      this.filteredJuegos = this.juegos.filter(juego => 
        juego.nombre.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        (juego.categorias && juego.categorias.nombre && juego.categorias.nombre.toLowerCase().includes(this.searchQuery.toLowerCase())) // Asegúrate de que la categoría existe
      );
    }
  }
}

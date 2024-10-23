import { Component, OnInit } from '@angular/core';
import { IJuego } from 'src/app/interfaces/ijuego';
import { SJuegoService } from 'src/app/services/sjuego.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listar-juego',
  templateUrl: './listar-juego.page.html',
  styleUrls: ['./listar-juego.page.scss'],
})
export class ListarJuegoPage implements OnInit {

  lJuego!: IJuego[];  // Lista de juegos
  juegosFiltrados: IJuego[] = [];  // Lista de juegos filtrados
  searchText: string = '';  // Campo de búsqueda

  constructor(private juegoServ: SJuegoService, private router: Router) { }
  games: any=[]; 
  ngOnInit() {
    this.getJuegoImage(); 
    this.getJuegos();
  }

  // Obtener todos los juegos
  getJuegos() {
    this.juegoServ.getJuegoAll().subscribe({
      next: (data: IJuego[]) => {
        this.lJuego = data;
        this.juegosFiltrados = data;  // Inicialmente mostramos todos los juegos
      },
      error: (error: any) => { console.error(error); },
      complete: () => { console.log('Carga de juegos completada'); }
    });
  }

  // Filtrar los juegos en base al texto de búsqueda
  filtrarJuegos() {
    const text = this.searchText.toLowerCase();
    this.juegosFiltrados = this.lJuego.filter(juego => 
      juego.nombre.toLowerCase().includes(text) || 
      juego.idJuego.toString().includes(text)
    );
  }

  // Ver detalles de un juego
  verDetalles(id: number) {
    this.router.navigate(['/detalle-juego/', id]); 
  }
  navigateA(juego: any) {
    this.router.navigate(['/detalle-juego/',juego.id], { 
      queryParams: { idJuego: juego.id }
    });
  }

  getJuegoImage() {
    this.juegoServ.getJuegoImg().subscribe(
      (data) => {
        this.games = data;
      },
      (error) => {
        console.error('Error al obtener el juego', error)
      }
    );
  }
}
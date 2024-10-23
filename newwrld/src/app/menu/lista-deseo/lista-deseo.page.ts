import { Component, OnInit } from '@angular/core';
import { SlistaDeseoService } from 'src/app/services/slista-deseo.service'; // Servicio de lista de deseos

@Component({
  selector: 'app-lista-deseo',
  templateUrl: './lista-deseo.page.html',
  styleUrls: ['./lista-deseo.page.scss'],
})
export class ListaDeseoPage implements OnInit {
  wishlist: any[] = []; // Lista de deseos original
  filteredWishlist: any[] = []; // Lista filtrada para la búsqueda

  constructor(private slistaDeseoService: SlistaDeseoService) {}

  ngOnInit() {
    // Obtenemos la lista de deseos desde el servicio
    this.slistaDeseoService.getListaDeseos().subscribe((lista) => {
      this.wishlist = lista;
      this.filteredWishlist = lista; // Inicialmente no hay filtro
    });
  }

  // Filtrar la lista de deseos con el término ingresado
  filterWishlist(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm) {
      this.filteredWishlist = this.wishlist.filter((game) =>
        game.nombre.toLowerCase().includes(searchTerm)
      );
    } else {
      this.filteredWishlist = this.wishlist; // Si no hay término, mostramos toda la lista
    }
  }

  // Remover un juego de la lista de deseos
  removeFromWishlist(index: number) {
    this.slistaDeseoService.removeFromWishlist(index); // Remover del servicio
    this.filteredWishlist.splice(index, 1); // Actualizar la lista filtrada localmente
  }
}
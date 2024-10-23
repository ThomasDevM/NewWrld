import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SlistaDeseoService {
  private wishlist: any[] = []; // Array para almacenar los juegos de la lista de deseos
  private wishlistSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>(this.wishlist);

  constructor() {}

  // Obtener la lista de deseos como un Observable
  getListaDeseos(): Observable<any[]> {
    return this.wishlistSubject.asObservable();
  }

  // Verificar si el juego ya está en la lista de deseos
  isGameInWishlist(game: any): boolean {
    return this.wishlist.some((item) => item.id === game.id); // Compara el ID del juego
  }

  // Agregar un juego a la lista de deseos si no está ya agregado
  addToWishlist(game: any) {
    console.log('Intentando agregar el juego con ID:', game.id);  // Verificar el ID
    if (!this.isGameInWishlist(game)) {
      this.wishlist.push(game);
      this.wishlistSubject.next(this.wishlist);
    } else {
      console.log('El juego ya está en la lista de deseos');
    }
  }

  // Remover un juego de la lista de deseos
  removeFromWishlist(index: number) {
    this.wishlist.splice(index, 1);
    this.wishlistSubject.next(this.wishlist); // Actualizamos el observable
  }
}
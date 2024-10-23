import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private cart = new BehaviorSubject<any[]>([]);
  cart$ = this.cart.asObservable();


  constructor() { }

  addToCart(item: any): void {
    const currentCart = this.cart.value;
    currentCart.push(item);
    this.cart.next(currentCart);
  }

  getCart(): any[] {
    return this.cart.value;
  }

  removeFromCart(index: number): void {
    const currentCart = this.cart.value;
    currentCart.splice(index, 1);
    this.cart.next(currentCart);
  }


  clearCart(): void {
    this.cart.next([]);
  }

}

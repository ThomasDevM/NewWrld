import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router'; 
import { CarritoService } from 'src/app/services/carrito.service';
import { SJuegoService} from 'src/app/services/sjuego.service';
import navcontroller from '@ionic/angular';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  cart: any[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit(): void {
    this.carritoService.cart$.subscribe((cart) => {
      this.cart = cart;
      //totalCos = this.getTotalPrice();
    });
  }

  removeFromCart(index: number): void {
    this.carritoService.removeFromCart(index);
  }

  getTotalPrice(): number {
    return this.cart.reduce((total, item) => total + item.precio, 0);
  }


  
  clearCart(): void {
    this.carritoService.clearCart();
  }
  getItemImage(index: number): string {
    return this.cart[index]?.imagen || '';
  }



}

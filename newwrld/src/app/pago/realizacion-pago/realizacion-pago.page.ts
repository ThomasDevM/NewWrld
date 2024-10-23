import { Component, AfterViewInit } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { CarritoService } from 'src/app/services/carrito.service';


@Component({
  selector: 'app-payment',
  templateUrl: './realizacion-pago.page.html',
  styleUrls: ['./realizacion-pago.page.scss'],
})
export class RealizacionPagoPage {
  constructor(){}
}


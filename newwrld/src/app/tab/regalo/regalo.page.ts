import { Component } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-regalo',
  templateUrl: './regalo.page.html',
  styleUrls: ['./regalo.page.scss'],
})
export class RegaloPage {
  temblando: boolean = false;
  opcionGanadora: string = '';
  mensajeVisible: boolean = false;
  regaloAbierto: boolean = false; // Indica si el regalo ha sido abierto
  mostrarBotonBloqueo: boolean = false; // Controla la visibilidad del botón de bloqueo
  contadorVisible: boolean = false;
  tiempoRestante: Date = new Date();
  mostrarExplicacion: boolean = false; // Variable para mostrar la explicación del regalo

  opciones: string[] = [
    '¡30% de descuento en juegos de terror!',
    '¡20% en juegos de aventura!',
    '¡50% en juegos de acción!',
    '¡10% en juegos de estrategia!',
    '¡25% en juegos de rol!'
  ];

  constructor() { }

  abrirRegalo() {
    // Activamos el temblor del regalo
    this.temblando = true;

    // Después de 1 segundo de temblar, seleccionamos la opción ganadora y mostramos el mensaje
    setTimeout(() => {
      this.temblando = false;
      const opcionIndex = Math.floor(Math.random() * this.opciones.length);
      this.opcionGanadora = this.opciones[opcionIndex];
      this.mensajeVisible = true; // Mostramos el mensaje de ganador
      this.regaloAbierto = true;  // El regalo ya ha sido abierto
      this.mostrarBotonBloqueo = true; // Mostramos el botón de bloqueo automáticamente
      this.iniciarContador(); // Iniciamos el contador inmediatamente
    }, 1000);
  }

  iniciarContador() {
    const fechaActual = new Date();
    const fechaFutura = new Date(fechaActual.getTime() + 24 * 60 * 60 * 1000); // 24 horas después

    interval(1000).subscribe(() => {
      const ahora = new Date();
      const diferencia = fechaFutura.getTime() - ahora.getTime();

      if (diferencia <= 0) {
        this.contadorVisible = false;
      } else {
        this.contadorVisible = true;
        this.tiempoRestante = new Date(diferencia);
      }
    });
  }

  mostrarInfo() {
    this.mostrarExplicacion = !this.mostrarExplicacion;
  }
}

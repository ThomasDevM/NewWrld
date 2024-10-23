import { Component, OnInit } from '@angular/core';
import { SdesarrolladoraService } from 'src/app/services/sdesarrolladora.service';  // Servicio de desarrolladores
import { Router } from '@angular/router';  // Para navegación entre páginas
import { Idesarrolladora } from 'src/app/interfaces/idesarrolladora';  // Interfaz para los desarrolladores

@Component({
  selector: 'app-listar-desarro',
  templateUrl: './listar-desarro.page.html',
  styleUrls: ['./listar-desarro.page.scss'],
})
export class ListarDesarroPage implements OnInit {

  lDesarro!: Idesarrolladora[];  // Lista de desarrolladores
  desarrosFiltrados: Idesarrolladora[] = [];  // Lista de desarrolladores filtrados
  searchText: string = '';  // Campo de búsqueda
  developers: any[] = [];  // Lista de desarrolladores con logo (si aplica)

  constructor(private desarroServ: SdesarrolladoraService, private router: Router) { }

  ngOnInit() {
    this.getDesarroImage();  // Obtener los logos de los desarrolladores si es necesario
    this.getDesarros();  // Obtener los desarrolladores
  }

  // Obtener todos los desarrolladores
  getDesarros() {
    this.desarroServ.getDesarrolladoraAll().subscribe({
      next: (data: Idesarrolladora[]) => {
        this.lDesarro = data;  // Guardamos la lista de desarrolladores
        this.desarrosFiltrados = data;  // Inicialmente mostramos todos los desarrolladores
      },
      error: (error: any) => {
        console.error(error);
      },
      complete: () => {
        console.log('Carga de desarrolladores completada');
      }
    });
  }

  // Filtrar los desarrolladores en base al texto de búsqueda
  filtrarDesarros() {
    const text = this.searchText.toLowerCase();
    this.desarrosFiltrados = this.lDesarro.filter(desarro =>
      desarro.nombre.toLowerCase().includes(text) ||  // Filtra por nombre
      desarro.descripcion.toLowerCase().includes(text) ||  // Filtra por descripción
      desarro.fechaFundacion.toString().includes(text)  // Filtra por fecha de fundación si es necesario
    );
  }

  // Ver detalles de un desarrollador
  verDetalles(id: string | undefined) {
    if (id) {
      this.router.navigate(['/detalle-desarro/', id]);  // Navega a la página de detalles del desarrollador
    } else {
      console.error('ID de desarrolladora no disponible');
    }
  }

  // Función para obtener imágenes de los desarrolladores (si es necesario)
  getDesarroImage() {
    // Suponiendo que el logo es una URL que ya se ha guardado en la base de datos
    this.desarroServ.getDesarrolladoraAll().subscribe(
      (data) => {
        this.developers = data.map(desarro => desarro.logo);  // Extraemos los logos
      },
      (error) => {
        console.error('Error al obtener los logos de los desarrolladores', error);
      }
    );
  }

  // Navegar al detalle de un desarrollador
  navegarDetalle(id: string | undefined) {
    if (id) {
      this.router.navigate(['/detalle-desarro', id]);  // Redirigir con el ID en la URL
    } else {
      console.error('ID de desarrolladora no disponible');
    }
  }
  
}
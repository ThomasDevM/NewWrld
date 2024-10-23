import { Component, OnInit } from '@angular/core'; 
import { Router } from '@angular/router';
import { Inoticia } from 'src/app/interfaces/inoticia';
import { SnoticiaService } from 'src/app/services/snoticia.service';

@Component({
  selector: 'app-listado-noticia',
  templateUrl: './listado-noticia.page.html',
  styleUrls: ['./listado-noticia.page.scss'],
})
export class ListadoNoticiaPage implements OnInit {
  lnoticia: Inoticia[] = [];  // Lista de noticias
  noticiasFiltrados: Inoticia[] = [];  // Lista de noticias filtradas
  searchText: string = '';  // Campo de búsqueda

  constructor(private noticiaServ: SnoticiaService, private router: Router) { }

  ngOnInit() {
    this.getNoticia();  // Obtener todas las noticias al iniciar
  }

  // Obtener todas las noticias
  getNoticia() {
    this.noticiaServ.getNoticiaAll().subscribe({
      next: (data: Inoticia[]) => {
        this.lnoticia = data;
        this.noticiasFiltrados = data;  // Inicialmente mostramos todas las noticias
      },
      error: (error: any) => {
        console.error('Error al obtener las noticias', error);
      },
      complete: () => {
        console.log('Carga de noticias completada');
      }
    });
  }

  // Filtrar noticias según el texto de búsqueda
  filtrarNoticias() {
    const text = this.searchText.toLowerCase();
    this.noticiasFiltrados = this.lnoticia.filter(noticia => 
      noticia.titulo.toLowerCase().includes(text)
    );
  }

  // Ver detalles de una noticia
  verDetalles(id: string | undefined) {
    if (id) {
      this.router.navigate(['/detalle-noticia/', id]);  // Navega a la página de detalles de la noticia
    } else {
      console.error('ID de noticia no disponible');
    }
  }
}
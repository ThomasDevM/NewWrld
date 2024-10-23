import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategoria } from 'src/app/interfaces/icategoria';
import { SCategoriaService } from 'src/app/services/scategoria.service';

@Component({
  selector: 'app-listar-categoria',
  templateUrl: './listar-categoria.page.html',
  styleUrls: ['./listar-categoria.page.scss'],
})
export class ListarCategoriaPage implements OnInit {

  lCategoria!: ICategoria[];  // Lista de categorías
  categoriaFiltrados: ICategoria[] = [];  // Lista de categorías filtradas
  searchText: string = '';  // Campo de búsqueda

  constructor(private categoriaServ: SCategoriaService, private router: Router) { }

  ngOnInit(): void {
    this.getCategoria();
  }

  // Obtener todas las categorías
  getCategoria() {
    this.categoriaServ.getCategoriaAll().subscribe({
      next: (data: ICategoria[]) => {
          this.lCategoria = data;
          this.categoriaFiltrados = data;
      },
      error: (error: any) => { console.error(error); },
      complete: () => { console.log('Carga de juegos compleda'); }
    });
  }

  // Filtrar las categorías en base al texto de búsqueda
  filtrarCategoria(): void {
    const text = this.searchText.trim().toLowerCase();
    if (text === '') {
      this.categoriaFiltrados = this.lCategoria;  // Si no hay texto, mostramos todas las categorías
    } else {
      this.categoriaFiltrados = this.lCategoria.filter(categoria =>
        categoria.nombre.toLowerCase().includes(text) ||
        categoria.idCategoria.toString().includes(text)
      );
    }
  }

  // Ver detalles de una categoría
  verDetalles(id: number){
    this.router.navigate(['/detalle-categoria', id]);  // Asegúrate de que la ruta coincida con la configuración
  }
}

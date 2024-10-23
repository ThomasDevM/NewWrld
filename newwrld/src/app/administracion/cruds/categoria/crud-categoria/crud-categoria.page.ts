import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SCategoriaService } from 'src/app/services/scategoria.service';  // Inyecta el servicio de categorías
import { ICategoria } from 'src/app/interfaces/icategoria';  // Interfaz de categoría

@Component({
  selector: 'app-crud-categoria',
  templateUrl: './crud-categoria.page.html',
  styleUrls: ['./crud-categoria.page.scss'],
})
export class CrudCategoriaPage implements OnInit {
  msgError = "";
  isLoading: boolean = false;
  isSuccess: boolean = false;

  // Lista de categorías predefinidas (si es necesario, puedes añadir más opciones)
  listaCategorias: string[] = ['Acción', 'Aventura', 'Deportes', 'Estrategia', 'Simulación']; 

  registro: ICategoria = {
    idCategoria: 0,  // Inicializar con un valor de 0 o null
    nombre: '',  // Asume que solo necesitas el nombre de la categoría
  };

  constructor(
    private categoriaServ: SCategoriaService,  // Servicio para gestionar categorías
    private router: Router
  ) { }

  ngOnInit(): void {
    // No necesitas cargar nada al inicio si solo estás agregando categorías
  }

  grabar() {
    if (this.registro.nombre) {
      this.isLoading = true;  // Muestra el spinner de carga
      this.categoriaServ.addCategoria(this.registro)
        .then(() => {
          this.isLoading = false;  // Esconde el spinner
          this.isSuccess = true;  // Muestra el mensaje de éxito
          setTimeout(() => {
            this.router.navigate(['/listar-categoria']);  // Redirige después de 2 segundos
          }, 2000);  // Temporizador para mostrar el mensaje de éxito antes de redirigir
        })
        .catch((err: any) => {
          this.isLoading = false;  // Esconde el spinner en caso de error
          console.error(err);
          this.msgError = 'Error al agregar la categoría.';
        });
    } else {
      this.msgError = 'Por favor, completa todos los campos.';  // Mensaje si el campo nombre está vacío
    }
  }

  limpiar() {
    this.registro = {
      idCategoria: 0,  // Limpiar el campo de idCategoria
      nombre: '',  // Limpiar el campo de nombre
    };
    this.msgError = '';  // Limpiar cualquier mensaje de error
  }
}
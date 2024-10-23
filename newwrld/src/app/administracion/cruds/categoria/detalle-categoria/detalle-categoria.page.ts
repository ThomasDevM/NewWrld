import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { ICategoria } from 'src/app/interfaces/icategoria';
import { SCategoriaService } from 'src/app/services/scategoria.service';

@Component({
  selector: 'app-detalle-categoria',
  templateUrl: './detalle-categoria.page.html',
  styleUrls: ['./detalle-categoria.page.scss'],
})
export class DetalleCategoriaPage implements OnInit {
  categoria: ICategoria | null = null; // Inicializamos como null hasta que se cargue
  categoriaId: string | null = null; // Variable para almacenar el ID de la categoría
  isLoading: boolean = false;
  isSuccess: boolean = false;
  isError: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private categoriaServ: SCategoriaService, // Servicio para gestionar categorías
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');  // Obtenemos el ID de la categoría
      if (id) {
        this.categoriaId = id;
        this.cargarCategoria(Number(id));
      } else {
        console.log('No se encontró el idCategoria, redirigiendo...');
        this.router.navigate(['/listar-categoria']);  // Redirige si no hay id
      }
    });
  }

  cargarCategoria(id: number) {
    const categoriaId = Number(id); // Convertimos el ID a número
    console.log('Cargando categoría con ID:', categoriaId);  // Verificamos el ID al cargar
    this.categoriaServ.getCategoriaById(categoriaId).subscribe({
      next: (doc: ICategoria | null) => {
        console.log('Categoría cargada:', doc);  // Verificamos la categoría cargada
        if (doc) {
          this.categoria = doc;  // Asigna la categoría al objeto
        } else {
          console.log('Categoría no encontrada, redirigiendo...');
          this.router.navigate(['/listar-categoria']);  // Redirige si no se encuentra la categoría
        }
      },
      error: (error: any) => {
        console.error('Error al cargar la categoría:', error);
        this.router.navigate(['/listar-categoria']);  // Redirige en caso de error
      }
    });
  }

  async guardarCambios() {
    if (this.categoria && this.categoriaId) {
      try {
        this.isLoading = true;
        const categoriaToUpdate: ICategoria = {
          ...this.categoria,
          idCategoria: Number(this.categoriaId)
        };
        await this.categoriaServ.updateCategoriaById(Number(this.categoriaId), categoriaToUpdate);  

        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/listar-categoria']);
        }, 2000);
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }

  async eliminarCategoria() {
    const alert = await this.alertController.create({
      header: 'Confirmar eliminación',
      message: '¿Estás seguro de que quieres eliminar esta categoría?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
            this.router.navigate([`/detalle-categoria/${this.categoriaId}`]);  // Vuelve al detalle de la categoría
          }
        },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: async () => {
            this.isLoading = true;
            try {
              const categoriaId = Number(this.categoriaId); // Convertimos el ID a número
              await this.categoriaServ.deleteCategoriaById(categoriaId);  // Elimina la categoría

              const toast = await this.toastController.create({
                message: 'Categoría eliminada exitosamente',
                duration: 2000,
                color: 'success',
                position: 'bottom'
              });
              toast.present();

              await this.router.navigate(['/listar-categoria']);  // Redirige a la lista de categorías
            } catch (error) {
              console.error('Error al eliminar la categoría:', error);

              const toast = await this.toastController.create({
                message: 'Error al eliminar la categoría',
                duration: 2000,
                color: 'danger',
                position: 'bottom'
              });
              toast.present();
            } finally {
              this.isLoading = false;
            }
          }
        }
      ]
    });

    await alert.present();  // Muestra el alert de confirmación
  }
}
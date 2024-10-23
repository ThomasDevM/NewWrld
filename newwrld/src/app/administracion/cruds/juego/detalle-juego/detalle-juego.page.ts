import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SJuegoService } from 'src/app/services/sjuego.service';
import { SCategoriaService } from 'src/app/services/scategoria.service'; // Importa el servicio de categorías
import { IJuego } from 'src/app/interfaces/ijuego';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-juego',
  templateUrl: './detalle-juego.page.html',
  styleUrls: ['./detalle-juego.page.scss'],
})
export class DetalleJuegoPage implements OnInit {
  juego: IJuego | null = null; // Inicializamos como null hasta que se cargue
  juegoId: string | null = null; // Variable para almacenar el ID del documento Firestore
  isLoading: boolean = false;
  isSuccess: boolean = false;
  isError: boolean = false;
  categoriasDisponibles: any[] = []; // Lista de categorías disponibles

  constructor(
    private route: ActivatedRoute,
    private juegoServ: SJuegoService,
    private categoriaServ: SCategoriaService, // Servicio de categorías
    private router: Router,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  ngOnInit() {
   
    //poner
        // Capturar la ID del juego desde los parámetros de la URL
      this.route.queryParams.subscribe((params) => {
        this.juegoId = params['idJuego'] || null; // Obtener la ID del juego desde los parámetros de la URL
        console.log('ID del juego:', this.juegoId);

        // Cargar los detalles del juego si la ID es válida
        if (this.juegoId) {
          this.cargarJuego(this.juegoId);
          this.cargarCategorias();
        } else {
          this.router.navigate(['/listar-juego']); // Si no hay ID, redirigir a la lista de juegos
        }
      });
  }

  cargarCategorias() {
    this.categoriaServ.getCategoriaAll().subscribe({
      next: (categorias) => {
        this.categoriasDisponibles = categorias;
      },
      error: (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    });
  }

  cargarJuego(id: string) {  // Acepta la ID como string
    this.juegoServ.getJuegosById(id).subscribe({
      next: (doc: IJuego | null) => {
        if (doc) {
          this.juego = doc;  // Asigna el documento cargado a 'juego'
        } else {
          console.error('No se encontraron detalles para este juego');
          this.router.navigate(['/listar-juego']);  // Redirige si no encuentra el juego
        }
      },
      error: (error: any) => {
        console.error('Error al cargar el juego:', error);
      }
    });
  }
  
  //cambiar
  async guardarCambios() {
    if (this.juego && this.juegoId) {
      try {
        this.isLoading = true;
  
        // Actualiza el juego en Firebase usando la ID como string
        await this.juegoServ.updateJuegosById(this.juegoId, this.juego);
  
        this.isSuccess = true;
        setTimeout(() => {
          this.router.navigate(['/listar-juego']);
        }, 2000);
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
      } finally {
        this.isLoading = false;
      }
    }
  }
  
  async eliminarJuego() {
    if (this.juegoId) {  // Verifica si this.juegoId no es null
      const alert = await this.alertController.create({
        header: 'Confirmar eliminación',
        message: '¿Estás seguro de que quieres eliminar este juego?',
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Eliminación cancelada');
            }
          },
          {
            text: 'Eliminar',
            role: 'destructive',
            handler: async () => {
              this.isLoading = true;
              try {
                // Elimina el juego en Firebase usando la ID como string
                await this.juegoServ.deleteJuegosById(this.juegoId!);
  
                const toast = await this.toastController.create({
                  message: 'Juego eliminado exitosamente',
                  duration: 2000,
                  color: 'success',
                  position: 'bottom'
                });
                toast.present();
  
                setTimeout(() => {
                  this.router.navigate(['/listar-juego']);
                }, 2000);
              } catch (error) {
                console.error('Error al eliminar el juego:', error);
  
                const toast = await this.toastController.create({
                  message: 'Error al eliminar el juego',
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
  
      await alert.present();
    } else {
      console.error('No se encontró una ID válida para eliminar el juego.');
    }
  }
}
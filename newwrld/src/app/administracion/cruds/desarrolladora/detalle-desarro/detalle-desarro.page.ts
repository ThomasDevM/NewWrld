import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Idesarrolladora } from 'src/app/interfaces/idesarrolladora';
import { SdesarrolladoraService } from 'src/app/services/sdesarrolladora.service';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular'; // Importa AlertController

@Component({
  selector: 'app-detalle-desarro',
  templateUrl: './detalle-desarro.page.html',
  styleUrls: ['./detalle-desarro.page.scss'],
})
export class DetalleDesarroPage implements OnInit {
  idDesarrolladora: string = '';  // Inicializado con un valor vacío
  fileToUpload: File | null = null;  // Variable para almacenar el archivo seleccionado
  isLoading: boolean = false;  // Estado de carga para deshabilitar el botón mientras se guarda
  msgError: string | null = null;  // Mensaje de error
  registro: Idesarrolladora = {
    idDesarrolladora: '',
    nombre: '',
    descripcion: '',
    fechaFundacion: '',
    logo: ''
  };
  imagePreview: any;  // Para previsualizar la imagen seleccionada

  constructor(
    private desarroladoraServ: SdesarrolladoraService,
    private router: Router,
    private activatedRoute: ActivatedRoute,  // Para capturar los parámetros de la URL
    private sanitizer: DomSanitizer, // Para manejar la previsualización de imágenes
    private alertController: AlertController  // Inyectar AlertController
  ) { }

  ngOnInit() {
    // Capturar el id (de documento) desde la ruta
    this.idDesarrolladora = this.activatedRoute.snapshot.paramMap.get('id') || '';
    console.log('ID Desarrolladora capturado desde la URL:', this.idDesarrolladora);
    this.loadDesarrolladoraDetails();  // Cargar la información de la desarrolladora
  }

  loadDesarrolladoraDetails() {
    this.isLoading = true;
    this.desarroladoraServ.getDesarrolladoraById(this.idDesarrolladora).subscribe(
      (data: Idesarrolladora | undefined) => {
        if (data) {
          // Verificar que los campos necesarios existen y son válidos
          if (data.nombre && data.descripcion && data.fechaFundacion && data.logo) {
            this.registro = data;
            this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(data.logo); // Asignar la URL del logo para previsualización
          } else {
            console.error('Datos incompletos para la desarrolladora', data);
            // Mostrar un mensaje al usuario si los datos no son completos
          }
        } else {
          console.error('No se encontraron datos para la desarrolladora');
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error al cargar los detalles de la desarrolladora', error);
        this.isLoading = false;
      }
    );
  }

  // Maneja la selección del archivo
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(reader.result as string); // Previsualizar la imagen
      };
      reader.readAsDataURL(file);
    }
  }

  // Método para guardar los cambios
  async saveChanges() {
    try {
      this.isLoading = true;  // Activar estado de carga
      if (!this.registro.nombre || !this.registro.descripcion) {
        alert('Por favor complete todos los campos requeridos.');
        return;
      }

      if (this.fileToUpload) {
        const logoUrl = await this.uploadLogo(this.fileToUpload);
        this.registro.logo = logoUrl;  // Actualizamos el logo
      }

      await this.desarroladoraServ.updateDesarrolladoraById(this.idDesarrolladora, this.registro);
      alert('Los cambios se han guardado correctamente.');
      this.router.navigate(['/listar-desarro']);  // Redirigir después de guardar
    } catch (error) {
      console.error('Error al guardar los cambios', error);
      alert('Hubo un error al guardar los cambios. Inténtalo nuevamente.');
    } finally {
      this.isLoading = false;  // Desactivamos el estado de carga
    }
  }

  // Subir el logo a Firebase Storage y obtener la URL
  async uploadLogo(file: File): Promise<string> {
    try {
      const logoUrl = await this.desarroladoraServ.uploadLogo(file, this.idDesarrolladora).toPromise();
      if (!logoUrl) {
        throw new Error('Logo URL is undefined');
      }
      return logoUrl;  // Asegúrate de que siempre sea un string
    } catch (error) {
      console.error('Error al subir el logo', error);
      throw error;
    }
  }

  // Método para manejar el envío del formulario
  submitForm() {
    this.saveChanges();  // Llama al método que ya tienes para guardar los cambios
  }

  // Función para activar el input de archivo cuando se hace clic en el botón
  triggerFileInput() {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Método para eliminar un desarrollador por ID
  async deleteDesarrolladora() {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta desarrolladora? Esta acción no se puede deshacer.');
    if (confirmDelete) {
      try {
        this.isLoading = true;  // Activar estado de carga
        await this.desarroladoraServ.deleteDesarrolladoraById(this.idDesarrolladora);
        window.alert('Desarrolladora eliminada correctamente.'); // Cambia alert por window.alert
        this.router.navigate(['/listar-desarro']);  // Redirigir después de eliminar
      } catch (error) {
        console.error('Error al eliminar la desarrolladora', error);
        window.alert('Hubo un error al eliminar la desarrolladora. Inténtalo nuevamente.'); // Cambia alert por window.alert
      } finally {
        this.isLoading = false;  // Desactivamos el estado de carga
      }
    }
  }
}
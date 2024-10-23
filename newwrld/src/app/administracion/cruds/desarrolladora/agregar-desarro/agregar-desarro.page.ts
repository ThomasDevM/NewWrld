import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Idesarrolladora } from 'src/app/interfaces/idesarrolladora';  // Asegúrate de tener la interfaz Idesarrolladora
import { SdesarrolladoraService } from 'src/app/services/sdesarrolladora.service';

@Component({
  selector: 'app-agregar-desarro',
  templateUrl: './agregar-desarro.page.html',
  styleUrls: ['./agregar-desarro.page.scss'],
})
export class AgregarDesarroPage implements OnInit {

  // Mensaje de error para validaciones
  msgError = "";
  // Bandera de cargando
  isLoading: boolean = false;

  // Registro inicial de una desarrolladora
  registro: Idesarrolladora = {
    nombre: '',
    descripcion: '',
    fechaFundacion: '',
    logo: '',
  };

  imagePreview: any;  // Para previsualizar la imagen seleccionada
  selectedFile: File | null = null;  // Archivo seleccionado para logo
  imagenPath: string = '';

  constructor(
    private desarrolladoraServ: SdesarrolladoraService,  // Servicio de la desarrolladora
    private router: Router,
    private sanitazer: DomSanitizer,
    private storage: AngularFireStorage,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navController: NavController,
  ) { }

  ngOnInit() { }

  // Función para activar el input de archivo cuando se hace clic en el botón
  triggerFileInput() {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  // Previsualiza la imagen seleccionada
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = this.sanitazer.bypassSecurityTrustUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  // Subir imagen a Firebase Storage
  async uploadImage(): Promise<string | undefined> {
    if (!this.selectedFile) return;

    const filePath = `desarrolladoras/${Date.now()}_${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.selectedFile);

    return new Promise<string | undefined>((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            (url: string) => {
              resolve(url); // Devuelve la URL de la imagen
            },
            error => reject(error)
          );
        })
      ).subscribe();
    });
  }

  // Mostrar mensaje de cargando
  async showCargando() {
    const loading = await this.loadingController.create({
      message: 'Agregando desarrolladora...',
      spinner: 'circular',
      duration: 12000,
    });
    await loading.present();
    return loading;
  }

  // Enviar el formulario y agregar una desarrolladora
  async submitForm() {
    if (!this.registro.nombre || !this.registro.descripcion || !this.registro.fechaFundacion) {
      this.msgError = 'Por favor, completa todos los campos.';
      return;
    }

    const loading = await this.showCargando();

    try {
      // Subir el logo si fue seleccionado
      if (this.selectedFile) {
        const logoUrl = await this.uploadImage();
        if (logoUrl) {
          this.registro.logo = logoUrl;
        } else {
          throw new Error('No se pudo obtener la URL del logo');
        }
      }

      // Guardar la desarrolladora en la base de datos (con el servicio DesarrolladoraService)
      await this.desarrolladoraServ.addDesarrolladora(this.registro);

      await loading.dismiss();
      this.showAlert('Desarrolladora agregada correctamente', 'Éxito');
      this.limpiar();

    } catch (error) {
      await loading.dismiss();
      this.showAlert('Error al agregar la desarrolladora', 'Error');
      console.error('Error al agregar la desarrolladora:', error);
    }
  }

  // Mostrar una alerta de éxito o error
  async showAlert(message: string, header: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navController.navigateForward('/listar-desarro'); // Redirigir a la lista de desarrolladoras
          }
        }
      ]
    });
    await alert.present();
  }

  // Limpiar el formulario
  limpiar() {
    this.registro = {
      nombre: '',
      descripcion: '',
      fechaFundacion: '',
      logo: '',
    };
    this.msgError = ''; // Limpiar mensaje de error
    this.imagePreview = null; // Limpiar vista previa de la imagen
  }
}

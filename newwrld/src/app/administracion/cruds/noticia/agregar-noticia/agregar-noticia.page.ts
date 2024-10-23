import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Inoticia } from 'src/app/interfaces/inoticia';
import { SnoticiaService } from 'src/app/services/snoticia.service';

@Component({
  selector: 'app-agregar-noticia',
  templateUrl: './agregar-noticia.page.html',
  styleUrls: ['./agregar-noticia.page.scss'],
})
export class AgregarNoticiaPage implements OnInit {
  msgError = "";
  isLoading: boolean = false;

  // Registro inicial de una noticia
  registro: Inoticia = {
    idNoticia: '', // Inicializa el idNoticia como vacío
    titulo: '',
    subtitulo: '',
    contenido: '',
    fecPubli: new Date(),
    portada: '',
    galeria: [] // Se mantuvo como string[] para almacenar URLs
  };

  imagePreview: any;
  selectedFile: File | null = null;
  galleryFiles: File[] = []; // Array para almacenar los archivos de la galería
  galleryPreviews: any[] = [];

  constructor(
    private noticiaServ: SnoticiaService,
    private router: Router,
    private sanitazer: DomSanitizer,
    private storage: AngularFireStorage,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navController: NavController,
  ) { }

  ngOnInit() { }

  triggerFileInput() {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

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

  triggerGalleryInput() {
    const galleryInput = document.getElementById('gallery-input') as HTMLInputElement;
    if (galleryInput) {
      galleryInput.click();
    }
  }

  onGalleryFileSelected(event: any) {
    const files = event.target.files;
    this.galleryFiles = []; // Limpiar archivos de la galería previamente seleccionados
    this.galleryPreviews = []; // Limpiar las previsualizaciones

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const reader = new FileReader();
      reader.onload = () => {
        this.galleryPreviews.push(this.sanitazer.bypassSecurityTrustUrl(reader.result as string));
        this.galleryFiles.push(file); // Almacenar el archivo en el array de archivos de la galería
      };
      reader.readAsDataURL(file);
    }
  }

  async uploadImage(file: File): Promise<string | undefined> {
    if (!file) return;

    const filePath = `noticias/${Date.now()}_${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

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

  async showCargando() {
    const loading = await this.loadingController.create({
      message: 'Agregando noticia...',
      spinner: 'circular',
      duration: 12000,
    });
    await loading.present();
    return loading;
  }

  async submitForm() {
    if (!this.registro.titulo || !this.registro.contenido || !this.registro.fecPubli) {
      this.msgError = 'Por favor, completa todos los campos.';
      return;
    }

    // Asignar un ID único para la noticia
    this.registro.idNoticia = Date.now().toString(); // Genera un ID simple basado en la fecha actual

    const loading = await this.showCargando();

    try {
      // Subir la portada si fue seleccionada
      if (this.selectedFile) {
        const portadaUrl = await this.uploadImage(this.selectedFile);
        if (portadaUrl) {
          this.registro.portada = portadaUrl;
        } else {
          throw new Error('No se pudo obtener la URL de la portada');
        }
      }

      // Subir las imágenes de la galería
      const galleryUrls: string[] = [];
      for (const file of this.galleryFiles) {
        const uploadedUrl = await this.uploadImage(file);
        if (uploadedUrl) {
          galleryUrls.push(uploadedUrl);
        }
      }
      this.registro.galeria = galleryUrls; // Actualizar la galería con las URLs

      // Guardar la noticia en la base de datos
      await this.noticiaServ.addNoticia(this.registro);

      await loading.dismiss();
      this.showAlert('Noticia agregada correctamente', 'Éxito');
      this.limpiar();

    } catch (error) {
      await loading.dismiss();
      this.showAlert('Error al agregar la noticia', 'Error');
      console.error('Error al agregar la noticia:', error);
    }
  }

  async showAlert(message: string, header: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navController.navigateForward('/listado-noticia');
          }
        }
      ]
    });
    await alert.present();
  }

  limpiar() {
    this.registro = {
      idNoticia: '', // Limpiar el idNoticia
      titulo: '',
      subtitulo: '',
      contenido: '',
      fecPubli: new Date(),
      portada: '',
      galeria: []
    };
    this.msgError = '';
    this.imagePreview = null;
    this.galleryPreviews = [];
    this.galleryFiles = []; // Limpiar los archivos de la galería también
  }

  // Eliminar imagen de la galería
  removeImage(index: number) {
    if (this.registro.galeria) {
      this.galleryPreviews.splice(index, 1); // Eliminar de las previsualizaciones
      this.galleryFiles.splice(index, 1); // También eliminar del array de archivos
      this.registro.galeria.splice(index, 1); // Eliminar de registro
    }
  }
}
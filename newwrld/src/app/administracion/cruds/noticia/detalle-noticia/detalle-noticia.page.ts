import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Inoticia } from 'src/app/interfaces/inoticia';
import { SnoticiaService } from 'src/app/services/snoticia.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.page.html',
  styleUrls: ['./detalle-noticia.page.scss'],
})
export class DetalleNoticiaPage implements OnInit {
  idNoticia: string = '';
  fileToUpload: File | null = null;
  isLoading: boolean = false;
  msgError: string | null = null; 
  noticia: Inoticia = {
    idNoticia: '',
    titulo: '',
    subtitulo: '',
    contenido: '',
    fecPubli: new Date(),
    portada: '',
    galeria: [] // Asegúrate de que esto esté inicializado como un array vacío
  };
  imagePreview: any;

  constructor(
    private noticiaServ: SnoticiaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private alertController: AlertController
  ) { }

  ngOnInit() {
    this.idNoticia = this.activatedRoute.snapshot.paramMap.get('id') || '';
    console.log('ID Noticia capturado desde la URL:', this.idNoticia);
    this.loadNoticiaDetails();
  }

  loadNoticiaDetails() {
    this.isLoading = true;
    this.noticiaServ.getNoticiaById(this.idNoticia).subscribe(
      (data: Inoticia | undefined) => {
        if (data) {
          this.noticia = {
            ...data,
            fecPubli: data.fecPubli instanceof Date ? data.fecPubli : new Date(data.fecPubli)
          };
          this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(data.portada);
        } else {
          console.error('No se encontraron datos para la noticia');
        }
        this.isLoading = false;
      },
      (error: any) => {
        console.error('Error al cargar los detalles de la noticia', error);
        this.isLoading = false;
      }
    );
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileToUpload = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async saveChanges() {
    try {
      this.isLoading = true;
      if (!this.noticia.titulo || !this.noticia.subtitulo || !this.noticia.contenido) {
        this.msgError = 'Por favor complete todos los campos requeridos.'; 
        return;
      }
  
      if (this.fileToUpload) {
        const portadaUrl = await this.uploadPortada(this.fileToUpload);
        this.noticia.portada = portadaUrl;
      }
  
      // Convertir SafeUrl a string antes de guardar en Firestore
      this.noticia.galeria = this.noticia.galeria.map(url => url.toString());
  
      // Asegúrate de que fecPubli sea una fecha válida
      if (!(this.noticia.fecPubli instanceof Date) || isNaN(this.noticia.fecPubli.getTime())) {
        this.noticia.fecPubli = new Date(); // O establece una fecha por defecto
      }
  
      await this.noticiaServ.updateNoticiaById(this.idNoticia, this.noticia);
      alert('Los cambios se han guardado correctamente.');
      this.router.navigate(['/listado-noticia']);
    } catch (error) {
      console.error('Error al guardar los cambios', error);
      this.msgError = 'Hubo un error al guardar los cambios. Inténtalo nuevamente.'; 
    } finally {
      this.isLoading = false;
    }
  }

  async uploadPortada(file: File): Promise<string> {
    try {
      const portadaUrl = await this.noticiaServ.uploadPortada(file, this.idNoticia).toPromise();
      if (!portadaUrl) {
        throw new Error('Portada URL is undefined');
      }
      return portadaUrl;
    } catch (error) {
      console.error('Error al subir la portada', error);
      throw error;
    }
  }

  submitForm() {
    this.saveChanges();
  }

  triggerFileInput() {
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.click();
    }
  }

  triggerGalleryInput() {
    const galleryInput = document.getElementById('gallery-input') as HTMLInputElement;
    if (galleryInput) {
      galleryInput.click();
    }
  }

  onGalleryFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onload = () => {
          const safeUrl = this.sanitizer.bypassSecurityTrustUrl(reader.result as string);
          this.noticia.galeria.push(safeUrl);  // Aquí ahora es correcto
        };
        reader.readAsDataURL(file);
      }
    }
  }

  removeImage(index: number) {
    if (this.noticia.galeria && this.noticia.galeria.length > index) {
      this.noticia.galeria.splice(index, 1);
    }
  }

  async deleteNoticia() {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar esta noticia? Esta acción no se puede deshacer.');
    if (confirmDelete) {
      try {
        this.isLoading = true;
        await this.noticiaServ.deleteNoticiaById(this.idNoticia);
        alert('Noticia eliminada correctamente.');
        this.router.navigate(['/listado-noticia']);
      } catch (error) {
        console.error('Error al eliminar la noticia', error);
        alert('Hubo un error al eliminar la noticia. Inténtalo nuevamente.');
      } finally {
        this.isLoading = false;
      }
    }
  }
}

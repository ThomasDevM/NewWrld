import { Component, OnInit } from '@angular/core';
import { SUsuarioService } from '../../services/susuario.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { IUsuario } from 'src/app/interfaces/iusuario';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit {
  nuevoNombre: string = '';
  nuevaBiografia: string = '';
  nuevaImagenUrl: string | File = '';
  imagePreview: string | null = null;  // Para almacenar la vista previa de la imagen seleccionada
  idUsuario: string | null = null;  // Para almacenar el ID del usuario
  isLoading: boolean = false;  // Para deshabilitar botones durante la carga
  msgError: string | null = null;  // Mensaje de error para mostrar en caso de fallo
  usuarioActual: IUsuario | null = null;  // Para almacenar los datos actuales del perfil

  constructor(
    private usuarioService: SUsuarioService,
    private storage: AngularFireStorage,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // Obtener el ID del usuario desde la URL
    this.idUsuario = this.route.snapshot.paramMap.get('id');
    
    if (this.idUsuario) {
      // Obtener los datos del usuario desde Firebase con una suscripción
      this.usuarioService.getUsuario(this.idUsuario).subscribe((usuario) => {
        if (usuario) {
          this.usuarioActual = usuario;
          this.nuevoNombre = usuario.nusuario || '';
          this.nuevaBiografia = usuario.biografia || '';
          this.nuevaImagenUrl = usuario.imagen || '';  // Imagen actual del usuario
          this.imagePreview = usuario.imagen || ''; // Vista previa con la imagen actual
        }
      }, error => {
        console.error('Error al obtener el perfil del usuario:', error);
      });
    } else {
      console.error('No se pudo obtener el ID del usuario para editar.');
    }
  }

  async guardarCambios() {
    this.isLoading = true;
    

    try {
      
      const actualizaciones: Promise<any>[] = [];

      // Actualiza nombre si es diferente
      if (this.nuevoNombre && this.idUsuario && this.nuevoNombre !== this.usuarioActual?.nusuario) {
        actualizaciones.push(this.usuarioService.updateNombreUsuario(this.nuevoNombre, this.idUsuario));
      }

      // Actualiza biografía si es diferente
      if (this.nuevaBiografia && this.idUsuario && this.nuevaBiografia !== this.usuarioActual?.biografia) {
        actualizaciones.push(this.usuarioService.updateBioUsuario(this.nuevaBiografia, this.idUsuario));
      }

      // Si se ha subido una nueva imagen, primero se sube y luego se guarda su URL en Firestore
      if (this.nuevaImagenUrl instanceof File) {
        const imagenURL = await this.subirImagen(this.nuevaImagenUrl);
        if (this.idUsuario) {
          actualizaciones.push(this.usuarioService.updateImagenUsuario(imagenURL, this.idUsuario));
          
          // Actualizar inmediatamente la imagen en la vista previa y en el objeto `usuarioActual`
          this.imagePreview = imagenURL;
          this.usuarioActual = {
            ...this.usuarioActual,
            imagen: imagenURL,
            email: this.usuarioActual?.email ?? null,  // Asegurar que email sea string | null
            idUsuario: this.usuarioActual?.idUsuario ?? 0,  // Asegurar que idUsuario tenga un valor numérico
            nusuario: this.usuarioActual?.nusuario ?? '',  // Asegurar que nusuario tenga un string o null
            fecha: this.usuarioActual?.fecha ?? '',  // Asegurar que fecha tenga un string
          };
        }
        // Espera a que todas las actualizaciones terminen
      await Promise.all(actualizaciones);

      // Actualizar los datos del usuario para reflejar los nuevos cambios
      this.usuarioActual = {
        ...this.usuarioActual,
        nusuario: this.nuevoNombre ?? this.usuarioActual?.nusuario ?? '',  // Asegurar que nusuario tenga un string o null
        biografia: this.nuevaBiografia ?? this.usuarioActual?.biografia ?? '',  // Asegurar que biografia tenga un string o null
        email: this.usuarioActual?.email ?? null,  // Asegurar que email sea string | null
        idUsuario: this.usuarioActual?.idUsuario ?? 0,  // Asegurar que idUsuario tenga un valor numérico
        fecha: this.usuarioActual?.fecha ?? '',  // Asegurar que siempre haya un valor de fecha
        socialLinks: this.usuarioActual?.socialLinks ?? [],  // Manejar socialLinks como array vacío
      };
      }
      

      

      console.log('Cambios guardados correctamente');
      this.router.navigate([`/perfil/${this.idUsuario}`]);

    } catch (error) {
      this.msgError = 'Error al guardar los cambios';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  async subirImagen(archivo: File): Promise<string> {
    try {
      const filePath = `usuarios/${this.idUsuario}/perfil.jpg`;
      const fileRef = this.storage.ref(filePath);
      await this.storage.upload(filePath, archivo);
      const downloadURL = await fileRef.getDownloadURL().toPromise();

      // Actualizar la vista previa de la imagen con la nueva URL
      this.nuevaImagenUrl = downloadURL;
      this.imagePreview = downloadURL;  // Actualiza la vista previa con la nueva URL
      console.log('Imagen actualizada correctamente');
      return downloadURL;
    } catch (error) {
      this.msgError = 'Error al subir la imagen';
      console.error(error);
      throw error;
    }
  }

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
      const file = target.files[0];
      this.nuevaImagenUrl = file;

      // Crear una vista previa de la imagen seleccionada
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('file-input') as HTMLElement;
    fileInput.click();
  }

  deletePerfil() {
    console.log('Eliminar perfil no implementado');
  }

  isFileType(): boolean {
    return this.nuevaImagenUrl instanceof File;
  }
}

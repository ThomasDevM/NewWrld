import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IJuego } from 'src/app/interfaces/ijuego';
import { SJuegoService } from 'src/app/services/sjuego.service';
import { SCategoriaService } from 'src/app/services/scategoria.service'; // Importar el servicio de categorías
import { DomSanitizer } from '@angular/platform-browser';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs';
import { AlertController, LoadingController, NavController  } from '@ionic/angular';
import { registerPlugin } from '@capacitor/core';

@Component({
  selector: 'app-crud-juego',
  templateUrl: './crud-juego.page.html',
  styleUrls: ['./crud-juego.page.scss'],
})
export class CrudJuegoPage implements OnInit {
  msgError = "";
  isLoading: boolean = false;
  isSuccess: boolean = false;

  // Lista de categorías cargadas desde el servicio
  categoriasDisponibles: any[] = [];

  registro: IJuego = {
    nombre: '',
    idJuego: 0,
    descripcion: '',
    precio: '',
    imagen:'',
    categorias: []  // Inicializar como array vacío
  };

  imagePreview: any;
  selectedFile: File | null = null;
  imagenPath: string='';
  portadaPreview: any; // Para previsualizar la imagen de portada
  galeriaPreview: any[] = []; // Para previsualizar las imágenes de la galería
  selectedPortada: File | null = null; // Archivo de la imagen de portada
  selectedGaleria: File[] = []; // Archivos de las imágenes de la galería
  

  constructor(
    private juegoServ: SJuegoService,
    private categoriaServ: SCategoriaService, // Servicio de categorías
    private router: Router,
    private sanitazer: DomSanitizer,
    private storage: AngularFireStorage,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private navController: NavController,
  ) { }

  ngOnInit(): void {
    this.cargarCategorias(); // Cargar categorías al iniciar
  }
  //metodo para el archivo seleccionado
  onPortadaSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedPortada = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.portadaPreview = this.sanitazer.bypassSecurityTrustUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
  onGaleriaSelected(event: any) {
    const files = event.target.files as FileList; // Asegurarte de que es de tipo FileList
    this.selectedGaleria = Array.from(files) as File[]; // Convertir FileList a un arreglo de File[]
  
    this.galeriaPreview = [];
  
    // Previsualizar las imágenes seleccionadas
    for (const file of this.selectedGaleria) {
      const reader = new FileReader();
      reader.onload = () => {
        this.galeriaPreview.push(this.sanitazer.bypassSecurityTrustUrl(reader.result as string));
      };
      reader.readAsDataURL(file);
    }
  }
  onFileSelected(event: any){
    const file=event.target.files[0];
    if (file) {
      this.selectedFile= file ;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = this.sanitazer.bypassSecurityTrustUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
  //subir la imagen al Storage
  async uploadPortada(): Promise<string | undefined> {
    if (!this.selectedPortada) return;
  
    const filePath = `portadas/${Date.now()}_${this.selectedPortada.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.selectedPortada);
  
    return new Promise<string | undefined>((resolve, reject) => {
      uploadTask.snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe(
            (url: string) => resolve(url),
            (error) => reject(error)
          );
        })
      ).subscribe();
    });
  }

  async uploadGaleria(): Promise<string[]> {
    const galeriaUrls: string[] = [];
  
    for (const file of this.selectedGaleria) {
      const filePath = `galerias/${Date.now()}_${file.name}`;
      const fileRef = this.storage.ref(filePath);
      const uploadTask = this.storage.upload(filePath, file);
  
      const url = await new Promise<string>((resolve, reject) => {
        uploadTask.snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe(resolve, reject);
          })
        ).subscribe();
      });
  
      galeriaUrls.push(url);
    }
  
    return galeriaUrls;
  }

  async uploadImage(): Promise<string | undefined> {
    if (!this.selectedFile) return;

    const filePath = `juegos/${Date.now()}_${this.selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, this.selectedFile);

    return new Promise<string | undefined> ((resolve,reject) => {
      uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe(
          (url: string) => {
            resolve(url); // devuelve la url de la imagen 
          },
          error => reject(error)
        );
      }
    )).subscribe();
    });
  }

  async showCargando(){
    const loading = await this.loadingController.create({
      message: 'Agregando juego...', //es el mensaje xd
      spinner: 'circular', //tipo de fidget spinner 
      duration: 12000, // es la duracion 
    });
    await loading.present();
    return loading;
  }

  cargarCategorias() {
    this.categoriaServ.getCategoriaAll().subscribe({
      next: (categorias) => {
        this.categoriasDisponibles = categorias; // Guardar las categorías disponibles
      },
      error: (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    });
  }

  grabar() {
    if (this.registro.nombre && this.registro.descripcion && this.registro.precio && this.registro.categorias.length > 0) {
      this.isLoading = true;  // Muestra el spinner
      this.juegoServ.addJuego(this.registro)
        .then(() => {
          this.isLoading = false; // Esconde el spinner
          this.isSuccess = true; // Muestra el mensaje de éxito
          setTimeout(() => {
            this.router.navigate(['/listar-juego']); // Redirige después de 2 segundos
          }, 2000);  // Temporizador para mostrar el mensaje de éxito antes de redirigir
        })
        .catch((err: any) => {
          this.isLoading = false;  // Esconde el spinner en caso de error
          console.error(err);
          this.msgError = 'Error al agregar el juego.';
        });
    } else {
      this.msgError = 'Por favor, completa todos los campos y selecciona al menos una categoría.';
    }
  }

  
//probando 
async submitForm() {
  if (!this.registro.nombre || !this.registro.descripcion || !this.registro.precio || this.registro.categorias.length === 0) {
    this.msgError = 'Por favor, completa todos los campos y selecciona al menos una categoría.';
    return;
  }

  const loading = await this.showCargando();

  try {
    // Subir la portada
    if (this.selectedPortada) {
      const portadaUrl = await this.uploadPortada();
      if (portadaUrl) {
        this.registro.imagen = portadaUrl; // Asignar la URL de la portada
      } else {
        throw new Error('No se pudo obtener la URL de la portada');
      }
    }

    // Subir las imágenes de la galería
    if (this.selectedGaleria.length > 0) {
      const galeriaUrls = await this.uploadGaleria();
      this.registro.galeria = galeriaUrls; // Asignar las URLs de las imágenes de la galería
    }

    await this.juegoServ.addGame(this.registro);

    await loading.dismiss();
    this.showAlert('Juego añadido correctamente', 'Éxito');
    this.limpiar();

  } catch (error) {
    await loading.dismiss();
    this.showAlert('Error al agregar el juego', 'Error');
    console.error('Error al agregar el juego:', error);
  }
}
  async showAlert(message: string, header: string){
    const alert = await this.alertController.create({
      header,
      message,
      buttons:[
        {
          text: 'Ok',
          handler: () =>{
            this.navController.navigateForward('/listar-juego');
          }
        }
      ]
    });
    await alert.present();
  }

  limpiar() {
    this.registro = {
      nombre: '',
      idJuego: 0,
      descripcion: '',
      precio: '',
      imagen: '',
      categorias: []  // Limpiar categorías también
    };
    this.msgError = ''; // Limpiar cualquier mensaje de error
  }

  // Método para manejar la selección de categorías
  toggleCategoria(categoria: string) {
    const index = this.registro.categorias.indexOf(categoria);
    if (index === -1) {
      this.registro.categorias.push(categoria);  // Agregar categoría si no está
    } else {
      this.registro.categorias.splice(index, 1);  // Eliminar categoría si ya está seleccionada
    }
  }
}
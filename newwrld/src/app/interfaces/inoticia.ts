import { SafeUrl } from '@angular/platform-browser';

export interface Inoticia {
  idNoticia: string;
  titulo: string;
  subtitulo: string;
  contenido: string;
  fecPubli: Date;
  portada: string;
  galeria: SafeUrl[];  // Cambia el tipo a SafeUrl
}
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Inoticia } from '../interfaces/inoticia';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firebase from 'firebase/compat/app';  // Importar firebase

@Injectable({
  providedIn: 'root'
})
export class SnoticiaService {
  private dbCollection = "noticias";  // Nombre de la colección en Firestore
  private dbDoc: AngularFirestoreCollection<Inoticia>;  // Referencia a la colección de noticias

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage  // Inyecta AngularFireStorage para manejar archivos
  ) {
    this.dbDoc = afs.collection(this.dbCollection);  // Inicializa la colección en Firestore
  }

  // Método para cargar la portada a Firebase Storage
  uploadPortada(file: File, idNoticia: string): Observable<string> {
    const filePath = `noticias/${idNoticia}/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, file);

    return new Observable(observer => {
      uploadTask.snapshotChanges().subscribe({
        next: (snapshot) => {
          // Progreso de la carga (puedes usarlo para mostrar progreso)
        },
        error: (error) => {
          observer.error(error);
        },
        complete: () => {
          fileRef.getDownloadURL().subscribe({
            next: (url) => {
              observer.next(url);  // Devolvemos la URL del archivo cargado
              observer.complete();
            },
            error: (error) => {
              observer.error(error);
            }
          });
        }
      });
    });
  }

  // Obtener todas las noticias
  getNoticiaAll(): Observable<Inoticia[]> {
    return this.dbDoc.valueChanges().pipe(
      map((noticias: any[]) => {
        return noticias.map(noticia => {
          return {
            idNoticia: noticia.idNoticia,
            titulo: noticia.titulo,
            subtitulo: noticia.subtitulo,
            contenido: noticia.contenido,
            // Verificar si fecPubli es un Timestamp
            fecPubli: (noticia.fecPubli instanceof firebase.firestore.Timestamp)
              ? noticia.fecPubli.toDate()  // Convierte a Date si es un Timestamp
              : new Date(noticia.fecPubli), // O conviértelo a Date si es un string
            portada: noticia.portada || '',
            galeria: noticia.galeria || []
          } as Inoticia;
        });
      })
    );
  }

  getNoticiaById(id: string): Observable<Inoticia> {
    console.log('Buscando noticia con ID:', id);
    return this.afs.collection('noticias').doc<Inoticia>(id).valueChanges().pipe(
      map((data: Inoticia | undefined) => {
        if (!data) {
          console.error('Noticia no encontrada en Firestore para ID:', id);
          throw new Error('Noticia no encontrada');
        }
        return data;
      })
    );
  }

  // Método para agregar una nueva noticia
  async addNoticia(noticia: Inoticia): Promise<any> {
    const idNoticia = await this.getHighestId() + 1; // Obtiene el ID más alto y le suma 1
    noticia.idNoticia = idNoticia.toString(); // Asegúrate de que el ID sea una cadena
    return this.dbDoc.doc(noticia.idNoticia).set(noticia); // Agrega la noticia a la colección con el ID generado
  }

  // Método para obtener el ID más alto
  private async getHighestId(): Promise<number> {
    const noticias = await this.dbDoc.ref.get();
    let highestId = 0;

    noticias.forEach(doc => {
      const data = doc.data() as Inoticia; // Asumiendo que el documento tiene un campo idNoticia
      if (data.idNoticia) {
        const id = parseInt(data.idNoticia);
        if (id > highestId) {
          highestId = id; // Busca el ID más alto
        }
      }
    });

    return highestId; // Devuelve el ID más alto encontrado
  }

  // Método para actualizar noticia por ID
  updateNoticiaById(idNoticia: string, noticia: Inoticia): Promise<void> {
    return this.dbDoc.doc(idNoticia).update(noticia);  // Actualiza el documento en Firebase
  }

  // Método para eliminar una noticia por ID
  async deleteNoticiaById(idNoticia: string): Promise<void> {
    try {
      await this.dbDoc.doc(idNoticia).delete();  // Elimina el documento en Firebase
      console.log(`Noticia con ID ${idNoticia} eliminada con éxito.`);
    } catch (error) {
      console.error('Error al eliminar la noticia:', error);
      throw error;  // Lanzar el error para manejarlo en el componente
    }
  }
}

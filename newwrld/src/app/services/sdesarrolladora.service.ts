import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Idesarrolladora } from '../interfaces/idesarrolladora';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SdesarrolladoraService {
  private dbCollection = "desarrolladores";  // Nombre de la colección en Firestore
  private dbDoc: AngularFirestoreCollection<Idesarrolladora>;  // Referencia a la colección de desarrolladoras

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage  // Inyecta AngularFireStorage para Firebase Storage
  ) {
    this.dbDoc = afs.collection(this.dbCollection);  // Inicializa la colección en Firestore
  }

  // Método para cargar el logo a Firebase Storage
  uploadLogo(file: File, idDesarrolladora: string): Observable<string> {
    const filePath = `desarrolladoras/${idDesarrolladora}/${file.name}`;
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

  // Obtener todos los desarrolladores
  getDesarrolladoraAll(): Observable<Idesarrolladora[]> {
    return this.dbDoc.valueChanges().pipe(
      map((desarrolladoras: any[]) => {
        return desarrolladoras.map(desarrolladora => {
          return {
            idDesarrolladora: desarrolladora.idDesarrolladora,
            nombre: desarrolladora.nombre,
            descripcion: desarrolladora.descripcion,
            fechaFundacion: desarrolladora.fechaFundacion,
            logo: desarrolladora.logo || ''  // Asegura que siempre tenga un valor de logo
          } as Idesarrolladora;
        });
      })
    );
  }

  getDesarrolladoraById(id: string): Observable<Idesarrolladora> {
    console.log('Buscando desarrolladora con ID:', id);
    return this.afs.collection('desarrolladores').doc<Idesarrolladora>(id).valueChanges().pipe(
      map((data: Idesarrolladora | undefined) => {
        if (!data) {
          console.error('Desarrolladora no encontrada en Firestore para ID:', id);
          throw new Error('Desarrolladora no encontrada');
        }
        return data;
      })
    );
  }

  // Método para agregar un nuevo desarrollador
  async addDesarrolladora(desarrolladora: Idesarrolladora): Promise<any> {
    const idDesarrolladora = await this.getHighestId() + 1; // Obtiene el ID más alto y le suma 1
    desarrolladora.idDesarrolladora = idDesarrolladora.toString(); // Asegúrate de que el ID sea una cadena
    return this.dbDoc.doc(desarrolladora.idDesarrolladora).set(desarrolladora); // Agrega el desarrollador a la colección con el ID generado
  }

  // Método para obtener el ID más alto
  private async getHighestId(): Promise<number> {
    const desarrolladoras = await this.dbDoc.ref.get();
    let highestId = 0;

    desarrolladoras.forEach(doc => {
      const data = doc.data() as Idesarrolladora; // Asumiendo que el documento tiene un campo idDesarrolladora
      if (data.idDesarrolladora) {
        const id = parseInt(data.idDesarrolladora);
        if (id > highestId) {
          highestId = id; // Busca el ID más alto
        }
      }
    });

    return highestId; // Devuelve el ID más alto encontrado
  }

  // Método para actualizar desarrolladora por ID
  updateDesarrolladoraById(idDesarrolladora: string, desarrolladora: Idesarrolladora): Promise<void> {
    return this.dbDoc.doc(idDesarrolladora).update(desarrolladora);  // Actualiza el documento en Firebase
  }

  // Método para eliminar un desarrollador por ID
  async deleteDesarrolladoraById(idDesarrolladora: string): Promise<void> {
    try {
      await this.dbDoc.doc(idDesarrolladora).delete();  // Elimina el documento en Firebase
      console.log(`Desarrolladora con ID ${idDesarrolladora} eliminada con éxito.`);
    } catch (error) {
      console.error('Error al eliminar la desarrolladora:', error);
      throw error;  // Lanzar el error para manejarlo en el componente
    }
  }
}
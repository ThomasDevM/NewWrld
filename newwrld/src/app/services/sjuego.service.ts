import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { IJuego } from '../interfaces/ijuego';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SJuegoService {
  private dbCollection = "juegos";
  private dbDoc: AngularFirestoreCollection<IJuego>;

  constructor(private afs: AngularFirestore) {
    this.dbDoc = afs.collection(this.dbCollection);
  }

  // Obtener todos los juegos
  getJuegoAll(): Observable<IJuego[]> {
    return this.dbDoc.valueChanges().pipe(
      map((juegos: any[]) => {
        return juegos.map(juego => {
          return {
            idJuego: juego.idJuego,
            nombre: juego.nombre,
            descripcion: juego.descripcion,
            precio: juego.precio,
            categorias: juego.categorias || []  // Asegura que siempre sea un array de categorías
          } as IJuego;
        });
      })
    );
  }

  // Obtener un juego por ID
  getJuegoById(idJuego: number): Observable<IJuego | null> {
    return this.afs.collection(this.dbCollection, ref => 
      ref.where("idJuego", "==", idJuego)
    ).get().pipe(
      map(snapshot => {
        if (snapshot.empty) {
          return null;
        } else {
          const juegoData = snapshot.docs[0].data() as IJuego;
          const { idJuego: _, ...juegoSinId } = juegoData;
          return {
            idJuego: snapshot.docs[0].id as unknown as number,
            ...juegoSinId
          };
        }
      })
    );
  }

  getJuegoByIdFire(idJuego: string): Observable<any | null> {
    return this.afs.collection(this.dbCollection).doc(idJuego).get().pipe(
      map(snapshot => {
        if (!snapshot.exists) {
          return null; // Si no existe, devuelve null
        }
        const data = snapshot.data() || {}; // Asegúrate de que sea un objeto
        return { idJuego: snapshot.id, ...data }; // Usa spread solo en objetos
      })
    );
  }

  // Método para buscar juegos por nombre o categorías
  getJuegosBySearch(searchText: string): Observable<IJuego[]> {
    return this.afs.collection(this.dbCollection, ref => 
      ref.where("nombre", ">=", searchText)
        .where("nombre", "<=", searchText + "\uf8ff")
        .limit(10)
    ).valueChanges().pipe(
      map((juegos: any[]) => {
        return juegos.map(juego => {
          return {
            idJuego: juego.idJuego,
            nombre: juego.nombre,
            descripcion: juego.descripcion,
            precio: juego.precio,
            categorias: juego.categorias || []  // Asegura que siempre haya un array
          } as IJuego;
        });
      })
    );
  }

  // Agregar un nuevo juego
  addJuego(juego: IJuego): any {
    const idSt = juego.idJuego.toString();
    juego.idJuego = parseInt(idSt, 10);
    return this.dbDoc.add(juego);
  }
  //Agregar juego con imagen
  addGame(juego: IJuego): Promise<any> {
    // Se asegura que idJuego sea un número
    const idSt = juego.idJuego.toString();
    juego.idJuego = parseInt(idSt, 10);
    return this.afs.collection(this.dbCollection).add(juego);
  }

  //getJuegos con imagenes

  getJuegoImg(): Observable<any[]> {
    return this.afs.collection(this.dbCollection).snapshotChanges().pipe(
      map((actions: any[]) => actions.map(a => {
        const data = a.payload.doc.data();
        const id= a.payload.doc.id;
        return{id, ...data};
      }))
    );
    }

  // Actualizar juego por ID
  updateJuegoById(idJuego: number, juego: IJuego): Promise<void> {
    return this.dbDoc.ref
      .where('idJuego', '==', idJuego)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const docId = snapshot.docs[0].id;
          return this.dbDoc.doc(docId).update(juego);
        }
        return Promise.reject('No se encontró el juego');
      });
  }



  // Eliminar juego por ID
  deleteJuegoById(idJuego: number): Promise<void> {
    return this.dbDoc.ref
      .where('idJuego', '==', idJuego)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const docId = snapshot.docs[0].id;
          return this.dbDoc.doc(docId).delete();
        }
        return Promise.reject('No se encontró el juego');
      });
  }
  
  // Método para obtener un juego por ID desde Firebase
  getJuegosById(id: string): Observable<any | null> {
    return this.afs.doc<any>(`${this.dbCollection}/${id}`).valueChanges();
  }

  // Método para actualizar un juego por ID en Firebase
  updateJuegosById(id: string, juego: IJuego) {
    return this.afs.collection('juegos').doc(id).update(juego);  // Actualiza el documento con la ID en formato string
  }

  // Método para eliminar un juego por ID en Firebase
  deleteJuegosById(id: string) {
    return this.afs.collection('juegos').doc(id).delete();  // Elimina el documento con la ID en formato string
  }



}
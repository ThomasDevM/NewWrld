import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { ICategoria } from '../interfaces/icategoria';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SCategoriaService {
  private dbCollection = "categorias";
  private dbDoc: AngularFirestoreCollection<ICategoria>;

  constructor(private afs: AngularFirestore) {
    this.dbDoc = afs.collection(this.dbCollection);
  }

  // Obtener todas las categorías
  getCategoriaAll(): Observable<ICategoria[]> {
    return this.dbDoc.valueChanges().pipe(
      map((categorias: any[]) => {
        return categorias.map(categoria => {
          return {
            idCategoria: categoria.idCategoria,
            nombre: categoria.nombre
          } as ICategoria;
        });
      })
    );
  }

  // Obtener categoría por ID
  getCategoriaById(idCategoria: number): Observable<ICategoria | null> {
    return this.afs.collection(this.dbCollection, ref =>
      ref.where("idCategoria", "==", idCategoria)
    ).get().pipe(
      map(snapshot => {
        if (snapshot.empty) {
          return null;
        } else {
          const categoriaData = snapshot.docs[0].data() as ICategoria;
          const { idCategoria: _, ...categoriaSinId } = categoriaData;
          return {
            idCategoria: snapshot.docs[0].id as unknown as number,
            ...categoriaSinId
          };
        }
      })
    );
  }

  // Método para buscar categorías por nombre
  getCategoriaBySearch(searchText: string): Observable<ICategoria[]> {
    return this.afs.collection(this.dbCollection, ref =>
      ref.where("nombre", ">=", searchText)
        .where("nombre", "<=", searchText + "\uf8ff")
        .limit(10)
    ).valueChanges().pipe(
      map((categorias: any[]) => {
        return categorias.map(categoria => {
          return {
            idCategoria: categoria.idCategoria,
            nombre: categoria.nombre
          } as ICategoria;
        });
      })
    );
  }

  // Crear una nueva categoría
  addCategoria(categoria: ICategoria): any {
    const idSt = categoria.toString();
    categoria.idCategoria = parseInt(idSt, 10);
    return this.dbDoc.add(categoria);
  }

  // Actualizar categoría por ID
  updateCategoriaById(idCategoria: number, categoria: ICategoria): Promise<void> {
    return this.dbDoc.ref
      .where('idCategoria', '==', idCategoria)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const docId = snapshot.docs[0].id;
          return this.dbDoc.doc(docId).update(categoria);
        }
        return Promise.reject('No se encontró la categoría');
      })
  }

  // Eliminar categoría por ID
  deleteCategoriaById(idCategoria: number): Promise<void> {
    return this.dbDoc.ref
      .where('idCategoria', '==', idCategoria)
      .get()
      .then((snapshot) => {
        if (!snapshot.empty) {
          const docId = snapshot.docs[0].id;
          return this.dbDoc.doc(docId).delete();
        }
        return Promise.reject('No se encontró la categoría');
      })
  }
}
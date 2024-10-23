import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { IUsuario } from '../interfaces/iusuario';
import { Observable } from 'rxjs'; // Importa Observable para trabajar con observables

@Injectable({
  providedIn: 'root'
})
export class SUsuarioService {

  constructor(
    private firestore: AngularFirestore, 
    private afAuth: AngularFireAuth
  ) {}

  // Método para obtener el ID del usuario autenticado usando authState
  getUsuarioId(): Promise<string | null> {
    return new Promise((resolve, reject) => {
      this.afAuth.authState.subscribe(user => {
        if (user) {
          resolve(user.uid);  // Devuelve el UID del usuario
        } else {
          console.error('No hay usuario autenticado.');
          resolve(null);  // Si no hay usuario autenticado, retorna null
        }
      });
    });
  }

  // Método para actualizar el nombre de usuario
  async updateNombreUsuario(nombre: string, idUsuario: string | null): Promise<void> {
    if (idUsuario) {
      return this.firestore.collection('usuarios').doc(idUsuario).update({ nusuario: nombre });
    }
  }

  // Método para actualizar la imagen del usuario
  async updateImagenUsuario(imagenUrl: string, idUsuario: string | null): Promise<void> {
    if (idUsuario) {
      return this.firestore.collection('usuarios').doc(idUsuario).update({ imagen: imagenUrl });
    }
  }

  // Método para actualizar la biografía del usuario
  async updateBioUsuario(biografia: string, idUsuario: string | null): Promise<void> {
    if (idUsuario) {
      return this.firestore.collection('usuarios').doc(idUsuario).update({ biografia });
    }
  }

  // Método para obtener el perfil del usuario
  getUsuario(idUsuario: string): Observable<IUsuario | undefined> {
    return this.firestore.collection('usuarios').doc<IUsuario>(idUsuario).valueChanges();
  }
  
  // Método para obtener la imagen del usuario desde Firestore
  async getImagenUsuario(idUsuario: string | null): Promise<string | null> {
    if (idUsuario) {
      const doc = await this.firestore.collection('usuarios').doc(idUsuario).get().toPromise();
      if (doc && doc.exists) {
        const userData = doc.data() as IUsuario;
        return userData.imagen ?? null;  // Devuelve la URL de la imagen o null si no hay imagen
      } else {
        console.log('No se encontró el documento del usuario.');
        return null;
      }
    } else {
      console.log('No hay usuario autenticado.');
      return null;
    }
  }
}

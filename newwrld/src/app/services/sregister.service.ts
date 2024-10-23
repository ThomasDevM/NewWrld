import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'; // Importa AngularFirestore para interactuar con Firestore
import { User } from 'firebase/auth'; // Importa el tipo de usuario de Firebase

@Injectable({
  providedIn: 'root'
})
export class SRegisterService {

  constructor(private afAuth: AngularFireAuth, private firestore: AngularFirestore) {} // Inyecta AngularFirestore

  // Método para registrar al usuario en Firebase Authentication y guardar en Firestore
  async registrar(correo: string, contrasena: string, nusuario: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.createUserWithEmailAndPassword(correo, contrasena);
      const user = userCredential.user;
      
      if (user) {
        // Guardar en Firestore los detalles del usuario
        await this.firestore.collection('usuarios').doc(user.uid).set({
          email: correo,
          nombreUsuario: nusuario,
          uid: user.uid,
          creadoEn: new Date()
        });

        console.log('Usuario registrado y datos guardados en Firestore');
      }
    } catch (error) {
      console.error('Error durante el registro: ', error);
      throw error;
    }
  }

  // Método para iniciar sesión con correo y contraseña
  async iniciarSesion(correo: string, contrasena: string) {
    const userCredential = await this.afAuth.signInWithEmailAndPassword(correo, contrasena);
    return userCredential.user; // Retorna el usuario autenticado
  }
}
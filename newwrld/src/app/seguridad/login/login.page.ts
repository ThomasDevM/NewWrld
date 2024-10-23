import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { SRegisterService } from '../../services/sregister.service'; 
import { Router } from '@angular/router';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  correo: string = '';
  contrasena: string = '';

  constructor(
    private navCtrl: NavController,
    private registerService: SRegisterService, 
    private router: Router 
  ) { }

  async iniciarSesion() {
    try {
      const usuario = await this.registerService.iniciarSesion(this.correo, this.contrasena);
      if (usuario) {
        console.log('Inicio de sesión exitoso:', usuario);
        this.router.navigate(['/tabs/tienda']);
      }
    } catch (error) {
      console.error('Error al intentar iniciar sesión:', error);
    }
  }

  // Lógica de Google Sign-In
  async loginWithGoogle() {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      
      // Si la autenticación es exitosa, puedes manejar al usuario aquí
      const user = result.user;
      console.log('Inicio de sesión con Google exitoso:', user);
      this.router.navigate(['/tabs/config']);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/config');
  }
}
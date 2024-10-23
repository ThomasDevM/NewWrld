import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';  // Para obtener el parámetro de la ruta
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { IUsuario } from '../../interfaces/iusuario'; 
import { SUsuarioService } from '../../services/susuario.service';  
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';  

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  nusuario: IUsuario | null = null;
  idUsuario: string | null = null;  // Para almacenar el ID del usuario

  constructor(
    private afAuth: AngularFireAuth, 
    private firestore: AngularFirestore,
    private usuarioService: SUsuarioService,
    private storage: AngularFireStorage,
    private router: Router,
    private route: ActivatedRoute  // Para obtener el ID desde la ruta
  ) {}

  async ngOnInit() {
    // Obtener el ID del usuario desde la URL
    this.route.paramMap.subscribe(params => {
      this.idUsuario = params.get('id');
      if (this.idUsuario) {
        console.log('ID del usuario desde la URL:', this.idUsuario);
        
        // Obtener los datos del usuario desde Firestore
        this.firestore.collection('usuarios').doc<IUsuario>(this.idUsuario).valueChanges().subscribe((nusuario) => {
          this.nusuario = nusuario ?? null;
        });
      } else {
        console.error('No se pudo obtener el ID del usuario desde la URL.');
      }
    });
  }

  cerrarSesion() {
    this.afAuth.signOut().then(() => {
      console.log('Sesión cerrada correctamente');
      window.location.href = '/login';  // Ajusta la ruta según tu configuración
    }).catch(error => {
      console.error('Error al cerrar sesión:', error);
    });
  }

  irAEditarPerfil() {
    // Navegar a la página de edición de perfil con el ID del usuario
    this.router.navigate([`/editar-perfil/${this.idUsuario}`]);
  }
}

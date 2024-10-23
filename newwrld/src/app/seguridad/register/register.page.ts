import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SRegisterService } from '../../services/sregister.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private registerService: SRegisterService, private router: Router) {
    // Inicialización del formulario reactivo con validaciones
    this.registerForm = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confcontrasena: ['', [Validators.required]],
      nusuario: ['', [Validators.required]]
    });
  }



  // Método para enviar datos de registro
  async enviarDatos() {
    const formValue = this.registerForm.value;

    // Verificar que el formulario sea válido y que las contraseñas coincidan
    if (this.registerForm.valid && formValue.contrasena === formValue.confcontrasena) {
      try {
        const { correo, contrasena, nusuario } = formValue;
        // Llamar al servicio para registrar el usuario, incluyendo el nombre de usuario
        await this.registerService.registrar(correo, contrasena, nusuario);
        // Navegar a la página de inicio de sesión después del registro
        this.router.navigate(['/login']);
      } catch (error) {
        console.error('Error durante el registro: ', error);
      }
    } else {
      console.error('Formulario inválido o las contraseñas no coinciden');
    }
  }

}

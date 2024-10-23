import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import languageNames from 'src/assets/languages.json';


@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.page.html',
  styleUrls: ['./configuracion.page.scss'],
})
export class ConfiguracionPage implements OnInit {
  settings = {
    notifications: true,
    darkMode: false,
    language: 'es', // Idioma predeterminado
    syncData: true,
  };

  langs: string[] = []; // Lista de idiomas disponibles
  languageNames: any = languageNames; // Cargar nombres de idiomas

  constructor(private router: Router, private alertController: AlertController, private translateService: TranslateService) {
    this.langs = this.translateService.getLangs(); // Obtener idiomas disponibles
  }

  ngOnInit() {
    // Establecer el idioma por defecto
    this.translateService.setDefaultLang(this.settings.language);
    this.translateService.use(this.settings.language); // Usar el idioma actual
  }

  async presentConfirmAlert() {
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Estás seguro de que deseas restablecer la configuración a los valores predeterminados?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Restablecer',
          handler: () => {
            this.resetSettings();
          },
        },
      ],
    });

    await alert.present();
  }

  resetSettings() {
    // Restablecer los valores a los predeterminados
    this.settings = {
      notifications: true,
      darkMode: false,
      language: 'es', // Cambia esto si quieres establecer un idioma diferente como predeterminado
      syncData: true,
    };

    // Cambiar el idioma después de restablecer
    this.translateService.use(this.settings.language);
    
    // Mostrar mensaje de confirmación o notificación
    this.presentAlert('Configuración restablecida', 'Las configuraciones han sido restablecidas a los valores predeterminados.');
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  changeLag(event: any) {
    const selectedLanguage = event.detail.value; // Obtener el idioma seleccionado
    this.settings.language = selectedLanguage; // Actualizar el idioma en la configuración
    this.translateService.use(selectedLanguage); // Cambiar el idioma de la traducción
  }

  // Método para obtener el nombre del idioma
  getLanguageName(langCode: string) {
    return this.languageNames[langCode] || langCode;
  }
}

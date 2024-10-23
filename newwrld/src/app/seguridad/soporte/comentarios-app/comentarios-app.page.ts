import { Component, OnInit } from '@angular/core';
import { NavController,AlertController  } from '@ionic/angular';


@Component({
  selector: 'app-comentarios-app',
  templateUrl: './comentarios-app.page.html',
  styleUrls: ['./comentarios-app.page.scss'],
})
export class ComentariosAppPage implements OnInit {

  alertButtons = ['Aceptar'];

  feedback = {
    nombre: '',
    email: '',
    comentario: ''
  };

  constructor(private navCtrl: NavController,private alertController: AlertController) { }

  async submitFeedback() {
    if (this.feedback.nombre && this.feedback.email && this.feedback.comentario) {
      // manejar el comportamiento por mientras lo muestra en consola, 
      console.log('Comentario enviado:', this.feedback);

      
      const alert = await this.alertController.create({
        header: 'Comentario enviado',
        subHeader: '¡Gracias por tu comentario!',
        buttons: ['Aceptar']
      });

      await alert.present();

      
      alert.onDidDismiss().then(() => {
        this.navCtrl.navigateBack('/tabs/config'); 
      });
    }
  }






  ngOnInit() {
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/config');
  }

}

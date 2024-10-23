import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';

interface Notification {
  title: string;
  content: string;
  time: string;
}

interface ModalData {
  title: string;
  content: string;
  showReplyBox: boolean;
}

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.page.html',
  styleUrls: ['./notificaciones.page.scss'],
})
export class NotificacionesPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  messages: Notification[] = [
    { title: '¡Tu amigo BatMetal14 te ha escrito!', content: 'Sale su phasmo?', time: '06:11' },
    { title: '¡Tu amigo konan te ha escrito!', content: 'goti', time: '08:45' },
    { title: '¡Tu amigo Sheeze te ha escrito!', content: 'pasa IP xaval', time: '12:45' },
    { title: '¡DEATHMASTER43 te ha regalado un juego!', content: 'Haz clic para ver el juego.', time: '10:30' },
    { title: '¡Tu amigo Fidier te ha escrito!', content: 'alo', time: '11:00' },
    { title: '¡Tu amigo Zeus te ha escrito!', content: 'cuando pagan?', time: '11:15' }
  ];

  modalTitle: string = '';
  modalContent: string = '';
  showReplyBox: boolean = false;
  replyMessage: string = '';
  isGiftAccepted: boolean = false;

  constructor(private navCtrl: NavController) { }

  ngOnInit() { }

  getModalContent(id: string): ModalData | null {
    switch (id) {
      case 'card1':
        return {
          title: 'Mensaje de BatMetal14:',
          content: `
              <ul>
                <li> Sale su phasmo? </li>
              </ul>
            </div>
            <p>¡No olvides responder!</p>
          `,
          showReplyBox: true
        };
      case 'card2':
        return {
          title: 'Mensaje de konan:',
          content: `
              <ul>
                <li> es un juegazo </li>
                <li> goti </li>
              </ul>
            </div>
            <p>¡Asegúrate de responder!</p>
          `,
          showReplyBox: true
        };
      case 'card3':
        return {
          title: 'Mensaje de Sheeze:',
          content: `
              <ul>
                <li> oye hrmano </li>
                <li> te vas a meter? </li>
                <li> apuratee </li>
                <li> pasa IP xaval </li>
              </ul>
            </div>
            <p>¡Asegúrate de responder!</p>
          `,
          showReplyBox: true
        };
      case 'card4':
        return {
          title: 'Regalo Recibido', // Cambia el título a 'Regalo Recibido'
          content: `
              <li>Mensaje: Un regalo para ti xaval </li>
              <p>¿Deseas aceptar o rechazar el regalo?</p>
            `,
          showReplyBox: false
        };
      case 'card5':
        return {
          title: 'Mensaje de Fidier:',
          content: `  
              <ul>
                <li> ¿Jugamos algo hoy? </li>
                <li> alo </li>
              </ul>
            </div>
            <p>¡No olvides responder!</p>
          `,
          showReplyBox: true
        };
      case 'card6':
        return {
          title: 'Mensaje de Zeus:',
          content: `    
              <ul>
                <li> oye </li>
                <li> cuando pagan? </li>
              </ul>
            </div>
            <p>¡Asegúrate de estar listo!</p>
          `,
          showReplyBox: true
        };
      default:
        return null;
    }
  }

  openDetails(id: string) {
    const modalData = this.getModalContent(id);
    if (modalData) {
      this.modalTitle = modalData.title;
      this.modalContent = modalData.content;
      this.showReplyBox = modalData.showReplyBox;
      this.isGiftAccepted = false;
      this.modal.present();
    } else {
      console.error('No se encontró contenido para el ID:', id);
    }
  }

  cerrar() {
    console.log('Botón de cerrar presionado');
    this.modal.dismiss();
    this.replyMessage = '';
    this.isGiftAccepted = false;
  }

  acceptGift() {
    console.log('Regalo aceptado');
    this.isGiftAccepted = true;
  }

  rejectGift() {
    console.log('Regalo rechazado');
    this.cerrar();
  }

  sendReply() {
    console.log('Mensaje de respuesta enviado:', this.replyMessage);
    this.cerrar();
  }
}

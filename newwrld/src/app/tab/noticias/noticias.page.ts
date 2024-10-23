import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, NavController } from '@ionic/angular';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inoticia } from 'src/app/interfaces/inoticia';
import { SnoticiaService } from 'src/app/services/snoticia.service';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {
  @ViewChild(IonModal) modal!: IonModal;

  modalTitle: string = '';
  modalSubtitle: string = '';
  modalContent: string = '';

  noticias$: Observable<Inoticia[]> | undefined; // Inicializa como undefined
  filteredNoticias$: Observable<Inoticia[]> | undefined; // Para almacenar las noticias filtradas
  searchTerm: string = ''; // Variable para almacenar el término de búsqueda
  selectedDateFilter: string = 'all'; // Variable para almacenar el filtro de fecha

  constructor(private navCtrl: NavController, private snoticiaService: SnoticiaService) { }

  ngOnInit() {
    this.loadNoticias(); // Cargar las noticias al inicializar el componente
  }

  loadNoticias() {
    this.noticias$ = this.snoticiaService.getNoticiaAll(); // Obtiene todas las noticias
    this.noticias$.subscribe(noticias => {
      this.filteredNoticias$ = this.filterNoticiasObservable(noticias);
    });
  }

  filterNoticiasObservable(noticias: Inoticia[]): Observable<Inoticia[]> {
    return new Observable(observer => {
      observer.next(this.applyFilters(noticias));
      observer.complete();
    });
  }

  applyFilters(noticias: Inoticia[]): Inoticia[] {
    return noticias.filter(noticia => {
      const matchesSearchTerm = noticia.titulo.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesDateFilter = this.selectedDateFilter === 'all' || this.filterByDate(noticia);
      return matchesSearchTerm && matchesDateFilter;
    });
  }

  filterByDate(noticia: Inoticia): boolean {
    const today = new Date();
    const noticiaDate = new Date(noticia.fecPubli);
    const diffTime = Math.abs(today.getTime() - noticiaDate.getTime());
    const diffMinutes = Math.ceil(diffTime / (1000 * 60)); // Diferencia en minutos
  
    switch (this.selectedDateFilter) {
      case 'week':
        return diffMinutes <= 7 * 24 * 60; // 7 días en minutos
      case 'two-weeks':
        return diffMinutes <= 14 * 24 * 60; // 14 días en minutos
      case 'month':
        return diffMinutes <= 30 * 24 * 60; // 30 días en minutos
      case 'five-minutes':
        return diffMinutes <= 5; // Hace 5 minutos
      default:
        return true;
    }
  }
  

  filterNoticias() {
    if (this.noticias$) {
      this.noticias$.subscribe(noticias => {
        this.filteredNoticias$ = this.filterNoticiasObservable(noticias);
      });
    }
  }

  openDetails(id: string) {
    // Navega a la página de ver noticia con el ID correspondiente
    this.navCtrl.navigateForward(`/ver-noticia/${id}`);
  }

  cerrar() {
    this.modal.dismiss();
  }
}

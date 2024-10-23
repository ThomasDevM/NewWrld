import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Inoticia } from 'src/app/interfaces/inoticia';
import { SnoticiaService } from 'src/app/services/snoticia.service';

@Component({
  selector: 'app-ver-noticia',
  templateUrl: './ver-noticia.page.html',
  styleUrls: ['./ver-noticia.page.scss'],
})


export class VerNoticiaPage implements OnInit {
  noticia$: Observable<Inoticia> = new Observable();

  constructor(
    private route: ActivatedRoute,
    private snoticiaService: SnoticiaService // Inyecta el servicio
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id'); // Obtén el ID de la noticia de la URL
    if (id) {
      this.noticia$ = this.snoticiaService.getNoticiaById(id); // Obtén la noticia por ID
    }
  }
}

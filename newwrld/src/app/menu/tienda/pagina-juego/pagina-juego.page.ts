import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { CarritoService } from 'src/app/services/carrito.service';
import { SJuegoService } from 'src/app/services/sjuego.service';
import { SlistaDeseoService } from 'src/app/services/slista-deseo.service'; // Importar el servicio de lista de deseos
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
declare var Swiper: any;

@Component({
  selector: 'app-pagina-juego',
  templateUrl: './pagina-juego.page.html',
  styleUrls: ['./pagina-juego.page.scss'],
})
export class PaginaJuegoPage implements OnInit {
  gameData: any = {};
  thumbsSwiper: any;
  gallerySwiper: any;
  slides: { img: string }[] = [];
  idJuego: string | null = null;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private navCtrl: NavController, 
    private CarritoService: CarritoService,
    private juegoService: SJuegoService,
    private listaDeseoService: SlistaDeseoService // Inyectar el servicio de lista de deseos
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.idJuego = params['idJuego'] || null;
      console.log('ID del juego recibido:', this.idJuego); // Verifica si el ID es válido
      if (this.idJuego) {
        this.loadGameDetails(this.idJuego);
      } else {
        console.error('No se ha proporcionado una ID de juego válida');
      }
    });
  }

  addToCart(game: any): void {
    this.CarritoService.addToCart(game);
  }

  addToWishlist(game: any): void {
    console.log('Intentando agregar juego con ID:', game.id); // Verifica si el ID es correcto
    this.listaDeseoService.addToWishlist(game);
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.thumbsSwiper = new Swiper('.swiper-container-thumbs', {
        slidesPerView: 4,
        spaceBetween: 10,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });

      this.gallerySwiper = new Swiper('.swiper-container-gallery', {
        slidesPerView: 1,
        spaceBetween: 10,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        thumbs: {
          swiper: this.thumbsSwiper,
        },
      });
    }, 0);
  }

  loadGameDetails(idJuego: string) {
    this.juegoService.getJuegoByIdFire(idJuego).subscribe({
      next: (game) => {
        console.log('Detalles del juego:', game);  // Verifica que el objeto `game` tiene un `id`
        if (game) {
          this.gameData = game;
          this.slides = [{ img: game.imagen }];
          this.loadGalleryImages(game);
        } else {
          console.error('Juego no encontrado con la ID:', idJuego);
        }
      },
      error: (err) => {
        console.error('Error al cargar los detalles del juego:', err);
      }
    });
  }
  

  loadGalleryImages(game: any) {
    const storage = getStorage();
    if (game.galeria && game.galeria.length > 0) {
      const promises = game.galeria.map((imagenPath: string) => {
        const imageRef = ref(storage, imagenPath);
        return getDownloadURL(imageRef).then((url) => {
          this.slides.push({ img: url });
        });
      });

      Promise.all(promises).then(() => {
        this.initSwipers();
      }).catch((error) => {
        console.error('Error al cargar las imágenes de la galería:', error);
      });
    } else {
      console.log('No hay imágenes en la galería del juego');
      this.initSwipers();
    }
  }

  initSwipers() {
    setTimeout(() => {
      this.thumbsSwiper = new Swiper('.swiper-container-thumbs', {
        slidesPerView: 4,
        spaceBetween: 10,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
      });

      this.gallerySwiper = new Swiper('.swiper-container-gallery', {
        slidesPerView: 1,
        spaceBetween: 10,
        autoplay: {
          delay: 3000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        thumbs: {
          swiper: this.thumbsSwiper, 
        },
      });
    }, 0);
  }

  ionViewWillLeave() {
    if (this.thumbsSwiper && typeof this.thumbsSwiper.destroy === 'function') {
      this.thumbsSwiper.destroy(true, true);
    }
    if (this.gallerySwiper && typeof this.gallerySwiper.destroy === 'function') {
      this.gallerySwiper.destroy(true, true);
    }
  }

  goBack() {
    this.navCtrl.navigateBack('/tabs/tienda');
  }
}
import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private menu: MenuController, private translateService: TranslateService) {
    this.translateService.setDefaultLang('es');
    this.translateService.addLangs(['es', 'en','ar','de','fr','it','ja','zh','ru']);
  }
  closeMenu() {
    this.menu.close();
  }
}

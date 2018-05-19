import { Component } from '@angular/core';
import * as config from '../../../../assets/appsettings.json';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
  <span class="created-by">&copy;  <i><a href="#" target="_blank">{{appSettings?.proprietor.name}}</a></i></span>
  <div class="socials">
    <a href="{{item.link}}" target="_blank"
      *ngFor="let item of appSettings?.proprietor.social" class="{{item.icon}}"></a>
  </div>
  `,
})
export class FooterComponent {
  appSettings = config.default;
}

import { Component } from '@angular/core';
import { GAService } from '@acpaas-ui/ngx-components/analytics';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html'
})
export class HomePageComponent {
  constructor(private gaService: GAService) {}
}

import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">
    </span>
    <div class="socials">
      <a href="https://github.com/ronnyarruda20" target="_blank" class="ion ion-social-github"></a>
      <a href="https://www.linkedin.com/in/ronny-arruda-015158119/" target="_blank" class="ion ion-social-linkedin"></a>
    </div>
  `,
})
export class FooterComponent {
}

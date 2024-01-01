import { Component } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'top-bar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.sass',
})
export class TopBarComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  logOut() {
    this.authService.logout();
  }
}

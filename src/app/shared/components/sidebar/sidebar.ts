import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './sidebar.html',
})
export class SidebarComponent {
  private authService = inject(AuthService);

  user = this.authService.getUser();

  logout(): void {
    this.authService.logout().subscribe({
      next: () => {},
      error: () => this.authService.limpiarSesion()
    });
  }
}
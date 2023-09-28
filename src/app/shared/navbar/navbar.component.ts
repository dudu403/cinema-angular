import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  toggleNavbar = true;
  query: string = '';

  constructor(private router: Router) {}

  pesquisarFilme() {
    this.router.navigate(['/filmes/search'], {
      queryParams: { query: this.query },
    });
  }
}

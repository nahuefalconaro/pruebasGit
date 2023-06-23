import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  test: string = '';
  @Input() complejo!: string;
  @Output() complejoChange = new EventEmitter<string>();

  links = ['www.google.com', 'Second', 'Third'];
  activeLink = this.links[0];
  background: ThemePalette = undefined;

  toggleBackground() {
    this.background = this.background ? undefined : 'primary';
  }

  addLink() {
    this.links.push(`Link ${this.links.length + 1}`);
  }

  login() {
    console.log();
    console.log(sessionStorage.setItem('usuario', JSON.stringify({ token: '123456789' })));
  }
  logout() {
    console.log(JSON.parse(sessionStorage.getItem('usuario')!).token);

    sessionStorage.getItem('usuario')? sessionStorage.removeItem('usuario'): console.log('no esta logueado');
    ;

  }
  emitir() {
    this.complejo = this.generaCadenaAleatoria(10);
    this.complejoChange.emit(this.complejo);
  }

  generaCadenaAleatoria(n: number): string {
    let result = '';
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < n; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}

import { AuthService } from './../../auth/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/auth/interfaces/interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor(private router:Router, private authService: AuthService){}

  logout(){
    this.router.navigateByUrl('/auth/login')
  }
  get getUsuario(){
    console.log(this.authService.getUsuario);

    return this.authService.getUsuario
  }
}

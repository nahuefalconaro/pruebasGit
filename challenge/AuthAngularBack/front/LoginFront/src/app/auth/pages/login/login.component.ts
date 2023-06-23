import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  miForm:FormGroup = this.fb.group({
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(8)]],
  });
  constructor(private fb:FormBuilder, private router:Router, private authService:AuthService){

  }

  login() {
    const {email, password} = this.miForm.value;
    this.authService.login(email, password).subscribe(r =>
      {
        if (r) {
          this.router.navigateByUrl('/protected')
        }else{
          Swal.fire(
            'Error',
            r.msg,
            'error'
          )

        }
      })
  }
}

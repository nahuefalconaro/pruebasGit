import { Component } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  miForm:FormGroup = this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required, Validators.email]],
    password:['',[Validators.required, Validators.minLength(8)]],
  });
  constructor(private fb:FormBuilder, private router:Router){

  }

  registro() {
    this.router.navigateByUrl('/protected')
  }
}

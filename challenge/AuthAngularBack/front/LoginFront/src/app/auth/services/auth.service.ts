import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { of } from 'rxjs/internal/observable/of';
import { map, catchError, tap } from 'rxjs/operators';
import { enviroment } from 'src/environments/environment';
import { Respuesta, Usuario } from '../interfaces/interface';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: string = enviroment.baseUrl;
  usuario!: Usuario;

  constructor(private http: HttpClient) {}

  get getUsuario(): Usuario {
    return { ...this.usuario };
  }

  login(email: string, password: string) {
    const url = `${this.baseUrl}`;

    return this.http.post<Respuesta>(url, {
        email: email,
        password: password,
      })
      .pipe(
        tap((resp) => {
          if (resp.ok) {
            localStorage.setItem('token', resp.token!);
            this.usuario = {
              name: resp.name!,
              uid: resp.uid!,
            };
          }
        }),
        map((resp) => resp.ok),
        catchError((err: any) => of(err.error))
      );
  }

  registro(name: string, email: string, password: string) {
    const url = `${this.baseUrl}/auth/new`;
    const body = { email, password, name };

    return this.http.post<Respuesta>(url, body).pipe(
      tap(({ ok, token }) => {
        if (ok) {
          localStorage.setItem('token', token!);
        }
      }),
      map((resp) => resp.ok),
      catchError((err) => of(err.error.msg))
    );
  }
  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}renew`;
    const headers = new HttpHeaders().set(
      'x-token',
      localStorage.getItem('token') || ''
    );

    return this.http.get<Respuesta>(url, { headers }).pipe(
      map((resp: any) => {
        localStorage.setItem('token', resp.token!);
        this.usuario = {
          name: resp.name!,
          uid: resp.uid!
        };

        return resp.ok;
      }),
      catchError((err: any) => of(false))
    );
  }
  logout() {
    localStorage.clear();
  }
}

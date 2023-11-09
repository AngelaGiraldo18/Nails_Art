// Servicio (UsuarioService)
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:4000/api';

  constructor(private http: HttpClient) {}

  createUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createusuario`, data);
  }

  authenticatedRequest(endpoint: string, data: any): Observable<any> {
    // Recupera el token de localStorage
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No se ha encontrado un token de autenticación.');
      return of(); // Retorna un Observable vacío en lugar de undefined
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.post(`${this.apiUrl}/${endpoint}`, data, httpOptions);
  }
}

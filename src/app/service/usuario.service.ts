// Servicio (UsuarioService)
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable ,of} from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
interface LoginResponse {
  usuario: any; 
}

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  private apiUrl = 'http://localhost:4000/api';

  // Inyecta el módulo HttpClient en el servicio
  constructor(private http: HttpClient) {}

  //peticiones de el usuario
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createusuario`, data);
  }

  private usuarioInfoSubject = new BehaviorSubject<any>(null);
  usuarioInfo$ = this.usuarioInfoSubject.asObservable();
  loginUser(email: string, contrasena: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/loginUsuario`, { email, contrasena })
      .pipe(
        tap(response => {
          this.usuarioInfoSubject.next(response.usuario);
        }),
        catchError((error) => {
          console.error('Error en la solicitud de inicio de sesión:', error);
          throw error;
        })
      );
  }
  getUsuarioInfo() {
    return this.usuarioInfoSubject.value;
  }
  public usuarioInfo: any;

  //peticiones de la manicurita
  createManicurista(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createManicurista`, data);
  }
  getManicuristas(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/manicuristas`);
  }
  updateManicurista(data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateManicurista`, data);
  }
  eliminarManicurista(idmanicurista: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/eliminarManicurista/${idmanicurista}`);
  }
  
  //estas son las peticiones de la agendacion de citas
  createTipoUñas(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crearTiposUñas`, data);
  }
  obtenerCitasPorFecha(fecha: string): Observable<any[]> {
    console.log('Fecha antes de la solicitud HTTP:', fecha);
    return this.http.get<any[]>(`${this.apiUrl}/citas/${fecha}`).pipe(
        tap(citas => console.log('Citas después de la solicitud HTTP:', citas))
    );
}

  authenticatedRequest(endpoint: string, data: any): Observable<any> {
    // Recupera el token de localStorage
    const token = localStorage.getItem('token');
    console.log(token);
    

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

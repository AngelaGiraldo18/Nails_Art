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

  private usuarioInfoSubject = new BehaviorSubject<any>(null);
  usuarioInfo$ = this.usuarioInfoSubject.asObservable();

  //peticiones de el usuario
  createUser(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createusuario`, data);
  }

  loginUser(email: string, contrasena: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/loginUsuario`, { email, contrasena }).pipe(
      tap(response => {
        console.log('Respuesta del inicio de sesión:', response);
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
  buscarManicuristasPorNombre(nombre: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/buscar-por-nombre/${nombre}`);
  }
  
  
  //estas son las peticiones de la agendacion de citas
  createCita(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/crearCita`, data, { headers: { 'Content-Type': 'application/json' } });
}

  obtenerCitasPorFecha(fecha: string): Observable<any[]> {
    console.log('Fecha antes de la solicitud HTTP:', fecha);
    return this.http.get<any[]>(`${this.apiUrl}/citas/${fecha}`).pipe(
        tap(citas => console.log('Citas después de la solicitud HTTP:', citas))
    );
}
//petiiones de el empleado candidato 
  createEmpleadoCandidato(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createEmpleadoCandidato`, data);
  }
  getAllEmpleadosCandidatos(email: string): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/getAllEmpleadosCandidatos/${email}`);
  }
  sendEmailWithEmpleadosData(email: string): Observable<any> {
    const data = { email }; // Incluye el correo electrónico en el cuerpo de la solicitud
    return this.http.post(`${this.apiUrl}/sendEmailWithEmpleadosData`, data);
  }

// UsuarioService consulta de favoritos
getFavoritaManicuristas(userEmail: string): Observable<any[]> {
  const url = `${this.apiUrl}/manicurista/favorita/${userEmail}`;
  return this.http.get<any[]>(url);
}


  authenticatedRequest(endpoint: string, data: any): Observable<any> {
    const token = localStorage.getItem('token');
    console.log(token);

    if (!token) {
      console.error('No se ha encontrado un token de autenticación.');
      return of();
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      })
    };

    return this.http.post(`${this.apiUrl}/${endpoint}`, data, httpOptions);
  }
<<<<<<< HEAD
  
=======
>>>>>>> d4ad4ee9f4f71a170c628e4d1f113999faaaf10b
}

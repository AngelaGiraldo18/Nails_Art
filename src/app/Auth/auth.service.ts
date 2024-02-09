import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";
import { UsuarioService } from '../service/usuario.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  isLogin = new BehaviorSubject<boolean>(this.checkToken());
  isAdmin = new BehaviorSubject<boolean>(this.checkAdminStatus());
  isManicurista = new BehaviorSubject<boolean>(this.checkManicuristaStatus());
  isCliente = new BehaviorSubject<boolean>(this.checkClienteStatus());

  constructor(private usuarioService: UsuarioService) {}
  
  private checkToken() : boolean {
    return !!localStorage.getItem('token');
  }

  private checkAdminStatus() : boolean {
    const token = this.getToken();
  
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken && decodedToken.rol === 'admin';
    }

    return false;
  }


  private checkManicuristaStatus() : boolean {
    const token = this.getToken();
  
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken && decodedToken.rol === 'manicurista';
    }

    return false;
  }
  private checkClienteStatus() : boolean {
    const token = this.getToken();
  
    if (token) {
      const decodedToken = this.decodeToken(token);
      return decodedToken && decodedToken.rol === 'cliente';
    }

    return false;
  }


  login(token:string) : void {
    
    localStorage.setItem('token', token);

    
    
      this.isCliente.next(this.checkClienteStatus());
      this.isAdmin.next(this.checkAdminStatus());
      this.isManicurista.next(this.checkManicuristaStatus());
      this.isLogin.next(true);
    
   
  }

  getToken() {
    if (this.checkToken()){
      return localStorage.getItem('token')
    }
    return "No hay token";
  }

  logout() : void {
    localStorage.removeItem('token');
    
    this.isLogin.next(false);
    this.isAdmin.next(false);
    this.isManicurista.next(false)
    this.usuarioService.setUsuarioInfo(null);
    this.isCliente.next(false)
    localStorage.removeItem('usuarioInfo');
  }

  isLoggedIn() : Observable<boolean> {
    return this.isLogin.asObservable();
  }

  isAdminStatus(): Observable<boolean> {
    return this.isAdmin.asObservable();
  }

  isManicuristaStatus(): Observable<boolean> {
    return this.isManicurista.asObservable();
  }

  isClienteStatus(): Observable<boolean> {
    return this.isCliente.asObservable();
  }



  private decodeToken(token: string): any | null {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const decodedToken = JSON.parse(atob(base64));
  
      return decodedToken;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null;
    }
  }
  
}
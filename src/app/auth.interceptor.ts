import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UsuarioService } from './service/usuario.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private usuarioService: UsuarioService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Obtiene la información del usuario del servicio
    const usuarioInfo = this.usuarioService.getUsuarioInfo();

    if (usuarioInfo) {
      // Agrega el token al encabezado de la solicitud si hay información del usuario
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${usuarioInfo.token}`,
        },
      });
    }

    return next.handle(request);
  }
}
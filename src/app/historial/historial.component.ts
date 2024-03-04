import { Component,OnInit } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
historial: any[]=[];
constructor(private Historial: UsuarioService){}

ngOnInit(): void {
  this.Historial.usuarioInfo$.subscribe(usuarioInfo=>{
    if (usuarioInfo &&usuarioInfo.id) {
      const id_usuario = usuarioInfo.id;
      this.historialcitas(id_usuario)
    }else{
      console.error('NO hay informació de usuario disponibles');
      
    }
  })
}
historialcitas(id_usuario:String): void {
  console.log('ID de usuario:', id_usuario);
  this.Historial.Historialcitas(id_usuario).subscribe(
    (historial)=>{
      console.log('Historial de citas:', historial);
      if (Array.isArray(historial)) {
        this.historial = historial;
      } else {
        this.historial = [historial];
      }
    },
    (error)=>{
      console.error('Error al obtener las citas:', error);
    }    
  )
}

}


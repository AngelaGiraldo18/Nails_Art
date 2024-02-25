import { Component } from '@angular/core';

@Component({
  selector: 'app-chat-boot',
  templateUrl: './chat-boot.component.html',
  styleUrls: ['./chat-boot.component.css']
})
export class ChatBootComponent {
  AbrirChat: boolean = false;


  abrirModal() {
    this.AbrirChat = true;
  }
  
  cerrarModal() {
    this.AbrirChat = false;
  }
}

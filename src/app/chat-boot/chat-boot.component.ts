import { Component, HostListener } from '@angular/core';
import { UsuarioService } from '../service/usuario.service';

@Component({
  selector: 'app-chat-boot',
  templateUrl: './chat-boot.component.html',
  styleUrls: ['./chat-boot.component.css']
})
export class ChatBootComponent {
  AbrirChat: boolean = false;
  history: any[] = [];
  question: string = '';
  response: string = '';

  constructor(private chatService: UsuarioService) { }

  abrirModal() {
    this.AbrirChat = true;
  }
  
  cerrarModal() {
    this.AbrirChat = false;
  }

  sendMessage() {
    if (this.question.trim() === '') return;

    this.chatService.sendMessage(this.history, this.question)
      .subscribe(response => {
        this.history = response.history;
        this.response = response.history[response.history.length - 1].parts;
        this.question = '';
      });
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
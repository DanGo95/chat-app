import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Message } from '../../interfaces/message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('messageInput') messageInput!: ElementRef;

  messages!: Message[];
  element!: any;

  constructor( private _chat: ChatService, private auth: AuthService, private router: Router ) {
    this._chat.getMessages().subscribe(messages => {
      this.messages = messages.reverse();
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 20);
    })
  }

  ngOnInit(): void {
    this.element = document.getElementById('app-messages');
  }

  addMessage(input: string) {
    if(input === '') {
      return;
    }

    let message = {
      user: this.auth.user.name,
      message: input,
      date: new Date().getTime(),
      uid: this.auth.user.uid,
      photo: this.auth.user.photo
    }

    this._chat.addMessage(message).subscribe(
      () => {
        this.messageInput.nativeElement.value = '';
      },
    )
  }

  logout() {
    this.auth.logout().then(() => this.router.navigateByUrl('login'));
  }

}

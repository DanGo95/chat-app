import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-chat-message',
  templateUrl: './chat-message.component.html',
  styleUrls: ['./chat-message.component.css']
})
export class ChatMessageComponent implements OnInit {

  @Input() messages!: any[];

  user: any;

  constructor(private auth: AuthService) {
    this.user = this.auth.user
  }

  ngOnInit(): void {
  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { of } from 'rxjs'
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private messagesCollection: AngularFirestoreCollection<Message>

  constructor( private afs: AngularFirestore ) {
    this.messagesCollection = this.afs.collection('chats', ref => ref.orderBy('date', 'desc').limit(15));
  }

  getMessages() {
    return this.messagesCollection.valueChanges();
  }

  addMessage(message: Message) {
    return of(this.messagesCollection.add(message));
  }
}

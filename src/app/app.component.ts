import { Component } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

interface Thread {
  name: string
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'chat';
  thread$: Observable<Thread[]>

  constructor( firestore: Firestore ) {
    const result = collection(firestore, 'threads');
    this.thread$ = collectionData(result) as Observable<Thread[]>
  }
}

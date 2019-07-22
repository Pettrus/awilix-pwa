import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { ApiService } from './api.service';
import * as firebase from 'firebase/app';
import 'firebase/messaging';

@Injectable({
    providedIn: 'root'
})
export class MensagensPushService {

    currentMessage = new BehaviorSubject(null);
    messaging = firebase.messaging();

    constructor(
        private api: ApiService,
        private angularFireAuth: AngularFireAuth,
        private angularFireMessaging: AngularFireMessaging) {
        this.angularFireMessaging.messaging.subscribe(
            (_messaging) => {
                _messaging.onMessage = _messaging.onMessage.bind(_messaging);
                _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
            }
        )
    }

    /**
     * request permission for notification from firebase cloud messaging
     * 
     * @param userId userId
     */
    requestPermission() {
        this.messaging.requestPermission().then(() => {
            console.log('Notification permission granted.');
            return this.messaging.getToken()
        }).then(token => {
            this.salvarToken(token);
        }).catch((err) => {
            console.log('Unable to get permission to notify.', err);
        });
    }

    async salvarToken(token: string) {
        try {
            await this.api.post("fcm", token);
        }catch(e) {
            console.log(e);
        }
    }

    /**
     * hook method when new notification received in foreground
     */
    receiveMessage() {
        this.angularFireMessaging.messages.subscribe(
            (payload) => {
                console.log("new message received. ", payload);
                this.currentMessage.next(payload);
            })
    }
}
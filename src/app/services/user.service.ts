import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDetailsSubject = new BehaviorSubject<User>(new User());
  public userDetails$ = this.userDetailsSubject.asObservable();

  setUserDetails(userDetails: User) {
    setTimeout(() => {
    this.userDetailsSubject.next(userDetails);
    },0);
  }

  constructor() { }
}

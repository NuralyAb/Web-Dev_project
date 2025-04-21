import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;
  private userInfo: any = null;

  login(userData: any) {
    this.isAuthenticated = true;
    this.userInfo = userData;
  }

  logout() {
    this.isAuthenticated = false;
    this.userInfo = null;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  getUserInfo(): any {
    return this.userInfo;
  }
}

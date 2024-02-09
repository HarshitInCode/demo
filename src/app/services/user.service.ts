import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly localStorageKey = 'userData';
  private readonly currentLoginKey = 'currentLogin';

  getUserData(): any[] {
    const userDataString = localStorage.getItem(this.localStorageKey);
    return userDataString ? JSON.parse(userDataString) : [];
  }

  saveUserData(userData: any): void {
    const usersData = this.getUserData();
    const userId = this.generateUserId();
    const userDataWithId = { ...userData, id: userId };
    usersData.push(userDataWithId);
    localStorage.setItem(this.localStorageKey, JSON.stringify(usersData));
  }

  private generateUserId(): string {
    return 'user_' + new Date().getTime().toString() + Math.floor(Math.random() * 1000).toString();
  }

  setCurrentLogin(user: any): void {
    localStorage.setItem(this.currentLoginKey, JSON.stringify(user));
  }

  getCurrentLogin(): any {
    const currentLoginString = localStorage.getItem(this.currentLoginKey);
    return currentLoginString ? JSON.parse(currentLoginString) : null;
  }

  clearCurrentLogin(): void {
    localStorage.removeItem(this.currentLoginKey);
  }
}

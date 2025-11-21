import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly MOCK_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRlSWQiOjEyMywiaWF0IjoxNzM1MDAwMDAwfQ.mock';
  private currentClientId: number | null = null;

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // Mock: aceita qualquer email/senha
    const response: LoginResponse = {
      token: this.MOCK_TOKEN,
      clienteId: 123
    };
    this.currentClientId = response.clienteId;
    localStorage.setItem('token', response.token);
    localStorage.setItem('clienteId', response.clienteId.toString());
    return of(response).pipe(delay(500));
  }

  logout(): void {
    this.currentClientId = null;
    localStorage.removeItem('token');
    localStorage.removeItem('clienteId');
  }

  getCurrentClientId(): number | null {
    if (!this.currentClientId) {
      const stored = localStorage.getItem('clienteId');
      this.currentClientId = stored ? parseInt(stored, 10) : null;
    }
    return this.currentClientId;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }
}


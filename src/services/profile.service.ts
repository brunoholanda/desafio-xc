import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Profile, ProfileHistory, RiskProfile } from '../models/profile.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private readonly MOCK_PROFILE: Profile = {
    clienteId: 123,
    perfil: 'Moderado',
    descricao: 'Perfil equilibrado entre segurança e rentabilidade. Ideal para investidores que buscam crescimento moderado com proteção do capital.',
    pontuacao: 65
  };

  private readonly MOCK_HISTORY: ProfileHistory[] = [
    { data: '2024-01-15', perfil: 'Conservador', pontuacao: 45 },
    { data: '2024-04-20', perfil: 'Conservador', pontuacao: 50 },
    { data: '2024-07-10', perfil: 'Moderado', pontuacao: 58 },
    { data: '2024-10-05', perfil: 'Moderado', pontuacao: 62 },
    { data: '2025-01-15', perfil: 'Moderado', pontuacao: 65 }
  ];

  getPerfilRisco(clienteId: number): Observable<Profile> {
    return of(this.MOCK_PROFILE).pipe(delay(300));
  }

  getPerfilHistory(clienteId: number): Observable<ProfileHistory[]> {
    return of(this.MOCK_HISTORY).pipe(delay(300));
  }

  getPerfilDescription(perfil: RiskProfile): string {
    const descriptions: Record<RiskProfile, string> = {
      'Conservador': 'Prioriza segurança e preservação do capital. Ideal para investidores que não toleram perdas e buscam estabilidade.',
      'Moderado': 'Equilibra segurança e rentabilidade. Adequado para investidores que aceitam algum risco em troca de retornos melhores.',
      'Agressivo': 'Foca em maximizar retornos, aceitando maior volatilidade. Para investidores experientes que toleram riscos significativos.'
    };
    return descriptions[perfil];
  }

  getPerfilColor(perfil: RiskProfile): string {
    const colors: Record<RiskProfile, string> = {
      'Conservador': '#4CAF50',
      'Moderado': '#FF9800',
      'Agressivo': '#F44336'
    };
    return colors[perfil];
  }
}


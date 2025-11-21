export type RiskProfile = 'Conservador' | 'Moderado' | 'Agressivo';

export interface Profile {
  clienteId: number;
  perfil: RiskProfile;
  descricao: string;
  pontuacao: number;
}

export interface ProfileHistory {
  data: string;
  perfil: RiskProfile;
  pontuacao: number;
}


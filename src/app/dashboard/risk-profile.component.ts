import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Profile, RiskProfile } from '../../models/profile.model';
import { ProfileService } from '../../services/profile.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-risk-profile',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, FormsModule],
  template: `
    <div class="risk-profile-container" role="region" aria-labelledby="risk-profile-heading">
      <h3 id="risk-profile-heading" class="risk-title">Perfil de Risco</h3>

      <div class="profile-selector">
        <label for="profile-select" class="selector-label">Simular Perfil:</label>
        <select
          id="profile-select"
          class="profile-select"
          [ngModel]="selectedProfile"
          (ngModelChange)="onProfileChange($event)"
          [attr.aria-label]="'Selecione um perfil de risco para simular'">
          <option *ngFor="let profileOption of availableProfiles" [value]="profileOption">
            {{ profileOption }}
          </option>
        </select>
      </div>

      <div class="profile-card" [attr.data-profile]="simulatedProfile?.perfil">
        <div class="profile-header">
          <span class="profile-badge" [style.background-color]="getProfileColor()">
            {{ simulatedProfile?.perfil }}
          </span>
          <span class="profile-score">Pontuação: {{ simulatedProfile?.pontuacao }}</span>
        </div>

        <p class="profile-description" [attr.aria-label]="'Descrição do perfil: ' + simulatedProfile?.descricao">
          {{ simulatedProfile?.descricao }}
        </p>

        <div class="profile-details">
          <div class="detail-item">
            <span class="detail-label">Cliente ID:</span>
            <span class="detail-value">{{ simulatedProfile?.clienteId }}</span>
          </div>
        </div>
      </div>

      <div class="profile-explanation" *ngIf="simulatedProfile">
        <h4 class="explanation-title">Sobre este perfil</h4>
        <p>{{ getProfileExplanation() }}</p>
      </div>
    </div>
  `,
  styles: [`
    .risk-profile-container {
      width: 100%;
    }

    .risk-title {
      font-size: 1.25rem;
      color: #003366;
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .profile-selector {
      margin-bottom: 1.5rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
      border: 1px solid #e0e0e0;
    }

    .selector-label {
      display: block;
      font-size: 0.9rem;
      color: #003366;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }

    .profile-select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #003366;
      border-radius: 6px;
      background: white;
      color: #003366;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: border-color 0.3s, box-shadow 0.3s;
    }

    .profile-select:hover {
      border-color: #004080;
    }

    .profile-select:focus {
      outline: none;
      border-color: #FF6600;
      box-shadow: 0 0 0 3px rgba(255, 102, 0, 0.1);
    }

    .profile-card {
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 8px;
      padding: 1.5rem;
      margin-bottom: 1rem;
      border-left: 4px solid;
    }

    .profile-card[data-profile="Conservador"] {
      border-left-color: #4CAF50;
    }

    .profile-card[data-profile="Moderado"] {
      border-left-color: #FF9800;
    }

    .profile-card[data-profile="Agressivo"] {
      border-left-color: #F44336;
    }

    .profile-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .profile-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 20px;
      color: white;
      font-weight: 600;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .profile-score {
      font-size: 0.9rem;
      color: #666;
      font-weight: 500;
    }

    .profile-description {
      color: #333;
      line-height: 1.6;
      margin-bottom: 1rem;
    }

    .profile-details {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .detail-item {
      display: flex;
      justify-content: space-between;
      padding: 0.5rem 0;
      border-top: 1px solid #e0e0e0;
    }

    .detail-label {
      font-weight: 500;
      color: #666;
    }

    .detail-value {
      color: #003366;
      font-weight: 600;
    }

    .profile-explanation {
      background: #f8f9fa;
      border-radius: 8px;
      padding: 1rem;
      margin-top: 1rem;
    }

    .explanation-title {
      font-size: 1rem;
      color: #003366;
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .profile-explanation p {
      color: #666;
      line-height: 1.6;
      margin: 0;
    }

    /* Tablet */
    @media (min-width: 768px) and (max-width: 1024px) {
      .risk-title {
        font-size: 1.15rem;
      }

      .profile-selector {
        padding: 0.875rem;
        margin-bottom: 1.25rem;
      }

      .selector-label {
        font-size: 0.85rem;
      }

      .profile-select {
        padding: 0.65rem;
        font-size: 0.95rem;
      }

      .profile-card {
        padding: 1.25rem;
      }

      .profile-badge {
        font-size: 0.85rem;
        padding: 0.45rem 0.9rem;
      }

      .profile-score {
        font-size: 0.85rem;
      }
    }

    /* Mobile */
    @media (max-width: 767px) {
      .risk-title {
        font-size: 1.1rem;
        margin-bottom: 0.75rem;
      }

      .profile-selector {
        padding: 0.75rem;
        margin-bottom: 1rem;
      }

      .selector-label {
        font-size: 0.8rem;
        margin-bottom: 0.4rem;
      }

      .profile-select {
        padding: 0.6rem;
        font-size: 0.9rem;
      }

      .profile-card {
        padding: 1rem;
        margin-bottom: 0.75rem;
      }

      .profile-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.75rem;
        margin-bottom: 0.75rem;
      }

      .profile-badge {
        font-size: 0.8rem;
        padding: 0.4rem 0.8rem;
      }

      .profile-score {
        font-size: 0.85rem;
        width: 100%;
      }

      .profile-description {
        font-size: 0.9rem;
        line-height: 1.5;
        margin-bottom: 0.75rem;
      }

      .profile-details {
        gap: 0.4rem;
      }

      .detail-item {
        padding: 0.4rem 0;
        flex-direction: column;
        gap: 0.25rem;
      }

      .detail-label {
        font-size: 0.85rem;
      }

      .detail-value {
        font-size: 0.9rem;
      }

      .profile-explanation {
        padding: 0.75rem;
        margin-top: 0.75rem;
      }

      .explanation-title {
        font-size: 0.95rem;
        margin-bottom: 0.4rem;
      }

      .profile-explanation p {
        font-size: 0.85rem;
        line-height: 1.5;
      }
    }
  `]
})
export class RiskProfileComponent implements OnInit, OnChanges {
  @Input() profile: Profile | null = null;
  @Output() profileChange = new EventEmitter<RiskProfile>();

  availableProfiles: RiskProfile[] = ['Conservador', 'Moderado', 'Agressivo'];
  selectedProfile: RiskProfile = 'Moderado';
  simulatedProfile: Profile | null = null;

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    if (this.profile) {
      this.selectedProfile = this.profile.perfil;
      this.simulatedProfile = this.profile;
    } else {
      // Se não houver perfil inicial, criar um padrão
      this.createSimulatedProfile(this.selectedProfile);
    }
  }

  ngOnChanges(): void {
    if (this.profile) {
      this.selectedProfile = this.profile.perfil;
      this.simulatedProfile = this.profile;
    }
  }

  onProfileChange(perfil: RiskProfile): void {
    this.selectedProfile = perfil;
    this.createSimulatedProfile(perfil);
    this.profileChange.emit(perfil);
  }

  private createSimulatedProfile(perfil: RiskProfile): void {
    const clienteId = this.profile?.clienteId || 123;
    const pontuacoes: Record<RiskProfile, number> = {
      'Conservador': 45,
      'Moderado': 65,
      'Agressivo': 85
    };

    this.simulatedProfile = {
      clienteId: clienteId,
      perfil: perfil,
      descricao: this.profileService.getPerfilDescription(perfil),
      pontuacao: pontuacoes[perfil]
    };
  }

  getProfileColor(): string {
    if (!this.simulatedProfile) return '#666';
    return this.profileService.getPerfilColor(this.simulatedProfile.perfil);
  }

  getProfileExplanation(): string {
    if (!this.simulatedProfile) return '';
    return this.profileService.getPerfilDescription(this.simulatedProfile.perfil);
  }
}


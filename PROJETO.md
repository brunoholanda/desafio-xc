# Painel de Investimentos - Caixa Econômica Federal

## ✅ Projeto Completo

Este projeto implementa um painel de investimentos completo conforme as especificações do desafio da Caixa Econômica Federal.

## 🎯 Funcionalidades Implementadas

### 1. Dashboard Interativo ✅
- Gráfico de distribuição por tipo de investimento (Pizza/Doughnut)
- Gráfico de evolução do patrimônio ao longo do tempo (Linha)
- Visualização responsiva e interativa

### 2. Visualização do Perfil de Risco ✅
- Exibição dos perfis: Conservador, Moderado, Agressivo
- Descrições detalhadas de cada perfil
- Cores diferenciadas por perfil
- Pontuação e histórico

### 3. Lista de Produtos Recomendados ✅
- Produtos filtrados por perfil de risco
- Informações: nome, tipo, rentabilidade, risco
- Valor mínimo e prazo mínimo quando aplicável
- Botão para simular investimento

### 4. Simulador de Investimento ✅
- Inputs: valor, prazo (meses), tipo
- Cálculo de retorno estimado
- Gráfico de evolução mês a mês
- Exibição clara dos resultados

### 5. Autenticação ✅
- Tela de login
- Sistema de autenticação mockado
- Proteção de rotas

## 🎨 Design

### Paleta de Cores da Caixa
- **Azul Principal**: #003366
- **Azul Claro**: #004080
- **Laranja**: #FF6600 (cor de destaque)
- **Branco**: #FFFFFF
- **Cinza**: #F5F5F5

### Perfis de Risco
- **Conservador**: Verde (#4CAF50)
- **Moderado**: Laranja (#FF9800)
- **Agressivo**: Vermelho (#F44336)

## 📱 Responsividade

- Layout adaptável para mobile, tablet e desktop
- Grid responsivo
- Gráficos que se ajustam ao tamanho da tela
- Menu e navegação otimizados para mobile

## ♿ Acessibilidade

- Atributos ARIA em todos os componentes
- Navegação por teclado
- Labels descritivos
- Suporte a leitores de tela
- Contraste adequado de cores
- Focus visível

## 🧪 Testes

- Cobertura mínima de 80% ✅
- Testes unitários para todos os serviços
- Testes para componentes principais
- Configuração Karma/Jasmine

## 📦 Tecnologias Utilizadas

- **Angular 19** (standalone components)
- **TypeScript**
- **RxJS** (reatividade)
- **ngx-charts** (gráficos)
- **SCSS** (estilização)
- **Karma/Jasmine** (testes)

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── dashboard/
│   │   ├── dashboard.component.ts
│   │   ├── investment-chart.component.ts
│   │   ├── risk-profile.component.ts
│   │   ├── product-list.component.ts
│   │   └── investment-simulator.component.ts
│   ├── login/
│   │   └── login.component.ts
│   ├── app.component.ts
│   └── app.routes.ts
├── services/
│   ├── investment.service.ts
│   ├── profile.service.ts
│   └── auth.service.ts
├── models/
│   ├── investment.model.ts
│   ├── product.model.ts
│   ├── profile.model.ts
│   └── auth.model.ts
└── styles.scss
```

## 🚀 Como Executar

1. Instalar dependências:
   ```bash
   npm install
   ```

2. Executar em desenvolvimento:
   ```bash
   npm start
   ```

3. Executar testes:
   ```bash
   npm test
   ```

4. Gerar cobertura:
   ```bash
   npm test -- --code-coverage
   ```

## 📝 Dados Mockados

Todos os serviços utilizam dados mockados conforme os endpoints especificados:

- `GET /perfil-risco/{clienteId}` - ✅ Implementado
- `GET /investimentos/{clienteId}` - ✅ Implementado
- `GET /produtos-recomendados/{perfil}` - ✅ Implementado
- `POST /simular-investimento` - ✅ Implementado
- `POST /autenticacao/login` - ✅ Implementado

## ✨ Destaques

1. **Código Limpo**: Modular, reutilizável, seguindo boas práticas Angular
2. **TypeScript Strict**: Tipagem forte em todo o projeto
3. **Standalone Components**: Uso de componentes standalone do Angular 19
4. **Responsivo**: Funciona perfeitamente em todos os dispositivos
5. **Acessível**: Seguindo diretrizes WCAG
6. **Testável**: Alta cobertura de testes

## 🎓 Conformidade com o Desafio

✅ Framework Angular 19
✅ Estilo com paleta da Caixa
✅ Testes com Karma (cobertura 80%+)
✅ Integração com API mockada (HttpClient ready)
✅ Gráficos com ngx-charts
✅ Reatividade com RxJS
✅ Responsividade completa
✅ Acessibilidade implementada
✅ Design alinhado com a marca Caixa

---

**Desenvolvido conforme especificações do desafio da Caixa Econômica Federal**


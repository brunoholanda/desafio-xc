# Painel de Investimentos - Caixa Econômica Federal

Aplicação web desenvolvida em Angular 19 para análise de comportamento financeiro do cliente e ajuste automático do perfil de risco, sugerindo produtos de investimento adequados.

## 🚀 Funcionalidades

- **Dashboard Interativo**: Gráficos de evolução dos investimentos, distribuição por tipo de produto e histórico de perfil de risco
- **Visualização do Perfil de Risco**: Exibição clara dos perfis Conservador, Moderado e Agressivo
- **Lista de Produtos Recomendados**: Produtos de investimento filtrados por perfil de risco
- **Simulador de Investimento**: Simulação de retorno com base em valor, prazo e tipo
- **Responsividade**: Layout adaptável para mobile e desktop
- **Acessibilidade**: Suporte a leitores de tela e navegação por teclado

## 🛠️ Tecnologias

- Angular 19
- Angular Material
- ngx-charts (gráficos)
- RxJS
- TypeScript
- Karma/Jasmine (testes)

## 📦 Instalação

```bash
npm install
```

## 🏃 Executar

```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200`

## 🧪 Testes

```bash
npm test
```

Para gerar relatório de cobertura:

```bash
npm test -- --code-coverage
```

## 📁 Estrutura do Projeto

```
src/app/
├── dashboard/
│   ├── dashboard.component.ts
│   ├── investment-chart.component.ts
│   ├── risk-profile.component.ts
│   ├── product-list.component.ts
│   └── investment-simulator.component.ts
├── services/
│   ├── investment.service.ts
│   ├── profile.service.ts
│   └── auth.service.ts
└── models/
    ├── investment.model.ts
    ├── product.model.ts
    └── profile.model.ts
```

## 🎨 Design

A aplicação utiliza a paleta de cores da Caixa Econômica Federal:
- Azul (#003366) - Cor principal
- Laranja (#FF6600) - Cor de destaque
- Branco (#FFFFFF) - Fundo
- Cinza (#F5F5F5) - Fundo secundário

## 📝 Notas

Esta aplicação utiliza dados mockados para demonstração, já que o foco é no frontend. Os serviços simulam as chamadas à API conforme os endpoints especificados no desafio.


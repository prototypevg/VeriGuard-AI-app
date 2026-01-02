# VeriGuard AI - Product Requirements Document

## Visão Geral
**VeriGuard AI** é uma plataforma SaaS B2B antifraude focada em criar "Confiança Digital" através de "Evidence Packs" (provas digitais imutáveis para disputas legais).

## Problem Statement
Empresas digitais enfrentam fraudes como chargebacks fraudulentos, clonagem de produtos, lavagem de dinheiro e account takeover. O VeriGuard AI oferece uma solução integrada para três perfis de usuários.

## Personas/Dashboards

### 1. Vendedores Digitais
**Objetivo:** Proteger produtos digitais, prevenir clonagem/impersonação e reduzir chargebacks.

**Features:**
- Cadastro de Produtos
- Validação IA
- Testes de Segurança
- Modo Auditoria
- Gerenciamento de Evidence Packs
- Proteção de Conta

### 2. Marketplaces
**Objetivo:** Onboarding de vendedores legítimos (KYC), monitoramento de saúde do ecossistema e filtragem de fraudadores.

**Features:**
- Auditorias de Sellers (KYC)
- Validação em Massa de Produtos
- Gerenciamento de Blacklist
- Simulação de Ataques
- Treinamento de IA

### 3. Bancos, Fintechs & Gateways
**Objetivo:** Combate à lavagem de dinheiro (AML) e segurança de transações financeiras.

**Features:**
- Análise Aprofundada de Transações
- Histórico de Alertas
- Relatórios Regulatórios (BACEN/COAF)
- Integrações API
- Compliance LGPD

## Tech Stack
- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, Recharts
- **Animations:** Framer Motion
- **Deployment:** GitHub Pages via GitHub Actions

## Status do Projeto

### ✅ Implementado (Janeiro 2025)
- [x] Tela de seleção de perfil com 3 opções
- [x] Dashboard Vendedores completo com todas as features do PRD
- [x] Dashboard Marketplaces completo com todas as features do PRD
- [x] Dashboard Bancos completo com todas as features do PRD
- [x] Logo customizado integrado
- [x] Botão "Central de Ajuda" removido da tela de login
- [x] Configuração para GitHub Pages
- [x] GitHub Actions workflow para deploy automático
- [x] Modais para todas as ações (shells visuais)
- [x] Gráficos interativos com Recharts
- [x] Dark mode toggle
- [x] Responsividade básica (desktop/mobile sidebar)
- [x] Cards de gamificação (Selo Ouro, Marketplace Verificado, Compliance Nível A)

### 🔄 Próximas Tarefas (P1)
- [ ] Implementar Backend FastAPI para APIs reais
- [ ] Funcionalidade real dos modais (não apenas shells)
- [ ] Sistema de autenticação funcional

### 📋 Backlog (P2-P3)
- [ ] Background animado com partículas na tela de login
- [ ] Responsividade completa para mobile
- [ ] Exportar Evidence Packs (PDF/JSON)
- [ ] Funcionalidade de compartilhamento
- [ ] Integração real com blockchain para Evidence Packs

## Arquitetura de Arquivos

```
/app/
├── .github/workflows/deploy.yml   # GitHub Actions
├── public/
├── src/
│   ├── assets/logo.png           # Logo VeriGuard
│   ├── components/
│   │   ├── dashboards/
│   │   │   ├── VendedoresDashboardNew.tsx
│   │   │   ├── MarketplacesDashboard.tsx
│   │   │   └── BancosDashboard.tsx
│   │   ├── modals/               # Modais de ações
│   │   ├── Login.tsx             # Seleção de perfil
│   │   └── ProfileDropdown.tsx
│   ├── App.tsx
│   └── main.tsx
├── vite.config.ts
└── package.json
```

## Notas de Deploy

Para deploy no GitHub Pages:
1. Salvar código no GitHub ("Save to GitHub")
2. No repositório, ir em Settings > Pages
3. Configurar Source para "GitHub Actions"
4. O workflow será executado automaticamente

## Observações

- **Aplicação Frontend-Only:** Todos os dados são estáticos/mockados
- **Modais são shells visuais:** Não executam ações reais
- **Login não é funcional:** Clicar em um perfil navega diretamente ao dashboard

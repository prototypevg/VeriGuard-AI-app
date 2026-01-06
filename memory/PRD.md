# VeriGuard AI - Product Requirements Document

## Visão Geral
**VeriGuard AI** é uma plataforma SaaS B2B antifraude focada em criar "Confiança Digital" através de "Evidence Packs" (provas digitais imutáveis para disputas legais).

## Problem Statement
Empresas digitais enfrentam fraudes como chargebacks fraudulentos, clonagem de produtos, lavagem de dinheiro e account takeover. O VeriGuard AI oferece uma solução integrada para três perfis de usuários.

## Personas/Dashboards

### 1. Vendedores Digitais (12 funções no menu)
**Objetivo:** Proteger produtos digitais, prevenir clonagem/impersonação e reduzir chargebacks.

**Features:**
- Cadastrar Produto
- Histórico
- Defesa Técnica
- **Proteção de Marca** ✨ NEW - Monitora perfis falsos, sites clones e anúncios fraudulentos
- **Sistema Anti-Clone** ✨ NEW - Detecta cópias dos produtos com hash de verificação
- **Monitor de Concorrentes** ✨ NEW - Identifica fraudes e cópias com análise de preços
- Relatórios
- Integrações
- Modo Auditoria
- Treinamento IA
- SLA & Performance
- Central de Ajuda

### 2. Marketplaces (14 funções no menu)
**Objetivo:** Onboarding de vendedores legítimos (KYC), monitoramento de saúde do ecossistema e filtragem de fraudadores.

**Features:**
- Auditar Seller (KYC)
- Validar Produto (IA)
- Itens Bloqueados
- **Gestão Blacklist** ✨ NEW - Gerencia CPFs, CNPJs, Emails, Telefones e IPs bloqueados
- **Reviews Falsos** ✨ NEW - IA detecta avaliações fraudulentas e review bombs
- **Detecção Multi-Contas** ✨ NEW - Identifica clusters de contas vinculadas por IP/device
- **Vendedores Golpistas** ✨ NEW - Score de risco e alertas para sellers fraudulentos
- **Produtos Falsos** ✨ NEW - IA analisa imagens e preços para detectar falsificações
- Simulação de Ataques
- SLA & Performance
- Modo Auditoria
- Histórico
- Relatórios
- Central de Ajuda

### 3. Bancos, Fintechs & Gateways (10 funções no menu)
**Objetivo:** Combate à lavagem de dinheiro (AML) e segurança de transações financeiras.

**Features:**
- **Central AML** ✨ NEW - Anti-Money Laundering com casos de Smurfing, Layering, Trade-Based
- **Monitor PIX** ✨ NEW - Detecção em tempo real de transações PIX suspeitas
- **Fraude de Cartões** ✨ NEW - Monitoramento de transações com score de risco
- **Contas Suspeitas** ✨ NEW - Gerenciamento de contas com comportamento anômalo
- **KYC Bancário** ✨ NEW - Validação de identidade PF/PJ com score IA
- Simulação de Ataques
- Modo Auditoria
- SLA & Performance
- Treinamento IA
- Central de Ajuda

## Tech Stack
- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, Recharts
- **Animations:** Framer Motion
- **Deployment:** GitHub Pages via GitHub Actions

## Status do Projeto

### ✅ Implementado (Janeiro 2025)
- [x] Tela de seleção de perfil com 3 opções
- [x] Dashboard Vendedores com 12 funções e 3 novos modais antifraude
- [x] Dashboard Marketplaces com 14 funções e 5 novos modais antifraude
- [x] Dashboard Bancos com 10 funções e 5 novos modais antifraude
- [x] Logo customizado integrado
- [x] Botão "Central de Ajuda" removido da tela de login
- [x] Configuração para GitHub Pages
- [x] GitHub Actions workflow para deploy automático
- [x] Dark mode toggle
- [x] Cards de gamificação (Selo Ouro, Marketplace Verificado, Compliance Nível A)

### 🆕 Modais Antifraude Criados (Janeiro 2025)
**Bancos:**
- CentralAMLModal.tsx - Central de Anti-Lavagem de Dinheiro
- MonitorPIXModal.tsx - Monitor de transações PIX em tempo real
- FraudeCartoesModal.tsx - Detecção de fraude em cartões
- ContasSuspeitasModal.tsx - Gerenciamento de contas suspeitas
- KYCBancarioModal.tsx - Verificação KYC bancário

**Vendedores:**
- ProtecaoMarcaModal.tsx - Proteção de marca e identidade
- AntiCloneModal.tsx - Sistema anti-clone de produtos
- MonitorConcorrenteModal.tsx - Monitoramento de concorrentes

**Marketplaces:**
- BlacklistModal.tsx - Gestão de blacklist de fraudadores
- ReviewsFalsosModal.tsx - Detecção de reviews falsos
- MultiContasModal.tsx - Detecção de multi-contas
- VendedorGolpistaModal.tsx - Detecção de vendedores golpistas
- ProdutoFalsoModal.tsx - Detecção de produtos falsos

### 🔄 Próximas Tarefas (P1)
- [ ] Implementar Backend FastAPI para APIs reais
- [ ] Sistema de autenticação funcional
- [ ] Integração real com banco de dados

### 📋 Backlog (P2-P3)
- [ ] Background animado com partículas na tela de login
- [ ] Responsividade completa para mobile
- [ ] Exportar Evidence Packs (PDF/JSON)
- [ ] Integração real com blockchain para Evidence Packs

## Arquitetura de Arquivos

```
/app/
├── .github/workflows/deploy.yml
├── public/
├── src/
│   ├── assets/logo.png
│   ├── components/
│   │   ├── dashboards/
│   │   │   ├── VendedoresDashboardNew.tsx (12 funções)
│   │   │   ├── MarketplacesDashboard.tsx (14 funções)
│   │   │   └── BancosDashboard.tsx (10 funções)
│   │   ├── modals/
│   │   │   ├── CentralAMLModal.tsx ✨
│   │   │   ├── MonitorPIXModal.tsx ✨
│   │   │   ├── FraudeCartoesModal.tsx ✨
│   │   │   ├── ContasSuspeitasModal.tsx ✨
│   │   │   ├── KYCBancarioModal.tsx ✨
│   │   │   ├── ProtecaoMarcaModal.tsx ✨
│   │   │   ├── AntiCloneModal.tsx ✨
│   │   │   ├── MonitorConcorrenteModal.tsx ✨
│   │   │   ├── BlacklistModal.tsx ✨
│   │   │   ├── ReviewsFalsosModal.tsx ✨
│   │   │   ├── MultiContasModal.tsx ✨
│   │   │   ├── VendedorGolpistaModal.tsx ✨
│   │   │   ├── ProdutoFalsoModal.tsx ✨
│   │   │   └── ... (outros modais existentes)
│   │   ├── Login.tsx
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
- **Modais são funcionais:** Permitem interações como filtrar, bloquear, aprovar
- **Login não é funcional:** Clicar em um perfil navega diretamente ao dashboard

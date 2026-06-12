# 🙏 LUMINA - Aplicativo Espiritual Cristão Completo

> Um ecossistema espiritual moderno, seguro e inspirador para a comunidade cristã.

## 📱 O que é Lumina?

Lumina é um aplicativo mobile completo (iOS e Android) que une:
- 📖 **Bíblia Completa** com múltiplas versões e reflexões por IA
- 🎬 **Feed de Vídeos** estilo TikTok com conteúdo cristão
- 🤖 **Hub de IA** integrado (ChatGPT, Gemini, Qwen, Leonardo AI, etc.)
- 📤 **Publicação em Redes Sociais** (Instagram, TikTok, YouTube, Facebook, X)
- ✨ **Design Sofisticado** com paleta ouro, branco e azul profundo

---

## 🏗️ Arquitetura do Projeto

```
lumina/
├── backend/                    # API Node.js/Express
│   ├── src/
│   │   ├── modules/           # Módulos de negócio
│   │   ├── services/          # Serviços (IA, BD, Auth)
│   │   ├── controllers/        # Controllers das APIs
│   │   ├── models/            # Schemas do banco
│   │   ├── middlewares/        # Auth, validation, cors
│   │   ├── config/            # Variáveis de ambiente
│   │   └── utils/             # Utilitários
│   ├── migrations/            # Migrações PostgreSQL
│   ├── .env.example           # Variáveis de ambiente
│   └── package.json
│
├── mobile/                     # React Native (iOS + Android)
│   ├── src/
│   │   ├── modules/
│   │   │   ├── bible/         # Módulo Bíblia
│   │   │   ├── feed/          # Módulo Feed
│   │   │   ├── ai-hub/        # Módulo IA
│   │   │   ├── social/        # Integração redes
│   │   │   └── profile/       # Perfil do usuário
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── navigation/        # Navegação (5 abas)
│   │   ├── services/          # API client
│   │   ├── utils/             # Utilitários
│   │   └── App.tsx
│   ├── app.json               # Config Expo
│   └── package.json
│
├── database/                  # Scripts PostgreSQL
│   ├── schema.sql             # Schemas completos
│   ├── seeds.sql              # Dados iniciais
│   └── migrations/
│
├── docs/                      # Documentação
│   ├── API.md                 # Endpoints da API
│   ├── DATABASE.md            # Estrutura BD
│   ├── DEPLOYMENT.md          # Deploy (AWS/Vercel)
│   ├── ROADMAP.md             # Fases de desenvolvimento
│   └── ARCHITECTURE.md        # Arquitetura detalhada
│
├── .github/                   # GitHub Actions (CI/CD)
│   └── workflows/
│       ├── backend-tests.yml
│       └── mobile-build.yml
│
└── docker-compose.yml         # Stack local (PostgreSQL + Redis)
```

---

## 🎯 Módulos Implementados

### 1️⃣ Módulo Bíblia
- ✅ Bíblia completa (ARC, NVI, KJV)
- ✅ Busca por livro, capítulo, versículo, palavra-chave
- ✅ Reflexões por IA (ChatGPT, Gemini)
- ✅ Imagens devocional bonitas (Leonardo AI)
- ✅ Compartilhamento como imagem

### 2️⃣ Módulo Feed de Vídeos
- ✅ Feed vertical estilo TikTok
- ✅ Algoritmo de recomendação personalizado
- ✅ Curtidas, comentários, compartilhamento
- ✅ Sistema de seguidores
- ✅ Gravação e edição no app

### 3️⃣ Hub de IA
- ✅ Integração ChatGPT (OpenAI)
- ✅ Integração Gemini (Google)
- ✅ Integração Qwen (Alibaba)
- ✅ Integração Leonardo AI (imagens)
- ✅ Integração ElevenLabs (áudio)
- ✅ Interface unificada

### 4️⃣ Publicação em Redes Sociais
- ✅ Agendamento de posts
- ✅ OAuth 2.0 (Instagram, TikTok, YouTube, Facebook, X)
- ✅ Calendário editorial
- ✅ Notificações de publicação

### 5️⃣ Experiência Visual
- ✅ Design sofisticado (ouro, branco, azul profundo)
- ✅ Modo escuro
- ✅ Animações suaves
- ✅ Navegação em 5 abas: Bíblia | Feed | Criar | IA Hub | Perfil

---

## 🚀 Quick Start

### Backend (Node.js + Express)

```bash
cd backend
npm install
cp .env.example .env
# Edite .env com suas credenciais
npm run dev
```

API rodará em `http://localhost:3000`

### Mobile (React Native + Expo)

```bash
cd mobile
npm install
npx expo start
# Pressione 'i' para iOS ou 'a' para Android
```

### Database (PostgreSQL + Docker)

```bash
docker-compose up -d postgres redis
npm run migrate
```

---

## 🔐 Segurança & Compliance

- ✅ Autenticação JWT segura
- ✅ Chaves de API no backend (nunca expostas)
- ✅ Moderação automatizada de conteúdo
- ✅ HTTPS/TLS para todas as comunicações
- ✅ LGPD/GDPR compliant
- ✅ Rate limiting e DDoS protection

---

## 📊 Stack Técnico

| Camada | Tecnologia | Motivo |
|--------|-----------|--------|
| **Mobile** | React Native (Expo) | iOS + Android com código único |
| **Backend** | Node.js + Express | Rápido, escalável, suporta WebSockets |
| **Database** | PostgreSQL | Relacional, confiável, JSONB para flexibilidade |
| **Cache** | Redis | Sessões, feed, recomendações em tempo real |
| **Storage** | AWS S3 / Cloudflare R2 | Vídeos, imagens, CDN global |
| **Auth** | Firebase Auth / Supabase | OAuth integrado, 2FA |
| **IA** | OpenAI, Google, Alibaba | APIs públicas, cada uma com seu force |
| **CI/CD** | GitHub Actions | Automático, integrado no GitHub |
| **Deploy** | AWS EC2 + RDS ou Vercel | Escalável, automático |

---

## 📚 Documentação

Consulte os arquivos em `/docs`:
- **[API.md](./docs/API.md)** - Todos os endpoints detalhados
- **[DATABASE.md](./docs/DATABASE.md)** - Schema completo do PostgreSQL
- **[DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Deploy em produção
- **[ROADMAP.md](./docs/ROADMAP.md)** - Fases de desenvolvimento
- **[ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - Decisões técnicas

---

## 🔑 Variáveis de Ambiente Necessárias

```env
# Backend
NODE_ENV=development
PORT=3000
DATABASE_URL=postgresql://user:pass@localhost:5432/lumina
REDIS_URL=redis://localhost:6379

# Authentication
JWT_SECRET=sua_chave_jwt_super_segura
FIREBASE_API_KEY=xxx

# IAs
OPENAI_API_KEY=sk-...
GOOGLE_GEMINI_KEY=xxx
ALIBABA_QWEN_KEY=xxx
LEONARDO_AI_KEY=xxx
ELEVENLABS_KEY=xxx

# Redes Sociais (OAuth)
INSTAGRAM_CLIENT_ID=xxx
INSTAGRAM_CLIENT_SECRET=xxx
TIKTOK_CLIENT_ID=xxx
TIKTOK_CLIENT_SECRET=xxx
# ... mais plataformas

# Storage
AWS_ACCESS_KEY_ID=xxx
AWS_SECRET_ACCESS_KEY=xxx
AWS_S3_BUCKET=lumina-videos
```

---

## 📞 Suporte & Contribuição

Este é um projeto mantido pela comunidade cristã. Contribuições são bem-vindas!

---

## ⚖️ Licença

MIT License - Use livremente, distribua, modifique. Apenas dê crédito.

---

**Construído com ❤️ para a comunidade cristã** | Versão 1.0.0-alpha

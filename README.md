# CondoServices - Recomendações entre Vizinhos

Aplicativo mobile-first para organizar recomendações de prestadores de serviço entre vizinhos de um condomínio, substituindo as indicações perdidas no grupo de WhatsApp.

## 🚀 Funcionalidades

- **Catálogo de Prestadores**: Lista de prestadores de serviço organizados por categoria
- **Recomendações**: Vizinhos podem recomendar e avaliar prestadores
- **Busca Inteligente**: Filtros por categoria, nome e tags
- **Perfil de Usuário**: Histórico de recomendações e favoritos
- **Sistema de Avaliação**: Classificação por estrelas e comentários
- **Mobile-First**: Design otimizado para dispositivos móveis

## 📱 Categorias de Serviços

- 🧹 Limpeza
- 🔧 Manutenção
- 🏗️ Reforma
- 🌿 Jardinagem
- 🎨 Pintura
- ⚡ Elétrica
- 💧 Hidráulica
- 🔒 Segurança
- 📦 Entrega
- 📋 Outros

## 🛠 Tecnologias

- **Frontend**: React 18 + TypeScript + Vite
- **Estilos**: Tailwind CSS
- **Gerenciamento de Estado**: Zustand
- **Roteamento**: React Router DOM
- **Consultas**: TanStack Query (React Query)
- **Ícones**: Lucide React
- **Data**: Date-fns

## 📂 Estrutura do Projeto

```
condo-services/
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── ui/             # Componentes de UI (Button, Input, Card, etc.)
│   │   ├── Header.tsx      # Cabeçalho da aplicação
│   │   ├── Navigation.tsx  # Navegação inferior
│   │   ├── RecommendationCard.tsx
│   │   ├── ProviderCard.tsx
│   │   ├── SearchBar.tsx
│   │   └── ServiceCategoryFilter.tsx
│   │
│   ├── pages/              # Páginas da aplicação
│   │   ├── HomePage.tsx
│   │   ├── SearchPage.tsx
│   │   ├── RecommendPage.tsx
│   │   ├── ProvidersPage.tsx
│   │   ├── ProfilePage.tsx
│   │   └── FavoritesPage.tsx
│   │
│   ├── store/              # Gerenciamento de estado
│   │   ├── useAuthStore.ts
│   │   └── useAppStore.ts
│   │
│   ├── hooks/              # Hooks personalizados
│   │   ├── useAuth.ts
│   │   ├── useCondominiums.ts
│   │   ├── useProviders.ts
│   │   └── useRecommendations.ts
│   │
│   ├── services/           # Serviços e API
│   │   ├── api.ts          # Funções de API
│   │   └── mockData.ts     # Dados mock para desenvolvimento
│   │
│   ├── types/              # Tipos TypeScript
│   │   └── index.ts
│   │
│   ├── utils/              # Funções utilitárias
│   │
│   ├── App.tsx            # Componente principal
│   ├── main.tsx           # Ponto de entrada
│   └── index.css          # Estilos globais
│
├── package.json
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 🏃‍♂️ Como Executar

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalação

```bash
# Clonar o repositório
git clone https://github.com/danmotames/github-copilotcli.git
cd github-copilotcli

# Instalar dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`

### Build para Produção

```bash
npm run build
npm run preview
```

## 🎨 Design

### Paleta de Cores

- **Primária**: Azul (#3b82f6)
- **Secundária**: Verde (#22c55e)
- **Fundo**: Cinza claro (#f9fafb)
- **Texto**: Cinza escuro (#1f2937)

### Tipografia

- **Fonte**: Inter (Google Fonts)
- **Tamanhos**: Responsivos para mobile e desktop

## 📱 Mobile-First

O aplicativo foi projetado com foco em dispositivos móveis:

- Navegação inferior fixa
- Toques e gestos intuitivos
- Layout responsivo
- Botões e elementos de fácil interação
- Safe area para iOS

## 🔧 Configuração do Firebase (Opcional)

Para usar o Firebase como backend real:

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Habilite Authentication, Firestore e Storage
3. Crie um arquivo `.env` com suas credenciais:

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

4. Atualize o arquivo `src/services/api.ts` para usar o Firebase

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

- Reportar bugs
- Sugerir novas funcionalidades
- Enviar pull requests

## 📄 Licença

MIT

---

Desenvolvido para facilitar a vida em condomínio! 🏢✨

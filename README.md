# 🎮 Web Learning Games

Uma plataforma de jogos educativos moderna e interativa para aprender HTML, CSS e JavaScript de forma divertida e envolvente.

![Web Learning Games](https://img.shields.io/badge/Status-Conclu%C3%ADdo-brightgreen) ![React](https://img.shields.io/badge/React-19.1.0-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue) ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-blue)

## 🌟 Características

- **Interface Moderna**: Design glassmorphism com gradientes e animações suaves
- **Totalmente Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Gamificação**: Sistema de pontuação, níveis progressivos e feedback instantâneo
- **Aprendizado Interativo**: Três jogos cuidadosamente desenvolvidos para ensinar fundamentos web

## 🎯 Jogos Disponíveis

### 1. 🏗️ Desafio HTML
- **Tipo**: Drag & Drop
- **Objetivo**: Associar tags HTML às suas categorias corretas
- **Dificuldade**: Iniciante
- **Tempo**: 10-15 minutos
- **Conceitos**: Estrutura HTML, semântica, elementos básicos

### 2. 🎨 CSS Selector Master
- **Tipo**: Seleção de elementos
- **Objetivo**: Identificar elementos HTML usando seletores CSS
- **Dificuldade**: Intermediário
- **Tempo**: 15-20 minutos
- **Conceitos**: Seletores CSS, especificidade, pseudo-elementos

### 3. ⚡ JavaScript Logic Puzzle
- **Tipo**: Quiz interativo
- **Objetivo**: Completar códigos e resolver desafios de lógica
- **Dificuldade**: Intermediário
- **Tempo**: 20-25 minutos
- **Conceitos**: Lógica JavaScript, sintaxe, resolução de problemas

## 🚀 Tecnologias Utilizadas

- **Frontend**: React 19.1.0 com TypeScript 5.8.3
- **Styling**: Tailwind CSS 3.4.1
- **Animações**: Framer Motion 12.23.6
- **Ícones**: Lucide React 0.525.0
- **Build**: Vite 7.0.4
- **Lint**: ESLint 9.31.0

## 🎨 Design System

### Cores
- **Primárias**: Azul (#3b82f6) e Roxo (#9333ea)
- **Secundárias**: Verde (#22c55e), Amarelo (#f59e0b), Vermelho (#ef4444)
- **Neutras**: Gradientes de cinza com opacidade

### Componentes
- **Glassmorphism**: Efeitos de vidro com backdrop-blur
- **Gradientes**: Transições suaves entre cores
- **Animações**: Bounce, slide, fade, pulse, shake
- **Responsividade**: Mobile-first design

## 📦 Instalação

### Pré-requisitos
- Node.js 18.0.0 ou superior
- npm 9.0.0 ou superior

### Passos

1. **Clone o repositório**
   ```bash
   git clone <repository-url>
   cd web-learning-games
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   ```
   http://localhost:5173
   ```

## 🛠️ Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Gera a versão de produção
- `npm run preview` - Visualiza a versão de produção
- `npm run lint` - Executa o linter

## 📱 Responsividade

A aplicação foi desenvolvida com abordagem mobile-first e é totalmente responsiva:

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎯 Funcionalidades Implementadas

### ✅ Sistema de Pontuação
- Cálculo automático de pontuação por jogo
- Média geral de performance
- Persistência no localStorage
- Feedback visual por performance

### ✅ Gamificação
- Níveis progressivos de dificuldade (3 níveis no HTML)
- Conquistas e troféus
- Animações de sucesso/erro
- Progresso visual em tempo real
- Transições suaves entre níveis

### ✅ Interface Moderna
- Design glassmorphism com efeitos de vidro
- Animações suaves (bounce, fade, shake)
- Gradientes coloridos dinâmicos
- Ícones interativos da Lucide React
- Layout responsivo mobile-first

### ✅ Acessibilidade
- Navegação por teclado
- Contraste adequado (WCAG 2.1)
- Textos descritivos e alt texts
- Feedback visual e auditivo
- Suporte a screen readers

### ✅ Drag & Drop Avançado
- Drag and drop nativo HTML5
- Feedback visual durante o arraste
- Prevenção de bugs de posicionamento
- Suporte touch para dispositivos móveis
- Embaralhamento inteligente de tags

### ✅ Performance
- Lazy loading de componentes
- Otimização de re-renders
- CSS vanilla para animações críticas
- Vite para build rápido
- Bundle size otimizado

## 🔧 Estrutura do Projeto

```
src/
├── components/           # Componentes React
│   ├── games/           # Jogos individuais
│   │   ├── HTMLDragDrop.tsx    # Drag & Drop HTML (3 níveis)
│   │   ├── CSSSelector.tsx     # Seletor CSS Master
│   │   └── JavaScriptQuiz.tsx  # Quiz JavaScript Logic
│   ├── GameCard.tsx     # Card de jogo com hover effects
│   ├── Header.tsx       # Cabeçalho responsivo
│   ├── HomePage.tsx     # Página inicial gamificada
│   └── ScoreDisplay.tsx # Exibição de pontuação avançada
├── data/                # Dados dos jogos
│   └── gameData.ts     # Desafios HTML/CSS/JS estruturados
├── types/               # Tipos TypeScript
│   └── index.ts        # Interfaces e types globais
├── App.tsx             # Componente principal com routing
├── index.css           # Estilos globais + Tailwind customizado
└── main.tsx           # Entry point com React 19
```

## 🚀 Melhorias Recentes

### v2.1.0 - Layout Otimizado
- ✅ **Drop zones compactas** - Altura fixa com scroll interno
- ✅ **Tags menores** - Elementos mais eficientes em espaço
- ✅ **Grid responsivo** - Melhor distribuição de componentes
- ✅ **Sem scroll excessivo** - Elementos sempre visíveis

### v2.0.0 - Embaralhamento Inteligente
- ✅ **Tags aleatórias** - Não seguem mais ordem das categorias
- ✅ **Re-embaralhamento** - Novo shuffle a cada reset/nível
- ✅ **Estado estável** - Sem mudanças durante o drag
- ✅ **Performance melhorada** - useEffect otimizado

### v1.9.0 - Drag & Drop Robusto
- ✅ **Eventos otimizados** - stopPropagation e preventDefault
- ✅ **Feedback visual** - Estados de hover, active e dragging
- ✅ **Compatibilidade touch** - Suporte completo mobile
- ✅ **CSS vanilla** - Sem dependência de @apply problemático

## 🎮 Como Jogar

### Desafio HTML
1. Arraste as tags HTML da coluna esquerda
2. Solte-as nas categorias corretas à direita
3. Receba feedback instantâneo
4. Complete todos os níveis

### CSS Selector Master
1. Analise o elemento HTML destacado
2. Selecione o seletor CSS correto
3. Avance pelos níveis de dificuldade
4. Domine os seletores complexos

### JavaScript Logic Puzzle
1. Leia o código JavaScript
2. Escolha a opção correta
3. Veja a explicação detalhada
4. Aprenda com os erros

## 🏆 Sistema de Pontuação

- **Excellent**: 90-100% (🎉)
- **Very Good**: 80-89% (👏)
- **Good**: 60-79% (👍)
- **Keep Practicing**: 0-59% (💪)

## 🌐 Compatibilidade

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor, leia o arquivo `CONTRIBUTING.md` para mais informações.

## 📞 Contato

Para dúvidas ou sugestões, entre em contato através de:
- Email: carmo@weblearninggames.com
- GitHub: [@carmo-dev](https://github.com/carmo-dev)
- LinkedIn: [Carlos Carmo](https://linkedin.com/in/carlos-carmo-dev)

---

**Desenvolvido com ❤️ para tornar o aprendizado de desenvolvimento web divertido e eficaz!**

## 🎯 Status do Projeto

- ✅ **HTML Drag & Drop Game** - Totalmente funcional com 3 níveis
- ✅ **CSS Selector Master** - Implementado com níveis progressivos  
- ✅ **JavaScript Logic Puzzle** - Quiz interativo completo
- ✅ **Sistema de Pontuação** - Funcionando perfeitamente
- ✅ **Interface Responsiva** - Testado em múltiplos dispositivos
- ✅ **Animações e Transições** - Todas implementadas
- ✅ **Feedback Visual** - Sistema completo de feedback
- ✅ **Embaralhamento Inteligente** - Tags aleatórias por nível
- ✅ **Layout Otimizado** - Sem necessidade de scroll excessivo

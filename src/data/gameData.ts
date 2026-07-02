import type { HTMLChallenge, CSSChallenge, JSChallenge } from '../types';

export const htmlChallenges: HTMLChallenge[] = [
  { id: '1', tag: '<h1>', description: 'Título principal da página', category: 'heading' },
  { id: '2', tag: '<p>', description: 'Parágrafo de texto', category: 'text' },
  { id: '3', tag: '<img>', description: 'Inserir uma imagem', category: 'media' },
  { id: '4', tag: '<a>', description: 'Criar um link', category: 'link' },
  { id: '5', tag: '<div>', description: 'Container genérico', category: 'container' },
  { id: '6', tag: '<span>', description: 'Elemento inline genérico', category: 'inline' },
  { id: '7', tag: '<ul>', description: 'Lista não ordenada', category: 'list' },
  { id: '8', tag: '<button>', description: 'Botão clicável', category: 'form' },
  { id: '9', tag: '<input>', description: 'Campo de entrada', category: 'input' },
  { id: '10', tag: '<nav>', description: 'Seção de navegação', category: 'semantic' },
];

export const htmlCategories = [
  { id: 'heading', name: 'Títulos', description: 'Tags para títulos e subtítulos' },
  { id: 'text', name: 'Texto', description: 'Tags para conteúdo textual' },
  { id: 'media', name: 'Mídia', description: 'Tags para imagens e vídeos' },
  { id: 'link', name: 'Links', description: 'Tags para navegação' },
  { id: 'container', name: 'Containers', description: 'Tags para organização' },
  { id: 'list', name: 'Listas', description: 'Tags para listas' },
  { id: 'form', name: 'Formulários', description: 'Tags para botões e formulários' },
  { id: 'input', name: 'Entrada', description: 'Tags para campos de entrada' },
  { id: 'inline', name: 'Inline', description: 'Tags para elementos inline' },
  { id: 'semantic', name: 'Semântica', description: 'Tags semânticas HTML5' },
];

export const cssChallenges: CSSChallenge[] = [
  {
    id: '1',
    selector: '#header',
    description: 'Selecionar elemento com ID "header"',
    element: '<div id="header">Cabeçalho</div>',
    difficulty: 'easy'
  },
  {
    id: '2',
    selector: '.button',
    description: 'Selecionar elementos com classe "button"',
    element: '<button class="button">Clique</button>',
    difficulty: 'easy'
  },
  {
    id: '3',
    selector: 'p',
    description: 'Selecionar todos os parágrafos',
    element: '<p>Este é um parágrafo</p>',
    difficulty: 'easy'
  },
  {
    id: '4',
    selector: 'div p',
    description: 'Selecionar parágrafos dentro de divs',
    element: '<div><p>Parágrafo filho</p></div>',
    difficulty: 'medium'
  },
  {
    id: '5',
    selector: '.nav > li',
    description: 'Selecionar li filhos diretos de .nav',
    element: '<ul class="nav"><li>Item</li></ul>',
    difficulty: 'medium'
  },
  {
    id: '6',
    selector: 'input[type="text"]',
    description: 'Selecionar inputs do tipo texto',
    element: '<input type="text" placeholder="Nome">',
    difficulty: 'hard'
  },
  {
    id: '7',
    selector: 'a:hover',
    description: 'Selecionar links quando hover',
    element: '<a href="#">Link com hover</a>',
    difficulty: 'hard'
  },
  {
    id: '8',
    selector: '.item:nth-child(2)',
    description: 'Selecionar o segundo elemento .item',
    element: '<div class="item">Segundo item</div>',
    difficulty: 'hard'
  },
];

export const jsChallenges: JSChallenge[] = [
  {
    id: '1',
    question: 'Como declarar uma variável em JavaScript?',
    code: '// Complete o código\n___ nome = "João";',
    options: ['var', 'let', 'const', 'Todas as opções'],
    correctAnswer: 3,
    explanation: 'Em JavaScript, você pode usar var, let ou const para declarar variáveis.',
    difficulty: 'easy'
  },
  {
    id: '2',
    question: 'Qual método adiciona um elemento ao final de um array?',
    code: 'let frutas = ["maçã", "banana"];\nfrutas.___("laranja");',
    options: ['add()', 'push()', 'append()', 'insert()'],
    correctAnswer: 1,
    explanation: 'O método push() adiciona um ou mais elementos ao final de um array.',
    difficulty: 'easy'
  },
  {
    id: '3',
    question: 'Como selecionar um elemento pelo ID no DOM?',
    code: 'let elemento = document.___("meuId");',
    options: ['querySelector()', 'getElementById()', 'getElement()', 'findById()'],
    correctAnswer: 1,
    explanation: 'getElementById() é o método específico para selecionar elementos pelo ID.',
    difficulty: 'medium'
  },
  {
    id: '4',
    question: 'Qual é a saída deste código?',
    code: 'console.log(typeof null);',
    options: ['"null"', '"undefined"', '"object"', '"boolean"'],
    correctAnswer: 2,
    explanation: 'Em JavaScript, typeof null retorna "object" devido a um bug histórico da linguagem.',
    difficulty: 'hard'
  },
  {
    id: '5',
    question: 'Como criar uma função arrow em JavaScript?',
    code: '// Complete a sintaxe\nconst somar = (a, b) ___ a + b;',
    options: [':', '=>', '->', '='],
    correctAnswer: 1,
    explanation: 'Arrow functions usam a sintaxe => para definir funções de forma mais concisa.',
    difficulty: 'medium'
  },
  {
    id: '6',
    question: 'Qual método converte string para número?',
    code: 'let numero = ___("123");',
    options: ['Number()', 'parseInt()', 'parseFloat()', 'Todas as opções'],
    correctAnswer: 3,
    explanation: 'Number(), parseInt() e parseFloat() podem converter strings para números.',
    difficulty: 'medium'
  },
];
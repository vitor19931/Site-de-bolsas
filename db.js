/**
 * daEnê — Banco de Dados (localStorage)
 * Gerencia produtos atualizados, fotos salvas, pedidos e cache.
 */

const DB = (() => {
  const KEYS = {
    products: 'daene_products_v3', // Atualizado para v3 para limpar fotos antigas muito pesadas
    orders: 'daene_orders',
  };

  const DEFAULT_PRODUCTS = [
    {
      id: 'p001',
      name: 'Mochila Pati',
      price: 260.00,
      category: 'mochilas',
      emoji: '🎒',
      img: '', 
      short: 'Ergonômica, sofisticada e com espaço ideal para o dia a dia.',
      description: 'A Mochila Pati une robustez à delicadeza da costura criativa autoral. Conta com forro estruturado, divisórias internas inteligentes e alças acolchoadas ajustáveis.',
      stock: 'disponivel',
      featured: true
    },
    {
      id: 'p002',
      name: 'Pochete Afro',
      price: 120.00,
      category: 'pochetes',
      emoji: '👝',
      img: '',
      short: 'Estampa cultural marcante, trazendo identidade ao visual.',
      description: 'Celebrando a ancestralidade e praticidade. Feita em tecido premium com acabamento impecável, fecho reforçado e regulagem confortável de cintura ou transversal.',
      stock: 'disponivel',
      featured: true
    },
    {
      id: 'p003',
      name: 'Pochete',
      price: 110.00,
      category: 'pochetes',
      emoji: '👝',
      img: '',
      short: 'Design clássico, minimalista e leve para saídas dinâmicas.',
      description: 'Nossa pochete tradicional oferece a liberdade e segurança que você precisa, comportando perfeitamente smartphone, carteira e chaves com total estilo.',
      stock: 'disponivel',
      featured: false
    },
    {
      id: 'p004',
      name: 'Kit Bolsa Praia',
      price: 140.00,
      category: 'praia',
      emoji: '🏖️',
      img: '',
      short: 'Conjunto coordenado indispensável para dias ensolarados.',
      description: 'O kit definitivo para o verão. Materiais de altíssima durabilidade, resistentes à água e fáceis de higienizar. Estética descontraída e refinada.',
      stock: 'encomenda',
      featured: true
    },
    {
      id: 'p005',
      name: 'Shoulder Mini',
      price: 130.00,
      category: 'bolsas',
      emoji: '👜',
      img: '',
      short: 'Compacta por fora, surpreendente por dentro. Praticidade total.',
      description: 'Perfeita para carregar apenas o essencial com máxima leveza. Alça transversal confortável e design geométrico atemporal.',
      stock: 'disponivel',
      featured: false
    },
    {
      id: 'p006',
      name: 'Bolsa Praia em Tela',
      price: 140.00,
      category: 'praia',
      emoji: '👜',
      img: '',
      short: 'Moderna, arejada e projetada para não acumular areia.',
      description: 'A Bolsa de Praia em Tela combina uma transparência sutil e elegante com a resistência necessária para os dias de veraneio.',
      stock: 'disponivel',
      featured: false
    },
    {
      id: 'p007',
      name: 'Mochila Rafa',
      price: 210.00,
      category: 'mochilas',
      emoji: '🎒',
      img: '',
      short: 'Visual contemporâneo, forrada e extremamente confortável.',
      description: 'A Mochila Rafa equilibra versatilidade de uso com design autoral exclusivo. Excelente espaço interno protegido por fechamento seguro.',
      stock: 'disponivel',
      featured: false
    },
    {
      id: 'p008',
      name: 'Bolsa Fashion',
      price: 140.00,
      category: 'bolsas',
      emoji: '👜',
      img: '',
      short: 'Uma peça conceitual que eleva qualquer look instantaneamente.',
      description: 'Desenvolvida para quem ama se destacar. Costuras reforçadas, design geométrico exclusivo do ateliê e texturas sofisticadas.',
      stock: 'disponivel',
      featured: true
    },
    {
      id: 'p009',
      name: 'Mochila Criativa',
      price: 210.00,
      category: 'mochilas',
      emoji: '🎒',
      img: '',
      short: 'Combinações de cores exclusivas para expressar sua arte.',
      description: 'Múltiplos bolsos funcionais e excelente compartimentação interna. Ideal para estudantes, profissionais e mentes criativas.',
      stock: 'encomenda',
      featured: false
    },
    {
      id: 'p010',
      name: 'Shoulder Bag Afro',
      price: 140.00,
      category: 'bolsas',
      emoji: '👜',
      img: '',
      short: 'Bolsa de ombro transversal com detalhes de rica identidade.',
      description: 'Carregue sua ancestralidade e estilo lado a lado. Uma peça versátil e de alta durabilidade com fecho magnético ou zíper premium.',
      stock: 'disponivel',
      featured: true
    },
    {
      id: 'p011',
      name: 'Shoulder',
      price: 130.00,
      category: 'bolsas',
      emoji: '👜',
      img: '',
      short: 'O equilíbrio exato entre o casual e o elegante para o ombro.',
      description: 'Nossa clássica Shoulder Bag adapta-se perfeitamente a compromissos diurnos ou noturnos com simplicidade refinada.',
      stock: 'disponivel',
      featured: false
    },
    {
      id: 'p012',
      name: 'Carteira',
      price: 48.00,
      category: 'acessorios',
      emoji: '👛',
      img: '',
      short: 'Compacta e organizada para cartões, dinheiro e documentos.',
      description: 'Feita sob medida para caber perfeitamente dentro de qualquer bolsa daEnê. Estrutura rígida e fechamento seguro por botão de pressão.',
      stock: 'disponivel',
      featured: false
    },
    {
      id: 'p013',
      name: 'Mochila',
      price: 180.00,
      category: 'mochilas',
      emoji: '🎒',
      img: '',
      short: 'Design tradicional em costura criativa com estrutura reforçada.',
      description: 'A peça perfeita para carregar cadernos, casacos e pertences pesados com a maciez das alças artesanais exclusivas.',
      stock: 'disponivel',
      featured: false
    },
    {
      id: 'p014',
      name: 'Bolsas',
      price: 140.00,
      category: 'bolsas',
      emoji: '👜',
      img: '',
      short: 'Nossa criação clássica e coringa para todos os momentos.',
      description: 'Feita com tecidos selecionados sob curadoria cuidadosa do ateliê. Conforto e atemporalidade garantidos.',
      stock: 'disponivel',
      featured: false
    },
    {
      id: 'p015',
      name: 'Pochete Tamanho M',
      price: 80.00,
      category: 'pochetes',
      emoji: '👝',
      img: '',
      short: 'Espaço intermediário perfeito para quem busca conforto anatômico.',
      description: 'Nem tão pequena, nem tão volumosa. Ajusta-se de forma ideal ao peito ou quadril para eventos, shows e caminhadas.',
      stock: 'disponivel',
      featured: false
    }
  ];

  function init() {
    const saved = localStorage.getItem(KEYS.products);
    if (!saved || JSON.parse(saved).length !== 15) {
      localStorage.setItem(KEYS.products, JSON.stringify(DEFAULT_PRODUCTS));
    }
    if (!localStorage.getItem(KEYS.orders)) {
      localStorage.setItem(KEYS.orders, JSON.stringify([]));
    }
  }

  function getProducts() {
    return JSON.parse(localStorage.getItem(KEYS.products) || '[]');
  }

  function getProduct(id) {
    return getProducts().find(p => p.id === id) || null;
  }

  function saveProduct(data) {
    const products = getProducts();
    const existing = products.findIndex(p => p.id === data.id);
    if (existing >= 0) {
      products[existing] = { ...products[existing], ...data };
    } else {
      data.id = 'p' + Date.now();
      products.unshift(data);
    }
    try {
      localStorage.setItem(KEYS.products, JSON.stringify(products));
    } catch (e) {
      alert("⚠️ Erro de espaço: O navegador bloqueou o salvamento. Verifique se o tamanho ou zoom das fotos anteriores está muito grande e tente reduzi-lo.");
    }
    return data;
  }

  function deleteProduct(id) {
    const products = getProducts().filter(p => p.id !== id);
    localStorage.setItem(KEYS.products, JSON.stringify(products));
  }

  function getByCategory(cat) {
    const all = getProducts();
    return cat === 'todas' ? all : all.filter(p => p.category === cat);
  }

  function formatPrice(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  return { init, getProducts, getProduct, saveProduct, deleteProduct, getByCategory, formatPrice };
})();

DB.init();

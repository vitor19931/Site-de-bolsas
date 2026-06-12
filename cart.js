const firebaseConfig = {
  apiKey: "AIzaSyA9...",
  authDomain: "daene-costura.firebaseapp.com",
  databaseURL: "https://daene-costura-default-rtdb.firebaseio.com",
  projectId: "daene-costura"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const DB = (() => {

  let cachedProducts = [];
  let initialized = false;
  let hasSeeded = false;

  database.ref('products').on('value', (snapshot) => {
    const data = snapshot.val();

    if (data) {
      const map = new Map();

      Object.values(data).forEach(p => {
        const key = p.name.trim().toLowerCase() + "|" + p.category;

        if (!map.has(key)) {
          map.set(key, p);
        } else {
          const existing = map.get(key);

          // mantém o melhor (com img)
          const hasImg = p.img && p.img.length > 50;
          const existingHasImg = existing.img && existing.img.length > 50;

          if (hasImg && !existingHasImg) {
            map.set(key, p);
          }
        }
      });

      cachedProducts = [...map.values()].sort(
        (a, b) => (b.createdAt || 0) - (a.createdAt || 0)
      );

    } else {
      cachedProducts = [];
    }

    if (initialized) {
      if (typeof renderProducts === 'function') renderProducts(currentCat || 'todas');
      if (typeof renderAdminList === 'function') renderAdminList();
    }

    initialized = true;

    if ((!data || Object.keys(data).length === 0) && !hasSeeded) {
      hasSeeded = true;
      if (typeof DEFAULT_PRODUCTS !== 'undefined') seedDefaults();
    }
  });

  function seedDefaults() {
    const updates = {};
    DEFAULT_PRODUCTS.forEach(p => updates[p.id] = p);
    database.ref('products').update(updates);
  }

  function getProducts() { return cachedProducts; }
  function getProduct(id) { return cachedProducts.find(p => p.id === id); }

  function saveProduct(data) {
    if (!data.id) data.id = "p_" + Date.now();
    if (!data.createdAt) data.createdAt = Date.now();
    return database.ref("products/" + data.id).set(data);
  }

  function deleteProduct(id) {
    return database.ref("products/" + id).remove();
  }

  function getByCategory(cat) {
    return cat === "todas"
      ? cachedProducts
      : cachedProducts.filter(p => p.category === cat);
  }

  function formatPrice(v) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(v);
  }

  /**
   * Salva um pedido feito pelo cliente (registro do checkout do carrinho).
   * Não interrompe o checkout caso falhe — é apenas um registro auxiliar.
   */
  function saveOrder(order) {
    try {
      const payload = {
        ...order,
        createdAt: Date.now()
      };
      return database.ref("orders").push(payload);
    } catch (error) {
      console.error('Erro ao salvar pedido:', error);
    }
  }

  return {
    getProducts,
    getProduct,
    saveProduct,
    deleteProduct,
    getByCategory,
    formatPrice,
    saveOrder
  };

})();

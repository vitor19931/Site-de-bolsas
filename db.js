/**
 * daEnê — Banco de Dados (Firebase Realtime)
 */

const firebaseConfig = {
  apiKey: "AIzaSyA9Al8F0Oh6Y_dvjLhmdUWcsZRcurw_V9I",
  authDomain: "daene-costura.firebaseapp.com",
  databaseURL: "https://daene-costura-default-rtdb.firebaseio.com",
  projectId: "daene-costura",
  storageBucket: "daene-costura.firebasestorage.app",
  messagingSenderId: "1005481350361",
  appId: "1:1005481350361:web:cfac11af654bd922285ac8"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const DB = (() => {
  let cachedProducts = [];

  database.ref('products').on('value', (snapshot) => {
    const data = snapshot.val();
    cachedProducts = data ? Object.values(data) : [];
    if (typeof renderProducts === 'function') renderProducts(typeof currentCat !== 'undefined' ? currentCat : 'todas');
    if (typeof renderAdminList === 'function') renderAdminList();
  });

  function getProducts() { return cachedProducts; }
  function getProduct(id) { return cachedProducts.find(p => p.id === id) || null; }
  
  function saveProduct(data) {
    if (!data.id) data.id = 'p_' + Date.now();
    database.ref('products/' + data.id).set(data);
    return data;
  }

  function deleteProduct(id) {
    database.ref('products/' + id).remove();
  }

  function getByCategory(cat) {
    return cat === 'todas' ? cachedProducts : cachedProducts.filter(p => p.category === cat);
  }

  function formatPrice(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
  }

  return { getProducts, getProduct, saveProduct, deleteProduct, getByCategory, formatPrice };
})();

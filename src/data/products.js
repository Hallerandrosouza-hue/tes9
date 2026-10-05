export const CATEGORIES = ['Churrasco', 'Combos', 'Acompanhamentos', 'Bebidas', 'Sobremesas']

export const INITIAL_PRODUCTS = [
  { id: 1,  name: 'Picanha Premium na Brasa', category: 'Churrasco', price: 89.90, description: 'Picanha fatiada extra macia, assada na brasa com sal grosso. Serve 2 pessoas.', image: 'https://images.unsplash.com/photo-1544025162-8111142154ea?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 2,  name: 'Costela no Bafo', category: 'Churrasco', price: 79.90, description: 'Costela bovina assada lentamente por 12h até desmanchar.', image: 'https://images.unsplash.com/photo-1558030006-450675393462?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 3,  name: 'Maminha Completa', category: 'Churrasco', price: 65.90, description: 'Maminha suculenta grelhada no ponto.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 4,  name: 'Linguiça Toscana', category: 'Churrasco', price: 29.90, description: 'Linguiça toscana artesanal assada na brasa (500g).', image: 'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 5,  name: 'Combo Família Canoa', category: 'Combos', price: 149.90, description: 'Picanha + Linguiça + Arroz Biro Biro + Farofa + Fritas + Refri 2L.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 6,  name: 'Combo Casal', category: 'Combos', price: 99.90, description: 'Alcatra na brasa + Arroz + Maionese caseira + 2 Sucos.', image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 7,  name: 'Arroz Biro Biro', category: 'Acompanhamentos', price: 18.90, description: 'Arroz com ovos, bacon e batata palha.', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 8,  name: 'Farofa de Ovos Caipira', category: 'Acompanhamentos', price: 15.90, description: 'Farofa artesanal com ovos caipiras e bacon.', image: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 9,  name: 'Vinagrete Fresco', category: 'Acompanhamentos', price: 8.90, description: 'Tomate, cebola, pimentão e azeite.', image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 10, name: 'Coca-Cola 2L', category: 'Bebidas', price: 14.00, description: 'Garrafa 2L gelada.', image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 11, name: 'Suco Natural de Laranja', category: 'Bebidas', price: 9.00, description: 'Suco da fruta (500ml), sem água.', image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=400&q=80', available: true },
  { id: 12, name: 'Pudim de Leite', category: 'Sobremesas', price: 12.90, description: 'Fatia generosa do clássico pudim com calda.', image: 'https://images.unsplash.com/photo-1579954115545-a95faef4a52a?auto=format&fit=crop&w=400&q=80', available: true },
]

export const BUILD_OPTIONS = {
  bases: [
    { id: 'arroz_branco', name: 'Arroz Branco', price: 0 },
    { id: 'arroz_biro',   name: 'Arroz Biro Biro', price: 5.00 },
    { id: 'salada',       name: 'Mix de Folhas', price: 0 },
  ],
  proteins: [
    { id: 'picanha', name: 'Picanha (200g)', price: 35.00 },
    { id: 'alcatra', name: 'Alcatra (200g)', price: 25.00 },
    { id: 'frango',  name: 'Sobrecoxa Desossada', price: 18.00 },
    { id: 'cupim',   name: 'Cupim Casqueirado', price: 28.00 },
  ],
  extras: [
    { id: 'farofa',        name: 'Farofa da Casa', price: 4.00 },
    { id: 'vinagrete',     name: 'Vinagrete', price: 3.00 },
    { id: 'maionese',      name: 'Maionese de Batata', price: 6.00 },
    { id: 'fritas',        name: 'Batata Frita', price: 8.00 },
    { id: 'mandioca',      name: 'Mandioca Frita', price: 8.00 },
    { id: 'queijo_coalho', name: 'Queijo Coalho', price: 6.00 },
    { id: 'pao_alho',      name: 'Pão de Alho', price: 5.00 },
  ],
}

export const DEMO_ORDERS = [
  {
    id: '#0001', customer: 'João Silva', method: 'delivery',
    address: 'Rua das Flores, 123 – Centro', payment: 'pix',
    items: [{ name: 'Picanha Premium na Brasa', qty: 1, price: 89.90 }, { name: 'Coca-Cola 2L', qty: 1, price: 14.00 }],
    subtotal: 103.90, tax: 5.00, total: 108.90, status: 'preparing', time: '19:05',
  },
  {
    id: '#0002', customer: 'Maria Santos', method: 'pickup',
    address: 'Retirada no balcão', payment: 'card',
    items: [{ name: 'Combo Família Canoa', qty: 1, price: 149.90 }],
    subtotal: 149.90, tax: 0, total: 149.90, status: 'received', time: '18:45',
  }
]

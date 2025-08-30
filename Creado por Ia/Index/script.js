let products = [
  { id: "z1", title: "Oxford clásico", category: "elegante", color: "negro", price: 59.99, image: "img/oxford-negro.webp", url: "#oxford-negro", size: "39-44" },
  { id: "z2", title: "Deportivo aire", category: "deportivo", color: "blanco", price: 49.90, image: "img/deportivo-blanco.webp", url: "#deportivo-blanco", size: "38-45" },
  { id: "z3", title: "Mocasín cuero", category: "casual", color: "marrón", price: 64.50, image: "img/mocasin-marron.webp", url: "#mocasin-marron", size: "39-44" },
  { id: "z4", title: "Runner pro", category: "deportivo", color: "azul", price: 54.00, image: "img/runner-azul.webp", url: "#runner-azul", size: "39-46" },
  { id: "z5", title: "Derby minimal", category: "elegante", color: "cafe", price: 72.00, image: "img/derby-cafe.webp", url: "#derby-cafe", size: "39-45" }
];

const $grid = document.getElementById('grid');
const $empty = document.querySelector('.empty');
const $tpl = document.getElementById('card-template');

function money(n) {
  return '$' + n.toFixed(2);
}

function render(list) {
  $grid.innerHTML = '';
  const frag = document.createDocumentFragment();

  list.forEach(p => {
    const node = $tpl.content.cloneNode(true);
    const link = node.querySelector('.card-link');
    const img  = node.querySelector('img');
    const title= node.querySelector('.title');
    const meta = node.querySelector('.meta');
    const price= node.querySelector('.price');
    const buy  = node.querySelector('.buy');

    link.href = p.url || '#';
    img.src   = p.image;
    img.alt   = p.title;
    img.width = 600; img.height = 600;

    title.textContent = p.title;
    meta.textContent  = `${p.category} • ${p.color} • Tallas ${p.size}`;
    price.textContent = money(p.price);

    buy.addEventListener('click', (e) => {
    e.preventDefault();
    const params = new URLSearchParams({
        title: p.title,
        image: p.image,
        price: p.price
    });
    window.location.href = `checkout.html?${params.toString()}`;
    });

    frag.appendChild(node);
  });

  $grid.appendChild(frag);
  $empty.style.display = list.length ? 'none' : 'block';
}

const $search = document.getElementById('search');
const $filter = document.getElementById('filter-category');

function applyFilters() {
  const q = ($search.value || '').toLowerCase();
  const c = $filter.value;
  const list = products.filter(p => {
    const matchesText = p.title.toLowerCase().includes(q);
    const matchesCat  = c ? p.category === c : true;
    return matchesText && matchesCat;
  });
  render(list);
}

$search.addEventListener('input', applyFilters);
$filter.addEventListener('change', applyFilters);

render(products);

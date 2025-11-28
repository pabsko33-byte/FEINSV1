// Smooth scroll nav + boutons
document.querySelectorAll("[data-scroll]").forEach((el) => {
  el.addEventListener("click", () => {
    const target = document.querySelector(el.getAttribute("data-scroll"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Reveal sections au scroll
const revealSections = document.querySelectorAll(".section.reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealSections.forEach((sec) => observer.observe(sec));

// Effet parallax léger sur le fond
const bgOrbit = document.querySelector(".bg-orbit");
window.addEventListener("scroll", () => {
  const y = window.scrollY || window.pageYOffset;
  if (bgOrbit) {
    bgOrbit.style.transform = `translate3d(0, ${y * -0.06}px, 0)`;
  }
});

// Questions interactives
const tabs = document.querySelectorAll(".q-tab");
const panels = {
  allocation: document.getElementById("q-allocation"),
  risque: document.getElementById("q-risque"),
  crypto: document.getElementById("q-crypto"),
  carriere: document.getElementById("q-carriere"),
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const key = tab.dataset.question;

    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");

    Object.keys(panels).forEach((k) => {
      panels[k].classList.toggle("active", k === key);
    });
  });
});

// Simu marchés : variations autour des valeurs de base
const refreshBtn = document.getElementById("refresh-markets");
const marketCards = document.querySelectorAll(".market-card");

function randomShift() {
  // variation entre -0.8% et +0.8%
  return (Math.random() * 1.6 - 0.8) / 100;
}

function refreshMarkets() {
  marketCards.forEach((card) => {
    const valueEl = card.querySelector(".market-value");
    const changeEl = card.querySelector(".market-change");
    if (!valueEl || !changeEl) return;

    const base = parseFloat(valueEl.dataset.base);
    const shift = randomShift();
    const newVal = base * (1 + shift);
    const pct = shift * 100;

    valueEl.textContent = newVal.toFixed(2);

    changeEl.classList.remove("negative", "flat");

    if (Math.abs(pct) < 0.05) {
      changeEl.textContent = "0.00%";
      changeEl.classList.add("flat");
    } else if (pct < 0) {
      changeEl.textContent = pct.toFixed(2) + "%";
      changeEl.classList.add("negative");
    } else {
      changeEl.textContent = "+" + pct.toFixed(2) + "%";
    }
  });
}

if (refreshBtn) {
  refreshBtn.addEventListener("click", refreshMarkets);
}

// Modale très simple pour le détail d’un indice (maquette)
const details = {
  cac: "CAC 40 • Proxy France : banques, luxe, industrie. Sert souvent de base pour comprendre le beta d’un portefeuille France.",
  spx: "S&P 500 • Colonne vertébrale de nombreux portefeuilles US. 500 grandes entreprises, très diversifié secteur.",
  ndx: "NASDAQ 100 • Tech & croissance, plus volatile. Sert de laboratoire pour mesurer l’appétit au risque.",
  msci: "MSCI World • Indice global développé. Base classique d’un ETF monde long terme.",
  btc: "Bitcoin • Actif spéculatif à forte volatilité. Chez FEIS, utilisé comme laboratoire de risque, pas comme retraite.",
  eth: "Ethereum • Technologie + finance décentralisée. Même approche que Bitcoin : poche limitée, jamais le cœur.",
  "etf-world": "ETF World • Véhicule pour acheter le MSCI World. Cœur d’un portefeuille long terme dans beaucoup de stratégies.",
  cash: "Cash • Outil de stabilité et d’options. Sert à tenir les moments difficiles et à saisir les opportunités.",
};

function showDetail(message) {
  if (!message) return;
  alert(message); // simple pour l’instant, on pourra remplacer par une vraie modale plus tard
}

document.querySelectorAll(".market-more").forEach((btn) => {
  btn.addEventListener("click", () => {
    const key = btn.dataset.detail;
    showDetail(details[key]);
  });
});
function openChart(asset) {
  document.getElementById("chart-modal").classList.remove("hidden");

  // futur graph API ici
  console.log("Load chart for:", asset);
}

function closeChart() {
  document.getElementById("chart-modal").classList.add("hidden");
}

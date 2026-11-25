// 1. MOUSE-FOLLOWER LANTERN EFFECT
const lantern = document.getElementById('mouse-lantern');

document.addEventListener('mousemove', (e) => {
  if (lantern) {
    lantern.style.left = e.clientX + 'px';
    lantern.style.top = e.clientY + 'px';
  }
});

// 2. INTERACTIVE 3D TILT ON CARDS WHEN MOUSE MOVES OVER THEM
const cards = document.querySelectorAll('.interactive-card');

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // mouse X inside card
    const y = e.clientY - rect.top;  // mouse Y inside card
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6; // subtle tilt
    const rotateY = ((x - centerX) / centerX) * 6;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
  });
});

// 3. LOAD JSON DATA FOR PROOF EXPLORER
// Fallback data ensures it works even when double-clicking index.html locally without a server!
const fallbackData = [
  {
    id: "leaders",
    topic: "Reluctant Leaders",
    revTitle: "George Washington (1776)",
    revProof: "In McCullough's 1776, Washington wasn't a glory-seeker. He doubted his own ability to command an entire army, yet accepted the burden out of duty—holding his freezing men together after devastating defeats in New York.",
    exodusTitle: "Moses (Book of Exodus)",
    exodusProof: "Moses initially argued that he was 'slow of speech' and unqualified to confront Pharaoh. Yet he stepped forward, confronting the world's greatest empire with nothing but a shepherd's staff and faith."
  },
  {
    id: "waters",
    topic: "Impossible Waters",
    revTitle: "Crossing the Delaware River",
    revProof: "On Christmas night 1776, during a brutal nor'easter blizzard, Washington ferried 2,400 men, horses, and cannons across an ice-choked river to surprise Hessian forces at Trenton.",
    exodusTitle: "Parting of the Red Sea",
    exodusProof: "Cornered between Pharaoh's advancing chariots and the sea, the Israelites walked across dry ground while the waters stood like walls on either side—turning certain destruction into liberation."
  },
  {
    id: "odds",
    topic: "Outgunned & Outnumbered",
    revTitle: "Farmers vs. The British Empire",
    revProof: "McCullough highlights that Washington's army lacked shoes, gunpowder, and uniforms, facing the largest naval armada and best-trained army on Earth—yet succeeded through strategy at Dorchester Heights.",
    exodusTitle: "Brickmakers vs. Pharaoh's Chariots",
    exodusProof: "Enslaved laborers who spent generations making mud bricks had zero military training or weapons, yet walked out of Egypt carrying the wealth of their former captors."
  }
];

function initProofExplorer(data) {
  const btnContainer = document.getElementById('topic-buttons');
  const display = document.getElementById('comparison-display');
  if (!btnContainer || !display) return;

  data.forEach((item, index) => {
    const btn = document.createElement('button');
    btn.className = index === 0 ? 'topic-btn active' : 'topic-btn';
    btn.textContent = item.topic;

    btn.addEventListener('click', () => {
      document.querySelectorAll('.topic-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderComparison(item);
    });

    btnContainer.appendChild(btn);
  });

  // Show the first comparison by default
  renderComparison(data[0]);
}

function renderComparison(item) {
  const display = document.getElementById('comparison-display');
  display.innerHTML = `
    <div class="proof-box">
      <span class="proof-tag">🇺🇸 American Revolution • 1776</span>
      <h3>${item.revTitle}</h3>
      <p>${item.revProof}</p>
    </div>
    <div class="proof-box exodus">
      <span class="proof-tag">🔥 The Exodus • Ancient Egypt</span>
      <h3>${item.exodusTitle}</h3>
      <p>${item.exodusProof}</p>
    </div>
  `;
}

// Try fetching data.json; if opened locally via file://, seamlessly use fallbackData
fetch('data.json')
  .then(res => res.json())
  .then(data => initProofExplorer(data))
  .catch(() => initProofExplorer(fallbackData));

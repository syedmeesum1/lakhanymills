/**
 * LAKHANY SILK MILLS (PVT) LTD — OFFICIAL BUSINESS WEBSITE
 * Interactive Application Logic & Silk Canvas Simulation
 * Karachi SITE Industrial Area • Estd. 1952
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 1. Initialize Flowing Silk Canvas Animation
  initSilkCanvas();

  // 2. Initialize Navigation & Smooth Scroll
  initNavigation();

  // 3. Initialize Fabric Catalog Filters & Modals
  initCatalog();

  // 4. Initialize Export Yardage & Weight Calculator
  initExportCalculator();

  // 5. Initialize Wholesale Inquiry Form
  initContactForm();
});

/* ==========================================================================
   1. FLOWING SILK CANVAS ANIMATION (Light Champagne & Ivory Waves)
   ========================================================================== */
function initSilkCanvas() {
  const canvas = document.getElementById('silkCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  let mouseX = width / 2;
  let mouseY = height / 2;
  let targetMouseX = mouseX;
  let targetMouseY = mouseY;
  let step = 0;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  window.addEventListener('mousemove', (e) => {
    targetMouseX = e.clientX;
    targetMouseY = e.clientY;
  });

  // Array of graceful silk ribbons
  const ribbons = [
    { yOffset: 0.25, amplitude: 45, wavelength: 0.003, speed: 0.012, color: 'rgba(223, 183, 67, 0.07)' },
    { yOffset: 0.35, amplitude: 60, wavelength: 0.0025, speed: 0.009, color: 'rgba(255, 255, 255, 0.65)' },
    { yOffset: 0.45, amplitude: 50, wavelength: 0.0035, speed: 0.014, color: 'rgba(212, 175, 55, 0.08)' },
    { yOffset: 0.55, amplitude: 70, wavelength: 0.002, speed: 0.008, color: 'rgba(240, 235, 224, 0.55)' },
    { yOffset: 0.65, amplitude: 55, wavelength: 0.004, speed: 0.015, color: 'rgba(197, 155, 39, 0.06)' },
    { yOffset: 0.75, amplitude: 40, wavelength: 0.003, speed: 0.011, color: 'rgba(255, 255, 255, 0.5)' }
  ];

  function animate() {
    step += 1;
    mouseX += (targetMouseX - mouseX) * 0.05;
    mouseY += (targetMouseY - mouseY) * 0.05;

    ctx.clearRect(0, 0, width, height);

    ribbons.forEach((ribbon, index) => {
      ctx.beginPath();
      const baseY = height * ribbon.yOffset;
      const mouseFactor = (mouseY / height - 0.5) * 40;

      ctx.moveTo(0, baseY);

      for (let x = 0; x <= width; x += 15) {
        const mouseDist = Math.abs(x - mouseX);
        const ripple = Math.sin((x * ribbon.wavelength) + (step * ribbon.speed) + (index * 0.8)) * ribbon.amplitude;
        const mouseEffect = Math.sin((mouseDist * 0.004) - (step * 0.03)) * (Math.max(0, 300 - mouseDist) / 300) * 25;
        
        const y = baseY + ripple + mouseFactor + mouseEffect;
        ctx.lineTo(x, y);
      }

      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();

      ctx.fillStyle = ribbon.color;
      ctx.fill();

      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.12)';
      ctx.stroke();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   2. NAVIGATION & TOAST NOTIFICATION
   ========================================================================== */
function initNavigation() {
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      const isVisible = navMenu.style.display === 'flex';
      navMenu.style.display = isVisible ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '100%';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = '#ffffff';
      navMenu.style.padding = '1.5rem';
      navMenu.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      navMenu.style.borderBottom = '1px solid #e2e8f0';
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || !targetId) return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.innerWidth <= 768 && navMenu) {
          navMenu.style.display = 'none';
        }
      }
    });
  });
}

function showToast(title, msg, icon = 'check-circle') {
  const toast = document.getElementById('toast');
  const toastTitle = document.getElementById('toastTitle');
  const toastMsg = document.getElementById('toastMsg');
  const toastIcon = document.getElementById('toastIcon');

  if (!toast) return;

  toastTitle.textContent = title;
  toastMsg.textContent = msg;
  toastIcon.innerHTML = `<i data-lucide="${icon}"></i>`;
  if (window.lucide) window.lucide.createIcons();

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}

/* ==========================================================================
   3. FABRIC CATALOG & SWATCH REQUEST MODAL
   ========================================================================== */
function initCatalog() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const fabricCards = document.querySelectorAll('.fabric-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      fabricCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.3s ease';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Sample Modal
  const modalSample = document.getElementById('modalSample');
  const sampleFabricName = document.getElementById('sampleFabricName');
  const btnCloseSampleModal = document.getElementById('btnCloseSampleModal');
  const btnSubmitSample = document.getElementById('btnSubmitSample');

  document.querySelectorAll('.btn-sample').forEach(btn => {
    btn.addEventListener('click', () => {
      const fabric = btn.getAttribute('data-fabric');
      if (sampleFabricName) sampleFabricName.value = fabric + ' (Lakhany Silk Mills)';
      if (modalSample) modalSample.classList.add('show');
    });
  });

  if (btnCloseSampleModal && modalSample) {
    btnCloseSampleModal.addEventListener('click', () => modalSample.classList.remove('show'));
    modalSample.addEventListener('click', (e) => {
      if (e.target === modalSample) modalSample.classList.remove('show');
    });
  }

  if (btnSubmitSample && modalSample) {
    btnSubmitSample.addEventListener('click', () => {
      const buyerName = document.getElementById('sampleBuyerName')?.value.trim();
      const buyerPhone = document.getElementById('sampleBuyerPhone')?.value.trim();
      if (!buyerName || !buyerPhone) {
        alert('Please fill out your name and contact phone number.');
        return;
      }
      modalSample.classList.remove('show');
      showToast('Sample Swatch Dispatched', 'Courier request registered for Lakhany SITE dispatch department.');
    });
  }

  document.querySelectorAll('.btn-details').forEach(btn => {
    btn.addEventListener('click', () => {
      const fabric = btn.getAttribute('data-fabric');
      showToast(
        `${fabric} Specifications`,
        '100% in-house woven & finished in SITE Karachi. Available in custom GSM and widths.'
      );
    });
  });
}

/* ==========================================================================
   4. EXPORT YARDAGE & ROLL WEIGHT CALCULATOR
   ========================================================================== */
function initExportCalculator() {
  const calcFabricType = document.getElementById('calcFabricType');
  const calcMeters = document.getElementById('calcMeters');
  const calcWidth = document.getElementById('calcWidth');
  const calcRollSize = document.getElementById('calcRollSize');

  const resRolls = document.getElementById('resRolls');
  const resWeight = document.getElementById('resWeight');
  const resContainer = document.getElementById('resContainer');

  function calculate() {
    if (!calcFabricType || !calcMeters || !calcWidth || !calcRollSize) return;

    const gsm = parseFloat(calcFabricType.value) || 75;
    const totalMeters = parseFloat(calcMeters.value) || 0;
    const widthInMeters = parseFloat(calcWidth.value) || 1.37;
    const rollLength = parseFloat(calcRollSize.value) || 120;

    // 1. Total Rolls
    const rolls = Math.ceil(totalMeters / rollLength);

    // 2. Total Weight in Kg: (Length in m * Width in m * GSM) / 1000
    const totalSqMeters = totalMeters * widthInMeters;
    const weightKg = Math.round((totalSqMeters * gsm) / 1000);
    const metricTons = (weightKg / 1000).toFixed(2);

    // 3. Container volume calculation (approx 20ft container holds ~10,000 to 12,000 kg of textiles)
    const containerFraction = (weightKg / 10800).toFixed(2);

    if (resRolls) resRolls.textContent = `${rolls.toLocaleString()} Rolls`;
    if (resWeight) resWeight.textContent = `${weightKg.toLocaleString()} Kg (${metricTons} MT)`;
    if (resContainer) resContainer.textContent = `${containerFraction} × 20ft FCL Container`;
  }

  [calcFabricType, calcMeters, calcWidth, calcRollSize].forEach(el => {
    if (el) el.addEventListener('input', calculate);
  });

  calculate();
}

/* ==========================================================================
   5. CONTACT & INQUIRY SUBMISSION
   ========================================================================== */
function initContactForm() {
  const btnSubmitContact = document.getElementById('btnSubmitContact');
  if (btnSubmitContact) {
    btnSubmitContact.addEventListener('click', () => {
      const name = document.getElementById('contactName')?.value.trim();
      const phone = document.getElementById('contactPhone')?.value.trim();
      const company = document.getElementById('contactCompany')?.value.trim();

      if (!name || !phone) {
        alert('Please provide your name and contact phone number.');
        return;
      }

      showToast(
        'Inquiry Submitted Successfully',
        `Thank you ${name}. Lakhany Silk Mills sales desk will connect with you within 24 hours.`,
        'check-circle-2'
      );

      // Reset form fields
      document.getElementById('contactName').value = '';
      document.getElementById('contactCompany').value = '';
      document.getElementById('contactPhone').value = '';
      document.getElementById('contactEmail').value = '';
      document.getElementById('contactQty').value = '';
      document.getElementById('contactMessage').value = '';
    });
  }
}

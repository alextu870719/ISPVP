const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('is-open');
  });
}

if (nav) {
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/';
  nav.querySelectorAll('a').forEach((link) => {
    const linkPath = new URL(link.href).pathname.replace(/\/$/, '') || '/';
    if (linkPath === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

const slideshow = document.querySelector('[data-slideshow]');

if (slideshow) {
  const slides = Array.from(slideshow.querySelectorAll('[data-slide]'));
  const dotsWrap = slideshow.querySelector('[data-slide-dots]');
  const prev = slideshow.querySelector('[data-slide-prev]');
  const next = slideshow.querySelector('[data-slide-next]');
  let index = 0;
  let timer = null;

  const dots = slides.map((_, i) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.className = 'slide-dot';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => {
      index = i;
      render();
      restartAuto();
    });
    dotsWrap?.appendChild(dot);
    return dot;
  });

  function render() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });
  }

  function go(step) {
    index = (index + step + slides.length) % slides.length;
    render();
  }

  function startAuto() {
    timer = window.setInterval(() => {
      go(1);
    }, 5000);
  }

  function restartAuto() {
    if (timer) {
      window.clearInterval(timer);
    }
    startAuto();
  }

  prev?.addEventListener('click', () => {
    go(-1);
    restartAuto();
  });

  next?.addEventListener('click', () => {
    go(1);
    restartAuto();
  });

  render();
  startAuto();
}

const registrationForm = document.querySelector('[data-checkout-form]');

if (registrationForm) {
  window.ISPVP_CONFIG = window.ISPVP_CONFIG || {
    CHECKOUT_API_BASE: 'https://ispvp-payments-api.vercel.app'
  };

  const feePreview = document.getElementById('selected-fee');
  const message = document.getElementById('checkout-message');
  const submitButton = registrationForm.querySelector('[data-submit-button]');
  const ticketType = document.getElementById('ticketType');
  const pricingWindow = document.getElementById('pricingWindow');

  const feeTable = {
    early: { regular: 450, research: 350, student: 250 },
    general: { regular: 500, research: 400, student: 300 },
    late: { regular: 550, research: 450, student: 350 }
  };

  function updateFeePreview() {
    const ticket = ticketType?.value || 'regular';
    const windowKey = pricingWindow?.value || 'early';
    const amount = feeTable[windowKey]?.[ticket] || feeTable.early.regular;
    if (feePreview) {
      feePreview.textContent = `USD ${amount}`;
    }
  }

  ticketType?.addEventListener('change', updateFeePreview);
  pricingWindow?.addEventListener('change', updateFeePreview);
  updateFeePreview();

  registrationForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const payload = {
      name: document.getElementById('fullName')?.value?.trim() || '',
      email: document.getElementById('email')?.value?.trim() || '',
      affiliation: document.getElementById('affiliation')?.value?.trim() || '',
      ticketType: ticketType?.value || 'regular',
      pricingWindow: pricingWindow?.value || 'early'
    };

    if (!payload.name || !payload.email || !payload.affiliation) {
      if (message) {
        message.textContent = 'Please complete all required fields.';
      }
      return;
    }

    if (submitButton) {
      submitButton.disabled = true;
    }

    if (message) {
      message.textContent = 'Preparing secure checkout...';
    }

    try {
      const response = await fetch(`${window.ISPVP_CONFIG.CHECKOUT_API_BASE}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok || !data.url) {
        throw new Error(data.error || 'Unable to start checkout session.');
      }

      window.location.href = data.url;
    } catch (error) {
      if (message) {
        message.textContent = error.message || 'Checkout failed. Please try again.';
      }
      if (submitButton) {
        submitButton.disabled = false;
      }
    }
  });
}

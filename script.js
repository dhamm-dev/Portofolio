const navigation = performance.getEntriesByType('navigation')[0];
if (navigation?.type === 'reload') {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  window.addEventListener('pageshow', () => window.scrollTo({ top: 0, left: 0, behavior: 'instant' }), { once: true });
}

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
const revealItems = document.querySelectorAll('.reveal');

const splitLetters = (element) => {
  const letters = [];
  element.setAttribute('aria-label', element.innerText.replace(/\s+/g, ' ').trim());
  const walk = (node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const fragment = document.createDocumentFragment();
        [...child.textContent].forEach((char) => {
          if (char === ' ') {
            fragment.append(' ');
            return;
          }
          const span = document.createElement('span');
          span.className = 'intro-letter';
          span.textContent = char;
          span.setAttribute('aria-hidden', 'true');
          fragment.append(span);
          letters.push(span);
        });
        child.replaceWith(fragment);
      } else if (child.nodeName !== 'BR') {
        walk(child);
      }
    });
  };
  walk(element);
  element.classList.add('is-split');
  return letters;
};

const welcomeIntro = document.querySelector('.welcome-intro');
const welcomeKey = 'dhamm-portfolio-welcome';
let welcomeSeen = false;
try {
  welcomeSeen = sessionStorage.getItem(welcomeKey) === 'seen';
} catch {}
if (new URLSearchParams(location.search).has('intro')) welcomeSeen = false;

if (welcomeIntro && !welcomeSeen && welcomeIntro.showModal) {
  let leaving = false;
  let exitAnimations = [];
  let letterAnimations = [];
  let resetFrame;
  let dragging = false;
  const finishIntro = () => {
    cancelAnimationFrame(resetFrame);
    welcomeIntro.close();
    document.documentElement.classList.remove('intro-active');
    exitAnimations.forEach((animation) => animation.cancel());
    letterAnimations.forEach((animation) => animation.cancel());
    try {
      sessionStorage.setItem(welcomeKey, 'seen');
    } catch {}
  };
  const dismissIntro = () => {
    if (leaving || !welcomeIntro.open) return;
    if (motionPreference.matches || !welcomeIntro.animate) {
      finishIntro();
      return;
    }
    leaving = true;
    welcomeIntro.classList.add('is-leaving');
    letterAnimations = [...welcomeIntro.querySelectorAll('.intro-letter')].map((letter, index) => {
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 90;
      const rotation = (Math.random() - 0.5) * 120;
      const scale = 0.7 + Math.random() * 0.5;
      return letter.animate(
        [
          { transform: 'translate(0, 0) rotate(0) scale(1)', opacity: 1 },
          { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(${rotation}deg) scale(${scale})`, opacity: 0 }
        ],
        {
          duration: 500 + Math.random() * 200,
          delay: index * 10 + Math.random() * 40,
          easing: 'cubic-bezier(.2,.7,.3,1)',
          fill: 'forwards'
        }
      );
    });
    const contentFades = [...welcomeIntro.querySelectorAll('.welcome-signature, .welcome-caption, .welcome-entry')].map((element) =>
      element.animate(
        [{ opacity: 1 }, { opacity: 0 }],
        { duration: 400, easing: 'ease-out', fill: 'forwards' }
      )
    );
    const backgroundFade = welcomeIntro.animate(
      [{ backgroundColor: '#242326' }, { backgroundColor: 'transparent' }],
      { duration: 800, delay: 350, easing: 'ease-in-out', fill: 'forwards' }
    );
    exitAnimations = [...contentFades, backgroundFade];
    backgroundFade.onfinish = finishIntro;
  };

  welcomeIntro.showModal();
  document.documentElement.classList.add('intro-active');
  const welcomeTitle = welcomeIntro.querySelector('#welcome-title');
  const letters = welcomeTitle ? splitLetters(welcomeTitle).map((element, index, all) => {
    const distance = 30 + Math.random() * 90;
    const direction = index < 5 || (index >= 9 && index < 9 + (all.length - 9) / 2) ? -1 : 1;
    return { element, x: direction * distance, y: (Math.random() - 0.5) * distance * 0.4,
      rotation: (Math.random() - 0.5) * 120, start: index / all.length * 0.35 };
  }) : [];
  const welcomeSlider = welcomeIntro.querySelector('.welcome-slider');
  const signature = welcomeIntro.querySelector('.welcome-signature');
  const wordmark = document.querySelector('.site-header .wordmark');
  let signatureOrigin;
  const measureSignature = () => {
    signature.style.transform = '';
    signatureOrigin = signature.getBoundingClientRect();
  };
  const renderProgress = (value) => {
    const progress = value / 100;
    welcomeSlider.value = value;
    welcomeSlider.style.setProperty('--progress', `${value}%`);
    welcomeIntro.style.setProperty('--intro-opacity', motionPreference.matches ? 1 : 1 - progress * 0.35);
    welcomeIntro.querySelector('.welcome-entry').style.opacity = motionPreference.matches ? 1 : 1 - progress * 0.65;
    letters.forEach(({ element, x, y, rotation, start }) => {
      const amount = motionPreference.matches ? 0 : Math.max(0, Math.min(1, (progress - start) / (1 - start)));
      element.style.transform = `translate(${x * amount}px, ${y * amount}px) rotate(${rotation * amount}deg) scale(${1 - amount * 0.2})`;
      element.style.opacity = 1 - amount;
    });
  };
  const resetProgress = () => {
    if (leaving || !welcomeIntro.open || Number(welcomeSlider.value) === 0) return;
    cancelAnimationFrame(resetFrame);
    const start = Number(welcomeSlider.value);
    if (motionPreference.matches) {
      renderProgress(0);
      return;
    }
    const started = performance.now();
    const reset = (now) => {
      const elapsed = Math.min((now - started) / 350, 1);
      renderProgress(start * (1 - elapsed) ** 3);
      if (elapsed < 1) resetFrame = requestAnimationFrame(reset);
    };
    resetFrame = requestAnimationFrame(reset);
  };
  const completeIntro = () => {
    if (leaving || !welcomeIntro.open) return;
    if (motionPreference.matches || !signature || !wordmark || !signature.animate) {
      finishIntro();
      return;
    }
    leaving = true;
    welcomeIntro.classList.add('is-leaving');
    welcomeSlider.disabled = true;
    measureSignature();
    const textRange = document.createRange();
    textRange.selectNodeContents(signature);
    const textWidth = textRange.getBoundingClientRect().width;
    const scale = Math.max(1, Math.min(8, window.innerWidth * 0.85 / (textWidth || 1)));
    const centerX = window.innerWidth / 2 - (signatureOrigin.left + signatureOrigin.width / 2);
    const centerY = window.innerHeight / 2 - (signatureOrigin.top + signatureOrigin.height / 2);
    const grow = signature.animate(
      [{ transform: 'translate(0, 0) scale(1)' }, { transform: `translate(${centerX}px, ${centerY}px) scale(${scale})` }],
      { duration: 1500, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'forwards' }
    );
    const fadeContent = welcomeIntro.querySelector('.welcome-entry').animate(
      [{ opacity: 0.35 }, { opacity: 0 }], { duration: 300, fill: 'forwards' }
    );
    const fadeCaption = welcomeIntro.querySelector('.welcome-caption').animate(
      [{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' }
    );
    exitAnimations = [grow, fadeContent, fadeCaption];
    grow.onfinish = () => {
      const target = wordmark.getBoundingClientRect();
      const x = target.left + target.width / 2 - signatureOrigin.left - signatureOrigin.width / 2;
      const y = target.top + target.height / 2 - signatureOrigin.top - signatureOrigin.height / 2;
      const targetScale = parseFloat(getComputedStyle(wordmark).fontSize) / parseFloat(getComputedStyle(signature).fontSize);
      const move = signature.animate(
        [{ transform: `translate(${centerX}px, ${centerY}px) scale(${scale})`, opacity: 1 },
          { transform: `translate(${x}px, ${y}px) scale(${targetScale})`, opacity: 0 }],
        { duration: 1000, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards' }
      );
      const background = welcomeIntro.animate(
        [{ backgroundColor: 'rgba(36,35,38,.65)' }, { backgroundColor: 'rgba(36,35,38,0)' }],
        { duration: 1000, easing: 'ease-in-out', fill: 'forwards' }
      );
      exitAnimations.push(move, background);
      background.onfinish = finishIntro;
    };
  };
  if (signature && wordmark) {
    signature.style.animation = 'none';
    measureSignature();
    window.addEventListener('resize', () => {
      if (!welcomeIntro.open || leaving) return;
      measureSignature();
      renderProgress(Number(welcomeSlider.value));
    });
  }
  renderProgress(0);
  window.addEventListener('pageshow', () => {
    if (welcomeIntro.open && !leaving) {
      cancelAnimationFrame(resetFrame);
      renderProgress(0);
    }
  });
  welcomeSlider.addEventListener('pointerdown', (event) => {
    dragging = true;
    cancelAnimationFrame(resetFrame);
    welcomeSlider.setPointerCapture(event.pointerId);
  });
  welcomeSlider.addEventListener('pointerup', () => {
    dragging = false;
    if (Number(welcomeSlider.value) === 100) completeIntro();
    else resetProgress();
  });
  welcomeSlider.addEventListener('pointercancel', () => {
    dragging = false;
    resetProgress();
  });
  welcomeSlider.addEventListener('input', () => {
    const value = Number(welcomeSlider.value);
    renderProgress(value);
    if (value === 100 && !dragging) completeIntro();
  });
  welcomeIntro.addEventListener('cancel', (event) => {
    event.preventDefault();
    dismissIntro();
  });
  motionPreference.addEventListener('change', () => {
    if (motionPreference.matches && leaving && welcomeIntro.open) finishIntro();
    else if (welcomeIntro.open) renderProgress(Number(welcomeSlider.value));
  });
}

if ('IntersectionObserver' in window && !motionPreference.matches) {
  document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  revealItems.forEach((item) => observer.observe(item));
  motionPreference.addEventListener('change', (event) => {
    if (event.matches) {
      document.documentElement.classList.remove('js-motion');
      observer.disconnect();
    }
  });
}

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

const filterBar = document.querySelector('.project-filters');
const filterStatus = document.querySelector('.filter-status');
const projectCards = [...document.querySelectorAll('.projects > .project')];
const projectCategories = {
  'LoopLink': ['web', 'collaboration'],
  'Dhexx Panel': ['tools'],
  'LAMPP Manager': ['tools'],
  'WA Dashboard': ['web'],
  'Palmustaka Publisher': ['web'],
  'EduKita': ['web', 'collaboration'],
  'DexVoucher': ['web'],
};

if (filterBar && filterStatus) {
  filterBar.hidden = false;
  filterStatus.hidden = false;
  filterStatus.textContent = `${projectCards.length} projects`;
  filterBar.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-filter]');
    if (!button || button.getAttribute('aria-pressed') === 'true') return;
    filterBar.querySelectorAll('button').forEach((item) => {
      item.setAttribute('aria-pressed', String(item === button));
    });
    let visible = 0;
    projectCards.forEach((card) => {
      const categories = projectCategories[card.querySelector('h3').textContent] || [];
      card.hidden = button.dataset.filter !== 'all' && !categories.includes(button.dataset.filter);
      card.classList.remove('filtered-even');
      if (card.hidden) return;
      visible++;
      card.classList.toggle('filtered-even', visible % 2 === 0);
      card.classList.add('is-visible');
      if (!motionPreference.matches && card.animate) {
        card.getAnimations().forEach((animation) => animation.cancel());
        card.animate(
          [{ opacity: 0, transform: 'translateY(18px)' }, { opacity: 1, transform: 'none' }],
          { duration: 360, delay: Math.min(visible - 1, 3) * 45, fill: 'backwards', easing: 'ease-out' }
        );
      }
    });
    document.querySelector('.projects').classList.add('is-filtered');
    filterStatus.textContent = `${visible} ${visible === 1 ? 'project' : 'projects'} · ${button.textContent}`;
  });
}

document.querySelectorAll('.project-art').forEach((cover) => {
  let frame;
  const reset = () => {
    cancelAnimationFrame(frame);
    cover.style.removeProperty('--tilt-x');
    cover.style.removeProperty('--tilt-y');
    cover.classList.remove('is-tilting');
  };

  cover.addEventListener('pointermove', (event) => {
    if (motionPreference.matches || !finePointer.matches) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const bounds = cover.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      cover.style.setProperty('--tilt-x', `${-y * 5}deg`);
      cover.style.setProperty('--tilt-y', `${x * 5}deg`);
      cover.classList.add('is-tilting');
    });
  });
  cover.addEventListener('pointerleave', reset);
  cover.addEventListener('pointercancel', reset);
  motionPreference.addEventListener('change', reset);
  finePointer.addEventListener('change', reset);
});

document.querySelectorAll('.project-details').forEach((details) => {
  const summary = details.querySelector('summary');
  let animation;
  let expanded = details.open;

  const settle = () => {
    animation?.cancel();
    animation = null;
    details.open = expanded;
    details.style.removeProperty('overflow');
  };

  summary.addEventListener('click', (event) => {
    if (motionPreference.matches || !details.animate) return;
    event.preventDefault();
    const start = details.getBoundingClientRect().height;
    expanded = animation ? !expanded : !details.open;
    animation?.cancel();
    details.open = true;
    const end = expanded
      ? details.getBoundingClientRect().height
      : summary.getBoundingClientRect().height + 1;
    details.style.overflow = 'hidden';
    animation = details.animate(
      { height: [`${start}px`, `${end}px`] },
      { duration: 320, easing: 'cubic-bezier(.22,1,.36,1)' }
    );
    animation.onfinish = settle;
  });

  motionPreference.addEventListener('change', () => {
    if (animation) settle();
  });
});

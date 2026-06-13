/* =========================================================
   陽だまりの里  -  script.js
   ・スマホ用ハンバーガーメニュー開閉
   ・FAQアコーディオン
   ・お問い合わせフォームの簡易送信フィードバック
   ・現在ページのナビをアクティブ表示
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- ハンバーガーメニュー ---------- */
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      const isOpen = nav.classList.toggle('is-open');
      toggle.classList.toggle('is-open', isOpen);
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // メニュー内リンクを押したら閉じる（スマホ）
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open');
        toggle.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 現在ページをナビでハイライト ---------- */
  const current = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__list a').forEach(function (link) {
    const href = link.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });

  /* ---------- FAQアコーディオン ---------- */
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    if (!q || !a) return;

    q.setAttribute('aria-expanded', 'false');

    q.addEventListener('click', function () {
      const isOpen = item.classList.contains('is-open');

      if (isOpen) {
        item.classList.remove('is-open');
        a.style.maxHeight = null;
        q.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('is-open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ウィンドウリサイズ時に開いているFAQの高さを再計算
  window.addEventListener('resize', function () {
    document.querySelectorAll('.faq-item.is-open .faq-a').forEach(function (a) {
      a.style.maxHeight = a.scrollHeight + 'px';
    });
  });

  /* ---------- お問い合わせフォーム（デモ送信） ---------- */
  const form = document.querySelector('.form');
  const feedback = document.querySelector('.form__feedback');

  if (form && feedback) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      feedback.classList.add('is-visible');
      feedback.textContent =
        'お問い合わせありがとうございます。担当者より2〜3営業日以内にご連絡いたします。';
      form.reset();
      feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  /* ---------- 年号を自動表示 ---------- */
  const yearEl = document.querySelector('.js-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

});

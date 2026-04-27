    (function () {
      // Reveal on scroll
      var revealEls = document.querySelectorAll('.reveal');
      if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('in-view');
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.15 });
        revealEls.forEach(function (el) { io.observe(el); });
      } else {
        revealEls.forEach(function (el) { el.classList.add('in-view'); });
      }

      // FAQ accordion
      var faqItems = document.querySelectorAll('.faq-item');
      faqItems.forEach(function (item) {
        var btn = item.querySelector('.faq-pergunta');
        var resposta = item.querySelector('.faq-resposta');
        var icone = item.querySelector('.faq-icone');
        btn.addEventListener('click', function () {
          var isOpen = item.classList.contains('is-open');
          faqItems.forEach(function (other) {
            if (other !== item) {
              other.classList.remove('is-open');
              other.querySelector('.faq-resposta').style.maxHeight = null;
              other.querySelector('.faq-icone').textContent = '+';
            }
          });
          if (isOpen) {
            item.classList.remove('is-open');
            resposta.style.maxHeight = null;
            icone.textContent = '+';
          } else {
            item.classList.add('is-open');
            resposta.style.maxHeight = resposta.scrollHeight + 'px';
            icone.textContent = '−';
          }
        });
      });

      // Popup
      var overlay = document.getElementById('popupOverlay');
      var modal = document.getElementById('popup');
      var btnBasico = document.getElementById('btnBasico');
      var popupClose = document.getElementById('popupClose');
      var popupDecline = document.getElementById('popupDecline');

      function openPopup() {
        overlay.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        requestAnimationFrame(function () {
          overlay.classList.add('visible');
          modal.classList.add('visible');
        });
      }
      function closePopup() {
        overlay.classList.remove('visible');
        modal.classList.remove('visible');
        setTimeout(function () {
          overlay.style.display = 'none';
          document.body.style.overflow = '';
        }, 300);
      }

      if (btnBasico) {
        btnBasico.addEventListener('click', function (e) {
          e.preventDefault();
          openPopup();
        });
      }
      if (popupClose) popupClose.addEventListener('click', closePopup);
      if (popupDecline) {
        popupDecline.addEventListener('click', function (e) {
          // Fecha modal e segue para checkout do básico (href="#")
          // Browser navega em seguida; o close acontece imediatamente.
          closePopup();
        });
      }
      if (overlay) {
        overlay.addEventListener('click', function (e) {
          if (e.target === overlay) closePopup();
        });
      }
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay.classList.contains('visible')) closePopup();
      });
    })();

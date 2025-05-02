document.addEventListener("DOMContentLoaded", function () {
  const imagensInterativas = document.querySelectorAll('.imagem-interativa');
  const modal = document.getElementById('imagemModal');
  const imagemExpandida = document.getElementById('imagemExpandida');

  function abrirModal(src) {
    imagemExpandida.src = src;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function fecharModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    setTimeout(() => {
      imagemExpandida.src = '';
    }, 300);
  }

  imagensInterativas.forEach(img => {
    img.addEventListener('click', () => abrirModal(img.src));
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) fecharModal();
  });

  // Fechar modal com ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      fecharModal();
    }
  });

  const tipoBoloSelect = document.getElementById('tipoBolo');
  const massaSelect = document.getElementById('massa');
  const recheioSelect = document.getElementById('recheio');
  const pesoSelect = document.getElementById('peso');
  const divMassa = document.getElementById('divMassa');
  const divRecheio = document.getElementById('divRecheio');
  const semRecheio = document.getElementById('semRecheio');
  const semRecheioSelect = document.getElementById('semRecheioSelect');
  const cobertura = document.getElementById('cobertura');
  const coberturaSelectElement = document.getElementById('coberturaSelect');

  function limparSelect(selectElement) {
    while (selectElement.options.length > 0) {
      selectElement.remove(0);
    }
  }

  function updateOptions() {
    const tipoBolo = tipoBoloSelect.value;

    // Exibir tudo por padrão
    divMassa.style.display = 'block';
    divRecheio.style.display = 'block';
    cobertura.style.display = 'none';
    semRecheio.style.display = 'none';

    // Reset `required`
    massaSelect.required = true;
    recheioSelect.required = true;
    coberturaSelectElement.required = false;

    limparSelect(massaSelect);
    limparSelect(recheioSelect);
    limparSelect(pesoSelect);
    limparSelect(coberturaSelectElement);

    if (tipoBolo === 'bolo-confeitado') {
      cobertura.style.display = 'block';
      coberturaSelectElement.required = true;

      ['Chocolate', 'Baunilha', 'Bem Casado'].forEach(option => {
        massaSelect.add(new Option(option, option.toLowerCase().replace(/\s+/g, '-')));
      });

      [
        'Chocolate',
        'Chocolate Crocante',
        'Ninho',
        'Bem Casado',
        'Coco com Abacaxi',
        'Chocolate Branco com Geleia de Morango'
      ].forEach(option => {
        recheioSelect.add(new Option(option, option.toLowerCase().replace(/\s+/g, '-')));
      });

      ['Chantininho', 'Ganache'].forEach(option => {
        coberturaSelectElement.add(new Option(option, option.toLowerCase().replace(/\s+/g, '-')));
      });

      [14, 16, 20, 25].forEach(option => {
        pesoSelect.add(new Option(option, option));
      });

    } else if (tipoBolo === 'bolo-de-noiva') {
      divMassa.style.display = 'none';
      divRecheio.style.display = 'none';
      cobertura.style.display = 'none';

      massaSelect.required = false;
      recheioSelect.required = false;
      coberturaSelectElement.required = false;

      [14, 16, 20, 25].forEach(option => {
        pesoSelect.add(new Option(option, option));
      });

    } else if (tipoBolo === 'bolo-de-rolo') {
      divMassa.style.display = 'none';
      divRecheio.style.display = 'block';
      cobertura.style.display = 'none';

      massaSelect.required = false;
      recheioSelect.required = true;
      coberturaSelectElement.required = false;

      ['Goiabada', 'Noiva', 'Doce de Leite'].forEach(option => {
        recheioSelect.add(new Option(option, option.toLowerCase().replace(/\s+/g, '-')));
      });

      ['500gr', '1kg'].forEach(option => {
        pesoSelect.add(new Option(option, option));
      });
    }
  }

  tipoBoloSelect.addEventListener('change', updateOptions);
  updateOptions();

  window.enviarPedido = function (event) {
    event.preventDefault();

    const tipoBoloMap = {
      'bolo-confeitado': 'Bolo Confeitado',
      'bolo-de-noiva': 'Bolo de Noiva',
      'bolo-de-rolo': 'Bolo de Rolo'
    };

    const tipoBolo = tipoBoloSelect.value;
    let massa = null;
    let recheio = null;
    let cobertura = null;
    const peso = pesoSelect.value;

    if (tipoBolo === "bolo-confeitado") {
      massa = massaSelect?.value || null;
      recheio = recheioSelect?.value || null;
      cobertura = coberturaSelectElement?.value || null;
    } else if (tipoBolo === "bolo-de-rolo") {
      recheio = recheioSelect?.value || null;
    }

    function formatarTexto(texto) {
      return texto
        .replace(/-/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
    }

    let mensagem = `Olá, gostaria de fazer um pedido para: ${tipoBoloMap[tipoBolo] || tipoBolo}.`;

    if (massa) {
      mensagem += `\nMassa: ${formatarTexto(massa)}`;
    }

    if (recheio) {
      mensagem += `\nRecheio: ${formatarTexto(recheio)}`;
    }

    if (cobertura) {
      mensagem += `\nCobertura: ${formatarTexto(cobertura)}`;
    }

    if (peso) {
      mensagem += `\nTamanho: ${peso}`;
    }

    const whatsappURL = `https://wa.me/5581995651934?text=${encodeURIComponent(mensagem)}`;
    window.open(whatsappURL, "_blank");
  };

  // Menu Mobile
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  function toggleMenu() {
    menuToggle.classList.toggle('active');
    mainNav.classList.toggle('active');
    document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
  }

  menuToggle.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mainNav.classList.contains('active')) {
        toggleMenu();
      }
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener('click', (e) => {
    if (mainNav.classList.contains('active') && 
        !mainNav.contains(e.target) && 
        !menuToggle.contains(e.target)) {
      toggleMenu();
    }
  });
});

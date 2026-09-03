window.TabelaVerdade = (function () {
  let container;
  let numInputs = 2;
  let numOutputs = 1;
  const MAX_INPUTS = 6;
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  function criarLinha(isHeader) {
    return document.createElement('tr');
  }

  function criarCelula(texto, isHeader, clickable) {
    const el = document.createElement(isHeader ? 'th' : 'td');
    el.textContent = texto;
    if (clickable && !isHeader) {
      el.style.cursor = 'pointer';
      el.classList.add('tt-clickable');
      el.addEventListener('click', () => {
        el.textContent = el.textContent === '0' ? '1' : '0';
        el.classList.toggle('tt-one', el.textContent === '1');
      });
    }
    return el;
  }

  function gerarCombinacoes(n) {
    const total = Math.pow(2, n);
    const rows = [];
    for (let i = 0; i < total; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        row.push((i >> (n - 1 - j)) & 1);
      }
      rows.push(row);
    }
    return rows;
  }

  function renderizar() {
    container.innerHTML = '';

    const wrapper = document.createElement('div');
    wrapper.className = 'tt-wrapper';

    const btnRow = document.createElement('div');
    btnRow.className = 'tt-btn-row';

    const btnAdd = document.createElement('button');
    btnAdd.textContent = '+ Entrada';
    btnAdd.className = 'tt-btn';
    btnAdd.disabled = numInputs >= MAX_INPUTS;
    btnAdd.addEventListener('click', () => {
      if (numInputs < MAX_INPUTS) {
        numInputs++;
        renderizar();
      }
    });

    const btnRemove = document.createElement('button');
    btnRemove.textContent = '- Entrada';
    btnRemove.className = 'tt-btn tt-btn-remove';
    btnRemove.disabled = numInputs <= 1;
    btnRemove.addEventListener('click', () => {
      if (numInputs > 1) {
        numInputs--;
        renderizar();
      }
    });

    const btnReset = document.createElement('button');
    btnReset.textContent = 'Limpar Saídas';
    btnReset.className = 'tt-btn tt-btn-reset';
    btnReset.addEventListener('click', () => {
      renderizar();
    });

    btnRow.appendChild(btnRemove);
    btnRow.appendChild(btnAdd);
    btnRow.appendChild(btnReset);

    const table = document.createElement('table');
    table.className = 'tt-table';

    const thead = document.createElement('thead');
    const headerRow = criarLinha(true);

    for (let i = 0; i < numInputs; i++) {
      headerRow.appendChild(criarCelula(letters[i], true, false));
    }
    for (let i = 0; i < numOutputs; i++) {
      headerRow.appendChild(criarCelula('S' + (numOutputs > 1 ? (i + 1) : ''), true, false));
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');
    const combinacoes = gerarCombinacoes(numInputs);

    combinacoes.forEach((combo) => {
      const row = criarLinha(false);
      combo.forEach((val) => {
        row.appendChild(criarCelula(val, false, false));
      });
      for (let i = 0; i < numOutputs; i++) {
        row.appendChild(criarCelula('0', false, true));
      }
      tbody.appendChild(row);
    });

    table.appendChild(tbody);

    const info = document.createElement('p');
    info.className = 'tt-info';
    info.textContent = combinacoes.length + ' linhas | ' + numInputs + ' entrada(s) | Clique nas células da saída para alternar 0/1';

    wrapper.appendChild(btnRow);
    wrapper.appendChild(table);
    wrapper.appendChild(info);
    container.appendChild(wrapper);
  }

  function init(containerId) {
    container = document.getElementById(containerId);
    if (!container) return;
    renderizar();
  }

  return { init: init };
})();

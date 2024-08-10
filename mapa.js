const dados = [
    { id: 3547809, nome: "Santo André", total2022: 1091208312 },
    { id: 3548708, nome: "São Bernardo do Campo", total2022: 1359006794 },
    { id: 3548807, nome: "São Caetano do Sul", total2022: 496477143.94 },
    { id: 3513801, nome: "Diadema", total2022: 368709175.6 },
    { id: 3529401, nome: "Mauá", total2022: 289068120.4 },
    { id: 3543303, nome: "Ribeirão Pires", total2022: 102698064.6 },
    { id: 3544103, nome: "Rio Grande da Serra", total2022: 10334254.31 },
  ];
  
  const formatador = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  
  // Define a escala de cores
  const colorScale = d3.scaleSequential()
    .domain([0, d3.max(dados, d => d.total2022)])
    .interpolator(d3.interpolateBlues);
  
  // Seleciona o tooltip
  const tooltip = d3.select(".tooltip");
  const info = document.getElementById("info"); // Certifique-se de ter um elemento com ID 'info'
  
  function escondeDados() {
    info.innerText = "…";
  }
  
  function mostraDados(id) {
    let dado = dados.find(dado => dado.id === parseInt(id));
    if (dado) {
      let mensagem = `${dado.nome} arrecadou ${formatador.format(dado.total2022)} em 2022`;
      info.innerText = mensagem;
    }
  }
  
  // Seleciona os elementos do mapa e aplica a cor com base na escala de cores
  d3.selectAll('.map-region')
    .style('fill', d => {
      const valor = dados.find(dado => dado.id === parseInt(d.id.replace("mun_", "")))?.total2022 || 0;
      return colorScale(valor);
    })
    .on('mouseover', function(event, d) {
      // Muda a cor da região quando o mouse passa sobre
      d3.select(this).style('fill', 'blue');
      
      // Obtém o valor e a posição do mouse
      const [x, y] = d3.pointer(event);
      
      // Mostra o tooltip com base no ID
      let id = d.id.replace("mun_", "");
      let dado = dados.find(dado => dado.id === parseInt(id));
      if (dado) {
        tooltip
          .html(`${dado.nome} arrecadou ${formatador.format(dado.total2022)} em 2022`)
          .style('left', `${x + 10}px`)
          .style('top', `${y + 10}px`)
          .style('opacity', 1); // Torna o tooltip visível
      }
    })
    .on('mouseout', function(event, d) {
      // Restaura a cor da região e esconde o tooltip
      let valor = dados.find(dado => dado.id === parseInt(d.id.replace("mun_", "")))?.total2022 || 0;
      d3.select(this).style('fill', colorScale(valor));
      tooltip.style('opacity', 0); // Torna o tooltip invisível
    });
  
  // Adiciona eventos de mouseover e mouseout para os caminhos SVG (caso necessário)
  const cidades = document.querySelectorAll("svg path");
  
  for (let cidade of cidades) {
    cidade.onmouseover = () => {
      let id = cidade.id.replace("mun_", "");
      mostraDados(id);
    };
    cidade.onmouseout = () => {
      escondeDados();
    };
  }
  

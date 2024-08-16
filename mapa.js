// Dados de exemplo para impostos arrecadados por região (em reais)
const taxData = {
    "mun_3513801": 500000,
    "mun_3529401": 750000,
    "mun_3543303": 600000,
    "mun_3544103": 800000,
    "mun_3547809": 900000,
    "mun_3548708": 450000,
    "mun_3548807": 650000
  };
  
  // Função para configurar a escala de cores
  const colorScale = d3.scaleSequential()
    .domain([d3.min(Object.values(taxData))/2, d3.max(Object.values(taxData))])
    .interpolator(d3.interpolateOranges);
  
  // Seleciona todos os elementos do mapa com a classe 'map-region' e coloca o movimento do mouse
  const regions = d3.selectAll('.map-region');
  
  regions.on('mouseover', function(event, d) {
    const region = d3.select(this);
    const regionId = region.attr('id');
    const taxValue = taxData[regionId] || 0;
    
  
    // Mostra o tooltip com o valor do imposto
    const tooltip = d3.select('#tooltip');
    tooltip.style('display', 'block')
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY - 28) + 'px')
      .text(`Imposto Arrecadado: R$ ${taxValue.toLocaleString()}`);
  
    region.style('opacity', 0.8);
  
    // Destaca o nome da região correspondente
    const regionName = d3.select(`#text${regionId.slice(-7)}`);
    regionName.classed('highlight', true);
  })
  .on('mouseout', function() {
    const region = d3.select(this);
  
    // Oculta o tooltip
    d3.select('#tooltip').style('display', 'none');
  
    // Restaura a opacidade da região
    region.style('opacity', 1);
  
    // Remove o destaque do nome da região
    const regionName = d3.select(`#text${region.attr('id').slice(-7)}`);
    regionName.classed('highlight', false);
  });
  
  // Define a cor das regiões com base nos valores de impostos arrecadados
  regions.style('fill', function() {
    const regionId = d3.select(this).attr('id');
    const taxValue = taxData[regionId] || 0;
    return colorScale(taxValue);
  });
  

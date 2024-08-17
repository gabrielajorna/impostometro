// Dados fictícios para impostos arrecadados por região 
const taxData = {
    "mun_3513801": {nome:'Mauá', valor: 500000},
    "mun_3529401": {nome:'São Bernardo do Campo', valor:750000},
    "mun_3543303": {nome:'São Caetano do Sul', valor:600000},
    "mun_3544103": {nome:'Santo André', valor:800000},
    "mun_3547809": {nome:'Ribeirão Pires', valor:900000},
    "mun_3548708": {nome:'Rio Grande da Serra', valor:450000},
    "mun_3548807": {nome:'Diadema', valor:650000}
};
  
  // Configurando escala de cores
  const valores = Object.values(taxData).map(d => d.valor);
  const colorScale = d3.scaleSequential()
    .domain([d3.min(valores)/2, d3.max(valores)])
    .interpolator(d3.interpolateOranges);

  
  // Selecionando os elementos do mapa e coloca o tooltip
  const regions = d3.selectAll('.map-region');
  
  regions.on('mouseover', function(event, d) {
    const region = d3.select(this);
    const regionId = region.attr('id');
    const taxValue = taxData[regionId].valor || 0;
    const taxMun = taxData[regionId].nome;
    
    const tooltip = d3.select('#tooltip');
    tooltip.style('display', 'block')
      .style('left', (event.pageX + 10) + 'px')
      .style('top', (event.pageY - 28) + 'px')
      .text(`${taxMun} R$ ${taxValue.toLocaleString()}`);
  
    region.style('opacity', 0.8);
  
    // Destacando o nome da região correspondente
    const regionName = d3.select(`#text${regionId.slice(-7)}`);
    regionName.classed('highlight', true);
  })
  .on('mouseout', function() {
    const region = d3.select(this);
  
    d3.select('#tooltip').style('display', 'none');
  
    region.style('opacity', 1);
  
    const regionName = d3.select(`#text${region.attr('id').slice(-7)}`);
    regionName.classed('highlight', false);
  });
  
  // Define a cor das regiões com base nos valores de impostos arrecadados
  regions.style('fill', function() {
    const regionId = d3.select(this).attr('id');
    const taxValue = taxData[regionId].valor || 0;
    return colorScale(taxValue);
  });
  

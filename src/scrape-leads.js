import { client } from './apify-client.js';
import { writeFileSync } from 'fs';

const ACTOR_ID = 'compass/google-maps-scraper';

const INPUT = {
  searchStringsArray: ['restaurantes em Sorocaba SP'],
  maxCrawledPlacesPerSearch: 100,
  language: 'pt',
  exportPlaceUrls: false,
  includeHistogram: false,
  includeOpeningHours: true,
  includePeopleAlsoSearch: false,
  maxImages: 0,
  maxReviews: 0,
  scrapeDirectories: false,
  deeperCityScrape: false,
};

async function scrapeRestaurants() {
  console.log('Iniciando scraping de restaurantes em Sorocaba...');
  console.log(`Actor: ${ACTOR_ID}`);
  console.log(`Máximo de resultados: ${INPUT.maxCrawledPlacesPerSearch}`);
  console.log('---');

  const run = await client.actor(ACTOR_ID).call(INPUT, {
    waitSecs: 300,
  });

  console.log(`Run ID: ${run.id}`);
  console.log(`Status: ${run.status}`);
  console.log('Coletando resultados...');

  const { items } = await client.dataset(run.defaultDatasetId).listItems();

  console.log(`Total de leads encontrados: ${items.length}`);

  const leads = items.map((place) => ({
    nome: place.title ?? '',
    categoria: place.categoryName ?? '',
    endereco: place.address ?? '',
    bairro: place.neighborhood ?? place.addressParsed?.neighborhood ?? '',
    cidade: place.city ?? place.addressParsed?.city ?? 'Sorocaba',
    cep: place.postalCode ?? place.addressParsed?.postalCode ?? '',
    telefone: place.phone ?? '',
    website: place.website ?? '',
    email: place.email ?? '',
    rating: place.totalScore ?? '',
    totalAvaliacoes: place.reviewsCount ?? 0,
    horarios: place.openingHours
      ? place.openingHours.map((h) => `${h.day}: ${h.hours}`).join(' | ')
      : '',
    googleMapsUrl: place.url ?? '',
    plusCode: place.plusCode ?? '',
    latitude: place.location?.lat ?? '',
    longitude: place.location?.lng ?? '',
  }));

  // Save JSON
  writeFileSync('leads-restaurantes-sorocaba.json', JSON.stringify(leads, null, 2));
  console.log('Salvo: leads-restaurantes-sorocaba.json');

  // Save CSV
  const csvHeader = Object.keys(leads[0] ?? {}).join(';');
  const csvRows = leads.map((lead) =>
    Object.values(lead)
      .map((v) => `"${String(v).replace(/"/g, '""')}"`)
      .join(';')
  );
  const csv = [csvHeader, ...csvRows].join('\n');
  writeFileSync('leads-restaurantes-sorocaba.csv', csv, 'utf-8');
  console.log('Salvo: leads-restaurantes-sorocaba.csv');

  console.log('---');
  console.log(`Concluido! ${leads.length} leads coletados.`);

  // Preview first 5
  console.log('\nPreview (primeiros 5 resultados):');
  leads.slice(0, 5).forEach((lead, i) => {
    console.log(`\n[${i + 1}] ${lead.nome}`);
    console.log(`    Categoria: ${lead.categoria}`);
    console.log(`    Endereco:  ${lead.endereco}`);
    console.log(`    Telefone:  ${lead.telefone || 'N/A'}`);
    console.log(`    Website:   ${lead.website || 'N/A'}`);
    console.log(`    Rating:    ${lead.rating} (${lead.totalAvaliacoes} avaliações)`);
  });

  return leads;
}

scrapeRestaurants().catch((err) => {
  console.error('Erro ao executar scraper:', err.message);
  process.exit(1);
});

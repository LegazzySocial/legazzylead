# LegazzySocial Lead

Gerador de leads de restaurantes usando a API do Apify (Google Maps Scraper).

## Requisitos

- Node.js 18+
- Conta no [Apify](https://apify.com) com token de API

## Instalação

```bash
git clone https://github.com/LegazzySocial/legazzylead
cd legazzylead
git checkout claude/apify-api-connection-oW4XE
npm install
```

## Configuração

```bash
cp .env.example .env
```

Edite o `.env` e adicione seu token:

```
APIFY_API_TOKEN=apify_api_xxxxxxxxxxxx
```

## Uso

### Gerar leads de restaurantes em Sorocaba

```bash
npm run scrape
```

Os arquivos serão gerados na raiz do projeto:

| Arquivo | Descrição |
|---|---|
| `leads-restaurantes-sorocaba.json` | Dados completos em JSON |
| `leads-restaurantes-sorocaba.csv` | Planilha para Excel / Numbers |

### Abrir no Mac

```bash
open leads-restaurantes-sorocaba.csv
```

## Campos coletados

| Campo | Descrição |
|---|---|
| nome | Nome do restaurante |
| categoria | Tipo de culinária |
| endereco | Endereço completo |
| bairro | Bairro |
| cidade | Cidade |
| cep | CEP |
| telefone | Telefone |
| website | Site |
| email | E-mail |
| rating | Nota (0–5) |
| totalAvaliacoes | Número de avaliações |
| horarios | Horários de funcionamento |
| googleMapsUrl | Link do Google Maps |
| latitude / longitude | Coordenadas geográficas |

## Scripts disponíveis

```bash
npm start       # Testa conexão com a API
npm run scrape  # Gera lista de leads
```

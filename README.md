# Pizzaurum Platform - Deployment Guide

## Strategia di Deployment

Questa monorepo utilizza una strategia di deployment ibrida:

### 🎨 Sanity Studio (`apps/studio/`)
- **Platform**: Sanity Cloud
- **Motivo**: Piattaforma nativa per Sanity Studio v4
- **Vantaggi**: Zero configurazione, hosting automatico, CDN globale

### 📧 Email API (`apps/email/`)
- **Platform**: Vercel
- **Motivo**: Ottimizzato per Next.js 15 e serverless functions
- **Vantaggi**: Performance edge, integrazione perfetta con Resend

## Deployment Steps

### 1. Sanity Studio Deployment

```bash
cd apps/studio
npm run deploy
```

Questo comando:
- Builda lo studio
- Lo deploya su Sanity Cloud
- Rende disponibile su `https://i20dthz1.sanity.studio`

### 2. Email API Deployment

#### Setup Vercel (Opzione 1 - Raccomandata):
1. Connetti il repository a Vercel dalla **root** del progetto
2. Vercel userà automaticamente il `vercel.json` nella root
3. Imposta le variabili d'ambiente:
   - `RESEND_API_KEY`: La tua API key di Resend
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`: `i20dthz1`
   - `NEXT_PUBLIC_SANITY_DATASET`: `production`

#### Setup Vercel (Opzione 2 - Workspace Separato):
1. Connetti il repository a Vercel
2. Configura il root directory come `apps/email`
3. Vercel installerà le dipendenze direttamente nella cartella email
4. Imposta le variabili d'ambiente come sopra

#### Deploy:
```bash
# Dalla root del progetto
vercel --prod

# Oppure dalla cartella email (se usi opzione 2)
cd apps/email && vercel --prod
```

## Environment Variables

### Sanity Studio
- Nessuna configurazione aggiuntiva necessaria
- Le credenziali sono gestite automaticamente da Sanity

### Email API (Vercel)
```env
RESEND_API_KEY=your_resend_api_key_here
NEXT_PUBLIC_SANITY_PROJECT_ID=i20dthz1
NEXT_PUBLIC_SANITY_DATASET=production
```

## Workflow di Sviluppo

### Locale
```bash
# Studio
cd apps/studio && npm run dev

# Email API
cd apps/email && npm run dev
```

### Production

#### Deploy Sanity Studio:
```bash
cd apps/studio
npm run deploy
```
Questo deploya automaticamente su `https://i20dthz1.sanity.studio`

#### Deploy Email API:
```bash
# Dalla root del progetto
vercel --prod

# Oppure se usi workspace separato
cd apps/email && vercel --prod
```

### Deploy Automatici
- **Studio**: Ogni push su `main` → deploy automatico su Sanity Cloud
- **Email API**: Ogni push su `main` → deploy automatico su Vercel

## Vantaggi di questa Strategia

1. **Specializzazione**: Ogni app usa la piattaforma ottimale
2. **Scalabilità**: Serverless per API, CDN globale per contenuti
3. **Costi**: Pay-per-use per Vercel, hosting incluso per Sanity
4. **Manutenzione**: Zero configurazione per Sanity, automatico per Vercel
5. **Performance**: Edge functions per API, CDN globale per contenuti

## Monitoraggio

- **Sanity**: Dashboard integrata con analytics
- **Vercel**: Analytics e monitoring automatici
- **Resend**: Dashboard per tracking email

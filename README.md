# Олимпийци — Сайт

## Инсталация

```bash
npm install
```

## Разработка

```bash
npm run dev
```

Отваря на http://localhost:4321

## Build

```bash
npm run build
```

## Деплой

Автоматично при `git push` към `main` чрез GitHub Actions.

### Настройка на GitHub Pages:
1. Settings → Pages → Source: GitHub Actions
2. Push към main → автоматичен деплой

## Структура

- `src/layouts/Base.astro` — nav, footer, SEO (само тук се редактират)
- `src/pages/` — отделна страница = отделен файл
- `public/` — статични файлове (снимки, favicon, og-image)

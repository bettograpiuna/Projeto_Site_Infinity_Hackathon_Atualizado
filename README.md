# Infinity School — Site Institucional

Site institucional moderno, responsivo e acessível, que apresenta os cursos,
diferenciais e a filosofia de uma escola de tecnologia e economia criativa.
Inspirado no site oficial [infinityschool.com.br](https://infinityschool.com.br/).

Projeto **estático** (HTML + CSS + JavaScript puro), sem necessidade de build
ou instalação de pacotes — pode ser publicado diretamente no GitHub Pages.

## ✨ Funcionalidades

- **Design responsivo** — adapta-se a desktop, tablet e celular.
- **Tema dual (vermelho/azul)** — alternador que salva a preferência no navegador.
- **Conteúdo dinâmico** — mural de novidades carregado de um arquivo JSON (`db.json`).
- **Componentes interativos** — modais de login, contato e horários, e menu mobile.
- **Animações** — revelação de seções no scroll e efeitos de entrada no hero.
- **Acessibilidade** — link "pular para o conteúdo", foco visível pelo teclado,
  rótulos `aria`, botões semânticos e respeito a `prefers-reduced-motion`.

## 🗂️ Estrutura do projeto

| Arquivo | Função |
| --- | --- |
| `index.html` | Página inicial (hero, cursos, números, novidades, diferenciais, alunos, contato) |
| `sobre.html` | Página "Sobre Nós" |
| `fullstack.html`, `marketing.html`, `design.html`, `photography.html`, `fdesign.html` | Páginas dos 5 cursos |
| `style.css` | Folha de estilo única, com sistema de design baseado em variáveis (tokens) |
| `script.js` | Interatividade: tema, menu, modais, animações e carregamento do mural |
| `db.json` | "Banco de dados" simples com avisos, professores e novos cursos |
| `assets/` | Imagens e vídeo |

## 🛠️ Tecnologias

- **HTML5** — estrutura semântica e acessível.
- **CSS3** — variáveis (tokens), Flexbox, Grid, `clamp()`, animações e `prefers-reduced-motion`.
- **JavaScript** — DOM, `fetch`, `IntersectionObserver` e `localStorage`.
- **Fontes** — Sora (títulos) e Inter (texto), via Google Fonts.

## ▶️ Como rodar localmente

Por usar `fetch` para ler o `db.json`, abra o projeto com um servidor local
(abrir o arquivo direto pelo `file://` bloqueia o carregamento do mural):

```bash
# opção 1 — Python
python -m http.server 8000

# opção 2 — Node (npx)
npx serve
```

Depois acesse `http://localhost:8000` no navegador.

## 📌 Histórico

Projeto desenvolvido como exercício de aprendizado e posteriormente
**modernizado (v8.0)**: redesign visual completo, remoção de código duplicado,
correção de links e melhorias de acessibilidade, performance e SEO.

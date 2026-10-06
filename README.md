# 📊 FinQuest — Planilha Financeira Gamificada & BI Interativo

> Uma aplicação web interativa, responsiva e gamificada que ensina planejamento financeiro pessoal, métricas de BI e simulação de investimentos em tempo real, acompanhada por um mentor virtual em português e exportação idêntica para planilha Excel (.xlsx).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FHenriqueHintz%2FDashboard-Bi)

---

## 🚀 Demonstração & Recursos

### 1. 🧮 Grade Financeira Interativa (Estilo Excel)
* **Regra 50/30/20 Integrada:** Divisão automática entre **Necessidades (50%)**, **Desejos (30%)** e **Investimentos (20%)**.
* **Fórmulas em Tempo Real:** Recálculo instantâneo de totais previstos vs. realizados, saldo livre e pontuação de saúde orçamentária (Score 0-100).
* **Edição Dinâmica:** Adicione, edite e remova despesas com feedback instantâneo na barra de fórmula `fx`.

### 2. 🧙‍♂️ Fin — O Mentor Gamificado
* **Tour Guiado em Português:** 5 missões práticas que ensinam desde o primeiro cadastro de despesa até a reserva de emergência e poder dos juros compostos.
* **Sistema de XP e Níveis:** Acumule pontos de experiência (XP) ao avançar nas etapas e evolua de *Aventureiro das Contas* até *Mestre da Liberdade Financeira*.
* **Efeitos Sonoros & Confete:** Sons sintetizados via Web Audio API (sem dependência de arquivos externos) e confetes ao subir de nível.

### 3. 🛡️ Calculadora de Reserva de Emergência
* Projeção automática da fortaleza financeira baseada nos seus custos essenciais mensais.
* Cálculo do tempo restante em meses com base na capacidade mensal de aporte.
* Termômetro de segurança visual com alertas de vulnerabilidade ou proteção blindada.

### 4. 📈 Simulador de Juros Compostos & Patrimônio
* Visualização da fórmula exponencial: $M = P \cdot (1 + i)^n + \text{Aportes Mensais}$.
* Tabela ano a ano detalhando total investido do próprio bolso vs. juros acumulados gerados pelo tempo.
* Gráfico interativo com projeção de renda passiva mensal estimada.

### 5. 📚 Dicionário & Glossário Financeiro Descomplicado
* Explicação direta e sem economês de termos cruciais: **CDI, Selic, IPCA, Liquidez Diária, Reserva de Emergência, Regra 50/30/20, Volatilidade**.
* Busca dinâmica por palavra-chave e filtro por categorias.

### 6. 📥 Exportação Fidedigna para Excel (.xlsx)
* Botão de 1 clique que gera e baixa uma planilha Excel completa com 4 abas formatadas contendo todos os dados, fórmulas e tabelas simuladas.

---

## 🛠️ Tecnologias Utilizadas

* **React 19 & TypeScript:** Tipagem estrita, performance reativa e componentes desacoplados.
* **Vite:** Bundler ultrarrápido com hot-reload instantâneo.
* **Tailwind CSS:** Design dark mode premium com estética inspirada em dashboards financeiros de alta fidelidade.
* **SheetJS (xlsx):** Geração e exportação client-side de planilhas Excel estruturadas.
* **Web Audio API:** Sintetizador nativo para efeitos sonoros imersivos sem dependência de assets de áudio externos.
* **Canvas Confetti:** Animações visuais de celebração ao bater metas e missões.
* **Lucide React:** Ícones modernos e consistentes.

---

## 📦 Como Executar Localmente

### Pré-requisitos
* Node.js 18+ instalado.
* NPM ou Yarn ou PNPM.

### Instalação e Execução

```bash
# 1. Clone o repositório
git clone https://github.com/HenriqueHintz/Dashboard-Bi.git

# 2. Acesse a pasta do projeto
cd Dashboard-Bi

# 3. Instale as dependências
npm install

# 4. Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173` no seu navegador.

---

## 🌐 Como Fazer Deploy na Vercel (1 Minuto)

1. Faça login em [vercel.com](https://vercel.com).
2. Clique no botão **"Add New..."** ➡️ **"Project"**.
3. Conecte sua conta do GitHub e selecione o repositório **`Dashboard-Bi`**.
4. A Vercel detectará automaticamente a configuração do Vite:
   - **Framework Preset:** `Vite`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
5. Clique em **"Deploy"**.
6. Pronto! Sua aplicação estará no ar com HTTPS gratuito e atualizações contínuas a cada commit no branch `main`.

---

## 📄 Licença

Distribuído sob a licença MIT. Criado por Henrique Hintz.

import * as XLSX from 'xlsx';
import { BudgetItem, BudgetSummary, EmergencyFundConfig, CompoundProjectionYear } from '../types/finance';
import { GLOSSARY_TERMS } from '../data/defaultData';

export function exportFinancialSpreadsheetToExcel(params: {
  income: number;
  items: BudgetItem[];
  summary: BudgetSummary;
  emergencyConfig: EmergencyFundConfig;
  projections: CompoundProjectionYear[];
}) {
  const { income, items, summary, emergencyConfig, projections } = params;

  const wb = XLSX.utils.book_new();

  // ── ABA 1: ORÇAMENTO MENSAL (50/30/20) ──
  const budgetRows: Array<Record<string, unknown>> = [
    { A: 'PLANEJAMENTO FINANCEIRO MENSAL — REGRA 50/30/20', B: '', C: '', D: '', E: '', F: '' },
    { A: 'Renda Líquida Mensal:', B: income, C: '', D: 'Saldo Livre Real:', E: summary.balanceActual, F: '' },
    { A: '', B: '', C: '', D: '', E: '', F: '' },
    {
      A: '#',
      B: 'CATEGORIA',
      C: 'ITEM / DESCRIÇÃO',
      D: 'PREVISTO (R$)',
      E: 'REALIZADO (R$)',
      F: 'DIFERENÇA (R$)',
    },
  ];

  items.forEach((item, idx) => {
    budgetRows.push({
      A: idx + 1,
      B: item.category,
      C: item.name,
      D: item.planned,
      E: item.actual,
      F: item.planned - item.actual,
    });
  });

  budgetRows.push(
    { A: '', B: '', C: '', D: '', E: '', F: '' },
    {
      A: 'TOTAIS',
      B: 'TOTAL DE GASTOS',
      C: 'SOMA GERAL',
      D: summary.totalPlannedExpenses,
      E: summary.totalActualExpenses,
      F: summary.totalPlannedExpenses - summary.totalActualExpenses,
    },
    { A: '', B: '', C: '', D: '', E: '', F: '' },
    { A: 'RESUMO REGRA 50/30/20', B: 'META', C: 'REALIZADO (R$)', D: '% DA RENDA', E: 'STATUS', F: '' },
    {
      A: 'Necessidades',
      B: '50%',
      C: summary.categories.necessidades.actual,
      D: `${summary.categories.necessidades.actualPercent.toFixed(1)}%`,
      E: summary.rule503020Status.necessidadesOk ? 'DENTRO DA META' : 'EXCEDIDO',
      F: '',
    },
    {
      A: 'Desejos Pessoais',
      B: '30%',
      C: summary.categories.desejos.actual,
      D: `${summary.categories.desejos.actualPercent.toFixed(1)}%`,
      E: summary.rule503020Status.desejosOk ? 'DENTRO DA META' : 'EXCEDIDO',
      F: '',
    },
    {
      A: 'Investimentos',
      B: '20%',
      C: summary.categories.investimentos.actual,
      D: `${summary.categories.investimentos.actualPercent.toFixed(1)}%`,
      E: summary.rule503020Status.investimentosOk ? 'META ATINGIDA' : 'ABAIXO DA META',
      F: '',
    }
  );

  const wsBudget = XLSX.utils.json_to_sheet(budgetRows, { skipHeader: true });
  wsBudget['!cols'] = [{ wch: 6 }, { wch: 18 }, { wch: 35 }, { wch: 16 }, { wch: 16 }, { wch: 16 }];
  XLSX.utils.book_append_sheet(wb, wsBudget, '1. Orçamento Mensal');

  // ── ABA 2: RESERVA DE EMERGÊNCIA ──
  const targetAmount = emergencyConfig.monthlyEssentialCost * emergencyConfig.targetMonths;
  const remaining = Math.max(0, targetAmount - emergencyConfig.currentSaved);

  const emergencyRows = [
    { A: 'PLANEJAMENTO DA RESERVA DE EMERGÊNCIA', B: '' },
    { A: '', B: '' },
    { A: 'Custo de Vida Essencial Mensal (R$):', B: emergencyConfig.monthlyEssentialCost },
    { A: 'Meta de Cobertura (Meses):', B: emergencyConfig.targetMonths },
    { A: 'Valor Total da Meta (R$):', B: targetAmount },
    { A: 'Saldo Já Guardado (R$):', B: emergencyConfig.currentSaved },
    { A: 'Falta Guardar (R$):', B: remaining },
    { A: 'Aporte Mensal Planejado (R$):', B: emergencyConfig.monthlyDeposit },
    { A: 'Tempo Estimado (Meses):', B: Math.ceil(remaining / Math.max(1, emergencyConfig.monthlyDeposit)) },
    { A: '', B: '' },
    { A: 'RECOMENDAÇÃO DE ONDE INVESTIR:', B: 'CDB 100% CDI Liquidez Diária ou Tesouro Selic' },
  ];

  const wsEmergency = XLSX.utils.json_to_sheet(emergencyRows, { skipHeader: true });
  wsEmergency['!cols'] = [{ wch: 38 }, { wch: 25 }];
  XLSX.utils.book_append_sheet(wb, wsEmergency, '2. Reserva de Emergência');

  // ── ABA 3: JUROS COMPOSTOS ──
  const compoundRows: Array<Record<string, unknown>> = [
    { A: 'PROJEÇÃO DE JUROS COMPOSTOS ANO A ANO', B: '', C: '', D: '' },
    { A: '', B: '', C: '', D: '' },
    { A: 'ANO', B: 'TOTAL INVESTIDO (R$)', C: 'JUROS GANHOS (R$)', D: 'PATRIMÔNIO ACUMULADO (R$)' },
  ];

  projections.forEach((p) => {
    compoundRows.push({
      A: `Ano ${p.year}`,
      B: p.totalInvested,
      C: p.totalInterest,
      D: p.totalAccumulated,
    });
  });

  const wsCompound = XLSX.utils.json_to_sheet(compoundRows, { skipHeader: true });
  wsCompound['!cols'] = [{ wch: 12 }, { wch: 24 }, { wch: 22 }, { wch: 28 }];
  XLSX.utils.book_append_sheet(wb, wsCompound, '3. Juros Compostos');

  // ── ABA 4: GLOSSÁRIO FINANCEIRO ──
  const glossaryRows: Array<Record<string, unknown>> = [
    { A: 'GLOSSÁRIO & DICIONÁRIO DE TERMOS FINANCEIROS', B: '', C: '', D: '' },
    { A: '', B: '', C: '', D: '' },
    { A: 'TERMO / SIGLA', B: 'CATEGORIA', C: 'RESUMO EXPLICATIVO', D: 'DICA DE OURO' },
  ];

  GLOSSARY_TERMS.forEach((g) => {
    glossaryRows.push({
      A: g.acronym ? `${g.term} (${g.acronym})` : g.term,
      B: g.category,
      C: g.summary,
      D: g.tip,
    });
  });

  const wsGlossary = XLSX.utils.json_to_sheet(glossaryRows, { skipHeader: true });
  wsGlossary['!cols'] = [{ wch: 35 }, { wch: 18 }, { wch: 60 }, { wch: 50 }];
  XLSX.utils.book_append_sheet(wb, wsGlossary, '4. Glossário Financeiro');

  // Disparar Download no Navegador
  XLSX.writeFile(wb, 'Planilha_Financeira_Oficial.xlsx');
}

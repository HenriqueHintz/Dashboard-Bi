import React from 'react';
import { BudgetSummary } from '../../types/finance';
import { formatCurrency, formatPercent } from '../../utils/financialFormulas';
import { Wallet, TrendingDown, PiggyBank, Percent, Sparkles } from 'lucide-react';

interface KpiCardsProps {
  summary: BudgetSummary;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
      {/* 1. Renda Total */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>Renda Líquida</span>
          <Wallet className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="text-base sm:text-lg font-bold font-mono text-slate-100">
          {formatCurrency(summary.totalIncome)}
        </div>
        <span className="text-[10px] text-slate-500 font-mono">100% da base mensal</span>
      </div>

      {/* 2. Total de Gastos */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>Gastos Reais</span>
          <TrendingDown className="w-4 h-4 text-rose-400" />
        </div>
        <div className="text-base sm:text-lg font-bold font-mono text-slate-100">
          {formatCurrency(summary.totalActualExpenses)}
        </div>
        <span className="text-[10px] text-slate-500 font-mono">
          Previsto: {formatCurrency(summary.totalPlannedExpenses)}
        </span>
      </div>

      {/* 3. Saldo Livre */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>Saldo Livre</span>
          <PiggyBank className="w-4 h-4 text-amber-400" />
        </div>
        <div
          className={`text-base sm:text-lg font-bold font-mono ${
            summary.balanceActual >= 0 ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {formatCurrency(summary.balanceActual)}
        </div>
        <span className="text-[10px] text-slate-500 font-mono">
          {summary.balanceActual >= 0 ? 'Superávit no mês' : 'Déficit (Atenção!)'}
        </span>
      </div>

      {/* 4. Taxa de Poupança */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3.5 shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
          <span>Taxa de Poupança</span>
          <Percent className="w-4 h-4 text-blue-400" />
        </div>
        <div className="text-base sm:text-lg font-bold font-mono text-blue-400">
          {formatPercent(summary.savingsRate)}
        </div>
        <span className="text-[10px] text-slate-500 font-mono">Meta ideal: ≥ 20%</span>
      </div>

      {/* 5. Score 50/30/20 */}
      <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-slate-900 via-slate-850 to-emerald-950/40 border border-emerald-500/30 rounded-2xl p-3.5 shadow-sm">
        <div className="flex items-center justify-between text-xs text-emerald-400 font-semibold mb-1">
          <span>Score Financeiro</span>
          <Sparkles className="w-4 h-4 text-amber-400" />
        </div>
        <div className="text-base sm:text-lg font-bold font-mono text-emerald-300">
          {summary.rule503020Status.overallScore} / 100
        </div>
        <span className="text-[10px] text-slate-400 font-mono">
          {summary.rule503020Status.overallScore >= 80 ? 'Saúde Excelente 🌟' : 'Pode Otimizar 💡'}
        </span>
      </div>
    </div>
  );
};

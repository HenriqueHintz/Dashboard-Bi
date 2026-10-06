import React from 'react';
import { BudgetSummary } from '../../types/finance';
import { formatCurrency, formatPercent } from '../../utils/financialFormulas';
import { Wallet, TrendingDown, PiggyBank, Percent, ShieldCheck } from 'lucide-react';

interface KpiCardsProps {
  summary: BudgetSummary;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ summary }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
      {/* 1. Renda Total */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium">Renda Líquida</span>
          <div className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
            <Wallet className="w-4 h-4" />
          </div>
        </div>
        <div className="text-base sm:text-xl font-extrabold font-mono text-slate-900">
          {formatCurrency(summary.totalIncome)}
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5">Base 100% do orçamento</div>
      </div>

      {/* 2. Total de Gastos */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium">Gastos Reais</span>
          <div className="w-7 h-7 rounded-lg bg-rose-50 flex items-center justify-center text-rose-600">
            <TrendingDown className="w-4 h-4" />
          </div>
        </div>
        <div className="text-base sm:text-xl font-extrabold font-mono text-slate-900">
          {formatCurrency(summary.totalActualExpenses)}
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5">
          Previsto: {formatCurrency(summary.totalPlannedExpenses)}
        </div>
      </div>

      {/* 3. Saldo Livre */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium">Saldo Livre</span>
          <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
            <PiggyBank className="w-4 h-4" />
          </div>
        </div>
        <div
          className={`text-base sm:text-xl font-extrabold font-mono ${
            summary.balanceActual >= 0 ? 'text-emerald-700' : 'text-rose-600'
          }`}
        >
          {formatCurrency(summary.balanceActual)}
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5">
          {summary.balanceActual >= 0 ? 'Sobra limpa no mês' : 'Atenção: déficit!'}
        </div>
      </div>

      {/* 4. Taxa de Poupança */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-sm">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium">Taxa de Poupança</span>
          <div className="w-7 h-7 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
            <Percent className="w-4 h-4" />
          </div>
        </div>
        <div className="text-base sm:text-xl font-extrabold font-mono text-indigo-700">
          {formatPercent(summary.savingsRate)}
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5">Meta ideal: ≥ 20%</div>
      </div>

      {/* 5. Score de Saúde Financeira */}
      <div className="bg-white border border-slate-200 rounded-2xl p-3.5 sm:p-4 shadow-sm col-span-2 lg:col-span-1">
        <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
          <span className="font-medium">Score Orçamentário</span>
          <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <div className="text-base sm:text-xl font-extrabold font-mono text-amber-700">
          {summary.rule503020Status.overallScore} / 100
        </div>
        <div className="text-[11px] text-slate-400 mt-0.5">
          {summary.rule503020Status.overallScore >= 80 ? 'Excelente saúde!' : 'Espaço para otimizar'}
        </div>
      </div>
    </div>
  );
};

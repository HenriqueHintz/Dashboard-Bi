import React, { useState } from 'react';
import { BudgetSummary } from '../../types/finance';
import { formatCurrency } from '../../utils/financialFormulas';
import { Wallet, TrendingDown, PiggyBank, Edit3, Check } from 'lucide-react';

interface KpiCardsProps {
  summary: BudgetSummary;
  onIncomeChange?: (income: number) => void;
}

export const KpiCards: React.FC<KpiCardsProps> = ({ summary, onIncomeChange }) => {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(summary.totalIncome.toString());

  const handleSave = () => {
    const num = parseFloat(val.replace(',', '.'));
    if (!isNaN(num) && num >= 0 && onIncomeChange) {
      onIncomeChange(num);
    }
    setEditing(false);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
      {/* 1. Renda do Mês */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5">
            <Wallet className="w-4 h-4 text-blue-600" /> Renda Mensal
          </span>
          {onIncomeChange && !editing && (
            <button
              onClick={() => {
                setVal(summary.totalIncome ? summary.totalIncome.toString() : '');
                setEditing(true);
              }}
              className="text-xs text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1 bg-blue-50 px-2 py-1 rounded-lg transition-colors"
            >
              <Edit3 className="w-3 h-3" />
              <span>{summary.totalIncome === 0 ? 'Definir' : 'Editar'}</span>
            </button>
          )}
        </div>

        {editing ? (
          <div className="flex items-center gap-2 mt-1">
            <span className="text-sm font-bold text-slate-400">R$</span>
            <input
              type="number"
              placeholder="Ex: 5000"
              value={val}
              onChange={(e) => setVal(e.target.value)}
              className="w-full bg-white border-2 border-blue-600 rounded-xl px-3 py-1.5 text-lg font-extrabold text-slate-900 focus:outline-none"
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSave()}
            />
            <button
              onClick={handleSave}
              className="p-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors shadow-xs"
              title="Salvar"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="text-2xl sm:text-3xl font-extrabold font-mono text-slate-900 tracking-tight">
            {formatCurrency(summary.totalIncome)}
          </div>
        )}

        <div className="text-xs text-slate-400 mt-2">
          {summary.totalIncome === 0 ? 'Clique em Definir para começar' : 'Base 100% dos seus cálculos'}
        </div>
      </div>

      {/* 2. Total de Gastos */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5">
            <TrendingDown className="w-4 h-4 text-rose-500" /> Gastos Totais
          </span>
          <span className="text-xs text-slate-400 font-mono">
            Previsto: {formatCurrency(summary.totalPlannedExpenses)}
          </span>
        </div>

        <div className="text-2xl sm:text-3xl font-extrabold font-mono text-rose-600 tracking-tight">
          {formatCurrency(summary.totalActualExpenses)}
        </div>

        <div className="text-xs text-slate-400 mt-2">
          Soma de todas as despesas lançadas
        </div>
      </div>

      {/* 3. Saldo Restante */}
      <div className="bg-white border border-slate-200/90 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 mb-2">
          <span className="text-xs sm:text-sm font-bold text-slate-700 flex items-center gap-1.5">
            <PiggyBank className="w-4 h-4 text-emerald-600" /> Saldo Livre (O que sobra)
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-bold ${
              summary.balanceActual >= 0
                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                : 'bg-rose-50 text-rose-700 border border-rose-200'
            }`}
          >
            {summary.balanceActual >= 0 ? 'Positivo' : 'Déficit'}
          </span>
        </div>

        <div
          className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${
            summary.balanceActual >= 0 ? 'text-emerald-700' : 'text-rose-600'
          }`}
        >
          {formatCurrency(summary.balanceActual)}
        </div>

        <div className="text-xs text-slate-400 mt-2">
          {summary.balanceActual >= 0 ? 'Disponível para poupar ou investir' : 'Atenção: seus gastos superaram a renda'}
        </div>
      </div>
    </div>
  );
};

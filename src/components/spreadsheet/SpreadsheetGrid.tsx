import React, { useState } from 'react';
import { BudgetItem, BudgetSummary } from '../../types/finance';
import { formatCurrency, formatPercent } from '../../utils/financialFormulas';
import { Plus, Trash2, HelpCircle } from 'lucide-react';

interface SpreadsheetGridProps {
  items: BudgetItem[];
  totalIncome: number;
  summary: BudgetSummary;
  onIncomeChange: (income: number) => void;
  onItemChange: (id: string, field: 'name' | 'planned' | 'actual', value: string | number) => void;
  onAddItem: (category: 'NECESSIDADE' | 'DESEJO' | 'INVESTIMENTO') => void;
  onDeleteItem: (id: string) => void;
}

export const SpreadsheetGrid: React.FC<SpreadsheetGridProps> = ({
  items,
  totalIncome,
  summary,
  onIncomeChange,
  onItemChange,
  onAddItem,
  onDeleteItem,
}) => {
  const [editingIncome, setEditingIncome] = useState(false);
  const [tempIncome, setTempIncome] = useState(totalIncome.toString());

  const handleIncomeSubmit = () => {
    const val = parseFloat(tempIncome.replace(',', '.'));
    if (!isNaN(val) && val >= 0) {
      onIncomeChange(val);
    }
    setEditingIncome(false);
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'NECESSIDADE':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-500/10 text-blue-400 border border-blue-500/20">50% NECESSIDADE</span>;
      case 'DESEJO':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">30% DESEJO</span>;
      case 'INVESTIMENTO':
        return <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">20% INVESTIMENTO</span>;
      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-900 rounded-b-2xl border border-slate-800 overflow-hidden shadow-xl">
      {/* Barra de Fórmula estilo Excel */}
      <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center gap-3 text-xs font-mono">
        <span className="text-emerald-400 font-bold px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
          fx
        </span>
        <span className="text-slate-500">B2 (Renda Líquida):</span>
        <span className="text-slate-300 font-semibold">{formatCurrency(totalIncome)}</span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-500">Saldo Livre (= Renda - Realizado):</span>
        <span className={`font-semibold ${summary.balanceActual >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {formatCurrency(summary.balanceActual)}
        </span>
      </div>

      {/* Caixa de Entrada de Renda Superior */}
      <div className="p-4 bg-slate-850 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-300">💰 Sua Renda Mensal Líquida:</span>
          {editingIncome ? (
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={tempIncome}
                onChange={(e) => setTempIncome(e.target.value)}
                onBlur={handleIncomeSubmit}
                onKeyDown={(e) => e.key === 'Enter' && handleIncomeSubmit()}
                autoFocus
                className="w-28 px-2 py-1 bg-slate-900 border border-emerald-500 rounded text-xs font-mono text-emerald-300 focus:outline-none"
              />
              <button
                onClick={handleIncomeSubmit}
                className="px-2 py-1 bg-emerald-600 text-white rounded text-xs font-bold"
              >
                Salvar
              </button>
            </div>
          ) : (
            <button
              onClick={() => {
                setTempIncome(totalIncome.toString());
                setEditingIncome(true);
              }}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-emerald-400 font-mono text-xs font-bold transition-colors cursor-pointer"
              title="Clique para editar sua renda"
            >
              {formatCurrency(totalIncome)} ✏️
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onAddItem('NECESSIDADE')}
            className="px-2.5 py-1 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3 h-3" /> + Necessidade
          </button>
          <button
            onClick={() => onAddItem('DESEJO')}
            className="px-2.5 py-1 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3 h-3" /> + Desejo
          </button>
          <button
            onClick={() => onAddItem('INVESTIMENTO')}
            className="px-2.5 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3 h-3" /> + Investimento
          </button>
        </div>
      </div>

      {/* Tabela Interativa de Linhas e Colunas */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950/80 text-[11px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-800">
              <th className="py-2.5 px-3 w-10 text-center border-r border-slate-800/60">#</th>
              <th className="py-2.5 px-3 border-r border-slate-800/60">Categoria</th>
              <th className="py-2.5 px-4 border-r border-slate-800/60">Descrição / Item (Coluna C)</th>
              <th className="py-2.5 px-3 text-right border-r border-slate-800/60 w-32">Previsto (Col D)</th>
              <th className="py-2.5 px-3 text-right border-r border-slate-800/60 w-32">Realizado (Col E)</th>
              <th className="py-2.5 px-3 text-right border-r border-slate-800/60 w-28">Diferença (=D-E)</th>
              <th className="py-2.5 px-3 text-right border-r border-slate-800/60 w-24">% Renda</th>
              <th className="py-2.5 px-2 text-center w-10">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-xs font-sans">
            {items.map((item, idx) => {
              const diff = item.planned - item.actual;
              const percentIncome = (item.actual / Math.max(1, totalIncome)) * 100;
              const isOverBudget = item.actual > item.planned;

              return (
                <tr key={item.id} className="hover:bg-slate-800/50 transition-colors group">
                  {/* Coordenada da Linha */}
                  <td className="py-2 px-3 text-center font-mono text-slate-500 bg-slate-950/40 border-r border-slate-800/60 text-[11px]">
                    {idx + 3}
                  </td>

                  {/* Categoria */}
                  <td className="py-2 px-3 border-r border-slate-800/60">
                    {getCategoryBadge(item.category)}
                  </td>

                  {/* Nome do Item */}
                  <td className="py-2 px-4 border-r border-slate-800/60">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => onItemChange(item.id, 'name', e.target.value)}
                      className="w-full bg-transparent text-slate-200 focus:bg-slate-800 focus:outline-none px-1.5 py-0.5 rounded border border-transparent focus:border-slate-600 transition-colors"
                    />
                  </td>

                  {/* Previsto (Editável) */}
                  <td className="py-2 px-3 text-right font-mono border-r border-slate-800/60">
                    <input
                      type="number"
                      step="10"
                      value={item.planned}
                      onChange={(e) => onItemChange(item.id, 'planned', parseFloat(e.target.value) || 0)}
                      className="w-full bg-transparent text-right text-slate-300 focus:bg-slate-800 focus:outline-none px-1.5 py-0.5 rounded border border-transparent focus:border-emerald-500/60 font-mono"
                    />
                  </td>

                  {/* Realizado (Editável) */}
                  <td className="py-2 px-3 text-right font-mono border-r border-slate-800/60">
                    <input
                      type="number"
                      step="10"
                      value={item.actual}
                      onChange={(e) => onItemChange(item.id, 'actual', parseFloat(e.target.value) || 0)}
                      className={`w-full bg-transparent text-right font-bold focus:bg-slate-800 focus:outline-none px-1.5 py-0.5 rounded border border-transparent focus:border-emerald-500/60 font-mono ${
                        isOverBudget ? 'text-rose-400' : 'text-slate-100'
                      }`}
                    />
                  </td>

                  {/* Diferença (Fórmula) */}
                  <td
                    className={`py-2 px-3 text-right font-mono font-semibold border-r border-slate-800/60 ${
                      diff >= 0 ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                  >
                    {formatCurrency(diff)}
                  </td>

                  {/* % da Renda (Fórmula) */}
                  <td className="py-2 px-3 text-right font-mono text-slate-400 border-r border-slate-800/60">
                    {formatPercent(percentIncome)}
                  </td>

                  {/* Excluir */}
                  <td className="py-2 px-2 text-center">
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="text-slate-600 hover:text-rose-400 p-1 rounded transition-colors opacity-0 group-hover:opacity-100"
                      title="Excluir item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>

          {/* Linha de Totais da Planilha */}
          <tfoot>
            <tr className="bg-slate-950 font-bold border-t-2 border-slate-700 text-xs text-slate-200">
              <td className="py-3 px-3 text-center font-mono text-emerald-400">Σ</td>
              <td className="py-3 px-3" colSpan={2}>
                TOTAL GERAL DE DESPESAS (=SOMA)
              </td>
              <td className="py-3 px-3 text-right font-mono text-slate-300">
                {formatCurrency(summary.totalPlannedExpenses)}
              </td>
              <td className="py-3 px-3 text-right font-mono text-white text-sm">
                {formatCurrency(summary.totalActualExpenses)}
              </td>
              <td
                className={`py-3 px-3 text-right font-mono text-sm ${
                  summary.totalPlannedExpenses - summary.totalActualExpenses >= 0
                    ? 'text-emerald-400'
                    : 'text-rose-400'
                }`}
              >
                {formatCurrency(summary.totalPlannedExpenses - summary.totalActualExpenses)}
              </td>
              <td className="py-3 px-3 text-right font-mono text-slate-300">
                {formatPercent((summary.totalActualExpenses / Math.max(1, totalIncome)) * 100)}
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Resumo da Regra 50/30/20 abaixo da Grade */}
      <div className="bg-slate-950/70 p-4 border-t border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Necessidades */}
        <div
          className={`p-3 rounded-xl border ${
            summary.rule503020Status.necessidadesOk
              ? 'bg-blue-950/30 border-blue-500/30'
              : 'bg-rose-950/30 border-rose-500/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-blue-400">1. Necessidades (Meta: 50%)</span>
            <span
              className={`font-mono font-bold ${
                summary.rule503020Status.necessidadesOk ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {formatPercent(summary.categories.necessidades.actualPercent)}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Realizado: {formatCurrency(summary.categories.necessidades.actual)} de {formatCurrency(totalIncome * 0.5)}
          </p>
        </div>

        {/* Desejos */}
        <div
          className={`p-3 rounded-xl border ${
            summary.rule503020Status.desejosOk
              ? 'bg-amber-950/30 border-amber-500/30'
              : 'bg-rose-950/30 border-rose-500/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-amber-400">2. Desejos (Meta: 30%)</span>
            <span
              className={`font-mono font-bold ${
                summary.rule503020Status.desejosOk ? 'text-emerald-400' : 'text-rose-400'
              }`}
            >
              {formatPercent(summary.categories.desejos.actualPercent)}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Realizado: {formatCurrency(summary.categories.desejos.actual)} de {formatCurrency(totalIncome * 0.3)}
          </p>
        </div>

        {/* Investimentos */}
        <div
          className={`p-3 rounded-xl border ${
            summary.rule503020Status.investimentosOk
              ? 'bg-emerald-950/30 border-emerald-500/30'
              : 'bg-amber-950/30 border-amber-500/40'
          }`}
        >
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-bold text-emerald-400">3. Investimentos (Meta: ≥20%)</span>
            <span
              className={`font-mono font-bold ${
                summary.rule503020Status.investimentosOk ? 'text-emerald-400' : 'text-amber-400'
              }`}
            >
              {formatPercent(summary.categories.investimentos.actualPercent)}
            </span>
          </div>
          <p className="text-[11px] text-slate-400">
            Aporte: {formatCurrency(summary.categories.investimentos.actual)} de {formatCurrency(totalIncome * 0.2)}
          </p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { BudgetItem, BudgetSummary } from '../../types/finance';
import { formatCurrency, formatPercent } from '../../utils/financialFormulas';
import { Plus, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

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
  onItemChange,
  onAddItem,
  onDeleteItem,
}) => {
  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'NECESSIDADE':
        return (
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 whitespace-nowrap">
            50% Necessidade
          </span>
        );
      case 'DESEJO':
        return (
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200 whitespace-nowrap">
            30% Desejo
          </span>
        );
      case 'INVESTIMENTO':
        return (
          <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 whitespace-nowrap">
            20% Investimento
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-b-2xl border border-slate-200 overflow-hidden shadow-xs">
      {/* 1. RESUMO SIMPLES E DIRETO DA REGRA 50/30/20 */}
      <div className="p-4 sm:p-5 bg-slate-50/70 border-b border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {/* Pilar 1: Necessidades (50%) */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-bold text-blue-800 text-sm">🏠 Necessidades (50%)</span>
              <span className="font-mono">Teto: {formatCurrency(totalIncome * 0.5)}</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900 mt-1">
              {formatCurrency(summary.categories.necessidades.actual)}
            </div>
            <div className="mt-1 text-xs font-semibold flex items-center gap-1">
              {summary.rule503020Status.necessidadesOk ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Dentro da meta ({formatPercent(summary.categories.necessidades.actualPercent)})
                </span>
              ) : (
                <span className="text-rose-700 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Acima da meta ({formatPercent(summary.categories.necessidades.actualPercent)})
                </span>
              )}
            </div>
          </div>

          {/* Pilar 2: Desejos (30%) */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-bold text-amber-800 text-sm">🍿 Desejos (30%)</span>
              <span className="font-mono">Teto: {formatCurrency(totalIncome * 0.3)}</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900 mt-1">
              {formatCurrency(summary.categories.desejos.actual)}
            </div>
            <div className="mt-1 text-xs font-semibold flex items-center gap-1">
              {summary.rule503020Status.desejosOk ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Dentro da meta ({formatPercent(summary.categories.desejos.actualPercent)})
                </span>
              ) : (
                <span className="text-rose-700 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-rose-600" /> Acima da meta ({formatPercent(summary.categories.desejos.actualPercent)})
                </span>
              )}
            </div>
          </div>

          {/* Pilar 3: Investimentos (20%) */}
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span className="font-bold text-emerald-800 text-sm">🌱 Investimentos (20%)</span>
              <span className="font-mono">Mínimo: {formatCurrency(totalIncome * 0.2)}</span>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono text-slate-900 mt-1">
              {formatCurrency(summary.categories.investimentos.actual)}
            </div>
            <div className="mt-1 text-xs font-semibold flex items-center gap-1">
              {summary.rule503020Status.investimentosOk ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Meta atingida! ({formatPercent(summary.categories.investimentos.actualPercent)})
                </span>
              ) : (
                <span className="text-amber-700 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" /> Abaixo de 20% ({formatPercent(summary.categories.investimentos.actualPercent)})
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 2. TABELA PRINCIPAL DA PLANILHA (LETRA E CAMPOS MAIORES) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold text-xs sm:text-sm select-none">
            <tr>
              <th className="py-3 px-3 w-12 text-center text-slate-400 font-mono">#</th>
              <th className="py-3 px-3 min-w-[160px]">Categoria</th>
              <th className="py-3 px-4 min-w-[220px]">Descrição do Gasto</th>
              <th className="py-3 px-3 min-w-[140px]">Previsto (R$)</th>
              <th className="py-3 px-3 min-w-[140px]">Realizado (R$)</th>
              <th className="py-3 px-3 min-w-[140px]">Diferença (R$)</th>
              <th className="py-3 px-3 w-12 text-center"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-14 text-center text-slate-500 bg-slate-50/40">
                  <div className="max-w-md mx-auto space-y-3">
                    <div className="text-3xl">📋</div>
                    <p className="text-base font-bold text-slate-800">
                      Nenhum gasto lançado ainda
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500">
                      {totalIncome === 0
                        ? 'Defina sua renda acima e use os botões abaixo para adicionar suas despesas.'
                        : 'Clique nos botões abaixo para adicionar suas contas.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              items.map((item, index) => {
                const diff = item.planned - item.actual;

                return (
                  <tr
                    key={item.id}
                    className="hover:bg-blue-50/40 transition-colors group"
                  >
                    {/* Linha # */}
                    <td className="py-3 px-3 text-center text-slate-400 font-mono text-xs">
                      {index + 1}
                    </td>

                    {/* Categoria */}
                    <td className="py-3 px-3">
                      {getCategoryBadge(item.category)}
                    </td>

                    {/* Descrição */}
                    <td className="py-3 px-4">
                      <input
                        type="text"
                        placeholder="Ex: Aluguel, Supermercado, Internet..."
                        value={item.name}
                        onChange={(e) => onItemChange(item.id, 'name', e.target.value)}
                        className="w-full bg-transparent hover:bg-white focus:bg-white border border-transparent hover:border-slate-300 focus:border-blue-600 rounded-lg px-2.5 py-1.5 text-sm sm:text-base text-slate-900 font-semibold transition-colors focus:outline-none"
                      />
                    </td>

                    {/* Previsto */}
                    <td className="py-3 px-3">
                      <div className="relative flex items-center">
                        <span className="text-slate-400 text-xs absolute left-2.5 font-mono">R$</span>
                        <input
                          type="number"
                          step="10"
                          value={item.planned === 0 ? '' : item.planned}
                          placeholder="0,00"
                          onChange={(e) =>
                            onItemChange(item.id, 'planned', parseFloat(e.target.value) || 0)
                          }
                          className="w-full bg-transparent hover:bg-white focus:bg-white border border-transparent hover:border-slate-300 focus:border-blue-600 rounded-lg pl-8 pr-2 py-1.5 text-sm sm:text-base font-mono text-slate-800 transition-colors focus:outline-none"
                        />
                      </div>
                    </td>

                    {/* Realizado */}
                    <td className="py-3 px-3">
                      <div className="relative flex items-center">
                        <span className="text-slate-400 text-xs absolute left-2.5 font-mono">R$</span>
                        <input
                          type="number"
                          step="10"
                          value={item.actual === 0 ? '' : item.actual}
                          placeholder="0,00"
                          onChange={(e) =>
                            onItemChange(item.id, 'actual', parseFloat(e.target.value) || 0)
                          }
                          className="w-full bg-transparent hover:bg-white focus:bg-white border border-transparent hover:border-slate-300 focus:border-blue-600 rounded-lg pl-8 pr-2 py-1.5 text-sm sm:text-base font-mono font-bold text-slate-900 transition-colors focus:outline-none"
                        />
                      </div>
                    </td>

                    {/* Diferença */}
                    <td className="py-3 px-3 font-mono text-sm sm:text-base whitespace-nowrap">
                      <span
                        className={`font-bold ${
                          diff >= 0 ? 'text-emerald-700' : 'text-rose-600'
                        }`}
                      >
                        {formatCurrency(diff)}
                      </span>
                    </td>

                    {/* Deletar */}
                    <td className="py-3 px-3 text-center">
                      <button
                        onClick={() => onDeleteItem(item.id)}
                        className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                        title="Excluir linha"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>

          {/* LINHA DE TOTAIS */}
          {items.length > 0 && (
            <tfoot className="bg-slate-100 border-t-2 border-slate-200 font-bold text-slate-900 text-sm sm:text-base">
              <tr>
                <td className="py-3.5 px-3 text-center text-slate-400 font-mono">∑</td>
                <td className="py-3.5 px-3">TOTAIS</td>
                <td className="py-3.5 px-4 text-slate-500 text-xs font-normal">
                  {items.length} {items.length === 1 ? 'item' : 'itens'}
                </td>
                <td className="py-3.5 px-3 font-mono text-slate-700">
                  {formatCurrency(summary.totalPlannedExpenses)}
                </td>
                <td className="py-3.5 px-3 font-mono text-blue-700 font-extrabold">
                  {formatCurrency(summary.totalActualExpenses)}
                </td>
                <td className="py-3.5 px-3 font-mono">
                  <span
                    className={`font-extrabold ${
                      summary.balanceActual >= 0 ? 'text-emerald-700' : 'text-rose-600'
                    }`}
                  >
                    {formatCurrency(summary.balanceActual)}
                  </span>
                </td>
                <td></td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {/* 3. BOTÕES PARA ADICIONAR GASTOS COM TOQUE GRANDE E CLARO */}
      <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 flex-wrap">
        <span className="text-xs sm:text-sm font-bold text-slate-700">
          + Adicionar Gasto:
        </span>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onAddItem('NECESSIDADE')}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Necessidade (50%)</span>
          </button>

          <button
            onClick={() => onAddItem('DESEJO')}
            className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Desejo (30%)</span>
          </button>

          <button
            onClick={() => onAddItem('INVESTIMENTO')}
            className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-xs active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Investimento (20%)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

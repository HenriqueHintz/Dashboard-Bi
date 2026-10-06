import React, { useState } from 'react';
import { BudgetItem, BudgetSummary } from '../../types/finance';
import { formatCurrency, formatPercent } from '../../utils/financialFormulas';
import { Plus, Trash2, HelpCircle, CheckCircle2, AlertCircle, TrendingUp, Info } from 'lucide-react';

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
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> 50% Necessidade
          </span>
        );
      case 'DESEJO':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-50 text-amber-700 border border-amber-200 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> 30% Desejo
          </span>
        );
      case 'INVESTIMENTO':
        return (
          <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 inline-flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span> 20% Investimento
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-b-2xl border border-slate-200 overflow-hidden shadow-sm">
      {/* 1. PAINEL DIDÁTICO DE ENTRADA: RENDA LÍQUIDA */}
      <div className="p-4 sm:p-5 bg-gradient-to-r from-blue-50/60 via-slate-50 to-indigo-50/40 border-b border-slate-200">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">💰</span>
              <h2 className="text-sm sm:text-base font-bold text-slate-900">
                Quanto você recebe por mês? (Renda Líquida)
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-0.5 max-w-xl">
              Digite seu salário líquido (o valor real que cai na conta após impostos). A planilha calcula automaticamente os limites ideais de cada categoria.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            {editingIncome || totalIncome === 0 ? (
              <div className="flex items-center gap-1.5 w-full md:w-auto">
                <span className="text-xs font-bold text-slate-500">R$</span>
                <input
                  type="number"
                  placeholder="Ex: 5000"
                  value={tempIncome === '0' ? '' : tempIncome}
                  onChange={(e) => setTempIncome(e.target.value)}
                  className="bg-white border-2 border-blue-600 rounded-xl px-3 py-2 text-sm font-bold text-slate-900 w-36 focus:outline-none shadow-sm"
                  autoFocus={editingIncome}
                />
                <button
                  onClick={handleIncomeSubmit}
                  className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  Salvar Renda
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5 bg-white border border-slate-200/90 rounded-2xl p-2 px-3.5 shadow-sm w-full md:w-auto justify-between md:justify-start">
                <div className="font-mono text-base sm:text-lg font-extrabold text-blue-700">
                  {formatCurrency(totalIncome)}
                </div>
                <button
                  onClick={() => {
                    setTempIncome(totalIncome.toString());
                    setEditingIncome(true);
                  }}
                  className="text-xs font-bold text-blue-700 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-lg transition-colors"
                >
                  Alterar Renda
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 2. OS 3 PILARES DIDÁTICOS DA REGRA 50/30/20 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 pt-4 border-t border-slate-200/80">
          {/* Pilar 1: Necessidades (50%) */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-blue-800 flex items-center gap-1">
                🏠 50% Necessidades
              </span>
              <span className="text-[11px] font-mono text-slate-500">Teto: {formatCurrency(totalIncome * 0.5)}</span>
            </div>
            <div className="text-xs text-slate-500 mb-2">
              Contas básicas (moradia, luz, água, alimentação básica, saúde).
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-slate-600">Gasto Atual:</span>
              <span className="font-bold font-mono text-slate-900">{formatCurrency(summary.categories.necessidades.actual)}</span>
            </div>
            <div className="mt-1 text-[11px] font-semibold flex items-center gap-1">
              {summary.rule503020Status.necessidadesOk ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Dentro da meta ({formatPercent(summary.categories.necessidades.actualPercent)})
                </span>
              ) : (
                <span className="text-rose-700 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-rose-600" /> Acima da meta ({formatPercent(summary.categories.necessidades.actualPercent)})
                </span>
              )}
            </div>
          </div>

          {/* Pilar 2: Desejos (30%) */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-amber-800 flex items-center gap-1">
                🍿 30% Desejos Pessoais
              </span>
              <span className="text-[11px] font-mono text-slate-500">Teto: {formatCurrency(totalIncome * 0.3)}</span>
            </div>
            <div className="text-xs text-slate-500 mb-2">
              Estilo de vida (restaurantes, lazer, streaming, hobbies, compras).
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-slate-600">Gasto Atual:</span>
              <span className="font-bold font-mono text-slate-900">{formatCurrency(summary.categories.desejos.actual)}</span>
            </div>
            <div className="mt-1 text-[11px] font-semibold flex items-center gap-1">
              {summary.rule503020Status.desejosOk ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Dentro da meta ({formatPercent(summary.categories.desejos.actualPercent)})
                </span>
              ) : (
                <span className="text-rose-700 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-rose-600" /> Acima da meta ({formatPercent(summary.categories.desejos.actualPercent)})
                </span>
              )}
            </div>
          </div>

          {/* Pilar 3: Investimentos (20%) */}
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-bold text-emerald-800 flex items-center gap-1">
                🌱 20% Investimentos
              </span>
              <span className="text-[11px] font-mono text-slate-500">Mínimo: {formatCurrency(totalIncome * 0.2)}</span>
            </div>
            <div className="text-xs text-slate-500 mb-2">
              Seu futuro (reserva de emergência, aposentadoria, ações, CDI).
            </div>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
              <span className="text-slate-600">Aporte Atual:</span>
              <span className="font-bold font-mono text-slate-900">{formatCurrency(summary.categories.investimentos.actual)}</span>
            </div>
            <div className="mt-1 text-[11px] font-semibold flex items-center gap-1">
              {summary.rule503020Status.investimentosOk ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Meta atingida! ({formatPercent(summary.categories.investimentos.actualPercent)})
                </span>
              ) : (
                <span className="text-amber-700 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-amber-600" /> Abaixo de 20% ({formatPercent(summary.categories.investimentos.actualPercent)})
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 3. BARRA DE FÓRMULA ESTILO GOOGLE SHEETS (FX) */}
      <div className="bg-slate-50 px-4 py-2 border-b border-slate-200 flex items-center gap-3 text-xs font-mono overflow-x-auto no-scrollbar">
        <span className="text-blue-700 font-bold px-2 py-0.5 rounded bg-blue-100 border border-blue-200">
          fx
        </span>
        <span className="text-slate-600 whitespace-nowrap">
          Saldo Livre = Renda Líquida ({formatCurrency(totalIncome)}) - Gastos Reais ({formatCurrency(summary.totalActualExpenses)}) =
        </span>
        <span
          className={`font-bold whitespace-nowrap px-2 py-0.5 rounded ${
            summary.balanceActual >= 0
              ? 'text-emerald-800 bg-emerald-50 border border-emerald-200'
              : 'text-rose-800 bg-rose-50 border border-rose-200'
          }`}
        >
          {formatCurrency(summary.balanceActual)}
        </span>
      </div>

      {/* Dica para Usuário no Mobile */}
      <div className="px-4 py-1.5 bg-amber-50/60 border-b border-amber-100 text-[11px] text-amber-800 flex items-center gap-1.5 md:hidden">
        <Info className="w-3.5 h-3.5 flex-shrink-0 text-amber-600" />
        <span>Arraste a tabela para os lados para ver e editar todos os campos.</span>
      </div>

      {/* 4. GRADE DA PLANILHA (TABELA PRINCIPAL) */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold select-none">
            <tr>
              <th className="py-3 px-3 w-12 text-center text-slate-400 font-mono">#</th>
              <th className="py-3 px-3 min-w-[150px]">Categoria (50/30/20)</th>
              <th className="py-3 px-4 min-w-[200px]">Nome do Item / Descrição</th>
              <th className="py-3 px-3 min-w-[130px]">Valor Previsto (R$)</th>
              <th className="py-3 px-3 min-w-[130px]">Valor Realizado (R$)</th>
              <th className="py-3 px-3 min-w-[130px]">Diferença (R$)</th>
              <th className="py-3 px-2 w-12 text-center">Ação</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-500 bg-slate-50/40">
                  <div className="max-w-md mx-auto space-y-2">
                    <div className="text-2xl">📝</div>
                    <p className="text-sm font-bold text-slate-800">Nenhum gasto cadastrado ainda</p>
                    <p className="text-xs text-slate-500">
                      {totalIncome === 0
                        ? 'Digite sua renda acima e clique em um dos botões abaixo para lançar suas despesas.'
                        : 'Clique nos botões abaixo (+ Necessidade, + Desejo ou + Investimento) para lançar um gasto.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              items.map((item, index) => {
              const diff = item.planned - item.actual;
              const isOver = item.actual > item.planned && item.planned > 0;

              return (
                <tr
                  key={item.id}
                  className="hover:bg-blue-50/30 transition-colors group"
                >
                  {/* Linha # */}
                  <td className="py-2.5 px-3 text-center text-slate-400 font-mono text-[11px]">
                    {index + 1}
                  </td>

                  {/* Categoria */}
                  <td className="py-2.5 px-3 whitespace-nowrap">
                    {getCategoryBadge(item.category)}
                  </td>

                  {/* Nome do Item */}
                  <td className="py-2.5 px-4">
                    <input
                      type="text"
                      value={item.name}
                      onChange={(e) => onItemChange(item.id, 'name', e.target.value)}
                      className="w-full bg-transparent hover:bg-white focus:bg-white border border-transparent hover:border-slate-300 focus:border-blue-500 rounded-lg px-2 py-1 text-slate-900 transition-colors font-medium focus:outline-none"
                    />
                  </td>

                  {/* Previsto */}
                  <td className="py-2.5 px-3">
                    <div className="relative flex items-center">
                      <span className="text-slate-400 text-[11px] absolute left-2 font-mono">R$</span>
                      <input
                        type="number"
                        step="10"
                        value={item.planned}
                        onChange={(e) =>
                          onItemChange(item.id, 'planned', parseFloat(e.target.value) || 0)
                        }
                        className="w-full bg-transparent hover:bg-white focus:bg-white border border-transparent hover:border-slate-300 focus:border-blue-500 rounded-lg pl-7 pr-2 py-1 text-slate-800 font-mono transition-colors focus:outline-none"
                      />
                    </div>
                  </td>

                  {/* Realizado */}
                  <td className="py-2.5 px-3">
                    <div className="relative flex items-center">
                      <span className="text-slate-400 text-[11px] absolute left-2 font-mono">R$</span>
                      <input
                        type="number"
                        step="10"
                        value={item.actual}
                        onChange={(e) =>
                          onItemChange(item.id, 'actual', parseFloat(e.target.value) || 0)
                        }
                        className="w-full bg-transparent hover:bg-white focus:bg-white border border-transparent hover:border-slate-300 focus:border-blue-500 rounded-lg pl-7 pr-2 py-1 text-slate-900 font-mono font-bold transition-colors focus:outline-none"
                      />
                    </div>
                  </td>

                  {/* Diferença */}
                  <td className="py-2.5 px-3 font-mono whitespace-nowrap">
                    <span
                      className={`font-semibold ${
                        diff >= 0 ? 'text-emerald-700' : 'text-rose-600'
                      }`}
                    >
                      {formatCurrency(diff)}
                    </span>
                    {isOver && (
                      <span className="ml-1 text-[10px] text-rose-600 font-sans font-bold">
                        (Estourou)
                      </span>
                    )}
                  </td>

                  {/* Ação: Deletar */}
                  <td className="py-2.5 px-2 text-center">
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1.5 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors opacity-80 group-hover:opacity-100"
                      title="Excluir este item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })
          )}
          </tbody>

          {/* LINHA DE TOTAIS (RODAPÉ DA PLANILHA) */}
          <tfoot className="bg-slate-50 border-t-2 border-slate-200 font-bold text-slate-900">
            <tr>
              <td className="py-3 px-3 text-center text-slate-400 font-mono">∑</td>
              <td className="py-3 px-3">TOTAIS DA PLANILHA</td>
              <td className="py-3 px-4 text-slate-500 text-[11px]">
                {items.length} itens cadastrados
              </td>
              <td className="py-3 px-3 font-mono text-slate-800">
                {formatCurrency(summary.totalPlannedExpenses)}
              </td>
              <td className="py-3 px-3 font-mono text-blue-700 text-sm">
                {formatCurrency(summary.totalActualExpenses)}
              </td>
              <td className="py-3 px-3 font-mono">
                <span
                  className={
                    summary.balanceActual >= 0 ? 'text-emerald-700' : 'text-rose-600'
                  }
                >
                  {formatCurrency(summary.balanceActual)}
                </span>
              </td>
              <td></td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* 5. BOTÕES RÁPIDOS PARA ADICIONAR NOVOS ITENS POR CATEGORIA */}
      <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 flex-wrap">
        <div className="text-xs font-semibold text-slate-600">
          Adicionar novo gasto à planilha:
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onAddItem('NECESSIDADE')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-xl text-xs font-semibold transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Necessidade (50%)</span>
          </button>

          <button
            onClick={() => onAddItem('DESEJO')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 rounded-xl text-xs font-semibold transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Desejo (30%)</span>
          </button>

          <button
            onClick={() => onAddItem('INVESTIMENTO')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-xl text-xs font-semibold transition-colors shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>+ Investimento (20%)</span>
          </button>
        </div>
      </div>
    </div>
  );
};

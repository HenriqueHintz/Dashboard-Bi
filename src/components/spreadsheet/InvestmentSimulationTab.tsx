import React from 'react';
import { CompoundInterestConfig, CompoundProjectionYear } from '../../types/finance';
import { formatCurrency, formatPercent } from '../../utils/financialFormulas';
import { TrendingUp, Coins, PiggyBank, Sparkles } from 'lucide-react';

interface InvestmentSimulationTabProps {
  config: CompoundInterestConfig;
  projections: CompoundProjectionYear[];
  onChange: (field: keyof CompoundInterestConfig, val: number) => void;
}

export const InvestmentSimulationTab: React.FC<InvestmentSimulationTabProps> = ({
  config,
  projections,
  onChange,
}) => {
  const finalYear = projections[projections.length - 1];

  return (
    <div className="bg-slate-900 rounded-b-2xl border border-slate-800 p-6 shadow-xl">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              Simulador de Juros Compostos & Patrimônio
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Descubra como o tempo multiplica seus aportes através da capitalização exponencial.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-blue-300">
            Fórmula: M = P · (1 + i)ⁿ + Aportes Mensais
          </span>
        </div>

        {/* Inputs de Configuração */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Aporte Inicial (R$)</label>
            <input
              type="number"
              step="500"
              value={config.initialAmount}
              onChange={(e) => onChange('initialAmount', parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Aporte Mensal (R$)</label>
            <input
              type="number"
              step="100"
              value={config.monthlyDeposit}
              onChange={(e) => onChange('monthlyDeposit', parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-emerald-400 font-bold focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Taxa Anual Estimada (%)</label>
            <input
              type="number"
              step="0.5"
              value={config.annualInterestRate}
              onChange={(e) => onChange('annualInterestRate', parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-amber-400 font-bold focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Período (Anos)</label>
            <input
              type="number"
              min="1"
              max="40"
              value={config.years}
              onChange={(e) => onChange('years', parseInt(e.target.value) || 1)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Resumo do Final do Período */}
        {finalYear && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-slate-400 flex items-center gap-1.5 mb-1">
                <PiggyBank className="w-4 h-4 text-slate-400" /> Total do Seu Bolso
              </span>
              <span className="text-lg font-bold text-slate-200 font-mono">
                {formatCurrency(finalYear.totalInvested)}
              </span>
            </div>

            <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-4 rounded-xl border border-slate-800">
              <span className="text-xs text-emerald-400 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 text-emerald-400" /> Ganho Apenas em Juros
              </span>
              <span className="text-lg font-bold text-emerald-400 font-mono">
                +{formatCurrency(finalYear.totalInterest)}
              </span>
            </div>

            <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950/40 p-4 rounded-xl border border-blue-500/30 shadow-lg">
              <span className="text-xs text-blue-300 flex items-center gap-1.5 mb-1">
                <Coins className="w-4 h-4 text-blue-400" /> Patrimônio Acumulado
              </span>
              <span className="text-xl font-bold text-blue-400 font-mono">
                {formatCurrency(finalYear.totalAccumulated)}
              </span>
            </div>
          </div>
        )}

        {/* Tabela de Evolução Ano a Ano */}
        <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
          <div className="px-4 py-2.5 bg-slate-950/80 border-b border-slate-800 text-xs font-semibold text-slate-300 flex items-center justify-between">
            <span>Evolução Ano a Ano da Projeção</span>
            <span className="text-[11px] text-slate-500 font-normal">Calculado mês a mês com taxa efetiva</span>
          </div>
          <div className="overflow-x-auto max-h-72 overflow-y-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-900/90 sticky top-0 text-[11px] font-mono text-slate-400">
                <tr className="border-b border-slate-800">
                  <th className="py-2 px-4">Ano</th>
                  <th className="py-2 px-4 text-right">Total Investido</th>
                  <th className="py-2 px-4 text-right">Juros Acumulados</th>
                  <th className="py-2 px-4 text-right font-bold text-blue-400">Patrimônio Total</th>
                  <th className="py-2 px-4 text-right text-emerald-400">Renda Mensal Estimada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {projections.map((p) => (
                  <tr key={p.year} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-2 px-4 font-bold text-slate-300">Ano {p.year}</td>
                    <td className="py-2 px-4 text-right text-slate-400">{formatCurrency(p.totalInvested)}</td>
                    <td className="py-2 px-4 text-right text-emerald-400">+{formatCurrency(p.totalInterest)}</td>
                    <td className="py-2 px-4 text-right font-bold text-slate-100">{formatCurrency(p.totalAccumulated)}</td>
                    <td className="py-2 px-4 text-right font-semibold text-teal-400">
                      ~{formatCurrency(p.monthlyYieldEstimated)}/mês
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

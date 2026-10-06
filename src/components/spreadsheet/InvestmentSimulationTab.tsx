import React from 'react';
import { CompoundInterestConfig, CompoundProjectionYear } from '../../types/finance';
import { formatCurrency, formatPercent } from '../../utils/financialFormulas';
import { TrendingUp, Coins, PiggyBank, Sparkles, Lightbulb } from 'lucide-react';

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
    <div className="bg-white rounded-b-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header Didático */}
        <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📈</span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Simulador de Juros Compostos & Patrimônio
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Entenda como a constância de aportes mensais aliada ao tempo multiplica seu dinheiro de forma exponencial.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 font-semibold">
            Fórmula: M = P · (1 + i)ⁿ + Aportes Mensais
          </span>
        </div>

        {/* Inputs de Configuração Interativa */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Aporte Inicial (R$)</label>
            <input
              type="number"
              step="500"
              value={config.initialAmount}
              onChange={(e) => onChange('initialAmount', parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Aporte Todo Mês (R$)</label>
            <input
              type="number"
              step="100"
              value={config.monthlyDeposit}
              onChange={(e) => onChange('monthlyDeposit', parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono font-bold text-emerald-700 focus:outline-none focus:border-emerald-600 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Taxa Anual Estimada (%)</label>
            <input
              type="number"
              step="0.5"
              value={config.annualInterestRate}
              onChange={(e) => onChange('annualInterestRate', parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono font-bold text-amber-700 focus:outline-none focus:border-amber-600 shadow-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Prazo em Anos</label>
            <input
              type="number"
              min="1"
              max="40"
              value={config.years}
              onChange={(e) => onChange('years', parseInt(e.target.value) || 1)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono font-bold text-slate-900 focus:outline-none focus:border-blue-600 shadow-xs"
            />
          </div>
        </div>

        {/* Resumo Visual do Final do Período */}
        {finalYear && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 shadow-xs">
              <span className="text-xs text-slate-500 flex items-center gap-1.5 mb-1">
                <PiggyBank className="w-4 h-4 text-slate-400" /> Total do Seu Bolso
              </span>
              <span className="text-lg sm:text-xl font-bold text-slate-800 font-mono">
                {formatCurrency(finalYear.totalInvested)}
              </span>
              <span className="text-[11px] text-slate-400 block mt-0.5">O que você realmente depositou</span>
            </div>

            <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 shadow-xs">
              <span className="text-xs text-emerald-800 font-semibold flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4 text-emerald-600" /> Ganho Apenas em Juros
              </span>
              <span className="text-lg sm:text-xl font-extrabold text-emerald-700 font-mono">
                +{formatCurrency(finalYear.totalInterest)}
              </span>
              <span className="text-[11px] text-emerald-800/80 block mt-0.5">Dinheiro gerado pelo tempo</span>
            </div>

            <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 shadow-xs">
              <span className="text-xs text-blue-800 font-semibold flex items-center gap-1.5 mb-1">
                <Coins className="w-4 h-4 text-blue-600" /> Patrimônio Acumulado Final
              </span>
              <span className="text-xl sm:text-2xl font-black text-blue-800 font-mono">
                {formatCurrency(finalYear.totalAccumulated)}
              </span>
              <span className="text-[11px] text-blue-700 block mt-0.5">
                Renda passiva est.: ~{formatCurrency(finalYear.monthlyYieldEstimated)}/mês
              </span>
            </div>
          </div>
        )}

        {/* Tabela de Evolução Ano a Ano */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
          <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-800 flex items-center justify-between">
            <span>Evolução Ano a Ano dos Juros Compostos</span>
            <span className="text-[11px] text-slate-500 font-normal">Calculado mês a mês com taxa efetiva</span>
          </div>
          <div className="overflow-x-auto max-h-72 overflow-y-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead className="bg-slate-100/90 sticky top-0 text-[11px] font-bold text-slate-700">
                <tr className="border-b border-slate-200">
                  <th className="py-2.5 px-4">Ano</th>
                  <th className="py-2.5 px-4 text-right">Total Investido</th>
                  <th className="py-2.5 px-4 text-right">Juros Acumulados</th>
                  <th className="py-2.5 px-4 text-right font-bold text-blue-700">Patrimônio Total</th>
                  <th className="py-2.5 px-4 text-right text-emerald-700">Renda Mensal Estimada</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {projections.map((p) => (
                  <tr key={p.year} className="hover:bg-slate-50 transition-colors">
                    <td className="py-2.5 px-4 font-bold text-slate-800 font-sans">Ano {p.year}</td>
                    <td className="py-2.5 px-4 text-right text-slate-600">{formatCurrency(p.totalInvested)}</td>
                    <td className="py-2.5 px-4 text-right text-emerald-700 font-semibold">+{formatCurrency(p.totalInterest)}</td>
                    <td className="py-2.5 px-4 text-right font-bold text-slate-900">{formatCurrency(p.totalAccumulated)}</td>
                    <td className="py-2.5 px-4 text-right font-semibold text-teal-700">
                      ~{formatCurrency(p.monthlyYieldEstimated)}/mês
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Caixa de Conceito Didático */}
        <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-blue-900 block mb-0.5">
              O que são Juros Compostos?
            </span>
            Diferente dos juros simples, nos juros compostos os rendimentos de cada mês são somados ao bolo para render ainda mais no mês seguinte (o famoso "juros sobre juros"). No começo, a maior parte do dinheiro vem dos seus depósitos; com o passar dos anos, os juros passam a gerar mais dinheiro do que o seu próprio bolso.
          </div>
        </div>
      </div>
    </div>
  );
};

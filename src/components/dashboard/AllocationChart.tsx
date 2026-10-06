import React from 'react';
import { BudgetSummary } from '../../types/finance';
import { formatCurrency, formatPercent } from '../../utils/financialFormulas';
import { PieChart, HelpCircle } from 'lucide-react';

interface AllocationChartProps {
  summary: BudgetSummary;
}

export const AllocationChart: React.FC<AllocationChartProps> = ({ summary }) => {
  const { necessidades, desejos, investimentos } = summary.categories;
  const total = Math.max(1, necessidades.actual + desejos.actual + investimentos.actual);

  const pctNec = (necessidades.actual / total) * 100;
  const pctDes = (desejos.actual / total) * 100;
  const pctInv = (investimentos.actual / total) * 100;

  // Cálculo SVG Donut
  const radius = 64;
  const circumference = 2 * Math.PI * radius; // ~402.12

  const strokeNec = (pctNec / 100) * circumference;
  const strokeDes = (pctDes / 100) * circumference;
  const strokeInv = (pctInv / 100) * circumference;

  const offsetNec = 0;
  const offsetDes = -strokeNec;
  const offsetInv = -(strokeNec + strokeDes);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2 mb-3">
        <h3 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <PieChart className="w-4 h-4 text-blue-600" />
          Alocação Real dos Gastos (Regra 50/30/20)
        </h3>
        <span className="text-[11px] font-mono text-slate-400">100% Despesas</span>
      </div>

      <div className="flex items-center justify-center gap-5 sm:gap-6 py-2 flex-wrap sm:flex-nowrap">
        {/* Gráfico Donut SVG */}
        <div className="relative w-36 h-36 flex items-center justify-center flex-shrink-0">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Background ring */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#f1f5f9"
              strokeWidth="20"
            />
            {/* Necessidades (Blue) */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#2563eb"
              strokeWidth="20"
              strokeDasharray={`${strokeNec} ${circumference}`}
              strokeDashoffset={offsetNec}
              className="transition-all duration-700 ease-out"
            />
            {/* Desejos (Amber) */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#f59e0b"
              strokeWidth="20"
              strokeDasharray={`${strokeDes} ${circumference}`}
              strokeDashoffset={offsetDes}
              className="transition-all duration-700 ease-out"
            />
            {/* Investimentos (Emerald) */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              fill="transparent"
              stroke="#10b981"
              strokeWidth="20"
              strokeDasharray={`${strokeInv} ${circumference}`}
              strokeDashoffset={offsetInv}
              className="transition-all duration-700 ease-out"
            />
          </svg>

          {/* Texto Central */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
            <span className="text-[10px] text-slate-400 uppercase font-mono">Total</span>
            <span className="text-xs font-bold font-mono text-slate-900">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        {/* Legenda Didática */}
        <div className="space-y-2 flex-1 min-w-[200px] text-xs font-sans">
          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
              <span className="text-slate-700 font-medium">Necessidades</span>
            </div>
            <div className="text-right font-mono">
              <span className="text-blue-700 font-bold">{formatPercent(pctNec)}</span>
              <span className="text-[10px] text-slate-400 block">meta: até 50%</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              <span className="text-slate-700 font-medium">Desejos</span>
            </div>
            <div className="text-right font-mono">
              <span className="text-amber-700 font-bold">{formatPercent(pctDes)}</span>
              <span className="text-[10px] text-slate-400 block">meta: até 30%</span>
            </div>
          </div>

          <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              <span className="text-slate-700 font-medium">Investimentos</span>
            </div>
            <div className="text-right font-mono">
              <span className="text-emerald-700 font-bold">{formatPercent(pctInv)}</span>
              <span className="text-[10px] text-slate-400 block">meta: ≥ 20%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

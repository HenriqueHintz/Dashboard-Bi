import React from 'react';
import { CompoundProjectionYear } from '../../types/finance';
import { formatCurrency } from '../../utils/financialFormulas';
import { TrendingUp } from 'lucide-react';

interface CompoundInterestChartProps {
  projections: CompoundProjectionYear[];
}

export const CompoundInterestChart: React.FC<CompoundInterestChartProps> = ({ projections }) => {
  if (!projections.length) return null;

  const maxVal = Math.max(...projections.map((p) => p.totalAccumulated), 1);
  const chartHeight = 120;
  const chartWidth = 360;

  // Gerar coordenadas dos pontos SVG
  const pointsAccumulated = projections.map((p, idx) => {
    const x = (idx / (projections.length - 1)) * chartWidth;
    const y = chartHeight - (p.totalAccumulated / maxVal) * chartHeight;
    return `${x},${y}`;
  });

  const pointsInvested = projections.map((p, idx) => {
    const x = (idx / (projections.length - 1)) * chartWidth;
    const y = chartHeight - (p.totalInvested / maxVal) * chartHeight;
    return `${x},${y}`;
  });

  const areaAccumulatedPath = `M 0,${chartHeight} L ${pointsAccumulated.join(' L ')} L ${chartWidth},${chartHeight} Z`;
  const lineAccumulatedPath = `M ${pointsAccumulated.join(' L ')}`;
  const lineInvestedPath = `M ${pointsInvested.join(' L ')}`;

  const finalYear = projections[projections.length - 1];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="text-xs sm:text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-indigo-600" />
          Curva de Multiplicação Patrimonial
        </h3>
        <span className="text-xs font-mono text-emerald-700 font-extrabold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          {finalYear ? formatCurrency(finalYear.totalAccumulated) : ''}
        </span>
      </div>

      <div className="py-2">
        {/* SVG Area Chart */}
        <div className="w-full h-32 relative">
          <svg
            className="w-full h-full overflow-visible"
            viewBox={`0 0 ${chartWidth} ${chartHeight}`}
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id="blueLightGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
            <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />
            <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="#e2e8f0" strokeDasharray="3 3" strokeWidth="1" />

            {/* Área Acumulada */}
            <path d={areaAccumulatedPath} fill="url(#blueLightGradient)" />

            {/* Linha Investida (Cinza pontilhada) */}
            <path d={lineInvestedPath} fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 2" />

            {/* Linha Acumulada (Azul sólida) */}
            <path d={lineAccumulatedPath} fill="none" stroke="#2563eb" strokeWidth="2.5" />
          </svg>
        </div>

        {/* Eixo de Anos */}
        <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mt-1 pt-1 border-t border-slate-100">
          <span>Ano 1</span>
          <span>Ano {Math.round(projections.length / 2)}</span>
          <span>Ano {projections.length}</span>
        </div>
      </div>

      {/* Legenda Didática */}
      <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
        <div className="flex items-center gap-1.5 text-blue-700 font-semibold">
          <span className="w-2.5 h-1.5 bg-blue-600 rounded-full" />
          <span>Patrimônio Total (com juros)</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-500 font-medium">
          <span className="w-2.5 h-1.5 bg-slate-400 rounded-full" />
          <span>Aportado do Bolso</span>
        </div>
      </div>
    </div>
  );
};

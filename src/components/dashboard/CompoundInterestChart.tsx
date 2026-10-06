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
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2 mb-2">
        <h3 className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
          <TrendingUp className="w-4 h-4 text-blue-400" />
          Curva de Multiplicação Patrimonial
        </h3>
        <span className="text-[11px] font-mono text-emerald-400 font-bold">
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
              <linearGradient id="blueGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid lines */}
            <line x1="0" y1={chartHeight * 0.25} x2={chartWidth} y2={chartHeight * 0.25} stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />
            <line x1="0" y1={chartHeight * 0.5} x2={chartWidth} y2={chartHeight * 0.5} stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />
            <line x1="0" y1={chartHeight * 0.75} x2={chartWidth} y2={chartHeight * 0.75} stroke="#334155" strokeDasharray="3 3" strokeWidth="0.5" />

            {/* Área Acumulada */}
            <path d={areaAccumulatedPath} fill="url(#blueGlow)" />

            {/* Linha Investida (Cinza) */}
            <path d={lineInvestedPath} fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="4 2" />

            {/* Linha Acumulada (Azul brilhante) */}
            <path d={lineAccumulatedPath} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          </svg>
        </div>

        {/* Eixo de Anos */}
        <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono mt-1 pt-1 border-t border-slate-800">
          <span>Ano 1</span>
          <span>Ano {Math.round(projections.length / 2)}</span>
          <span>Ano {projections.length}</span>
        </div>
      </div>

      {/* Legenda */}
      <div className="flex items-center justify-between text-[11px] pt-2 border-t border-slate-800/80 font-mono">
        <div className="flex items-center gap-1.5 text-sky-400 font-semibold">
          <span className="w-2.5 h-1 bg-sky-400 rounded-full" />
          <span>Patrimônio Total</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="w-2.5 h-1 bg-slate-500 rounded-full" />
          <span>Aportado do Bolso</span>
        </div>
      </div>
    </div>
  );
};

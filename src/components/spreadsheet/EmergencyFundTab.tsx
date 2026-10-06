import React from 'react';
import { EmergencyFundConfig, EmergencyFundStatus } from '../../types/finance';
import { formatCurrency, formatPercent } from '../../utils/financialFormulas';
import { ShieldCheck, AlertTriangle, Clock, Target } from 'lucide-react';

interface EmergencyFundTabProps {
  config: EmergencyFundConfig;
  status: EmergencyFundStatus;
  onChange: (field: keyof EmergencyFundConfig, val: number) => void;
}

export const EmergencyFundTab: React.FC<EmergencyFundTabProps> = ({ config, status, onChange }) => {
  return (
    <div className="bg-slate-900 rounded-b-2xl border border-slate-800 p-6 shadow-xl">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Explicativo */}
        <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              Calculadora da Reserva de Emergência
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Sua proteção financeira contra demissões, quebras de equipamentos ou despesas médicas.
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300">
            Fórmula: Custo Básico Mensal × Meses de Meta
          </span>
        </div>

        {/* Barra de Progresso Visual */}
        <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-semibold text-slate-300">Progresso da sua Fortaleza:</span>
            <span className="font-mono font-bold text-emerald-400 text-sm">
              {formatPercent(status.percentageCompleted)} Concluído
            </span>
          </div>

          <div className="w-full bg-slate-800 rounded-full h-4 overflow-hidden border border-slate-700/60 p-0.5">
            <div
              className="bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-400 h-full rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${Math.min(100, status.percentageCompleted)}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-[11px] text-slate-400 mt-2 font-mono">
            <span>Atual: {formatCurrency(status.currentAmount)}</span>
            <span>Meta: {formatCurrency(status.targetAmount)} ({config.targetMonths} meses)</span>
          </div>
        </div>

        {/* Grid de Configurações Interativas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Custo Básico */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              1. Custo Mensal Essencial (R$)
            </label>
            <p className="text-[11px] text-slate-500 mb-2">
              Quanto você gasta estritamente para sobreviver no mês.
            </p>
            <input
              type="number"
              step="50"
              value={config.monthlyEssentialCost}
              onChange={(e) => onChange('monthlyEssentialCost', parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Meta de Meses */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              2. Meses de Cobertura Desejada
            </label>
            <p className="text-[11px] text-slate-500 mb-2">
              Recomendado: 6 meses para CLT estável ou 12 meses para autônomos.
            </p>
            <div className="flex items-center gap-2">
              {[3, 6, 9, 12].map((m) => (
                <button
                  key={m}
                  onClick={() => onChange('targetMonths', m)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                    config.targetMonths === m
                      ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                      : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  {m} meses
                </button>
              ))}
            </div>
          </div>

          {/* Valor Já Guardado */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              3. Saldo Já Guardado na Reserva (R$)
            </label>
            <p className="text-[11px] text-slate-500 mb-2">
              Dinheiro que já está em CDB Liquidez Diária ou Tesouro Selic.
            </p>
            <input
              type="number"
              step="100"
              value={config.currentSaved}
              onChange={(e) => onChange('currentSaved', parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-emerald-400 font-bold focus:outline-none focus:border-emerald-500"
            />
          </div>

          {/* Aporte Mensal para Reserva */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-xl p-4">
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              4. Aporte Mensal Destinado à Reserva (R$)
            </label>
            <p className="text-[11px] text-slate-500 mb-2">
              Quanto você consegue guardar por mês para essa finalidade.
            </p>
            <input
              type="number"
              step="50"
              value={config.monthlyDeposit}
              onChange={(e) => onChange('monthlyDeposit', parseFloat(e.target.value) || 0)}
              className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm font-mono text-white focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Diagnóstico Executivo */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">Tempo Estimado Restante</span>
            <span className="text-base font-bold text-amber-400 font-mono flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {status.isCompleted ? 'Concluída!' : `${status.monthsRemaining} meses`}
            </span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">Meses já Garantidos</span>
            <span className="text-base font-bold text-emerald-400 font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              {status.monthsSaved} meses
            </span>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <span className="text-[11px] text-slate-400 block mb-0.5">Falta Guardar</span>
            <span className="text-base font-bold text-slate-200 font-mono flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              {formatCurrency(Math.max(0, status.targetAmount - status.currentAmount))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

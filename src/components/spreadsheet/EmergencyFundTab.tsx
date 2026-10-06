import React from 'react';
import { EmergencyFundConfig, EmergencyFundStatus } from '../../types/finance';
import { formatCurrency, formatPercent } from '../../utils/financialFormulas';
import { ShieldCheck, AlertTriangle, Clock, Target, Lightbulb, CheckCircle2 } from 'lucide-react';

interface EmergencyFundTabProps {
  config: EmergencyFundConfig;
  status: EmergencyFundStatus;
  onChange: (field: keyof EmergencyFundConfig, val: number) => void;
}

export const EmergencyFundTab: React.FC<EmergencyFundTabProps> = ({ config, status, onChange }) => {
  return (
    <div className="bg-white rounded-b-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Explicativo */}
        <div className="flex items-start justify-between gap-4 flex-wrap pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">🛡️</span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Calculadora da Reserva de Emergência
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1 max-w-xl">
              Sua muralha de proteção financeira contra imprevistos (demissão, emergências de saúde, reparos urgentes).
            </p>
          </div>
          <span className="text-xs font-mono px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
            Fórmula: Custo Básico Mensal × Meses de Meta
          </span>
        </div>

        {/* Barra de Progresso Visual da Reserva */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200">
          <div className="flex justify-between items-center text-xs mb-2">
            <span className="font-bold text-slate-700">Progresso da sua Muralha Financeira:</span>
            <span className="font-mono font-extrabold text-emerald-700 text-sm">
              {formatPercent(status.percentageCompleted)} Concluído
            </span>
          </div>

          <div className="w-full bg-slate-200 rounded-full h-4 overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-amber-500 via-emerald-500 to-teal-500 h-full rounded-full transition-all duration-500 shadow-xs"
              style={{ width: `${Math.min(100, status.percentageCompleted)}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-xs text-slate-600 mt-2 font-mono flex-wrap gap-2">
            <span>Guardado: <strong className="text-emerald-700">{formatCurrency(status.currentAmount)}</strong></span>
            <span>Meta: <strong className="text-slate-800">{formatCurrency(status.targetAmount)}</strong> ({config.targetMonths} meses)</span>
          </div>
        </div>

        {/* Grid de Configurações Interativas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Custo Básico */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              1. Custo Mensal Essencial (R$)
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Quanto você gasta todo mês apenas com o básico para sobreviver (alimentação, moradia, contas).
            </p>
            <input
              type="number"
              step="50"
              value={config.monthlyEssentialCost}
              onChange={(e) => onChange('monthlyEssentialCost', parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-600 shadow-xs"
            />
          </div>

          {/* Meta de Meses */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              2. Quantos meses de segurança você quer?
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Recomendado: 6 meses para CLT ou 12 meses para autônomos e freelancers.
            </p>
            <div className="grid grid-cols-4 gap-1.5">
              {[3, 6, 9, 12].map((m) => (
                <button
                  key={m}
                  onClick={() => onChange('targetMonths', m)}
                  className={`py-2 rounded-lg text-xs font-bold transition-all border ${
                    config.targetMonths === m
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {m} meses
                </button>
              ))}
            </div>
          </div>

          {/* Valor Já Guardado */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              3. Saldo Já Guardado na Reserva (R$)
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Valor que já está guardado em aplicações seguras de resgate imediato.
            </p>
            <input
              type="number"
              step="100"
              value={config.currentSaved}
              onChange={(e) => onChange('currentSaved', parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-bold text-emerald-700 focus:outline-none focus:border-emerald-600 shadow-xs"
            />
          </div>

          {/* Aporte Mensal para Reserva */}
          <div className="bg-slate-50/70 border border-slate-200 rounded-xl p-4">
            <label className="block text-xs font-bold text-slate-800 mb-1">
              4. Quanto você guarda por mês para a Reserva? (R$)
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Valor destinado mensalmente para completar a sua meta de segurança.
            </p>
            <input
              type="number"
              step="50"
              value={config.monthlyDeposit}
              onChange={(e) => onChange('monthlyDeposit', parseFloat(e.target.value) || 0)}
              className="w-full bg-white border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:border-emerald-600 shadow-xs"
            />
          </div>
        </div>

        {/* Diagnóstico Executivo Didático */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 block mb-1">Tempo Estimado para Concluir</span>
            <span className="text-base sm:text-lg font-bold text-amber-700 font-mono flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              {status.isCompleted ? 'Meta Atingida! 🎉' : `${status.monthsRemaining} meses`}
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 block mb-1">Meses já Cobertos</span>
            <span className="text-base sm:text-lg font-bold text-emerald-700 font-mono flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              {status.monthsSaved} meses garantidos
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
            <span className="text-xs text-slate-500 block mb-1">Falta Guardar</span>
            <span className="text-base sm:text-lg font-bold text-slate-800 font-mono flex items-center gap-1.5">
              <Target className="w-4 h-4 text-blue-600" />
              {formatCurrency(Math.max(0, status.targetAmount - status.currentAmount))}
            </span>
          </div>
        </div>

        {/* Caixa de Conceito Didático */}
        <div className="bg-emerald-50/80 border border-emerald-200 rounded-xl p-4 flex items-start gap-3">
          <Lightbulb className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div className="text-xs text-slate-700 leading-relaxed">
            <span className="font-bold text-emerald-900 block mb-0.5">
              Onde guardar a Reserva de Emergência?
            </span>
            A reserva de emergência **nunca** deve ser colocada em ações, criptomoedas ou fundos com prazo fechado. O local correto é em ativos de **Liquidez Diária** (você pode sacar no mesmo dia sem perder dinheiro), como o **Tesouro Selic** ou um **CDB com 100% do CDI** de banco sólido garantido pelo FGC.
          </div>
        </div>
      </div>
    </div>
  );
};

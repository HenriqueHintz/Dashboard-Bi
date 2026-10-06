import React from 'react';
import { Table, ShieldAlert, TrendingUp, BookOpen } from 'lucide-react';

export type TabKey = 'BUDGET' | 'EMERGENCY' | 'INVESTMENTS' | 'GLOSSARY';

interface TabsBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export const TabsBar: React.FC<TabsBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      key: 'BUDGET' as TabKey,
      label: '1. Orçamento Mensal (50/30/20)',
      icon: Table,
      color: 'text-emerald-400',
    },
    {
      key: 'EMERGENCY' as TabKey,
      label: '2. Reserva de Emergência',
      icon: ShieldAlert,
      color: 'text-amber-400',
    },
    {
      key: 'INVESTMENTS' as TabKey,
      label: '3. Simulador de Investimentos',
      icon: TrendingUp,
      color: 'text-blue-400',
    },
    {
      key: 'GLOSSARY' as TabKey,
      label: '4. Glossário Financeiro',
      icon: BookOpen,
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="flex items-center gap-1 bg-slate-900 border-b border-slate-700/80 px-3 pt-2 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold whitespace-nowrap transition-all border-t-2 ${
              isActive
                ? 'bg-slate-800 text-white border-emerald-500 shadow-sm'
                : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-800/50'
            }`}
          >
            <Icon className={`w-3.5 h-3.5 ${isActive ? tab.color : 'text-slate-500'}`} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

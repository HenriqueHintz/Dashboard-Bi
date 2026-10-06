import React from 'react';
import { Table, ShieldCheck, TrendingUp, BookOpen } from 'lucide-react';

export type TabKey = 'BUDGET' | 'EMERGENCY' | 'INVESTMENTS' | 'GLOSSARY';

interface TabsBarProps {
  activeTab: TabKey;
  onTabChange: (tab: TabKey) => void;
}

export const TabsBar: React.FC<TabsBarProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      key: 'BUDGET' as TabKey,
      label: '1. Orçamento (Regra 50/30/20)',
      icon: Table,
      activeColor: 'text-blue-600',
    },
    {
      key: 'EMERGENCY' as TabKey,
      label: '2. Reserva de Emergência',
      icon: ShieldCheck,
      activeColor: 'text-emerald-600',
    },
    {
      key: 'INVESTMENTS' as TabKey,
      label: '3. Simulador de Investimentos',
      icon: TrendingUp,
      activeColor: 'text-indigo-600',
    },
    {
      key: 'GLOSSARY' as TabKey,
      label: '4. Glossário Didático',
      icon: BookOpen,
      activeColor: 'text-purple-600',
    },
  ];

  return (
    <div className="flex items-center gap-1 bg-white border-b border-slate-200 px-3 pt-2 overflow-x-auto no-scrollbar">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.key;

        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs font-semibold whitespace-nowrap transition-all border-b-2 ${
              isActive
                ? 'bg-blue-50/70 text-blue-800 border-blue-600 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 border-transparent hover:bg-slate-100/60'
            }`}
          >
            <Icon className={`w-4 h-4 ${isActive ? tab.activeColor : 'text-slate-400'}`} />
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

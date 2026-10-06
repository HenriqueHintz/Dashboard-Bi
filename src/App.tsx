import React, { useState, useMemo } from 'react';
import {
  DEFAULT_INCOME,
  DEFAULT_BUDGET_ITEMS,
  DEFAULT_EMERGENCY_CONFIG,
  DEFAULT_COMPOUND_CONFIG,
} from './data/defaultData';
import { BudgetItem, EmergencyFundConfig, CompoundInterestConfig } from './types/finance';
import {
  calculateBudgetSummary,
  calculateEmergencyFund,
  calculateCompoundInterest,
} from './utils/financialFormulas';
import { exportFinancialSpreadsheetToExcel } from './utils/excelExporter';
import { sound } from './utils/audioEffects';
import { useTourGame } from './hooks/useTourGame';

// Componentes
import { TabsBar, TabKey } from './components/spreadsheet/TabsBar';
import { SpreadsheetGrid } from './components/spreadsheet/SpreadsheetGrid';
import { EmergencyFundTab } from './components/spreadsheet/EmergencyFundTab';
import { InvestmentSimulationTab } from './components/spreadsheet/InvestmentSimulationTab';
import { FinancialGlossary } from './components/glossary/FinancialGlossary';
import { DialogueBox } from './components/character/DialogueBox';
import { MissionTracker } from './components/character/MissionTracker';
import { KpiCards } from './components/dashboard/KpiCards';
import { AllocationChart } from './components/dashboard/AllocationChart';
import { CompoundInterestChart } from './components/dashboard/CompoundInterestChart';

// Ícones
import { Download, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('BUDGET');
  const [income, setIncome] = useState<number>(DEFAULT_INCOME);
  const [items, setItems] = useState<BudgetItem[]>(DEFAULT_BUDGET_ITEMS);
  const [emergencyConfig, setEmergencyConfig] = useState<EmergencyFundConfig>(DEFAULT_EMERGENCY_CONFIG);
  const [compoundConfig, setCompoundConfig] = useState<CompoundInterestConfig>(DEFAULT_COMPOUND_CONFIG);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Hook do Jogo / Tour do Mentor
  const {
    gameState,
    currentMission,
    totalMissions,
    nextMission,
    prevMission,
    toggleTour,
    resetTour,
  } = useTourGame((tab) => setActiveTab(tab as TabKey));

  // Cálculos reativos
  const summary = useMemo(() => calculateBudgetSummary(income, items), [income, items]);
  const emergencyStatus = useMemo(() => calculateEmergencyFund(emergencyConfig), [emergencyConfig]);
  const projections = useMemo(
    () => calculateCompoundInterest(compoundConfig),
    [compoundConfig]
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Handlers da Planilha
  const handleIncomeChange = (newIncome: number) => {
    setIncome(newIncome);
    showToast('Renda mensal atualizada!');
  };

  const handleItemChange = (
    id: string,
    field: 'name' | 'planned' | 'actual',
    value: string | number
  ) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const handleAddItem = (category: 'NECESSIDADE' | 'DESEJO' | 'INVESTIMENTO') => {
    sound.playClick();
    const newItem: BudgetItem = {
      id: `custom_${Date.now()}`,
      category,
      name: 'Novo Item ' + (category === 'NECESSIDADE' ? 'Básico' : category === 'DESEJO' ? 'Lazer' : 'Aporte'),
      planned: 200,
      actual: 0,
      note: 'Item adicionado pelo usuário',
    };
    setItems((prev) => [...prev, newItem]);
    showToast('Novo item adicionado à grade!');
  };

  const handleDeleteItem = (id: string) => {
    sound.playClick();
    setItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removido da planilha.');
  };

  const handleEmergencyChange = (field: keyof EmergencyFundConfig, val: number) => {
    setEmergencyConfig((prev) => ({ ...prev, [field]: val }));
  };

  const handleCompoundChange = (field: keyof CompoundInterestConfig, val: number) => {
    setCompoundConfig((prev) => ({ ...prev, [field]: val }));
  };

  // Exportação Excel Oficial
  const handleExportExcel = () => {
    sound.playMissionComplete();
    exportFinancialSpreadsheetToExcel({
      income,
      items,
      summary,
      emergencyConfig,
      projections,
    });
    showToast('Planilha Excel (.xlsx) gerada e baixada com sucesso!');
  };

  // Restaurar dados originais
  const handleResetDefaults = () => {
    if (window.confirm('Deseja restaurar os dados padrão da planilha?')) {
      setIncome(DEFAULT_INCOME);
      setItems(DEFAULT_BUDGET_ITEMS);
      setEmergencyConfig(DEFAULT_EMERGENCY_CONFIG);
      setCompoundConfig(DEFAULT_COMPOUND_CONFIG);
      resetTour();
      showToast('Dados restaurados para o padrão.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white font-bold px-4 py-2.5 rounded-xl shadow-xl shadow-slate-950/20 text-xs transition-all animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar Estilo Google / Material Clean */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 px-4 sm:px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          {/* Logo e Branding */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20 font-black text-white text-base">
              FQ
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg tracking-tight text-slate-900">
                  FinQuest
                </h1>
                <span className="hidden sm:inline-block text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                  Planilha Didática
                </span>
              </div>
              <p className="text-[11px] text-slate-500 leading-none">
                Gestão Financeira Descomplicada & Fórmulas em Tempo Real
              </p>
            </div>
          </div>

          {/* Gamificação: Level e XP */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <MissionTracker gameState={gameState} onOpenTour={toggleTour} />

            {/* Ações Rápidas: Exportar Excel e Resetar */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportExcel}
                className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-sm shadow-emerald-600/20 active:scale-95"
                title="Baixar arquivo Excel (.xlsx) com fórmulas idênticas"
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Exportar Excel</span>
                <span className="sm:hidden">.XLSX</span>
              </button>

              <button
                onClick={handleResetDefaults}
                className="p-2 text-slate-500 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-xs"
                title="Restaurar dados de exemplo"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 space-y-5">
        {/* Mentor / Tour Gamificado (quando ativo) */}
        {gameState.isTourActive && (
          <DialogueBox
            mission={currentMission}
            gameState={gameState}
            totalMissions={totalMissions}
            onNext={nextMission}
            onPrev={prevMission}
            onClose={toggleTour}
            onReset={resetTour}
          />
        )}

        {/* KPIs Principais no Topo */}
        <KpiCards summary={summary} />

        {/* Painel com Gráficos Resumo (Regra 50/30/20 e Juros) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AllocationChart summary={summary} />
          <CompoundInterestChart projections={projections} />
        </div>

        {/* Área da Planilha com Abas */}
        <section className="space-y-0 shadow-sm rounded-2xl overflow-hidden border border-slate-200">
          <TabsBar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Conteúdo da Aba Ativa */}
          {activeTab === 'BUDGET' && (
            <SpreadsheetGrid
              items={items}
              totalIncome={income}
              summary={summary}
              onIncomeChange={handleIncomeChange}
              onItemChange={handleItemChange}
              onAddItem={handleAddItem}
              onDeleteItem={handleDeleteItem}
            />
          )}

          {activeTab === 'EMERGENCY' && (
            <EmergencyFundTab
              config={emergencyConfig}
              status={emergencyStatus}
              onChange={handleEmergencyChange}
            />
          )}

          {activeTab === 'INVESTMENTS' && (
            <InvestmentSimulationTab
              config={compoundConfig}
              projections={projections}
              onChange={handleCompoundChange}
            />
          )}

          {activeTab === 'GLOSSARY' && <FinancialGlossary />}
        </section>

        {/* Footer Informativo */}
        <footer className="pt-6 pb-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-700">FinQuest</span>
            <span>•</span>
            <span>Planilha Financeira Gamificada & Didática</span>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Regra 50/30/20</span>
            <span>•</span>
            <span>Cálculos em Tempo Real</span>
            <span>•</span>
            <button
              onClick={handleExportExcel}
              className="text-emerald-700 hover:underline font-bold"
            >
              Baixar .XLSX
            </button>
          </div>
        </footer>
      </main>
    </div>
  );
}

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

// Componentes
import { TabsBar, TabKey } from './components/spreadsheet/TabsBar';
import { SpreadsheetGrid } from './components/spreadsheet/SpreadsheetGrid';
import { EmergencyFundTab } from './components/spreadsheet/EmergencyFundTab';
import { InvestmentSimulationTab } from './components/spreadsheet/InvestmentSimulationTab';
import { FinancialGlossary } from './components/glossary/FinancialGlossary';
import { KpiCards } from './components/dashboard/KpiCards';
import { AllocationChart } from './components/dashboard/AllocationChart';
import { CompoundInterestChart } from './components/dashboard/CompoundInterestChart';

// Ícones
import { Download, Trash2, FileSpreadsheet, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('BUDGET');

  // Inicializa sem nenhum registro pré-preenchido para o usuário preencher livremente
  const [income, setIncome] = useState<number>(0);
  const [items, setItems] = useState<BudgetItem[]>([]);
  const [emergencyConfig, setEmergencyConfig] = useState<EmergencyFundConfig>({
    monthlyEssentialCost: 0,
    targetMonths: 6,
    currentSaved: 0,
    monthlyDeposit: 0,
  });
  const [compoundConfig, setCompoundConfig] = useState<CompoundInterestConfig>({
    initialAmount: 0,
    monthlyDeposit: 0,
    annualInterestRate: 10,
    years: 10,
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cálculos reativos em tempo real
  const summary = useMemo(() => calculateBudgetSummary(income, items), [income, items]);
  const emergencyStatus = useMemo(() => calculateEmergencyFund(emergencyConfig), [emergencyConfig]);
  const projections = useMemo(
    () => calculateCompoundInterest(compoundConfig),
    [compoundConfig]
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
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
      id: `item_${Date.now()}`,
      category,
      name: '',
      planned: 0,
      actual: 0,
      note: '',
    };
    setItems((prev) => [...prev, newItem]);
    showToast('Linha adicionada! Digite o nome e o valor.');
  };

  const handleDeleteItem = (id: string) => {
    sound.playClick();
    setItems((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removido.');
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
    showToast('Planilha Excel (.xlsx) baixada com sucesso!');
  };

  // Limpar todos os registros
  const handleClearAll = () => {
    if (window.confirm('Deseja limpar todos os valores da planilha?')) {
      setIncome(0);
      setItems([]);
      setEmergencyConfig({
        monthlyEssentialCost: 0,
        targetMonths: 6,
        currentSaved: 0,
        monthlyDeposit: 0,
      });
      setCompoundConfig({
        initialAmount: 0,
        monthlyDeposit: 0,
        annualInterestRate: 10,
        years: 10,
      });
      showToast('Planilha zerada com sucesso!');
    }
  };

  // Carregar dados de exemplo (opcional para demonstração rápida)
  const handleLoadDemo = () => {
    setIncome(DEFAULT_INCOME);
    setItems(DEFAULT_BUDGET_ITEMS);
    setEmergencyConfig(DEFAULT_EMERGENCY_CONFIG);
    setCompoundConfig(DEFAULT_COMPOUND_CONFIG);
    showToast('Dados de exemplo carregados.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 bg-slate-900 text-white font-bold px-4 py-2.5 rounded-xl shadow-lg text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar Limpa: Sem Logo, apenas "Planilha Financeira" */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
          {/* Título Direto */}
          <h1 className="font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
            Planilha Financeira
          </h1>

          {/* Ações Rápidas */}
          <div className="flex items-center gap-2 flex-wrap">
            {items.length === 0 && income === 0 && (
              <button
                onClick={handleLoadDemo}
                className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-semibold transition-colors"
                title="Preencher com valores de exemplo"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-blue-600" />
                <span>Carregar Exemplo</span>
              </button>
            )}

            {(items.length > 0 || income > 0) && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-1.5 px-3 py-2 text-slate-600 hover:text-rose-700 bg-slate-100 hover:bg-rose-50 rounded-xl text-xs font-semibold transition-colors"
                title="Limpar todos os campos da planilha"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-500" />
                <span>Limpar Planilha</span>
              </button>
            )}

            <button
              onClick={handleExportExcel}
              className="flex items-center gap-2 px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs transition-all shadow-sm active:scale-95"
              title="Baixar arquivo Excel (.xlsx)"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar Excel</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 sm:p-6 space-y-5">
        {/* KPIs Principais no Topo */}
        <KpiCards summary={summary} />

        {/* Gráficos de Resumo (só ocupam espaço relevante se houver dados ou projeções) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <AllocationChart summary={summary} />
          <CompoundInterestChart projections={projections} />
        </div>

        {/* Área da Planilha com Abas */}
        <section className="space-y-0 shadow-sm rounded-2xl overflow-hidden border border-slate-200 bg-white">
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

        {/* Footer Simples */}
        <footer className="pt-6 pb-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div>Planilha Financeira • Cálculos em Tempo Real</div>

          <div className="flex items-center gap-4 text-slate-500">
            <span>Regra 50/30/20</span>
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

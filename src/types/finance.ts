export type BudgetCategoryType = 'NECESSIDADE' | 'DESEJO' | 'INVESTIMENTO';

export interface BudgetItem {
  id: string;
  name: string;
  category: BudgetCategoryType;
  planned: number;
  actual: number;
  note?: string;
}

export interface BudgetSummary {
  totalIncome: number;
  totalPlannedExpenses: number;
  totalActualExpenses: number;
  balanceActual: number;
  savingsRate: number; // percentage
  categories: {
    necessidades: { planned: number; actual: number; targetPercent: 50; actualPercent: number };
    desejos: { planned: number; actual: number; targetPercent: 30; actualPercent: number };
    investimentos: { planned: number; actual: number; targetPercent: 20; actualPercent: number };
  };
  rule503020Status: {
    necessidadesOk: boolean;
    desejosOk: boolean;
    investimentosOk: boolean;
    overallScore: number; // 0 a 100
  };
}

export interface EmergencyFundConfig {
  monthlyEssentialCost: number;
  targetMonths: number; // Ex: 6 meses
  currentSaved: number;
  monthlyDeposit: number;
}

export interface EmergencyFundStatus {
  targetAmount: number;
  currentAmount: number;
  percentageCompleted: number;
  monthsRemaining: number;
  isCompleted: boolean;
  monthsSaved: number;
}

export interface CompoundInterestConfig {
  initialAmount: number;
  monthlyDeposit: number;
  annualInterestRate: number; // Ex: 11.5% (CDI/Tesouro)
  years: number;
}

export interface CompoundProjectionYear {
  year: number;
  totalInvested: number;
  totalInterest: number;
  totalAccumulated: number;
  monthlyYieldEstimated: number;
}

export interface FinancialGlossaryItem {
  id: string;
  term: string;
  acronym?: string;
  category: 'INVESTIMENTO' | 'INDICADOR' | 'ORCAMENTO' | 'PLANEJAMENTO';
  summary: string;
  detailedExplanation: string;
  practicalExample: string;
  tip: string;
}

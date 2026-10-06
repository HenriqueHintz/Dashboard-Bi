import {
  BudgetItem,
  BudgetSummary,
  EmergencyFundConfig,
  EmergencyFundStatus,
  CompoundInterestConfig,
  CompoundProjectionYear,
} from '../types/finance';

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value || 0);
}

export function formatPercent(value: number): string {
  return `${(value || 0).toFixed(1)}%`;
}

export function parseMoneyInput(raw: string): number {
  if (!raw) return 0;
  const cleaned = raw.replace(/[^\d,-]/g, '').replace(',', '.');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function calculateBudgetSummary(totalIncome: number, items: BudgetItem[]): BudgetSummary {
  const safeIncome = Math.max(0.01, totalIncome);

  let plannedNec = 0;
  let actualNec = 0;
  let plannedDes = 0;
  let actualDes = 0;
  let plannedInv = 0;
  let actualInv = 0;

  for (const item of items) {
    if (item.category === 'NECESSIDADE') {
      plannedNec += item.planned || 0;
      actualNec += item.actual || 0;
    } else if (item.category === 'DESEJO') {
      plannedDes += item.planned || 0;
      actualDes += item.actual || 0;
    } else if (item.category === 'INVESTIMENTO') {
      plannedInv += item.planned || 0;
      actualInv += item.actual || 0;
    }
  }

  const totalPlannedExpenses = plannedNec + plannedDes + plannedInv;
  const totalActualExpenses = actualNec + actualDes + actualInv;
  const balanceActual = totalIncome - totalActualExpenses;

  const actualPercentNec = (actualNec / safeIncome) * 100;
  const actualPercentDes = (actualDes / safeIncome) * 100;
  const actualPercentInv = (actualInv / safeIncome) * 100;
  const savingsRate = ((totalIncome - (actualNec + actualDes)) / safeIncome) * 100;

  // Regra 50/30/20: Necessidades <= 50%, Desejos <= 30%, Investimentos >= 20%
  const necessidadesOk = actualPercentNec <= 50.5;
  const desejosOk = actualPercentDes <= 30.5;
  const investimentosOk = actualPercentInv >= 19.5;

  let score = 0;
  if (necessidadesOk) score += 40;
  else score += Math.max(0, 40 - (actualPercentNec - 50) * 2);

  if (desejosOk) score += 30;
  else score += Math.max(0, 30 - (actualPercentDes - 30) * 2);

  if (investimentosOk) score += 30;
  else score += Math.max(0, (actualPercentInv / 20) * 30);

  return {
    totalIncome,
    totalPlannedExpenses,
    totalActualExpenses,
    balanceActual,
    savingsRate: Math.max(0, savingsRate),
    categories: {
      necessidades: {
        planned: plannedNec,
        actual: actualNec,
        targetPercent: 50,
        actualPercent: actualPercentNec,
      },
      desejos: {
        planned: plannedDes,
        actual: actualDes,
        targetPercent: 30,
        actualPercent: actualPercentDes,
      },
      investimentos: {
        planned: plannedInv,
        actual: actualInv,
        targetPercent: 20,
        actualPercent: actualPercentInv,
      },
    },
    rule503020Status: {
      necessidadesOk,
      desejosOk,
      investimentosOk,
      overallScore: Math.min(100, Math.max(0, Math.round(score))),
    },
  };
}

export function calculateEmergencyFund(config: EmergencyFundConfig): EmergencyFundStatus {
  const targetAmount = (config.monthlyEssentialCost || 0) * (config.targetMonths || 6);
  const currentAmount = config.currentSaved || 0;
  const percentageCompleted = targetAmount > 0 ? Math.min(100, (currentAmount / targetAmount) * 100) : 0;
  
  const remainingValue = Math.max(0, targetAmount - currentAmount);
  const monthlyDeposit = Math.max(1, config.monthlyDeposit || 1);
  const monthsRemaining = remainingValue > 0 ? Math.ceil(remainingValue / monthlyDeposit) : 0;
  const monthsSaved = config.monthlyEssentialCost > 0 ? currentAmount / config.monthlyEssentialCost : 0;

  return {
    targetAmount,
    currentAmount,
    percentageCompleted,
    monthsRemaining,
    isCompleted: currentAmount >= targetAmount,
    monthsSaved: parseFloat(monthsSaved.toFixed(1)),
  };
}

export function calculateCompoundInterest(config: CompoundInterestConfig): CompoundProjectionYear[] {
  const { initialAmount, monthlyDeposit, annualInterestRate, years } = config;
  const monthlyRate = Math.pow(1 + annualInterestRate / 100, 1 / 12) - 1;
  const totalMonths = Math.max(1, years * 12);

  const projections: CompoundProjectionYear[] = [];
  let currentBalance = initialAmount;
  let totalInvested = initialAmount;

  for (let m = 1; m <= totalMonths; m++) {
    currentBalance = currentBalance * (1 + monthlyRate) + monthlyDeposit;
    totalInvested += monthlyDeposit;

    if (m % 12 === 0 || m === totalMonths) {
      const year = Math.ceil(m / 12);
      const totalInterest = Math.max(0, currentBalance - totalInvested);
      const monthlyYield = currentBalance * monthlyRate;

      projections.push({
        year,
        totalInvested: Math.round(totalInvested * 100) / 100,
        totalInterest: Math.round(totalInterest * 100) / 100,
        totalAccumulated: Math.round(currentBalance * 100) / 100,
        monthlyYieldEstimated: Math.round(monthlyYield * 100) / 100,
      });
    }
  }

  return projections;
}

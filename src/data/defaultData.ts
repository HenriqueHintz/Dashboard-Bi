import { BudgetItem, EmergencyFundConfig, CompoundInterestConfig, FinancialGlossaryItem } from '../types/finance';

export const DEFAULT_INCOME = 5500.00;

export const DEFAULT_BUDGET_ITEMS: BudgetItem[] = [
  // NECESSIDADES (Meta: até 50% = R$ 2.750,00)
  { id: '1', name: 'Aluguel / Condomínio', category: 'NECESSIDADE', planned: 1400.00, actual: 1400.00, note: 'Moradia básica' },
  { id: '2', name: 'Supermercado & Alimentação', category: 'NECESSIDADE', planned: 800.00, actual: 780.00, note: 'Compras essenciais do mês' },
  { id: '3', name: 'Energia Elétrica & Água', category: 'NECESSIDADE', planned: 220.00, actual: 245.00, note: 'Contas de consumo fixas' },
  { id: '4', name: 'Internet Fibra', category: 'NECESSIDADE', planned: 120.00, actual: 120.00, note: 'Trabalho e estudo' },
  { id: '5', name: 'Transporte / Combustível', category: 'NECESSIDADE', planned: 200.00, actual: 190.00, note: 'Deslocamento diário' },

  // DESEJOS / ESTILO DE VIDA (Meta: até 30% = R$ 1.650,00)
  { id: '6', name: 'Lazer & Restaurantes', category: 'DESEJO', planned: 550.00, actual: 610.00, note: 'Saídas de final de semana' },
  { id: '7', name: 'Streaming & Assinaturas', category: 'DESEJO', planned: 95.00, actual: 95.00, note: 'Netflix, Spotify, etc.' },
  { id: '8', name: 'Academia & Cuidados', category: 'DESEJO', planned: 150.00, actual: 150.00, note: 'Saúde física e bem-estar' },
  { id: '9', name: 'Compras Pessoais & Roupas', category: 'DESEJO', planned: 300.00, actual: 250.00, note: 'Vestuário e hobbies' },
  { id: '10', name: 'iFood / Delivery', category: 'DESEJO', planned: 250.00, actual: 280.00, note: 'Pedidos esporádicos' },

  // INVESTIMENTOS & FUTURO (Meta: no mínimo 20% = R$ 1.100,00)
  { id: '11', name: 'Reserva de Emergência (CDB 100% CDI)', category: 'INVESTIMENTO', planned: 600.00, actual: 600.00, note: 'Liquidez diária' },
  { id: '12', name: 'Tesouro Direto IPCA+ (Longo Prazo)', category: 'INVESTIMENTO', planned: 350.00, actual: 350.00, note: 'Proteção contra inflação' },
  { id: '13', name: 'Ações / Fundos Imobiliários (FIIs)', category: 'INVESTIMENTO', planned: 200.00, actual: 200.00, note: 'Renda passiva e dividendos' },
];

export const DEFAULT_EMERGENCY_CONFIG: EmergencyFundConfig = {
  monthlyEssentialCost: 2735.00,
  targetMonths: 6, // 6 meses de segurança
  currentSaved: 9500.00,
  monthlyDeposit: 600.00,
};

export const DEFAULT_COMPOUND_CONFIG: CompoundInterestConfig = {
  initialAmount: 5000.00,
  monthlyDeposit: 1150.00,
  annualInterestRate: 11.75, // Taxa média CDI / Tesouro Selic
  years: 15,
};

export const GLOSSARY_TERMS: FinancialGlossaryItem[] = [
  {
    id: 'cdi',
    term: 'Certificado de Depósito Interbancário',
    acronym: 'CDI',
    category: 'INDICADOR',
    summary: 'Taxa de referência para rentabilidade de investimentos de renda fixa no Brasil.',
    detailedExplanation: 'É a taxa cobrada nos empréstimos diários que os bancos fazem entre si para fechar o caixa no positivo. Segue muito de perto a taxa Selic.',
    practicalExample: 'Um investimento que rende 100% do CDI acompanha quase exatamente os juros básicos da economia (aprox. 10% a 13% ao ano dependendo da época).',
    tip: 'Sua reserva de emergência deve render no mínimo 100% do CDI com liquidez diária.',
  },
  {
    id: 'selic',
    term: 'Taxa Selic',
    acronym: 'SELIC',
    category: 'INDICADOR',
    summary: 'A taxa básica de juros da economia brasileira, definida pelo Banco Central.',
    detailedExplanation: 'É o principal instrumento de política monetária usado pelo COPOM para controlar a inflação. Quando a Selic sobe, o crédito fica caro e a renda fixa rende mais.',
    practicalExample: 'Se a Selic está em 12% ao ano, aplicar no Tesouro Selic rende aproximadamente 1% bruto ao mês com o menor risco do país.',
    tip: 'Taxa Selic alta favorece quem poupa na renda fixa; Selic baixa estimula bolsa e empreendedorismo.',
  },
  {
    id: 'ipca',
    term: 'Índice de Preços ao Consumidor Amplo',
    acronym: 'IPCA',
    category: 'INDICADOR',
    summary: 'A medida oficial da inflação no Brasil calculada pelo IBGE.',
    detailedExplanation: 'Mostra quanto o custo de vida aumentou para as famílias. Se seu dinheiro rende menos que o IPCA, você está perdendo poder de compra.',
    practicalExample: 'Se a inflação foi de 4% no ano e seu dinheiro rendeu 10%, seu ganho real foi de cerca de 6%.',
    tip: 'Para investimentos de longo prazo (+5 anos), sempre busque títulos atrelados ao IPCA+ (IPCA + taxa fixa).',
  },
  {
    id: 'liquidez',
    term: 'Liquidez Diária',
    category: 'PLANEJAMENTO',
    summary: 'A facilidade e velocidade com que você consegue transformar um investimento em dinheiro na conta.',
    detailedExplanation: 'Liquidez diária significa que você pode resgatar o dinheiro a qualquer dia útil sem perder a rentabilidade acumulada até ali.',
    practicalExample: 'CDB com liquidez diária pode ser resgatado numa emergência médica no mesmo dia. Já um imóvel tem baixíssima liquidez.',
    tip: 'A Reserva de Emergência NUNCA deve ficar presa em ativos sem liquidez imediata.',
  },
  {
    id: '503020',
    term: 'Regra 50/30/20',
    category: 'ORCAMENTO',
    summary: 'Método simples e mundialmente consagrado de distribuição do salário líquido.',
    detailedExplanation: '50% para Necessidades básicas (moradia, comida, saúde), 30% para Desejos pessoais (lazer, hobbies) e 20% para o Futuro (quitar dívidas e investir).',
    practicalExample: 'Em um salário de R$ 5.000, destine até R$ 2.500 para despesas fixas, R$ 1.500 para qualidade de vida e R$ 1.000 para investimentos.',
    tip: 'Se suas necessidades passam de 50%, foque primeiro em enxugar contas fixas antes de cortar todo o seu lazer.',
  },
  {
    id: 'juros_compostos',
    term: 'Juros Compostos',
    category: 'INVESTIMENTO',
    summary: 'O famoso "juros sobre juros", onde o rendimento do mês passa a render no mês seguinte.',
    detailedExplanation: 'No início o crescimento parece lento, mas após 5, 10 ou 15 anos a curva se torna exponencial e os juros gerados superam o dinheiro que você aportou do próprio bolso.',
    practicalExample: 'R$ 500 por mês a 10% ao ano viram R$ 103 mil em 10 anos, dos quais R$ 43 mil foram pura multiplicação dos juros!',
    tip: 'Albert Einstein chamou os juros compostos de a 8ª maravilha do mundo: quem entende ganha, quem não entende paga.',
  },
];

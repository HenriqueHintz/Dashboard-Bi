import React, { useState } from 'react';
import { GLOSSARY_TERMS } from '../../data/defaultData';
import { BookOpen, Search, Lightbulb, CheckCircle2 } from 'lucide-react';

export const FinancialGlossary: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TODOS');

  const filtered = GLOSSARY_TERMS.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.acronym && item.acronym.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.summary.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = selectedCategory === 'TODOS' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-white rounded-b-2xl border border-slate-200 p-4 sm:p-6 shadow-sm">
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap pb-3 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📚</span>
              <h2 className="text-base sm:text-lg font-bold text-slate-900">
                Glossário & Dicionário Financeiro Descomplicado
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Entenda os termos mais falados no mercado (CDI, Selic, IPCA, Liquidez) sem economês chato.
            </p>
          </div>
        </div>

        {/* Barra de Filtro e Busca */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar termo (ex: CDI, Selic, Juros, 50/30/20)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-purple-600 focus:bg-white transition-all shadow-xs"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {['TODOS', 'INDICADOR', 'ORCAMENTO', 'INVESTIMENTO', 'PLANEJAMENTO'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Lista de Termos em Grid Didático */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 hover:border-purple-300 rounded-xl p-4 transition-all shadow-xs hover:shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-900 text-sm">{item.term}</span>
                  {item.acronym && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
                      {item.acronym}
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 uppercase font-mono">
                  {item.category}
                </span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.summary}
              </p>

              {item.practicalExample && (
                <div className="bg-slate-50 border border-slate-100 rounded-lg p-2.5 flex items-start gap-2 text-[11px] text-slate-700">
                  <Lightbulb className="w-3.5 h-3.5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-purple-900">Exemplo prático: </strong>
                    {item.practicalExample}
                  </div>
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-2 text-center py-8 text-xs text-slate-500">
              Nenhum termo encontrado com "{searchTerm}". Tente buscar por CDI, Selic ou 50/30/20.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

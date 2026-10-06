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
    <div className="bg-slate-900 rounded-b-2xl border border-slate-800 p-6 shadow-xl">
      <div className="max-w-5xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 flex-wrap pb-3 border-b border-slate-800">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-400" />
              Glossário & Dicionário Financeiro Descomplicado
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Entenda os termos mais falados no mercado (CDI, Selic, IPCA, Liquidez) sem economês chato.
            </p>
          </div>
        </div>

        {/* Barra de Filtro e Busca */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar termo (ex: CDI, Selic, Juros, 50/30/20)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="flex items-center gap-1.5 flex-wrap">
            {['TODOS', 'INDICADOR', 'ORCAMENTO', 'INVESTIMENTO', 'PLANEJAMENTO'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white border-purple-500 shadow-sm'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de Cards dos Termos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-slate-950 border border-slate-800/80 rounded-2xl p-4.5 hover:border-purple-500/40 transition-all shadow-sm"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {item.term}
                    {item.acronym && (
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-400 border border-purple-500/30">
                        {item.acronym}
                      </span>
                    )}
                  </h3>
                  <span className="text-[10px] uppercase font-mono text-slate-500 font-semibold tracking-wider">
                    {item.category}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 mb-3 leading-relaxed">{item.summary}</p>

              <div className="space-y-2 bg-slate-900/60 p-3 rounded-xl border border-slate-800/60 text-[11px]">
                <div className="text-slate-400">
                  <strong className="text-slate-200">Exemplo Prático:</strong> {item.practicalExample}
                </div>
                <div className="text-emerald-400/90 flex items-start gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-amber-300">Dica de Ouro:</strong> {item.tip}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

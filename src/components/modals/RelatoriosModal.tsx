import { useState } from 'react';
import { motion } from 'motion/react';
import { X, FileText, Download, Calendar, Filter } from 'lucide-react';

interface RelatoriosModalProps {
  onClose: () => void;
  perfil: 'vendedores' | 'marketplaces' | 'bancos';
}

export default function RelatoriosModal({ onClose, perfil }: RelatoriosModalProps) {
  const [tipoRelatorio, setTipoRelatorio] = useState('');
  const [periodo, setPeriodo] = useState('ultimos-30-dias');
  const [formato, setFormato] = useState('pdf');

  const kpisVendedores = [
    { id: 'taxa-disputas', label: 'Taxa de Disputas', valor: '2.3%', variacao: '-45%' },
    { id: 'tempo-resolucao', label: 'Tempo Médio de Resolução', valor: '4.2 dias', variacao: '-32%' },
    { id: 'reducao-chargebacks', label: 'Redução de Chargebacks', valor: '68%', variacao: '+15%' },
    { id: 'produtos-autenticados', label: 'Produtos Autenticados', valor: '236', variacao: '+28%' }
  ];

  const kpisMarketplaces = [
    { id: 'vendedores-confiaveis', label: 'Vendedores Confiáveis', valor: '87%', variacao: '+5%' },
    { id: 'produtos-bloqueados', label: 'Produtos Bloqueados', valor: '28', variacao: '-12%' },
    { id: 'precisao-ia', label: 'Precisão da IA', valor: '94%', variacao: '+2%' },
    { id: 'perdas-evitadas', label: 'Perdas Evitadas', valor: 'R$ 142k', variacao: '+35%' }
  ];

  const kpisBancos = [
    { id: 'fraudes-detectadas', label: 'Fraudes Detectadas', valor: '46', variacao: '-28%' },
    { id: 'taxa-falso-positivo', label: 'Taxa de Falso Positivo', valor: '3.2%', variacao: '-18%' },
    { id: 'economia', label: 'Economia Gerada', valor: 'R$ 2.8M', variacao: '+42%' },
    { id: 'tempo-investigacao', label: 'Tempo de Investigação', valor: '1.8h', variacao: '-55%' }
  ];

  const kpis = 
    perfil === 'vendedores' ? kpisVendedores :
    perfil === 'marketplaces' ? kpisMarketplaces :
    kpisBancos;

  const handleGerar = () => {
    alert(`Gerando Relatório Avançado...\n\nTipo: ${tipoRelatorio}\nPeríodo: ${periodo}\nFormato: ${formato.toUpperCase()}\n\nKPIs incluídos:\n${kpis.map(k => `• ${k.label}: ${k.valor}`).join('\n')}\n\nDownload iniciado!`);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-auto"
      >
        <div className="sticky top-0 bg-[#416b44] text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2>Relatórios Avançados</h2>
            <p className="text-white/80 text-sm">Exportação detalhada com KPIs customizados</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* KPIs em destaque */}
          <div>
            <h3 className="text-[#416b44] mb-4">KPIs do Período Atual</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {kpis.map(kpi => (
                <div key={kpi.id} className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">{kpi.label}</p>
                  <div className="flex items-baseline justify-between">
                    <div className="text-2xl text-[#416b44]">{kpi.valor}</div>
                    <span className={`text-sm px-2 py-1 rounded ${
                      kpi.variacao.startsWith('+') || kpi.variacao.startsWith('-')
                        ? kpi.variacao.startsWith('+') 
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {kpi.variacao}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Configuração do relatório */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-[#416b44] mb-4">Configurar Relatório</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2">Tipo de Relatório</label>
                <select
                  value={tipoRelatorio}
                  onChange={(e) => setTipoRelatorio(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e]"
                >
                  <option value="">Selecione...</option>
                  <option value="completo">Relatório Completo</option>
                  <option value="kpis">Apenas KPIs</option>
                  <option value="evidence-packs">Evidence Packs</option>
                  <option value="comparativo">Comparativo de Períodos</option>
                  {perfil === 'vendedores' && <option value="disputas">Análise de Disputas</option>}
                  {perfil === 'marketplaces' && <option value="reputacao">Reputação de Vendedores</option>}
                  {perfil === 'bancos' && <option value="fraudes">Análise de Fraudes</option>}
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2">Período</label>
                  <select
                    value={periodo}
                    onChange={(e) => setPeriodo(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e]"
                  >
                    <option value="ultimos-7-dias">Últimos 7 dias</option>
                    <option value="ultimos-30-dias">Últimos 30 dias</option>
                    <option value="ultimos-90-dias">Últimos 90 dias</option>
                    <option value="este-mes">Este mês</option>
                    <option value="mes-passado">Mês passado</option>
                    <option value="este-ano">Este ano</option>
                    <option value="customizado">Período customizado</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Formato</label>
                  <select
                    value={formato}
                    onChange={(e) => setFormato(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e]"
                  >
                    <option value="pdf">PDF</option>
                    <option value="excel">Excel (.xlsx)</option>
                    <option value="csv">CSV</option>
                    <option value="json">JSON</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleGerar}
                disabled={!tipoRelatorio}
                className="w-full bg-[#39843e] hover:bg-[#416b44] text-white py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Gerar e Baixar Relatório
              </button>
            </div>
          </div>

          {/* Agendamento */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-blue-900 mb-1">Agendar Relatórios Automáticos</h4>
                <p className="text-sm text-blue-700 mb-3">
                  Configure o envio automático de relatórios por e-mail em intervalos regulares.
                </p>
                <button className="text-sm text-blue-700 hover:underline">
                  Configurar agendamento →
                </button>
              </div>
            </div>
          </div>

          {/* Templates disponíveis */}
          <div>
            <h4 className="text-gray-900 mb-3">Templates Disponíveis</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="border border-gray-200 rounded-lg p-3 hover:border-[#39843e] transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-[#39843e]" />
                  <span className="text-sm">Relatório Executivo</span>
                </div>
                <p className="text-xs text-gray-600">Visão geral com principais métricas</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 hover:border-[#39843e] transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-[#39843e]" />
                  <span className="text-sm">Relatório Técnico Detalhado</span>
                </div>
                <p className="text-xs text-gray-600">Análise profunda com todos os dados</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 hover:border-[#39843e] transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-[#39843e]" />
                  <span className="text-sm">Compliance e Auditoria</span>
                </div>
                <p className="text-xs text-gray-600">Para reguladores e auditorias</p>
              </div>
              <div className="border border-gray-200 rounded-lg p-3 hover:border-[#39843e] transition-colors cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="w-4 h-4 text-[#39843e]" />
                  <span className="text-sm">Comparativo de Performance</span>
                </div>
                <p className="text-xs text-gray-600">Compare diferentes períodos</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

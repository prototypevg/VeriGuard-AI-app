import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Mail, Phone, FileText, Upload, Hash, CheckCircle, AlertCircle } from 'lucide-react';

interface CadastrarProdutoModalProps {
  onClose: () => void;
}

export default function CadastrarProdutoModal({ onClose }: CadastrarProdutoModalProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    cpfCnpj: '',
    nome: '',
    email: '',
    telefone: '',
    codigo2fa: '',
    confirmacao: false,
    documento: null as File | null,
    arquivoOriginal: null as File | null,
    nomeProduto: '',
    idProduto: '',
    categoria: '',
    canaisOficiais: ''
  });

  const [validations, setValidations] = useState({
    cpfValidado: false,
    emailValidado: false,
    telefoneValidado: false,
    documentoValidado: false
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    } else {
      // Gerar Evidence Pack
      alert('Evidence Pack gerado com sucesso!\nHash: 7f8d9a2b4c6e1f3a5b8d9c2e4f6a1b3c\nAssinatura digital aplicada.\nStatus: Validado');
      onClose();
    }
  };

  const validateCPF = () => {
    setTimeout(() => {
      setValidations({...validations, cpfValidado: true});
      alert('CPF/CNPJ validado com sucesso na base oficial!');
    }, 500);
  };

  const validateEmail = () => {
    setTimeout(() => {
      setValidations({...validations, emailValidado: true});
      alert('Código de verificação enviado para o e-mail!');
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-auto"
      >
        {/* Header */}
        <div className="sticky top-0 bg-[#416b44] text-white p-6 rounded-t-2xl flex items-center justify-between">
          <div>
            <h2>Cadastrar Produto/Transação</h2>
            <p className="text-white/80 text-sm">Etapa {step} de 5</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 pt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-[#39843e] h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-[#416b44]">Identificação do Titular</h3>
                
                <div>
                  <label className="block text-gray-700 mb-2">CPF/CNPJ *</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={formData.cpfCnpj}
                      onChange={(e) => setFormData({...formData, cpfCnpj: e.target.value})}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e]"
                      placeholder="000.000.000-00"
                      required
                    />
                    <button
                      type="button"
                      onClick={validateCPF}
                      className="bg-[#39843e] text-white px-4 py-2 rounded-lg hover:bg-[#416b44] transition-colors"
                    >
                      Validar
                    </button>
                  </div>
                  {validations.cpfValidado && (
                    <div className="flex items-center gap-2 text-green-600 mt-2 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      CPF/CNPJ validado na Receita Federal
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Nome Completo *</label>
                  <input
                    type="text"
                    value={formData.nome}
                    onChange={(e) => setFormData({...formData, nome: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">E-mail *</label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e]"
                      required
                    />
                    <button
                      type="button"
                      onClick={validateEmail}
                      className="bg-[#39843e] text-white px-4 py-2 rounded-lg hover:bg-[#416b44] transition-colors"
                    >
                      Enviar código
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Telefone (2FA) *</label>
                  <input
                    type="tel"
                    value={formData.telefone}
                    onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e]"
                    placeholder="(00) 00000-0000"
                    required
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-[#416b44]">Verificação e Documentação</h3>

                <div>
                  <label className="block text-gray-700 mb-2">Código de Verificação 2FA *</label>
                  <input
                    type="text"
                    value={formData.codigo2fa}
                    onChange={(e) => setFormData({...formData, codigo2fa: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e]"
                    placeholder="000000"
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Digite o código enviado para seu e-mail e telefone
                  </p>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={formData.confirmacao}
                    onChange={(e) => setFormData({...formData, confirmacao: e.target.checked})}
                    className="mt-1"
                    required
                  />
                  <label className="text-gray-700">
                    Confirmo que sou o criador original deste produto/serviço e possuo todos os direitos sobre o mesmo *
                  </label>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Upload de Documento (RG/CNH) *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#39843e] transition-colors cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Clique para fazer upload ou arraste o arquivo</p>
                    <input
                      type="file"
                      onChange={(e) => setFormData({...formData, documento: e.target.files?.[0] || null})}
                      className="hidden"
                      accept="image/*,.pdf"
                      required
                    />
                    {formData.documento && (
                      <p className="text-[#39843e] text-sm">{formData.documento.name}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-[#416b44]">Informações do Produto</h3>

                <div>
                  <label className="block text-gray-700 mb-2">Anexar Arquivo Original do Produto *</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#39843e] transition-colors cursor-pointer">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600 mb-2">Upload do produto digital (PDF, vídeo, imagem, etc.)</p>
                    <input
                      type="file"
                      onChange={(e) => setFormData({...formData, arquivoOriginal: e.target.files?.[0] || null})}
                      className="hidden"
                      required
                    />
                    {formData.arquivoOriginal && (
                      <div className="mt-2">
                        <p className="text-[#39843e] text-sm mb-2">{formData.arquivoOriginal.name}</p>
                        <div className="flex items-center gap-2 text-green-600 text-sm justify-center">
                          <CheckCircle className="w-4 h-4" />
                          Metadados extraídos automaticamente
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Nome do Produto *</label>
                  <input
                    type="text"
                    value={formData.nomeProduto}
                    onChange={(e) => setFormData({...formData, nomeProduto: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e]"
                    placeholder="Ex: Curso Completo de Marketing Digital"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">ID/SKU do Produto *</label>
                  <input
                    type="text"
                    value={formData.idProduto}
                    onChange={(e) => setFormData({...formData, idProduto: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e]"
                    placeholder="Ex: PROD-2025-001"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Categoria *</label>
                  <select
                    value={formData.categoria}
                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e]"
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="cursos">Cursos Online</option>
                    <option value="ebooks">eBooks</option>
                    <option value="software">Software/Plugins</option>
                    <option value="templates">Templates</option>
                    <option value="servicos">Serviços Digitais</option>
                  </select>
                </div>
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-[#416b44]">Canais Oficiais e Verificação</h3>

                <div>
                  <label className="block text-gray-700 mb-2">Canais Oficiais de Venda</label>
                  <textarea
                    value={formData.canaisOficiais}
                    onChange={(e) => setFormData({...formData, canaisOficiais: e.target.value})}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-[#39843e] h-32"
                    placeholder="Liste os canais oficiais onde este produto é vendido (URLs, marketplaces, etc.)"
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="text-blue-900 mb-1">Verificação de Titularidade</h4>
                      <p className="text-sm text-blue-700">
                        A VeriGuard AI está verificando se este produto já foi cadastrado por outro titular.
                        Se houver conflito, um fluxo de disputa será aberto automaticamente.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span>Nenhum conflito detectado</span>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <h3 className="text-[#416b44]">Assinatura Digital e Finalização</h3>

                <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-3">
                  <div className="flex items-center gap-2">
                    <Hash className="w-5 h-5 text-[#39843e]" />
                    <span className="text-sm">
                      <strong>Hash do arquivo:</strong> 7f8d9a2b4c6e1f3a5b8d9c2e4f6a1b3c
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="w-5 h-5 text-[#39843e]" />
                    <span className="text-sm">
                      <strong>Timestamp:</strong> 2025-12-08 14:32:15 UTC
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-[#39843e]" />
                    <span className="text-sm">
                      <strong>Assinatura digital:</strong> Pronta para aplicação
                    </span>
                  </div>
                </div>

                <div className="bg-[#39843e]/10 border border-[#39843e]/20 rounded-lg p-4">
                  <p className="text-[#416b44] text-sm">
                    Ao confirmar, você está gerando um Evidence Pack imutável que servirá como prova técnica e jurídica 
                    de autoria e titularidade. Este pacote poderá ser usado em disputas, auditorias e processos legais.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Botões */}
          <div className="flex gap-4 pt-4 border-t border-gray-200">
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Voltar
              </button>
            )}
            <button
              type="submit"
              className="flex-1 bg-[#39843e] hover:bg-[#416b44] text-white py-2 px-6 rounded-lg transition-colors"
            >
              {step === 5 ? 'Gerar Evidence Pack' : 'Próximo'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

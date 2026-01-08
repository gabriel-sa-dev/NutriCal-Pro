export default function Disclaimer() {
  return (
    <div className="glass p-6" id="about">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-yellow-700 mb-2">
            Aviso Importante
          </h2>
          <p className="text-gray-700 text-sm leading-relaxed">
            Esta calculadora fornece <strong className="text-gray-900">estimativas baseadas em fórmulas científicas</strong> e serve 
            apenas como um ponto de partida. Os valores apresentados são aproximações que podem variar de pessoa para pessoa.
          </p>
          <p className="text-gray-700 text-sm leading-relaxed mt-2">
            <strong className="text-purple-600">Recomendamos SEMPRE</strong> buscar orientação de um{' '}
            <strong className="text-gray-900">nutricionista</strong> ou{' '}
            <strong className="text-gray-900">médico</strong> antes de iniciar qualquer dieta ou programa alimentar. 
            Profissionais qualificados podem avaliar suas necessidades individuais, histórico de saúde e criar um plano personalizado e seguro.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
              Mifflin-St Jeor
            </span>
            <span className="px-3 py-1 bg-fuchsia-100 text-fuchsia-600 rounded-full text-xs">
              Katch-McArdle
            </span>
            <span className="px-3 py-1 bg-violet-100 text-violet-600 rounded-full text-xs">
              Evidência Científica
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

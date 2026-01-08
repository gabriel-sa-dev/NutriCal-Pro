export default function Footer() {
  return (
    <footer className="py-8 px-4 border-t border-gray-200" id="references">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sobre o NutriCalc Pro</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Calculadora de macronutrientes baseada em evidências científicas. 
              Utilizamos as fórmulas mais precisas disponíveis na literatura para 
              estimar suas necessidades calóricas e de macros.
            </p>
          </div>

          {/* References */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Referências Científicas</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-600">
                <span className="text-purple-600">•</span> Mifflin MD, et al. Am J Clin Nutr. 1990
              </li>
              <li className="text-gray-600">
                <span className="text-purple-600">•</span> Morton RW, et al. Br J Sports Med. 2018
              </li>
              <li className="text-gray-600">
                <span className="text-purple-600">•</span> McArdle WD, et al. Exercise Physiology
              </li>
              <li className="text-gray-600">
                <span className="text-purple-600">•</span> Frankenfield D. J Am Diet Assoc. 2005
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Aviso Legal</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Este aplicativo não substitui aconselhamento médico profissional. 
              Sempre consulte um nutricionista ou médico antes de fazer mudanças 
              significativas em sua dieta.
            </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} NutriCalc Pro. Feito com 💚 para sua saúde.
          </p>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 text-xs">
              v1.0.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

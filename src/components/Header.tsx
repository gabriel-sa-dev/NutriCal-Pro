export default function Header() {
  return (
    <header className="py-6 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-800 flex items-center justify-center shadow-lg shadow-purple-500/25">
              <span className="text-white font-bold text-lg">NC</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 via-violet-700 to-indigo-900 bg-clip-text text-transparent">
                NutriCalc Pro
              </h1>
              <p className="text-xs text-gray-500">
                Calculadora Inteligente de Macros
              </p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="#calculator" 
              className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium"
            >
              Calculadora
            </a>
            <a 
              href="#about" 
              className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium"
            >
              Sobre
            </a>
            <a 
              href="#references" 
              className="text-gray-600 hover:text-purple-600 transition-colors text-sm font-medium"
            >
              Referências
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}

import { useState } from 'react';
import { CalculationInput, CalculationResult } from './types';
import { calculateMacros } from './api';
import Calculator from './components/Calculator';
import Results from './components/Results';
import Header from './components/Header';
import Footer from './components/Footer';
import Disclaimer from './components/Disclaimer';

function App() {
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCalculate = async (input: CalculationInput) => {
    setIsLoading(true);
    setError(null);

    try {
      const calculationResult = await calculateMacros(input);
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-animated relative">
      {/* Background orbs */}
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-8 max-w-6xl">
          <Disclaimer />

          <div className="grid lg:grid-cols-2 gap-8 mt-8">
            <div>
              <Calculator 
                onCalculate={handleCalculate} 
                isLoading={isLoading}
              />
            </div>

            <div>
              {error && (
                <div className="glass p-6 mb-4 border-purple-200">
                  <div className="text-purple-700 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{error}</span>
                  </div>
                </div>
              )}

              {result && (
                <Results result={result} onReset={handleReset} />
              )}

              {!result && !error && (
                <div className="glass p-8 h-full flex flex-col items-center justify-center text-center min-h-[400px]">
                  <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-indigo-900/20 flex items-center justify-center">
                    <svg className="w-12 h-12 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    Pronto para calcular?
                  </h3>
                  <p className="text-gray-600 max-w-sm">
                    Preencha seus dados no formulário ao lado e clique em calcular para ver suas necessidades calóricas e de macronutrientes personalizadas.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;

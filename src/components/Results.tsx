import { CalculationResult } from '../types';
import Icon from './Icon';

interface ResultsProps {
  result: CalculationResult;
  onReset: () => void;
}

export default function Results({ result, onReset }: ResultsProps) {
  const { macros, bmr, tdee, targetCalories, calorieAdjustment, activityMultiplier, methodology, warnings, recommendations } = result;

  const macroColors = {
    protein: { bg: 'bg-indigo-600', text: 'text-indigo-700', light: 'bg-indigo-50' },
    carbs: { bg: 'bg-fuchsia-600', text: 'text-fuchsia-700', light: 'bg-fuchsia-50' },
    fats: { bg: 'bg-violet-600', text: 'text-violet-700', light: 'bg-violet-50' },
  };

  return (
    <div className="space-y-4 result-card">
      {/* Main Calories Card */}
      <div className="glass p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900">
            <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Seus Resultados
          </h2>
          <button
            onClick={onReset}
            className="text-gray-500 hover:text-gray-700 transition-colors text-sm flex items-center gap-1 font-medium"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Recalcular
          </button>
        </div>

        {/* Target Calories */}
        <div className="text-center mb-6">
          <p className="text-gray-600 text-sm mb-1 font-medium">Calorias Diárias Recomendadas</p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl font-bold bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-600 bg-clip-text text-transparent">
              {targetCalories.toLocaleString('pt-BR')}
            </span>
            <span className="text-gray-600 text-xl">kcal</span>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            {calorieAdjustment > 0 ? `+${calorieAdjustment}` : calorieAdjustment} kcal do seu TDEE
          </p>
        </div>

        {/* Metabolic Info */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="glass-light p-3 text-center border border-purple-100">
            <p className="text-gray-600 text-xs mb-1 font-medium">TMB</p>
            <p className="text-lg font-semibold text-gray-900">{bmr.toLocaleString('pt-BR')}</p>
            <p className="text-gray-500 text-xs">kcal</p>
          </div>
          <div className="glass-light p-3 text-center border border-purple-100">
            <p className="text-gray-600 text-xs mb-1 font-medium">TDEE</p>
            <p className="text-lg font-semibold text-gray-900">{tdee.toLocaleString('pt-BR')}</p>
            <p className="text-gray-500 text-xs">kcal</p>
          </div>
          <div className="glass-light p-3 text-center border border-purple-100">
            <p className="text-gray-600 text-xs mb-1 font-medium">Multiplicador</p>
            <p className="text-lg font-semibold text-gray-900">{activityMultiplier}x</p>
            <p className="text-gray-500 text-xs">atividade</p>
          </div>
        </div>

        {/* Macro Distribution Bar */}
        <div className="mb-6">
          <p className="text-gray-700 text-sm mb-3 font-medium">Distribuição de Macros</p>
          <div className="macro-bar flex">
            <div 
              className={`macro-bar-fill ${macroColors.protein.bg}`}
              style={{ width: `${macros.proteinPercentage}%` }}
            />
            <div 
              className={`macro-bar-fill ${macroColors.carbs.bg}`}
              style={{ width: `${macros.carbsPercentage}%` }}
            />
            <div 
              className={`macro-bar-fill ${macroColors.fats.bg}`}
              style={{ width: `${macros.fatsPercentage}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium">
            <span className={macroColors.protein.text}>Proteína {macros.proteinPercentage}%</span>
            <span className={macroColors.carbs.text}>Carbs {macros.carbsPercentage}%</span>
            <span className={macroColors.fats.text}>Gorduras {macros.fatsPercentage}%</span>
          </div>
        </div>

        {/* Macro Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className={`glass-light p-4 text-center border-t-2 border-indigo-600`}>
            <div className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center bg-indigo-100">
              <Icon name="meat" className="text-indigo-700" />
            </div>
            <p className={`text-2xl font-bold ${macroColors.protein.text}`}>{macros.protein}g</p>
            <p className="text-gray-600 text-xs mt-1 font-medium">Proteína</p>
            <p className="text-gray-500 text-xs">{macros.proteinCalories} kcal</p>
          </div>
          <div className={`glass-light p-4 text-center border-t-2 border-fuchsia-600`}>
            <div className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center bg-fuchsia-100">
              <Icon name="grain" className="text-fuchsia-700" />
            </div>
            <p className={`text-2xl font-bold ${macroColors.carbs.text}`}>{macros.carbs}g</p>
            <p className="text-gray-600 text-xs mt-1 font-medium">Carboidratos</p>
            <p className="text-gray-500 text-xs">{macros.carbsCalories} kcal</p>
          </div>
          <div className={`glass-light p-4 text-center border-t-2 border-violet-600`}>
            <div className="w-10 h-10 mx-auto mb-2 rounded-full flex items-center justify-center bg-violet-100">
              <Icon name="avocado" className="text-violet-700" />
            </div>
            <p className={`text-2xl font-bold ${macroColors.fats.text}`}>{macros.fats}g</p>
            <p className="text-gray-600 text-xs mt-1 font-medium">Gorduras</p>
            <p className="text-gray-500 text-xs">{macros.fatsCalories} kcal</p>
          </div>
        </div>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="warning-box">
          <h3 className="text-yellow-700 font-semibold mb-2 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Avisos
          </h3>
          <ul className="space-y-1">
            {warnings.map((warning, index) => (
              <li key={index} className="text-yellow-800 text-sm">{warning}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Recommendations */}
      <div className="recommendation-box">
        <h3 className="text-purple-700 font-semibold mb-3 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Recomendações
        </h3>
        <ul className="space-y-2">
          {recommendations.map((rec, index) => (
            <li key={index} className="text-purple-900 text-sm flex items-start gap-2">
              <span className="text-purple-600 mt-0.5">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Methodology */}
      <div className="glass p-6">
        <h3 className="text-gray-900 font-semibold mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Metodologia Utilizada
        </h3>
        <div className="space-y-3 text-sm">
          <div className="glass-light p-3 rounded-lg border border-purple-100">
            <p className="text-gray-600 text-xs mb-1 font-medium">Fórmula do TMB</p>
            <p className="text-gray-800">{methodology.bmrFormula}</p>
          </div>
          <div className="glass-light p-3 rounded-lg border border-purple-100">
            <p className="text-gray-600 text-xs mb-1 font-medium">Cálculo de Proteína</p>
            <p className="text-gray-800">{methodology.proteinRationale}</p>
          </div>
          <div className="glass-light p-3 rounded-lg border border-purple-100">
            <p className="text-gray-600 text-xs mb-1 font-medium">Ajuste Calórico</p>
            <p className="text-gray-800">{methodology.calorieRationale}</p>
          </div>
        </div>
      </div>

      {/* Professional Help CTA */}
      <div className="glass p-6 text-center border border-purple-100">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full glass-light border border-purple-100 flex items-center justify-center">
          <Icon name="medical" size="lg" className="text-purple-700" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Busque Ajuda Profissional
        </h3>
        <p className="text-gray-700 text-sm max-w-md mx-auto">
          Estes valores são estimativas. Para um plano alimentar personalizado e seguro, 
          consulte um <strong className="text-purple-700">nutricionista</strong> ou{' '}
          <strong className="text-purple-700">médico</strong>. 
          Eles podem considerar fatores individuais que uma calculadora não consegue avaliar.
        </p>
      </div>
    </div>
  );
}

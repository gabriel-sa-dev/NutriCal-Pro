import { useState } from 'react';
import { CalculationInput } from '../types';
import Icon from './Icon';

interface CalculatorProps {
  onCalculate: (input: CalculationInput) => void;
  isLoading: boolean;
}

export default function Calculator({ onCalculate, isLoading }: CalculatorProps) {
  const [formData, setFormData] = useState<CalculationInput>({
    age: 25,
    weight: 70,
    height: 170,
    sex: 'male',
    bodyFatPercentage: undefined,
    goal: 'muscle_gain',
    trainingFrequency: 4,
    trainingIntensity: 'moderate',
    approach: 'moderate',
  });

  const [showBodyFat, setShowBodyFat] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  const updateField = <K extends keyof CalculationInput>(
    field: K,
    value: CalculationInput[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="glass p-6" id="calculator">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2 text-gray-900">
        <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Seus Dados
      </h2>

      {/* Basic Info */}
      <div className="space-y-4">
        {/* Sex */}
        <div>
          <label className="block text-sm text-gray-700 mb-2 font-medium">Sexo Biológico</label>
          <div className="radio-glass">
            <div className="radio-option">
              <input
                type="radio"
                id="sex-male"
                name="sex"
                checked={formData.sex === 'male'}
                onChange={() => updateField('sex', 'male')}
              />
              <label htmlFor="sex-male">
                <Icon name="male" className="inline-block mr-2 text-purple-600" />
                Masculino
              </label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="sex-female"
                name="sex"
                checked={formData.sex === 'female'}
                onChange={() => updateField('sex', 'female')}
              />
              <label htmlFor="sex-female">
                <Icon name="female" className="inline-block mr-2 text-purple-600" />
                Feminino
              </label>
            </div>
          </div>
        </div>

        {/* Age, Weight, Height */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-sm text-gray-700 mb-2 font-medium">Idade</label>
            <input
              type="number"
              min="14"
              max="100"
              value={formData.age}
              onChange={(e) => updateField('age', parseInt(e.target.value) || 0)}
              className="input-glass"
              placeholder="Anos"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2 font-medium">Peso (kg)</label>
            <input
              type="number"
              min="30"
              max="300"
              step="0.1"
              value={formData.weight}
              onChange={(e) => updateField('weight', parseFloat(e.target.value) || 0)}
              className="input-glass"
              placeholder="kg"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-2 font-medium">Altura (cm)</label>
            <input
              type="number"
              min="100"
              max="250"
              value={formData.height}
              onChange={(e) => updateField('height', parseInt(e.target.value) || 0)}
              className="input-glass"
              placeholder="cm"
            />
          </div>
        </div>

        {/* Body Fat (optional) */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm text-gray-700 font-medium">% Gordura Corporal (opcional)</label>
            <button
              type="button"
              onClick={() => setShowBodyFat(!showBodyFat)}
              className="text-xs text-purple-600 hover:text-purple-700 transition-colors font-medium"
            >
              {showBodyFat ? 'Ocultar' : 'Adicionar'}
            </button>
          </div>
          {showBodyFat && (
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="3"
                max="50"
                step="0.1"
                value={formData.bodyFatPercentage || ''}
                onChange={(e) => updateField('bodyFatPercentage', parseFloat(e.target.value) || undefined)}
                className="input-glass flex-1"
                placeholder="Ex: 15"
              />
              <span className="text-gray-600">%</span>
            </div>
          )}
          {showBodyFat && (
            <p className="text-xs text-gray-500 mt-1">
              Se informado, usaremos a fórmula Katch-McArdle (mais precisa)
            </p>
          )}
        </div>

        <hr className="border-white/10 my-4" />

        {/* Goal */}
        <div>
          <label className="block text-sm text-gray-700 mb-2 font-medium">Objetivo Principal</label>
          <div className="radio-glass">
            <div className="radio-option">
              <input
                type="radio"
                id="goal-loss"
                name="goal"
                checked={formData.goal === 'weight_loss'}
                onChange={() => updateField('goal', 'weight_loss')}
              />
              <label htmlFor="goal-loss">
                <Icon name="fire" className="inline-block mr-2 text-purple-600" />
                Emagrecimento
              </label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="goal-gain"
                name="goal"
                checked={formData.goal === 'muscle_gain'}
                onChange={() => updateField('goal', 'muscle_gain')}
              />
              <label htmlFor="goal-gain">
                <Icon name="muscle" className="inline-block mr-2 text-purple-600" />
                Hipertrofia
              </label>
            </div>
          </div>
        </div>

        {/* Training Frequency */}
        <div>
          <label className="block text-sm text-gray-700 mb-2 font-medium">
            Treinos por Semana: <span className="text-purple-600 font-semibold">{formData.trainingFrequency}x</span>
          </label>
          <input
            type="range"
            min="0"
            max="7"
            value={formData.trainingFrequency}
            onChange={(e) => updateField('trainingFrequency', parseInt(e.target.value))}
            className="w-full h-2 bg-purple-100 rounded-lg appearance-none cursor-pointer accent-purple-600"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Sedentário</span>
            <span>Moderado</span>
            <span>Intenso</span>
          </div>
        </div>

        {/* Training Intensity */}
        <div>
          <label className="block text-sm text-gray-700 mb-2 font-medium">Intensidade dos Treinos</label>
          <div className="radio-glass">
            <div className="radio-option">
              <input
                type="radio"
                id="intensity-low"
                name="intensity"
                checked={formData.trainingIntensity === 'low'}
                onChange={() => updateField('trainingIntensity', 'low')}
              />
              <label htmlFor="intensity-low">
                <Icon name="walk" className="inline-block mr-2 text-purple-600" />
                Leve
              </label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="intensity-moderate"
                name="intensity"
                checked={formData.trainingIntensity === 'moderate'}
                onChange={() => updateField('trainingIntensity', 'moderate')}
              />
              <label htmlFor="intensity-moderate">
                <Icon name="run" className="inline-block mr-2 text-purple-600" />
                Moderada
              </label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="intensity-high"
                name="intensity"
                checked={formData.trainingIntensity === 'high'}
                onChange={() => updateField('trainingIntensity', 'high')}
              />
              <label htmlFor="intensity-high">
                <Icon name="bolt" className="inline-block mr-2 text-purple-600" />
                Alta
              </label>
            </div>
          </div>
        </div>

        <hr className="border-gray-200 my-4" />

        {/* Approach */}
        <div>
          <label className="block text-sm text-gray-700 mb-2 font-medium">Abordagem do Plano</label>
          <div className="radio-glass">
            <div className="radio-option">
              <input
                type="radio"
                id="approach-moderate"
                name="approach"
                checked={formData.approach === 'moderate'}
                onChange={() => updateField('approach', 'moderate')}
              />
              <label htmlFor="approach-moderate">
                <Icon name="check" className="inline-block mr-2 text-purple-600" />
                Moderada
                <span className="block text-xs text-green-600 mt-1 font-medium">Recomendado</span>
              </label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="approach-aggressive"
                name="approach"
                checked={formData.approach === 'aggressive'}
                onChange={() => updateField('approach', 'aggressive')}
              />
              <label htmlFor="approach-aggressive">
                <Icon name="run" className="inline-block mr-2 text-purple-600" />
                Agressiva
                <span className="block text-xs text-yellow-600 mt-1 font-medium">Resultados rápidos</span>
              </label>
            </div>
          </div>

          {formData.approach === 'aggressive' && (
            <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800 text-xs flex items-start gap-2">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <span>
                  A abordagem agressiva pode ser mais difícil de manter e pode não ser adequada para todos. 
                  <strong> Recomendamos fortemente a abordagem moderada</strong> para resultados sustentáveis.
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-6 py-4 px-6 glass-button rounded-xl font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <div className="spinner" />
            <span>Calculando...</span>
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            <span>Calcular Meus Macros</span>
          </>
        )}
      </button>
    </form>
  );
}

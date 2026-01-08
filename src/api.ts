import { CalculationInput, CalculationResult, ApiInfoResponse } from './types';
import { calculateMacros as calculateMacrosLocal } from './calculator';

// Função para calcular macros (agora usando cálculo local para GitHub Pages)
export async function calculateMacros(input: CalculationInput): Promise<CalculationResult> {
  // Validação
  if (!input.age || !input.weight || !input.height || !input.sex || !input.goal) {
    throw new Error('Dados incompletos');
  }

  // Calcula localmente no navegador
  return calculateMacrosLocal(input);
}

// Função para obter informações da API
export async function getApiInfo(): Promise<ApiInfoResponse> {
  return {
    name: 'NutriCalc Pro',
    version: '1.0.0',
    references: [
      {
        name: 'Mifflin-St Jeor Equation',
        source: 'Mifflin MD, et al. A new predictive equation for resting energy expenditure in healthy individuals. Am J Clin Nutr. 1990;51(2):241-247.',
        description: 'Fórmula mais precisa para cálculo do TMB segundo revisão sistemática publicada no Journal of the American Dietetic Association (2005).'
      },
      {
        name: 'Katch-McArdle Formula',
        source: 'McArdle WD, Katch FI, Katch VL. Exercise Physiology: Nutrition, Energy, and Human Performance. 8th ed.',
        description: 'Fórmula utilizada quando o percentual de gordura corporal é conhecido, baseada na massa magra.'
      },
      {
        name: 'Protein Recommendations',
        source: 'Morton RW, et al. A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med. 2018;52(6):376-384.',
        description: 'Meta-análise que estabelece recomendações de proteína para hipertrofia muscular.'
      },
      {
        name: 'Activity Multipliers',
        source: 'Harris JA, Benedict FG. A Biometric Study of Human Basal Metabolism. Proc Natl Acad Sci USA. 1918;4(12):370-373.',
        description: 'Multiplicadores de atividade física para cálculo do TDEE.'
      }
    ]
  };
}

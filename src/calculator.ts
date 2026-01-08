/**
 * NutriCalc Pro - Calculator Engine
 * 
 * Referências Científicas:
 * 
 * 1. Mifflin-St Jeor Equation (1990)
 *    - Considerada a mais precisa para cálculo de TMB pela American Dietetic Association
 *    - Homens: TMB = (10 × peso em kg) + (6.25 × altura em cm) - (5 × idade) + 5
 *    - Mulheres: TMB = (10 × peso em kg) + (6.25 × altura em cm) - (5 × idade) - 161
 * 
 * 2. Katch-McArdle Formula (quando % gordura disponível)
 *    - TMB = 370 + (21.6 × massa magra em kg)
 *    - Mais precisa para pessoas que conhecem seu % de gordura corporal
 * 
 * 3. Multiplicadores de Atividade (Harris-Benedict adaptado):
 *    - Sedentário: 1.2
 *    - Levemente ativo (1-2 treinos/semana): 1.375
 *    - Moderadamente ativo (3-4 treinos/semana): 1.55
 *    - Muito ativo (5-6 treinos/semana): 1.725
 *    - Extremamente ativo (6-7 treinos intensos/semana): 1.9
 * 
 * 4. Recomendações de Proteína (Morton et al., 2018):
 *    - Hipertrofia: 1.6-2.2g/kg de peso corporal
 *    - Emagrecimento: 1.6-2.4g/kg para preservar massa magra
 * 
 * 5. Gorduras (ACSM Guidelines):
 *    - Mínimo: 0.5g/kg
 *    - Recomendado: 0.8-1.2g/kg
 * 
 * 6. Carboidratos:
 *    - Calculados a partir das calorias restantes após proteína e gordura
 */

import { CalculationInput, CalculationResult, MacroDistribution } from './types';

/**
 * Calcula o TMB usando a fórmula Mifflin-St Jeor
 * Referência: Mifflin MD, et al. Am J Clin Nutr. 1990;51(2):241-247
 */
function calculateBMR_MifflinStJeor(
  weight: number,
  height: number,
  age: number,
  sex: 'male' | 'female'
): number {
  const baseBMR = (10 * weight) + (6.25 * height) - (5 * age);
  return sex === 'male' ? baseBMR + 5 : baseBMR - 161;
}

/**
 * Calcula o TMB usando a fórmula Katch-McArdle
 * Referência: McArdle WD, Katch FI, Katch VL. Exercise Physiology. 8th ed.
 * Mais precisa quando o % de gordura corporal é conhecido
 */
function calculateBMR_KatchMcArdle(weight: number, bodyFatPercentage: number): number {
  const leanBodyMass = weight * (1 - bodyFatPercentage / 100);
  return 370 + (21.6 * leanBodyMass);
}

/**
 * Determina o multiplicador de atividade baseado na frequência e intensidade dos treinos
 */
function getActivityMultiplier(
  trainingFrequency: number,
  trainingIntensity: 'low' | 'moderate' | 'high'
): number {
  // Base multipliers por frequência
  const baseMultipliers: Record<number, number> = {
    0: 1.2,   // Sedentário
    1: 1.3,   // Muito leve
    2: 1.375, // Levemente ativo
    3: 1.465, // Leve-moderado
    4: 1.55,  // Moderadamente ativo
    5: 1.65,  // Ativo
    6: 1.725, // Muito ativo
    7: 1.9,   // Extremamente ativo
  };

  const baseMultiplier = baseMultipliers[Math.min(trainingFrequency, 7)] || 1.2;

  // Ajuste por intensidade
  const intensityAdjustment: Record<string, number> = {
    low: -0.05,
    moderate: 0,
    high: 0.1,
  };

  return baseMultiplier + intensityAdjustment[trainingIntensity];
}

/**
 * Calcula o ajuste calórico baseado no objetivo e abordagem
 */
function getCalorieAdjustment(
  goal: 'weight_loss' | 'muscle_gain',
  approach: 'moderate' | 'aggressive'
): number {
  if (goal === 'weight_loss') {
    // Déficit calórico
    // Moderado: ~15-20% déficit (mais sustentável)
    // Agressivo: ~25-30% déficit (mais rápido, mas menos sustentável)
    return approach === 'moderate' ? -0.18 : -0.28;
  } else {
    // Superávit calórico para hipertrofia
    // Moderado: ~10-15% superávit (lean bulk)
    // Agressivo: ~20-25% superávit (mais rápido, mas mais gordura)
    return approach === 'moderate' ? 0.12 : 0.22;
  }
}

/**
 * Calcula a distribuição de macronutrientes
 */
function calculateMacroDistribution(
  targetCalories: number,
  weight: number,
  goal: 'weight_loss' | 'muscle_gain',
  approach: 'moderate' | 'aggressive',
  trainingIntensity: 'low' | 'moderate' | 'high'
): MacroDistribution {
  // Proteína: baseada nas recomendações de Morton et al. (2018)
  let proteinPerKg: number;
  
  if (goal === 'muscle_gain') {
    // 1.6-2.2g/kg para hipertrofia
    proteinPerKg = approach === 'moderate' ? 1.8 : 2.2;
  } else {
    // 1.8-2.4g/kg para emagrecimento (preservar massa magra)
    proteinPerKg = approach === 'moderate' ? 2.0 : 2.4;
  }

  // Ajuste por intensidade de treino
  if (trainingIntensity === 'high') {
    proteinPerKg += 0.1;
  } else if (trainingIntensity === 'low') {
    proteinPerKg -= 0.1;
  }

  // Gordura: 0.8-1.2g/kg (essencial para hormônios)
  let fatPerKg: number;
  if (goal === 'weight_loss') {
    fatPerKg = approach === 'moderate' ? 0.9 : 0.7;
  } else {
    fatPerKg = approach === 'moderate' ? 1.0 : 1.1;
  }

  // Cálculo em gramas
  const protein = Math.ceil(weight * proteinPerKg);
  const fats = Math.ceil(weight * fatPerKg);

  // Calorias de proteína e gordura
  const proteinCalories = protein * 4;
  const fatsCalories = fats * 9;

  // Carboidratos: calorias restantes
  const remainingCalories = targetCalories - proteinCalories - fatsCalories;
  const carbs = Math.ceil(Math.max(remainingCalories / 4, 50)); // Mínimo 50g para função cerebral

  const carbsCalories = carbs * 4;
  const totalCalories = proteinCalories + carbsCalories + fatsCalories;

  return {
    protein,
    carbs,
    fats,
    proteinCalories,
    carbsCalories,
    fatsCalories,
    proteinPercentage: Math.round((proteinCalories / totalCalories) * 100),
    carbsPercentage: Math.round((carbsCalories / totalCalories) * 100),
    fatsPercentage: Math.round((fatsCalories / totalCalories) * 100),
  };
}

/**
 * Função principal de cálculo
 */
export function calculateMacros(input: CalculationInput): CalculationResult {
  const warnings: string[] = [];
  const recommendations: string[] = [];

  // Validações e avisos
  if (input.age < 18) {
    warnings.push('Atenção: Este cálculo é destinado a adultos. Consulte um nutricionista pediátrico.');
  }
  if (input.age > 65) {
    warnings.push('Para pessoas acima de 65 anos, as necessidades podem variar. Consulte um profissional.');
  }

  // Calcular TMB
  let bmr: number;
  let bmrFormula: string;

  if (input.bodyFatPercentage && input.bodyFatPercentage > 0 && input.bodyFatPercentage < 50) {
    // Usar Katch-McArdle se tiver % de gordura
    bmr = calculateBMR_KatchMcArdle(input.weight, input.bodyFatPercentage);
    bmrFormula = `Katch-McArdle (baseado em ${input.bodyFatPercentage}% de gordura corporal): TMB = 370 + (21.6 × massa magra)`;
  } else {
    // Usar Mifflin-St Jeor
    bmr = calculateBMR_MifflinStJeor(input.weight, input.height, input.age, input.sex);
    bmrFormula = `Mifflin-St Jeor: TMB = (10 × ${input.weight}) + (6.25 × ${input.height}) - (5 × ${input.age}) ${input.sex === 'male' ? '+ 5' : '- 161'}`;
  }

  bmr = Math.ceil(bmr);

  // Calcular multiplicador de atividade
  const activityMultiplier = getActivityMultiplier(input.trainingFrequency, input.trainingIntensity);

  // Calcular TDEE
  const tdee = Math.ceil(bmr * activityMultiplier);

  // Calcular ajuste calórico
  const calorieAdjustmentPercentage = getCalorieAdjustment(input.goal, input.approach);
  const calorieAdjustment = Math.round(tdee * calorieAdjustmentPercentage);

  // Calorias alvo
  let targetCalories = Math.ceil(tdee + calorieAdjustment);

  // Mínimo seguro de calorias
  const minCalories = input.sex === 'male' ? 1500 : 1200;
  if (targetCalories < minCalories) {
    warnings.push(`⚠️ As calorias foram ajustadas para o mínimo seguro de ${minCalories} kcal. Déficits muito agressivos podem ser prejudiciais.`);
    targetCalories = minCalories;
  }

  // Calcular macros
  const macros = calculateMacroDistribution(
    targetCalories,
    input.weight,
    input.goal,
    input.approach,
    input.trainingIntensity
  );

  // Racional da proteína
  const proteinRationale = input.goal === 'muscle_gain'
    ? `${(macros.protein / input.weight).toFixed(1)}g/kg - baseado em Morton et al. (2018) para maximizar síntese proteica muscular`
    : `${(macros.protein / input.weight).toFixed(1)}g/kg - proteína elevada para preservar massa magra durante déficit calórico`;

  // Racional das calorias
  const calorieRationale = input.goal === 'weight_loss'
    ? `Déficit de ${Math.abs(Math.round(calorieAdjustmentPercentage * 100))}% (${Math.abs(calorieAdjustment)} kcal) para perda de peso ${input.approach === 'moderate' ? 'gradual e sustentável' : 'mais acelerada'}`
    : `Superávit de ${Math.round(calorieAdjustmentPercentage * 100)}% (+${calorieAdjustment} kcal) para ganho de massa ${input.approach === 'moderate' ? 'magra (lean bulk)' : 'mais acelerado'}`;

  // Recomendações personalizadas
  recommendations.push('🏥 SEMPRE consulte um nutricionista ou médico antes de iniciar qualquer dieta.');
  
  if (input.approach === 'aggressive') {
    recommendations.push('⚠️ Você escolheu uma abordagem agressiva. Recomendamos fortemente a abordagem moderada por ser mais sustentável e saudável a longo prazo.');
  }

  if (input.goal === 'weight_loss') {
    recommendations.push('💧 Mantenha-se bem hidratado - beba pelo menos 35ml de água por kg de peso corporal.');
    recommendations.push('🥗 Priorize alimentos integrais e ricos em fibras para maior saciedade.');
    recommendations.push('😴 Durma 7-9 horas por noite - o sono é crucial para a perda de gordura.');
  } else {
    recommendations.push('🏋️ Foque em progressão de carga nos treinos para estimular hipertrofia.');
    recommendations.push('⏰ Distribua a proteína ao longo do dia (20-40g por refeição).');
    recommendations.push('😴 Durma 7-9 horas por noite - o crescimento muscular acontece durante o descanso.');
  }

  if (input.trainingFrequency < 3) {
    recommendations.push('📈 Considere aumentar a frequência de treinos para 3-4x por semana para melhores resultados.');
  }

  return {
    bmr,
    tdee,
    targetCalories,
    macros,
    activityMultiplier: Math.round(activityMultiplier * 100) / 100,
    calorieAdjustment,
    methodology: {
      bmrFormula,
      proteinRationale,
      calorieRationale,
    },
    warnings,
    recommendations,
  };
}

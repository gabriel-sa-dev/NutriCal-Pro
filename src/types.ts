export interface CalculationInput {
  age: number;
  weight: number;
  height: number;
  sex: 'male' | 'female';
  bodyFatPercentage?: number;
  goal: 'weight_loss' | 'muscle_gain';
  trainingFrequency: number;
  trainingIntensity: 'low' | 'moderate' | 'high';
  approach: 'moderate' | 'aggressive';
}

export interface MacroDistribution {
  protein: number;
  carbs: number;
  fats: number;
  proteinCalories: number;
  carbsCalories: number;
  fatsCalories: number;
  proteinPercentage: number;
  carbsPercentage: number;
  fatsPercentage: number;
}

export interface CalculationResult {
  bmr: number;
  tdee: number;
  targetCalories: number;
  macros: MacroDistribution;
  activityMultiplier: number;
  calorieAdjustment: number;
  methodology: {
    bmrFormula: string;
    proteinRationale: string;
    calorieRationale: string;
  };
  warnings: string[];
  recommendations: string[];
}

export interface ApiInfoResponse {
  name: string;
  version: string;
  references: {
    name: string;
    source: string;
    description: string;
  }[];
}

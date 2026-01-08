import { CalculationInput, CalculationResult, ApiInfoResponse } from './types';

const API_BASE = '/api';

export async function calculateMacros(input: CalculationInput): Promise<CalculationResult> {
  const response = await fetch(`${API_BASE}/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Erro ao calcular');
  }

  return response.json();
}

export async function getApiInfo(): Promise<ApiInfoResponse> {
  const response = await fetch(`${API_BASE}/info`);
  
  if (!response.ok) {
    throw new Error('Erro ao buscar informações');
  }

  return response.json();
}

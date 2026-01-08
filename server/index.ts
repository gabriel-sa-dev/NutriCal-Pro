import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { calculateMacros, type CalculationInput, type CalculationResult } from './calculator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Serve static files from React build in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client')));
}

// API Routes
app.post('/api/calculate', (req, res) => {
  try {
    const input: CalculationInput = req.body;
    
    // Validation
    if (!input.age || !input.weight || !input.height || !input.sex || !input.goal) {
      return res.status(400).json({ error: 'Dados incompletos' });
    }

    const result: CalculationResult = calculateMacros(input);
    res.json(result);
  } catch (error) {
    console.error('Calculation error:', error);
    res.status(500).json({ error: 'Erro ao calcular' });
  }
});

// API info endpoint
app.get('/api/info', (_req, res) => {
  res.json({
    name: 'NutriCalc Pro API',
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
  });
});

// Catch-all route for React app in production
if (process.env.NODE_ENV === 'production') {
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../client/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 NutriCalc Pro Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
});

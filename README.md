# 🍎 NutriCalc Pro

**Calculadora Inteligente de Macronutrientes e Calorias**

Uma aplicação web moderna para cálculo personalizado de necessidades calóricas e distribuição de macronutrientes, baseada em evidências científicas e fórmulas validadas pela literatura médica.

![Version](https://img.shields.io/badge/version-1.0.0-purple)
![License](https://img.shields.io/badge/license-MIT-green)
[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-blueviolet)](https://github.com)

---

## 🚀 Demo Online

🔗 **[Acessar NutriCalc Pro](https://[seu-usuario].github.io/port/)**

---

## 🎯 Sobre o Projeto

O **NutriCalc Pro** é uma ferramenta que utiliza as fórmulas mais precisas disponíveis na literatura científica para calcular:

- **Taxa Metabólica Basal (TMB)** - Quantidade de calorias que seu corpo queima em repouso
- **TDEE (Total Daily Energy Expenditure)** - Gasto calórico total diário considerando atividade física
- **Distribuição otimizada de Macronutrientes** - Proteínas, carboidratos e gorduras personalizados
- **Ajustes calóricos** - Déficit ou superávit baseado em objetivos (emagrecimento ou hipertrofia)

### ⚠️ Aviso Importante

Esta calculadora fornece **estimativas** baseadas em fórmulas científicas validadas, mas não substitui o acompanhamento de um profissional. **SEMPRE consulte um nutricionista ou médico** antes de iniciar qualquer dieta ou programa alimentar. Profissionais qualificados podem avaliar suas necessidades individuais, histórico de saúde e criar um plano personalizado e seguro.

---

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura **monolítica moderna** com separação clara entre frontend e backend, mas servidos na mesma aplicação para facilitar deployment e reduzir complexidade.

```
nutri-calc-pro/
├── server/                 # Backend (Express + TypeScript)
│   ├── index.ts           # Servidor principal
│   └── calculator.ts      # Engine de cálculos com fórmulas científicas
├── src/                    # Frontend (React + TypeScript)
│   ├── components/        # Componentes React
│   │   ├── Calculator.tsx # Formulário de entrada
│   │   ├── Results.tsx    # Exibição de resultados
│   │   ├── Header.tsx     # Cabeçalho
│   │   ├── Footer.tsx     # Rodapé
│   │   └── Disclaimer.tsx # Avisos legais
│   ├── api.ts             # Cliente HTTP para comunicação com backend
│   ├── types.ts           # Tipos TypeScript compartilhados
│   ├── App.tsx            # Componente raiz
│   ├── main.tsx           # Entry point React
│   └── index.css          # Estilos globais (Tailwind + customizações)
├── public/                 # Assets estáticos
├── dist/                   # Build de produção (gerado)
│   ├── client/            # Frontend compilado
│   └── server/            # Backend compilado
└── package.json           # Dependências e scripts
```

### Fluxo de Dados

```
[Usuário] → [Calculator Form] → [API POST /api/calculate] → [Backend Calculator Engine]
                                                                      ↓
                                                          [Cálculos Científicos]
                                                                      ↓
[Results Display] ← [React State] ← [API Response] ← [JSON com resultados]
```

---

## 🧬 Metodologia Científica e Referências

### 1. Cálculo da Taxa Metabólica Basal (TMB)

#### Fórmula Mifflin-St Jeor (1990)
**Considerada a mais precisa pela American Dietetic Association**

- **Homens**: TMB = (10 × peso kg) + (6.25 × altura cm) - (5 × idade) + 5
- **Mulheres**: TMB = (10 × peso kg) + (6.25 × altura cm) - (5 × idade) - 161

**Referência**: Mifflin MD, St Jeor ST, Hill LA, Scott BJ, Daugherty SA, Koh YO. *A new predictive equation for resting energy expenditure in healthy individuals*. Am J Clin Nutr. 1990;51(2):241-247.

**Validação**: Frankenfield D, Roth-Yousey L, Compher C. *Comparison of predictive equations for resting metabolic rate in healthy nonobese and obese adults: a systematic review*. J Am Diet Assoc. 2005;105(5):775-789. 
- Conclusão: A Mifflin-St Jeor prevê a TMB dentro de 10% do valor medido em mais indivíduos do que qualquer outra equação testada.

#### Fórmula Katch-McArdle (quando % de gordura é conhecido)

- **TMB** = 370 + (21.6 × massa magra kg)

**Referência**: McArdle WD, Katch FI, Katch VL. *Exercise Physiology: Nutrition, Energy, and Human Performance*. 8th ed. Lippincott Williams & Wilkins; 2014.

**Vantagem**: Mais precisa quando o percentual de gordura corporal é conhecido, pois considera diretamente a massa metabólica ativa.

---

### 2. Multiplicadores de Atividade Física

Baseado em Harris-Benedict com ajustes modernos:

| Nível de Atividade | Multiplicador | Descrição |
|---|---|---|
| Sedentário | 1.2 | Pouco ou nenhum exercício |
| Levemente ativo | 1.375 | Exercício leve 1-2x/semana |
| Moderadamente ativo | 1.55 | Exercício moderado 3-4x/semana |
| Muito ativo | 1.725 | Exercício intenso 5-6x/semana |
| Extremamente ativo | 1.9 | Exercício intenso 6-7x/semana + trabalho físico |

**Referência**: Harris JA, Benedict FG. *A Biometric Study of Human Basal Metabolism*. Proc Natl Acad Sci USA. 1918;4(12):370-373.

---

### 3. Recomendações de Proteína

#### Para Hipertrofia Muscular
- **Recomendado**: 1.6-2.2 g/kg de peso corporal/dia

**Referência**: Morton RW, Murphy KT, McKellar SR, et al. *A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults*. Br J Sports Med. 2018;52(6):376-384.

**Principais Achados**:
- Intake proteico de até 1.6 g/kg/dia aumenta massa magra
- Benefícios adicionais modestos até ~2.2 g/kg/dia
- Além de 2.2 g/kg/dia, não há benefícios adicionais significativos

#### Para Emagrecimento (Déficit Calórico)
- **Recomendado**: 1.8-2.4 g/kg de peso corporal/dia (maior para preservar massa magra)

**Referência**: Longland TM, Oikawa SY, Mitchell CJ, Devries MC, Phillips SM. *Higher compared with lower dietary protein during an energy deficit combined with intense exercise promotes greater lean mass gain and fat mass loss: a randomized trial*. Am J Clin Nutr. 2016;103(3):738-746.

---

### 4. Recomendações de Gorduras

- **Mínimo**: 0.5 g/kg (essencial para funções hormonais)
- **Recomendado**: 0.8-1.2 g/kg

**Referência**: American College of Sports Medicine (ACSM). *ACSM's Guidelines for Exercise Testing and Prescription*. 10th ed. Wolters Kluwer; 2018.

**Importância**: Gorduras são essenciais para:
- Produção hormonal (testosterona, estrogênio)
- Absorção de vitaminas lipossolúveis (A, D, E, K)
- Função cerebral e sistema nervoso
- Inflamação e recuperação

---

### 5. Carboidratos

Calculados a partir das calorias restantes após proteína e gordura serem determinadas:

**Carboidratos (g)** = (Calorias Alvo - Calorias Proteína - Calorias Gordura) ÷ 4

**Mínimo recomendado**: 50g/dia para função cerebral adequada

---

### 6. Ajustes Calóricos por Objetivo

#### Emagrecimento (Déficit Calórico)
- **Moderado**: -15 a -20% do TDEE (~0.5 kg/semana)
- **Agressivo**: -25 a -30% do TDEE (~0.75-1 kg/semana)

#### Hipertrofia (Superávit Calórico)
- **Moderado (Lean Bulk)**: +10 a +15% do TDEE
- **Agressivo (Bulk tradicional)**: +20 a +25% do TDEE

**Referência**: Helms ER, Aragon AA, Fitschen PJ. *Evidence-based recommendations for natural bodybuilding contest preparation: nutrition and supplementation*. J Int Soc Sports Nutr. 2014;11:20.

---

## 🛠️ Stack Tecnológica

### Frontend
- **React 18** - Biblioteca UI com hooks
- **TypeScript** - Type safety e melhor DX
- **Vite** - Build tool ultra-rápido
- **Tailwind CSS** - Utility-first CSS framework
- **Design System**: Glassmorphism com tons suaves de vermelho/vinho em fundo branco

### Backend
- **Node.js** - Runtime JavaScript
- **Express 4** - Framework web minimalista
- **TypeScript** - Type safety no backend também
- **CORS** - Configuração para cross-origin requests

### DevOps & Tooling
- **TSX** - TypeScript execution para desenvolvimento
- **Concurrently** - Rodar múltiplos scripts npm em paralelo
- **PostCSS & Autoprefixer** - Processamento CSS

---

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Clone o repositório
git clone <url-do-repo>
cd port

# Instale as dependências
npm install
```

### Desenvolvimento

```bash
# Inicia backend (porta 3001) e frontend (porta 5173) simultaneamente
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:3001/api

Se aparecer erro de porta em uso (ex.: `EADDRINUSE`), finalize o processo anterior que está usando a porta 3001/5173 e rode novamente.

### Produção

```bash
# Build para produção
npm run build

# Inicia servidor de produção (tudo na porta 3001)
npm start
```

Em produção, o Express serve os arquivos estáticos do React build, então tudo roda em uma única porta.

### Scripts Disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Desenvolvimento (frontend + backend) |
| `npm run dev:server` | Apenas backend (com watch) |
| `npm run dev:client` | Apenas frontend (Vite) |
| `npm run build` | Build de produção completo |
| `npm start` | Servidor de produção |
| `npm run preview` | Build + start (teste de produção local) |

---

## 📁 Estrutura de Tipos TypeScript

```typescript
interface CalculationInput {
  age: number;
  weight: number;          // kg
  height: number;          // cm
  sex: 'male' | 'female';
  bodyFatPercentage?: number;  // opcional
  goal: 'weight_loss' | 'muscle_gain';
  trainingFrequency: number;    // 0-7 treinos/semana
  trainingIntensity: 'low' | 'moderate' | 'high';
  approach: 'moderate' | 'aggressive';
}

interface CalculationResult {
  bmr: number;                    // Taxa Metabólica Basal
  tdee: number;                   // Total Daily Energy Expenditure
  targetCalories: number;          // Calorias alvo
  macros: MacroDistribution;      // Distribuição de macros
  activityMultiplier: number;     // Multiplicador de atividade
  calorieAdjustment: number;      // Ajuste calórico aplicado
  methodology: {                  // Explicação dos cálculos
    bmrFormula: string;
    proteinRationale: string;
    calorieRationale: string;
  };
  warnings: string[];             // Avisos personalizados
  recommendations: string[];      // Recomendações personalizadas
}
```

---

## 🎨 Design System

### Paleta de Cores

```css
/* Cores Principais */
--purple-primary: #7c3aed   /* Roxo (violet) */
--purple-deep: #5b21b6      /* Roxo profundo */
--lilac-primary: #a78bfa    /* Lilás */
--lilac-light: #ddd6fe      /* Lilás claro */

/* Fundos */
--cream: #fbfbfd            /* Branco/ghost */
--glass-bg: rgba(255, 255, 255, 0.85)  /* Glassmorphism */
```

### Componentes Visuais
- **Fundo branco/creme** - Background leve e acolhedor
- **Glassmorphism cards** - Efeito de vidro fosco com blur
- **Gradient texts** - Gradientes lilás/roxo nos títulos
- **Floating orbs sutis** - Elementos decorativos suaves no background
- **Smooth animations** - Transições suaves e micro-interações

---

## 🔒 Segurança e Validação

- Validação de entrada no backend (tipos, ranges)
- Limites de segurança para déficits calóricos extremos
- Avisos para usuários fora de faixas etárias típicas
- Disclaimer legal em destaque
- CORS configurado apropriadamente

---

## 🧪 Testes e Validação

As fórmulas implementadas foram validadas contra:
- Publicações peer-reviewed em journals de alto impacto
- Diretrizes de organizações como ACSM, AND (Academy of Nutrition and Dietetics)
- Meta-análises e revisões sistemáticas

---

## 📄 Licença

MIT License

---

## � Deploy

O projeto está configurado para deploy automático no GitHub Pages. Consulte [DEPLOY.md](DEPLOY.md) para instruções detalhadas.

**Quick Start:**

```bash
# Build e deploy manual
npm run deploy

# Ou: push para main para deploy automático via GitHub Actions
git push origin main
```

---

## �👥 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

---

## 📞 Suporte

Para bugs, questões ou sugestões, abra uma **issue** no repositório.

---

## ⭐ Agradecimentos

- Comunidade científica pela pesquisa open access
- Desenvolvedores das libs utilizadas
- Usuários que fornecem feedback

---

**Nota Final**: Este projeto é uma ferramenta educacional e de orientação. Os valores fornecidos são estimativas baseadas em fórmulas validadas cientificamente, mas fatores individuais podem causar variações significativas. **Consulte sempre um profissional de saúde qualificado antes de iniciar mudanças significativas em sua dieta ou rotina de exercícios.**

---

Feito com 💚 para promover saúde e bem-estar baseado em evidências

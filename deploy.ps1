#!/usr/bin/env pwsh
# Deploy Helper Script para GitHub Pages

Write-Host "🚀 NutriCalc Pro - Deploy Helper" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Verificar se git está inicializado
if (-not (Test-Path ".git")) {
    Write-Host "⚠️  Git não inicializado! Inicializando..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Git inicializado" -ForegroundColor Green
}

# Verificar se há remote configurado
$remoteUrl = git remote get-url origin 2>$null
if (-not $remoteUrl) {
    Write-Host ""
    Write-Host "📝 Configure o remote do GitHub:" -ForegroundColor Yellow
    Write-Host "   git remote add origin https://github.com/[SEU-USUARIO]/port.git" -ForegroundColor White
    Write-Host ""
    exit 1
}

Write-Host "✓ Remote configurado: $remoteUrl" -ForegroundColor Green
Write-Host ""

# Verificar status
Write-Host "📊 Status do repositório:" -ForegroundColor Cyan
git status --short

Write-Host ""
$continue = Read-Host "Deseja continuar com o deploy? (s/n)"

if ($continue -ne "s" -and $continue -ne "S") {
    Write-Host "❌ Deploy cancelado" -ForegroundColor Red
    exit 0
}

Write-Host ""
Write-Host "📦 Adicionando arquivos..." -ForegroundColor Cyan
git add .

Write-Host ""
$commitMsg = Read-Host "Mensagem do commit (Enter para 'Update project')"
if ([string]::IsNullOrWhiteSpace($commitMsg)) {
    $commitMsg = "Update project"
}

Write-Host ""
Write-Host "💾 Commitando: $commitMsg" -ForegroundColor Cyan
git commit -m $commitMsg

Write-Host ""
Write-Host "⬆️  Fazendo push para GitHub..." -ForegroundColor Cyan
git push origin main

Write-Host ""
Write-Host "✨ Deploy iniciado!" -ForegroundColor Green
Write-Host ""
Write-Host "📍 Próximos passos:" -ForegroundColor Cyan
Write-Host "   1. Aguarde o GitHub Actions completar o build" -ForegroundColor White
Write-Host "   2. Verifique o progresso em: https://github.com/[SEU-USUARIO]/port/actions" -ForegroundColor White
Write-Host "   3. Após conclusão, acesse: https://[SEU-USUARIO].github.io/port/" -ForegroundColor White
Write-Host ""
Write-Host "🎉 Processo concluído!" -ForegroundColor Green

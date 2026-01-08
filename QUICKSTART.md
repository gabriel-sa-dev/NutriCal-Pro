# 🚀 Quick Start: Deploy no GitHub Pages

## Passos para Publicar pela Primeira Vez

### 1. Criar Repositório no GitHub

1. Acesse [GitHub](https://github.com) e faça login
2. Clique em **+** → **New repository**
3. Nome do repositório: `port` (ou outro nome de sua escolha)
4. Deixe como **Public**
5. **NÃO** marque "Initialize with README" (já temos um)
6. Clique em **Create repository**

### 2. Configurar Git Local

Se ainda não inicializou o Git:

```bash
cd "c:\Users\MambaPê\Desktop\port"
git init
git add .
git commit -m "Initial commit: NutriCalc Pro"
```

### 3. Conectar ao GitHub

Substitua `[SEU-USUARIO]` pelo seu usuário do GitHub:

```bash
git remote add origin https://github.com/[SEU-USUARIO]/port.git
git branch -M main
git push -u origin main
```

### 4. Configurar GitHub Pages

1. No seu repositório do GitHub, vá em **Settings**
2. No menu lateral, clique em **Pages**
3. Em **Source**, selecione **GitHub Actions**

### 5. Deploy Automático

O GitHub Actions será executado automaticamente e fará o deploy. Aguarde alguns minutos.

Para ver o progresso:
- Vá em **Actions** no menu do repositório
- Clique no workflow em execução

### 6. Acessar o Site

Após o deploy concluir (ícone verde ✓), acesse:

```
https://[SEU-USUARIO].github.io/port/
```

---

## Atualizações Futuras

Para publicar novas alterações:

```bash
git add .
git commit -m "Descrição das alterações"
git push origin main
```

O deploy acontecerá automaticamente!

---

## Deploy Manual (Alternativo)

Se preferir não usar GitHub Actions:

```bash
npm run deploy
```

Este comando:
1. Faz o build otimizado
2. Faz push direto da pasta `dist` para branch `gh-pages`

**Nota**: Neste caso, configure o GitHub Pages para usar a branch `gh-pages` em vez de GitHub Actions.

---

## ⚠️ Importante: Atualizar o Base Path

Se o nome do seu repositório **NÃO** for `port`, edite `vite.config.ts`:

```typescript
base: process.env.GITHUB_PAGES === 'true' ? '/[NOME-DO-SEU-REPO]/' : '/',
```

Substitua `[NOME-DO-SEU-REPO]` pelo nome real do repositório.

---

## Solução de Problemas

### Erro 404 após deploy
- Verifique se o workflow completou com sucesso
- Confirme que GitHub Pages está usando "GitHub Actions" como source
- Aguarde 2-5 minutos para propagação

### Site não carrega CSS/JS
- Verifique o base path no vite.config.ts
- Deve ser `'/NOME-REPOSITORIO/'` (com barras no início e fim)

### Workflow falha no Actions
- Verifique os logs em Actions → workflow → build job
- Certifique-se que todas as dependências foram commitadas

---

## 📋 Checklist Pré-Deploy

- [ ] Repositório criado no GitHub
- [ ] Git inicializado e conectado
- [ ] Primeira push para branch main realizada
- [ ] GitHub Pages configurado para usar Actions
- [ ] Workflow executado com sucesso
- [ ] Site acessível via URL do GitHub Pages

---

✅ **Pronto!** Seu NutriCalc Pro está no ar!

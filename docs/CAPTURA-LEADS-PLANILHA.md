# Captura de leads → Google Planilhas

Como o correio: o quiz escreve o cartão (nome, e-mail, WhatsApp) e o carteiro (Apps Script) entrega na sua caixa (planilha).

## Passo a passo (≈ 10 minutos)

### 1. Crie a planilha
1. Abra [Google Sheets](https://sheets.google.com)
2. **Planilha em branco**
3. Renomeie para algo como `Leads Zero Odor`

### 2. Cole o script
1. Menu **Extensões → Apps Script**
2. Apague o código de exemplo
3. Cole o conteúdo de `google-apps-script/Code.gs` do projeto
4. Clique em **Salvar** (nome: `Captura Leads Zero Odor`)

### 3. Publique como “App da Web”
1. **Implantar → Nova implantação**
2. Tipo: **App da Web**
3. Descrição: `leads quiz`
4. **Executar como:** Eu
5. **Quem tem acesso:** **Qualquer pessoa**
6. **Implantar**
7. Autorize a conta Google (pode pedir “avançado / ir para o app”)
8. **Copie a URL** (termina algo como `/exec`)

### 4. Ligue no site
No arquivo `js/config.js`:

```js
window.SZO.sheetWebhook = "COLE_A_URL_AQUI";
```

Salve e publique o site de novo (se já estiver no ar).

### 5. Teste
1. Abra o quiz no navegador
2. Responda e preencha nome + e-mail + WhatsApp
3. Veja a aba **Leads** na planilha — deve nascer uma linha

Teste só no Apps Script: função `testAppend` → Executar → olhe a planilha.

## Colunas

| Data | Nome | Email | WhatsApp | Score | Perfil ID | Perfil | Origem |

## Segurança (simples e honesta)
- A URL do webhook **não é senha**, mas quem a tiver pode gravar linhas na planilha.
- Não compartilhe a URL em público além do seu site.
- Se vazar: **Implantar → Gerenciar implantações → Arquivar** e crie outra.

## Problemas comuns

| Sintoma | O que fazer |
|---------|-------------|
| Nada na planilha | Confirme “Qualquer pessoa” no acesso e a URL com `/exec` |
| Pediu autorização de novo | Reimplante após editar o script |
| Funciona no teste, não no site | URL errada no `config.js` ou site em cache — hard refresh |
| Linha com campos vazios | Versão antiga do `quiz.js` — use a do repositório atual |

## Precisa de webhook pago?
Não. Apps Script + Sheets é grátis dentro dos limites do Google (mais que suficiente para esse funil).

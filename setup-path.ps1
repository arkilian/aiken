# Script para adicionar Cargo bin ao PATH permanentemente
# Run this script as Administrator if you want to add to System PATH

param(
    [switch]$System,
    [switch]$User
)

$cargoPath = "$env:USERPROFILE\.cargo\bin"

Write-Host "=== Configuração do PATH para Aiken ===" -ForegroundColor Cyan
Write-Host ""

# Verificar se o Aiken está instalado
if (Test-Path "$cargoPath\aiken.exe") {
    Write-Host "✅ Aiken encontrado em: $cargoPath" -ForegroundColor Green
} else {
    Write-Host "❌ Aiken não encontrado em: $cargoPath" -ForegroundColor Red
    Write-Host "   Execute: cargo install aiken --locked" -ForegroundColor Yellow
    exit 1
}

# Verificar se já está no PATH
$currentPath = $env:Path
if ($currentPath -like "*$cargoPath*") {
    Write-Host "✅ Cargo bin já está no PATH da sessão atual" -ForegroundColor Green
} else {
    Write-Host "⚠️  Cargo bin NÃO está no PATH da sessão atual" -ForegroundColor Yellow
    Write-Host "   Adicionando temporariamente..." -ForegroundColor Yellow
    $env:Path += ";$cargoPath"
    Write-Host "✅ Adicionado ao PATH da sessão atual" -ForegroundColor Green
}

# Adicionar ao PATH permanentemente
if ($System) {
    Write-Host ""
    Write-Host "Adicionando ao PATH do Sistema (requer Administrator)..." -ForegroundColor Yellow
    try {
        $systemPath = [System.Environment]::GetEnvironmentVariable("Path", "Machine")
        if ($systemPath -notlike "*$cargoPath*") {
            [System.Environment]::SetEnvironmentVariable("Path", "$systemPath;$cargoPath", "Machine")
            Write-Host "✅ Adicionado ao PATH do Sistema" -ForegroundColor Green
        } else {
            Write-Host "✅ Já estava no PATH do Sistema" -ForegroundColor Green
        }
    } catch {
        Write-Host "❌ Erro: Execute este script como Administrator" -ForegroundColor Red
        exit 1
    }
} elseif ($User) {
    Write-Host ""
    Write-Host "Adicionando ao PATH do Usuário..." -ForegroundColor Yellow
    $userPath = [System.Environment]::GetEnvironmentVariable("Path", "User")
    if ($userPath -notlike "*$cargoPath*") {
        [System.Environment]::SetEnvironmentVariable("Path", "$userPath;$cargoPath", "User")
        Write-Host "✅ Adicionado ao PATH do Usuário" -ForegroundColor Green
    } else {
        Write-Host "✅ Já estava no PATH do Usuário" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "=== Testando Aiken ===" -ForegroundColor Cyan
Write-Host ""

# Testar o comando
try {
    $version = & aiken --version 2>&1
    Write-Host "✅ Aiken funciona!" -ForegroundColor Green
    Write-Host "   Versão: $version" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Aiken não funciona ainda" -ForegroundColor Red
    Write-Host "   Feche e abra um novo terminal" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "=== Próximos Passos ===" -ForegroundColor Cyan
Write-Host ""
Write-Host "1. Feche e abra um novo terminal (ou VS Code)" -ForegroundColor White
Write-Host "2. Execute: aiken --version" -ForegroundColor White
Write-Host "3. No VS Code: Ctrl + Shift + P -> 'Reload Window'" -ForegroundColor White
Write-Host ""

if (-not $System -and -not $User) {
    Write-Host "💡 Dica: Para adicionar permanentemente, execute:" -ForegroundColor Yellow
    Write-Host "   .\setup-path.ps1 -User     # Apenas para seu usuário" -ForegroundColor Cyan
    Write-Host "   .\setup-path.ps1 -System   # Para todos os usuários (Admin)" -ForegroundColor Cyan
    Write-Host ""
}

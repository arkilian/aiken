# Script para corrigir encoding corrupto nos arquivos .md
# Fix corrupted encoding in .md files

$replacements = @{
    # Caracteres básicos / Basic characters
    'é©' = 'é'
    'é§' = 'ç'
    'é£' = 'ã'
    'é³' = 'ó'
    'é¡' = 'á'
    'éµ' = 'õ'
    'é­' = 'í'
    'éº' = 'ú'
    'éª' = 'ê'
    'é€°' = 'É'

    # Combinações comuns / Common combinations
    'é§é£o' = 'ção'
    'é§éµes' = 'ções'
    'é£o' = 'ão'
    'Versé£o' = 'Versão'
    'Pré©' = 'Pré'
    'é©-requisitos' = 'é-requisitos'
    'có³digo' = 'código'
    'automó¡tica' = 'automática'
    'tóªm' = 'têm'
    'ó¡' = 'á'
    'ó­' = 'í'

    # Emojis e símbolos de árvore / Emojis and tree symbols
    'Ã¢Å"â€¦' = '✅'
    'Ã°Å¸â€Â§' = '🔧'
    'Ã°Å¸â€œÂ' = '📝'
    'Ã°Å¸Å½Â¨' = '🎨'
    'Ã°Å¸Å¡â‚¬' = '💡'
    'Ã°Å¸â€Â' = '🔍'
    'ÃƒÅ¡teis' = 'Úteis'
    'Ação' = 'Ação'
    'definição' = 'definição'
    'Configuração' = 'Configuração'
    'Jó¡' = 'Já'
    'Detecção' = 'Detecção'
    'Recomendação' = 'Recomendação'
    'extensó£o' = 'extensão'
    'indentação' = 'indentação'
    'Disponó­veis' = 'Disponíveis'
    'Formatação' = 'Formatação'
    'Documentação' = 'Documentação'
    'Verificar' = 'Verificar'

    # Símbolos de árvore ASCII / ASCII tree symbols
    'Ã¢â€Å"Ã¢â€â‚¬Ã¢â€â‚¬' = '├──'
    'Ã¢â€â€Ã¢â€â‚¬Ã¢â€â‚¬' = '│   ├──'
    'Ã¢â€â€š' = '│'
    'Ã¢â€â€' = '└──'
}

$files = Get-ChildItem -Path . -Filter *.md

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)" -ForegroundColor Cyan

    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8

    foreach ($key in $replacements.Keys) {
        $content = $content -replace [regex]::Escape($key), $replacements[$key]
    }

    # Write back as UTF-8 without BOM
    [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.UTF8Encoding]::new($false))

    Write-Host "  ✓ Fixed: $($file.Name)" -ForegroundColor Green
}

Write-Host "`n✅ All files processed!" -ForegroundColor Green

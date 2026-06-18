# apply-improvements.ps1
# 全記事HTMLに article.js scriptタグ + カテゴリmetaタグを追加するスクリプト

$docsDir = "C:\Users\sasa\Desktop\kanrikumiai-kyokasho\docs"
$files = Get-ChildItem $docsDir -Filter "*.html"

function Get-Category($filename) {
    $f = $filename.ToLower()
    if ($f -match "riji|richocho|shorui|hikitstsugi|yosan|kaikei-kensa|hoken|riji-report|peperuresu|jitai|gimu|riji-ninki|riji-erabi") { return "理事・基本" }
    if ($f -match "kanrisha|kanri-itaku|jishukanri|kanrinin|henkou-shippai") { return "管理会社" }
    if ($f -match "sokai|gijiroku|gian|giketsken|teisokusuu|kettei-toriken|ijo-sokai") { return "総会・議事録" }
    if ($f -match "kanrihi|tsumitate") { return "管理費・積立金" }
    if ($f -match "daikibo|choki|kyoyubuhin|gaiheki|kinkyushuzen|kyoyuro|shuzen-iinkai") { return "大規模修繕" }
    if ($f -match "trouble|kujou|taino-taiou|pet|chushajo|rousu|senyu|kaihen-hantai") { return "トラブル" }
    if ($f -match "kanrikiyaku|shiyosaisoku|kubunshoyuho|hojinka|kyoyu-meigi|tatekae|kaihen") { return "規約・法律" }
    return "理事・基本"
}

$updated = 0
foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $changed = $false

    if ($content -notmatch "article\.js") {
        $content = $content -replace "</body>", "<script src=`"../assets/article.js`"></script>`n</body>"
        $changed = $true
    }

    if ($content -notmatch "article-category") {
        $cat = Get-Category $file.Name
        $content = $content -replace "</head>", "<meta name=`"article-category`" content=`"$cat`">`n</head>"
        $changed = $true
    }

    if ($changed) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        $updated++
        Write-Host "更新: $($file.Name) -> カテゴリ: $(Get-Category $file.Name)"
    }
}

Write-Host "`n--- $updated 件更新完了 ---"

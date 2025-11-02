param(
  [switch]$Watch,
  [string]$OncePath,
  [switch]$SkipVercel
)

$ErrorActionPreference = "Stop"

# Configuration
$RepoRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$BlogDir = Join-Path $RepoRoot "blog"
$SitemapPath = Join-Path $RepoRoot "sitemap.xml"
$BaseUrl = "https://aigrantwriter.xyz"
$DownloadDir = Join-Path $env:USERPROFILE "Downloads"

function Write-Info($msg) {
  Write-Host ("[auto-deploy] " + $msg)
}

function Ensure-FileReady($path) {
  for ($i=0; $i -lt 10; $i++) {
    try {
      $fs = [System.IO.File]::Open($path, 'Open', 'Read', 'ReadWrite')
      $fs.Close()
      return
    } catch {
      Start-Sleep -Milliseconds 300
    }
  }
}

function Add-ToSitemap($fileName) {
  if (!(Test-Path $SitemapPath)) {
    $xmlContent = @"
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"></urlset>
"@
    Set-Content -Path $SitemapPath -Value $xmlContent -Encoding UTF8
  }
  [xml]$xml = Get-Content -Path $SitemapPath
  $locUrl = "$BaseUrl/blog/$fileName"
  $exists = $false
  foreach ($u in $xml.urlset.url) {
    if ($u.loc -eq $locUrl) { $exists = $true; break }
  }
  if (-not $exists) {
    $urlNode = $xml.CreateElement("url")
    $locNode = $xml.CreateElement("loc")
    $lastmodNode = $xml.CreateElement("lastmod")
    $locNode.InnerText = $locUrl
    $lastmodNode.InnerText = (Get-Date).ToString("yyyy-MM-dd")
    $urlNode.AppendChild($locNode) | Out-Null
    $urlNode.AppendChild($lastmodNode) | Out-Null
    $xml.urlset.AppendChild($urlNode) | Out-Null
    $xml.Save($SitemapPath)
    Write-Info "Sitemap updated with $locUrl"
  } else {
    Write-Info "Sitemap already contains $locUrl"
  }
}

function Deploy-Vercel() {
  Write-Info "Deploying to Vercel (prod)..."
  $vercelCmd = Join-Path $env:APPDATA "npm\vercel.cmd"
  if (!(Test-Path $vercelCmd)) { $vercelCmd = "vercel.cmd" }
  $proc = Start-Process -FilePath $vercelCmd -ArgumentList "deploy", "--prod" -WorkingDirectory $RepoRoot -NoNewWindow -PassThru -Wait
  if ($proc.ExitCode -ne 0) { throw "Vercel deploy failed with exit code $($proc.ExitCode)" }
  Write-Info "Deploy finished"
}

function Process-File($srcPath) {
  Ensure-FileReady $srcPath
  $fileName = [System.IO.Path]::GetFileName($srcPath)
  $destPath = Join-Path $BlogDir $fileName
  if ($srcPath -ne $destPath) {
    Copy-Item -Path $srcPath -Destination $destPath -Force
    Write-Info "Copied: $fileName -> blog/"
  } else {
    Write-Info "File already in blog/: $fileName"
  }
  Add-ToSitemap $fileName
  if (-not $SkipVercel) { Deploy-Vercel }
  $url = "$BaseUrl/blog/$fileName"
  try { Set-Clipboard -Value $url } catch { }
  try { Start-Process $url } catch { }
  Write-Info "Published: $url (copied to clipboard)"
}

if ($OncePath) {
  Process-File $OncePath
  exit 0
}

if ($Watch) {
  Write-Info "Watching: $DownloadDir for *.html exports"
  $watcher = New-Object System.IO.FileSystemWatcher $DownloadDir, "*.html"
  $watcher.IncludeSubdirectories = $false
  $watcher.EnableRaisingEvents = $true
  Register-ObjectEvent $watcher Created -SourceIdentifier "HtmlCreated" -Action {
    $path = $Event.SourceEventArgs.FullPath
    Start-Sleep -Milliseconds 500
    try { Process-File $path } catch { Write-Info "Error: $($_.Exception.Message)" }
  } | Out-Null
  Write-Info "Ready. Export a static article to trigger deployment."
  while ($true) { Start-Sleep -Seconds 2 }
} else {
  Write-Info "Usage: .\\auto-deploy.ps1 -Watch  OR  .\\auto-deploy.ps1 -OncePath <file>"
}
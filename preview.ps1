$ErrorActionPreference = "Stop"

function Test-PortAvailable {
  param([int]$Port)
  try {
    $listener = [System.Net.Sockets.TcpListener]::new([System.Net.IPAddress]::Parse("127.0.0.1"), $Port)
    $listener.Start()
    $listener.Stop()
    return $true
  }
  catch {
    return $false
  }
}

function Find-FreePort {
  param([int]$StartPort = 5173, [int]$EndPort = 5199)
  for ($port = $StartPort; $port -le $EndPort; $port++) {
    if (Test-PortAvailable -Port $port) {
      return $port
    }
  }
  throw "5173 到 5199 这些端口都被占用了。请先关闭其他本地预览窗口，然后再双击打开。"
}

Write-Host ""
Write-Host "Agent Skill 网页式 PPT 预览" -ForegroundColor Cyan
Write-Host "请不要关闭这个黑色命令窗口；它负责保持网页预览运行。" -ForegroundColor Yellow
Write-Host ""

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Host "没有检测到 Node.js。" -ForegroundColor Red
  Write-Host "请先安装 Node.js LTS 版本，然后再双击打开预览.cmd。"
  Read-Host "按回车关闭"
  exit 1
}

if (-not (Test-Path "node_modules")) {
  Write-Host "第一次运行需要安装依赖，请稍等..." -ForegroundColor Yellow
  npm install
}

$port = Find-FreePort
$url = "http://127.0.0.1:$port/"

if ($port -ne 5173) {
  Write-Host "默认端口 5173 被占用，已自动改用端口 $port。" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "浏览器将自动打开：" -ForegroundColor Green
Write-Host $url -ForegroundColor Cyan
Write-Host ""
Write-Host "如果浏览器没有自动打开，请手动复制上面的地址到浏览器。" -ForegroundColor Gray
Write-Host "要停止预览，请回到这个窗口按 Ctrl + C，然后再关闭窗口。" -ForegroundColor Yellow
Write-Host ""

Start-Process $url
npm run dev -- --host 127.0.0.1 --port $port

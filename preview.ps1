$ErrorActionPreference = 'Stop'

$projectDir = Split-Path -Parent $MyInvocation.MyCommand.Path
$nodeDir = 'D:\codex\app-local\runtimes\cua_node\789504f803e82e2b\bin'
$npm = Join-Path $nodeDir 'npm.cmd'
$ports = 5173..5183

Set-Location $projectDir
$env:PATH = "$nodeDir;$env:PATH"

function Test-PreviewReady {
    param([int]$Port)

    try {
        $response = Invoke-WebRequest -Uri "http://127.0.0.1:$Port" -UseBasicParsing -TimeoutSec 1
        return $response.StatusCode -ge 200 -and $response.StatusCode -lt 500
    } catch {
        return $false
    }
}

Write-Host '正在启动网页式 PPT 预览...' -ForegroundColor Cyan
Write-Host '这个黑色窗口是本地预览服务，请不要关闭。' -ForegroundColor Yellow
Write-Host '看完以后，关闭这个窗口即可停止预览。'
Write-Host ''

$selectedPort = $null
$alreadyRunning = $false

foreach ($port in $ports) {
    if (Test-PreviewReady -Port $port) {
        $selectedPort = $port
        $alreadyRunning = $true
        break
    }
}

if (-not $selectedPort) {
    foreach ($port in $ports) {
        $connection = Get-NetTCPConnection -LocalAddress 127.0.0.1 -LocalPort $port -ErrorAction SilentlyContinue
        if (-not $connection) {
            $selectedPort = $port
            break
        }
    }
}

if (-not $selectedPort) {
    Write-Host '5173 到 5183 这些预览端口都被占用了。' -ForegroundColor Red
    Write-Host '请关闭其他正在预览的网页项目，或者重启电脑后再双击打开。'
    Read-Host '按回车键退出'
    exit 1
}

$url = "http://127.0.0.1:$selectedPort"

if ($alreadyRunning) {
    Write-Host "检测到预览已经在运行，直接打开：$url" -ForegroundColor Green
} else {
    Write-Host "使用本地端口：$selectedPort"
    $process = Start-Process -FilePath $npm `
        -ArgumentList @('run', 'dev', '--', '--host', '127.0.0.1', '--port', "$selectedPort", '--strictPort') `
        -WorkingDirectory $projectDir `
        -NoNewWindow `
        -PassThru

    $ready = $false
    for ($i = 0; $i -lt 50; $i++) {
        Start-Sleep -Milliseconds 500
        if (Test-PreviewReady -Port $selectedPort) {
            $ready = $true
            break
        }
        if ($process.HasExited) {
            Write-Host '预览服务启动失败。请把这个窗口里的报错截图发给 Codex。' -ForegroundColor Red
            Read-Host '按回车键退出'
            exit 1
        }
    }

    if (-not $ready) {
        Write-Host '等待预览服务启动超时。请关闭这个窗口后重新双击 打开预览.cmd。' -ForegroundColor Red
        Read-Host '按回车键退出'
        exit 1
    }
}

Write-Host ''
Write-Host "浏览器即将打开：$url" -ForegroundColor Green
Start-Process $url
Write-Host ''
Write-Host '提示：'
Write-Host '1. 如果浏览器没有自动打开，请复制上面的地址到 Chrome 或 Edge。'
Write-Host '2. 预览期间不要关闭这个黑色窗口。'
Write-Host '3. 看完后关闭这个窗口即可停止预览。'
Write-Host ''
Wait-Event


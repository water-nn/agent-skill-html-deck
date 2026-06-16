@echo off
chcp 65001 >nul
title Agent Skill 网页式 PPT 预览
cd /d "%~dp0"

echo.
echo 正在启动网页式 PPT 预览...
echo.
echo 请不要关闭这个黑色窗口。
echo 关闭窗口后，浏览器里的预览页面也会打不开。
echo.

powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0preview.ps1"

echo.
echo 预览已经结束。按任意键关闭窗口。
pause >nul

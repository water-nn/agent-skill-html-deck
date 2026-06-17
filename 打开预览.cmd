@echo off
chcp 65001 >nul
title 网页式 PPT 预览
cd /d "%~dp0"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0preview.ps1"
pause


@echo off
chcp 65001 >nul
title Alrayhan Sales
cd /d "%~dp0"
where node >nul 2>nul
if errorlevel 1 (
  echo Node.js is not installed. Download it from https://nodejs.org then run this file again.
  echo يجب تثبيت برنامج Node.js من الموقع https://nodejs.org ثم تشغيل هذا الملف مرة أخرى
  pause
  exit /b
)
start "" http://localhost:3000
node server.js
pause

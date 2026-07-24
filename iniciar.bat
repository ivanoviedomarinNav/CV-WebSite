@echo off
title CV Website - Ivan Oviedo
echo.
echo ========================================
echo   CV Website - Servidor Local
echo ========================================
echo.
echo   Abre tu navegador en:
echo   http://localhost:8080
echo.
echo   Presiona Ctrl+C para detener.
echo.
start "" "http://localhost:8080"
python -m http.server 8080

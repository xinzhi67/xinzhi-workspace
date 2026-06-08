@echo off
chcp 65001 >nul
echo ================================
echo   Synapse Studio 启动中...
echo ================================
echo.

:: 后端
echo [1/2] 启动后端 (NestJS :5000) ...
start "synapse-studio-serve" cmd /c "cd /d "%~dp0synapse-studio-serve" && npm run start:dev"

:: 前端
echo [2/2] 启动前端 (Next.js :3000) ...
start "synapse-studio-frontend" cmd /c "cd /d "%~dp0synapse-studio-frontend" && npm run dev"

echo.
echo 后端: http://localhost:5000/api/v1
echo 前端: http://localhost:3000
echo.
echo 两个窗口已打开，关闭此窗口不影响运行。

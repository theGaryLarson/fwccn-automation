@echo off

cd "C:\Users\garyl\repos\AD340-mobile-dev\FWCCN\fwccn-automation" @REM change to the directory on FWCCN server
@REM call add git pull origin main @REM pulls any changes I make to the github repo
 call npm ci @REM clean install of dependencies
 call npm run build @REM fresh production build
 call npm run start @REM starts the production web app server
pause
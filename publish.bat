dotnet restore CardHero.sln

dotnet build CardHero.sln --configuration Release --no-restore

cd apps\CardHero.NetCoreApp.TypeScript

call yarn install

call npm run build:prod

cd ../..

rem del publish /S /Q

dotnet publish apps\CardHero.NetCoreApp.TypeScript --configuration Release --no-build --output publish

"C:\Program Files\7-Zip\7z.exe" a publish.zip .\publish\*

#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["apps/CardHero.NetCoreApp.TypeScript/CardHero.NetCoreApp.TypeScript.csproj", "apps/CardHero.NetCoreApp.TypeScript/"]
COPY ["src/CardHero.Core.Models/CardHero.Core.Models.csproj", "src/CardHero.Core.Models/"]
COPY ["src/CardHero.Core.Abstractions/CardHero.Core.Abstractions.csproj", "src/CardHero.Core.Abstractions/"]
COPY ["src/CardHero.Data.Abstractions/CardHero.Data.Abstractions.csproj", "src/CardHero.Data.Abstractions/"]
COPY ["src/CardHero.Core.SqlServer/CardHero.Core.SqlServer.csproj", "src/CardHero.Core.SqlServer/"]
COPY ["src/CardHero.AspNetCore.Authentication.FileSystem/CardHero.AspNetCore.Authentication.FileSystem.csproj", "src/CardHero.AspNetCore.Authentication.FileSystem/"]
COPY ["src/CardHero.Data.SqlServer.DependencyInjection/CardHero.Data.SqlServer.DependencyInjection.csproj", "src/CardHero.Data.SqlServer.DependencyInjection/"]
COPY ["src/CardHero.Data.SqlServer/CardHero.Data.SqlServer.csproj", "src/CardHero.Data.SqlServer/"]
RUN dotnet restore "apps/CardHero.NetCoreApp.TypeScript/CardHero.NetCoreApp.TypeScript.csproj"
COPY . .
WORKDIR "/src/apps/CardHero.NetCoreApp.TypeScript"
RUN dotnet build "CardHero.NetCoreApp.TypeScript.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CardHero.NetCoreApp.TypeScript.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CardHero.NetCoreApp.TypeScript.dll"]
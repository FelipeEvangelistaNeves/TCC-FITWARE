#!/usr/bin/env bash
set -e

echo "[INFO] Instalando dependências para o cliente PostgreSQL..."

# Instalar dependências para adicionar repositório PostgreSQL
sudo apt-get update
sudo apt-get install -y curl gnupg lsb-release

# Adiciona repositório oficial do PostgreSQL
curl -fsSL https://www.postgresql.org/media/keys/ACCC4CF8.asc | \
  sudo gpg --dearmor -o /etc/apt/trusted.gpg.d/postgres.gpg
echo "deb http://apt.postgresql.org/pub/repos/apt $(lsb_release -cs)-pgdg main" | \
  sudo tee /etc/apt/sources.list.d/pgdg.list

# Instalar cliente PostgreSQL 17
sudo apt-get update
if sudo apt-get install -y postgresql-client-17; then
  echo "[INFO] Cliente PostgreSQL 17 instalado com sucesso."
else
  echo "[WARN] Cliente PostgreSQL 17 não encontrado, instalando versão padrão..."
  sudo apt-get install -y postgresql-client
fi

# (Opcional) Exportar banco automaticamente
# echo "[INFO] Exportando banco app_db para /workspace/app_db_dump.sql..."
# pg_dump -U postgres -h db -p 5432 app_db > /workspace/app_db_dump.sql || \
#   echo "[WARN] Falha ao exportar banco app_db (verifique se o serviço está ativo)."
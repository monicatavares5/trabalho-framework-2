# 🚀 Quick Start com Docker

## ⚠️ IMPORTANTE: Antes de começar
1. Certifique-se que o **Docker Desktop está rodando**
2. Aguarde o ícone ficar verde na bandeja do sistema
3. Teste com: `docker ps`

## Iniciar tudo com um comando:

```bash
# Navegue para a pasta do projeto
cd \trabalho-framework-2

# Inicie os containers
docker-compose up -d
```

## Acessar:
- Frontend: http://localhost:8080
- Backend: http://localhost:3000
- Swagger: http://localhost:3000/api-docs

## Parar:
```bash
docker-compose down
```

## Ver logs:
```bash
docker-compose logs -f
```

## Reconstruir após mudanças:
```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Limpar tudo:
```bash
docker-compose down -v
docker system prune -a
```

Pronto! 🎉

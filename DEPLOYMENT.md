# Cloud Run Deployment Guide

## 📦 Deployment Options

### Option 1: Google Cloud Run (GCP)

#### Prerequisites
```bash
# Instalar Google Cloud SDK
# https://cloud.google.com/sdk/docs/install

# Iniciar sesión
gcloud auth login

# Configurar proyecto
gcloud config set project YOUR_PROJECT_ID
```

#### Deploy to Cloud Run
```bash
# Build y deploy en un solo comando
gcloud run deploy form-builder \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080

# O usando Cloud Build + Artifact Registry
# 1. Build imagen
gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/form-builder

# 2. Deploy
gcloud run deploy form-builder \
  --image gcr.io/YOUR_PROJECT_ID/form-builder \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --port 8080
```

---

### Option 2: Azure Container Apps

#### Prerequisites
```bash
# Instalar Azure CLI
# https://docs.microsoft.com/en-us/cli/azure/install-azure-cli

# Iniciar sesión
az login

# Crear resource group
az group create --name form-builder-rg --location eastus

# Crear Container Registry
az acr create --resource-group form-builder-rg \
  --name formbuilderacr --sku Basic
```

#### Deploy to Azure Container Apps
```bash
# 1. Login al registry
az acr login --name formbuilderacr

# 2. Build y push imagen
az acr build --registry formbuilderacr \
  --image form-builder:latest .

# 3. Crear Container App Environment
az containerapp env create \
  --name form-builder-env \
  --resource-group form-builder-rg \
  --location eastus

# 4. Deploy Container App
az containerapp create \
  --name form-builder-app \
  --resource-group form-builder-rg \
  --environment form-builder-env \
  --image formbuilderacr.azurecr.io/form-builder:latest \
  --target-port 8080 \
  --ingress external \
  --registry-server formbuilderacr.azurecr.io \
  --query properties.configuration.ingress.fqdn
```

---

### Option 3: Docker Local (Testing)

```bash
# Build imagen
docker build -t form-builder:latest .

# Run container
docker run -d -p 8080:8080 --name form-builder form-builder:latest

# Ver logs
docker logs -f form-builder

# Acceder a la app
# http://localhost:8080
```

---

### Option 4: Docker Compose (Development)

```bash
# Build y run
docker-compose up -d

# Ver logs
docker-compose logs -f

# Detener
docker-compose down

# Rebuild
docker-compose up -d --build
```

---

## 🔧 Environment Variables (Opcional)

Si necesitas variables de entorno, crea un archivo `.env`:

```env
VITE_API_URL=https://api.example.com
VITE_APP_TITLE=Form Builder
```

Y actualiza el Dockerfile:
```dockerfile
# En el stage builder, antes de RUN npm run build
COPY .env .env
```

---

## 🚀 CI/CD con GitHub Actions

### Google Cloud Run
Crea `.github/workflows/deploy-cloudrun.yml`:

```yaml
name: Deploy to Cloud Run

on:
  push:
    branches: [main, master]

env:
  PROJECT_ID: YOUR_PROJECT_ID
  SERVICE_NAME: form-builder
  REGION: us-central1

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Google Auth
        uses: google-github-actions/auth@v1
        with:
          credentials_json: ${{ secrets.GCP_SA_KEY }}
      
      - name: Deploy to Cloud Run
        run: |
          gcloud run deploy $SERVICE_NAME \
            --source . \
            --region $REGION \
            --platform managed \
            --allow-unauthenticated \
            --port 8080
```

### Azure Container Apps
Crea `.github/workflows/deploy-azure.yml`:

```yaml
name: Deploy to Azure Container Apps

on:
  push:
    branches: [main, master]

env:
  RESOURCE_GROUP: form-builder-rg
  CONTAINER_APP: form-builder-app
  ACR_NAME: formbuilderacr

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v3
      
      - name: Azure Login
        uses: azure/login@v1
        with:
          creds: ${{ secrets.AZURE_CREDENTIALS }}
      
      - name: Build and Push to ACR
        run: |
          az acr build --registry $ACR_NAME \
            --image form-builder:${{ github.sha }} \
            --image form-builder:latest .
      
      - name: Deploy to Container Apps
        run: |
          az containerapp update \
            --name $CONTAINER_APP \
            --resource-group $RESOURCE_GROUP \
            --image $ACR_NAME.azurecr.io/form-builder:${{ github.sha }}
```

---

## 📊 Monitoring

### Cloud Run
```bash
# Ver logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=form-builder" --limit 50

# Métricas
gcloud monitoring dashboards list
```

### Azure
```bash
# Ver logs
az containerapp logs show \
  --name form-builder-app \
  --resource-group form-builder-rg \
  --follow

# Métricas
az monitor metrics list \
  --resource /subscriptions/.../resourceGroups/form-builder-rg/providers/Microsoft.App/containerApps/form-builder-app
```

---

## 🔒 Security Best Practices

1. **No incluir secretos en la imagen**
2. **Usar HTTPS en producción** (Cloud Run lo provee automáticamente)
3. **Configurar CORS** si hay un backend
4. **Implementar rate limiting** en el nginx.conf si es necesario
5. **Usar secrets management** (Secret Manager en GCP, Key Vault en Azure)

---

## 🎯 Quick Start

**Opción más rápida (Cloud Run):**
```bash
gcloud run deploy form-builder --source . --region us-central1 --allow-unauthenticated
```

**Opción más rápida (Azure):**
```bash
az containerapp up --name form-builder-app --resource-group form-builder-rg --source .
```

¡Listo para producción! 🚀

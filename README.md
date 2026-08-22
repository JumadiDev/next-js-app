<p align="center">
  <img src="https://img.shields.io/badge/Next.js-15.3-black?style=for-the-badge&logo=next.js" alt="Next.js">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi" alt="FastAPI">
  <img src="https://img.shields.io/badge/PostgreSQL-16-336791?style=for-the-badge&logo=postgresql" alt="PostgreSQL">
  <img src="https://img.shields.io/badge/TimescaleDB-Latest-2ED573?style=for-the-badge" alt="TimescaleDB">
  <img src="https://img.shields.io/badge/Redis-7-DC382D?style=for-the-badge&logo=redis" alt="Redis">
  <img src="https://img.shields.io/badge/MQTT-Mosquitto-660066?style=for-the-badge&logo=mqtt" alt="MQTT">
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker" alt="Docker">
  <img src="https://img.shields.io/badge/Firebase-FCM-FFCA28?style=for-the-badge&logo=firebase" alt="Firebase">
</p>

<h1 align="center">SISMOVIGIA - SiMex</h1>

<p align="center">
  <strong>Panel de Monitoreo Sismologico en Tiempo Real</strong><br>
  <em>Estetica futurista tipo sala de control - Fuentes oficiales reales - IoT distribuido</em>
</p>

---

## Descripcion

**SISMOVIGIA** es un sistema de monitoreo sismico para Mexico que consume fuentes oficiales reales (SSN-UNAM y USGS), persiste en una base de datos de series de tiempo (PostgreSQL + TimescaleDB) y entrega eventos en tiempo real por WebSocket. Incluye una capa de sensores IoT distribuidos que transmiten telemetria por MQTT, con notificaciones push via Firebase Cloud Messaging.

### Caracteristicas Principales

- **Tiempo real** -- WebSocket con reconexion automatica y snapshot inicial
- **Fuentes oficiales** -- USGS (primaria), SSN-UNAM, SASMEX/CIRES
- **Deduplicacion inteligente** -- Mismo sismo de dos fuentes -> un solo evento canonico
- **IoT nativo** -- Sensores distribuidos via MQTT (Mosquitto)
- **Push notifications** -- Alertas sismicas via Firebase Cloud Messaging
- **UI futurista** -- Estetica sala de control, colores teal/ambar/rojo
- **Docker ready** -- Todo containerizado con Docker Compose

---

## Arquitectura

```
USGS (60s) --+   SSN (3-5 min) --+   SASMEX (5-10 min) --+   IoT/MQTT (100 SPS) --+
             +--> workers --> TimescaleDB --> FastAPI (REST + WS /ws/live) --> Next.js 15
             +----------------+        ^          |                              |
                                  Redis events:new +  +-- WebSocket (snapshot + eventos)
                                                    |
                                              Firebase FCM --> Push Notification
```

### Flujo de Datos

1. **Ingesta** -- Workers async en Python consultan fuentes oficiales cada 60s-600s
2. **Deduplicacion** -- Mismo sismo de dos fuentes -> un solo `canonical_event`
3. **Almacenamiento** -- TimescaleDB con hipertables y retencion automatica
4. **Publicacion** -- Redis canal `events:new` propaga eventos nuevos
5. **Entrega** -- WebSocket reenvia a todos los clientes conectados
6. **Push** -- Firebase Cloud Messaging notifica al movil para M>=4.5

### Aislamiento de Workers

Cada worker corre en su propio contenedor Docker. Si `worker-ssn` falla, `worker-usgs` continua funcionando. Todas las corridas se registran en `ingestion_runs`.

---

## Estructura

```
sisMex/
├── docker-compose.yml              # Orquestacion de servicios
├── .env                            # Variables de entorno
├── sql/
│   └── schema.sql                  # Esquema TimescaleDB completo
├── mosquitto/
│   └── config/
│       └── mosquitto.conf          # Configuracion broker MQTT
├── api/                            # FastAPI (REST + WebSocket)
│   ├── main.py                     # Entry point
│   ├── db.py                       # Pool de conexion asyncpg
│   ├── ws.py                       # WebSocket manager + Redis listener
│   ├── services/
│   │   └── notification.py         # Firebase Cloud Messaging
│   └── routers/
│       ├── events.py               # GET /api/events/*
│       ├── metrics.py              # GET /api/metrics/live
│       ├── news.py                 # GET /api/news
│       ├── iot.py                  # GET /api/stations, /api/telemetry/*
│       ├── notifications.py        # POST/DELETE/PUT /api/notifications/*
│       ├── health.py               # GET /api/health
│       └── ws.py                   # WS /ws/live
├── workers/
│   ├── common/                     # Librerias compartidas
│   │   ├── db.py                   # Pool + upsert + log_run
│   │   ├── dedup.py                # Deduplicacion + canonicalizacion
│   │   ├── pubsub.py               # Publisher Redis events:new
│   │   └── backoff.py              # Backoff exponencial
│   ├── usgs/                       # Worker USGS (FDSN API)
│   ├── ssn/                        # Worker SSN (scraping)
│   ├── sasmex/                     # Worker SASMEX (boletines)
│   └── iot/                        # Worker IoT (MQTT subscriber)
│       ├── worker.py               # Suscriptor MQTT
│       └── simulator.py            # Simulador de estaciones (demo)
└── frontend/                       # Next.js 15 + React 19 + Tailwind v4
    ├── app/
    │   ├── page.tsx                # Dashboard (/)
    │   ├── sismografo/page.tsx     # Sismografo (/sismografo)
    │   ├── mapa/page.tsx           # Mapa sismico (/mapa)
    │   ├── noticias/page.tsx       # Noticias (/noticias)
    │   ├── fuentes/page.tsx        # Fuentes oficiales (/fuentes)
    │   └── red-iot/page.tsx        # Red IoT (/red-iot)
    └── components/
        ├── notification-settings.tsx  # Configuracion push
        └── dashboard/
            ├── index.tsx              # Orquestador principal
            ├── status-bar.tsx         # Barra de estado
            ├── waveform.tsx           # Animacion ondas
            ├── metric-tiles.tsx       # KPIs
            └── event-table.tsx        # Tabla de eventos
```

---

## Quickstart

### Prerequisitos

- Docker y Docker Compose v2+
- Node.js 18+ (para frontend)
- Git

### 1. Clonar y configurar

```bash
git clone https://github.com/TU_USUARIO/sisMex.git
cd sisMex
cp .env.example .env
# Editar .env con tu DB_PASSWORD preferido
```

### 2. Levantar infraestructura

```bash
docker compose up -d --build
```

Esto levanta:
- **db** -- TimescaleDB (PostgreSQL 16 + extensiones)
- **redis** -- Bus de eventos pub/sub
- **mosquitto** -- Broker MQTT
- **api** -- FastAPI REST + WebSocket
- **worker-usgs** -- Ingesta USGS cada 60s
- **worker-ssn** -- Scraping SSN-UNAM cada 300s
- **worker-sasmex** -- Boletines SASMEX cada 600s
- **worker-iot** -- Suscriptor MQTT IoT

### 3. Verificar que funciona

```bash
curl http://localhost:8001/api/health
curl "http://localhost:8001/api/events/recent?hours=24"
curl http://localhost:8001/api/metrics/live
curl http://localhost:8001/api/news
open http://localhost:8001/docs
```

### 4. Ingesta inicial (opcional)

```bash
docker compose run --rm worker-usgs python -u worker.py --once --hours 24
docker compose run --rm worker-ssn python -u worker.py --once
docker compose run --rm worker-sasmex python -u worker.py --once
```

### 5. Frontend (Next.js)

```bash
cd frontend
npm install
npm run dev
# Abrir http://localhost:3000
```

### 6. Simulador IoT (demo)

```bash
docker compose --profile sim up -d iot-simulator
curl http://localhost:8001/api/stations
```



---

## Endpoints REST

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| GET | /api/health | Estado de cada worker |
| GET | /api/events/recent?hours=24&limit=100 | Eventos recientes |
| GET | /api/events/{id} | Detalle + fuentes enlazadas |
| GET | /api/metrics/live | Metricas 24h + IoT + agregado 5min |
| GET | /api/news?limit=20 | Boletines de noticias |
| GET | /api/stations | Estaciones IoT |
| GET | /api/telemetry/recent?station=SX-002&limit=300 | Lecturas aceleracion |

### Notificaciones Push

| Metodo | Ruta | Descripcion |
|--------|------|-------------|
| POST | /api/notifications/subscribe | Registrar token FCM |
| DELETE | /api/notifications/unsubscribe | Eliminar token FCM |
| PUT | /api/notifications/levels | Actualizar niveles de alerta |
| GET | /api/notifications/status?fcm_token=... | Estado de suscripcion |

### WebSocket

| Ruta | Descripcion |
|------|-------------|
| WS /ws/live | Snapshot inicial + eventos en tiempo real |
---

## Vistas del Panel

| Ruta | Vista | Descripcion |
|------|-------|-------------|
| / | **Dashboard** | Metricas, eventos, ondas, boletines, IoT, notificaciones |
| /sismografo | **Sismografo** | Telemetria en vivo por estacion (ondas XYZ en SVG) |
| /mapa | **Mapa** | Proyeccion abstracta de Mexico con eventos 7 dias |
| /noticias | **Noticias** | Boletines con filtros (SASMEX, SSN, CENAPRED, LAB) |
| /fuentes | **Fuentes** | Estado de workers de ingesta |
| /red-iot | **Red IoT** | Tabla de estaciones con estado y ultima senal |

---

## Niveles de Alerta

| Nivel | Magnitud | Color | Descripcion |
|-------|----------|-------|-------------|
| normal | M < 4.5 | Teal | Sismos menores, sin riesgo |
| precaucion | M 4.5-5.9 | Amber | Sismos significativos |
| alerta | M >= 6.0 | Rojo | Sismos peligrosos |

---

## IoT / MQTT

### Topics

| Topic | Datos | Frecuencia |
|-------|-------|------------|
| sismex/id/telemetry | accel_x, accel_y, accel_z, temperature, rssi, battery_v | 100 SPS |
| sismex/id/status | status, firmware, battery_v | On change |
| sismex/id/alarm | message, level, magnitude | On event |

### Estaciones Demo

| ID | Nombre | Ubicacion | Estado |
|----|--------|-----------|--------|
| SX-001 | JUBA | Juchitan, OAX | online |
| SX-002 | CACX | CDMX Roma | online |
| SX-003 | CIGE | Coyuca, GRO | online |
| SX-004 | OXXM | Oaxaca centro | online |
| SX-005 | TPNX | Tepic, NAY | online |
| SX-006 | MXRL | Merida, YUC | degraded |

---

## Base de Datos

| Tabla | Tipo | Descripcion |
|-------|------|-------------|
| raw_events | Hypertable | Lecturas crudas de cada fuente |
| canonical_events | Hypertable | Eventos deduplicados |
| event_sources | Regular | Relacion N:1 raw -> canonical |
| news_items | Regular | Boletines de noticias |
| ingestion_runs | Regular | Observabilidad de workers |
| stations | Regular | Estaciones IoT |
| telemetry | Hypertable | Telemetria alta frecuencia (7 dias) |
| push_subscriptions | Regular | Suscripciones push FCM |

---

## Variables de Entorno

### Root .env

```
DB_PASSWORD=tu_password_aqui
POSTGRES_DB=sismovigia
POSTGRES_USER=sismovigia
DATABASE_URL=postgresql://sismovigia:tu_password@localhost:5432/sismovigia
REDIS_URL=redis://localhost:6379/0
```

### Frontend .env.local

```
NEXT_PUBLIC_API_URL=http://localhost:8001
```



---

## Notas Eticas

- SSN es una pagina publica de consulta: el worker pide con intervalos razonables (3-5 min) y User-Agent identificado.
- Este panel **no es ni sustituye** el Sistema de Alerta Sismica Mexicano (SASMEX).

---

## Licencia

MIT

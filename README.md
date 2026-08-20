# SISMOVIGÍA · SiMex — Panel de Monitoreo Sismológico

Sistema de monitoreo sísmico para México con estética futurista tipo sala de control.
Consume fuentes oficiales reales (SSN-UNAM y USGS), persiste en una base de datos de
series de tiempo (PostgreSQL + TimescaleDB) y entrega eventos en tiempo real por WebSocket.
Incluye una capa de sensores IoT distribuidos que transmiten telemetría por MQTT.

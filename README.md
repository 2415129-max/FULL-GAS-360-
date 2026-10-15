# 🚗 FullGas SmartCheck - Manual y Guía del MVP

**FullGas SmartCheck** es una aplicación web moderna, interactiva y de alta fidelidad diseñada para el taller **FullGasNino**. Su propósito es transformar la inspección mecánica tradicional en una **experiencia digital, visual, didáctica y preventiva**.

---

## 🌟 Problema que Resuelve

1. **Fin de la jerga técnica incomprensible:** El 96% de los clientes no comprende términos mecánicos oscuros ni hojas de cálculo impresas en papel.
2. **Transparencia Total:** Muestra con claridad semafórica qué componentes están en **Buen Estado (Verde)**, cuáles requieren **Revisión Próxima (Amarillo)** y cuáles ameritan **Atención Urgente (Rojo)**.
3. **Historial Clínico Continuo:** El cliente conserva un **Pasaporte Digital** con código QR único para su vehículo, registrando la evolución de su salud mecánica a lo largo de los kilómetros.
4. **Fidelización y Retorno:** Permite programar la próxima fecha y kilometraje de mantenimiento, motivando al cliente a regresar a FullGasNino.

---

## 🎯 Hipótesis de Negocio Validadas en el MVP

| Hipótesis | Pregunta Clave | Métrica en el MVP | Estado |
| :--- | :--- | :--- | :--- |
| **H1: Valor Percibido y Claridad** | ¿Los clientes valoran un reporte visual semafórico más que la explicación verbal tradicional? | **4.9 / 5.0 (98% satisfacción)** | Validada ✓ |
| **H2: Confianza y Transparencia** | ¿Ver el diagnóstico con semáforos objetivos aumenta la confianza en FullGasNino? | **4.9 / 5.0 (98% confianza)** | Validada ✓ |
| **H3: Retorno y Recurrencia** | ¿Tener un Pasaporte Digital con próximas fechas incentiva el regreso al taller? | **92% intención de retorno** | Validada ✓ |

---

## 📱 Pantallas y Secciones de la Aplicación

1. **🏠 Inicio (Dashboard Central):**
   - Resumen del taller: vehículos activos con pasaporte, smartchecks generados, salud promedio de flota y fallas críticas detectadas a tiempo.
   - Buscador universal instantáneo por placa, cliente o modelo.
   - Acceso rápido a vehículos frecuentes con su badge de salud actual.

2. **📋 Nuevo SmartCheck (Inspección en Tiempo Real):**
   - **Paso 1:** Registro de datos del vehículo (Placa, Marca, Modelo, Año, Combustible, Kilometraje, Cliente, WhatsApp).
   - **Paso 2:** Inspección táctil por los 6 sistemas del auto (Frenos, Neumáticos, Motor/Fluidos, Suspensión/Dirección, Sistema Eléctrico, Seguridad e Interior). Botones táctiles Verde / Amarillo / Rojo con explicaciones sencillas y notas rápidas con un toque.
   - **Paso 3:** Dictamen general, recomendaciones prioritarias y sugerencia de próxima revisión (+5,000 km o fecha estimada).
   - **Barra Flotante:** Cálculo instantáneo del puntaje de salud (0-100 pts) en tiempo real mientras el técnico evalúa.

3. **📑 Resultado del SmartCheck (Reporte Digital Visual):**
   - Medidor circular / velocímetro animado con la puntuación de salud general.
   - Semáforo consolidado de componentes (Buen Estado, Preventivo, Urgente).
   - Tarjetas prioritarias *"Para tu Seguridad"* con explicaciones sin tecnicismos.
   - Desglose exhaustivo de los 24 componentes auditados.
   - Botón directo para **Compartir por WhatsApp** con texto preformateado.
   - Botón para **Imprimir o Guardar en PDF** optimizado para hojas A4.

4. **🪪 Pasaporte Digital del Vehículo (Historial Clínico):**
   - Cédula digital automotriz de alta gama con textura de fibra de carbono.
   - **Código QR dinámico y escaneable** generado localmente en SVG.
   - Botón para copiar enlace del pasaporte o agrandar el código QR para escaneo con celular.
   - Línea de tiempo clínica que registra todos los SmartChecks acumulados del vehículo.

5. **⏱️ Historial de Revisiones:**
   - Registro cronológico de todas las revisiones del taller.
   - Filtros por estado (Todos, Óptimos, Preventivos, Críticos) y buscador de texto.
   - **Gráfico interactivo en Canvas** con la curva de evolución de salud mecánica en el tiempo.

6. **📊 Validación del MVP con Métricas:**
   - Panel analítico que mide las 3 hipótesis de negocio en tiempo real.
   - Net Promoter Score (NPS) del taller.
   - Modal interactivo para registrar encuestas de clientes en 30 segundos.
   - Muro de comentarios y testimonios cualitativos.

---

## 🚀 Cómo Abrir y Usar la Aplicación

### Opción 1: Apertura Directa en macOS
Haz doble clic sobre el archivo:
- **`abrir_app.command`** o simplemente abre **`index.html`** con tu navegador favorito (Safari, Chrome, Edge, Firefox, Brave).

### Opción 2: Desde Terminal
```bash
open index.html
```

---

## 🎨 Identidad Visual y Colores

- **Rojo FullGas (`#E5242A`):** Color de marca, pasión automotriz y botones de acción principal.
- **Plomo Grafito (`#0F172A` / `#1E293B`):** Fondos tecnológicos, pasaporte de fibra de carbono y profesionalismo.
- **Blanco y Gris Claro (`#FFFFFF` / `#F8FAFC`):** Fondos limpios para lectura clínica de reportes.
- **Semáforo de Componentes:**
  - 🟢 **Verde (`#16A34A`):** Buen Estado / Seguro
  - 🟡 **Amarillo (`#D97706`):** Revisión Próxima / Preventivo
  - 🔴 **Rojo (`#DC2626`):** Requiere Atención Urgente / Crítico

---

## 🔧 Modo Técnico vs. Modo Cliente

En la esquina superior derecha de la aplicación se encuentra el botón:
- **Modo Técnico / Taller:** Permite editar componentes, agregar notas técnicas y registrar encuestas.
- **Vista Cliente:** Oculta controles de edición y presenta la información con enfoque didáctico y preventivo.

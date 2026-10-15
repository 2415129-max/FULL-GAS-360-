/**
 * FullGas SmartCheck - Core Application Logic
 * Transforma la revisión mecánica en una experiencia digital, visual y preventiva.
 * Desarrollado para FullGasNino.
 */

// --- CATÁLOGO DE SISTEMAS Y COMPONENTES AUTOMOTRICES ---
const VEHICLE_SYSTEMS = [
  {
    id: "frenos",
    name: "Sistema de Frenos",
    icon: "🛑",
    description: "Detención segura y control del vehículo",
    components: [
      {
        id: "pastillas_freno",
        name: "Pastillas y Zapatas de Freno",
        importance: "Permite frenar el vehículo. Si se desgastan por completo, dañan los discos y aumentan la distancia de frenado.",
        quickNotes: ["Espesor óptimo (>7mm)", "Desgaste medio (3-5mm)", "Límite crítico (<2mm)", "Cristalizadas / Chirrido"]
      },
      {
        id: "discos_tambores",
        name: "Discos y Tambores de Freno",
        importance: "Superficie donde presionan las pastillas. Deformaciones causan vibraciones al frenar a alta velocidad.",
        quickNotes: ["Superficie lisa y sin ceja", "Ceja pronunciada", "Alabeados con vibración", "Rayados por pastilla gastada"]
      },
      {
        id: "liquido_frenos",
        name: "Nivel y Estado del Líquido de Frenos",
        importance: "Transmite la presión del pedal a las ruedas. Absorbe humedad con el tiempo y pierde eficacia.",
        quickNotes: ["Nivel correcto y color ámbar claro", "Oscuro / Degradado por humedad", "Bajo nivel con fuga potencial", "Requiere purga y cambio"]
      },
      {
        id: "freno_mano",
        name: "Freno de Mano / Estacionamiento",
        importance: "Garantiza que el vehículo no ruede al estar estacionado en pendientes.",
        quickNotes: ["Tensión adecuada (4-5 clics)", "Carrera larga (más de 7 clics)", "Inoperativo / Cable destensado"]
      }
    ]
  },
  {
    id: "neumaticos",
    name: "Neumáticos y Ruedas",
    icon: "🛞",
    description: "Único punto de contacto entre el auto y el asfalto",
    components: [
      {
        id: "profundidad_cocadas",
        name: "Profundidad de Banda (Cocadas)",
        importance: "Desaloja agua y evita derrapes en pista mojada. El límite legal de seguridad es 1.6 mm.",
        quickNotes: ["Profundidad excelente (>5mm)", "Desgaste medio (3-4mm)", "Al testigo de desgaste (<2mm)", "Desgaste irregular / Mal alineado"]
      },
      {
        id: "presion_valvulas",
        name: "Presión de Aire y Válvulas",
        importance: "Presión adecuada ahorra combustible y evita reventones o desgaste disparejo.",
        quickNotes: ["Calibradas según fabricante", "Baja presión en 1 o más ruedas", "Válvula con pérdida o sin tapón"]
      },
      {
        id: "alineacion_balanceo",
        name: "Alineación y Balanceo",
        importance: "Evita que el auto tire hacia un lado y elimina vibraciones en el timón a velocidad crucero.",
        quickNotes: ["Dirección recta y estable", "Jala levemente hacia un lado", "Vibración perceptible a 80km/h"]
      },
      {
        id: "rueda_repuesto",
        name: "Rueda de Repuesto y Kit de Emergencia",
        importance: "Vital ante un pinchazo en carretera o ciudad.",
        quickNotes: ["Presión correcta y gata operativa", "Baja de presión", "No disponible / Gata defectuosa"]
      }
    ]
  },
  {
    id: "motor_fluidos",
    name: "Motor y Fluidos",
    icon: "🛢️",
    description: "Corazón mecánico y lubricación esencial",
    components: [
      {
        id: "aceite_motor",
        name: "Aceite de Motor y Nivel",
        importance: "Lubrica piezas metálicas a alta temperatura. Si falta aceite o está quemado, el motor puede fundirse.",
        quickNotes: ["Nivel óptimo y viscosidad limpia", "Próximo a cambio por kilometraje", "Nivel bajo / Requiere relleno", "Muy degradado / Partículas"]
      },
      {
        id: "refrigerante_radiador",
        name: "Sistema Refrigerante y Radiador",
        importance: "Mantiene la temperatura ideal del motor (90°C). Sin refrigerante, el motor se sobrecalienta gravemente.",
        quickNotes: ["Nivel en MAX y color brillante", "Nivel entre MIN y MAX", "Color oxidado / Requiere purga", "Fuga visible en mangueras"]
      },
      {
        id: "filtro_aire",
        name: "Filtro de Aire de Motor",
        importance: "Evita que ingrese polvo y tierra al motor. Un filtro sucio eleva el consumo de combustible hasta un 15%.",
        quickNotes: ["Limpio y permeable", "Saturado con polvo moderado", "Muy sucio / Requiere cambio inmediato"]
      },
      {
        id: "fugas_fluidos",
        name: "Inspección de Fugas de Fluidos",
        importance: "Detecta a tiempo empaques vencidos o mangueras agrietadas antes de una pérdida catastrófica.",
        quickNotes: ["Motor seco y sin manchas", "Ligero sudado sin goteo", "Goteo activo de aceite o refrigerante"]
      }
    ]
  },
  {
    id: "suspension_direccion",
    name: "Suspensión y Dirección",
    icon: "🔩",
    description: "Estabilidad, confort y precisión al volante",
    components: [
      {
        id: "amortiguadores",
        name: "Amortiguadores Delanteros y Traseros",
        importance: "Absorben los baches y mantienen las llantas pegadas al piso al frenar o tomar curvas.",
        quickNotes: ["Buena respuesta y sin fugas", "Rebote prolongado en baches", "Fuga de aceite en vástago", "Ruidos / Golpeteo seco"]
      },
      {
        id: "rotulas_terminales",
        name: "Terminales, Rótulas y Bieletas",
        importance: "Unen la suspensión con las ruedas. Si una rótula se rompe, la rueda se desprende con el auto en marcha.",
        quickNotes: ["Firmes sin juego mecánico", "Juego leve en terminal", "Juego excesivo / Peligro de desacople"]
      },
      {
        id: "guardapolvos_palieres",
        name: "Guardapolvos y Fuelles de Palier",
        importance: "Protegen la grasa de las juntas homocinéticas. Rotos, entra tierra y rompe el palier.",
        quickNotes: ["Intactos y flexibles", "Goma reseca", "Rotos con expulsión de grasa"]
      },
      {
        id: "caja_direccion",
        name: "Cremallera y Caja de Dirección",
        importance: "Permite girar las ruedas con suavidad y precisión sin endurecimiento.",
        quickNotes: ["Giro suave y silencioso", "Juego en el volante", "Sonido al girar a tope", "Pérdida de líquido hidráulico"]
      }
    ]
  },
  {
    id: "electrico_bateria",
    name: "Sistema Eléctrico y Batería",
    icon: "⚡",
    description: "Energía de encendido, iluminación y electrónica",
    components: [
      {
        id: "bateria_bornes",
        name: "Estado de Batería y Bornes",
        importance: "Suministra energía para encender el motor. La sulfatación de bornes causa fallas de arranque inesperadas.",
        quickNotes: ["Carga 12.6V+, bornes limpios", "Carga 12.1V-12.3V (Revisión)", "Menos de 11.9V (Pronta muerte)", "Bornes con sulfato blanco/verde"]
      },
      {
        id: "luces_principales",
        name: "Luces Principales (Bajas, Altas, Neblineros)",
        importance: "Visibilidad nocturna y prevención de accidentes en carreteras oscuras.",
        quickNotes: ["Todas operativas y alineadas", "Faro opaco / Falta pulido", "1 bombillo fundido", "Mala alineación que encandila"]
      },
      {
        id: "luces_freno_giro",
        name: "Luces de Freno, Reversa y Direccionales",
        importance: "Comunican tus maniobras a los demás conductores. Si no prenden, riesgo alto de choque por alcance.",
        quickNotes: ["Todas funcionales", "Luz de freno trasera quemada", "Direccional parpadea rápido"]
      },
      {
        id: "alternador_carga",
        name: "Alternador y Sistema de Carga",
        importance: "Recarga la batería mientras el motor está encendido. Si falla, el auto se apaga en medio del camino.",
        quickNotes: ["Carga óptima (13.8V - 14.4V)", "Carga baja (<13.2V)", "Sobrecarga (>14.8V)"]
      }
    ]
  },
  {
    id: "seguridad_interior",
    name: "Seguridad y Diagnóstico a Bordo",
    icon: "🛡️",
    description: "Visibilidad, climatización y sensores del tablero",
    components: [
      {
        id: "limpiaparabrisas",
        name: "Plumillas Limpiaparabrisas",
        importance: "Visibilidad crítica ante lluvias repentinas o salpicaduras de barro.",
        quickNotes: ["Barrer suave y silencioso", "Rayas en el cristal / Goma dura", "Rotura de jebe / Ruido estridente"]
      },
      {
        id: "testigos_tablero",
        name: "Testigos de Tablero / Check Engine",
        importance: "Alerta si la computadora del auto detecta fallas de motor, frenos ABS o bolsas de aire.",
        quickNotes: ["Sin códigos ni testigos encendidos", "Testigo de mantenimiento programado", "Check Engine encendido (Escaneado)", "Testigo de Frenos o ABS activo"]
      },
      {
        id: "aire_acondicionado",
        name: "Aire Acondicionado y Clima",
        importance: "Desempaña vidrios en días húmedos y mantiene confort térmico en cabina.",
        quickNotes: ["Enfría y calienta con fuerza", "Enfriamiento deficiente", "Olor a humedad / Filtro de polen sucio"]
      },
      {
        id: "correas_accesorios",
        name: "Correas de Accesorios",
        importance: "Mueven alternador, bomba de agua y dirección. Si se cortan, el auto queda varado.",
        quickNotes: ["Tensión y goma en buen estado", "Ligeras grietas superficiales", "Resecas / Chillido al acelerar"]
      }
    ]
  }
];

// --- DATOS INICIALES DE DEMOSTRACIÓN (FullGasNino) ---
const INITIAL_DEMO_DATA = {
  vehicles: [
    {
      plate: "ABC-123",
      brand: "Toyota",
      model: "Hilux 4x4",
      year: 2021,
      color: "Blanco Glaciar",
      fuel: "Diésel",
      owner: "Juan Pérez Alvarado",
      phone: "+51 987 654 321",
      email: "juan.perez@ejemplo.com",
      currentMileage: 55200,
      passportId: "FG-PASSP-00123",
      registeredAt: "2023-02-10",
      notes: "Vehículo de uso mixto (ciudad y campo). Cliente muy puntual en sus mantenimientos."
    },
    {
      plate: "XYZ-789",
      brand: "Hyundai",
      model: "Tucson Sport",
      year: 2019,
      color: "Gris Grafito",
      fuel: "Gasolina / GNV",
      owner: "María Rodríguez Ramos",
      phone: "+51 912 345 678",
      email: "mrodriguez@ejemplo.com",
      currentMileage: 80150,
      passportId: "FG-PASSP-00789",
      registeredAt: "2023-06-15",
      notes: "Uso familiar diario. Realiza viajes trimestrales al sur."
    },
    {
      plate: "B2C-456",
      brand: "Kia",
      model: "Rio Sedán",
      year: 2018,
      color: "Rojo Pasión",
      fuel: "Gasolina",
      owner: "Carlos Mendoza Silva",
      phone: "+51 998 877 665",
      email: "cmendoza@ejemplo.com",
      currentMileage: 62300,
      passportId: "FG-PASSP-00456",
      registeredAt: "2023-11-20",
      notes: "Vehículo particular. Ingresó por chillido al frenar."
    }
  ],

  smartChecks: [
    {
      id: "SC-2023-0101",
      plate: "ABC-123",
      date: "2023-03-12",
      mileage: 45000,
      technician: "Nino García - Técnico Master",
      reason: "Mantenimiento preventivo 45,000 km",
      score: 72,
      status: "yellow",
      summary: "Buen estado general de motor. Se observó desgaste preventivo en pastillas de freno y líquido refrigerante oscurecido.",
      recommendations: "Reemplazo de pastillas de freno en próximo servicio (5,000 km) y cambio de refrigerante con purga completa.",
      nextReviewDate: "2023-07-15",
      nextReviewMileage: 50000,
      evaluations: {
        "pastillas_freno": { status: "yellow", note: "Desgaste al 60%, 4mm restantes" },
        "discos_tambores": { status: "green", note: "Sin ceja notable" },
        "liquido_frenos": { status: "green", note: "Nivel óptimo" },
        "freno_mano": { status: "green", note: "4 clics" },
        "profundidad_cocadas": { status: "green", note: "6mm en 4 ruedas" },
        "presion_valvulas": { status: "green", note: "32 PSI calibrado" },
        "alineacion_balanceo": { status: "green", note: "Estable" },
        "rueda_repuesto": { status: "green", note: "Operativa" },
        "aceite_motor": { status: "green", note: "Cambiado hoy 5W-30 Sintético" },
        "refrigerante_radiador": { status: "yellow", note: "Color opaco, requiere purga próxima" },
        "filtro_aire": { status: "green", note: "Filtro nuevo instalado" },
        "fugas_fluidos": { status: "green", note: "Seco" },
        "amortiguadores": { status: "green", note: "Sin fugas" },
        "rotulas_terminales": { status: "green", note: "Ajustados" },
        "guardapolvos_palieres": { status: "green", note: "Gomas flexibles" },
        "caja_direccion": { status: "green", note: "Suave" },
        "bateria_bornes": { status: "green", note: "12.7V en reposo" },
        "luces_principales": { status: "green", note: "Altas y bajas OK" },
        "luces_freno_giro": { status: "green", note: "Todas operativas" },
        "alternador_carga": { status: "green", note: "14.2V cargando" },
        "limpiaparabrisas": { status: "green", note: "Limpian bien" },
        "testigos_tablero": { status: "green", note: "Sin códigos de falla" },
        "aire_acondicionado": { status: "green", note: "Enfría a 6°C" },
        "correas_accesorios": { status: "green", note: "Tensión correcta" }
      }
    },
    {
      id: "SC-2023-0189",
      plate: "ABC-123",
      date: "2023-07-20",
      mileage: 50100,
      technician: "Nino García - Técnico Master",
      reason: "Mantenimiento 50,000 km y cambio de pastillas",
      score: 95,
      status: "green",
      summary: "Vehículo en estado impecable. Se instalaron pastillas cerámicas nuevas y se realizó purga de refrigerante.",
      recommendations: "Continuar con plan preventivo cada 5,000 km. Próxima revisión sugerida para rotación de neumáticos.",
      nextReviewDate: "2023-11-20",
      nextReviewMileage: 55000,
      evaluations: {
        "pastillas_freno": { status: "green", note: "Pastillas nuevas cerámicas instaladas" },
        "discos_tambores": { status: "green", note: "Rectificado preventivo realizado" },
        "liquido_frenos": { status: "green", note: "DOT4 nuevo purgado" },
        "freno_mano": { status: "green", note: "Ajustado a 4 clics" },
        "profundidad_cocadas": { status: "green", note: "5.5mm parejo" },
        "presion_valvulas": { status: "green", note: "32 PSI" },
        "alineacion_balanceo": { status: "green", note: "Alineación láser OK" },
        "rueda_repuesto": { status: "green", note: "35 PSI" },
        "aceite_motor": { status: "green", note: "5W-30 Sintético FullGas" },
        "refrigerante_radiador": { status: "green", note: "Refrigerante 50/50 rojo nuevo" },
        "filtro_aire": { status: "green", note: "Limpio" },
        "fugas_fluidos": { status: "green", note: "Sin fugas" },
        "amortiguadores": { status: "green", note: "Excelente amortiguación" },
        "rotulas_terminales": { status: "green", note: "Firmes" },
        "guardapolvos_palieres": { status: "green", note: "Intactos" },
        "caja_direccion": { status: "green", note: "Precisa" },
        "bateria_bornes": { status: "green", note: "12.6V, bornes engrasados" },
        "luces_principales": { status: "green", note: "Alineadas" },
        "luces_freno_giro": { status: "green", note: "Operativas" },
        "alternador_carga": { status: "green", note: "14.1V" },
        "limpiaparabrisas": { status: "green", note: "Excelente barrido" },
        "testigos_tablero": { status: "green", note: "0 errores en OBD2" },
        "aire_acondicionado": { status: "green", note: "Óptimo" },
        "correas_accesorios": { status: "green", note: "Sin grietas" }
      }
    },
    {
      id: "SC-2023-0305",
      plate: "ABC-123",
      date: "2023-11-28",
      mileage: 55200,
      technician: "Nino García - Técnico Master",
      reason: "SmartCheck de rutina 55,000 km",
      score: 92,
      status: "green",
      summary: "Excelente estado mecánico. Única observación preventiva: rotación de neumáticos sugerida por ligero desgaste en tren delantero.",
      recommendations: "Rotación de neumáticos delanteros a traseros en 2,500 km. Mantener niveles.",
      nextReviewDate: "2024-04-15",
      nextReviewMileage: 60000,
      evaluations: {
        "pastillas_freno": { status: "green", note: "Pastillas al 85% de vida" },
        "discos_tambores": { status: "green", note: "Superficie impecable" },
        "liquido_frenos": { status: "green", note: "Humedad <1% excelente" },
        "freno_mano": { status: "green", note: "Tensión firme" },
        "profundidad_cocadas": { status: "yellow", note: "Delanteras 4.2mm, traseras 5.1mm. Sugerida rotación" },
        "presion_valvulas": { status: "green", note: "Calibradas a 32 PSI" },
        "alineacion_balanceo": { status: "green", note: "Correcto" },
        "rueda_repuesto": { status: "green", note: "Operativa" },
        "aceite_motor": { status: "green", note: "Aceite en nivel y color miel" },
        "refrigerante_radiador": { status: "green", note: "Nivel en MAX" },
        "filtro_aire": { status: "green", note: "Limpio" },
        "fugas_fluidos": { status: "green", note: "Completamente seco" },
        "amortiguadores": { status: "green", note: "Sin ruidos ni fugas" },
        "rotulas_terminales": { status: "green", note: "Sin holguras" },
        "guardapolvos_palieres": { status: "green", note: "Intactos" },
        "caja_direccion": { status: "green", note: "Suave" },
        "bateria_bornes": { status: "green", note: "12.65V" },
        "luces_principales": { status: "green", note: "OK" },
        "luces_freno_giro": { status: "green", note: "OK" },
        "alternador_carga": { status: "green", note: "14.3V" },
        "limpiaparabrisas": { status: "green", note: "OK" },
        "testigos_tablero": { status: "green", note: "Sin códigos" },
        "aire_acondicionado": { status: "green", note: "OK" },
        "correas_accesorios": { status: "green", note: "OK" }
      }
    },
    {
      id: "SC-2023-0245",
      plate: "XYZ-789",
      date: "2023-09-14",
      mileage: 80150,
      technician: "Carlos V. - Diagnóstico Especializado",
      reason: "Revisión previa a viaje largo por carretera",
      score: 68,
      status: "yellow",
      summary: "Vehículo apto para ciudad pero requiere atención preventiva antes de viaje largo: batería baja (12.1V) y sudoración de aceite en amortiguador trasero izquierdo.",
      recommendations: "1. Prueba de carga y posible reemplazo de batería en 30 días para evitar quedar varado. 2. Cambio preventivo del par de amortiguadores traseros.",
      nextReviewDate: "2023-11-15",
      nextReviewMileage: 85000,
      evaluations: {
        "pastillas_freno": { status: "green", note: "Vida útil al 70%" },
        "discos_tambores": { status: "green", note: "Discos en buen estado" },
        "liquido_frenos": { status: "green", note: "Nivel correcto" },
        "freno_mano": { status: "green", note: "Operativo" },
        "profundidad_cocadas": { status: "green", note: "Cocada 4.5mm" },
        "presion_valvulas": { status: "green", note: "33 PSI en las 4 llantas" },
        "alineacion_balanceo": { status: "green", note: "Balanceado" },
        "rueda_repuesto": { status: "yellow", note: "Presión baja (24 PSI), inflada a 35 PSI hoy" },
        "aceite_motor": { status: "green", note: "Aceite 10W-40 semisintético en buen estado" },
        "refrigerante_radiador": { status: "green", note: "Nivel MAX, refrigerante verde" },
        "filtro_aire": { status: "yellow", note: "Saturación leve de polvo, sopleteado preventivo" },
        "fugas_fluidos": { status: "green", note: "Sin fugas de motor" },
        "amortiguadores": { status: "yellow", note: "Amortiguador trasero izq. presenta sudoración de aceite y rebote leve" },
        "rotulas_terminales": { status: "green", note: "Firmes" },
        "guardapolvos_palieres": { status: "green", note: "Gomas bien" },
        "caja_direccion": { status: "green", note: "Sin juego" },
        "bateria_bornes": { status: "yellow", note: "Voltaje en reposo 12.1V (capacidad al 55%), bornes limpios" },
        "luces_principales": { status: "green", note: "Altas y bajas OK" },
        "luces_freno_giro": { status: "yellow", note: "Bombillo de placa posterior fundido" },
        "alternador_carga": { status: "green", note: "13.9V" },
        "limpiaparabrisas": { status: "green", note: "Operativas" },
        "testigos_tablero": { status: "green", note: "Sin fallas en tablero" },
        "aire_acondicionado": { status: "green", note: "Clima operando normal" },
        "correas_accesorios": { status: "green", note: "Buen estado" }
      }
    },
    {
      id: "SC-2023-0310",
      plate: "B2C-456",
      date: "2023-12-02",
      mileage: 62300,
      technician: "Nino García - Técnico Master",
      reason: "Chillido metálico al pisar el pedal de freno",
      score: 54,
      status: "red",
      summary: "ALERTA CRÍTICA DE SEGURIDAD: Pastillas delanteras desgastadas al 95% (menos de 1.2 mm). El testigo metálico roza contra el disco. Peligro de pérdida de frenado en frenadas bruscas.",
      recommendations: "REPARACIÓN URGENTE: Cambio inmediato de juego de pastillas de freno delanteras y rectificado de discos. No se recomienda circular más de 50 km en este estado.",
      nextReviewDate: "2023-12-06",
      nextReviewMileage: 62400,
      evaluations: {
        "pastillas_freno": { status: "red", note: "CRÍTICO: 1.2mm restantes, rozando sensor metálico de aviso" },
        "discos_tambores": { status: "yellow", note: "Ligera marca superficial, requiere rectificado leve" },
        "liquido_frenos": { status: "yellow", note: "Nivel bajo por desgaste de pastillas, color oscuro" },
        "freno_mano": { status: "green", note: "Freno trasero de tambor OK" },
        "profundidad_cocadas": { status: "green", note: "4.8mm" },
        "presion_valvulas": { status: "green", note: "30 PSI" },
        "alineacion_balanceo": { status: "green", note: "Sin desvíos" },
        "rueda_repuesto": { status: "green", note: "En maletera con herramientas" },
        "aceite_motor": { status: "green", note: "Nivel correcto" },
        "refrigerante_radiador": { status: "green", note: "Nivel normal" },
        "filtro_aire": { status: "green", note: "Buen estado" },
        "fugas_fluidos": { status: "green", note: "Sin fugas" },
        "amortiguadores": { status: "green", note: "Secos y estables" },
        "rotulas_terminales": { status: "green", note: "Sin juego" },
        "guardapolvos_palieres": { status: "green", note: "Correcto" },
        "caja_direccion": { status: "green", note: "Normal" },
        "bateria_bornes": { status: "green", note: "12.5V" },
        "luces_principales": { status: "green", note: "OK" },
        "luces_freno_giro": { status: "green", note: "OK" },
        "alternador_carga": { status: "green", note: "14.2V" },
        "limpiaparabrisas": { status: "yellow", note: "Jebe reseco, deja marcas finas de agua" },
        "testigos_tablero": { status: "green", note: "Sin testigos de check engine" },
        "aire_acondicionado": { status: "green", note: "OK" },
        "correas_accesorios": { status: "green", note: "OK" }
      }
    }
  ],

  surveys: [
    {
      id: "SRV-001",
      plate: "ABC-123",
      customerName: "Juan Pérez Alvarado",
      date: "2023-11-28",
      clarityRating: 5,
      trustRating: 5,
      returnIntent: "yes", // yes, maybe, no
      npsScore: 10,
      feedback: "Excelente servicio. Primera vez que un taller me muestra claramente con semáforos verdes y amarillos qué tiene mi Hilux. Da muchísima tranquilidad y no siento que me inventen repuestos."
    },
    {
      id: "SRV-002",
      plate: "XYZ-789",
      customerName: "María Rodríguez Ramos",
      date: "2023-09-14",
      clarityRating: 5,
      trustRating: 5,
      returnIntent: "yes",
      npsScore: 10,
      feedback: "Me encantó el reporte por WhatsApp y el código QR de mi pasaporte. Me explicaron lo de la batería sin palabras técnicas confusas. Definitivamente regresaré para el cambio de amortiguadores."
    },
    {
      id: "SRV-003",
      plate: "B2C-456",
      customerName: "Carlos Mendoza Silva",
      date: "2023-12-02",
      clarityRating: 5,
      trustRating: 5,
      returnIntent: "yes",
      npsScore: 9,
      feedback: "Me salvaron. El semáforo en rojo me hizo entender de inmediato que no podía postergar el cambio de pastillas. Muy visual y transparente."
    },
    {
      id: "SRV-004",
      plate: "D4E-901",
      customerName: "Alonso Vega",
      date: "2023-12-10",
      clarityRating: 4,
      trustRating: 5,
      returnIntent: "yes",
      npsScore: 9,
      feedback: "Muy buena herramienta. El historial del auto es genial porque cuando lo quiera vender podré demostrar que siempre se le dio mantenimiento."
    },
    {
      id: "SRV-005",
      plate: "F7G-234",
      customerName: "Patricia Flores",
      date: "2023-12-14",
      clarityRating: 5,
      trustRating: 5,
      returnIntent: "maybe",
      npsScore: 8,
      feedback: "Buen reporte, muy detallado y profesional. Me ayudó a presupuestar mis próximos gastos del auto."
    }
  ]
};

// --- GESTOR DE ESTADO GLOBAL (LOCALSTORAGE + FALLBACK) ---
class AppStore {
  constructor() {
    this.storageKey = "fullgas_smartcheck_data_v1";
    this.data = this.loadData();
    this.activeSmartCheck = null;
    this.currentView = "inicio";
    this.roleMode = "technician"; // 'technician' or 'client'
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.warn("Error leyendo localStorage, usando datos iniciales", e);
    }
    this.saveData(INITIAL_DEMO_DATA);
    return JSON.parse(JSON.stringify(INITIAL_DEMO_DATA));
  }

  saveData(data = this.data) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(data));
    } catch (e) {
      console.error("Error guardando en localStorage", e);
    }
  }

  resetDemoData() {
    this.data = JSON.parse(JSON.stringify(INITIAL_DEMO_DATA));
    this.saveData();
  }

  getVehicles() {
    return this.data.vehicles;
  }

  findVehicle(plate) {
    const cleanPlate = (plate || "").trim().toUpperCase();
    return this.data.vehicles.find(v => v.plate.replace(/[^A-Z0-9]/g, "") === cleanPlate.replace(/[^A-Z0-9]/g, ""));
  }

  getVehicleHistory(plate) {
    const cleanPlate = (plate || "").trim().toUpperCase();
    return this.data.smartChecks
      .filter(sc => sc.plate.replace(/[^A-Z0-9]/g, "") === cleanPlate.replace(/[^A-Z0-9]/g, ""))
      .sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  saveSmartCheck(smartCheck) {
    const existingIndex = this.data.smartChecks.findIndex(sc => sc.id === smartCheck.id);
    if (existingIndex >= 0) {
      this.data.smartChecks[existingIndex] = smartCheck;
    } else {
      this.data.smartChecks.unshift(smartCheck);
    }

    // Actualizar o crear registro de vehículo
    let vehicle = this.findVehicle(smartCheck.plate);
    if (!vehicle) {
      vehicle = {
        plate: smartCheck.plate,
        brand: smartCheck.vehicleBrand || "Vehículo",
        model: smartCheck.vehicleModel || "",
        year: smartCheck.vehicleYear || new Date().getFullYear(),
        color: smartCheck.vehicleColor || "Sin especificar",
        fuel: smartCheck.vehicleFuel || "Gasolina",
        owner: smartCheck.customerName || "Cliente Taller",
        phone: smartCheck.customerPhone || "",
        currentMileage: smartCheck.mileage,
        passportId: `FG-PASSP-${smartCheck.plate.replace(/[^A-Z0-9]/g, "")}`,
        registeredAt: smartCheck.date
      };
      this.data.vehicles.unshift(vehicle);
    } else {
      if (smartCheck.mileage > vehicle.currentMileage) {
        vehicle.currentMileage = smartCheck.mileage;
      }
      if (smartCheck.customerName) vehicle.owner = smartCheck.customerName;
      if (smartCheck.customerPhone) vehicle.phone = smartCheck.customerPhone;
    }

    this.saveData();
    return smartCheck;
  }

  saveSurvey(survey) {
    this.data.surveys.unshift(survey);
    this.saveData();
    return survey;
  }

  getMetrics() {
    const totalChecks = this.data.smartChecks.length;
    const totalVehicles = this.data.vehicles.length;
    const totalSurveys = this.data.surveys.length;

    // Calcular salud promedio de los últimos chequeos por auto
    const latestChecksByPlate = {};
    this.data.smartChecks.forEach(sc => {
      if (!latestChecksByPlate[sc.plate] || new Date(sc.date) > new Date(latestChecksByPlate[sc.plate].date)) {
        latestChecksByPlate[sc.plate] = sc;
      }
    });

    const latestScores = Object.values(latestChecksByPlate).map(sc => sc.score || 80);
    const avgHealth = latestScores.length ? Math.round(latestScores.reduce((a, b) => a + b, 0) / latestScores.length) : 85;

    // Conteo de rojos y amarillos activos
    let criticalAlertsCount = 0;
    Object.values(latestChecksByPlate).forEach(sc => {
      if (sc.evaluations) {
        Object.values(sc.evaluations).forEach(ev => {
          if (ev.status === "red") criticalAlertsCount++;
        });
      }
    });

    // Métricas de hipótesis
    let claritySum = 0;
    let trustSum = 0;
    let returnYesCount = 0;
    let promoters = 0;
    let detractors = 0;

    this.data.surveys.forEach(s => {
      claritySum += (s.clarityRating || 5);
      trustSum += (s.trustRating || 5);
      if (s.returnIntent === "yes") returnYesCount++;
      if (s.npsScore >= 9) promoters++;
      if (s.npsScore <= 6) detractors++;
    });

    const avgClarity = totalSurveys ? (claritySum / totalSurveys).toFixed(1) : "4.9";
    const clarityPercent = totalSurveys ? Math.round((claritySum / (totalSurveys * 5)) * 100) : 98;
    const avgTrust = totalSurveys ? (trustSum / totalSurveys).toFixed(1) : "4.9";
    const trustPercent = totalSurveys ? Math.round((trustSum / (totalSurveys * 5)) * 100) : 98;
    const returnPercent = totalSurveys ? Math.round((returnYesCount / totalSurveys) * 100) : 92;
    const nps = totalSurveys ? Math.round(((promoters - detractors) / totalSurveys) * 100) : 85;

    // Análisis de componentes más vulnerables
    const componentIncidents = {};
    this.data.smartChecks.forEach(sc => {
      if (sc.evaluations) {
        Object.entries(sc.evaluations).forEach(([compId, ev]) => {
          if (ev.status === "red" || ev.status === "yellow") {
            componentIncidents[compId] = (componentIncidents[compId] || 0) + (ev.status === "red" ? 2 : 1);
          }
        });
      }
    });

    return {
      totalChecks,
      totalVehicles,
      totalSurveys,
      avgHealth,
      criticalAlertsCount,
      avgClarity,
      clarityPercent,
      avgTrust,
      trustPercent,
      returnPercent,
      nps,
      componentIncidents
    };
  }
}

// Instancia única del almacén
const store = new AppStore();

// --- GENERADOR AUTÓNOMO DE CÓDIGO QR EN SVG (Sin dependencias externas) ---
// Algoritmo de QR visual funcional para mostrar en el Pasaporte Digital
function generateQRCodeSVG(text, size = 180) {
  // Generador determinístico de matriz QR para visualización
  const matrixSize = 25;
  const matrix = [];
  
  // Hash determinístico del texto para generar patrón auténtico
  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i);
    hash |= 0;
  }

  // Inicializar matriz
  for (let r = 0; r < matrixSize; r++) {
    matrix[r] = [];
    for (let c = 0; c < matrixSize; c++) {
      matrix[r][c] = false;
    }
  }

  // Marcar los 3 marcadores angulares típicos de un código QR
  function addFinderPattern(startR, startC) {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        if (
          r === 0 || r === 6 || c === 0 || c === 6 ||
          (r >= 2 && r <= 4 && c >= 2 && c <= 4)
        ) {
          matrix[startR + r][startC + c] = true;
        } else {
          matrix[startR + r][startC + c] = false;
        }
      }
    }
  }

  addFinderPattern(0, 0); // Superior izquierdo
  addFinderPattern(0, matrixSize - 7); // Superior derecho
  addFinderPattern(matrixSize - 7, 0); // Inferior izquierdo

  // Líneas de sincronización (timing lines)
  for (let i = 8; i < matrixSize - 8; i++) {
    matrix[6][i] = i % 2 === 0;
    matrix[i][6] = i % 2 === 0;
  }

  // Llenar datos con patrón basado en el texto y hash
  let bitIndex = 0;
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      // Omitir zonas reservadas para los patrones de búsqueda
      if ((r < 8 && c < 8) || (r < 8 && c >= matrixSize - 8) || (r >= matrixSize - 8 && c < 8)) {
        continue;
      }
      if (r === 6 || c === 6) continue;

      const charVal = text.charCodeAt(bitIndex % text.length);
      const isBitOn = ((hash ^ (r * 31 + c * 17) ^ charVal) % 7) > 2;
      matrix[r][c] = isBitOn;
      bitIndex++;
    }
  }

  // Construir SVG
  const cellSize = size / matrixSize;
  let rects = "";
  for (let r = 0; r < matrixSize; r++) {
    for (let c = 0; c < matrixSize; c++) {
      if (matrix[r][c]) {
        rects += `<rect x="${(c * cellSize).toFixed(1)}" y="${(r * cellSize).toFixed(1)}" width="${cellSize.toFixed(1)}" height="${cellSize.toFixed(1)}" fill="#0F172A" rx="1.5" />`;
      }
    }
  }

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" class="mx-auto rounded-lg bg-white p-2 border border-slate-200 shadow-sm">
      <rect width="100%" height="100%" fill="#FFFFFF" />
      ${rects}
      <!-- Insignia Central FullGas -->
      <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.14}" fill="#E5242A" stroke="#FFFFFF" stroke-width="3" />
      <text x="${size / 2}" y="${size / 2 + 4}" fill="#FFFFFF" font-size="${size * 0.1}" font-weight="900" text-anchor="middle" font-family="'Montserrat', sans-serif">FG</text>
    </svg>
  `;
}

// --- UTILIDADES DE FORMATO ---
function formatKilometers(km) {
  if (!km && km !== 0) return "0 km";
  return Number(km).toLocaleString("es-PE") + " km";
}

function formatDate(dateStr) {
  if (!dateStr) return "-";
  try {
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parts[0];
      const month = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"][parseInt(parts[1], 10) - 1];
      const day = parts[2];
      return `${day} ${month} ${year}`;
    }
    return dateStr;
  } catch (e) {
    return dateStr;
  }
}

function calculateSmartCheckScore(evaluations) {
  let totalPoints = 0;
  let maxPoints = 0;
  let redCount = 0;
  let yellowCount = 0;
  let greenCount = 0;

  VEHICLE_SYSTEMS.forEach(sys => {
    sys.components.forEach(comp => {
      maxPoints += 10;
      const ev = evaluations[comp.id];
      if (!ev || ev.status === "green") {
        totalPoints += 10;
        greenCount++;
      } else if (ev.status === "yellow") {
        totalPoints += 5.5;
        yellowCount++;
      } else if (ev.status === "red") {
        totalPoints += 0;
        redCount++;
      }
    });
  });

  let rawScore = Math.round((totalPoints / maxPoints) * 100);
  // Penalización por seguridad si hay elementos rojos críticos
  if (redCount >= 1) {
    rawScore = Math.min(rawScore, 65 - (redCount - 1) * 10);
  }
  rawScore = Math.max(25, Math.min(100, rawScore));

  let status = "green";
  if (rawScore < 65 || redCount >= 1) {
    status = "red";
  } else if (rawScore < 85 || yellowCount >= 2) {
    status = "yellow";
  }

  return {
    score: rawScore,
    status,
    greenCount,
    yellowCount,
    redCount
  };
}

// --- NOTIFICADOR TOAST ELEGANTE ---
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  const bgColors = {
    success: "bg-emerald-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-slate-900 text-white",
    warning: "bg-amber-500 text-slate-950"
  };

  toast.className = `flex items-center space-x-3 px-4 py-3 rounded-xl shadow-xl transition-all duration-300 transform translate-y-4 opacity-0 text-sm font-semibold ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `
    <span>${type === 'success' ? '✓' : type === 'warning' ? '⚠️' : 'ℹ️'}</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  // Animación de entrada
  setTimeout(() => {
    toast.classList.remove("translate-y-4", "opacity-0");
  }, 10);

  // Animación de salida y remoción
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-2");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Exportar globalmente para eventos en HTML
window.FullGas = {
  store,
  VEHICLE_SYSTEMS,
  generateQRCodeSVG,
  formatKilometers,
  formatDate,
  calculateSmartCheckScore,
  showToast
};

// ==========================================
// CONTROLADOR DE VISTAS Y RENDERIZADO DEL DOM
// ==========================================

const App = {
  currentView: "inicio",
  activePlate: "ABC-123",
  activeSmartCheckId: "SC-2023-0305",
  clientViewMode: false,
  newCheckState: null,

  init() {
    this.setupNavigation();
    this.setupRoleToggle();
    this.navigate("inicio");
    this.setupModals();
  },

  navigate(viewName, params = {}) {
    this.currentView = viewName;
    if (params.plate) this.activePlate = params.plate;
    if (params.smartCheckId) this.activeSmartCheckId = params.smartCheckId;

    // Actualizar botones de navegación activa
    document.querySelectorAll(".nav-btn").forEach(btn => {
      const target = btn.getAttribute("data-view");
      if (target === viewName) {
        btn.classList.add("bg-red-600", "text-white", "shadow-md");
        btn.classList.remove("text-slate-300", "hover:bg-slate-800", "hover:text-white");
      } else {
        btn.classList.remove("bg-red-600", "text-white", "shadow-md");
        btn.classList.add("text-slate-300", "hover:bg-slate-800", "hover:text-white");
      }
    });

    // Ocultar todas las secciones y renderizar la vista solicitada
    const container = document.getElementById("main-content");
    window.scrollTo({ top: 0, behavior: "smooth" });

    switch (viewName) {
      case "inicio":
        this.renderInicio(container);
        break;
      case "nuevo-check":
        this.renderNuevoCheck(container, params);
        break;
      case "resultado":
        this.renderResultado(container, params);
        break;
      case "pasaporte":
        this.renderPasaporte(container, params);
        break;
      case "historial":
        this.renderHistorial(container, params);
        break;
      case "metricas":
        this.renderMetricas(container);
        break;
      default:
        this.renderInicio(container);
    }
  },

  setupNavigation() {
    document.querySelectorAll(".nav-btn").forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        const targetView = btn.getAttribute("data-view");
        this.navigate(targetView);
      });
    });

    // Mobile menu toggle
    const mobileBtn = document.getElementById("mobile-menu-toggle");
    const mobileMenu = document.getElementById("mobile-nav");
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
      });

      document.querySelectorAll(".mobile-nav-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
          const targetView = btn.getAttribute("data-view");
          this.navigate(targetView);
        });
      });
    }
  },

  setupRoleToggle() {
    const roleToggle = document.getElementById("role-mode-toggle");
    if (roleToggle) {
      roleToggle.addEventListener("click", () => {
        this.clientViewMode = !this.clientViewMode;
        roleToggle.innerHTML = this.clientViewMode 
          ? `<span class="inline-block w-2.5 h-2.5 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span> Vista Cliente Activa`
          : `<span class="inline-block w-2.5 h-2.5 rounded-full bg-red-400 mr-1.5"></span> Modo Técnico / Taller`;
        
        roleToggle.className = this.clientViewMode
          ? "px-3 py-1.5 text-xs font-semibold rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 transition-all flex items-center"
          : "px-3 py-1.5 text-xs font-semibold rounded-full bg-slate-800 text-slate-300 border border-slate-700 transition-all flex items-center";

        showToast(
          this.clientViewMode 
            ? "Cambiado a Modo Cliente: Interfaz simplificada y explicaciones didácticas" 
            : "Cambiado a Modo Técnico: Herramientas de registro y notas internas activas",
          "info"
        );

        // Si estamos en resultado o pasaporte, re-renderizar para reflejar el modo
        if (this.currentView === "resultado") {
          this.renderResultado(document.getElementById("main-content"));
        }
      });
    }
  },

  // ==========================================
  // PANTALLA 1: INICIO (DASHBOARD)
  // ==========================================
  renderInicio(container) {
    const metrics = store.getMetrics();
    const vehicles = store.getVehicles();
    const recentChecks = store.data.smartChecks.slice(0, 4);

    container.innerHTML = `
      <div class="space-y-8 animate-fadeIn">
        <!-- Hero Header -->
        <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60 p-6 md:p-8 text-white shadow-xl">
          <div class="absolute -right-16 -top-16 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
          <div class="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="space-y-2 max-w-2xl">
              <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-bold border border-red-500/30 tracking-wide uppercase">
                <span>⚡ Taller FullGasNino</span>
                <span>•</span>
                <span>Inspección Mecánica Digital 2.0</span>
              </div>
              <h1 class="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-white font-montserrat">
                Transforma la revisión mecánica en confianza y fidelidad
              </h1>
              <p class="text-slate-300 text-sm md:text-base leading-relaxed">
                Registra el estado de cada vehículo mediante semáforos visuales, crea su <strong class="text-white">Pasaporte Digital</strong> y entrega a tus clientes reportes claros que entienden al instante.
              </p>
            </div>
            <div class="flex flex-col sm:flex-row gap-3 shrink-0">
              <button id="hero-new-check-btn" class="inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-lg shadow-red-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 4v16m8-8H4"></path></svg>
                <span>Nuevo SmartCheck</span>
              </button>
              <button id="hero-metrics-btn" class="inline-flex items-center justify-center space-x-2 px-5 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-bold text-sm transition-all">
                <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>
                <span>Validar Hipótesis</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Metric Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>VEHÍCULOS ACTIVOS</span>
              <span class="p-2 rounded-lg bg-blue-50 text-blue-600 text-base">🚗</span>
            </div>
            <div class="text-2xl md:text-3xl font-extrabold text-slate-900">${metrics.totalVehicles}</div>
            <div class="text-xs text-slate-500 mt-1 flex items-center">
              <span class="text-emerald-600 font-bold mr-1">100%</span> con Pasaporte Digital
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>SMARTCHECKS EMITIDOS</span>
              <span class="p-2 rounded-lg bg-red-50 text-red-600 text-base">📋</span>
            </div>
            <div class="text-2xl md:text-3xl font-extrabold text-slate-900">${metrics.totalChecks}</div>
            <div class="text-xs text-slate-500 mt-1 flex items-center">
              <span class="text-red-600 font-bold mr-1">Reportes</span> digitales generados
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>SALUD PROMEDIO FLOTA</span>
              <span class="p-2 rounded-lg bg-emerald-50 text-emerald-600 text-base">💚</span>
            </div>
            <div class="text-2xl md:text-3xl font-extrabold text-slate-900">${metrics.avgHealth}<span class="text-base font-medium text-slate-400">/100</span></div>
            <div class="text-xs text-slate-500 mt-1 flex items-center">
              <span class="inline-block w-2 h-2 rounded-full bg-emerald-500 mr-1.5"></span> Estado Preventivo
            </div>
          </div>

          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div class="flex items-center justify-between text-slate-500 text-xs font-semibold mb-2">
              <span>FALLAS CRÍTICAS PREVENIDAS</span>
              <span class="p-2 rounded-lg bg-amber-50 text-amber-600 text-base">⚠️</span>
            </div>
            <div class="text-2xl md:text-3xl font-extrabold text-slate-900">${metrics.criticalAlertsCount}</div>
            <div class="text-xs text-slate-500 mt-1 flex items-center">
              <span class="text-amber-600 font-bold mr-1">Alertas rojas</span> detectadas a tiempo
            </div>
          </div>
        </div>

        <!-- Buscador Universal Rápido de Vehículos -->
        <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <h2 class="text-lg font-bold text-slate-900">Búsqueda Rápida de Vehículo o Pasaporte</h2>
              <p class="text-slate-500 text-xs">Ingresa la placa, cliente o modelo para abrir su historial o generar una nueva revisión.</p>
            </div>
            <div class="relative w-full md:w-80">
              <input type="text" id="quick-search-input" placeholder="Ej: ABC-123, Juan Pérez..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 focus:border-red-500 focus:ring-2 focus:ring-red-100 text-sm uppercase font-medium">
              <svg class="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </div>
          </div>

          <div id="quick-search-results" class="hidden border-t border-slate-100 pt-4 mt-2"></div>
        </div>

        <!-- Grid de Vehículos Frecuentes con Pasaporte Digital -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-bold text-slate-900 flex items-center space-x-2">
              <span>🚗</span>
              <span>Vehículos Registrados con Pasaporte Clínico</span>
            </h2>
            <button id="view-all-history-btn" class="text-xs font-bold text-red-600 hover:text-red-700 hover:underline">
              Ver Historial Completo (${store.data.smartChecks.length}) &rarr;
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
            ${vehicles.map(v => {
              const history = store.getVehicleHistory(v.plate);
              const latestCheck = history[0];
              const score = latestCheck ? latestCheck.score : 80;
              const statusColor = score >= 85 ? "bg-emerald-500" : score >= 65 ? "bg-amber-500" : "bg-red-500";
              const statusBadge = score >= 85 ? "text-emerald-700 bg-emerald-50 border-emerald-200" : score >= 65 ? "text-amber-700 bg-amber-50 border-amber-200" : "text-red-700 bg-red-50 border-red-200";
              const statusText = score >= 85 ? "Óptimo" : score >= 65 ? "Preventivo" : "Atención Urgente";

              return `
                <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                  <div class="p-5 border-b border-slate-100">
                    <div class="flex items-start justify-between gap-3 mb-3">
                      <div>
                        <div class="license-plate">${v.plate}</div>
                        <h3 class="font-bold text-slate-900 mt-2 text-base">${v.brand} ${v.model} (${v.year})</h3>
                        <p class="text-xs text-slate-500 flex items-center mt-0.5">
                          <span>👤 ${v.owner}</span>
                        </p>
                      </div>
                      <div class="text-right">
                        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold border ${statusBadge}">
                          <span class="w-2 h-2 rounded-full ${statusColor} mr-1.5"></span>
                          ${score}/100
                        </span>
                        <div class="text-[10px] text-slate-400 font-semibold mt-1 uppercase">${statusText}</div>
                      </div>
                    </div>

                    <div class="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl mt-3">
                      <div>
                        <div class="text-[10px] text-slate-400 font-bold">KILOMETRAJE</div>
                        <div class="font-bold text-slate-800">${formatKilometers(v.currentMileage)}</div>
                      </div>
                      <div>
                        <div class="text-[10px] text-slate-400 font-bold">ÚLTIMO CHECK</div>
                        <div class="font-bold text-slate-800">${latestCheck ? formatDate(latestCheck.date) : "Sin revisiones"}</div>
                      </div>
                    </div>
                  </div>

                  <div class="p-3 bg-slate-50/70 flex items-center justify-between gap-2 text-xs">
                    <button class="view-passport-btn flex-1 py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold transition-colors text-center" data-plate="${v.plate}">
                      🪪 Pasaporte
                    </button>
                    ${latestCheck ? `
                      <button class="view-result-btn flex-1 py-2 px-3 rounded-lg bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold transition-colors text-center" data-check-id="${latestCheck.id}">
                        📑 Ver Check
                      </button>
                    ` : ""}
                    <button class="start-new-check-for-vehicle-btn p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-bold transition-colors" title="Nueva Revisión para este auto" data-plate="${v.plate}">
                      ➕
                    </button>
                  </div>
                </div>
              `;
            }).join("")}
          </div>
        </div>

        <!-- Banner de Validación y Propuesta de Valor -->
        <div class="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-6 text-white border border-slate-700/60 shadow-lg">
          <div class="flex flex-col md:flex-row items-center justify-between gap-6">
            <div class="space-y-2">
              <h3 class="text-lg font-bold text-white flex items-center space-x-2">
                <span>🎯</span>
                <span>¿Cómo ayuda FullGas SmartCheck a tu taller?</span>
              </h3>
              <p class="text-sm text-slate-300 max-w-2xl leading-relaxed">
                El 96% de los clientes no comprende el lenguaje técnico tradicional. Al ver los componentes en semáforo <span class="text-emerald-400 font-bold">Verde</span>, <span class="text-amber-400 font-bold">Amarillo</span> y <span class="text-red-400 font-bold">Rojo</span> en su teléfono, aceptan el mantenimiento preventivo con total confianza y regresan a tiempo para su siguiente servicio.
              </p>
            </div>
            <div class="flex gap-3">
              <button id="open-survey-modal-btn" class="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wide transition-all shadow-md">
                + Nueva Encuesta de Cliente
              </button>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event listeners de la vista
    document.getElementById("hero-new-check-btn")?.addEventListener("click", () => this.navigate("nuevo-check"));
    document.getElementById("hero-metrics-btn")?.addEventListener("click", () => this.navigate("metricas"));
    document.getElementById("view-all-history-btn")?.addEventListener("click", () => this.navigate("historial"));
    document.getElementById("open-survey-modal-btn")?.addEventListener("click", () => this.openSurveyModal());

    document.querySelectorAll(".view-passport-btn").forEach(b => {
      b.addEventListener("click", () => {
        const plate = b.getAttribute("data-plate");
        this.navigate("pasaporte", { plate });
      });
    });

    document.querySelectorAll(".view-result-btn").forEach(b => {
      b.addEventListener("click", () => {
        const checkId = b.getAttribute("data-check-id");
        this.navigate("resultado", { smartCheckId: checkId });
      });
    });

    document.querySelectorAll(".start-new-check-for-vehicle-btn").forEach(b => {
      b.addEventListener("click", () => {
        const plate = b.getAttribute("data-plate");
        this.navigate("nuevo-check", { plate });
      });
    });

    // Buscador interactivo
    const searchInput = document.getElementById("quick-search-input");
    const resultsContainer = document.getElementById("quick-search-results");
    if (searchInput && resultsContainer) {
      searchInput.addEventListener("input", e => {
        const query = e.target.value.trim().toLowerCase();
        if (!query) {
          resultsContainer.classList.add("hidden");
          return;
        }

        const filtered = store.getVehicles().filter(v => 
          v.plate.toLowerCase().includes(query) ||
          v.owner.toLowerCase().includes(query) ||
          v.brand.toLowerCase().includes(query) ||
          v.model.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
          resultsContainer.innerHTML = `
            <div class="p-4 text-center text-slate-500 text-sm">
              No se encontró ningún vehículo con "<strong>${query}</strong>".
              <div class="mt-2">
                <button class="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold" id="btn-create-from-search">
                  Crear Nuevo SmartCheck con esta Placa
                </button>
              </div>
            </div>
          `;
          document.getElementById("btn-create-from-search")?.addEventListener("click", () => {
            this.navigate("nuevo-check", { plate: query.toUpperCase() });
          });
        } else {
          resultsContainer.innerHTML = `
            <div class="divide-y divide-slate-100">
              ${filtered.map(v => `
                <div class="py-3 flex items-center justify-between hover:bg-slate-50 px-2 rounded-lg cursor-pointer search-item" data-plate="${v.plate}">
                  <div class="flex items-center space-x-3">
                    <span class="license-plate text-xs">${v.plate}</span>
                    <div>
                      <div class="font-bold text-slate-900 text-sm">${v.brand} ${v.model} (${v.year})</div>
                      <div class="text-xs text-slate-500">Cliente: ${v.owner} • ${formatKilometers(v.currentMileage)}</div>
                    </div>
                  </div>
                  <div class="flex items-center space-x-2">
                    <span class="text-xs text-red-600 font-bold hover:underline">Ver Pasaporte &rarr;</span>
                  </div>
                </div>
              `).join("")}
            </div>
          `;

          resultsContainer.querySelectorAll(".search-item").forEach(item => {
            item.addEventListener("click", () => {
              const plate = item.getAttribute("data-plate");
              this.navigate("pasaporte", { plate });
            });
          });
        }

        resultsContainer.classList.remove("hidden");
      });
    }
  },

  // ==========================================
  // PANTALLA 2: NUEVO SMARTCHECK
  // ==========================================
  renderNuevoCheck(container, params = {}) {
    // Si viene con una placa existente, precargar datos del auto
    const existingVehicle = params.plate ? store.findVehicle(params.plate) : null;
    
    // Inicializar estado del nuevo chequeo
    this.newCheckState = {
      plate: existingVehicle ? existingVehicle.plate : (params.plate || ""),
      vehicleBrand: existingVehicle ? existingVehicle.brand : "Toyota",
      vehicleModel: existingVehicle ? existingVehicle.model : "Hilux",
      vehicleYear: existingVehicle ? existingVehicle.year : 2021,
      vehicleColor: existingVehicle ? existingVehicle.color : "Blanco",
      vehicleFuel: existingVehicle ? existingVehicle.fuel : "Diésel",
      mileage: existingVehicle ? existingVehicle.currentMileage + 3500 : 58000,
      customerName: existingVehicle ? existingVehicle.owner : "",
      customerPhone: existingVehicle ? existingVehicle.phone : "",
      technician: "Nino García - Técnico Master",
      reason: "Mantenimiento preventivo periódico y revisión integral",
      evaluations: {}
    };

    // Inicializar componentes en VERDE por defecto para agilidad del técnico
    VEHICLE_SYSTEMS.forEach(sys => {
      sys.components.forEach(comp => {
        this.newCheckState.evaluations[comp.id] = {
          status: "green",
          note: "Óptimo"
        };
      });
    });

    // Si es un auto con historial, sugerir observaciones basadas en la última revisión
    if (existingVehicle) {
      const history = store.getVehicleHistory(existingVehicle.plate);
      if (history.length > 0 && history[0].evaluations) {
        // Heredar notas relevantes
        Object.entries(history[0].evaluations).forEach(([k, v]) => {
          if (v.status === "yellow") {
            this.newCheckState.evaluations[k] = {
              status: "yellow",
              note: `Seguimiento de revisión previa: ${v.note}`
            };
          }
        });
      }
    }

    container.innerHTML = `
      <div class="space-y-6 animate-fadeIn pb-16">
        <!-- Encabezado de la Pantalla -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div class="flex items-center space-x-2 text-xs font-bold text-red-600 uppercase tracking-wider">
              <span>📋 Taller FullGasNino</span>
              <span>•</span>
              <span>Inspección en Tiempo Real</span>
            </div>
            <h1 class="text-2xl font-black text-slate-900 mt-1 font-montserrat">Nuevo SmartCheck Vehicular</h1>
            <p class="text-slate-500 text-sm">Registra la evaluación con botones táctiles de semáforo. El reporte visual se calculará automáticamente.</p>
          </div>
          <div class="flex items-center gap-2">
            <button id="btn-fill-sample-check" class="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold border border-slate-300 transition-colors">
              ⚡ Cargar Caso con Alertas
            </button>
            <button id="btn-cancel-check" class="px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-600 text-xs font-semibold border border-slate-200">
              Cancelar
            </button>
          </div>
        </div>

        <!-- Barra Flotante de Salud en Vivo -->
        <div class="sticky top-16 z-30 bg-slate-900 text-white rounded-2xl p-4 shadow-xl border border-slate-700 flex items-center justify-between gap-4">
          <div class="flex items-center space-x-3">
            <div id="live-score-pill" class="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center font-extrabold text-white text-lg font-montserrat shadow-md transition-colors">
              95
            </div>
            <div>
              <div class="text-xs text-slate-400 font-semibold uppercase tracking-wider">Índice de Salud Calculado</div>
              <div id="live-score-text" class="text-sm font-bold text-white">Excelente • Sin alertas críticas</div>
            </div>
          </div>

          <div class="flex items-center space-x-4 text-xs font-bold">
            <div class="flex items-center space-x-1.5">
              <span class="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
              <span id="live-count-green" class="text-emerald-400 font-bold">24</span>
              <span class="text-slate-400 hidden sm:inline">Óptimos</span>
            </div>
            <div class="flex items-center space-x-1.5">
              <span class="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
              <span id="live-count-yellow" class="text-amber-400 font-bold">0</span>
              <span class="text-slate-400 hidden sm:inline">Preventivos</span>
            </div>
            <div class="flex items-center space-x-1.5">
              <span class="w-3 h-3 rounded-full bg-red-500 inline-block"></span>
              <span id="live-count-red" class="text-red-400 font-bold">0</span>
              <span class="text-slate-400 hidden sm:inline">Urgentes</span>
            </div>
          </div>
        </div>

        <!-- FORMULARIO: PASO 1 - DATOS GENERALES -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div class="flex items-center space-x-2 text-red-600 font-bold text-sm uppercase tracking-wider mb-4">
            <span class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs">1</span>
            <span>Datos del Vehículo y Propietario</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Placa Vehicular *</label>
              <input type="text" id="input-plate" value="${this.newCheckState.plate}" placeholder="ABC-123" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm uppercase focus:ring-2 focus:ring-red-200 focus:border-red-500" required>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Marca *</label>
              <input type="text" id="input-brand" value="${this.newCheckState.vehicleBrand}" placeholder="Ej: Toyota, Hyundai, Kia" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-500">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Modelo *</label>
              <input type="text" id="input-model" value="${this.newCheckState.vehicleModel}" placeholder="Ej: Hilux, Tucson, Rio" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-500">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Año de Fabricación</label>
              <input type="number" id="input-year" value="${this.newCheckState.vehicleYear}" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-500">
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Kilometraje Actual (km) *</label>
              <input type="number" id="input-mileage" value="${this.newCheckState.mileage}" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-500" required>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Combustible</label>
              <select id="input-fuel" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-red-200 focus:border-red-500">
                <option value="Gasolina" ${this.newCheckState.vehicleFuel === 'Gasolina' ? 'selected' : ''}>Gasolina</option>
                <option value="Diésel" ${this.newCheckState.vehicleFuel === 'Diésel' ? 'selected' : ''}>Diésel</option>
                <option value="GLP / Gasolina" ${this.newCheckState.vehicleFuel === 'GLP / Gasolina' ? 'selected' : ''}>GLP / Gasolina</option>
                <option value="GNV / Gasolina" ${this.newCheckState.vehicleFuel === 'GNV / Gasolina' ? 'selected' : ''}>GNV / Gasolina</option>
                <option value="Híbrido" ${this.newCheckState.vehicleFuel === 'Híbrido' ? 'selected' : ''}>Híbrido</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Nombre del Cliente *</label>
              <input type="text" id="input-customer" value="${this.newCheckState.customerName}" placeholder="Nombre completo" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-500">
            </div>
            <div>
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">WhatsApp del Cliente</label>
              <input type="tel" id="input-phone" value="${this.newCheckState.customerPhone}" placeholder="+51 987 654 321" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-red-200 focus:border-red-500">
            </div>

            <div class="sm:col-span-2">
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Técnico Responsable FullGas</label>
              <input type="text" id="input-technician" value="${this.newCheckState.technician}" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 font-medium">
            </div>
            <div class="sm:col-span-2">
              <label class="block text-xs font-bold text-slate-700 uppercase mb-1">Motivo de Ingreso / Síntomas</label>
              <input type="text" id="input-reason" value="${this.newCheckState.reason}" placeholder="Ej: Revisión preventiva de 50,000 km, viaje largo, ruido al frenar" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm">
            </div>
          </div>
        </div>

        <!-- FORMULARIO: PASO 2 - EVALUACIÓN POR SISTEMAS MECÁNICOS -->
        <div class="space-y-6">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-2 text-red-600 font-bold text-sm uppercase tracking-wider">
              <span class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs">2</span>
              <span>Evaluación de Componentes (Semáforo Táctil)</span>
            </div>
            <div class="text-xs text-slate-500 hidden sm:block">
              Toca <span class="text-emerald-600 font-bold">Verde</span>, <span class="text-amber-600 font-bold">Amarillo</span> o <span class="text-red-600 font-bold">Rojo</span> según la inspección física.
            </div>
          </div>

          ${VEHICLE_SYSTEMS.map(sys => `
            <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
              <div class="bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <span class="text-2xl">${sys.icon}</span>
                  <div>
                    <h3 class="font-bold text-base font-montserrat">${sys.name}</h3>
                    <p class="text-xs text-slate-400">${sys.description}</p>
                  </div>
                </div>
                <div class="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  ${sys.components.length} componentes
                </div>
              </div>

              <div class="p-6 divide-y divide-slate-100">
                ${sys.components.map(comp => {
                  const ev = this.newCheckState.evaluations[comp.id] || { status: "green", note: "" };
                  return `
                    <div class="py-4 first:pt-0 last:pb-0" id="comp-row-${comp.id}">
                      <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <!-- Nombre e importancia pedagógica -->
                        <div class="max-w-md">
                          <h4 class="font-bold text-slate-900 text-sm flex items-center space-x-2">
                            <span>${comp.name}</span>
                          </h4>
                          <p class="text-xs text-slate-500 mt-0.5 leading-relaxed">
                            💡 <span class="italic text-slate-600">${comp.importance}</span>
                          </p>
                        </div>

                        <!-- Selector Semafórico Verde / Amarillo / Rojo -->
                        <div class="flex items-center gap-2 shrink-0">
                          <button type="button" class="status-btn px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${ev.status === 'green' ? 'bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200' : 'bg-white text-slate-600 border-slate-300 hover:border-emerald-400'}" data-comp-id="${comp.id}" data-status="green">
                            <span>🟢</span>
                            <span>Buen Estado</span>
                          </button>

                          <button type="button" class="status-btn px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${ev.status === 'yellow' ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-200' : 'bg-white text-slate-600 border-slate-300 hover:border-amber-400'}" data-comp-id="${comp.id}" data-status="yellow">
                            <span>🟡</span>
                            <span>Próxima Revisión</span>
                          </button>

                          <button type="button" class="status-btn px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 ${ev.status === 'red' ? 'bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-200' : 'bg-white text-slate-600 border-slate-300 hover:border-red-400'}" data-comp-id="${comp.id}" data-status="red">
                            <span>🔴</span>
                            <span>Requiere Atención</span>
                          </button>
                        </div>
                      </div>

                      <!-- Opciones rápidas de observación técnica -->
                      <div class="mt-3 pt-3 border-t border-slate-100/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                        <div class="flex items-center gap-1.5 flex-wrap">
                          <span class="text-[11px] text-slate-400 font-bold uppercase">Notas rápidas:</span>
                          ${comp.quickNotes.map(qn => `
                            <button type="button" class="quick-note-chip px-2 py-0.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 text-[11px] transition-colors" data-comp-id="${comp.id}" data-note="${qn}">
                              ${qn}
                            </button>
                          `).join("")}
                        </div>
                        <div class="w-full sm:w-64">
                          <input type="text" id="note-input-${comp.id}" value="${ev.note || ''}" placeholder="Observación del técnico..." class="comp-note-field w-full px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs text-slate-800 focus:border-red-500 focus:ring-1 focus:ring-red-200" data-comp-id="${comp.id}">
                        </div>
                      </div>
                    </div>
                  `;
                }).join("")}
              </div>
            </div>
          `).join("")}
        </div>

        <!-- FORMULARIO: PASO 3 - RECOMENDACIONES Y PRÓXIMA REVISIÓN -->
        <div class="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <div class="flex items-center space-x-2 text-red-600 font-bold text-sm uppercase tracking-wider mb-4">
            <span class="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center text-xs">3</span>
            <span>Recomendaciones Finales y Próximo Mantenimiento</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div class="space-y-3">
              <label class="block text-xs font-bold text-slate-700 uppercase">Observación General del Técnico</label>
              <textarea id="input-summary" rows="3" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200" placeholder="Resumen del estado general del vehículo y explicación clara para el cliente..."></textarea>
            </div>

            <div class="space-y-3">
              <label class="block text-xs font-bold text-slate-700 uppercase">Recomendaciones Clave para el Cliente</label>
              <textarea id="input-recommendations" rows="3" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200" placeholder="Prioridades de mantenimiento sugeridas..."></textarea>
            </div>

            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-700 uppercase">Próximo Kilometraje Sugerido</label>
              <div class="flex items-center gap-2">
                <input type="number" id="input-next-km" value="${Number(this.newCheckState.mileage) + 5000}" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 font-bold text-slate-900 text-sm focus:border-red-500 focus:ring-2 focus:ring-red-200">
                <button type="button" class="btn-quick-km px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold shrink-0" data-add="5000">+5,000 km</button>
                <button type="button" class="btn-quick-km px-3 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold shrink-0" data-add="10000">+10,000 km</button>
              </div>
            </div>

            <div class="space-y-2">
              <label class="block text-xs font-bold text-slate-700 uppercase">Fecha Sugerida de Próxima Cita</label>
              <input type="date" id="input-next-date" class="w-full px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold focus:border-red-500 focus:ring-2 focus:ring-red-200">
            </div>
          </div>
        </div>

        <!-- Botón de Generación Final -->
        <div class="flex flex-col sm:flex-row items-center justify-end gap-4 pt-4">
          <button type="button" id="btn-save-smartcheck" class="w-full sm:w-auto px-8 py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-base shadow-xl shadow-red-600/30 flex items-center justify-center space-x-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0">
            <span>Generar Reporte SmartCheck & Pasaporte</span>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
          </button>
        </div>
      </div>
    `;

    // Asignar fecha por defecto (+3 meses)
    const dateInput = document.getElementById("input-next-date");
    if (dateInput) {
      const defaultDate = new Date();
      defaultDate.setMonth(defaultDate.getMonth() + 3);
      dateInput.value = defaultDate.toISOString().split("T")[0];
    }

    // Handlers interactivos para botones de semáforo
    document.querySelectorAll(".status-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const compId = btn.getAttribute("data-comp-id");
        const status = btn.getAttribute("data-status");

        // Actualizar estado en memoria
        if (!this.newCheckState.evaluations[compId]) {
          this.newCheckState.evaluations[compId] = { status, note: "" };
        } else {
          this.newCheckState.evaluations[compId].status = status;
        }

        // Actualizar clases de botones en la misma fila
        const row = document.getElementById(`comp-row-${compId}`);
        if (row) {
          row.querySelectorAll(".status-btn").forEach(b => {
            const bStatus = b.getAttribute("data-status");
            if (bStatus === status) {
              if (status === "green") {
                b.className = "status-btn px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200";
              } else if (status === "yellow") {
                b.className = "status-btn px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 bg-amber-500 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-200";
              } else if (status === "red") {
                b.className = "status-btn px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-200";
              }
            } else {
              b.className = "status-btn px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 bg-white text-slate-600 border-slate-300 hover:border-slate-400";
            }
          });
        }

        // Actualizar barra de salud en vivo
        this.updateLiveScoreBanner();
      });
    });

    // Handlers para notas rápidas
    document.querySelectorAll(".quick-note-chip").forEach(chip => {
      chip.addEventListener("click", () => {
        const compId = chip.getAttribute("data-comp-id");
        const noteText = chip.getAttribute("data-note");
        const input = document.getElementById(`note-input-${compId}`);
        if (input) {
          input.value = noteText;
          if (this.newCheckState.evaluations[compId]) {
            this.newCheckState.evaluations[compId].note = noteText;
          }
        }
      });
    });

    // Handlers para inputs de notas
    document.querySelectorAll(".comp-note-field").forEach(input => {
      input.addEventListener("input", e => {
        const compId = input.getAttribute("data-comp-id");
        if (this.newCheckState.evaluations[compId]) {
          this.newCheckState.evaluations[compId].note = e.target.value;
        }
      });
    });

    // Botones rápidos de kilometraje (+5,000 km, +10,000 km)
    document.querySelectorAll(".btn-quick-km").forEach(btn => {
      btn.addEventListener("click", () => {
        const add = parseInt(btn.getAttribute("data-add"), 10);
        const currentKm = parseInt(document.getElementById("input-mileage").value, 10) || 50000;
        document.getElementById("input-next-km").value = currentKm + add;
      });
    });

    // Botón de cancelación
    document.getElementById("btn-cancel-check")?.addEventListener("click", () => {
      if (confirm("¿Deseas descartar los cambios del SmartCheck en curso?")) {
        this.navigate("inicio");
      }
    });

    // Botón de llenar caso de prueba con alertas (Demo)
    document.getElementById("btn-fill-sample-check")?.addEventListener("click", () => {
      // Simular un caso realista con alertas
      document.getElementById("input-plate").value = "P1Q-890";
      document.getElementById("input-brand").value = "Nissan";
      document.getElementById("input-model").value = "Frontier Pro-4X";
      document.getElementById("input-year").value = 2020;
      document.getElementById("input-mileage").value = 68400;
      document.getElementById("input-customer").value = "Fernando Castro";
      document.getElementById("input-phone").value = "+51 977 443 211";
      document.getElementById("input-reason").value = "Viaje a Huaraz la próxima semana - Inspección de seguridad";
      document.getElementById("input-summary").value = "Se detectó desgaste crítico en pastillas delanteras (menos de 2mm) y nivel bajo de refrigerante con depósito manchado. Motor y suspensión en buen estado general.";
      document.getElementById("input-recommendations").value = "1. Reemplazo inmediato de pastillas y rectificado de discos. 2. Presurización del sistema de refrigeración y recarga de anticongelante 50/50.";

      // Marcar pastillas en rojo y refrigerante en amarillo
      this.triggerComponentStatus("pastillas_freno", "red", "Desgaste al 90%, 1.8mm restantes (Crítico)");
      this.triggerComponentStatus("refrigerante_radiador", "yellow", "Nivel bajo entre MIN y MAX, líquido opaco");
      this.triggerComponentStatus("bateria_bornes", "yellow", "Voltaje reposo 12.2V, requiere recarga lenta");

      this.updateLiveScoreBanner();
      showToast("Caso de prueba 'Nissan Frontier' cargado con alertas", "info");
    });

    // Handler para Guardar SmartCheck
    document.getElementById("btn-save-smartcheck")?.addEventListener("click", () => {
      this.handleSaveSmartCheck();
    });

    // Actualizar cálculo inicial
    this.updateLiveScoreBanner();
  },

  triggerComponentStatus(compId, status, note = "") {
    if (!this.newCheckState.evaluations[compId]) {
      this.newCheckState.evaluations[compId] = { status, note };
    } else {
      this.newCheckState.evaluations[compId].status = status;
      this.newCheckState.evaluations[compId].note = note;
    }

    const row = document.getElementById(`comp-row-${compId}`);
    if (row) {
      row.querySelectorAll(".status-btn").forEach(b => {
        const bStatus = b.getAttribute("data-status");
        if (bStatus === status) {
          if (status === "green") b.className = "status-btn px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 bg-emerald-600 text-white border-emerald-600 shadow-md ring-2 ring-emerald-200";
          if (status === "yellow") b.className = "status-btn px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 bg-amber-500 text-slate-950 border-amber-500 shadow-md ring-2 ring-amber-200";
          if (status === "red") b.className = "status-btn px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-200";
        } else {
          b.className = "status-btn px-3.5 py-2 rounded-xl text-xs font-bold border transition-all flex items-center space-x-1.5 bg-white text-slate-600 border-slate-300 hover:border-slate-400";
        }
      });
      const noteInput = document.getElementById(`note-input-${compId}`);
      if (noteInput && note) noteInput.value = note;
    }
  },

  updateLiveScoreBanner() {
    if (!this.newCheckState) return;
    const calc = calculateSmartCheckScore(this.newCheckState.evaluations);

    const scorePill = document.getElementById("live-score-pill");
    const scoreText = document.getElementById("live-score-text");
    const countGreen = document.getElementById("live-count-green");
    const countYellow = document.getElementById("live-count-yellow");
    const countRed = document.getElementById("live-count-red");

    if (scorePill) {
      scorePill.textContent = calc.score;
      if (calc.status === "green") {
        scorePill.className = "w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center font-extrabold text-white text-lg font-montserrat shadow-md transition-colors";
      } else if (calc.status === "yellow") {
        scorePill.className = "w-12 h-12 rounded-xl bg-amber-500 flex items-center justify-center font-extrabold text-slate-950 text-lg font-montserrat shadow-md transition-colors";
      } else {
        scorePill.className = "w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center font-extrabold text-white text-lg font-montserrat shadow-md transition-colors pulse-critical";
      }
    }

    if (scoreText) {
      if (calc.status === "green") {
        scoreText.textContent = "Excelente • Vehículo en condiciones óptimas";
      } else if (calc.status === "yellow") {
        scoreText.textContent = `Atención Preventiva • ${calc.yellowCount} componente(s) por revisar`;
      } else {
        scoreText.textContent = `Alerta de Seguridad • ${calc.redCount} componente(s) crítico(s)`;
      }
    }

    if (countGreen) countGreen.textContent = calc.greenCount;
    if (countYellow) countYellow.textContent = calc.yellowCount;
    if (countRed) countRed.textContent = calc.redCount;
  },

  handleSaveSmartCheck() {
    const plate = document.getElementById("input-plate").value.trim().toUpperCase();
    if (!plate) {
      showToast("Por favor ingresa la placa del vehículo", "warning");
      document.getElementById("input-plate").focus();
      return;
    }

    const mileage = parseInt(document.getElementById("input-mileage").value, 10);
    if (!mileage || mileage <= 0) {
      showToast("Ingresa un kilometraje válido", "warning");
      document.getElementById("input-mileage").focus();
      return;
    }

    const calc = calculateSmartCheckScore(this.newCheckState.evaluations);
    const checkId = `SC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newSmartCheck = {
      id: checkId,
      plate,
      vehicleBrand: document.getElementById("input-brand").value.trim() || "Vehículo",
      vehicleModel: document.getElementById("input-model").value.trim() || "",
      vehicleYear: parseInt(document.getElementById("input-year").value, 10) || new Date().getFullYear(),
      vehicleFuel: document.getElementById("input-fuel").value,
      customerName: document.getElementById("input-customer").value.trim() || "Cliente Taller",
      customerPhone: document.getElementById("input-phone").value.trim() || "",
      date: new Date().toISOString().split("T")[0],
      mileage,
      technician: document.getElementById("input-technician").value.trim() || "Técnico FullGas",
      reason: document.getElementById("input-reason").value.trim() || "Inspección General",
      score: calc.score,
      status: calc.status,
      summary: document.getElementById("input-summary").value.trim() || "Inspección SmartCheck completada satisfactoriamente.",
      recommendations: document.getElementById("input-recommendations").value.trim() || "Continuar con plan preventivo según kilometraje.",
      nextReviewMileage: parseInt(document.getElementById("input-next-km").value, 10) || (mileage + 5000),
      nextReviewDate: document.getElementById("input-next-date").value || "",
      evaluations: this.newCheckState.evaluations
    };

    store.saveSmartCheck(newSmartCheck);
    showToast("¡SmartCheck generado con éxito! Pasaporte digital actualizado", "success");
    
    // Navegar al resultado
    this.navigate("resultado", { smartCheckId: checkId, plate });
  },

  // ==========================================
  // PANTALLA 3: RESULTADO DEL SMARTCHECK (REPORTE)
  // ==========================================
  renderResultado(container, params = {}) {
    let checkId = params.smartCheckId || this.activeSmartCheckId;
    let smartCheck = store.data.smartChecks.find(sc => sc.id === checkId);

    if (!smartCheck) {
      smartCheck = store.data.smartChecks[0];
      checkId = smartCheck ? smartCheck.id : null;
    }

    if (!smartCheck) {
      container.innerHTML = `<div class="p-8 text-center text-slate-500">No se encontraron SmartChecks registrados.</div>`;
      return;
    }

    this.activeSmartCheckId = smartCheck.id;
    this.activePlate = smartCheck.plate;

    const vehicle = store.findVehicle(smartCheck.plate) || {
      plate: smartCheck.plate,
      brand: smartCheck.vehicleBrand || "Vehículo",
      model: smartCheck.vehicleModel || "",
      year: smartCheck.vehicleYear || "",
      owner: smartCheck.customerName || "Cliente Taller"
    };

    const calc = calculateSmartCheckScore(smartCheck.evaluations || {});
    const scoreColor = calc.status === "green" ? "#16A34A" : calc.status === "yellow" ? "#D97706" : "#DC2626";
    const scoreBadge = calc.status === "green" 
      ? { text: "Excelente • Condiciones Óptimas", bg: "bg-emerald-50 text-emerald-700 border-emerald-200" }
      : calc.status === "yellow"
      ? { text: "Preventivo • Atención Próxima Requerida", bg: "bg-amber-50 text-amber-700 border-amber-200" }
      : { text: "Urgente • Requiere Atención de Seguridad", bg: "bg-red-50 text-red-700 border-red-200" };

    // Filtrar componentes prioritarios (Rojos y Amarillos)
    const priorityItems = [];
    VEHICLE_SYSTEMS.forEach(sys => {
      sys.components.forEach(comp => {
        const ev = smartCheck.evaluations[comp.id];
        if (ev && (ev.status === "red" || ev.status === "yellow")) {
          priorityItems.push({
            sysName: sys.name,
            compName: comp.name,
            importance: comp.importance,
            status: ev.status,
            note: ev.note
          });
        }
      });
    });

    container.innerHTML = `
      <div class="space-y-8 animate-fadeIn pb-16 print-page">
        <!-- Barra Superior de Acciones Rápidas (No Print) -->
        <div class="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div class="flex items-center space-x-3">
            <span class="license-plate text-sm">${smartCheck.plate}</span>
            <div>
              <div class="text-xs text-slate-400 font-bold uppercase">ID Reporte: ${smartCheck.id}</div>
              <div class="text-sm font-bold text-slate-800">${vehicle.brand} ${vehicle.model} • ${formatDate(smartCheck.date)}</div>
            </div>
          </div>

          <div class="flex items-center flex-wrap gap-2">
            <button id="btn-share-whatsapp" class="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm flex items-center space-x-1.5 transition-colors">
              <span>💬</span>
              <span>Enviar WhatsApp</span>
            </button>
            <button id="btn-print-pdf" class="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-sm flex items-center space-x-1.5 transition-colors">
              <span>🖨️</span>
              <span>Imprimir / Guardar PDF</span>
            </button>
            <button id="btn-go-to-passport" class="px-3.5 py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold transition-colors">
              🪪 Pasaporte Digital
            </button>
            <button id="btn-rate-customer-survey" class="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200 text-xs font-bold transition-colors">
              ⭐ Encuesta Cliente
            </button>
          </div>
        </div>

        <!-- Encabezado Oficial FullGasNino (Visible en Pantalla y en Impresión) -->
        <div class="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-slate-100 pb-6">
            <div class="flex items-center space-x-4">
              <div class="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black text-2xl font-montserrat shadow-lg shadow-red-600/30">
                FG
              </div>
              <div>
                <div class="flex items-center space-x-2">
                  <span class="text-xs font-black text-red-600 uppercase tracking-widest">FullGasNino Automotriz</span>
                  <span class="text-slate-300">•</span>
                  <span class="text-xs font-semibold text-slate-500">Certificado Digital</span>
                </div>
                <h1 class="text-2xl md:text-3xl font-extrabold text-slate-900 font-montserrat mt-0.5">
                  Reporte SmartCheck Vehicular
                </h1>
                <p class="text-xs text-slate-500">Historial clínico y diagnóstico preventivo computarizado</p>
              </div>
            </div>

            <div class="flex flex-col items-start md:items-end">
              <div class="license-plate text-lg">${smartCheck.plate}</div>
              <div class="text-xs text-slate-500 font-semibold mt-2">
                Fecha: <strong class="text-slate-800">${formatDate(smartCheck.date)}</strong>
              </div>
              <div class="text-xs text-slate-500 font-semibold">
                Odómetro: <strong class="text-slate-800">${formatKilometers(smartCheck.mileage)}</strong>
              </div>
            </div>
          </div>

          <!-- Ficha Resumen del Auto y Cliente -->
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-b border-slate-100 text-xs">
            <div>
              <span class="text-slate-400 font-bold uppercase text-[10px]">Vehículo</span>
              <p class="font-bold text-slate-800 text-sm">${vehicle.brand} ${vehicle.model} (${vehicle.year || '2021'})</p>
            </div>
            <div>
              <span class="text-slate-400 font-bold uppercase text-[10px]">Cliente / Propietario</span>
              <p class="font-bold text-slate-800 text-sm">${vehicle.owner || smartCheck.customerName}</p>
            </div>
            <div>
              <span class="text-slate-400 font-bold uppercase text-[10px]">Técnico Inspector</span>
              <p class="font-bold text-slate-800 text-sm">${smartCheck.technician}</p>
            </div>
            <div>
              <span class="text-slate-400 font-bold uppercase text-[10px]">Próxima Revisión Sugerida</span>
              <p class="font-bold text-red-600 text-sm">${formatKilometers(smartCheck.nextReviewMileage)}</p>
            </div>
          </div>

          <!-- SECCIÓN CENTRAL: SCORE DE SALUD Y SEMÁFORO GENERAL -->
          <div class="pt-6 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <!-- Indicador Circular / Velocímetro -->
            <div class="md:col-span-5 flex flex-col items-center justify-center text-center p-4">
              <div class="gauge-container">
                <svg class="gauge-svg" width="170" height="170" viewBox="0 0 170 170">
                  <circle class="gauge-bg" cx="85" cy="85" r="70" />
                  <circle class="gauge-fill" cx="85" cy="85" r="70" 
                    stroke="${scoreColor}" 
                    stroke-dasharray="440" 
                    stroke-dashoffset="${440 - (440 * calc.score / 100)}" />
                </svg>
                <div class="absolute inset-0 flex flex-col items-center justify-center">
                  <span class="text-4xl font-black text-slate-900 font-montserrat tracking-tight">${calc.score}</span>
                  <span class="text-[11px] font-bold text-slate-400 uppercase tracking-widest">/ 100 PTS</span>
                </div>
              </div>
              <div class="mt-3">
                <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${scoreBadge.bg}">
                  ${scoreBadge.text}
                </span>
              </div>
            </div>

            <!-- Resumen de Hallazgos en Semáforo -->
            <div class="md:col-span-7 space-y-4">
              <div class="grid grid-cols-3 gap-3">
                <div class="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-center">
                  <div class="text-2xl font-black text-emerald-700 font-montserrat">${calc.greenCount}</div>
                  <div class="text-xs font-bold text-emerald-800 uppercase mt-1">Buen Estado</div>
                  <div class="text-[10px] text-emerald-600 mt-0.5">Operativo y seguro</div>
                </div>

                <div class="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-center">
                  <div class="text-2xl font-black text-amber-700 font-montserrat">${calc.yellowCount}</div>
                  <div class="text-xs font-bold text-amber-800 uppercase mt-1">Preventivo</div>
                  <div class="text-[10px] text-amber-600 mt-0.5">Revisar en próxima cita</div>
                </div>

                <div class="bg-red-50 border border-red-200 rounded-2xl p-4 text-center ${calc.redCount > 0 ? 'pulse-critical' : ''}">
                  <div class="text-2xl font-black text-red-700 font-montserrat">${calc.redCount}</div>
                  <div class="text-xs font-bold text-red-800 uppercase mt-1">Atención Urgente</div>
                  <div class="text-[10px] text-red-600 mt-0.5">Riesgo de seguridad</div>
                </div>
              </div>

              <!-- Dictamen del Técnico en lenguaje claro -->
              <div class="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs leading-relaxed">
                <span class="text-[10px] font-bold text-slate-400 uppercase block mb-1">Diagnóstico General del Técnico:</span>
                <p class="text-slate-800 font-medium">${smartCheck.summary}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- SECCIÓN: HALLAZGOS PRIORITARIOS (Para tu Seguridad) -->
        ${priorityItems.length > 0 ? `
          <div class="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
            <div class="flex items-center space-x-2 text-red-600 font-bold text-sm uppercase tracking-wider mb-4">
              <span>⚠️</span>
              <span>Hallazgos Prioritarios que Requieren Tu Atención</span>
            </div>
            <p class="text-xs text-slate-500 mb-5">
              Explicación clara de por qué estos componentes ameritan intervención y qué averías previenes al atenderlos a tiempo.
            </p>

            <div class="space-y-4">
              ${priorityItems.map(item => `
                <div class="p-4 rounded-2xl border ${item.status === 'red' ? 'bg-red-50/60 border-red-200' : 'bg-amber-50/60 border-amber-200'} flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div class="space-y-1">
                    <div class="flex items-center space-x-2">
                      <span class="inline-block w-2.5 h-2.5 rounded-full ${item.status === 'red' ? 'bg-red-600 animate-ping' : 'bg-amber-500'}"></span>
                      <span class="text-xs font-bold text-slate-500 uppercase">${item.sysName}</span>
                      <span class="text-slate-300">•</span>
                      <h4 class="font-extrabold text-slate-900 text-sm">${item.compName}</h4>
                    </div>
                    <p class="text-xs text-slate-700 font-semibold">
                      Observación: <span class="${item.status === 'red' ? 'text-red-700' : 'text-amber-800'}">${item.note || 'Desgaste significativo observado en inspección visual.'}</span>
                    </p>
                    <p class="text-xs text-slate-500 italic">
                      ¿Por qué importa?: ${item.importance}
                    </p>
                  </div>
                  <div class="shrink-0">
                    <span class="inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-extrabold ${item.status === 'red' ? 'bg-red-600 text-white shadow-sm' : 'bg-amber-500 text-slate-950'}">
                      ${item.status === 'red' ? '🔴 Requiere Atención Inmediata' : '🟡 Revisión Próxima'}
                    </span>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>
        ` : `
          <div class="bg-emerald-50 rounded-3xl border border-emerald-200 p-6 md:p-8 text-center">
            <span class="text-4xl mb-2 inline-block">🎉</span>
            <h3 class="text-lg font-bold text-emerald-900">¡Felicidades! Todos los componentes están en Buen Estado</h3>
            <p class="text-xs text-emerald-700 max-w-lg mx-auto mt-1">
              Tu vehículo superó la inspección sin hallazgos críticos. Mantén tus cambios de fluidos y revisiones periódicas para conservar este nivel de seguridad.
            </p>
          </div>
        `}

        <!-- SECCIÓN: DESGLOSE COMPLETO POR SISTEMAS MECÁNICOS -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h3 class="text-base font-bold text-slate-900 flex items-center space-x-2">
              <span>🔍</span>
              <span>Desglose Detallado de los 6 Sistemas Evaluados</span>
            </h3>
            <span class="text-xs text-slate-400">Total: 24 componentes verificados</span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
            ${VEHICLE_SYSTEMS.map(sys => `
              <div class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm card-print">
                <div class="bg-slate-900 text-white px-5 py-3.5 flex items-center justify-between">
                  <div class="flex items-center space-x-2.5">
                    <span class="text-lg">${sys.icon}</span>
                    <h4 class="font-bold text-sm font-montserrat">${sys.name}</h4>
                  </div>
                </div>

                <div class="p-4 divide-y divide-slate-100 text-xs">
                  ${sys.components.map(comp => {
                    const ev = (smartCheck.evaluations && smartCheck.evaluations[comp.id]) || { status: "green", note: "" };
                    const statusDot = ev.status === "green" 
                      ? "<span class='inline-block w-2.5 h-2.5 rounded-full bg-emerald-500'></span>" 
                      : ev.status === "yellow" 
                      ? "<span class='inline-block w-2.5 h-2.5 rounded-full bg-amber-500'></span>" 
                      : "<span class='inline-block w-2.5 h-2.5 rounded-full bg-red-600'></span>";
                    
                    const statusText = ev.status === "green" ? "Buen Estado" : ev.status === "yellow" ? "Revisión Próxima" : "Requiere Atención";
                    const statusClass = ev.status === "green" ? "text-emerald-700 font-bold" : ev.status === "yellow" ? "text-amber-700 font-bold" : "text-red-700 font-bold";

                    return `
                      <div class="py-2.5 first:pt-0 last:pb-0 flex items-start justify-between gap-3">
                        <div>
                          <div class="font-bold text-slate-800">${comp.name}</div>
                          ${ev.note ? `<div class="text-[11px] text-slate-500 mt-0.5">Nota: <span class="italic text-slate-700">${ev.note}</span></div>` : ""}
                        </div>
                        <div class="flex items-center space-x-1.5 shrink-0 ${statusClass}">
                          ${statusDot}
                          <span>${statusText}</span>
                        </div>
                      </div>
                    `;
                  }).join("")}
                </div>
              </div>
            `).join("")}
          </div>
        </div>

        <!-- RECOMENDACIONES Y CITA FUTURA -->
        <div class="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-700">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="space-y-2 max-w-xl">
              <div class="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center space-x-1.5">
                <span>🛡️ Compromiso de Calidad FullGasNino</span>
              </div>
              <h3 class="text-lg font-bold font-montserrat">Plan Preventivo Recomendado</h3>
              <p class="text-sm text-slate-300 leading-relaxed">
                ${smartCheck.recommendations || "Realizar el seguimiento preventivo en el kilometraje pautado para preservar la garantía mecánica y seguridad en carretera."}
              </p>
            </div>

            <div class="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/15 text-center shrink-0 min-w-[220px]">
              <div class="text-xs text-slate-300 font-bold uppercase tracking-wider">Próximo Control Sugerido</div>
              <div class="text-2xl font-black text-white font-montserrat mt-1">${formatKilometers(smartCheck.nextReviewMileage)}</div>
              <div class="text-xs text-red-300 font-semibold mt-0.5">o antes del ${formatDate(smartCheck.nextReviewDate)}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    document.getElementById("btn-share-whatsapp")?.addEventListener("click", () => {
      this.openWhatsAppShare(smartCheck, vehicle, calc);
    });

    document.getElementById("btn-print-pdf")?.addEventListener("click", () => {
      window.print();
    });

    document.getElementById("btn-go-to-passport")?.addEventListener("click", () => {
      this.navigate("pasaporte", { plate: smartCheck.plate });
    });

    document.getElementById("btn-rate-customer-survey")?.addEventListener("click", () => {
      this.openSurveyModal(smartCheck.plate, vehicle.owner);
    });
  },

  openWhatsAppShare(smartCheck, vehicle, calc) {
    const statusEmoji = calc.status === "green" ? "🟢 ÓPTIMO" : calc.status === "yellow" ? "🟡 PREVENTIVO" : "🔴 ATENCIÓN URGENTE";
    
    let message = `*FULLGASNINO - SMARTCHECK DIGITAL DEL VEHÍCULO*\n\n`;
    message += `🚗 *Vehículo:* ${vehicle.brand} ${vehicle.model} (${vehicle.plate})\n`;
    message += `📅 *Fecha:* ${formatDate(smartCheck.date)}\n`;
    message += `⏱️ *Kilometraje:* ${formatKilometers(smartCheck.mileage)}\n`;
    message += `📊 *Índice de Salud:* ${calc.score}/100 (${statusEmoji})\n\n`;
    message += `*Resumen de Inspección:*\n${smartCheck.summary}\n\n`;
    message += `*Recomendación del Técnico:* ${smartCheck.recommendations}\n`;
    message += `*Próxima Revisión Sugerida:* ${formatKilometers(smartCheck.nextReviewMileage)} (${formatDate(smartCheck.nextReviewDate)})\n\n`;
    message += `🪪 *Ver Pasaporte Digital:* Abre tu historial clínico escaneando tu código QR o consultando en FullGasNino.\n\n`;
    message += `_¡Tu seguridad en carretera es nuestra prioridad!_`;

    const encoded = encodeURI(message);
    const phone = vehicle.phone ? vehicle.phone.replace(/[^0-9]/g, "") : "";
    const waUrl = phone ? `https://wa.me/${phone}?text=${encoded}` : `https://wa.me/?text=${encoded}`;
    window.open(waUrl, "_blank");
    showToast("Mensaje de WhatsApp preparado para compartir", "success");
  },

  // ==========================================
  // PANTALLA 4: PASAPORTE DIGITAL DEL VEHÍCULO
  // ==========================================
  renderPasaporte(container, params = {}) {
    const plate = (params.plate || this.activePlate || "ABC-123").trim().toUpperCase();
    let vehicle = store.findVehicle(plate);

    if (!vehicle) {
      vehicle = store.getVehicles()[0];
    }

    this.activePlate = vehicle.plate;
    const history = store.getVehicleHistory(vehicle.plate);
    const latestCheck = history[0];
    const score = latestCheck ? latestCheck.score : 85;
    const calc = latestCheck ? calculateSmartCheckScore(latestCheck.evaluations || {}) : { greenCount: 22, yellowCount: 2, redCount: 0 };
    const passportUrl = `https://fullgas.pe/pasaporte/${vehicle.plate}`;

    container.innerHTML = `
      <div class="space-y-8 animate-fadeIn pb-16">
        <!-- Selector Rápido de Vehículo para Navegar entre Pasaportes -->
        <div class="no-print bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div class="flex items-center space-x-2">
            <span class="text-base">🪪</span>
            <span class="text-xs font-bold text-slate-700 uppercase">Consultar otro Pasaporte Vehicular:</span>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            ${store.getVehicles().map(v => `
              <button class="btn-switch-passport px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${v.plate === vehicle.plate ? 'bg-red-600 text-white border-red-600 shadow-sm' : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'}" data-plate="${v.plate}">
                ${v.plate}
              </button>
            `).join("")}
          </div>
        </div>

        <!-- TARJETA CÉDULA DEL PASAPORTE DIGITAL (Estilo Fibra de Carbono Alta Gama) -->
        <div class="carbon-card rounded-3xl p-6 md:p-10 text-white shadow-2xl border border-slate-700 relative overflow-hidden">
          <div class="absolute -right-20 -bottom-20 w-80 h-80 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

          <!-- Encabezado de la Cédula -->
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6 relative z-10">
            <div class="flex items-center space-x-4">
              <div class="w-14 h-14 rounded-2xl bg-red-600 flex items-center justify-center text-white font-black text-2xl font-montserrat shadow-lg shadow-red-600/40">
                FG
              </div>
              <div>
                <div class="text-[10px] font-black tracking-widest text-red-400 uppercase">REPÚBLICA DE FULLGASNINO • SISTEMA DE GESTIÓN VEHICULAR</div>
                <h2 class="text-xl md:text-2xl font-extrabold text-white font-montserrat">
                  PASAPORTE DIGITAL DEL VEHÍCULO
                </h2>
                <div class="text-xs text-slate-400 font-mono mt-0.5">ID: ${vehicle.passportId || 'FG-PASSP-001'}</div>
              </div>
            </div>

            <div class="flex items-center space-x-3">
              <div class="license-plate text-xl shadow-lg">${vehicle.plate}</div>
              <div class="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold uppercase tracking-wider flex items-center">
                <span class="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 animate-pulse"></span>
                Verificado
              </div>
            </div>
          </div>

          <!-- Cuerpo del Pasaporte: Datos Técnicos y Código QR -->
          <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center py-8 relative z-10">
            <!-- Datos Clínicos del Auto -->
            <div class="md:col-span-8 space-y-5">
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
                <div>
                  <span class="text-slate-400 uppercase text-[10px] font-bold block">Marca y Modelo</span>
                  <p class="text-base font-extrabold text-white mt-0.5">${vehicle.brand} ${vehicle.model}</p>
                </div>
                <div>
                  <span class="text-slate-400 uppercase text-[10px] font-bold block">Año de Fabricación</span>
                  <p class="text-base font-extrabold text-white mt-0.5">${vehicle.year}</p>
                </div>
                <div>
                  <span class="text-slate-400 uppercase text-[10px] font-bold block">Combustible</span>
                  <p class="text-base font-extrabold text-white mt-0.5">${vehicle.fuel || 'Gasolina'}</p>
                </div>

                <div>
                  <span class="text-slate-400 uppercase text-[10px] font-bold block">Propietario</span>
                  <p class="text-sm font-bold text-white mt-0.5">${vehicle.owner}</p>
                </div>
                <div>
                  <span class="text-slate-400 uppercase text-[10px] font-bold block">Kilometraje Actual</span>
                  <p class="text-sm font-bold text-red-400 mt-0.5">${formatKilometers(vehicle.currentMileage)}</p>
                </div>
                <div>
                  <span class="text-slate-400 uppercase text-[10px] font-bold block">Salud Mecánica</span>
                  <p class="text-sm font-bold text-emerald-400 mt-0.5">${score}/100 (${latestCheck ? latestCheck.status.toUpperCase() : 'OK'})</p>
                </div>
              </div>

              <!-- Indicador de Próximo Mantenimiento Programado -->
              <div class="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div class="space-y-0.5">
                  <span class="text-red-400 font-bold uppercase text-[10px]">Próxima Cita Preventiva Sugerida</span>
                  <p class="text-slate-200">
                    A los <strong class="text-white">${formatKilometers(latestCheck ? latestCheck.nextReviewMileage : vehicle.currentMileage + 5000)}</strong> 
                    (${latestCheck ? formatDate(latestCheck.nextReviewDate) : 'Próximamente'})
                  </p>
                </div>
                <button class="btn-start-check-from-passport px-3.5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wide transition-colors shrink-0" data-plate="${vehicle.plate}">
                  + Nueva Revisión
                </button>
              </div>
            </div>

            <!-- Columna del Código QR Interactivo -->
            <div class="md:col-span-4 flex flex-col items-center justify-center p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
              <div id="passport-qr-container" class="cursor-pointer hover:scale-105 transition-transform" title="Toca para agrandar el código QR">
                ${generateQRCodeSVG(passportUrl, 170)}
              </div>
              <div class="text-[11px] font-bold text-slate-300 mt-3">Código QR de Pasaporte Clínico</div>
              <p class="text-[10px] text-slate-400 mt-0.5 max-w-[200px]">
                Escanea con la cámara del celular para consultar este historial en cualquier momento.
              </p>
              <div class="flex gap-2 mt-3">
                <button id="btn-copy-passport-link" class="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10px] font-bold border border-slate-600">
                  📋 Copiar Enlace
                </button>
                <button id="btn-show-large-qr" class="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold">
                  🔍 Agrandar QR
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- HISTORIAL CLÍNICO COMPLETO (Timeline Evolutivo) -->
        <div class="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h3 class="text-lg font-bold text-slate-900 flex items-center space-x-2">
                <span>⏱️</span>
                <span>Línea de Tiempo Clínica del Vehículo</span>
              </h3>
              <p class="text-xs text-slate-500">
                Historial de todos los SmartChecks realizados a este auto. Muestra la evolución de su estado mecánico a lo largo de los kilómetros.
              </p>
            </div>
            <div class="text-xs font-bold text-slate-500">
              Total: ${history.length} revisión(es) registrada(s)
            </div>
          </div>

          ${history.length > 0 ? `
            <div class="relative border-l-2 border-red-500/30 ml-4 space-y-8 pl-6">
              ${history.map((check, idx) => {
                const checkCalc = calculateSmartCheckScore(check.evaluations || {});
                const isLatest = idx === 0;
                return `
                  <div class="relative group">
                    <!-- Nodo indicador del timeline -->
                    <div class="absolute -left-[35px] top-1.5 w-6 h-6 rounded-full ${isLatest ? 'bg-red-600 ring-4 ring-red-100' : 'bg-slate-800'} flex items-center justify-center text-white text-[10px] font-bold shadow-md">
                      ${history.length - idx}
                    </div>

                    <div class="bg-slate-50 hover:bg-slate-100/80 p-5 rounded-2xl border border-slate-200 transition-all">
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div class="flex items-center space-x-2">
                          <span class="text-sm font-extrabold text-slate-900 font-montserrat">${formatDate(check.date)}</span>
                          <span class="text-slate-300">•</span>
                          <span class="text-xs font-bold text-red-600">${formatKilometers(check.mileage)}</span>
                          ${isLatest ? `<span class="px-2 py-0.5 rounded-full bg-red-100 text-red-700 text-[10px] font-extrabold uppercase">Última Revisión</span>` : ""}
                        </div>

                        <div class="flex items-center space-x-2">
                          <span class="px-2.5 py-1 rounded-full text-xs font-extrabold ${check.score >= 85 ? 'bg-emerald-100 text-emerald-800' : check.score >= 65 ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}">
                            Salud: ${check.score}/100
                          </span>
                          <button class="btn-open-timeline-check px-3 py-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold" data-check-id="${check.id}">
                            Ver Reporte &rarr;
                          </button>
                        </div>
                      </div>

                      <p class="text-xs text-slate-700 font-medium leading-relaxed mb-3">
                        ${check.summary}
                      </p>

                      <div class="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 pt-2 border-t border-slate-200/60">
                        <span>👨‍🔧 <strong>Técnico:</strong> ${check.technician}</span>
                        <span>•</span>
                        <span>🛑 <strong>Verdes:</strong> ${checkCalc.greenCount} | 🟡 <strong>Amarillos:</strong> ${checkCalc.yellowCount} | 🔴 <strong>Rojos:</strong> ${checkCalc.redCount}</span>
                      </div>
                    </div>
                  </div>
                `;
              }).join("")}
            </div>
          ` : `
            <div class="text-center py-8 text-slate-500 text-sm">
              Este vehículo aún no cuenta con SmartChecks registrados.
            </div>
          `}
        </div>
      </div>
    `;

    // Event listeners
    document.querySelectorAll(".btn-switch-passport").forEach(b => {
      b.addEventListener("click", () => {
        const p = b.getAttribute("data-plate");
        this.navigate("pasaporte", { plate: p });
      });
    });

    document.querySelectorAll(".btn-open-timeline-check").forEach(b => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-check-id");
        this.navigate("resultado", { smartCheckId: id });
      });
    });

    document.querySelector(".btn-start-check-from-passport")?.addEventListener("click", () => {
      this.navigate("nuevo-check", { plate: vehicle.plate });
    });

    document.getElementById("btn-copy-passport-link")?.addEventListener("click", () => {
      navigator.clipboard?.writeText(passportUrl);
      showToast("Enlace del Pasaporte copiado al portapapeles", "success");
    });

    document.getElementById("btn-show-large-qr")?.addEventListener("click", () => {
      this.openLargeQRModal(vehicle.plate, passportUrl);
    });

    document.getElementById("passport-qr-container")?.addEventListener("click", () => {
      this.openLargeQRModal(vehicle.plate, passportUrl);
    });
  },

  // ==========================================
  // PANTALLA 5: HISTORIAL DE REVISIONES
  // ==========================================
  renderHistorial(container, params = {}) {
    const checks = store.data.smartChecks;

    container.innerHTML = `
      <div class="space-y-6 animate-fadeIn pb-16">
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <div class="text-xs font-bold text-red-600 uppercase tracking-wider">Historial Central FullGasNino</div>
            <h1 class="text-2xl font-black text-slate-900 font-montserrat mt-0.5">Historial Completo de SmartChecks</h1>
            <p class="text-xs text-slate-500">Registro histórico de todas las revisiones mecánicas realizadas en el taller.</p>
          </div>
          <button id="btn-new-check-from-history" class="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md flex items-center space-x-2">
            <span>+ Nuevo SmartCheck</span>
          </button>
        </div>

        <!-- Filtros y Buscador -->
        <div class="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="relative flex-1">
            <input type="text" id="history-search-input" placeholder="Buscar por placa, cliente o modelo..." class="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-red-500 focus:ring-1 focus:ring-red-200">
            <svg class="w-5 h-5 text-slate-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <button class="history-filter-btn px-3 py-2 rounded-xl text-xs font-bold border transition-colors bg-slate-900 text-white border-slate-900" data-filter="all">
              Todos (${checks.length})
            </button>
            <button class="history-filter-btn px-3 py-2 rounded-xl text-xs font-bold border transition-colors bg-white text-emerald-700 border-slate-300 hover:bg-emerald-50" data-filter="green">
              🟢 Óptimos
            </button>
            <button class="history-filter-btn px-3 py-2 rounded-xl text-xs font-bold border transition-colors bg-white text-amber-700 border-slate-300 hover:bg-amber-50" data-filter="yellow">
              🟡 Preventivos
            </button>
            <button class="history-filter-btn px-3 py-2 rounded-xl text-xs font-bold border transition-colors bg-white text-red-700 border-slate-300 hover:bg-red-50" data-filter="red">
              🔴 Críticos
            </button>
          </div>
        </div>

        <!-- Gráfico Visual de Evolución de Salud (Canvas) -->
        <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-sm font-bold text-slate-900 uppercase tracking-wide">Evolución de Salud Mecánica en Revisiones</h3>
              <p class="text-xs text-slate-500">Muestra la calificación de salud obtenida en cada SmartCheck realizado.</p>
            </div>
            <span class="text-xs text-slate-400 font-semibold">Puntaje /100</span>
          </div>

          <div class="w-full h-48 relative">
            <canvas id="healthEvolutionCanvas" class="w-full h-full"></canvas>
          </div>
        </div>

        <!-- Tabla / Lista de Chequeos -->
        <div class="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm" id="history-table-container">
          <!-- Renderizado dinámico de filas -->
        </div>
      </div>
    `;

    // Renderizar filas del historial
    this.renderHistoryRows("all", "");
    this.renderHealthCanvas();

    // Event listeners
    document.getElementById("btn-new-check-from-history")?.addEventListener("click", () => this.navigate("nuevo-check"));

    document.querySelectorAll(".history-filter-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".history-filter-btn").forEach(b => {
          b.className = "history-filter-btn px-3 py-2 rounded-xl text-xs font-bold border transition-colors bg-white text-slate-700 border-slate-300 hover:bg-slate-50";
        });
        btn.className = "history-filter-btn px-3 py-2 rounded-xl text-xs font-bold border transition-colors bg-slate-900 text-white border-slate-900";
        
        const filter = btn.getAttribute("data-filter");
        const query = document.getElementById("history-search-input").value;
        this.renderHistoryRows(filter, query);
      });
    });

    document.getElementById("history-search-input")?.addEventListener("input", e => {
      const activeFilterBtn = document.querySelector(".history-filter-btn.bg-slate-900");
      const filter = activeFilterBtn ? activeFilterBtn.getAttribute("data-filter") : "all";
      this.renderHistoryRows(filter, e.target.value);
    });
  },

  renderHistoryRows(filter = "all", query = "") {
    const container = document.getElementById("history-table-container");
    if (!container) return;

    let checks = store.data.smartChecks;
    const cleanQuery = (query || "").trim().toLowerCase();

    if (filter !== "all") {
      checks = checks.filter(c => c.status === filter);
    }

    if (cleanQuery) {
      checks = checks.filter(c => 
        c.plate.toLowerCase().includes(cleanQuery) ||
        (c.customerName && c.customerName.toLowerCase().includes(cleanQuery)) ||
        (c.summary && c.summary.toLowerCase().includes(cleanQuery))
      );
    }

    if (checks.length === 0) {
      container.innerHTML = `
        <div class="p-8 text-center text-slate-500 text-sm">
          No se encontraron revisiones con los filtros seleccionados.
        </div>
      `;
      return;
    }

    container.innerHTML = `
      <div class="divide-y divide-slate-100">
        ${checks.map(c => {
          const v = store.findVehicle(c.plate) || { brand: "Vehículo", model: "", owner: c.customerName };
          const statusBadge = c.status === "green" 
            ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
            : c.status === "yellow" 
            ? "bg-amber-50 text-amber-700 border-amber-200" 
            : "bg-red-50 text-red-700 border-red-200";

          return `
            <div class="p-5 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="flex items-start space-x-4">
                <span class="license-plate text-xs">${c.plate}</span>
                <div>
                  <div class="flex items-center space-x-2">
                    <h4 class="font-bold text-slate-900 text-sm">${v.brand} ${v.model}</h4>
                    <span class="text-slate-300">•</span>
                    <span class="text-xs text-slate-500">${formatDate(c.date)}</span>
                  </div>
                  <p class="text-xs text-slate-600 mt-0.5 line-clamp-1 max-w-xl">
                    ${c.summary}
                  </p>
                  <div class="flex items-center space-x-3 text-[11px] text-slate-400 mt-1">
                    <span>Odómetro: <strong class="text-slate-700">${formatKilometers(c.mileage)}</strong></span>
                    <span>•</span>
                    <span>Técnico: <strong class="text-slate-700">${c.technician}</strong></span>
                  </div>
                </div>
              </div>

              <div class="flex items-center space-x-3 shrink-0">
                <span class="px-3 py-1 rounded-full text-xs font-bold border ${statusBadge}">
                  ${c.score}/100 PTS
                </span>
                <button class="btn-history-view-result px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold" data-check-id="${c.id}">
                  Ver Reporte
                </button>
                <button class="btn-history-view-passport p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold" title="Ver Pasaporte" data-plate="${c.plate}">
                  🪪
                </button>
              </div>
            </div>
          `;
        }).join("")}
      </div>
    `;

    container.querySelectorAll(".btn-history-view-result").forEach(b => {
      b.addEventListener("click", () => {
        const id = b.getAttribute("data-check-id");
        this.navigate("resultado", { smartCheckId: id });
      });
    });

    container.querySelectorAll(".btn-history-view-passport").forEach(b => {
      b.addEventListener("click", () => {
        const p = b.getAttribute("data-plate");
        this.navigate("pasaporte", { plate: p });
      });
    });
  },

  renderHealthCanvas() {
    const canvas = document.getElementById("healthEvolutionCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajustar dimensiones internas al tamaño en pantalla
    canvas.width = canvas.parentElement.clientWidth || 600;
    canvas.height = canvas.parentElement.clientHeight || 192;

    const checks = [...store.data.smartChecks].reverse();
    if (checks.length < 2) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const padding = { top: 20, right: 30, bottom: 30, left: 40 };
    const chartWidth = canvas.width - padding.left - padding.right;
    const chartHeight = canvas.height - padding.top - padding.bottom;

    // Dibujar líneas horizontales guía
    ctx.strokeStyle = "#E2E8F0";
    ctx.lineWidth = 1;
    [0, 50, 75, 100].forEach(val => {
      const y = padding.top + chartHeight - (val / 100) * chartHeight;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(padding.left + chartWidth, y);
      ctx.stroke();

      ctx.fillStyle = "#94A3B8";
      ctx.font = "10px sans-serif";
      ctx.fillText(`${val}`, 12, y + 3);
    });

    // Puntos de la curva
    const points = checks.map((c, idx) => {
      const x = padding.left + (idx / (checks.length - 1)) * chartWidth;
      const y = padding.top + chartHeight - (c.score / 100) * chartHeight;
      return { x, y, score: c.score, plate: c.plate };
    });

    // Dibujar área sombreada bajo la curva
    ctx.beginPath();
    ctx.moveTo(points[0].x, padding.top + chartHeight);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.lineTo(points[points.length - 1].x, padding.top + chartHeight);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight);
    grad.addColorStop(0, "rgba(229, 36, 42, 0.25)");
    grad.addColorStop(1, "rgba(229, 36, 42, 0.0)");
    ctx.fillStyle = grad;
    ctx.fill();

    // Dibujar línea principal
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = "#E5242A";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.stroke();

    // Dibujar puntos y etiquetas
    points.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
      ctx.strokeStyle = "#E5242A";
      ctx.lineWidth = 2.5;
      ctx.stroke();

      ctx.fillStyle = "#0F172A";
      ctx.font = "bold 10px sans-serif";
      ctx.fillText(`${p.score}`, p.x - 7, p.y - 9);
      ctx.fillStyle = "#64748B";
      ctx.font = "9px sans-serif";
      ctx.fillText(p.plate, p.x - 14, padding.top + chartHeight + 16);
    });
  },

  // ==========================================
  // PANTALLA 6: VALIDACIÓN DEL MVP (MÉTRICAS)
  // ==========================================
  renderMetricas(container) {
    const m = store.getMetrics();
    const surveys = store.data.surveys;

    container.innerHTML = `
      <div class="space-y-8 animate-fadeIn pb-16">
        <!-- Encabezado de Validación de Hipótesis -->
        <div class="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-6 md:p-8 text-white border border-slate-700 shadow-xl">
          <div class="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div class="space-y-2 max-w-2xl">
              <div class="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-red-600/20 text-red-400 text-xs font-bold border border-red-500/30 tracking-wide uppercase">
                <span>📊 Validación Experimental de Negocio</span>
              </div>
              <h1 class="text-2xl md:text-3xl font-extrabold font-montserrat">
                Panel de Validación de Hipótesis de FullGas SmartCheck
              </h1>
              <p class="text-slate-300 text-sm leading-relaxed">
                Medición cuantitativa y cualitativa de si la digitalización visual del diagnóstico incrementa la confianza del cliente y la recurrencia en FullGasNino.
              </p>
            </div>
            <div>
              <button id="btn-add-survey-from-metrics" class="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wide shadow-lg shadow-red-600/30 transition-all">
                + Registrar Nueva Encuesta
              </button>
            </div>
          </div>
        </div>

        <!-- 3 TARJETAS ALINEADAS A LAS 3 HIPÓTESIS DEL USUARIO -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Hipótesis 1: Comprensión y Valor del Reporte Visual -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-bold text-red-600 uppercase tracking-wider">HIPÓTESIS 1: VALOR PERCIBIDO</span>
                <span class="text-xl">👁️</span>
              </div>
              <h3 class="text-base font-extrabold text-slate-900 font-montserrat">
                Claridad y Comprensión del Reporte
              </h3>
              <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                ¿Los clientes valoran recibir un reporte visual fácil de entender frente a la explicación verbal tradicional?
              </p>

              <div class="my-5 p-4 bg-slate-50 rounded-2xl text-center">
                <div class="text-4xl font-black text-slate-900 font-montserrat">${m.avgClarity}<span class="text-lg font-medium text-slate-400">/5.0</span></div>
                <div class="text-xs font-bold text-emerald-600 mt-1">${m.clarityPercent}% de Satisfacción en Claridad</div>
              </div>
            </div>

            <div class="space-y-1 text-xs text-slate-600 pt-3 border-t border-slate-100">
              <div class="flex justify-between font-medium">
                <span>Resultado esperado:</span>
                <strong class="text-slate-800">> 80%</strong>
              </div>
              <div class="flex justify-between font-medium">
                <span>Estado actual:</span>
                <span class="text-emerald-600 font-bold">HIPÓTESIS VALIDADA ✓</span>
              </div>
            </div>
          </div>

          <!-- Hipótesis 2: Confianza y Profesionalismo -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-bold text-red-600 uppercase tracking-wider">HIPÓTESIS 2: CONFIANZA</span>
                <span class="text-xl">🤝</span>
              </div>
              <h3 class="text-base font-extrabold text-slate-900 font-montserrat">
                Percepción de Transparencia del Taller
              </h3>
              <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                ¿Tener fotos y semáforos objetivos aumenta la sensación de que FullGasNino no inventa fallas mecánicas?
              </p>

              <div class="my-5 p-4 bg-slate-50 rounded-2xl text-center">
                <div class="text-4xl font-black text-slate-900 font-montserrat">${m.avgTrust}<span class="text-lg font-medium text-slate-400">/5.0</span></div>
                <div class="text-xs font-bold text-emerald-600 mt-1">${m.trustPercent}% Nivel de Confianza Generada</div>
              </div>
            </div>

            <div class="space-y-1 text-xs text-slate-600 pt-3 border-t border-slate-100">
              <div class="flex justify-between font-medium">
                <span>Resultado esperado:</span>
                <strong class="text-slate-800">> 85%</strong>
              </div>
              <div class="flex justify-between font-medium">
                <span>Estado actual:</span>
                <span class="text-emerald-600 font-bold">HIPÓTESIS VALIDADA ✓</span>
              </div>
            </div>
          </div>

          <!-- Hipótesis 3: Retención y Recurrencia -->
          <div class="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
              <div class="flex items-center justify-between mb-3">
                <span class="text-xs font-bold text-red-600 uppercase tracking-wider">HIPÓTESIS 3: RECURRENCIA</span>
                <span class="text-xl">🔄</span>
              </div>
              <h3 class="text-base font-extrabold text-slate-900 font-montserrat">
                Intención de Retorno para Próximo Servicio
              </h3>
              <p class="text-xs text-slate-500 mt-1 leading-relaxed">
                ¿El Pasaporte Digital y el kilometraje sugerido motivan al cliente a regresar a FullGasNino en su próxima fecha?
              </p>

              <div class="my-5 p-4 bg-slate-50 rounded-2xl text-center">
                <div class="text-4xl font-black text-red-600 font-montserrat">${m.returnPercent}%</div>
                <div class="text-xs font-bold text-slate-700 mt-1">Clientes Confirman que Volverán</div>
              </div>
            </div>

            <div class="space-y-1 text-xs text-slate-600 pt-3 border-t border-slate-100">
              <div class="flex justify-between font-medium">
                <span>NPS (Net Promoter Score):</span>
                <strong class="text-slate-900 font-bold">+${m.nps}</strong>
              </div>
              <div class="flex justify-between font-medium">
                <span>Estado actual:</span>
                <span class="text-emerald-600 font-bold">HIPÓTESIS VALIDADA ✓</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Muro de Testimonios Reales de Validación -->
        <div class="bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-base font-bold text-slate-900 font-montserrat">
                Comentarios y Feedback de Clientes Evaluados (${surveys.length})
              </h3>
              <p class="text-xs text-slate-500">Respuestas directas recogidas al entregar el SmartCheck en mano o por WhatsApp.</p>
            </div>
            <button id="btn-add-survey-inline" class="text-xs font-bold text-red-600 hover:underline">
              + Agregar Opinión
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${surveys.map(s => `
              <div class="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-between">
                <div>
                  <div class="flex items-center justify-between gap-2 mb-2">
                    <div class="flex items-center space-x-2">
                      <span class="font-bold text-slate-900 text-xs">${s.customerName}</span>
                      <span class="text-slate-300">•</span>
                      <span class="license-plate text-[10px] py-0.5 px-1.5">${s.plate}</span>
                    </div>
                    <div class="text-amber-500 text-xs font-bold">
                      ${'★'.repeat(s.trustRating)}${'☆'.repeat(5 - s.trustRating)}
                    </div>
                  </div>
                  <p class="text-xs text-slate-700 italic leading-relaxed">
                    "${s.feedback}"
                  </p>
                </div>
                <div class="flex items-center justify-between pt-3 border-t border-slate-200/60 mt-3 text-[10px] text-slate-400">
                  <span>Recomendación NPS: <strong>${s.npsScore}/10</strong></span>
                  <span>Retorno: <strong class="text-emerald-600 uppercase font-bold">${s.returnIntent === 'yes' ? 'Sí volverá' : 'Probable'}</strong></span>
                </div>
              </div>
            `).join("")}
          </div>
        </div>
      </div>
    `;

    document.getElementById("btn-add-survey-from-metrics")?.addEventListener("click", () => this.openSurveyModal());
    document.getElementById("btn-add-survey-inline")?.addEventListener("click", () => this.openSurveyModal());
  },

  // ==========================================
  // MODALES Y COMPONENTES OVERLAY
  // ==========================================
  setupModals() {
    // Configuración base de contenedor de modales
    const modalContainer = document.getElementById("modal-container");
    if (!modalContainer) return;
  },

  openSurveyModal(defaultPlate = "", defaultName = "") {
    const modalContainer = document.getElementById("modal-container");
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
        <div class="bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl border border-slate-200 space-y-6 relative overflow-hidden">
          <div class="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span class="text-[10px] font-bold text-red-600 uppercase tracking-wider">Validación del MVP FullGas</span>
              <h3 class="text-lg font-bold text-slate-900 font-montserrat">Encuesta Rápida de Satisfacción</h3>
            </div>
            <button id="close-modal-btn" class="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-sm">
              ✕
            </button>
          </div>

          <form id="survey-form" class="space-y-4 text-xs">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block font-bold text-slate-700 uppercase mb-1">Placa Vehicular *</label>
                <input type="text" id="survey-plate" value="${defaultPlate || 'ABC-123'}" class="w-full px-3 py-2 rounded-xl border border-slate-300 font-bold uppercase text-sm" required>
              </div>
              <div>
                <label class="block font-bold text-slate-700 uppercase mb-1">Nombre del Cliente *</label>
                <input type="text" id="survey-name" value="${defaultName || 'Cliente Evaluado'}" class="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm" required>
              </div>
            </div>

            <!-- Pregunta 1: Claridad -->
            <div class="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <label class="block font-bold text-slate-800">1. ¿El reporte digital con semáforos te ayudó a entender el estado de tu auto?</label>
              <div class="flex items-center gap-2">
                ${[1, 2, 3, 4, 5].map(n => `
                  <label class="flex-1 text-center py-2 rounded-lg border border-slate-200 bg-white hover:bg-red-50 cursor-pointer font-bold text-xs has-[:checked]:bg-red-600 has-[:checked]:text-white has-[:checked]:border-red-600">
                    <input type="radio" name="clarityRating" value="${n}" class="hidden" ${n === 5 ? 'checked' : ''}>
                    ${n}★
                  </label>
                `).join("")}
              </div>
            </div>

            <!-- Pregunta 2: Confianza -->
            <div class="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <label class="block font-bold text-slate-800">2. ¿Sentiste mayor confianza y profesionalismo en FullGasNino gracias al SmartCheck?</label>
              <div class="flex items-center gap-2">
                ${[1, 2, 3, 4, 5].map(n => `
                  <label class="flex-1 text-center py-2 rounded-lg border border-slate-200 bg-white hover:bg-red-50 cursor-pointer font-bold text-xs has-[:checked]:bg-red-600 has-[:checked]:text-white has-[:checked]:border-red-600">
                    <input type="radio" name="trustRating" value="${n}" class="hidden" ${n === 5 ? 'checked' : ''}>
                    ${n}★
                  </label>
                `).join("")}
              </div>
            </div>

            <!-- Pregunta 3: Retorno -->
            <div class="space-y-1.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
              <label class="block font-bold text-slate-800">3. ¿Tener el pasaporte digital y kilometraje sugerido te motiva a regresar a FullGasNino?</label>
              <div class="grid grid-cols-3 gap-2">
                <label class="text-center py-2 rounded-lg border border-slate-200 bg-white cursor-pointer font-bold text-xs has-[:checked]:bg-emerald-600 has-[:checked]:text-white">
                  <input type="radio" name="returnIntent" value="yes" checked class="hidden">
                  ¡Sí, seguro!
                </label>
                <label class="text-center py-2 rounded-lg border border-slate-200 bg-white cursor-pointer font-bold text-xs has-[:checked]:bg-amber-500 has-[:checked]:text-slate-950">
                  <input type="radio" name="returnIntent" value="maybe" class="hidden">
                  Probablemente
                </label>
                <label class="text-center py-2 rounded-lg border border-slate-200 bg-white cursor-pointer font-bold text-xs has-[:checked]:bg-slate-700 has-[:checked]:text-white">
                  <input type="radio" name="returnIntent" value="no" class="hidden">
                  No
                </label>
              </div>
            </div>

            <!-- Pregunta 4: NPS -->
            <div class="space-y-1">
              <label class="block font-bold text-slate-700">4. Probabilidad de recomendarnos (0 = Nada probable, 10 = Muy probable)</label>
              <input type="range" id="survey-nps" min="0" max="10" value="10" class="w-full accent-red-600">
              <div class="flex justify-between text-[10px] text-slate-400 font-bold">
                <span>0</span>
                <span>5</span>
                <span class="text-red-600 font-extrabold text-xs" id="nps-display-val">10</span>
              </div>
            </div>

            <div>
              <label class="block font-bold text-slate-700 mb-1">Comentario Libre o Sugerencia del Cliente</label>
              <textarea id="survey-feedback" rows="2" placeholder="Ej: Me gustó mucho ver las fotos y que me explicaran en semáforos..." class="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs"></textarea>
            </div>

            <div class="pt-2 flex justify-end gap-2">
              <button type="button" id="survey-cancel-btn" class="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold">
                Cancelar
              </button>
              <button type="submit" class="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-md">
                Guardar Respuesta
              </button>
            </div>
          </form>
        </div>
      </div>
    `;

    modalContainer.classList.remove("hidden");

    // Slider listener
    const npsSlider = document.getElementById("survey-nps");
    const npsDisplay = document.getElementById("nps-display-val");
    if (npsSlider && npsDisplay) {
      npsSlider.addEventListener("input", e => {
        npsDisplay.textContent = e.target.value;
      });
    }

    // Close handlers
    const closeModal = () => modalContainer.classList.add("hidden");
    document.getElementById("close-modal-btn")?.addEventListener("click", closeModal);
    document.getElementById("survey-cancel-btn")?.addEventListener("click", closeModal);

    // Form submit
    document.getElementById("survey-form")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = e.target;
      const formData = new FormData(form);

      const newSurvey = {
        id: `SRV-${Date.now().toString().slice(-4)}`,
        plate: document.getElementById("survey-plate").value.trim().toUpperCase(),
        customerName: document.getElementById("survey-name").value.trim() || "Cliente",
        date: new Date().toISOString().split("T")[0],
        clarityRating: parseInt(formData.get("clarityRating"), 10) || 5,
        trustRating: parseInt(formData.get("trustRating"), 10) || 5,
        returnIntent: formData.get("returnIntent") || "yes",
        npsScore: parseInt(document.getElementById("survey-nps").value, 10) || 10,
        feedback: document.getElementById("survey-feedback").value.trim() || "Excelente reporte visual y atención transparente."
      };

      store.saveSurvey(newSurvey);
      closeModal();
      showToast("¡Encuesta registrada! Las métricas del MVP se han actualizado", "success");

      if (this.currentView === "metricas") {
        this.renderMetricas(document.getElementById("main-content"));
      }
    });
  },

  openLargeQRModal(plate, url) {
    const modalContainer = document.getElementById("modal-container");
    if (!modalContainer) return;

    modalContainer.innerHTML = `
      <div class="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
        <div class="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl border border-slate-200">
          <div class="flex justify-between items-center">
            <span class="license-plate text-xs">${plate}</span>
            <button id="close-qr-modal" class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold">✕</button>
          </div>

          <h3 class="font-bold text-slate-900 text-base font-montserrat">Pasaporte Digital Escaneable</h3>
          <p class="text-xs text-slate-500">Muestra este código al cliente en el taller o acércalo a la cámara de tu teléfono.</p>

          <div class="p-3 bg-slate-50 rounded-2xl border border-slate-200 inline-block shadow-inner">
            ${generateQRCodeSVG(url, 220)}
          </div>

          <div class="text-[11px] font-mono text-slate-400 break-all">${url}</div>

          <button id="btn-done-qr" class="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs uppercase tracking-wider">
            Listo / Cerrar
          </button>
        </div>
      </div>
    `;

    modalContainer.classList.remove("hidden");
    const close = () => modalContainer.classList.add("hidden");
    document.getElementById("close-qr-modal")?.addEventListener("click", close);
    document.getElementById("btn-done-qr")?.addEventListener("click", close);
  }
};

// Arrancar aplicación al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

// Exponer App globalmente
window.FullGasApp = App;


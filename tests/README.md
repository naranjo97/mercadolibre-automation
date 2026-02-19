#  Automatización Mercado Libre - Playwright

Proyecto de automatización de pruebas para validar la funcionalidad de búsqueda en Mercado Libre Colombia.

## 📋 Casos de Prueba Implementados

| ID | Caso de Prueba | Estado |
|----|----------------|--------|
| TC001 | Búsqueda básica de productos | ✅ Passed |
| TC002 | Validar relevancia de resultados (>80%) | ✅ Passed |
| TC003 | Validar que productos tienen precio | ✅ Passed |
| TC004 | Validar estructura (título, imagen, precio) | ✅ Passed |
| TC005 | Extraer datos completos de TOP 5 | ✅ Passed |
| TC006 | Navegación a detalle de producto | ✅ Passed |

## 🎯 Funcionalidades Validadas

- ✅ Campo de búsqueda funcional
- ✅ Resultados relevantes según término buscado
- ✅ Visualización de precios
- ✅ Estructura correcta de productos
- ✅ Extracción de datos (web scraping)
- ✅ Navegación entre páginas

## 🛠️ Tecnologías

- **Playwright** v1.49.1
- **TypeScript** 5.x
- **Node.js** 18+

## 📦 Instalación
```bash
# Instalar dependencias
npm install

# Instalar navegadores
npx playwright install
```

## ▶️ Ejecución
```bash
# Ejecutar todos los tests
npx playwright test

# Ejecutar solo la suite de Mercado Libre
npx playwright test mercadolibre

# Ejecutar un test específico
npx playwright test -g "TC001"

# Ver reporte HTML
npx playwright show-report
```

## 📊 Ejemplo de Salida
```
✅ TC001 PASSED
   Productos encontrados: 48

✅ TC002 PASSED
   Relevancia: 100.0%
   Productos relevantes: 48/48

✅ TC003 PASSED
   Productos con precio: 10/10

✅ TC005 PASSED

📱 TOP 5 PRODUCTOS:
1. Apple iPhone 15 Pro (512 GB) - Titanio Azul
   💰 $2.695.324 COP - Reacondicionado
...
```

## 📁 Estructura del Proyecto
```
playwright-test/
├── tests/
│   ├── mercadolibre.spec.ts  # Suite completa de tests
│   └── example.spec.ts        # Test original (backup)
├── playwright.config.ts       # Configuración
├── package.json
└── README.md                  # Esta documentación
```

## 👤 Autor

Automatización desarrollada para validar funcionalidades de Mercado Libre.

## 📅 Fecha

Febrero 2026
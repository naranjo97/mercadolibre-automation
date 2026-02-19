import { test, expect } from '@playwright/test';

// ============================================
// TEST SUITE: Mercado Libre - Búsqueda de Productos
// ============================================

test.describe('Mercado Libre - Búsqueda de iPhone', () => {
  
  // TEST 1: Búsqueda básica (tu test original mejorado)
  test('TC001 - Debe encontrar productos al buscar iPhone', async ({ page }) => {
    await page.goto("https://www.mercadolibre.com.co");
    await page.waitForTimeout(2000);
    
    await page.fill('input#cb1-edit', 'iPhone 15');
    await page.press('input#cb1-edit', 'Enter');
    await page.waitForTimeout(5000);
    
    const productos = page.locator('li.ui-search-layout__item');
    const cantidad = await productos.count();
    
    // Validaciones
    expect(cantidad).toBeGreaterThan(0);
    expect(cantidad).toBeLessThanOrEqual(60);
    
    console.log(`\n✅ TC001 PASSED`);
    console.log(`   Productos encontrados: ${cantidad}`);
  });

  // TEST 2: Validar relevancia de resultados
  test('TC002 - Los resultados deben contener la palabra iPhone', async ({ page }) => {
    await page.goto("https://www.mercadolibre.com.co");
    await page.waitForTimeout(2000);
    
    await page.fill('input#cb1-edit', 'iPhone 15 Pro');
    await page.press('input#cb1-edit', 'Enter');
    await page.waitForTimeout(5000);
    
    const productos = page.locator('li.ui-search-layout__item');
    const titulos = await productos.locator('.poly-component__title').allInnerTexts();
    
    const productosRelevantes = titulos.filter(t => 
      t.toLowerCase().includes('iphone') || t.toLowerCase().includes('apple')
    );
    
    const porcentajeRelevante = (productosRelevantes.length / titulos.length) * 100;
    
    expect(porcentajeRelevante).toBeGreaterThan(80);
    
    console.log(`\n✅ TC002 PASSED`);
    console.log(`   Relevancia: ${porcentajeRelevante.toFixed(1)}%`);
    console.log(`   Productos relevantes: ${productosRelevantes.length}/${titulos.length}`);
  });

  // TEST 3: Validar precios
  test('TC003 - Los productos deben mostrar precio', async ({ page }) => {
    await page.goto("https://www.mercadolibre.com.co");
    await page.waitForTimeout(2000);
    
    await page.fill('input#cb1-edit', 'iPhone');
    await page.press('input#cb1-edit', 'Enter');
    await page.waitForTimeout(5000);
    
    const productos = page.locator('li.ui-search-layout__item');
    const cantidad = await productos.count();
    
    let productosConPrecio = 0;
    
    for (let i = 0; i < Math.min(10, cantidad); i++) {
      const producto = productos.nth(i);
      const precio = await producto.locator('.andes-money-amount__fraction').first().innerText().catch(() => null);
      
      if (precio && precio !== 'N/A') {
        productosConPrecio++;
      }
    }
    
    expect(productosConPrecio).toBeGreaterThanOrEqual(8);
    
    console.log(`\n✅ TC003 PASSED`);
    console.log(`   Productos con precio: ${productosConPrecio}/10`);
  });

  // TEST 4: Validar estructura completa
  test('TC004 - Producto debe tener título, precio e imagen', async ({ page }) => {
    await page.goto("https://www.mercadolibre.com.co");
    await page.waitForTimeout(2000);
    
    await page.fill('input#cb1-edit', 'iPhone 15');
    await page.press('input#cb1-edit', 'Enter');
    await page.waitForTimeout(5000);
    
    const primerProducto = page.locator('li.ui-search-layout__item').first();
    
    // Validar título
    const titulo = await primerProducto.locator('.poly-component__title').innerText();
    expect(titulo.length).toBeGreaterThan(0);
    
    // Validar imagen
    const imagen = primerProducto.locator('.poly-component__picture');
    await expect(imagen).toBeVisible();
    
    // Validar precio
    const tienePrecio = await primerProducto.locator('.andes-money-amount__fraction').count();
    expect(tienePrecio).toBeGreaterThan(0);
    
    console.log(`\n✅ TC004 PASSED`);
    console.log(`   Título: ${titulo.substring(0, 50)}...`);
    console.log(`   Imagen: Visible`);
    console.log(`   Precio: Presente`);
  });

  // TEST 5: Extraer datos completos
  test('TC005 - Extraer información detallada de productos', async ({ page }) => {
    await page.goto("https://www.mercadolibre.com.co");
    await page.waitForTimeout(2000);
    
    await page.fill('input#cb1-edit', 'iPhone 15 Pro');
    await page.press('input#cb1-edit', 'Enter');
    await page.waitForTimeout(5000);
    
    const productos = page.locator('li.ui-search-layout__item');
    const datosProductos = [];
    
    for (let i = 0; i < Math.min(5, await productos.count()); i++) {
      const producto = productos.nth(i);
      
      const titulo = await producto.locator('.poly-component__title').innerText();
      const precio = await producto.locator('.andes-money-amount__fraction').first().innerText().catch(() => 'N/A');
      const condicion = await producto.locator('.poly-component__item-condition').innerText().catch(() => 'Nuevo');
      
      datosProductos.push({ titulo, precio, condicion });
    }
    
    expect(datosProductos.length).toBe(5);
    
    console.log('\n✅ TC005 PASSED');
    console.log('\n📱 TOP 5 PRODUCTOS:\n');
    datosProductos.forEach((p, i) => {
      console.log(`${i + 1}. ${p.titulo}`);
      console.log(`   💰 $${p.precio} COP - ${p.condicion}\n`);
    });
  });

  // TEST 6: Navegación a detalle
  test('TC006 - Click en producto abre página de detalle', async ({ page }) => {
    await page.goto("https://www.mercadolibre.com.co");
    await page.waitForTimeout(2000);
    
    await page.fill('input#cb1-edit', 'iPhone');
    await page.press('input#cb1-edit', 'Enter');
    await page.waitForTimeout(5000);
    
    const tituloOriginal = await page.locator('.poly-component__title').first().innerText();
    
    await page.locator('.poly-component__title').first().click();
    await page.waitForTimeout(3000);
    
    const urlActual = page.url();
    expect(urlActual).toContain('mercadolibre.com.co');
    expect(urlActual).not.toContain('/listado');
    
    const tituloDetalle = await page.locator('h1').first().innerText();
    expect(tituloDetalle.length).toBeGreaterThan(0);
    
    console.log(`\n✅ TC006 PASSED`);
    console.log(`   Navegación exitosa a detalle`);
    console.log(`   Producto: ${tituloOriginal.substring(0, 60)}...`);
  });

});
import { test, expect } from '@playwright/test';

test('Buscar iPhone en Mercado Libre', async ({ page }) => {
  
  await page.goto("https://www.mercadolibre.com.co");
  await page.waitForTimeout(2000);
  
  
  await page.fill('input#cb1-edit', 'iPhone 15');
  await page.press('input#cb1-edit', 'Enter');
  await page.waitForTimeout(5000);
  
  
  const productos = page.locator('li.ui-search-layout__item');
  const titulos = await productos.locator('.poly-component__title').allInnerTexts();
  
  console.log(`\n✅ ${titulos.length} productos encontrados\n`);
  
  
  titulos.slice(0, 5).forEach((titulo, i) => {
    console.log(`${i + 1}. ${titulo}`);
  });
  
  
  const productosIphone = titulos.filter(t => t.toLowerCase().includes('iphone'));
  
  console.log(`\n📱 ${productosIphone.length} productos de iPhone encontrados`);
  
  expect(titulos.length).toBeGreaterThan(0);
  expect(productosIphone.length).toBeGreaterThan(0);
});
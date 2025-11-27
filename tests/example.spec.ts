import { test, expect } from '@playwright/test';
import { Console } from 'console';
import { isContext } from 'vm';

test('Campos obligatorios en el registro', async ({ page }) => {
  await page.goto('https://DAhorro.com/registro');

  await page.click('button:has-text("Registrarme")');

  await page.screenshot({path: 'screenshots/CamposObl.png', fullPage:true});

  await expect(page.getByText('Campos obligatorios')).toBeVisible();
});

test('Login fallido', async ({ page }) => {
  await page.goto('https://DAhorro.com/login');

  await page.fill('#email', 'usuario@test.com');
  await page.fill('#password', 'contraseña_incorrecta');
  await page.click('button:has-text("Ingresar")');
  await page.screenshot({path: 'screenshots/loginFallido.png', fullPage:true});

  await expect(page.getByText('Credenciales incorrectas')).toBeVisible();
});

test('Login Exitoso', async ({ page }) => {
  await page.goto('https://DAhorro.com/simulador');

  await page.fill('#email', 'usuario@test.com');
  await page.fill('#password', 'contraseña_correcta');
  await page.click('button:has-text("Ingresar")');
  await page.screenshot({path: 'screenshots/loginCorrecto.png', fullPage:true});

  await expect(page.getByRole('heading', {name:'Bienvenido al simulador!'})).toBeVisible()
});

test('Campo Monto Vacio', async ({ page }) => {
  await page.goto('https://DAhorro.com/simulador');

  await page.fill('#email', 'usuario@test.com');
  await page.fill('#password', 'contraseña_correcta');
  await page.click('button:has-text("Ingresar")');
  await page.screenshot({path: 'screenshots/login.png', fullPage:true});

  await page.fill('#monto', '');
  await page.fill('#plazo', '12');
  await page.click('button:has-text("Calcular")');
  await page.screenshot({path: 'screenshots/montoVacio.png', fullPage:true});

  await expect(page.getByText('El campo monto es Obligatorio')).toBeVisible();
});

test('Simulación con monto 0', async ({ page }) => {
  await page.goto('https://DAhorro.com/simulador');

  await page.fill('#email', 'usuario@test.com');
  await page.fill('#password', 'contraseña_correcta');
  await page.click('button:has-text("Ingresar")');
  await page.screenshot({path: 'screenshots/login.png', fullPage:true});

  await page.fill('#monto', '0');
  await page.fill('#plazo', '12');
  await page.click('button:has-text("Calcular")');

  await page.screenshot({path: 'screenshots/MontoDif"0".png', fullPage:true});

  await expect(page.getByText('El monto debe ser mayor a 0')).toBeVisible();
});

test('Simulación monto con decimales', async ({ page }) => {
  await page.goto('https://DAhorro.com/simulador');

  await page.fill('#email', 'usuario@test.com');
  await page.fill('#password', 'contraseña_correcta');
  await page.click('button:has-text("Ingresar")');
  await page.screenshot({path: 'screenshots/login.png', fullPage:true});

  await page.fill('#monto', '1000000,435');
  await page.fill('#plazo', '12');
  await page.click('button:has-text("Calcular")');

  await page.screenshot({path: 'screenshots/MontDifEnt.png', fullPage:true});

  await expect(page.getByText('El monto debe ser numero entero')).toBeVisible();
});





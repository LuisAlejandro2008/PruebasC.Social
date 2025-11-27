# 🧪 Pruebas Automatizadas Playwright – DAhorro

Este proyecto contiene un conjunto de **pruebas automatizadas con Playwright** para validar el correcto funcionamiento del registro, login y simulador de ahorro del sitio **DAhorro**.

---

## 🚀 Tecnologías usadas

- **Node.js**
- **Playwright Test**
- **TypeScript / JavaScript**
- **Navegadores automáticos de Playwright**

---

## 📦 Instalación

1. Clonar el repositorio  
   ```bash
   git clone https://github.com/tu-repositorio/DAhorro-tests.git
   cd DAhorro-tests
   ```

2. Instalar dependencias  
   ```bash
   npm install
   ```

3. Instalar navegadores de Playwright  
   ```bash
   npx playwright install
   ```

---

## ▶️ Ejecución de pruebas

Ejecutar todas las pruebas:

```bash
npx playwright test
```

Ejecutar pruebas con UI:

```bash
npx playwright test --ui
```

Ver reportes después de ejecutar:

```bash
npx playwright show-report
```

---

## 🗂️ Estructura de las pruebas

Este proyecto contiene diferentes casos de prueba que validan flujos críticos del sistema:

### 1. **Campos obligatorios en el registro**
Verifica que al intentar registrarse sin llenar información, se muestre el mensaje de validación.

### 2. **Login fallido**
Prueba que el sistema rechace credenciales incorrectas y muestre el mensaje de error.

### 3. **Login exitoso**
Valida acceso correcto y visualización del simulador.

### 4. **Campo "Monto" vacío en el simulador**
Confirma validación cuando el usuario intenta simular sin ingresar el monto.

### 5. **Simulación con monto igual a 0**
Asegura que el simulador valide correctamente un monto inválido.

### 6. **Simulación con monto decimal**
Verifica que el monto solo acepte números enteros.

---

## 📁 Capturas de pantalla

Durante cada prueba se generan screenshots en la carpeta:

```
screenshots/
```

Estos archivos ayudan a validar visualmente los resultados de cada caso.

---

## 🧑‍💻 Código de las pruebas

```ts
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
```

---

## ✨ Autor
Pruebas realizadas por **[Tu Nombre]**  
Proyecto para validación funcional de DAhorro.


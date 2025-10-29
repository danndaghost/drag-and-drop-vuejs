# Guía de Uso - Sistema de Columnas

## Introducción

El sistema de columnas permite crear layouts profesionales donde los elementos se posicionan lado a lado, similar a herramientas como Elementor o Webflow.

## Casos de Uso

### 1. Formulario en Dos Columnas

**Objetivo**: Crear un formulario compacto con campos en dos columnas

**Pasos**:
1. Arrastra un **Contenedor** al canvas
2. Selecciona el contenedor
3. En el panel de propiedades, cambia "Número de columnas" a **2**
4. Arrastra campos a cada columna:
   - Columna 1: Nombre, Email
   - Columna 2: Teléfono, Fecha de Nacimiento

**Resultado**: Un formulario más compacto y profesional

---

### 2. Sección con Imagen y Texto

**Objetivo**: Crear una sección con imagen a la izquierda y texto a la derecha

**Pasos**:
1. Arrastra un **Contenedor** al canvas
2. Configura **2 columnas**
3. Columna 1: Arrastra un elemento **Imagen**
4. Columna 2: Arrastra uno o más elementos **Texto** o **Título**

**Resultado**: Layout tipo "feature section"

---

### 3. Grid de 3 Columnas

**Objetivo**: Mostrar tres opciones o características lado a lado

**Pasos**:
1. Arrastra un **Contenedor** al canvas
2. Configura **3 columnas**
3. Ajusta el espaciado a 20-30px
4. En cada columna añade:
   - Título (H3)
   - Texto descriptivo
   - Checkbox o campo relacionado

**Resultado**: Grid profesional para comparación de opciones

---

### 4. Formulario Complejo Anidado

**Objetivo**: Sección de datos personales con subsecciones en columnas

**Estructura**:
```
Título: "Datos Personales"
Divisor
Contenedor (2 columnas)
  ├── Columna 1: Nombre, Email, Teléfono
  └── Columna 2: Dirección, Ciudad, Código Postal
Divisor
Título: "Información Adicional"
Contenedor (1 columna)
  └── Área de Texto: Comentarios
```

---

## Propiedades Importantes

### Número de Columnas
- **1 columna**: Layout tradicional vertical
- **2 columnas**: Ideal para formularios compactos
- **3 columnas**: Grid para características o opciones
- **4 columnas**: Layout tipo dashboard

### Espaciado (Gap)
- **0-10px**: Columnas muy juntas
- **15-25px**: Espaciado estándar (recomendado)
- **30-50px**: Columnas bien separadas

### Color de Fondo
Use colores de fondo para diferenciar secciones:
- `#f8f9fa`: Gris muy claro (por defecto)
- `#ffffff`: Blanco
- `#e7f3ff`: Azul claro
- `#fff3cd`: Amarillo claro
- `#d4edda`: Verde claro

---

## Tips y Buenas Prácticas

### ✅ Recomendado

1. **Agrupar campos relacionados**: Coloca campos relacionados en la misma columna
2. **Espaciado consistente**: Usa el mismo espaciado en todos los contenedores
3. **No más de 3 columnas en formularios**: Más de 3 columnas puede ser confuso
4. **Padding generoso**: Usa 15-25px de padding para mejor legibilidad

### ❌ Evitar

1. **Contenedores anidados**: No puedes poner un contenedor dentro de otro
2. **Demasiadas columnas**: 4 columnas solo para layouts específicos
3. **Elementos muy anchos en columnas estrechas**: Considera el ancho disponible
4. **Sin espaciado**: Siempre usa al menos 10px de gap

---

## Atajos de Teclado (Futuras implementaciones)

- `Ctrl + D`: Duplicar elemento seleccionado
- `Delete`: Eliminar elemento seleccionado
- `Ctrl + Z`: Deshacer (próximamente)
- `Ctrl + Y`: Rehacer (próximamente)

---

## Exportación a PDF

El HTML generado es compatible con herramientas de conversión a PDF como:

- **Puppeteer** (Node.js)
- **wkhtmltopdf** (Línea de comandos)
- **Prince XML**
- **WeasyPrint** (Python)

### Ejemplo con Puppeteer

```javascript
const puppeteer = require('puppeteer');

async function generatePDF() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Cargar el HTML exportado
  await page.setContent(htmlContent);
  
  // Generar PDF
  await page.pdf({
    path: 'formulario.pdf',
    format: 'A4',
    printBackground: true
  });
  
  await browser.close();
}
```

---

## Soporte

Si encuentras algún problema o tienes sugerencias, por favor crea un issue en el repositorio.

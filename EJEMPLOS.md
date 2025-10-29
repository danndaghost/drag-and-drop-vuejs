# Ejemplos de Código - Sistema de Columnas

## Ejemplos Prácticos de Uso del Store

### 1. Crear un Formulario con 2 Columnas

```javascript
import { useFormBuilderStore } from '@/stores/formBuilder'

const store = useFormBuilderStore()

// 1. Agregar título
store.addElement('heading')
store.updateElementProps('element-1', {
  content: 'Formulario de Registro',
  level: 'h2',
  textAlign: 'center'
})

// 2. Agregar divisor
store.addElement('divider')

// 3. Crear contenedor con 2 columnas
store.addElement('container')
const containerId = 'element-3'
store.updateElementProps(containerId, {
  columns: 2,
  gap: 20,
  backgroundColor: '#f8f9fa',
  padding: 20
})

// 4. Agregar elementos a columna 1
store.addElement('input', containerId, 0)
store.updateElementProps('element-4', {
  label: 'Nombre',
  placeholder: 'Juan Pérez',
  required: true
})

store.addElement('input', containerId, 0)
store.updateElementProps('element-5', {
  label: 'Email',
  placeholder: 'juan@ejemplo.com',
  required: true
})

// 5. Agregar elementos a columna 2
store.addElement('input', containerId, 1)
store.updateElementProps('element-6', {
  label: 'Teléfono',
  placeholder: '+56 9 1234 5678'
})

store.addElement('date', containerId, 1)
store.updateElementProps('element-7', {
  label: 'Fecha de Nacimiento',
  required: true
})
```

---

### 2. Convertir Layout de 1 a 3 Columnas

```javascript
const store = useFormBuilderStore()

// Obtener el contenedor
const container = store.findElementById(store.elements, 'element-3')

// Cambiar a 3 columnas (elementos se redistribuyen automáticamente)
store.updateElementProps('element-3', {
  columns: 3,
  gap: 15
})

// Los elementos existentes se preservan en las columnas
// Las columnas nuevas se crean vacías
```

---

### 3. Programáticamente Crear Grid de Características

```javascript
const store = useFormBuilderStore()

// Crear contenedor para 3 características
store.addElement('container')
const gridId = 'element-1'

store.updateElementProps(gridId, {
  columns: 3,
  gap: 25,
  backgroundColor: '#ffffff',
  padding: 20,
  borderRadius: 8
})

const features = [
  { title: 'Rápido', description: 'Resultados instantáneos' },
  { title: 'Seguro', description: 'Datos encriptados' },
  { title: 'Confiable', description: 'Disponibilidad 99.9%' }
]

features.forEach((feature, index) => {
  // Título
  store.addElement('heading', gridId, index)
  store.updateElementProps(`element-${2 + (index * 2)}`, {
    content: feature.title,
    level: 'h4',
    textAlign: 'center',
    color: '#667eea'
  })
  
  // Descripción
  store.addElement('text', gridId, index)
  store.updateElementProps(`element-${3 + (index * 2)}`, {
    content: feature.description,
    textAlign: 'center',
    fontSize: 14
  })
})
```

---

### 4. Acceder a Elementos Anidados

```javascript
const store = useFormBuilderStore()

// Buscar un elemento en cualquier nivel
const element = store.findElementById(store.elements, 'element-5')

if (element) {
  console.log('Elemento encontrado:', element)
  // Modificar sus propiedades
  store.updateElementProps('element-5', {
    placeholder: 'Nuevo placeholder'
  })
}
```

---

### 5. Recorrer Todos los Elementos (incluidos anidados)

```javascript
function walkElements(elements, callback) {
  elements.forEach(element => {
    callback(element)
    
    // Si tiene children (es un contenedor), recorrer cada columna
    if (element.children) {
      element.children.forEach(column => {
        walkElements(column, callback)
      })
    }
  })
}

// Uso
const store = useFormBuilderStore()
walkElements(store.elements, (element) => {
  console.log(`Elemento ${element.id} de tipo ${element.type}`)
})
```

---

### 6. Exportar y Usar el HTML Generado

```javascript
import { generateHTML } from '@/utils/htmlGenerator'
import { useFormBuilderStore } from '@/stores/formBuilder'

const store = useFormBuilderStore()

// Generar HTML
const html = generateHTML(store.elements)

// Opción 1: Descargar como archivo
const blob = new Blob([html], { type: 'text/html' })
const url = URL.createObjectURL(blob)
const link = document.createElement('a')
link.href = url
link.download = 'formulario.html'
link.click()

// Opción 2: Enviar a backend para convertir a PDF
async function convertToPDF() {
  const response = await fetch('/api/generate-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html })
  })
  
  const blob = await response.blob()
  const pdfUrl = URL.createObjectURL(blob)
  window.open(pdfUrl)
}

// Opción 3: Vista previa en iframe
const iframe = document.createElement('iframe')
iframe.srcdoc = html
document.body.appendChild(iframe)
```

---

### 7. Validar Formulario Antes de Exportar

```javascript
function validateForm(elements) {
  const errors = []
  
  walkElements(elements, (element) => {
    // Verificar campos requeridos sin etiqueta
    if (element.props.required && !element.props.label) {
      errors.push(`Campo ${element.id} es requerido pero no tiene etiqueta`)
    }
    
    // Verificar contenedores vacíos
    if (element.type === 'container') {
      const isEmpty = element.children.every(col => col.length === 0)
      if (isEmpty) {
        errors.push(`Contenedor ${element.id} está vacío`)
      }
    }
  })
  
  return errors
}

// Uso
const store = useFormBuilderStore()
const errors = validateForm(store.elements)

if (errors.length > 0) {
  console.error('Errores de validación:', errors)
  alert(`Se encontraron ${errors.length} errores:\n${errors.join('\n')}`)
} else {
  // Exportar
  const html = generateHTML(store.elements)
  // ...
}
```

---

### 8. Crear Plantilla Predefinida

```javascript
const store = useFormBuilderStore()

function createContactFormTemplate() {
  // Limpiar todo
  store.clearAll()
  
  // Título
  store.addElement('heading')
  store.updateElementProps('element-1', {
    content: 'Contáctanos',
    level: 'h2',
    textAlign: 'center'
  })
  
  // Divisor
  store.addElement('divider')
  
  // Contenedor 2 columnas
  store.addElement('container')
  store.updateElementProps('element-3', {
    columns: 2,
    gap: 20,
    padding: 20
  })
  
  // Columna 1
  store.addElement('input', 'element-3', 0)
  store.updateElementProps('element-4', {
    label: 'Nombre',
    required: true
  })
  
  store.addElement('input', 'element-3', 0)
  store.updateElementProps('element-5', {
    label: 'Email',
    required: true
  })
  
  // Columna 2
  store.addElement('input', 'element-3', 1)
  store.updateElementProps('element-6', {
    label: 'Teléfono'
  })
  
  store.addElement('input', 'element-3', 1)
  store.updateElementProps('element-7', {
    label: 'Empresa'
  })
  
  // Mensaje
  store.addElement('textarea')
  store.updateElementProps('element-8', {
    label: 'Mensaje',
    rows: 5,
    required: true
  })
  
  // Checkbox
  store.addElement('checkbox')
  store.updateElementProps('element-9', {
    label: 'Acepto la política de privacidad',
    required: true
  })
}

// Usar la plantilla
createContactFormTemplate()
```

---

### 9. Clonar Estructura Completa

```javascript
function cloneStructure(sourceElements) {
  const store = useFormBuilderStore()
  
  // Guardar como JSON
  const json = JSON.stringify(sourceElements)
  
  // Restaurar (crea nuevos IDs)
  const cloned = JSON.parse(json)
  
  // Actualizar IDs recursivamente
  let nextId = store.nextId
  
  function updateIds(items) {
    items.forEach(item => {
      item.id = `element-${nextId++}`
      if (item.children) {
        item.children.forEach(column => {
          updateIds(column)
        })
      }
    })
  }
  
  updateIds(cloned)
  return cloned
}

// Uso
const store = useFormBuilderStore()
const backup = cloneStructure(store.elements)

// Restaurar después
store.elements = backup
```

---

### 10. Integración con Backend (Node.js + Puppeteer)

```javascript
// Frontend
async function exportToPDF() {
  const store = useFormBuilderStore()
  const html = generateHTML(store.elements)
  
  const response = await fetch('http://localhost:3001/generate-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ html })
  })
  
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = `formulario-${Date.now()}.pdf`
  link.click()
}

// Backend (Express + Puppeteer)
const express = require('express')
const puppeteer = require('puppeteer')
const app = express()

app.use(express.json({ limit: '10mb' }))

app.post('/generate-pdf', async (req, res) => {
  const { html } = req.body
  
  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  
  await page.setContent(html, { waitUntil: 'networkidle0' })
  
  const pdf = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: {
      top: '20px',
      right: '20px',
      bottom: '20px',
      left: '20px'
    }
  })
  
  await browser.close()
  
  res.contentType('application/pdf')
  res.send(pdf)
})

app.listen(3001, () => {
  console.log('PDF service running on port 3001')
})
```

---

## Composables Personalizados

### useFormBuilder.js

```javascript
import { computed } from 'vue'
import { useFormBuilderStore } from '@/stores/formBuilder'

export function useFormBuilder() {
  const store = useFormBuilderStore()
  
  const totalElements = computed(() => {
    let count = 0
    walkElements(store.elements, () => count++)
    return count
  })
  
  const hasContainers = computed(() => {
    return store.elements.some(el => el.type === 'container')
  })
  
  const formIsValid = computed(() => {
    let valid = true
    walkElements(store.elements, (el) => {
      if (el.props.required && !el.props.label) {
        valid = false
      }
    })
    return valid
  })
  
  function walkElements(elements, callback) {
    elements.forEach(element => {
      callback(element)
      if (element.children) {
        element.children.forEach(column => {
          walkElements(column, callback)
        })
      }
    })
  }
  
  return {
    store,
    totalElements,
    hasContainers,
    formIsValid,
    walkElements
  }
}
```

---

¡Estos ejemplos te ayudarán a aprovechar al máximo el sistema de columnas! 🚀

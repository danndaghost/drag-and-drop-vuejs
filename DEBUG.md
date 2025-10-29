# 🔍 Guía de Debugging - Sistema de Columnas

## Problema Detectado
El drag and drop no funcionaba correctamente en las columnas del contenedor.

## Soluciones Implementadas

### 1. ✅ Inicialización Correcta de Children
**Antes:**
```javascript
if (elementType === 'container') {
  newElement.children = [[]] // ❌ Solo 1 columna siempre
}
```

**Después:**
```javascript
if (elementType === 'container') {
  const numColumns = template.defaultProps.columns || 1
  newElement.children = Array(numColumns).fill(null).map(() => [])
  // ✅ Crea el número correcto de columnas
}
```

### 2. ✅ Drop Zones en Placeholders
**Antes:**
- Placeholders sin eventos de drop
- Solo el contenedor padre capturaba el drop

**Después:**
- Cada placeholder tiene sus propios eventos `@dragover` y `@drop`
- Los eventos se propagan correctamente a la columna específica

### 3. ✅ Validación Robusta en addElement
**Mejoras:**
- Logs de debugging para rastrear el flujo
- Creación automática de `children` si no existe
- Creación automática de columnas faltantes
- Validaciones para evitar errores

### 4. ✅ Prevención de Eventos Duplicados
**Agregado:**
```javascript
event.preventDefault()
event.stopPropagation()
```
Esto previene que el drop se propague a elementos padres.

---

## Cómo Verificar que Funciona

### Test 1: Contenedor con 1 Columna
1. Abre http://localhost:3000
2. Abre la consola del navegador (F12)
3. Arrastra un **Contenedor** al canvas
4. Deberías ver en consola:
   ```
   Contenedor creado con 1 columnas
   Elemento agregado al nivel raíz
   ```
5. Arrastra un **Campo de Texto** al contenedor
6. Deberías ver:
   ```
   Drop en contenedor: {elementType: "input", elementId: "element-1", columnIndex: 0}
   Agregando elemento: input al contenedor: element-1 columna: 0
   Agregando a contenedor: {parentId: "element-1", columnIndex: 0, parent: "element-1", hasChildren: true}
   Elemento agregado a columna 0 del contenedor element-1
   ```

### Test 2: Cambiar a 2 Columnas
1. Con el contenedor seleccionado
2. En el panel de propiedades, cambia a **2 columnas**
3. Deberías ver en consola:
   ```
   Columnas agregadas de 1 a 2
   ```
4. Ahora arrastra elementos a cada columna
5. Columna 1 (izquierda): `columnIndex: 0`
6. Columna 2 (derecha): `columnIndex: 1`

### Test 3: Múltiples Elementos
1. Arrastra 2 elementos a la columna 1
2. Arrastra 2 elementos a la columna 2
3. Los elementos deben permanecer en sus columnas respectivas
4. Usa el grip (≡) para reordenar dentro de cada columna

### Test 4: Contenedor con 3 Columnas desde el Inicio
1. Arrastra un nuevo **Contenedor**
2. Cámbialo a **3 columnas**
3. Arrastra elementos a las 3 columnas
4. Cada columna debe aceptar elementos independientemente

---

## Logs de Consola Esperados

### ✅ Logs Correctos
```javascript
// Al crear contenedor
Contenedor creado con 2 columnas

// Al arrastrar a columna
Drop en contenedor: {elementType: "input", elementId: "element-1", columnIndex: 0}
Agregando elemento: input al contenedor: element-1 columna: 0
Agregando a contenedor: {parentId: "element-1", columnIndex: 0, parent: "element-1", hasChildren: true}
Elemento agregado a columna 0 del contenedor element-1

// Al cambiar columnas
Columnas agregadas de 2 a 3
```

### ❌ Logs de Error (no deberían aparecer)
```javascript
Template no encontrado para: [tipo]
Parent no encontrado: [id]
No se permiten contenedores anidados
```

---

## Solución de Problemas

### Problema: "Parent no encontrado"
**Causa:** El ID del contenedor no se está pasando correctamente
**Solución:** Verificar que `elementId` esté definido en props

### Problema: "Children es undefined"
**Causa:** El contenedor se creó antes de la corrección
**Solución:** 
1. Limpiar el formulario (botón "Limpiar")
2. Crear un nuevo contenedor

### Problema: Los elementos se agregan al nivel raíz en vez de al contenedor
**Causa:** El evento drop se está propagando al canvas
**Solución:** Ya implementado con `stopPropagation()`

### Problema: No puedo arrastrar contenedores dentro de contenedores
**Esto es correcto:** Los contenedores anidados están bloqueados intencionalmente
```javascript
if (elementType === 'container') {
  console.warn('No se permiten contenedores anidados')
}
```

---

## Checklist de Verificación

Marca cada uno después de probarlo:

- [ ] Crear contenedor de 1 columna
- [ ] Arrastrar elemento a la columna
- [ ] Cambiar a 2 columnas
- [ ] Arrastrar elementos a ambas columnas
- [ ] Cambiar a 3 columnas
- [ ] Arrastrar elementos a las 3 columnas
- [ ] Cambiar a 4 columnas
- [ ] Arrastrar elementos a las 4 columnas
- [ ] Reordenar elementos dentro de una columna
- [ ] Eliminar un elemento de una columna
- [ ] Duplicar un elemento dentro de una columna
- [ ] Cambiar de 3 columnas a 2 (elementos se redistribuyen)
- [ ] Cambiar de 2 columnas a 1 (todos en una columna)
- [ ] Exportar HTML y verificar estructura

---

## Comandos de Consola Útiles

### Ver estructura completa
```javascript
// En la consola del navegador
const store = window.__PINIA_APP__.stores.formBuilder
console.log(JSON.stringify(store.elements, null, 2))
```

### Ver un contenedor específico
```javascript
const store = window.__PINIA_APP__.stores.formBuilder
const container = store.elements.find(el => el.type === 'container')
console.log('Contenedor:', container)
console.log('Columnas:', container.children)
```

### Contar elementos por columna
```javascript
const store = window.__PINIA_APP__.stores.formBuilder
const container = store.elements.find(el => el.type === 'container')
container.children.forEach((col, i) => {
  console.log(`Columna ${i + 1}: ${col.length} elementos`)
})
```

---

## Próximos Pasos

Si todo funciona correctamente:
1. ✅ Eliminar los `console.log` en producción (opcional)
2. ✅ Probar con formularios más complejos
3. ✅ Verificar exportación HTML con elementos anidados
4. ✅ Probar conversión a PDF

---

## Notas Importantes

🔴 **Restricción:** No se permiten contenedores dentro de contenedores (por diseño)

🟢 **Funcionalidad:** Todos los demás elementos pueden anidarse en contenedores

🟡 **Recomendación:** Usar máximo 3 columnas para formularios (mejor UX)

---

¡Prueba ahora y reporta cualquier problema! 🚀

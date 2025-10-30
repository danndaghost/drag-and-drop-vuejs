# Debugging - Contenedor

## Cambios Realizados

He corregido el problema de reactividad en los contenedores. Los cambios incluyen:

### 1. Reactividad Forzada en `addElement()`
Ahora cuando agregamos un elemento a una columna del contenedor, creamos nuevos arrays para forzar la reactividad de Vue:

```javascript
// Antes (no reactivo)
parent.children[columnIndex].push(newElement)

// Ahora (reactivo)
const newColumn = [...parent.children[columnIndex], newElement]
const newChildren = [...parent.children]
newChildren[columnIndex] = newColumn
parent.children = newChildren
```

### 2. Template Slot en VueDraggable
Cambié el `v-for` por un template slot que VueDraggable maneja mejor:

```vue
<VueDraggable item-key="id">
  <template #item="{ element: child }">
    <FormElement :element="child" />
  </template>
</VueDraggable>
```

### 3. Reactividad en `adjustContainerColumns()`
Al cambiar el número de columnas, también creamos nuevos arrays en lugar de mutar los existentes.

## Cómo Probar

1. **Abrir la consola del navegador** (F12)
2. **Crear un contenedor**: Arrastra el elemento "Contenedor" al canvas
3. **Verificar logs**:
   - Deberías ver: `Contenedor creado con 1 columnas`
4. **Agregar elemento al contenedor**: Arrastra cualquier elemento (texto, input, etc.) al contenedor
5. **Verificar logs**:
   ```
   Drop en contenedor: { elementType: "text", elementId: "element-X", columnIndex: 0 }
   Agregando elemento: text al contenedor: element-X columna: 0
   Elemento agregado a columna 0 del contenedor element-X
   Contenido de la columna: [{ id: "element-Y", type: "text", ... }]
   ```
6. **Verificar visualmente**: El elemento debería aparecer inmediatamente dentro del contenedor

## Si No Aparece el Elemento

Verifica en la consola:

1. **¿Se ejecutó `handleDrop`?** - Busca el log "Drop en contenedor"
2. **¿Se agregó el elemento?** - Busca "Elemento agregado a columna"
3. **¿Tiene contenido la columna?** - Verifica "Contenido de la columna"

Si todos los logs aparecen pero el elemento no se ve:

1. **Inspecciona el DOM**: Busca el contenedor en las DevTools
2. **Verifica que `children` existe**: En Vue DevTools, inspecciona el componente ContainerElement
3. **Verifica props.children**: Debería tener un array con elementos

## Configuraciones Adicionales

### Cambiar Número de Columnas
1. Selecciona el contenedor
2. En el panel de propiedades, cambia el número de columnas (ahora hasta 6)
3. Los elementos existentes se mantienen

### Mover Elementos Entre Columnas
1. Usa el handle de arrastre (⋮⋮) del elemento
2. Arrastra a otra columna del mismo contenedor
3. El elemento debería moverse y permanecer visible

## Logs Útiles

En la consola, filtra por:
- `contenedor` - Para ver todos los logs relacionados
- `Agregando` - Para ver cuándo se agregan elementos
- `Children` - Para ver la inicialización

## Solución de Problemas

### El placeholder "Columna X" no desaparece
- Problema: El `v-else` no está cambiando
- Solución: Verifica que `column.length > 0` en la consola
- Estado esperado: Cuando hay 1+ elementos, el VueDraggable debería mostrarse

### Los elementos desaparecen al moverlos
- Problema: La reactividad no se está propagando
- Solución aplicada: Usamos template slot con `item-key="id"`

### No se pueden agregar elementos
- Verifica que el `elementType` no sea 'container' (no se permiten contenedores anidados)
- Verifica que el drop event se esté ejecutando

## Estado Esperado

✅ Cuando creas un contenedor: Debes ver el placeholder con el icono de grid
✅ Cuando arrastras un elemento: El placeholder desaparece y aparece el elemento
✅ Cuando arrastras más elementos: Se agregan debajo del primero
✅ Cuando cambias columnas: Los elementos se redistribuyen automáticamente
✅ Cuando mueves elementos: Permanecen visibles en su nueva posición

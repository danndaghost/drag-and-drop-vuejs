# Changelog

Todos los cambios notables de este proyecto serán documentados en este archivo.

## [1.1.0] - 2024-10-29

### ✨ Nuevas Funcionalidades

#### Sistema de Columnas
- **Contenedores con múltiples columnas**: Ahora los contenedores soportan de 1 a 4 columnas
- **Drag & drop en columnas**: Arrastra elementos directamente a cada columna del contenedor
- **Elementos anidados**: Los contenedores pueden tener elementos hijos organizados en columnas
- **Layouts lado a lado**: Crea formularios con campos en paralelo

#### Propiedades del Contenedor Mejoradas
- **Control de columnas**: Selector para elegir número de columnas (1-4)
- **Espaciado configurable**: Ajusta el gap entre columnas con slider (0-50px)
- **Indicadores visuales**: Muestra el número de columnas activo
- **Placeholders informativos**: Guías visuales para arrastrar elementos
- **Sliders mejorados**: Controles de rango para padding, gap y border radius

#### Mejoras en la Exportación HTML
- **Soporte para elementos anidados**: El HTML exportado incluye la estructura de columnas
- **Grid CSS nativo**: Usa CSS Grid para layouts responsivos
- **Estilos inline optimizados**: Máxima compatibilidad con conversores de PDF

### 🔧 Mejoras Técnicas

#### Store (Pinia)
- `addElement()`: Ahora acepta `parentId` y `columnIndex` para elementos anidados
- `removeElement()`: Función recursiva para eliminar elementos en cualquier nivel
- `updateElementProps()`: Ajusta automáticamente las columnas al cambiar su número
- `duplicateElement()`: Duplica elementos anidados con toda su jerarquía
- `findElementById()`: Nueva función para buscar elementos en cualquier nivel
- `adjustContainerColumns()`: Gestiona el redimensionamiento de columnas preservando elementos

#### Componentes
- **ContainerElement**: Completamente rediseñado para soportar columnas
  - Renderiza grid de columnas dinámicamente
  - Drop zones individuales por columna
  - Placeholders visuales cuando las columnas están vacías
  - Importación diferida de FormElement para evitar dependencias circulares
  
- **FormElement**: Soporte para prop `isNested` para elementos dentro de contenedores

- **ContainerProperties**: Panel renovado con:
  - Selector de número de columnas
  - Sliders con valores visuales
  - Iconos descriptivos en cada control
  - Alert informativo con tips de uso

#### Generador HTML
- `generateContainerHTML()`: Genera grid CSS con elementos anidados
- Soporte completo para estructura de columnas
- Estilos grid responsivos

### 📚 Documentación

#### Nuevos Archivos
- **COLUMNAS-GUIA.md**: Guía completa del sistema de columnas
  - Casos de uso detallados
  - Ejemplos de layouts
  - Propiedades explicadas
  - Tips y buenas prácticas
  - Integración con herramientas PDF

- **TUTORIAL.md**: Tutorial paso a paso
  - Creación de formulario en dos columnas
  - Representación visual del resultado
  - Solución de problemas comunes
  - Configuraciones recomendadas

#### Actualizaciones
- **README.md**: Actualizado con información del sistema de columnas

### 🐛 Correcciones
- Elementos seleccionados ahora se encuentran correctamente en estructuras anidadas
- La duplicación preserva toda la jerarquía de elementos
- El cambio de número de columnas preserva los elementos existentes

### 🎨 Mejoras de UI/UX
- Indicadores visuales de drop zones en cada columna
- Placeholders informativos en columnas vacías
- Sliders con valores en tiempo real
- Iconos Font Awesome en controles de propiedades
- Bordes hover en columnas para mejor feedback visual

---

## [1.0.0] - 2024-10-29

### 🎉 Lanzamiento Inicial

#### Características Principales
- Form builder con drag & drop
- 12 tipos de elementos (texto, título, inputs, etc.)
- Panel lateral con elementos arrastrables
- Canvas central para construcción
- Panel de propiedades dinámico
- Exportación a HTML optimizado para PDF
- Sistema de selección y edición
- Duplicación de elementos
- Eliminación de elementos
- Reordenamiento con drag & drop

#### Elementos Disponibles
- Texto
- Títulos (H1-H6)
- Campo de Texto
- Área de Texto
- Lista Desplegable
- Checkbox
- Radio Buttons
- Campo de Fecha
- Divisor
- Imagen
- Espaciador
- Contenedor

#### Stack Tecnológico
- Vue 3.4+ con Composition API
- Pinia para gestión de estado
- Bootstrap 5 para UI
- Font Awesome para iconos
- Vue Draggable Plus para drag & drop
- Vite como build tool
- SCSS para estilos

#### Funcionalidades
- Drag & drop desde sidebar a canvas
- Reordenamiento de elementos en canvas
- Edición de propiedades en tiempo real
- Vista previa instantánea
- Exportación HTML con estilos inline
- Limpiar todo el formulario
- Interface tipo Elementor

---

## Roadmap Futuro

### Versión 1.2.0 (Planeada)
- [ ] Undo/Redo
- [ ] Copiar/Pegar elementos
- [ ] Guardar/Cargar plantillas
- [ ] Temas de color predefinidos
- [ ] Exportación a JSON
- [ ] Vista previa móvil

### Versión 1.3.0 (Planeada)
- [ ] Elementos condicionales
- [ ] Validaciones de formulario
- [ ] Contenedores anidados (2 niveles)
- [ ] Secciones colapsables
- [ ] Tabs/Pestañas

### Versión 2.0.0 (Futuro)
- [ ] Backend integration
- [ ] Almacenamiento en cloud
- [ ] Colaboración en tiempo real
- [ ] Versioning de formularios
- [ ] Analytics y métricas

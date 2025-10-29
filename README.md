# Form Builder - Drag & Drop

Form builder intuitivo con capacidad de generar HTML optimizado para conversión a PDF.

## Características

- 🎨 Interfaz drag & drop tipo Elementor
- 📝 Componentes de formulario predefinidos
- 📐 **Sistema de columnas** para layouts lado a lado
- ⚙️ Panel de propiedades dinámico
- 📄 Exportación a HTML limpio
- 🎯 Optimizado para generación de PDF
- 💾 Vista previa en tiempo real
- 🔄 Soporte para elementos anidados en contenedores

## Stack Tecnológico

- Vue 3.4+ (Composition API)
- Pinia (State Management)
- Bootstrap 5
- Font Awesome
- Vue Draggable Plus
- Vite

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

## Build para Producción

```bash
npm run build
```

## Uso

### Elementos Básicos
1. Arrastra elementos desde el panel lateral al canvas
2. Selecciona elementos para editar sus propiedades
3. Usa el panel de propiedades para personalizar cada elemento
4. Exporta el HTML generado para convertir a PDF

### Sistema de Columnas (Nuevo ✨)

El **Contenedor** permite crear layouts con múltiples columnas:

1. **Arrastra un contenedor** al canvas
2. **Configura el número de columnas** (1-4) en el panel de propiedades
3. **Ajusta el espaciado** entre columnas con el slider
4. **Arrastra elementos** directamente a cada columna del contenedor
5. Los elementos se colocarán **lado a lado** dentro del contenedor

#### Ejemplo de uso:
```
Contenedor (2 columnas)
├── Columna 1
│   ├── Campo de Texto (Nombre)
│   └── Campo de Texto (Email)
└── Columna 2
    ├── Campo de Texto (Teléfono)
    └── Fecha (Nacimiento)
```

### Propiedades del Contenedor

- **Número de columnas**: 1-4 columnas
- **Espaciado entre columnas**: 0-50px
- **Color de fondo**: Selector de color
- **Padding**: 0-100px
- **Border radius**: 0-50px
- **Margen inferior**: 0-100px

## Elementos Disponibles

- ✏️ Texto
- 🔤 Títulos (H1-H6)
- 📝 Campo de Texto
- 📋 Área de Texto
- 📜 Lista Desplegable
- ☑️ Checkbox
- 🔘 Radio Buttons
- 📅 Fecha
- ➖ Divisor
- 🖼️ Imagen
- ⬇️ Espaciador
- 📦 **Contenedor (con columnas)**

## Características Avanzadas

- **Drag & Drop**: Arrastra elementos desde el sidebar o reordénalos en el canvas
- **Elementos anidados**: Coloca elementos dentro de contenedores con columnas
- **Duplicación rápida**: Duplica cualquier elemento con un clic
- **Edición en tiempo real**: Los cambios se reflejan instantáneamente
- **Exportación optimizada**: HTML con estilos inline para máxima compatibilidad

## Tips

💡 **Crear formularios en dos columnas**: Usa un contenedor con 2 columnas para formularios más compactos

💡 **Secciones diferenciadas**: Usa contenedores con colores de fondo diferentes para separar secciones

💡 **Responsive design**: El HTML generado incluye estilos que se adaptan al ancho disponible

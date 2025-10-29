# Tutorial Rápido - Sistema de Columnas

## Video Tutorial (Pasos Escritos)

### 🎯 Objetivo
Crear un formulario de contacto con dos columnas donde los datos personales y de contacto estén lado a lado.

---

## Paso a Paso

### 1️⃣ Agregar el Título Principal
1. Arrastra el elemento **Título** al canvas
2. Escribe: "Formulario de Contacto"
3. En propiedades, selecciona nivel **H2**
4. Centra el texto

### 2️⃣ Agregar un Divisor
1. Arrastra el elemento **Divisor** debajo del título
2. Esto separará visualmente el título del contenido

### 3️⃣ Crear el Contenedor con Columnas
1. Arrastra el elemento **Contenedor** al canvas
2. Haz clic en el contenedor para seleccionarlo
3. En el panel de propiedades (derecha):
   - Cambia "Número de columnas" a **2**
   - Ajusta el "Espaciado entre columnas" a **20px**
   - Cambia el color de fondo a algo claro como `#f8f9fa`
   - Establece el padding en **20px**

### 4️⃣ Llenar la Primera Columna (Datos Personales)
1. Arrastra un **Campo de Texto** al área de la **Columna 1** del contenedor
2. En propiedades:
   - Etiqueta: "Nombre Completo"
   - Placeholder: "Ingrese su nombre"
   - Marca como "Campo requerido"
3. Arrastra otro **Campo de Texto** a la Columna 1
   - Etiqueta: "Email"
   - Placeholder: "correo@ejemplo.com"
   - Marca como requerido
4. Arrastra un **Campo de Fecha** a la Columna 1
   - Etiqueta: "Fecha de Nacimiento"

### 5️⃣ Llenar la Segunda Columna (Datos de Contacto)
1. Arrastra un **Campo de Texto** a la **Columna 2**
   - Etiqueta: "Teléfono"
   - Placeholder: "+56 9 1234 5678"
2. Arrastra otro **Campo de Texto** a la Columna 2
   - Etiqueta: "Ciudad"
   - Placeholder: "Santiago"
3. Arrastra una **Lista Desplegable** a la Columna 2
   - Etiqueta: "Región"
   - Opciones (una por línea):
     ```
     Metropolitana
     Valparaíso
     Biobío
     ```

### 6️⃣ Agregar Sección de Mensaje
1. Debajo del contenedor, arrastra un **Título**
   - Contenido: "Mensaje"
   - Nivel: H3
2. Arrastra un **Área de Texto**
   - Etiqueta: "Comentarios o consultas"
   - Filas: 5
   - Marca como requerido

### 7️⃣ Finalizar con Checkbox
1. Arrastra un **Checkbox** al final
   - Etiqueta: "Acepto los términos y condiciones"
   - Marca como requerido

### 8️⃣ Exportar
1. Haz clic en el botón **"Exportar HTML"** en la barra superior
2. El archivo se descargará automáticamente

---

## Resultado Visual

```
┌─────────────────────────────────────────┐
│      Formulario de Contacto             │
│      ========================            │
│                                         │
│  ┌───────────────┬──────────────────┐  │
│  │ Columna 1     │ Columna 2         │  │
│  │               │                   │  │
│  │ Nombre        │ Teléfono          │  │
│  │ [________]    │ [__________]      │  │
│  │               │                   │  │
│  │ Email         │ Ciudad            │  │
│  │ [________]    │ [__________]      │  │
│  │               │                   │  │
│  │ Fecha Nac.    │ Región            │  │
│  │ [________]    │ [▼ Seleccione]    │  │
│  └───────────────┴──────────────────┘  │
│                                         │
│  Mensaje                                │
│  Comentarios o consultas                │
│  [_________________________________]    │
│  [_________________________________]    │
│                                         │
│  ☐ Acepto los términos y condiciones   │
└─────────────────────────────────────────┘
```

---

## Tips Importantes

### ✅ Hacer
- Arrastra elementos **directamente** a cada columna del contenedor
- Usa el icono de **grip (≡)** para reordenar elementos dentro de las columnas
- Experimenta con diferentes números de columnas (1-4)
- Ajusta el espaciado según tus necesidades

### ❌ Evitar
- No intentes arrastrar un contenedor dentro de otro contenedor
- No uses más de 3 columnas en formularios (puede ser confuso)
- No olvides agregar etiquetas descriptivas a los campos

---

## Configuraciones Recomendadas

### Para Formularios Profesionales
- **Columnas**: 2
- **Espaciado**: 15-20px
- **Padding**: 20-25px
- **Color de fondo**: #f8f9fa o #ffffff
- **Border radius**: 4-8px

### Para Secciones de Características
- **Columnas**: 3
- **Espaciado**: 25-30px
- **Padding**: 20px
- **Color de fondo**: Colores diferenciados por sección

---

## Próximos Pasos

1. **Personaliza colores**: Cambia los colores de fondo según tu marca
2. **Ajusta tamaños**: Modifica los tamaños de fuente en los títulos
3. **Exporta y prueba**: Descarga el HTML y prueba la conversión a PDF
4. **Itera**: Modifica y mejora según el feedback

---

## Solución de Problemas

**P: No puedo arrastrar elementos dentro del contenedor**  
R: Asegúrate de arrastrar exactamente sobre el área de cada columna, no sobre el borde

**P: Las columnas no se ven**  
R: Verifica que hayas seleccionado el contenedor y configurado más de 1 columna en propiedades

**P: Al cambiar el número de columnas, perdí elementos**  
R: Los elementos se mueven automáticamente a la última columna. Redistribúyelos manualmente

**P: No puedo exportar**  
R: Asegúrate de tener al menos un elemento en el canvas

---

¡Ahora estás listo para crear formularios profesionales con columnas! 🎉

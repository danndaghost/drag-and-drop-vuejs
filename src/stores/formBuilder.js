import { defineStore } from 'pinia'
import { ref, computed, triggerRef } from 'vue'

export const useFormBuilderStore = defineStore('formBuilder', () => {
  // Estado
  const elements = ref([])
  const selectedElementId = ref(null)
  const nextId = ref(1)

  // Computed
  const selectedElement = computed(() => {
    if (!selectedElementId.value) return null
    return findElementById(elements.value, selectedElementId.value)
  })

  // Plantillas de elementos disponibles
  const availableElements = [
    {
      type: 'text',
      icon: 'fa-font',
      label: 'Texto',
      defaultProps: {
        content: 'Texto de ejemplo',
        fontSize: 16,
        fontWeight: 'normal',
        textAlign: 'left',
        color: '#000000'
      }
    },
    {
      type: 'heading',
      icon: 'fa-heading',
      label: 'Título',
      defaultProps: {
        content: 'Título',
        level: 'h2',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'left',
        color: '#000000'
      }
    },
    {
      type: 'input',
      icon: 'fa-keyboard',
      label: 'Campo de Texto',
      defaultProps: {
        label: 'Campo de texto',
        placeholder: 'Ingrese texto',
        required: false,
        width: '100%'
      }
    },
    {
      type: 'textarea',
      icon: 'fa-align-left',
      label: 'Área de Texto',
      defaultProps: {
        label: 'Área de texto',
        placeholder: 'Ingrese texto',
        rows: 4,
        required: false,
        width: '100%'
      }
    },
    {
      type: 'select',
      icon: 'fa-list',
      label: 'Lista Desplegable',
      defaultProps: {
        label: 'Seleccione una opción',
        options: 'Opción 1\nOpción 2\nOpción 3',
        required: false,
        width: '100%'
      }
    },
    {
      type: 'checkbox',
      icon: 'fa-check-square',
      label: 'Casilla de Verificación',
      defaultProps: {
        label: 'Acepto los términos',
        required: false
      }
    },
    {
      type: 'radio',
      icon: 'fa-circle-dot',
      label: 'Botones de Radio',
      defaultProps: {
        label: 'Seleccione una opción',
        options: 'Opción 1\nOpción 2\nOpción 3',
        required: false
      }
    },
    {
      type: 'date',
      icon: 'fa-calendar',
      label: 'Fecha',
      defaultProps: {
        label: 'Fecha',
        required: false,
        width: '100%'
      }
    },
    {
      type: 'divider',
      icon: 'fa-minus',
      label: 'Separador',
      defaultProps: {
        height: 1,
        color: '#dee2e6'
      }
    },
    {
      type: 'image',
      icon: 'fa-image',
      label: 'Imagen',
      defaultProps: {
        src: 'https://via.placeholder.com/400x200',
        alt: 'Imagen',
        width: '100%'
      }
    },
    {
      type: 'spacer',
      icon: 'fa-arrows-up-down',
      label: 'Espaciador',
      defaultProps: {
        height: 30
      }
    },
    {
      type: 'container',
      icon: 'fa-table-cells',
      label: 'Contenedor',
      defaultProps: {
        columns: 1,
        gap: 15
      }
    },
    {
      type: 'table',
      icon: 'fa-table',
      label: 'Tabla',
      defaultProps: {
        columns: [
          { id: 'col1', name: 'Columna 1' },
          { id: 'col2', name: 'Columna 2' },
          { id: 'col3', name: 'Columna 3' }
        ]
      }
    }
  ]

  // Acciones
  function addElement(elementType, parentId = null, columnIndex = null) {
    const template = availableElements.find(el => el.type === elementType)
    if (!template) {
      console.error('Template no encontrado para:', elementType)
      return
    }

    const newElement = {
      id: `element-${nextId.value++}`,
      type: elementType,
      props: { ...template.defaultProps }
    }

    // Si el elemento es un contenedor, inicializar las columnas dentro de props
    if (elementType === 'container') {
      const numColumns = template.defaultProps.columns || 1
      newElement.props.children = Array(numColumns).fill(null).map(() => [])
      console.log('Contenedor creado con', numColumns, 'columnas', newElement.props.children)
    }

    if (parentId && columnIndex !== null) {
      // Agregar a un contenedor específico
      const parent = findElementById(elements.value, parentId)
      console.log('Agregando a contenedor:', { parentId, columnIndex, parent: parent?.id, hasChildren: !!parent?.props?.children })
      
      if (parent) {
        // Asegurar que children existe dentro de props
        if (!parent.props.children) {
          const numColumns = parent.props.columns || 1
          parent.props.children = Array(numColumns).fill(null).map(() => [])
          console.log('Children inicializado con', numColumns, 'columnas')
        }
        
        // Asegurar que la columna existe
        if (!parent.props.children[columnIndex]) {
          parent.props.children[columnIndex] = []
          console.log('Columna', columnIndex, 'inicializada')
        }
        
        // Crear nuevo array para forzar reactividad
        const newColumn = [...parent.props.children[columnIndex], newElement]
        const newChildren = [...parent.props.children]
        newChildren[columnIndex] = newColumn
        parent.props.children = newChildren
        
        console.log('Elemento agregado a columna', columnIndex, 'del contenedor', parentId)
        console.log('Contenido de la columna:', parent.props.children[columnIndex])
      } else {
        console.error('Parent no encontrado:', parentId)
      }
    } else {
      // Agregar al nivel raíz
      elements.value.push(newElement)
      console.log('Elemento agregado al nivel raíz')
    }
    
    selectedElementId.value = newElement.id
    return newElement
  }

  function removeElement(elementId) {
    // Función recursiva para eliminar elementos anidados
    const removeRecursive = (items) => {
      const index = items.findIndex(el => el.id === elementId)
      if (index > -1) {
        items.splice(index, 1)
        return true
      }
      
      // Buscar en elementos con children (contenedores)
      for (const item of items) {
        if (item.props?.children) {
          for (const column of item.props.children) {
            if (removeRecursive(column)) {
              return true
            }
          }
        }
      }
      return false
    }
    
    if (removeRecursive(elements.value)) {
      if (selectedElementId.value === elementId) {
        selectedElementId.value = null
      }
    }
  }

  function updateElementProps(elementId, props) {
    const element = findElementById(elements.value, elementId)
    if (element) {
      console.log('updateElementProps - antes:', { 
        elementId, 
        oldProps: JSON.parse(JSON.stringify(element.props)), 
        newProps: props 
      })
      
      const oldColumns = element.props.columns
      element.props = { ...element.props, ...props }
      
      console.log('updateElementProps - después:', { 
        elementId, 
        updatedProps: JSON.parse(JSON.stringify(element.props)) 
      })
      
      // Si es un contenedor y cambió el número de columnas, ajustar
      if (element.type === 'container' && props.columns !== undefined && oldColumns !== props.columns) {
        adjustContainerColumns(element, props.columns)
      }
      
      // Forzar reactividad usando triggerRef
      triggerRef(elements)
      console.log('Reactividad forzada con triggerRef')
    } else {
      console.error('updateElementProps - elemento no encontrado:', elementId)
    }
  }

  function adjustContainerColumns(container, newColumnCount) {
    console.log('adjustContainerColumns llamado:', { 
      containerId: container.id,
      currentColumns: container.props.children?.length, 
      newColumnCount 
    })
    
    if (!container.props.children) {
      container.props = {
        ...container.props,
        children: Array(newColumnCount).fill(null).map(() => [])
      }
      console.log('Children inicializado con', newColumnCount, 'columnas')
      return
    }

    const currentColumns = container.props.children.length
    
    if (newColumnCount > currentColumns) {
      // Agregar columnas vacías - crear nuevo array para reactividad
      const newChildren = [...container.props.children]
      for (let i = currentColumns; i < newColumnCount; i++) {
        newChildren.push([])
      }
      container.props = { ...container.props, children: newChildren }
      console.log('Columnas agregadas de', currentColumns, 'a', newColumnCount)
    } else if (newColumnCount < currentColumns) {
      // Mover elementos de columnas eliminadas a la última columna
      const elementsToMove = []
      for (let i = newColumnCount; i < currentColumns; i++) {
        elementsToMove.push(...container.props.children[i])
      }
      const newChildren = container.props.children.slice(0, newColumnCount)
      if (newChildren.length > 0 && elementsToMove.length > 0) {
        newChildren[newChildren.length - 1] = [...newChildren[newChildren.length - 1], ...elementsToMove]
      }
      container.props = { ...container.props, children: newChildren }
      console.log('Columnas reducidas de', currentColumns, 'a', newColumnCount, '- elementos movidos:', elementsToMove.length)
    }
  }

  function findElementById(items, id) {
    for (const item of items) {
      if (item.id === id) {
        return item
      }
      if (item.props?.children) {
        for (const column of item.props.children) {
          const found = findElementById(column, id)
          if (found) return found
        }
      }
    }
    return null
  }

  function selectElement(elementId) {
    selectedElementId.value = elementId
  }

  function moveElement(fromIndex, toIndex) {
    const element = elements.value.splice(fromIndex, 1)[0]
    elements.value.splice(toIndex, 0, element)
  }

  function clearAll() {
    elements.value = []
    selectedElementId.value = null
  }

  function duplicateElement(elementId) {
    const duplicateRecursive = (el) => {
      const newEl = {
        id: `element-${nextId.value++}`,
        type: el.type,
        props: { ...el.props }
      }
      
      if (el.props?.children) {
        newEl.props.children = el.props.children.map(column => 
          column.map(child => duplicateRecursive(child))
        )
      }
      
      return newEl
    }

    // Función para encontrar y duplicar en la posición correcta
    const duplicateInArray = (items) => {
      const index = items.findIndex(el => el.id === elementId)
      if (index > -1) {
        const newElement = duplicateRecursive(items[index])
        items.splice(index + 1, 0, newElement)
        return true
      }
      
      for (const item of items) {
        if (item.props?.children) {
          for (const column of item.props.children) {
            if (duplicateInArray(column)) {
              return true
            }
          }
        }
      }
      return false
    }
    
    duplicateInArray(elements.value)
  }

  return {
    // Estado
    elements,
    selectedElementId,
    availableElements,
    // Computed
    selectedElement,
    // Acciones
    addElement,
    removeElement,
    updateElementProps,
    selectElement,
    moveElement,
    clearAll,
    duplicateElement,
    findElementById
  }
})

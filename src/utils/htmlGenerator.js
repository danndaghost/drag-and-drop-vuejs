/**
 * Genera HTML limpio y optimizado para conversión a PDF
 * @param {Array} elements - Array de elementos del formulario
 * @returns {String} HTML completo con estilos inline
 */
export function generateHTML(elements) {
  const htmlElements = elements.map(element => generateElementHTML(element)).join('\n')
  
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Formulario Generado</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.5;
      color: #212529;
      background-color: #ffffff;
      padding: 40px;
      max-width: 900px;
      margin: 0 auto;
    }
    
    .form-label {
      display: block;
      font-weight: 500;
      margin-bottom: 0.5rem;
    }
    
    .form-control, .form-select {
      display: block;
      width: 100%;
      padding: 0.375rem 0.75rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #212529;
      background-color: #fff;
      border: 1px solid #ced4da;
      border-radius: 0.25rem;
    }
    
    .form-check {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    
    .form-check-input {
      width: 1rem;
      height: 1rem;
    }
    
    .form-check-label {
      font-weight: 500;
    }
    
    .text-danger {
      color: #dc3545;
    }
    
    img {
      max-width: 100%;
      height: auto;
    }
  </style>
</head>
<body>
  <form>
${htmlElements}
  </form>
</body>
</html>`
}

function generateElementHTML(element) {
  const generators = {
    text: generateTextHTML,
    heading: generateHeadingHTML,
    input: generateInputHTML,
    textarea: generateTextareaHTML,
    select: generateSelectHTML,
    checkbox: generateCheckboxHTML,
    radio: generateRadioHTML,
    date: generateDateHTML,
    divider: generateDividerHTML,
    image: generateImageHTML,
    spacer: generateSpacerHTML,
    container: generateContainerHTML
  }
  
  const generator = generators[element.type]
  return generator ? generator(element.props, element.id) : ''
}

function generateTextHTML(props) {
  const style = `
    font-size: ${props.fontSize}px;
    font-weight: ${props.fontWeight};
    text-align: ${props.textAlign};
    color: ${props.color};
    line-height: 1.5;
  `.trim().replace(/\s+/g, ' ')
  
  return `    <p style="${style}">${escapeHtml(props.content)}</p>`
}

function generateHeadingHTML(props) {
  const style = `
    font-size: ${props.fontSize}px;
    font-weight: ${props.fontWeight};
    text-align: ${props.textAlign};
    color: ${props.color};
    margin-top: 0;
  `.trim().replace(/\s+/g, ' ')
  
  return `    <${props.level} style="${style}">${escapeHtml(props.content)}</${props.level}>`
}

function generateInputHTML(props) {
  const inputStyle = `width: ${props.width};`
  const required = props.required ? 'required' : ''
  
  return `    <div>
      ${props.label ? `<label class="form-label">${escapeHtml(props.label)}${props.required ? '<span class="text-danger">*</span>' : ''}</label>` : ''}
      <input type="text" class="form-control" placeholder="${escapeHtml(props.placeholder)}" style="${inputStyle}" ${required} />
    </div>`
}

function generateTextareaHTML(props) {
  const textareaStyle = `width: ${props.width};`
  const required = props.required ? 'required' : ''
  
  return `    <div>
      ${props.label ? `<label class="form-label">${escapeHtml(props.label)}${props.required ? '<span class="text-danger">*</span>' : ''}</label>` : ''}
      <textarea class="form-control" rows="${props.rows}" placeholder="${escapeHtml(props.placeholder)}" style="${textareaStyle}" ${required}></textarea>
    </div>`
}

function generateSelectHTML(props) {
  const selectStyle = `width: ${props.width};`
  const required = props.required ? 'required' : ''
  const options = props.options.split('\n').filter(opt => opt.trim())
  
  const optionsHTML = options.map(opt => 
    `        <option value="${escapeHtml(opt)}">${escapeHtml(opt)}</option>`
  ).join('\n')
  
  return `    <div>
      ${props.label ? `<label class="form-label">${escapeHtml(props.label)}${props.required ? '<span class="text-danger">*</span>' : ''}</label>` : ''}
      <select class="form-select" style="${selectStyle}" ${required}>
        <option value="">Seleccione...</option>
${optionsHTML}
      </select>
    </div>`
}

function generateCheckboxHTML(props) {
  const required = props.required ? 'required' : ''
  
  return `    <div class="form-check">
      <input class="form-check-input" type="checkbox" ${required} />
      <label class="form-check-label">${escapeHtml(props.label)}${props.required ? '<span class="text-danger">*</span>' : ''}</label>
    </div>`
}

function generateRadioHTML(props, elementId) {
  const required = props.required ? 'required' : ''
  const options = props.options.split('\n').filter(opt => opt.trim())
  
  const optionsHTML = options.map((opt, idx) => 
    `      <div class="form-check" style="margin-bottom: 0.5rem;">
        <input class="form-check-input" type="radio" name="${elementId}" id="${elementId}-${idx}" ${required} />
        <label class="form-check-label" for="${elementId}-${idx}">${escapeHtml(opt)}</label>
      </div>`
  ).join('\n')
  
  return `    <div>
      ${props.label ? `<label class="form-label" style="margin-bottom: 0.5rem;">${escapeHtml(props.label)}${props.required ? '<span class="text-danger">*</span>' : ''}</label>` : ''}
${optionsHTML}
    </div>`
}

function generateDateHTML(props) {
  const inputStyle = `width: ${props.width};`
  const required = props.required ? 'required' : ''
  
  return `    <div>
      ${props.label ? `<label class="form-label">${escapeHtml(props.label)}${props.required ? '<span class="text-danger">*</span>' : ''}</label>` : ''}
      <input type="date" class="form-control" style="${inputStyle}" ${required} />
    </div>`
}

function generateDividerHTML(props) {
  const style = `
    height: ${props.height}px;
    background-color: ${props.color};
    border: none;
  `.trim().replace(/\s+/g, ' ')
  
  return `    <hr style="${style}" />`
}

function generateImageHTML(props) {
  const imgStyle = `width: ${props.width}; display: block;`
  
  return `    <div>
      <img src="${escapeHtml(props.src)}" alt="${escapeHtml(props.alt)}" style="${imgStyle}" />
    </div>`
}

function generateSpacerHTML(props) {
  const style = `height: ${props.height}px;`
  return `    <div style="${style}"></div>`
}

function generateContainerHTML(props) {
  const style = `
    border-radius: ${props.borderRadius}px;
  `.trim().replace(/\s+/g, ' ')
  
  // Si tiene columnas con elementos
  if (props.children && props.children.length > 0) {
    const hasContent = props.children.some(col => col.length > 0)
    
    if (hasContent) {
      const columnsStyle = `
        display: grid;
        grid-template-columns: repeat(${props.columns}, 1fr);
        gap: ${props.gap}px;
      `.trim().replace(/\s+/g, ' ')
      
      const columnsHTML = props.children.map((column, index) => {
        const columnItems = column.map(element => generateElementHTML(element)).join('\n')
        return `      <div style="min-height: 20px;">
${columnItems}
      </div>`
      }).join('\n')
      
      return `    <div style="${style}">
      <div style="${columnsStyle}">
${columnsHTML}
      </div>
    </div>`
    }
  }
  
  // Contenedor vacío
  return `    <div style="${style} min-height: 60px;"></div>`
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }
  return String(text).replace(/[&<>"']/g, m => map[m])
}

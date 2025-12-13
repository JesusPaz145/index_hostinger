const state = {
    estudios: [],
    experiencias: [],
    apps: [],
    skills: []
};

// Track editing and deleting states
const editingSet = new Set();
const deletingSet = new Set(); // Stores "type-index" for items pending delete confirmation

const schemas = {
    estudios: [
        { key: 'titulo', label: 'Título/Carrera', summary: true },
        { key: 'institucion', label: 'Institución', summary: true },
        { key: 'periodo', label: 'Periodo' },
        { key: 'descripcion', label: 'Descripción', type: 'textarea' }
    ],
    experiencias: [
        { key: 'puesto', label: 'Puesto', summary: true },
        { key: 'empresa', label: 'Empresa', summary: true },
        { key: 'periodo', label: 'Periodo' },
        { key: 'descripcion', label: 'Descripción', type: 'textarea' }
    ],
    apps: [
        { key: 'nombre', label: 'Nombre Proyecto', summary: true },
        { key: 'github', label: 'URL GitHub' },
        { key: 'demo', label: 'URL Demo' },
        { key: 'imagen', label: 'URL Imagen' },
        { key: 'tecnologias', label: 'Tecnologías', full: true },
        { key: 'descripcion', label: 'Descripción', type: 'textarea', full: true }
    ],
    skills: [
        { key: 'nombre', label: 'Habilidad', summary: true },
        { key: 'nivel', label: 'Nivel % (0-100)', type: 'number', summary: true }
    ]
};

document.addEventListener('DOMContentLoaded', loadData);

async function loadData() {
    await Promise.all(['estudios', 'experiencias', 'apps', 'skills'].map(async key => {
        try {
            const r = await fetch(`/api/${key}.php`);
            state[key] = await r.json();
            renderList(key);
        } catch (e) { console.error(e); }
    }));
}

function switchTab(key) {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.editor-section').forEach(s => s.classList.remove('active'));

    document.querySelector(`.tab[onclick="switchTab('${key}')"]`).classList.add('active');
    document.getElementById(key).classList.add('active');
}

function renderList(key) {
    const container = document.getElementById(`${key}-container`);
    container.innerHTML = '';

    if (!state[key] || state[key].length === 0) {
        container.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:1rem">No hay elementos.</p>';
        return;
    }

    state[key].forEach((item, index) => {
        const row = document.createElement('div');
        row.className = 'item-row';
        const isEditing = editingSet.has(`${key}-${index}`);
        const isDeleting = deletingSet.has(`${key}-${index}`);

        // DELETE CONFIMATION MODE
        if (isDeleting) {
            row.style.borderColor = 'var(--primary)';
            row.style.background = 'rgba(239, 68, 68, 0.1)';
            row.innerHTML = `
         <div style="flex:1;text-align:center;">
           <span style="color:var(--primary);font-weight:bold;">¿Eliminar este elemento?</span>
         </div>
         <div class="actions" style="flex-direction:row;gap:0.5rem;">
           <button style="background:var(--primary);color:black;border:none;padding:0.5rem 1rem;border-radius:6px;cursor:pointer;font-weight:700;" onclick="confirmDelete('${key}', ${index})">SÍ</button>
           <button style="background:transparent;border:1px solid var(--glass-border);color:var(--text-muted);padding:0.5rem 1rem;border-radius:6px;cursor:pointer;" onclick="cancelDelete('${key}', ${index})">NO</button>
         </div>
       `;
        }
        // READ MODE
        else if (!isEditing) {
            let summaryHtml = '<div style="flex:1">';
            const schema = schemas[key];
            const summaryKeys = schema.filter(f => f.summary);
            if (summaryKeys.length === 0) summaryKeys.push(schema[0]);

            summaryHtml += `<h3 style="margin:0;color:var(--primary);font-size:1.1rem">${escapeHtml(item[summaryKeys[0].key] || 'Sin Título')}</h3>`;
            if (summaryKeys[1]) {
                summaryHtml += `<p style="margin:0.25rem 0 0;color:var(--text-muted);font-size:0.9rem">${escapeHtml(item[summaryKeys[1].key])}</p>`;
            }
            summaryHtml += '</div>';

            row.innerHTML = `
        ${summaryHtml}
        <div class="actions" style="flex-direction:row;">
          <button style="border:none;background:transparent;cursor:pointer;font-size:1.2rem;padding:0.5rem" title="Editar" onclick="toggleEdit('${key}', ${index})">✏️</button>
          <button class="btn-del" title="Eliminar" onclick="requestDelete('${key}', ${index})">🗑️</button>
        </div>
      `;
        }
        // EDIT MODE
        else {
            let inputsHtml = '<div class="item-form">';
            schemas[key].forEach(field => {
                const val = field.key === 'tecnologias' && Array.isArray(item[field.key])
                    ? item[field.key].join(', ')
                    : (item[field.key] || '');

                const gridClass = field.full ? 'full-width' : '';
                const inputId = `input-${key}-${index}-${field.key}`;

                if (field.type === 'textarea') {
                    inputsHtml += `<label class="${gridClass}">${field.label}<textarea id="${inputId}" rows="3">${escapeHtml(val)}</textarea></label>`;
                } else {
                    inputsHtml += `<label class="${gridClass}">${field.label}<input type="${field.type || 'text'}" id="${inputId}" value="${escapeHtml(val)}"></label>`;
                }
            });
            inputsHtml += '</div>';

            row.innerHTML = `
        ${inputsHtml}
        <div class="actions">
          <button style="background:var(--primary);color:white;border:none;padding:0.5rem 1rem;border-radius:6px;cursor:pointer;margin-bottom:0.5rem" onclick="saveItem('${key}', ${index})">💾 Guardar</button>
          <button style="background:transparent;border:1px solid var(--glass-border);color:var(--text-muted);padding:0.5rem 1rem;border-radius:6px;cursor:pointer" onclick="cancelEdit('${key}', ${index})">Cancelar</button>
        </div>
      `;
        }

        container.appendChild(row);
    });
}

function escapeHtml(text) {
    if (text === undefined || text === null) return '';
    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

window.toggleEdit = (type, index) => {
    editingSet.add(`${type}-${index}`);
    renderList(type);
};

window.cancelEdit = (type, index) => {
    editingSet.delete(`${type}-${index}`);
    renderList(type);
};

window.saveItem = async (type, index) => {
    const item = state[type][index];
    schemas[type].forEach(field => {
        const el = document.getElementById(`input-${type}-${index}-${field.key}`);
        if (el) {
            if (field.key === 'tecnologias') {
                item[field.key] = el.value.split(',').map(s => s.trim()).filter(s => s);
            } else {
                item[field.key] = el.value;
            }
        }
    });

    editingSet.delete(`${type}-${index}`);
    renderList(type);

    try {
        const res = await fetch('/api/save.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: type, data: state[type] })
        });
        const json = await res.json();
        if (!json.ok) throw new Error(json.message);
    } catch (e) {
        alert('Error al guardar: ' + e.message);
    }
};

window.addItem = (type) => {
    const newIdx = state[type].push({});
    editingSet.add(`${type}-${newIdx - 1}`);
    renderList(type);
};

// Start Delete Flow
window.requestDelete = (type, index) => {
    deletingSet.add(`${type}-${index}`);
    renderList(type);
};

// Cancel Delete Flow
window.cancelDelete = (type, index) => {
    deletingSet.delete(`${type}-${index}`);
    renderList(type);
};

// Execute Delete
window.confirmDelete = async (type, index) => {
    const backup = [...state[type]];

    // Optimistic update
    state[type].splice(index, 1);
    deletingSet.delete(`${type}-${index}`);
    renderList(type);

    try {
        const res = await fetch('/api/save.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: type, data: state[type] })
        });
        const json = await res.json();
        if (!json.ok) throw new Error(json.message);
    } catch (e) {
        alert('Fallo al eliminar: ' + e.message);
        state[type] = backup;
        renderList(type);
    }
};

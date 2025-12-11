document.addEventListener('DOMContentLoaded',()=>{
  document.getElementById('year').textContent=new Date().getFullYear();
  fetchAndRender('/api/apps.php','apps-list',renderApps);
  fetchAndRender('/api/estudios.php','estudios-list',renderList);
  fetchAndRender('/api/experiencias.php','experiencias-list',renderList);
  fetchAndRender('/api/skills.php','skills-list',renderSkills);

  document.getElementById('contact-form').addEventListener('submit',async(e)=>{
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const resText = document.getElementById('contact-result');
    try{
      const r = await fetch('/api/contact.php',{method:'POST',body:data});
      const j = await r.json();
      resText.textContent = j.message || 'Enviado';
      if(j.ok) form.reset();
    }catch(err){resText.textContent='Error al enviar'}
  });
});

async function fetchAndRender(url,containerId,renderer){
  // Intentar primero la ruta /api (requiere PHP). Si falla, intentar cargar JSON local en src/data/*.json
  const container = document.getElementById(containerId);
  const tryLocal = async (name) => {
    const localPath = `/src/data/${name}.json`;
    try{
      const lr = await fetch(localPath);
      if(!lr.ok) throw new Error('Local not found');
      const ldata = await lr.json();
      renderer(ldata, container);
      return true;
    }catch(e){ return false; }
  };

  try{
    const r = await fetch(url);
    if(!r.ok) throw new Error('Network');
    const data = await r.json();
    renderer(data, container);
    return;
  }catch(err){
    console.warn('API no disponible, intentando JSON local...', err);
    // detectar nombre base (apps, estudios, experiencias, skills)
    const m = url.match(/(apps|estudios|experiencias|skills)/i);
    const name = m ? m[0].toLowerCase() : null;
    if(name){
      const ok = await tryLocal(name);
      if(ok) return;
    }
    if(container) container.innerHTML = '<p class="muted">No hay datos disponibles.</p>';
  }
}

function renderApps(items,container){
  if(!Array.isArray(items)){ container.innerHTML='<p class="muted">Sin proyectos</p>'; return }
  container.innerHTML='';
  items.forEach(a=>{
    const d=document.createElement('div'); d.className='app';
    const techs = Array.isArray(a.tecnologias) ? a.tecnologias.join(', ') : '';
    d.innerHTML=`${a.imagen?`<img src="${escapeAttr(a.imagen)}" alt="${escapeAttr(a.nombre||'')}" style="width:100%;height:120px;object-fit:cover;border-radius:6px 6px 0 0;margin:-0.75rem -0.75rem 0.5rem -0.75rem">`:''
    }<h3>${escapeHtml(a.nombre||a.name||'Proyecto')}</h3>
      <p class="mutedSmall">${escapeHtml(a.descripcion||a.description||'')}</p>
      ${techs?`<p class="mutedSmall">🔧 ${escapeHtml(techs)}</p>`:''}
      <div style="display:flex;gap:0.5rem;margin-top:0.5rem">${a.github?`<a href="${escapeAttr(a.github)}" target="_blank" style="color:var(--accent)">GitHub</a>`:''}
      ${a.demo?`<a href="${escapeAttr(a.demo)}" target="_blank" style="color:var(--accent)">Demo</a>`:''}</div>`;
    container.appendChild(d);
  })
}

function renderList(items,container){
  if(!Array.isArray(items)){ container.innerHTML=''; return }
  container.innerHTML='';
  items.forEach(it=>{
    const d=document.createElement('div');
    d.innerHTML=`<strong>${escapeHtml(it.titulo||it.title||it.puesto||it.nombre||it.name||it.role||'')}</strong>
      <div class="mutedSmall">${escapeHtml(it.institucion||it.institute||it.empresa||it.company||'')}</div>
      <div class="mutedSmall">${escapeHtml(it.periodo||it.period||it.date||'')}</div>
      <div>${escapeHtml(it.descripcion||it.description||'')}</div>`;
    container.appendChild(d);
  })
}

function renderSkills(items,container){
  if(!Array.isArray(items)){ container.innerHTML=''; return }
  container.innerHTML='';
  items.forEach(s=>{
    const d=document.createElement('div'); d.className='skill';
    const name=document.createElement('div'); name.textContent=s.nombre||s.name||s.skill||''; name.style.width='140px';
    const bar=document.createElement('div'); bar.className='bar';
    const inner=document.createElement('i'); inner.style.width=(s.nivel||s.level||s.progress||50)+'%';
    bar.appendChild(inner);
    d.appendChild(name); d.appendChild(bar); container.appendChild(d);
  })
}

function escapeHtml(s){ if(!s) return ''; return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[c])) }
function escapeAttr(s){ return escapeHtml(s).replace(/"/g,'') }

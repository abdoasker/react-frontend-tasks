// ========= CONFIG =========
// غيّر روابط الـ APIs دي حسب الباك-إند بتاعك
const API = {
  user:           '/api/user',            // { name, handle, avatar }
  projects:       '/api/projects',        // [{ id,title,description,accentColor }]
  announcements:  '/api/announcements',   // [{ id,title,description }]
  trending:       '/api/trending'         // [{ id, handle, name, avatar, bio }]
};

// ========= HELPERS =========
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => [...parent.querySelectorAll(sel)];

function setText(el, txt){ if(el) el.textContent = txt ?? ''; }
function setSrc(el, src, fallback='https://via.placeholder.com/64'){ if(el) el.src = src || fallback; }

// ========= BOOT =========
document.addEventListener('DOMContentLoaded', async () => {
  // Sidebar toggle (موبايل)
  const sidebar = document.querySelector('.sidebar');
  $('#toggleSidebar').addEventListener('click', () => sidebar.classList.toggle('open'));

  // Loading skeletons
  renderProjectSkeletons(6);
  renderAnnouncementSkeletons(3);
  renderTrendingSkeletons(4);

  // Fetch & render
  await Promise.all([
    loadUser(),
    loadProjects(),
    loadAnnouncements(),
    loadTrending()
  ]);

  // Search filter محلي على المشاريع
  $('#searchInput').addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase().trim();
    $$('#projectsGrid .card.project').forEach(card => {
      const txt = (card.dataset.search || '').toLowerCase();
      card.style.display = txt.includes(q) ? '' : 'none';
    });
  });
});

// ========= LOADERS =========
async function loadUser(){
  try{
    const res = await fetch(API.user);
    const user = await res.json();
    setText($('#userFullName'), `${user.name} (@${user.handle})`);
    setText($('#userNameMini'), user.name || '');
    setSrc($('#userAvatar'), user.avatar);
    setSrc($('#userAvatarLarge'), user.avatar);
  }catch(e){
    console.warn('User API failed, falling back to mock', e);
    const user = { name:'Morgan Oakley', handle:'morgan', avatar:'' };
    setText($('#userFullName'), `${user.name} (@${user.handle})`);
    setText($('#userNameMini'), user.name);
    setSrc($('#userAvatar'), user.avatar);
    setSrc($('#userAvatarLarge'), user.avatar);
  }
}

async function loadProjects(){
  const grid = $('#projectsGrid');
  grid.innerHTML = ''; // clear skeletons
  try{
    const res = await fetch(API.projects);
    const items = await res.json();
    items.forEach(renderProject);
  }catch(e){
    console.warn('Projects API failed, using mock', e);
    [
      {id:1,title:'Super Cool Project',description:'Sed tempus ut lacus ut scelerisque. Suspendisse sollicitudin nibh erat.',accentColor:'#f4b400'},
      {id:2,title:'Less Cool Project',description:'Nullam condimentum ipsum ut lectus vehicula consectetur.',accentColor:'#f4b400'},
      {id:3,title:'Impossible App',description:'In hac habitasse platea dictumst. Vivamus dictum rutrum arcu.',accentColor:'#f4b400'},
      {id:4,title:'Easy Peasy App',description:'Etiam cursus eros ac efficitur fringilla.',accentColor:'#f4b400'},
      {id:5,title:'Ad Blocker',description:'Quisque eget rutrum nisl. Nam augue justo.',accentColor:'#f4b400'},
      {id:6,title:'Money Maker',description:'Praesent convallis, libero quis congue elementum.',accentColor:'#f4b400'}
    ].forEach(renderProject);
  }
}

async function loadAnnouncements(){
  const list = $('#announcements');
  list.innerHTML = '';
  try{
    const res = await fetch(API.announcements);
    const items = await res.json();
    items.forEach(renderAnnouncement);
  }catch(e){
    console.warn('Announcements API failed, using mock', e);
    [
      {id:1,title:'Site Maintenance',description:'سيتم إجراء صيانة قصيرة مساء اليوم.'},
      {id:2,title:'Community Share Day',description:'فعالية مشاركة المجتمع يوم الخميس القادم.'},
      {id:3,title:'Updated Privacy Policy',description:'تم تحديث سياسة الخصوصية — برجاء الاطلاع.'}
    ].forEach(renderAnnouncement);
  }
}

async function loadTrending(){
  const list = $('#trending');
  list.innerHTML = '';
  try{
    const res = await fetch(API.trending);
    const items = await res.json();
    items.forEach(renderTrending);
  }catch(e){
    console.warn('Trending API failed, using mock', e);
    [
      {id:1,handle:'@tegan',name:'World Peace Builder',avatar:''},
      {id:2,handle:'@morgan',name:'Super Cool Project',avatar:''},
      {id:3,handle:'@kendall',name:'Life Changing App',avatar:''},
      {id:4,handle:'@alex',name:'No Traffic Maker',avatar:''}
    ].forEach(renderTrending);
  }
}

// ========= RENDERERS =========
function renderProjectSkeletons(n=4){
  const grid = $('#projectsGrid'); grid.innerHTML='';
  for(let i=0;i<n;i++){
    const sk = document.createElement('div');
    sk.className = 'card project';
    sk.innerHTML = `
      <div class="accent" style="background:#eee"></div>
      <div class="body">
        <div class="skeleton" style="width:50%;height:16px;margin:6px 0;"></div>
        <div class="skeleton" style="width:100%;height:12px;margin:6px 0;"></div>
        <div class="skeleton" style="width:90%;height:12px;margin:6px 0;"></div>
        <div class="skeleton" style="width:70%;height:12px;margin:6px 0;"></div>
      </div>`;
    grid.appendChild(sk);
  }
}
function renderAnnouncementSkeletons(n=3){
  const list = $('#announcements'); list.innerHTML='';
  for(let i=0;i<n;i++){
    const li = document.createElement('li');
    li.innerHTML = `
      <div class="skeleton" style="width:60%;height:14px;margin:6px 0;"></div>
      <div class="skeleton" style="width:90%;height:12px;margin:6px 0;"></div>`;
    list.appendChild(li);
  }
}
function renderTrendingSkeletons(n=4){
  const list = $('#trending'); list.innerHTML='';
  for(let i=0;i<n;i++){
    const li = document.createElement('li'); li.className='user';
    li.innerHTML = `
      <div class="skeleton" style="width:34px;height:34px;border-radius:50%"></div>
      <div style="flex:1">
        <div class="skeleton" style="width:40%;height:12px;margin:6px 0;"></div>
        <div class="skeleton" style="width:70%;height:10px;margin:6px 0;"></div>
      </div>`;
    list.appendChild(li);
  }
}

function renderProject(item){
  const tpl = $('#projectCardTpl').content.cloneNode(true);
  const card = tpl.querySelector('.card.project');
  card.dataset.search = `${item.title} ${item.description}`;
  const accent = tpl.querySelector('.accent');
  accent.style.background = item.accentColor || '#f4b400';
  setText(tpl.querySelector('.title'), item.title);
  setText(tpl.querySelector('.desc'), item.description);
  $('#projectsGrid').appendChild(tpl);
}

function renderAnnouncement(a){
  const tpl = $('#announcementItemTpl').content.cloneNode(true);
  setText(tpl.querySelector('.title'), a.title);
  setText(tpl.querySelector('.desc'), a.description);
  $('#announcements').appendChild(tpl);
}

function renderTrending(u){
  const tpl = $('#trendingItemTpl').content.cloneNode(true);
  setSrc(tpl.querySelector('img'), u.avatar, 'https://via.placeholder.com/40');
  setText(tpl.querySelector('.handle'), u.handle);
  tpl.querySelector('p').textContent = u.name || '';
  $('#trending').appendChild(tpl);
}

// skeleton style
const style = document.createElement('style');
style.textContent = `
  .skeleton{background:linear-gradient(90deg,#eee,#f5f5f5,#eee); background-size:200% 100%;
    animation:shimmer 1.1s infinite linear; border-radius:8px}
  @keyframes shimmer{0%{background-position:200% 0}100%{background-position:-200% 0}}
`;
document.head.appendChild(style);

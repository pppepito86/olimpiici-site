var OLIMPIICI_LOGO = 'olimpiici.png';
var SAP_LOGO = 'sap.png';

var _nli = document.getElementById('nav-logo-img'); if(_nli) _nli.src = OLIMPIICI_LOGO;
var _sli = document.getElementById('sap-logo-img'); if(_sli) _sli.src = SAP_LOGO;

var footerHTML = '<div class="fg4">'
  + '<div><div class="flogo"><img src="' + OLIMPIICI_LOGO + '" alt="Олимпийци"></div>'
  + '<p class="fdesc">Школа по математика и информатика в София. Вдъхновяваме следващото поколение.</p>'
  + '<div class="fcontact"><p>📍 ул. Екзарх Йосиф 73, до СМГ и метро „Сердика"</p><p>📐 Мат: 0879 868 052 (Васил)</p><p>💻 Инф: 0878 171 825 (Петър)</p><p>✉️ olimpiici@googlegroups.com</p></div>'
  + '<div style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(106,191,60,.1);display:flex;align-items:center;gap:12px">'
  + '<span style="font-size:10px;font-weight:700;color:rgba(255,255,255,.4);letter-spacing:.1em">С ПОДКРЕПАТА НА</span>'
  + '<img src="' + SAP_LOGO + '" style="height:24px;opacity:.6" alt="SAP"></div></div>'
  + '<div class="fcol"><h4>Курсове</h4>'
  + '<a onclick="navigate(\'prog-info\')">Състезателна информатика</a>'
  + '<a onclick="navigate(\'prog-math\')">Състезателна математика</a>'
  + '<a onclick="navigate(\'prog-kg\')">Кандидатстване след 4. клас и след 7. клас</a></div>'
  + '<div class="fcol"><h4>За школата</h4>'
  + '<a onclick="navigate(\'teachers\')">Учители</a>'
  + '<a onclick="navigate(\'howwelearn\')">Как учим</a>'
  + '<a onclick="navigate(\'results\')">Резултати</a>'
  + '<a onclick="navigate(\'contact\')">Контакти</a></div>'
  + '<div class="fcol"><h4>Информация</h4>'
  + '<a onclick="navigate(\'programs\')">Цени</a>'
  + '<a onclick="navigate(\'programs\')">Разписание</a>'
  + '<a href="#">GDPR</a></div></div>'
  + '<div class="fbot"><p>© 2026 Олимпийци. Всички права запазени.</p>'
  + '<div class="socrow"><a href="https://www.facebook.com/olimpiicibg" target="_blank" class="soc">f</a></div></div>';

['home','programs','prog-math','prog-info','prog-kg','teachers','results','contact','zapisvane','howwelearn','about'].forEach(function(p){
  var el = document.getElementById(p + '-footer');
  if(el) el.innerHTML = footerHTML;
});

window.addEventListener('scroll', function(){
  document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 20);
});

function toggleMenu() {
  var m = document.getElementById('mobile-menu');
  var n = document.getElementById('nav');
  if(m) m.classList.toggle('open');
  if(n) n.classList.toggle('mob-open');
}

var currentPage = 'home';

function navigate(page, fromPopState) {
  document.querySelectorAll('.page').forEach(function(p){ p.classList.remove('active'); });
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-link').forEach(function(l){ l.classList.remove('active'); });
  var topPage = page.split('-')[0];
  var navLink = document.querySelector('[data-page="' + topPage + '"]');
  if(navLink) navLink.classList.add('active');
  currentPage = page;
  window.scrollTo(0, 0);
  if(page === 'prog-info') fixProgInfoHero();
  revealElements();
  // Push to browser history (but not when called from popstate)
  if(!fromPopState) {
// history.pushState disabled in Astro
  }
}

// Handle browser back/forward

// On first load — handle direct URL with hash

function revealElements() {
  setTimeout(function(){
    var activePage = document.querySelector('.page.active');
    if(!activePage) return;
    activePage.querySelectorAll('.rv').forEach(function(el, i){
      setTimeout(function(){ el.classList.add('vis'); }, i * 60);
    });
  }, 50);
}

window.addEventListener('scroll', revealElements);
revealElements();

function showDay(idx, tab) {
  document.querySelectorAll('.stab').forEach(function(t){ t.classList.remove('active'); });
  tab.classList.add('active');
  document.querySelectorAll('.day-col').forEach(function(c){ c.classList.remove('active'); });
  document.querySelectorAll('.day-col').forEach(function(c){
    if(c.getAttribute('data-day') == idx) c.classList.add('active');
  });
}

// ── Google Forms URLs ──────────────────────────────────────────
var GF_FORMS = {
  // Годишен — обща форма (info, kg, lmat, lkg)
  default: 'https://docs.google.com/forms/d/e/1FAIpQLSf9oka4j2w2optQ2qU50iccF2wVVwGrlwNA6ougJNb2lkh0aw/formResponse',
  // Математика — отделна форма
  math: 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSdEZpigsgD3adAe-uBnvUhn0P8_bjNnutiEdGb3VdThfwtizA/formResponse',
  // Летен информатика — отделна форма
  linfo:   'https://docs.google.com/forms/u/0/d/e/1FAIpQLSeAhWXZ0wkb2L9En4vrv_LX6u3htYYdfQQM_RdHFoNKVYAnJg/formResponse'
};

function getVal(id) {
  var el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

function getSelectedPill(pillsId) {
  var container = document.getElementById(pillsId);
  if (!container) return '';
  var on = container.querySelector('.pill.on');
  return on ? on.textContent.trim() : '';
}

function buildLinfoParams(prefix) {
  var student = getVal(prefix + '-student');
  var school  = getVal(prefix + '-school') || getVal(prefix + '-school-name') || '';
  var parent  = getVal(prefix + '-parent');
  var phone   = getVal(prefix + '-phone');
  var variant = getSelectedPill('pills-' + prefix + '-grade');
  var forma   = getSelectedPill('pills-' + prefix + '-mode') || getSelectedPill('pills-' + prefix + '-format') || '';
  var comment = getVal(prefix + '-comment') || '';

  var variantVal = '';
  if (variant.indexOf('Интензивен') !== -1) variantVal = 'Интензивен';
  else if (variant.indexOf('Седмичен') !== -1) variantVal = 'Седмичен';

  var formaVal = '';
  if (forma.indexOf('Присъствено') !== -1 || forma.indexOf('Присъствен') !== -1) formaVal = 'Присъствен';
  else if (forma.indexOf('Онлайн') !== -1) formaVal = 'Онлайн';
  else formaVal = 'Няма значение';

  var params = new URLSearchParams();
  params.append('entry.1690000076', student);
  params.append('entry.708841908',  school);
  params.append('entry.314798686',  parent);
  params.append('entry.1781191301', phone);
  params.append('entry.886754292',  variantVal);
  params.append('entry.1729647064', formaVal);
  params.append('entry.1439215712', getSelectedPill('pills-' + prefix + '-dgr') || '');
  params.append('entry.583777433',  comment);
  // Required hidden fields
  params.append('fvv', '1');
  params.append('fbzx', '-1993838217932460398');
  params.append('pageHistory', '0');
  params.append('submissionTimestamp', '-1');
  return params;
}

var MATH_SCHEDULE = {
  "Математика за 3 клас": [
    { label: "Понеделник 13:00 – 15:00", value: "Опция 1" },
    { label: "Вторник 13:00 – 15:00", value: "Опция 2" },
  ],
  "Математика за 4 клас": [
    { label: "Вторник 14:00 – 16:00", value: "Опция 1" },
    { label: "Сряда 14:00 – 16:00", value: "Опция 2" },
    { label: "Неделя 10:00 – 13:00", value: "Опция 3" },
  ],
  "Математика за 5 клас": [
    { label: "Понеделник 16:00 – 18:00", value: "Опция 1" },
    { label: "Четвъртък 16:00 – 18:00", value: "Опция 2" },
  ],
  "Математика за 6 клас": [
    { label: "Събота 13:00 – 16:00", value: "Опция 1" },
  ],
  "Математика за 7 клас": [
    { label: "Неделя 16:30 – 19:30 и Четвъртък 20:15 – 22:30", value: "Опция 1" },
  ],
  "Математика за 8 клас": [
    { label: "Събота 17:00 – 20:00 и Вторник 20:15 – 22:30", value: "Опция 1" },
  ],
  "Математика за 9 клас": [
    { label: "Събота 17:00 – 20:00 и Сряда 20:15 – 22:30", value: "Опция 1" },
  ],
  "Математика за 10 клас": [
    { label: "Събота 17:00 – 20:00 и Сряда 20:15 – 22:30", value: "Опция 1" },
  ],
  "Математика за 11 клас": [
    { label: "Неделя 17:00 – 20:00 и Четвъртък 20:15 – 22:30", value: "Опция 1" },
  ],
  "Математика за 12 клас": [
    { label: "Неделя 17:00 – 20:00 и Четвъртък 20:15 – 22:30", value: "Опция 1" },
  ],
};

function updateMathSchedule(grade) {
  var container = document.getElementById('math-schedule-options');
  var wrap = document.getElementById('math-schedule-wrap');
  var labelEl = document.getElementById('math-schedule-label');
  if (!container) return;
  var options = MATH_SCHEDULE[grade] || [];
  container.innerHTML = '';
  if (!options.length) { wrap.style.display = 'none'; return; }

  wrap.style.display = 'block';

  if (options.length === 1) {
    // Само една опция — показваме като съобщение, изпращаме автоматично
    labelEl.textContent = 'ВРЕМЕНА НА ПРОВЕЖДАНЕ';
    var info = document.createElement('div');
    info.style.cssText = 'padding:12px 16px;background:var(--gl);border:1.5px solid var(--gm);border-radius:10px;font-size:14px;font-weight:600;color:var(--gd);';
    info.textContent = '📅 ' + options[0].label;
    // Hidden checkbox auto-checked
    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = true;
    cb.value = options[0].value;
    cb.name = 'math-time';
    cb.style.display = 'none';
    container.appendChild(info);
    container.appendChild(cb);
  } else {
    // Няколко опции — показваме checkbox-и
    labelEl.textContent = 'КОИ ВРЕМЕНА СА ВИ УДОБНИ? *';
    var note = document.createElement('div');
    note.style.cssText = 'font-size:12px;color:var(--muted);margin-bottom:10px;font-weight:500';
    note.textContent = 'Отбележете всички удобни варианти. Групи се сформират при достатъчно желаещи.';
    container.appendChild(note);
    options.forEach(function(opt) {
      var label = document.createElement('label');
      label.style.cssText = 'display:flex;align-items:center;gap:10px;padding:10px 14px;border:1.5px solid var(--border);border-radius:10px;cursor:pointer;font-size:14px;font-weight:600;color:var(--dark);transition:all .2s;';
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.value = opt.value;
      cb.name = 'math-time';
      cb.style.cssText = 'width:16px;height:16px;accent-color:var(--green);cursor:pointer;flex-shrink:0;';
      cb.addEventListener('change', function() {
        label.style.borderColor = this.checked ? 'var(--green)' : 'var(--border)';
        label.style.background = this.checked ? 'var(--gl)' : '';
      });
      var span = document.createElement('span');
      span.textContent = opt.label;
      label.appendChild(cb);
      label.appendChild(span);
      container.appendChild(label);
    });
  }
}

function buildMathParams() {
  var school    = getSelectedPill('pills-math-school') || '';
  var student   = getVal('math-student');
  var училище   = getVal('math-school-name') || '';
  var stuPhone  = getVal('math-student-phone') || '';
  var parent    = getVal('math-parent');
  var phone     = getVal('math-phone');
  var email     = getVal('math-email') || '';
  var mode      = getSelectedPill('pills-math-mode') || '';
  var source    = getSelectedPill('pills-math-source') || '';
  var comment   = getVal('math-comment') || '';

  var params = new URLSearchParams();
  params.append('entry.1270370571', school);
  params.append('entry.1512767394', student);
  params.append('entry.666939493',  училище);
  params.append('entry.2013505468', stuPhone);
  params.append('entry.1543559985', parent);
  params.append('entry.1616618070', phone);
  params.append('entry.1109161686', email);
  params.append('entry.1404918652', mode);
  if (source) params.append('entry.2048661200', source);
  params.append('entry.92124711',   comment);
  // Избрани времена (checkbox-и)
  document.querySelectorAll('#math-schedule-options input[type=checkbox]:checked').forEach(function(cb) {
    params.append('entry.1754310435', cb.value);
  });
  params.append('fvv', '1');
  params.append('fbzx', '-4482582470081292972');
  params.append('pageHistory', '0');
  params.append('submissionTimestamp', '-1');
  return params;
}

function buildDefaultParams(prefix) {
  var student = getVal(prefix + '-student');
  var school  = getVal(prefix + '-school') || getVal(prefix + '-school-name') || '';
  var parent  = getVal(prefix + '-parent');
  var phone   = getVal(prefix + '-phone');
  var email   = getVal(prefix + '-email') || '';
  var grade   = getSelectedPill('pills-' + prefix + '-grade');
  var mode    = getSelectedPill('pills-' + prefix + '-mode') || getSelectedPill('pills-' + prefix + '-format') || '';
  var comment = getVal(prefix + '-comment') || '';

  var params = new URLSearchParams();
  params.append('entry.622664022',  student);
  params.append('entry.279089776',  school);
  params.append('entry.1922297918', parent);
  params.append('entry.625879832',  phone);
  params.append('entry.552374451',  email);
  params.append('entry.1107881791', grade);
  params.append('entry.1416234456', mode);
  params.append('entry.246809566',  comment);
  return params;
}

function submitToGoogleForms(prefix, btn) {
  var student = getVal(prefix + '-student');
  var parent  = getVal(prefix + '-parent');
  var phone   = getVal(prefix + '-phone');

  if (prefix === 'math') {
    var mathSchool = getSelectedPill('pills-math-school');
    if (!mathSchool) { alert('Моля, изберете клас.'); return; }
  }
  if (!student) { alert('Моля, попълнете името на ученика.'); return; }
  if (prefix !== 'math') {
    if (!parent)  { alert('Моля, попълнете името на родител/настойника.'); return; }
    if (!phone)   { alert('Моля, попълнете телефон за връзка.'); return; }
    if (phone.replace(/[^0-9]/g,'').length < 9) { alert('Моля, въведете валиден телефон на родител.'); return; }
  }
  if (prefix === 'math') {
    var mathSchool = getSelectedPill('pills-math-school');
    var mathStuPhone = getVal('math-student-phone');
    var mathUchilishte = getVal('math-school-name');
    var mathEmail = getVal('math-email');
    var mathMode = getSelectedPill('pills-math-mode');
    var mathSource = getSelectedPill('pills-math-source');
    if (!mathUchilishte)  { alert('Моля, попълнете училище.'); return; }
    if (!mathStuPhone)    { alert('Моля, попълнете телефон на ученика.'); return; }
    if (mathStuPhone.replace(/[^0-9]/g,'').length < 9) { alert('Моля, въведете валиден телефон на ученика.'); return; }
    if (!parent)  { alert('Моля, попълнете името на родител/настойника.'); return; }
    if (!phone)   { alert('Моля, попълнете телефон за връзка.'); return; }
    if (phone.replace(/[^0-9]/g,'').length < 9) { alert('Моля, въведете валиден телефон на родител.'); return; }
    if (!mathEmail)       { alert('Моля, попълнете имейл на родител.'); return; }
    if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mathEmail))) { alert('Моля, въведете валиден имейл адрес.'); return; }
    if (!mathMode)        { alert('Моля, изберете форма на обучение.'); return; }

    var checkedTimes = document.querySelectorAll('#math-schedule-options input[type=checkbox]:checked');
    var scheduleVisible = document.getElementById('math-schedule-wrap').style.display !== 'none';
    var isMultiple = document.querySelectorAll('#math-schedule-options input[type=checkbox]').length > 1;
    if (scheduleVisible && isMultiple && checkedTimes.length === 0) {
      alert('Моля, изберете поне едно удобно време.'); return;
    }
  }

  btn.textContent = '⏳ Изпращане...';
  btn.disabled = true;

  // Събираме данните за Apps Script
  var school   = getVal(prefix + '-school') || getVal(prefix + '-school-name') || '';
  var email    = getVal(prefix + '-email') || '';
  var comment  = getVal(prefix + '-comment') || '';
  var variant  = getSelectedPill('pills-' + prefix + '-grade') || '';
  var forma    = getSelectedPill('pills-' + prefix + '-mode') || '';
  var dgr      = getSelectedPill('pills-' + prefix + '-dgr') || '';
  var grade    = getSelectedPill('pills-' + prefix + '-klас') || getSelectedPill('pills-' + prefix + '-grade2') || '';
  var formMode = getSelectedPill('pills-' + prefix + '-forma') || '';

  var payload = {
    form_type: prefix,
    student:   student,
    school:    prefix === 'math' ? getSelectedPill('pills-math-school') || '' : school,
    parent:    parent,
    phone:     phone,
    email:     email,
    variant:   variant || grade,
    forma:     forma || formMode,
    dgr:       dgr,
    comment:   comment
  };
  if (prefix === 'math') {
    payload.student_phone = getVal('math-student-phone') || '';
    payload.source = getSelectedPill('pills-math-source') || '';
    payload.school_name = getVal('math-school-name') || '';
  }

  var GAS_URL = 'https://script.google.com/macros/s/AKfycbz4mdwpr0XXmBJjeE2mwe0Z8jilfwEtHqL7LQ4Ae_tm26jqf8HGUUqtNTDnWywsAOCrLg/exec';

  // 1. Пращаме към Apps Script (реален fetch — знаем дали е ОК)
  fetch(GAS_URL, {
    method: 'POST',
    body: JSON.stringify(payload)
  })
  .then(function(res) { return res.json(); })
  .then(function(json) {
    if (json.status === 'ok') {
      // 2. Успех от Sheets — опитваме и Forms (fire-and-forget, без CORS проблем)
      sendToGoogleForms(prefix);

      btn.textContent = '✅ Заявката е изпратена!';
      btn.style.background = '#3a8a10';
      var form = btn.closest('.rform');
      if (form) {
        form.querySelectorAll('input, textarea').forEach(function(inp){ inp.value = ''; });
        form.querySelectorAll('.pill.on').forEach(function(p){ p.classList.remove('on'); });
        form.querySelectorAll('input[type=checkbox]').forEach(function(cb){
          cb.checked = false;
          if (cb.parentElement) {
            cb.parentElement.style.borderColor = 'var(--border)';
            cb.parentElement.style.background = '';
          }
        });
      }
      // Изчистване на math schedule
      var schedWrap = document.getElementById('math-schedule-wrap');
      if (schedWrap) schedWrap.style.display = 'none';
      // Върни стъпка 1 и 2
      var typeSelector = document.getElementById('type-selector');
      if (typeSelector) typeSelector.style.display = 'none';
      document.querySelectorAll('#subject-cards .course-card').forEach(function(c){
        c.style.borderColor = c.style.background && c.style.background.includes('fbeef5') ? '#f0c0d8' : 'var(--border)';
        c.style.transform = '';
        c.style.boxShadow = '';
      });
      hideAllForms();
      setTimeout(function(){
        btn.textContent = 'Изпрати заявка →';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    } else {
      throw new Error(json.message || 'Грешка');
    }
  })
  .catch(function(err) {
    console.error('GAS error:', err);
    btn.textContent = '❌ Грешка при изпращане — опитайте пак';
    btn.style.background = '#c0392b';
    setTimeout(function(){
      btn.textContent = 'Изпрати заявка →';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  });
}

// Fire-and-forget към Google Forms (без error detection — само за backup)
function sendToGoogleForms(prefix) {
  try {
    var params, url;
    if (prefix === 'linfo') {
      params = buildLinfoParams(prefix);
      url = GF_FORMS.linfo;
    } else if (prefix === 'math') {
      params = buildMathParams();
      url = GF_FORMS.math;
    } else {
      params = buildDefaultParams(prefix);
      url = GF_FORMS.default;
    }
    url = url.replace('/u/0/', '/');

    var iframeName = 'gf-ff-' + Date.now();
    var iframe = document.createElement('iframe');
    iframe.name = iframeName;
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    var hiddenForm = document.createElement('form');
    hiddenForm.method = 'POST';
    hiddenForm.action = url;
    hiddenForm.target = iframeName;
    hiddenForm.style.display = 'none';

    params.forEach(function(value, key) {
      var input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      hiddenForm.appendChild(input);
    });

    document.body.appendChild(hiddenForm);
    hiddenForm.submit();

    // Почистваме след 5 сек
    setTimeout(function() {
      try { document.body.removeChild(hiddenForm); } catch(e) {}
      try { document.body.removeChild(iframe); } catch(e) {}
    }, 5000);
  } catch(e) {
    console.warn('Google Forms backup failed:', e);
  }
}


function submitForm() {
  // Legacy call from hero section button
  var btn = document.getElementById('submitBtn');
  if(!btn) return;
  btn.textContent = '✅ Заявката е изпратена!';
  btn.style.background = '#3a8a10';
  btn.disabled = true;
  setTimeout(function(){
    btn.textContent = 'Тествай потенциала си →';
    btn.style.background = '';
    btn.disabled = false;
  }, 4000);
}

var selectedSubject = null;

function selectSubject(subject, card) {
  selectedSubject = subject;
  document.querySelectorAll('#subject-cards .course-card').forEach(function(c){
    c.style.borderColor = c.style.background.includes('fbeef5') ? '#f0c0d8' : 'var(--border)';
    c.style.transform = '';
    c.style.boxShadow = '';
  });
  card.style.borderColor = 'var(--green)';
  card.style.transform = 'translateY(-3px)';
  card.style.boxShadow = '0 8px 24px rgba(106,191,60,.2)';
  var ts = document.getElementById('type-selector');
  ts.style.display = 'block';
  ts.scrollIntoView({behavior:'smooth', block:'nearest'});
  document.querySelectorAll('.type-card').forEach(function(c){
    c.style.borderColor = c.style.background.includes('fff8e1') ? '#ffd54f' : 'var(--border)';
    c.style.transform = '';
    c.style.boxShadow = '';
  });
  hideAllForms();
  // Показваме летен само за информатика
  var letenCard = document.getElementById('type-card-leten');
  if (letenCard) letenCard.style.display = (subject === 'info') ? 'flex' : 'none';
}

function selectType(type, cardEl) {
  if(!selectedSubject) { console.log('NO SUBJECT!'); return; }
  document.querySelectorAll('.type-card').forEach(function(c){
    c.style.borderColor = c.style.background.includes('fff8e1') ? '#ffd54f' : 'var(--border)';
    c.style.transform = '';
    c.style.boxShadow = '';
  });
  if(cardEl) {
    cardEl.style.borderColor = 'var(--green)';
    cardEl.style.transform = 'translateY(-3px)';
    cardEl.style.boxShadow = '0 8px 24px rgba(106,191,60,.2)';
  }
  var map = {
    'годишен-info': 'form-info',
    'годишен-math': 'form-math',
    'годишен-kg':   'form-годишен-кг',
    'летен-info':   'form-летен-инф',
    'летен-math':   'form-летен-мат',
    'летен-kg':     'form-летен-кг'
  };
  hideAllForms();
  var key = type + '-' + selectedSubject;
  var formEl = document.getElementById(map[key]);
  if(formEl) {
    formEl.style.display = 'block';
    console.log('display set to block, actual display:', formEl.style.display, 'parent display:', formEl.parentElement.style.display);
    setTimeout(function(){ formEl.scrollIntoView({behavior:'smooth', block:'start'}); }, 50);
  }
}

function hideAllForms() {
  ['form-info','form-math','form-летен-инф','form-летен-мат','form-годишен-кг','form-летен-кг'].forEach(function(id){
    var el = document.getElementById(id);
    if(el) el.style.display = 'none';
  });
}

function setSummerCourse() {
  setTimeout(function(){
    var infoCard = document.querySelector('#subject-cards .course-card');
    if(infoCard) {
      selectSubject('info', infoCard);
      setTimeout(function(){
        var summerCard = document.querySelectorAll('.type-card')[1];
        if(summerCard) summerCard.click();
      }, 300);
    }
  }, 150);
}

function submitFormBtn(btn) {
  // Legacy fallback — redirect to Google Forms submit
  submitToGoogleForms('info', btn);
}

function selectOne(el, group) {
  var container = el.parentElement;
  container.querySelectorAll('.pill').forEach(function(p){ p.classList.remove('on'); });
  el.classList.add('on');
}

function downloadPDF() {
  var inp = document.getElementById('magnetEmail');
  if(!inp.value){ inp.focus(); return; }
  var btn = document.querySelector('.magnet-btn');
  btn.textContent = '✅ Изпратено!';
  btn.style.background = '#3a8a10';
  setTimeout(function(){ btn.textContent = 'Изпрати ми PDF →'; btn.style.background = ''; }, 3000);
}

function fixProgInfoHero() {
  var grid = document.getElementById('prog-info-grid');
  var hero = document.getElementById('prog-info-hero');
  if(!grid) return;
  if(window.innerWidth <= 1024) {
    grid.style.gridTemplateColumns = '1fr';
    if(hero) hero.style.padding = '36px 24px 32px';
  } else {
    grid.style.gridTemplateColumns = '1.2fr 1fr';
    if(hero) hero.style.padding = '56px 56px 48px';
  }
}
window.addEventListener('resize', fixProgInfoHero);
fixProgInfoHero();

var linfoSelectedVariant = 0;

function selectLinfoVariant(v) {
  linfoSelectedVariant = v;
  var v1card = document.getElementById('linfo-v1-card');
  var v2card = document.getElementById('linfo-v2-card');

  if (v1card) v1card.style.borderColor = v === 1 ? 'var(--green)' : '#ffd54f';
  if (v2card) v2card.style.borderColor = v === 2 ? 'var(--green)' : 'var(--border)';
  if (v1card) v1card.style.background  = v === 1 ? '#f0fce6' : '#fff8e1';
  if (v2card) v2card.style.background  = v === 2 ? '#f0fce6' : '#f3f8ff';



  // Also select the corresponding pill
  var pills = document.querySelectorAll('#pills-linfo-grade .pill');
  pills.forEach(function(p) { p.classList.remove('on'); });
  if (pills[v-1]) pills[v-1].classList.add('on');
}

function selectLinfoVariantPill(el, v) {
  selectOne(el, 'linfo-grade');
  selectLinfoVariant(v);
}

var homeLink = document.querySelector('[data-page="home"]');
if(homeLink) homeLink.classList.add('active');
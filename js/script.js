// Dados editáveis da unidade. Substitua os placeholders antes da publicação.
const UNIT = { name:'Kumon Vila Flórida', phone:'(11) 2847-0695', whatsappPhone:'+55 11 97952-4667', whatsapp:'https://wa.me/5511979524667', address:'Rua Sebastião Bernardino de Seixas, 139 — Vila Flórida, Guarulhos — SP, 07196-120', hours:'Seg., ter., qui. e sex. 09h–18h; qua. 09h–16h; sáb. 08h–12h; dom. fechado', instagram:'https://www.instagram.com/kumon.vilaflorida/', maps:'https://www.google.com/maps/search/?api=1&query=Rua+Sebastião+Bernardino+de+Seixas+139+Vila+Flórida+Guarulhos+SP+07196-120' };
const $=(s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const header=$('.header'), menu=$('.menu'), toggle=$('.menu-toggle'), wa=$('.whatsapp'), topBtn=$('.back-top');
function closeMenu(){menu.classList.remove('open');toggle.classList.remove('active');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu');document.body.classList.remove('menu-open')}
toggle.addEventListener('click',()=>{const open=!menu.classList.contains('open');menu.classList.toggle('open',open);toggle.classList.toggle('active',open);toggle.setAttribute('aria-expanded',open);toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');document.body.classList.toggle('menu-open',open)});
$$('.menu a').forEach(a=>a.addEventListener('click',closeMenu));
window.addEventListener('scroll',()=>{const on=scrollY>30;header.classList.toggle('scrolled',on);wa.classList.toggle('show',scrollY>420);topBtn.classList.toggle('show',scrollY>700)},{passive:true});
topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const flowSections=$$('main > section:not(.hero)');
flowSections.forEach(section=>section.classList.add('section-flow'));
if(!reduced){
  document.body.classList.add('motion-ready');
  const flowObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('section-in-view');flowObserver.unobserve(entry.target)}}),{threshold:.06,rootMargin:'0px 0px -8% 0px'});
  flowSections.forEach(section=>flowObserver.observe(section));
}else{
  flowSections.forEach(section=>section.classList.add('section-in-view'));
}
const revealObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revealObserver.unobserve(e.target)}}),{threshold:.12});
$$('.reveal').forEach(el=>reduced?el.classList.add('visible'):revealObserver.observe(el));
const sections=$$('main section[id]'), navLinks=$$('.menu a[href^="#"]');
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){navLinks.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+e.target.id))}}),{rootMargin:'-35% 0px -55%'});sections.forEach(s=>sectionObserver.observe(s));

const track=$('.testimonial-track'), slides=$$('.testimonial'), dots=$('.dots');let index=0,timer,interacted=false,touchX=0;
slides.forEach((_,i)=>{const b=document.createElement('button');b.className='dot';b.setAttribute('aria-label',`Ir ao depoimento ${i+1}`);b.addEventListener('click',()=>go(i,true));dots.appendChild(b)});
function go(i,user=false){index=(i+slides.length)%slides.length;track.style.transform=`translateX(-${index*100}%)`;$$('.dot').forEach((d,n)=>d.classList.toggle('active',n===index));if(user){interacted=true;clearInterval(timer)}}
$('.slider-prev').addEventListener('click',()=>go(index-1,true));$('.slider-next').addEventListener('click',()=>go(index+1,true));track.addEventListener('touchstart',e=>touchX=e.touches[0].clientX,{passive:true});track.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-touchX;if(Math.abs(dx)>40)go(index+(dx<0?1:-1),true)},{passive:true});go(0);if(!reduced)timer=setInterval(()=>{if(!interacted)go(index+1)},5500);

const counterObserver=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=Number(el.dataset.counter);if(target>0&&!reduced){let n=0;const tick=()=>{n+=1;el.textContent=n;if(n<target)requestAnimationFrame(tick)};tick()}else if(target>0)el.textContent=target;counterObserver.unobserve(el)}),{threshold:.5});$$('[data-counter]').forEach(c=>counterObserver.observe(c));

function validWhatsApp(){return !UNIT.whatsapp.includes('INSERIR')}
$$('[data-wa]').forEach(a=>{if(validWhatsApp()){a.href=`${UNIT.whatsapp}?text=${encodeURIComponent('Olá! Conheci o site do Kumon Vila Flórida e gostaria de saber mais sobre os cursos e a avaliação inicial.')}`;a.target='_blank';a.rel='noopener'}a.addEventListener('click',e=>{if(!validWhatsApp()){e.preventDefault();$('#contato').scrollIntoView({behavior:'smooth'})}})});
$('.whatsapp').addEventListener('click',e=>{if(!validWhatsApp())e.preventDefault()});

const form=$('#contact-form');
form.addEventListener('submit',e=>{e.preventDefault();const status=$('.form-status',form), required=$$('[required]',form);required.forEach(f=>f.classList.remove('invalid'));const invalid=required.filter(f=>f.type==='checkbox'?!f.checked:!f.value.trim());if(invalid.length){invalid.forEach(f=>f.classList.add('invalid'));status.textContent='Revise os campos obrigatórios antes de continuar.';invalid[0].focus();return}const d=new FormData(form);const message=`Olá! Conheci o site do ${UNIT.name} e gostaria de agendar uma avaliação.\n\nResponsável: ${d.get('responsavel')}\nAluno: ${d.get('aluno')}\nIdade: ${d.get('idade')}\nCurso: ${d.get('curso')}\nTelefone: ${d.get('telefone')}\nMelhor horário: ${d.get('horario')}\nMensagem: ${d.get('mensagem')||'Não informada'}`;if(!validWhatsApp()){status.textContent='Solicitação validada. Configure o link do WhatsApp em js/script.js para habilitar o envio.';return}status.textContent='Tudo certo! Abrindo o WhatsApp…';window.open(`${UNIT.whatsapp}${UNIT.whatsapp.includes('?')?'&':'?'}text=${encodeURIComponent(message)}`,'_blank','noopener')
// Integração futura com e-mail, banco de dados ou Supabase pode ser adicionada aqui.
});

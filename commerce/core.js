/* الضامن للمحلات — بيانات ومنطق مشترك (نسخة تجريبية) · SULAIMAN O. ALKHATEEB */
(function(){
var PAGE={merchant:'merchant.html',muni:'municipality.html',provider:'provider.html'};
window.DZ_GUARD=function(role){try{var s=JSON.parse(sessionStorage.getItem('dz_session')||'null');
  if(!s||s.role!==role){(window.top||window).location.replace('login.html?r='+role);return null}
  window.DZ_SESSION=s;var fr=window.top!==window;if(fr)document.documentElement.classList.add('framed');
  if(s.view==='mobile'&&!fr&&window.innerWidth>820){location.replace('frame.html?p='+PAGE[role]);return null}return s}catch(e){return null}};
window.dzLogout=function(){try{sessionStorage.removeItem('dz_session')}catch(e){}(window.top||window).location.href='login.html'};
window.dzView=function(v){try{var s=JSON.parse(sessionStorage.getItem('dz_session')||'{}');s.view=v;sessionStorage.setItem('dz_session',JSON.stringify(s))}catch(e){}
  (window.top||window).location.href=v==='mobile'?'frame.html?p='+PAGE[s.role]:PAGE[s.role]};
})();

const DZ={};
DZ.today=new Date();DZ.today.setHours(12,0,0,0);
DZ.d=n=>{const x=new Date(DZ.today);x.setDate(x.getDate()+n);return x.toISOString().slice(0,10)};
DZ.days=iso=>Math.round((new Date(iso+'T12:00:00')-DZ.today)/864e5);
DZ.fmt=n=>Math.round(n).toLocaleString('en-US');
DZ.date=iso=>{if(!iso)return '—';const [y,m,d]=iso.split('-');return `${+d}/${+m}/${y}`};
DZ.get=(k,def)=>{try{const v=localStorage.getItem(k);return v?JSON.parse(v):def}catch(e){return def}};
DZ.set=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};

DZ.LV={1:{n:'سلامة المنشأة',ic:'fa-fire-extinguisher',c:'#E5484D'},2:{n:'صحة المنشأة والعاملين',ic:'fa-notes-medical',c:'#E8962A'},3:{n:'سلوك المطبخ · عين الضامن',ic:'fa-eye',c:'#0FB3A6'}};
DZ.CAT={fire:'أنظمة الحريق والسلامة',cam:'كاميرات المراقبة',pest:'مكافحة الحشرات',health:'فحوصات الشهادة الصحية',clean:'تنظيف الخزانات والدكت',cold:'حساسات التبريد'};
DZ.PROV=[
 {id:'p1',name:'مؤسسة درع الأمان لأنظمة السلامة',cat:'fire',rate:4.8,jobs:1240,city:'الرياض',acc:true,lic:'DC-22841'},
 {id:'p2',name:'شركة رؤية الأمن للكاميرات',cat:'cam',rate:4.7,jobs:860,city:'الرياض',acc:true,lic:'MOI-CCTV-1187'},
 {id:'p3',name:'مؤسسة البيئة النقية لمكافحة الحشرات',cat:'pest',rate:4.6,jobs:2110,city:'الرياض',acc:true,lic:'PC-4410'},
 {id:'p4',name:'مختبر الصفوة الطبي',cat:'health',rate:4.5,jobs:3900,city:'الرياض',acc:true,lic:'MOH-L-7731'},
 {id:'p5',name:'شركة الصفاء لتنظيف الخزانات والدكت',cat:'clean',rate:4.6,jobs:740,city:'الرياض',acc:true,lic:'CL-3302'},
 {id:'p6',name:'تقنيات التبريد الذكي',cat:'cold',rate:4.9,jobs:310,city:'الرياض',acc:true,lic:'IOT-0921'},
 {id:'p7',name:'مؤسسة الحماية الأولى',cat:'fire',rate:4.4,jobs:520,city:'الرياض',acc:true,lic:'DC-19022'}];
DZ.prov=id=>DZ.PROV.find(p=>p.id===id)||{name:'غير معتمد',cat:''};

function A(id,lvl,cat,name,ic,every,lastAgo,prov,extra){const o={id,lvl,cat,name,ic,every,prov:prov||null,verified:true,inv:prov?('DZ-'+(48000+Math.floor(Math.abs(Math.sin(id.length*9+lastAgo))*9000))):null};
  if(lastAgo===null){o.last=null;o.next=null}else{o.last=DZ.d(-lastAgo);o.next=DZ.d(every-lastAgo)}return Object.assign(o,extra||{})}
DZ.seed=function(){return {
 m1:{id:'m1',name:'مطعم السفرة الذهبية',act:'مطعم',food:true,dist:'النرجس',cr:'1010882314',lic:'44108823',licExp:DZ.d(38),owner:'عبدالرحمن القحطاني',workers:7,vision:true,visionScore:86,
  cams:[{id:'CAM-01',n:'الكاشير',on:true},{id:'CAM-02',n:'المطبخ · التحضير',on:true},{id:'CAM-03',n:'المطبخ · الشواية',on:true},{id:'CAM-04',n:'المخزن',on:true}],
  assets:[A('ext-co2',1,'fire','طفايات ثاني أكسيد الكربون ×2','fa-fire-extinguisher',365,140,'p1'),A('ext-pw',1,'fire','طفايات البودرة ×3','fa-fire-extinguisher',365,353,'p1'),
   A('alarm',1,'fire','نظام إنذار الحريق','fa-bell',180,60,'p1'),A('smoke',1,'fire','كواشف الدخان ×6','fa-circle-dot',180,60,'p1'),A('elight',1,'fire','إنارة ومخارج الطوارئ','fa-person-running',180,95,'p1'),
   A('hood',1,'fire','نظام إطفاء الشفاط','fa-fan',180,30,'p7'),A('cams',1,'cam','كاميرات المراقبة ×4','fa-video',365,200,'p2',{camAsset:true}),
   A('health',2,'health','الشهادات الصحية للعاملين (7)','fa-id-card',365,356,'p4',{note:'شهادة العامل «محمد رفيق» تنتهي قريباً'}),A('pest',2,'pest','مكافحة الحشرات','fa-bug-slash',30,12,'p3'),
   A('tank',2,'clean','تنظيف وتعقيم الخزانات','fa-droplet',180,70,'p5'),A('duct',2,'clean','تنظيف الشفاط والدكت','fa-wind',90,40,'p5'),A('cold',2,'cold','حساسات حرارة الثلاجات ×3','fa-temperature-low',365,90,'p6',{temp:'3.2°'})]},
 m2:{id:'m2',name:'مخبز ريحانة الصباح',act:'مخبز',food:true,dist:'الياسمين',cr:'1010917725',lic:'44119077',licExp:DZ.d(20),owner:'ناصر الدوسري',workers:5,vision:false,visionScore:null,
  cams:[{id:'CAM-01',n:'الكاشير',on:true},{id:'CAM-02',n:'منطقة الخبز',on:false},{id:'CAM-03',n:'المخزن',on:true}],
  assets:[A('ext-co2',1,'fire','طفايات ثاني أكسيد الكربون ×2','fa-fire-extinguisher',365,410,'p7',{note:'ملصق محدّث بدون فاتورة صيانة'}),A('ext-pw',1,'fire','طفايات البودرة ×2','fa-fire-extinguisher',365,120,'p1'),
   A('alarm',1,'fire','نظام إنذار الحريق','fa-bell',180,90,'p1'),A('smoke',1,'fire','كواشف الدخان ×4','fa-circle-dot',180,200,'p1'),A('elight',1,'fire','إنارة ومخارج الطوارئ','fa-person-running',180,null,null),
   A('oven',1,'fire','نظام إطفاء الأفران','fa-fire-burner',180,50,'p7'),A('cams',1,'cam','كاميرات المراقبة ×3','fa-video',365,150,'p2',{camAsset:true}),
   A('health',2,'health','الشهادات الصحية للعاملين (5)','fa-id-card',365,380,'p4',{note:'شهادتان منتهيتان'}),A('pest',2,'pest','مكافحة الحشرات','fa-bug-slash',30,50,'p3'),
   A('tank',2,'clean','تنظيف وتعقيم الخزانات','fa-droplet',180,100,'p5'),A('cold',2,'cold','حساسات حرارة الثلاجات','fa-temperature-low',365,null,null)]}}};
DZ.SK='dz_shops_v1';
DZ.shops=()=>{let s=DZ.get(DZ.SK,null);if(!s||!s.m1||!s.m2){s=DZ.seed();DZ.set(DZ.SK,s)}return s};
DZ.saveShops=s=>DZ.set(DZ.SK,s);
DZ.reset=()=>{['dz_shops_v1','dz_jobs_v1','dz_ver_v1','dz_issued_v1','dz_insp_v1','dz_pst_v1'].forEach(k=>{try{localStorage.removeItem(k)}catch(e){}})};

/* status of an asset */
DZ.ast=function(a,shop){
 if(a.camAsset){const off=shop.cams.filter(c=>!c.on);if(off.length)return {k:'bad',t:off.length+' كاميرا متوقفة',c:'c-r',ok:false}}
 if(!a.last)return {k:'miss',t:'غير مسجّل',c:'c-r',ok:false};
 if(a.verified==='pending')return {k:'pend',t:'بانتظار تحقق المزود',c:'c-b',ok:false};
 if(a.verified===false)return {k:'unv',t:'فاتورة غير موثقة',c:'c-r',ok:false};
 const n=DZ.days(a.next);if(n<0)return {k:'exp',t:'منتهي منذ '+(-n)+' يوم',c:'c-r',ok:false};
 if(a.id==='health'&&a.note&&n<=30)return {k:'due',t:'تنتهي خلال '+n+' يوم',c:'c-a',ok:true};
 if(n<=30)return {k:'due',t:'مستحق خلال '+n+' يوم',c:'c-a',ok:true};
 return {k:'ok',t:'سليم · حتى '+DZ.date(a.next),c:'c-o',ok:true}};
/* ladder evaluation — basics gate everything */
DZ.eval=function(shop){
 const L={1:[],2:[]};shop.assets.forEach(a=>L[a.lvl].push({a,s:DZ.ast(a,shop)}));
 const bad=l=>L[l].filter(x=>!x.s.ok);const due=l=>L[l].filter(x=>x.s.k==='due');
 const l1=bad(1).length===0,l2ok=bad(2).length===0;
 const st={1:l1?'done':'fail',2:!l1?'locked':(l2ok?'done':'fail'),3:!(l1&&l2ok)?'locked':(shop.vision?(shop.visionScore>=85?'done':'warn'):'off')};
 const p1=L[1].filter(x=>x.s.ok).length/L[1].length,p2=L[2].filter(x=>x.s.ok).length/L[2].length;
 let score=Math.round(p1*50+(l1?p2*30:0)+(st[3]==='done'||st[3]==='warn'?(shop.visionScore/100)*20:(l1&&l2ok?10:0)));
 if(!l1)score=Math.min(score,40);
 const risk=!l1?'high':(!l2ok&&shop.food?'mid':(score>=85?'low':'mid'));
 const ready=l1&&(!shop.food||l2ok);
 return {L,st,score,risk,ready,badge:st[1]==='done'&&st[2]==='done'&&st[3]==='done',bad1:bad(1),bad2:bad(2),due:[...due(1),...due(2)]}};
DZ.RISK={high:['مرتفع','c-r'],mid:['متوسط','c-a'],low:['منخفض','c-o']};

/* jobs & verifications */
DZ.jobs=()=>{let j=DZ.get('dz_jobs_v1',null);if(!j){j=[
 {id:'J-3107',shop:'x12',shopName:'مطعم ورق عنب',dist:'الملقا',asset:'ext-co2',assetName:'تعبئة طفايات ثاني أكسيد الكربون ×4',prov:'p1',st:0,date:DZ.d(2),amt:640},
 {id:'J-3104',shop:'x07',shopName:'صيدلية الشفاء الحديثة',dist:'النرجس',asset:'alarm',assetName:'صيانة نظام إنذار الحريق',prov:'p1',st:1,date:DZ.d(1),amt:900},
 {id:'J-3099',shop:'x21',shopName:'كافيه نقطة البن',dist:'العارض',asset:'smoke',assetName:'استبدال كواشف الدخان ×5',prov:'p1',st:2,date:DZ.d(-3),amt:450,cert:'DZ-55120'},
 {id:'J-3102',shop:'x15',shopName:'مطبخ أم فهد للمناسبات',dist:'الياسمين',asset:'cams',assetName:'إصلاح كاميرا المطبخ',prov:'p2',st:0,date:DZ.d(1),amt:380}];DZ.set('dz_jobs_v1',j)}return j};
DZ.saveJobs=j=>DZ.set('dz_jobs_v1',j);
DZ.vers=()=>{let v=DZ.get('dz_ver_v1',null);if(!v){v=[{id:'V-881',shop:'x09',shopName:'بقالة الأفق',asset:'ext-pw',assetName:'طفايات البودرة ×2',prov:'p1',inv:'INV-77310',amt:260,date:DZ.d(-1),st:0},
 {id:'V-879',shop:'x30',shopName:'مطعم شاورما الحي',asset:'ext-co2',assetName:'طفايات ثاني أكسيد الكربون',prov:'p1',inv:'INV-11002',amt:180,date:DZ.d(-2),st:0,flag:'رقم الفاتورة غير موجود في سجلات المؤسسة'}];DZ.set('dz_ver_v1',v)}return v};
DZ.saveVers=v=>DZ.set('dz_ver_v1',v);
DZ.certNo=()=>'DZ-'+(56000+Math.floor(Math.random()*3999));
/* apply verified certificate to a detailed shop asset */
DZ.applyCert=function(shopId,assetId,provId,cert){const s=DZ.shops();const sh=s[shopId];if(!sh)return false;const a=sh.assets.find(x=>x.id===assetId);if(!a)return false;
 a.last=DZ.d(0);a.next=DZ.d(a.every);a.verified=true;a.prov=provId;a.inv=cert;delete a.note;if(a.camAsset)sh.cams.forEach(c=>c.on=true);DZ.saveShops(s);return true};

/* generated city shops for the municipality view */
DZ.city=function(){let seed=7;const r=()=>(seed=(seed*16807)%2147483647)/2147483647;
 const N=['مطعم','كافيه','مخبز','بقالة','صيدلية','مطبخ مناسبات','محل حلويات','ملحمة','مغسلة ملابس','صالون'],
 NM=['الواحة','الريم','نجد','الفيصلية','الأصالة','البيت السعيد','الحي','الزيتونة','المذاق','الخير','النخيل','الديرة','السنبلة','الربيع','الهلال','الفرسان','اللؤلؤة','الصفوة'],
 D=['النرجس','الياسمين','الملقا','العارض','القيروان','حطين','الصحافة','الربيع'],out=[];
 for(let i=0;i<46;i++){const act=N[Math.floor(r()*N.length)],food=['مطعم','كافيه','مخبز','مطبخ مناسبات','محل حلويات','ملحمة'].includes(act);
  const l1=r()>.22,l2=l1&&r()>.25,vis=food&&r()>.45,vs=vis?Math.round(68+r()*30):null;
  let score=Math.round((l1?50:20+r()*18)+(l1?(l2?30:12+r()*12):0)+(vis&&l2?vs/5:(l1&&l2?10:0)));if(!l1)score=Math.min(score,40);
  const risk=!l1?'high':(!l2&&food?'mid':(score>=85?'low':'mid'));
  const issue=!l1?['طفاية منتهية بدون فاتورة','كاميرا متوقفة','كواشف دخان منتهية','إنذار حريق غير مُصان','إنارة طوارئ غير مسجلة'][Math.floor(r()*5)]:(!l2?['شهادة صحية منتهية','مكافحة حشرات متأخرة','تنظيف الخزانات متأخر','ثلاجة خارج الحرارة الآمنة'][Math.floor(r()*4)]:'—');
  out.push({id:'x'+String(i).padStart(2,'0'),name:act+' '+NM[Math.floor(r()*NM.length)],act,food,dist:D[Math.floor(r()*D.length)],score,risk,l1,l2,vision:vis,visionScore:vs,badge:l1&&l2&&vis&&vs>=85,
   licDays:Math.round(-10+r()*200),issue,lastInsp:Math.round(20+r()*300)})}return out};
DZ.allShops=function(){const s=DZ.shops();return [s.m1,s.m2].map(sh=>{const e=DZ.eval(sh);return {id:sh.id,name:sh.name,act:sh.act,food:sh.food,dist:sh.dist,score:e.score,risk:e.risk,l1:e.st[1]==='done',l2:e.st[2]==='done',vision:sh.vision,visionScore:sh.visionScore,badge:e.badge,licDays:DZ.days(sh.licExp),issue:e.bad1[0]?e.bad1[0].a.name+' · '+e.bad1[0].s.t:(e.bad2[0]?e.bad2[0].a.name+' · '+e.bad2[0].s.t:'—'),lastInsp:180,live:true}}).concat(DZ.city())};

/* ui helpers */
DZ.toast=function(m,ic){let t=document.getElementById('toast');if(!t){t=document.createElement('div');t.id='toast';t.className='toast';document.body.appendChild(t)}
 t.innerHTML=`<i class="fa-solid ${ic||'fa-circle-check'}"></i>${m}`;t.classList.add('on');clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),2800)};
DZ.modal=function(html){let m=document.getElementById('modal');if(!m){m=document.createElement('div');m.id='modal';m.className='modal';m.innerHTML='<div class="bg" onclick="DZ.close()"></div><div class="mbox" id="mbox"></div>';document.body.appendChild(m)}
 document.getElementById('mbox').innerHTML=html;requestAnimationFrame(()=>m.classList.add('on'))};
DZ.close=()=>{const m=document.getElementById('modal');if(m)m.classList.remove('on')};
DZ.ring=function(v,size,col){size=size||120;const r=size/2-9,c=2*Math.PI*r,o=c*(1-v/100);
 return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" class="ring"><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--card2)" stroke-width="11"/><circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${col}" stroke-width="11" stroke-linecap="round" stroke-dasharray="${c}" stroke-dashoffset="${o}" transform="rotate(-90 ${size/2} ${size/2})"/><text x="50%" y="50%" text-anchor="middle" dominant-baseline="central" font-family="Noto Kufi Arabic" font-weight="900" font-size="${size/4.2}" fill="var(--ink)">${v}%</text></svg>`};
DZ.scol=v=>v>=85?'#12A37F':v>=60?'#E8962A':'#E5484D';
DZ.qr=function(txt){let h=0;for(const ch of txt)h=(h*31+ch.charCodeAt(0))>>>0;let s='';const n=21;
 for(let y=0;y<n;y++)for(let x=0;x<n;x++){const f=(x<7&&y<7)||(x>13&&y<7)||(x<7&&y>13);let on;
  if(f){const fx=x>13?x-14:x,fy=y>13?y-14:y;on=fx===0||fx===6||fy===0||fy===6||(fx>1&&fx<5&&fy>1&&fy<5)}else{h=(h*1103515245+12345)>>>0;on=(h>>16)&1}
  if(on)s+=`<rect x="${x}" y="${y}" width="1" height="1"/>`}
 return `<svg viewBox="-1 -1 23 23" fill="#120F33">${s}</svg>`};
DZ.nav=function(pages,start){const show=p=>{document.querySelectorAll('.page').forEach(x=>x.classList.toggle('on',x.id==='pg-'+p));
  document.querySelectorAll('[data-p]').forEach(b=>b.classList.toggle('on',b.dataset.p===p));const t=pages[p];if(t){document.getElementById('ttl').textContent=t[0];document.getElementById('sub').textContent=t[1]}
  if(typeof RENDER!=='undefined'&&RENDER[p])RENDER[p]();scrollTo(0,0);try{sessionStorage.setItem('dz_pg_'+location.pathname.split('/').pop(),p)}catch(e){}};
 document.querySelectorAll('[data-p]').forEach(b=>b.addEventListener('click',()=>show(b.dataset.p)));
 let s=start;try{s=sessionStorage.getItem('dz_pg_'+location.pathname.split('/').pop())||start}catch(e){}if(!pages[s])s=start;show(s);window.GO=show};

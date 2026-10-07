/* ════════════════════════════════════════════
       PROGRESS BAR
    ════════════════════════════════════════════ */
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const pb = document.getElementById('pb');
    const btt = document.getElementById('btt');
    let scrollFrame = 0;
    function updateScroll() {
      scrollFrame = 0;
      const d = document.documentElement;
      const range = d.scrollHeight - d.clientHeight;
      pb.style.transform = `scaleX(${range > 0 ? d.scrollTop / range : 0})`;
      if (btt) { const visible = d.scrollTop > 400; btt.classList.toggle('vis', visible); btt.inert = !visible; }
      if (mob.classList.contains('open')) positionMob();
    }
    window.addEventListener('scroll', () => { if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll); }, { passive: true });

    /* ════════════════════════════════════════════
       AVAILABILITY BANNER
    ════════════════════════════════════════════ */
    function closeBanner() {
      const b = document.getElementById('avail-banner');
      if (b) b.classList.add('hidden');
      try { localStorage.setItem('banner-closed', '1'); } catch (e) { }
    }

    /* ════════════════════════════════════════════
       HERO ENTRANCE
    ════════════════════════════════════════════ */
    /* ════════════════════════════════════════════
       TYPEWRITER — debounced, no glitch on lang switch
    ════════════════════════════════════════════ */
    const phrases = {
      en: ['roadmap.md --update q3-2026', 'backlog --prioritize by:impact', 'discovery --log user-interviews', 'sprint review --stakeholders accor,veepee', 'kpi dashboard --track nps,gmv', 'user story --write acceptance-criteria', 'a/b test --analyze conversion', 'release notes --publish v2.4'],
      fr: ['roadmap.md --update t3-2026', 'backlog --prioriser par:impact', 'discovery --logger entretiens-users', 'sprint review --stakeholders accor,veepee', 'kpi dashboard --suivre nps,gmv', 'user story --ecrire criteres-acceptation', 'a/b test --analyser conversion', 'release notes --publier v2.4']
    };
    let heroInView = true;
    let twState = { pi: 0, ci: 0, del: false, timer: null, lang: 'en' };

    function twStop() {
      if (twState.timer) { clearTimeout(twState.timer); twState.timer = null; }
    }
    function twStart(lang) {
      twStop();
      twState.pi = 0; twState.ci = 0; twState.del = false; twState.lang = lang;
      twTick();
    }
    function twTick() {
      const typed = document.getElementById('typed');
      if (!typed) return;
      if (document.hidden || !heroInView || motionPreference.matches) { typed.textContent = phrases[twState.lang][0]; return; }
      const pool = phrases[twState.lang] || phrases.en;
      const p = pool[twState.pi];
      if (!twState.del) {
        typed.textContent = p.slice(0, twState.ci + 1);
        twState.ci++;
        if (twState.ci === p.length) {
          twState.del = true;
          twState.timer = setTimeout(twTick, 1800);
        } else {
          twState.timer = setTimeout(twTick, 62);
        }
      } else {
        typed.textContent = p.slice(0, twState.ci - 1);
        twState.ci--;
        if (twState.ci === 0) {
          twState.del = false;
          twState.pi = (twState.pi + 1) % pool.length;
          twState.timer = setTimeout(twTick, 380);
        } else {
          twState.timer = setTimeout(twTick, 32);
        }
      }
    }
    

    /* ════════════════════════════════════════════
       PARTICLE CANVAS
    ════════════════════════════════════════════ */
    (function () {
      const canvas = document.getElementById('particle-canvas');
      const ctx = canvas && canvas.getContext('2d');
      if (!ctx) return;
      const hero = canvas.parentElement;
      let W = 0, H = 0, points = [], frame = 0, last = 0;
      function resize() {
        W = canvas.width = hero.clientWidth; H = canvas.height = hero.clientHeight;
        points = Array.from({length: Math.min(Math.floor(W * H / 24000), 30)}, () => ({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28,r:Math.random()*1.3+.4}));
      }
      function draw(now) {
        const delta = Math.min((now - last) / 16.67, 2); last = now;
        ctx.clearRect(0,0,W,H);
        points.forEach((p,i) => {
          p.x += p.vx * delta; p.y += p.vy * delta;
          if (p.x < 0 || p.x > W) p.vx *= -1;
          if (p.y < 0 || p.y > H) p.vy *= -1;
          ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fillStyle='rgba(200,150,62,.45)'; ctx.fill();
          for (let j=i+1;j<points.length;j++) {
            const q=points[j],d=Math.hypot(p.x-q.x,p.y-q.y);
            if(d<110) { ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.strokeStyle=`rgba(200,150,62,${.11*(1-d/110)})`;ctx.stroke(); }
          }
        });
        frame = requestAnimationFrame(draw);
      }
      function sync() {
        cancelAnimationFrame(frame); frame = 0; twStop();
        const animate = heroInView && !document.hidden && !motionPreference.matches;
        if (animate) { last=performance.now();frame=requestAnimationFrame(draw);twTick(); }
        else { ctx.clearRect(0,0,W,H); document.getElementById('typed').textContent=phrases[twState.lang][0]; }
      }
      resize();
      new ResizeObserver(resize).observe(hero);
      new IntersectionObserver(entries => {heroInView=entries[0].isIntersecting;sync();}).observe(hero);
      document.addEventListener('visibilitychange',sync);
      motionPreference.addEventListener('change',sync);
    })();

    /* ════════════════════════════════════════════
       INTERSECTION OBSERVERS
    ════════════════════════════════════════════ */
    const io = new IntersectionObserver(e => {
      e.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } });
    }, { threshold: .1, rootMargin: '0px 0px -36px 0px' });
    document.querySelectorAll('.rv,.rv-l,.rv-r,.rv-s').forEach(el => io.observe(el));

    const tio = new IntersectionObserver(e => {
      e.forEach(x => { if (x.isIntersecting) { x.target.classList.add('lined'); tio.unobserve(x.target); } });
    }, { threshold: .5 });
    document.querySelectorAll('.sec-title').forEach(el => tio.observe(el));

    const dio = new IntersectionObserver(e => {
      e.forEach(x => { if (x.isIntersecting) { x.target.classList.add('lit'); dio.unobserve(x.target); } });
    }, { threshold: .5 });
    document.querySelectorAll('.divider').forEach(el => dio.observe(el));

    /* ── COUNTER ANIMATION ── */
    const cio = new IntersectionObserver(e => {
      e.forEach(x => {
        if (x.isIntersecting && x.target.dataset.target) {
          const el = x.target;
          if (motionPreference.matches) { cio.unobserve(el); return; }
          const tgt = +el.dataset.target, pre = el.dataset.prefix || '', suf = el.dataset.suffix || '', dur = 1400, t0 = performance.now();
          const step = now => {
            const p = Math.min((now - t0) / dur, 1), ease = 1 - Math.pow(1 - p, 3);
            el.textContent = pre + Math.round(ease * tgt) + suf;
            if (p < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          cio.unobserve(x.target);
        }
      });
    }, { threshold: .2 });
    document.querySelectorAll('.kpi-val[data-target]').forEach(el => cio.observe(el));

    /* ── SKILL BARS ── */
    let skillBarsAnimated = false;
    const sbio = new IntersectionObserver(e => {
      e.forEach(x => {
        if (x.isIntersecting && !skillBarsAnimated) {
          skillBarsAnimated = true;
          x.target.querySelectorAll('.skill-bar-fill').forEach((bar, i) => {
            setTimeout(() => { bar.style.width = bar.dataset.w + '%'; }, i * 90);
          });
          sbio.unobserve(x.target);
        }
      });
    }, { threshold: .2 });
    const sbc = document.getElementById('skill-bars-container');
    if (sbc) sbio.observe(sbc);

    /* ── ACTIVE NAV LINK ── */
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const nio = new IntersectionObserver(e => {
      e.forEach(x => {
        if (x.isIntersecting) {
          navLinks.forEach(a => a.classList.remove('active'));
          const a = document.querySelector(`.nav-links a[href="#${x.target.id}"]`);
          if (a) a.classList.add('active');
        }
      });
    }, { threshold: .35 });
    sections.forEach(s => nio.observe(s));

    /* ════════════════════════════════════════════
       MOBILE MENU
    ════════════════════════════════════════════ */
    const burger = document.getElementById('burger'), mob = document.getElementById('mob-menu');
    function positionMob() {
      const bottom = Math.max(document.querySelector('nav').getBoundingClientRect().bottom,0);
      mob.style.top = bottom + 'px'; mob.style.maxHeight = `calc(100dvh - ${bottom}px)`;
    }
    function openMob() { positionMob(); mob.inert=false; burger.classList.add('open');mob.classList.add('open');burger.setAttribute('aria-expanded','true'); }
    function closeMob(restoreFocus=false) { burger.classList.remove('open');mob.classList.remove('open');mob.inert=true;burger.setAttribute('aria-expanded','false');if(restoreFocus)burger.focus(); }
    burger.addEventListener('click', () => mob.classList.contains('open') ? closeMob() : openMob());
    document.querySelectorAll('.mob-link').forEach(a => a.addEventListener('click', () => closeMob()));
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&mob.classList.contains('open'))closeMob(true);});
    document.addEventListener('focusin',e=>{if(mob.classList.contains('open')&&!mob.contains(e.target)&&!burger.contains(e.target))closeMob();});
    window.addEventListener('resize',()=>{if(innerWidth>1100)closeMob();else if(mob.classList.contains('open'))positionMob();},{passive:true});
    updateScroll();

    /* ════════════════════════════════════════════
       SMOOTH SCROLL
    ════════════════════════════════════════════ */
    document.addEventListener('click', e => {
      if (mob.classList.contains('open') && !mob.contains(e.target) && !burger.contains(e.target)) closeMob();
      const anchor=e.target.closest('a[href^="#"]');
      if(!anchor)return;
      const target=document.getElementById(anchor.getAttribute('href').slice(1));
      if(target){target.setAttribute('tabindex','-1');target.focus({preventScroll:true});}
    });

    /* ════════════════════════════════════════════
       TECH CARD TOOLTIPS — mobile tap support
    ════════════════════════════════════════════ */
    document.querySelectorAll('.tc').forEach(card => {
      card.addEventListener('click', e => {
        if (window.matchMedia('(hover: none)').matches) {
          const isOpen = card.classList.contains('tip-open');
          document.querySelectorAll('.tc.tip-open').forEach(c => c.classList.remove('tip-open'));
          if (!isOpen) card.classList.add('tip-open');
          document.querySelectorAll('.tc').forEach(c=>c.setAttribute('aria-expanded',String(c.classList.contains('tip-open'))));
          e.stopPropagation();
        }
      });
    });
    document.addEventListener('click', () => {
      document.querySelectorAll('.tc.tip-open').forEach(c => {c.classList.remove('tip-open');c.setAttribute('aria-expanded','false');});
    });
    document.querySelectorAll('.tc').forEach(card => {
      card.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const isOpen = card.classList.contains('tip-open');
          document.querySelectorAll('.tc.tip-open').forEach(c => c.classList.remove('tip-open'));
          if (!isOpen) card.classList.add('tip-open');
          document.querySelectorAll('.tc').forEach(c=>c.setAttribute('aria-expanded',String(c.classList.contains('tip-open'))));
        }
        if (e.key === 'Escape') card.classList.remove('tip-open');
        card.setAttribute('aria-expanded', String(card.classList.contains('tip-open')));
      });
    });

    /* ════════════════════════════════════════════
       FORMSPREE CONTACT
    ════════════════════════════════════════════ */
    async function handleSubmit(e) {
      e.preventDefault();
      const form=e.target,btn=document.getElementById('submit-btn'),status=document.getElementById('form-status');
      if(btn.disabled)return;
      const fr=()=>document.documentElement.lang==='fr';
      const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);
      btn.disabled=true;form.setAttribute('aria-busy','true');btn.textContent=fr()?'Envoi en cours…':'Sending…';
      status.className='form-status';status.textContent='';
      try {
        const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'},signal:controller.signal});
        if(!response.ok)throw new Error('submission');
        status.className='form-status ok';status.textContent=fr()?'Message envoyé — je vous réponds rapidement.':"Message sent — I'll get back to you shortly.";form.reset();
      } catch(error) {
        status.className='form-status err';status.textContent=fr()?'Envoi impossible. Réessayez ou contactez-moi par email.':'Could not send. Please retry or contact me by email.';
      } finally {
        clearTimeout(timeout);btn.disabled=false;form.setAttribute('aria-busy','false');btn.textContent=i18n[document.documentElement.lang]['submit-btn'];
      }
    }

    /* ════════════════════════════════════════════
       THEME TOGGLE
    ════════════════════════════════════════════ */
    function toggleTheme() {
      const r = document.documentElement;
      const isDark = r.getAttribute('data-theme') !== 'light';
      const next = isDark ? 'light' : 'dark';
      r.setAttribute('data-theme', next);
      document.getElementById('theme-btn').textContent = next === 'light' ? '🌙' : '☀';
      try { localStorage.setItem('theme', next); } catch (e) { }
      updateThemeLabel();
    }
    (function () {
      try {
        const saved = localStorage.getItem('theme');
        if (saved) { document.documentElement.setAttribute('data-theme', saved); document.getElementById('theme-btn').textContent = saved === 'light' ? '🌙' : '☀'; }
      } catch (e) { }
    })();

    /* ════════════════════════════════════════════
       I18N
    ════════════════════════════════════════════ */
    const i18n = {
  "en": {
    "nav-about": "About",
    "nav-shopify": "Product Work",
    "nav-presales": "How I Work",
    "nav-exp": "Experience",
    "nav-proj": "Projects",
    "nav-edu": "Education",
    "nav-contact": "Contact",
    "nav-cta": "Contact Me",
    "mob-cta": "Contact Me →",
    "banner-html": "<strong>Open to CDI from Sept 2026</strong><span class=\"avail-banner-text\"> — Product Owner · E-Commerce & B2B Platforms · Paris &amp; remote</span>",
    "hero-eyebrow": "Product Owner · E-Commerce & B2B Platforms · Ex Solutions Architect",
    "hero-tagline": "<strong>I turn ambiguity into a shipped, measured product.</strong> Full roadmap ownership of a Shopify Plus rebuild — discovery, backlog prioritization, and cross-functional delivery across engineering, ops, and 5 marketplace partners — with automation pipelines that run with zero manual touch. 6 years of engineering discipline behind every prioritization call.",
    "btn-shopify": "Explore product case studies",
    "btn-projects": "View Projects",
    "btn-talk": "Let's Talk",
    "btn-resume": "View resume ↗",
    "scroll-hint": "scroll",
    "pill-status-lbl": "Status",
    "pill-status-val": "Open to CDI",
    "pill-shopify-val": "20+ Stores",
    "pill-loc-lbl": "📍 Location",
    "pill-loc-val": "Paris",
    "pill-target-lbl": "🎯 Target",
    "pill-target-val": "Product Owner · E-Commerce",
    "about-label": "About Me",
    "about-title": "Product-minded engineer. Roadmap owner. Cross-functional operator.",
    "about-p1": "I work at the intersection of <strong>product discovery, cross-functional delivery, and data-driven iteration</strong>. The approach never changes: understand the real problem first, prioritize ruthlessly, then ship something that scales safely, without shortcuts or black boxes.",
    "about-p2": "My background isn't the usual path into e-commerce. A <strong>double B.Sc. in Computer Engineering</strong> (UIR × Université de Nantes), a <strong>Master's in Quality & Performance Management</strong> (Université de Franche-Comté), and <strong>6 years in demanding industrial environments</strong>, including automotive at Schaeffler Group (IATF 16949) and medical devices at MASCIR Foundation. So when I write a product spec or prioritize a backlog, I'm not guessing at scope; instead, I apply the same root-cause discipline I learned on an assembly line, making sure every decision is traceable, every trade-off is documented, and every roadmap item is scoped before a single line is built.",
    "about-p3": "At FFA, I owned the product roadmap for the brand's entire B2B digital platform, from discovery to delivery: <strong>Shopify Plus ↔ Erplain ERP</strong>, onboarding across 5 marketplace partners, a zero-touch fulfillment pipeline, an AI chatbot feature I specified and shipped, and a <strong>40% cut in B2B admin overhead</strong>. I prioritized this overhead reduction ahead of other backlog items because the impact case was clear. Along the way, I flagged a critical Google Analytics data-leak during a routine audit and re-prioritized the fix immediately, rebuilding it as a secure server-side tag architecture aligned with ISO 27001. This is the kind of issue that quietly becomes a compliance problem if nobody owns looking for it.",
    "about-p4": "Outside FFA, I've run <strong>20+ DTC products</strong> on my own, managing full P&amp;L ownership and prioritization under real constraints with a remote team in the Philippines. I know exactly what a bad prioritization call costs at 2am, which is why I build the habit of checking impact before committing scope.",
    "about-p5": "Currently finishing an <strong>MSc in Business Engineering at KEDGE</strong>, and looking for a CDI starting September 2026 as a Product Owner, Chef de Produit, or E-Commerce Product Manager. Away from the screen, I'm a <a href=\"#interests\" style=\"color:var(--gold);text-decoration:none;border-bottom:1px solid var(--border-gold)\">PPL student pilot, rallye safety marshal, and V12 enthusiast</a>. These experiences teach the kind of situational judgment you don't pick up in a browser.",
    "skills-label": "Core Skills",
    "skill-1": "Product Roadmap & Backlog Prioritization",
    "skill-2": "Cross-Functional & Stakeholder Alignment",
    "skill-3": "Data-Driven Decision Making (KPIs)",
    "skill-4": "E-commerce & Marketplace Product Ops",
    "skill-5": "Agile Delivery & Technical Fluency",
    "skill-6": "Discovery & Solution Framing",
    "skill-7": "Quality Engineering / Root-Cause Analysis",
    "kpi-1": "Products/Stores Owned End-to-End",
    "kpi-2": "SKUs Under Live Roadmap Ownership",
    "kpi-3": "Admin Overhead Cut via Process Redesign",
    "kpi-4": "Years Engineering Discipline",
    "kpi-5": "Stakeholder & Process Audits Led",
    "kpi-6": "Countries explored overland",
    "shopify-label": "Shopify Expertise",
    "shopify-title": "Product decisions, shipped — from storefront to supply chain.",
    "sh-kpi-1": "Shopify & Shopify Plus stores built, configured, and scaled",
    "sh-kpi-2": "Retailer & marketplace integrations — Veepee · AstoreShop · N&D · Ankorstore · Kviste",
    "sh-kpi-3": "Manual entries on the FFA fulfillment-to-invoicing flow after automation",
    "sh-kpi-4": "B2B admin billing overhead at FFA post Pennylane integration",
    "sh-group-core": "Core architecture",
    "sh-group-accounts": "Key accounts & channels",
    "sh-group-tech": "Technical ops",
    "sh-group-dtc": "DTC brand portfolio",
    "sh-card1-cat": "Shopify Plus · B2B Wholesale",
    "sh-card1-title": "Custom B2B wholesale portal architecture",
    "sh-card1-desc": "Shopify Plus B2B wholesale portals built with custom pricing rules, company-level accounts, draft-order workflows, and net payment terms, integrated with a full schema mapping between Shopify B2B and Erplain ERP so inventory stays in sync in real time across 367 SKUs.",
    "sh-card2-cat": "Automation · Zero-Touch Ops",
    "sh-card2-title": "Zero-touch fulfillment pipeline",
    "sh-card2-desc": "Built in n8n: every order fires a fully automated chain end to end, achieving zero manual entries on the primary fulfillment flow. This system is FinOps-compliant and ready for a tax audit at any time.",
    "sh-card3-cat": "Key Accounts · Mirakl · Marketplace",
    "sh-card3-title": "Retailer integrations covering Veepee · AstoreShop (Accor) · Nature & Découvertes · Ankorstore · Kviste",
    "sh-card3-li1": "<strong>AstoreShop (Accor Group):</strong> Built and maintained dedicated Mirakl data sheets to keep the catalog in sync across both B2B and B2C channels at once, managing field taxonomy, category mapping, variant rules, and SLA compliance from onboarding through live ops.",
    "sh-card3-li2": "<strong>Nature & Découvertes:</strong> Custom Mirakl data sheets matched to N&D's product classification standards, covering catalog onboarding, ongoing sync, and field-completeness QC.",
    "sh-card3-li3": "<strong>Veepee:</strong> End-to-end technical ownership of flash-sale campaign integrations, including catalog sync, variant mapping, pricing configuration, and order-flow validation under high-volume event traffic.",
    "sh-card3-li4": "<strong>Ankorstore:</strong> Technical catalog onboarding and ongoing field sync on the Ankorstore wholesale marketplace, handling product data structuring and pricing configuration for B2B buyers.",
    "sh-card3-li5": "<strong>Kviste:</strong> Catalog distribution and data-sheet management on the Kviste platform, managing variant mapping and category alignment to the platform's specific requirements.",
    "sh-card4-cat": "Affiliation · Growth",
    "sh-card4-title": "Kwanko affiliate platform — setup & activation",
    "sh-card4-desc": "Integrated Kwanko as FFA's affiliate marketing network, where I configured tracking infrastructure, defined commission structures per partner type, and managed publisher activation to add incremental B2C revenue alongside owned channels.",
    "sh-card5-cat": "AI · Customer Intelligence",
    "sh-card5-title": "Adapted & configured an AI chatbot with intent segmentation",
    "sh-card5-desc": "Took an open-source Shopify chatbot app and turned it into a real support tool for FFA. I built out a <strong>detailed knowledge base</strong> from real customer questions and set up <strong>condition-based logic</strong> that automatically sorts conversations by intent (support issues, product suggestions, complaints, purchase intent), allowing the team to prioritise review queues and pull structured insight out of every conversation.",
    "sh-card6-cat": "Migration · Foundation · SEO Preservation",
    "sh-card6-title": "WordPress → Shopify: rebuilt the platform from the ground up",
    "sh-card6-desc": "Started from an aging WordPress backup and rebuilt the entire store on Shopify Plus, including its architecture, theme, product data, and the B2B portal, before layering on ERP sync, marketplace integrations, and automation. URL redirect mapping and canonical structures were preserved throughout, with zero SEO ranking loss post-migration. Everything else on this page is built on top of this foundation.",
    "sh-card7-cat": "Logistics · Geolocation API",
    "sh-card7-title": "Dynamic relay point selector",
    "sh-card7-desc": "Integrated the Google Maps/Places API directly into Shopify checkout to power a <strong>dynamic Point Relais selector</strong>. When customers pick home delivery or relay pick-up, that choice auto-triggers Colissimo label generation in the backend, cutting manual warehouse prep entirely.",
    "sh-card8-cat": "Analytics · FinOps · SecOps",
    "sh-card8-title": "Tracking, data security & financial ops",
    "sh-card8-desc": "Real-time sales dashboard across 167 SKUs (€60k+ in volume visibility). Caught and permanently fixed a critical Google Analytics setup that was leaking behavioral data to external domains, which I rebuilt with server-side tag separation aligned to ISO 27001.",
    "sh-card9-cat": "UI/UX · Conversion · Storefront Design",
    "sh-card9-title": "Storefront UX design & conversion optimisation",
    "sh-card9-li1": "<strong>Checkout UX:</strong> Redesigned checkout flows to cut friction — streamlined step progression, trust signals (payment icons, security badges), and clear error-recovery paths, applied across both DTC storefronts and B2B wholesale portals.",
    "sh-card9-li2": "<strong>Product page architecture:</strong> Structured product pages for conversion, focusing on information hierarchy, variant-selector UX, dynamic bundle builders, and upsell placement matched to buying-intent signals.",
    "sh-card9-li3": "<strong>Theme customisation & Liquid:</strong> Custom Shopify theme work in Liquid, implementing section overrides, conditional rendering by customer tag (B2B vs B2C), and responsive layout tuned for mobile-first performance.",
    "sh-card9-li4": "<strong>UX funnels & A/B logic:</strong> Designed and iterated acquisition funnels across 20+ DTC stores — landing-page structure, above-the-fold hierarchy, CTA placement, and post-purchase flow built to lift LTV.",
    "sh-card9-li5": "<strong>Performance:</strong> Image-optimisation pipelines (Cloudinary), lazy loading, and Core Web Vitals monitoring to keep LCP fast and CLS minimal across every storefront.",
    "sh-card10-cat": "DTC Brand Operations · Growth",
    "sh-card10-title": "20+ DTC store portfolio — end-to-end ownership",
    "sh-card10-li1": "Built and scaled 20+ Shopify storefronts independently across different verticals — product sourcing, store architecture, theme customisation, checkout optimisation, UX funnels.",
    "sh-card10-li2": "Multi-channel acquisition across Google Ads, Facebook/Instagram Ads, and SEO (Semrush), with full P&L ownership — supplier negotiations, margin management, ad-spend ROI.",
    "sh-card10-li3": "Recruited and led a remote team in the Philippines: asynchronous workflows, KPI dashboards, content pipelines for Instagram sales channels.",
    "sh-card10-li4": "Built subscription engines with automated recurring orders and dynamic seasonal bundle kitting to lift AOV.",
    "sh-ecosystem": "Integrated ecosystem",
    "presales-label": "Product Approach",
    "presales-title": "The 4 dimensions of Product Ownership",
    "dim1-num": "01 — Discovery",
    "dim1-title": "Map the problem before the solution",
    "dim1-desc": "Understand the user, the business constraints, and the data — audit everything before writing a single user story.",
    "dim2-num": "02 — Prioritization",
    "dim2-title": "A roadmap that says no as much as yes",
    "dim2-desc": "Rank backlog items by business impact and delivery cost, not by who asks loudest — and defend that ranking to stakeholders.",
    "dim3-num": "03 — Cross-Functional Delivery",
    "dim3-title": "Ship with the people who build it",
    "dim3-desc": "Work daily with engineering, ops, and marketplace partners to turn a spec into something live — security and compliance built in, not bolted on.",
    "dim4-num": "04 — Measurement & Iteration",
    "dim4-title": "Ship, measure, adjust",
    "dim4-desc": "Track the one KPI that matters, kill what doesn't move it, and feed the result back into the next sprint.",
    "insight-lbl": "The industrial engineering parallel",
    "insight-body": "Six years in quality engineering taught me one rule above the rest: <strong>never accept an anomaly or a feature request without understanding its root cause</strong>. I believe in measuring before confirming and documenting so the decision is traceable and reproducible. When I prioritize a backlog, I apply the same FMEA logic I used on an automotive assembly line at Schaeffler: identifying what is actually broken, quantifying the impact, and fixing the cause rather than the symptom.",
    "exp-label": "Experience",
    "exp-title": "Professional Trajectory",
    "tl-1": "B.Sc. Computer Eng.",
    "tl-2": "MSc Quality Mgmt",
    "tl-3": "Quality Eng.",
    "tl-4": "QHSE Engineer",
    "tl-5": "Software QA",
    "tl-6": "Quality PM",
    "tl-7": "MSc Biz. Eng.",
    "tl-8": "E-Commerce PM / PO",
    "stack-lbl": "Tech Stack",
    "tt1-title": "Shopify Plus & B2B",
    "tt1-body": "20+ stores, B2B portals, Mirakl onboarding, WordPress migrations with SEO preservation.",
    "tt2-title": "Workflow Automation",
    "tt2-body": "FFA zero-touch pipeline: Shopify → Erplain → Colissimo → Pennylane. 0 manual entries.",
    "tt3-title": "Marketplace Connect",
    "tt3-body": "Onboarded FFA onto AstoreShop (Accor), N&D, Veepee, Ankorstore and Kviste — custom data sheets per platform.",
    "tt4-title": "Scripting & ETL",
    "tt4-body": "Data pipelines, B2B scraping engines (Apollo, LinkedIn API, Google Maps), lead scoring.",
    "tt5-title": "AI Integration",
    "tt5-body": "FFA live chatbot with intent-based segmentation — classifies conversations by gravity and type automatically.",
    "tt6-title": "CRM Architecture",
    "tt6-body": "Lead scoring, pipeline automation, Brevo/Sidely sync for multi-channel B2B nurturing flows.",
    "tt7-title": "FinOps & Invoicing",
    "tt7-body": "Automated B2B invoicing at FFA — 40% reduction in admin overhead. Tax-audit-ready reconciliation.",
    "tt8-title": "B2B ERP Sync",
    "tt8-body": "Real-time inventory sync across 367 SKUs between Shopify B2B and Erplain. Zero data drift.",
    "tt9-title": "Database & Queries",
    "tt9-body": "Structuring, reporting and analytics across MySQL databases for CRM and e-commerce data layers.",
    "tt10-title": "Blockchain / Web3",
    "tt10-body": "Automotive traceability — inspection data committed to immutable on-chain ledger. Built on IATF 16949.",
    "tt11-title": "SEO & Analytics",
    "tt11-body": "Technical audits, keyword gaps, competitor analysis, and Core Web Vitals monitoring across DTC stores.",
    "tt12-title": "Image & Media CDN",
    "tt12-body": "Optimisation pipelines across 20+ Shopify stores — format conversion, lazy loading, LCP tuning.",
    "exp1-date": "2025 – Present",
    "exp1-role": "Product Owner — ffaperitif.com rebuild (Shopify Plus, B2B & B2C)",
    "exp1-li1": "<strong>Roadmap & B2B Platform:</strong> Owned the roadmap for the brand's wholesale digital stack, delivering a Shopify Plus B2B portal synced with Erplain ERP, real-time inventory flows across 367 SKUs, and a dynamic bundle/subscription engine for seasonal gifting and recurring orders.",
    "exp1-li2": "<strong>Prioritized Automation:</strong> Specced and shipped n8n automation connecting Shopify, Erplain, Colissimo, and Pennylane, ensuring 0 manual entries from fulfillment through invoicing, along with a dynamic Point Relais selector via Google Maps API built directly into checkout.",
    "exp1-li3": "<strong>Cross-Functional Delivery:</strong> Owned technical catalog onboarding and stakeholder alignment across 5 marketplace partners via Mirakl, including AstoreShop (Accor Group), Nature & Découvertes, Veepee, Ankorstore, and Kviste. I built dedicated data sheets per platform covering B2B and B2C channels, field taxonomy, variant mapping, and SLA compliance.",
    "exp1-li4": "<strong>New Revenue Line:</strong> Integrated Kwanko as the brand's affiliate marketing network, configuring tracking, defining commission structures, and managing publisher activation to drive incremental B2C revenue.",
    "exp1-li5": "<strong>Feature Specification:</strong> Specified, deployed, and iterated on an AI-powered chatbot feature. I adapted an open-source Shopify chatbot app into a real support tool built around a detailed knowledge base and condition-based logic that automatically classifies conversations by gravity and type, helping the team prioritise chat queues and extract actionable customer insight.",
    "exp1-li6": "<strong>Impact-Based Reprioritization:</strong> Cut B2B billing overhead by 40% (prioritized on impact); found a critical GA data leak during audit and reprioritized the fix immediately, rebuilding it as a secure server-side tag architecture aligned with ISO 27001.",
    "exp1-li7": "<strong>Zero-Regression Release:</strong> Led the legacy WordPress → Shopify migration as a zero-regression release, ensuring full SEO preservation (URL redirects, canonical mapping, metafield migration).",
    "exp2-date": "2023 – 2025",
    "exp2-role": "Quality & Process Optimization PM",
    "exp2-body": "Designed structured feedback loops (RETEX) to trace root causes, translating user pain points into operational requirements. Led cross-functional process mapping and negotiated alignment matrices to optimize lead times and reduce waste using Lean Six Sigma.",
    "exp3-date": "2022 – 2023",
    "exp3-role": "QA & Business Support Engineer",
    "exp3-body": "Ran product discovery on customer technical tickets to diagnose systemic bugs and specify long-term solutions, protecting partner retention. Designed and executed functional test plans for core release verification, bridging client support and development teams.",
    "exp4-date": "2020 – 2022",
    "exp4-role": "QHSE Engineer — Medical Devices",
    "exp4-body": "Ran comprehensive risk mappings and QHSE compliance audits across major contractor lines. Oversaw chemical safety regulations and institutional sanitary frameworks. Mapped cross-departmental processes to eliminate waste and smooth team handoffs.",
    "exp5-date": "2018 – 2019",
    "exp5-role": "Quality Engineer — Automotive (Schaeffler)",
    "exp5-body": "Analyzed production anomalies using FMEA (AMDEC) models to prioritize corrective backlog items and design prevention workflows. Spearheaded a digital archiving product to streamline documentation traceability, cutting search latency for the operations team.",
    "proj-label": "Entrepreneurship",
    "proj-title": "Global Growth & DTC Operations",
    "p1-cat": "Shopify · Automation · FinOps",
    "p1-title": "Zero-Touch Operational Cluster — FFA",
    "p1-desc": "End-to-end automation linking Shopify Plus (storefront), Erplain (B2B ERP), Colissimo (logistics), and Pennylane (invoicing). Every order automatically triggers stock updates, a shipping label, and a compliant invoice. Result: 0 manual entries on the primary fulfillment flow, 40% less B2B admin overhead.",
    "cs-btn": "Case study ↓",
    "cs1-h1": "The problem",
    "cs1-p1": "FFA's fulfillment process ran on manual entry at every handoff — Shopify orders copied into Erplain, shipping labels made by hand, invoices typed one by one in Pennylane. Every step added lag, human error, and a compliance risk for B2B invoicing.",
    "cs1-h2": "The approach",
    "cs1-li1": "Mapped the entire fulfillment flow end-to-end before writing a single automation rule",
    "cs1-li2": "Designed a webhook-driven architecture in n8n — each Shopify order event triggers a sequential chain with error handling at every node",
    "cs1-li3": "Built field-level schema mapping between Shopify, Erplain, Colissimo and Pennylane — nothing left unmapped, no silent failures",
    "cs1-li4": "Added server-side validation to catch malformed payloads before they hit downstream systems",
    "cs1-h3": "The result",
    "cs1-r1": "0 manual entries",
    "cs1-r2": "−40% admin overhead",
    "cs1-r3": "100% FinOps compliant",
    "cs1-r4": "Tax-audit ready",
    "p2-cat": "DTC Brand Founder · 20+ Stores",
    "p2-title": "International DTC Brand Portfolio",
    "p2-desc": "Built and scaled 20+ Shopify storefronts with full P&L ownership. Multi-channel acquisition (Google Ads, Meta, SEO) and a remote team in the Philippines running asynchronous workflows and KPI dashboards. Subscription engines and seasonal bundle kitting to grow AOV.",
    "p3-cat": "Web3 · Supply Chain · Blockchain",
    "p3-title": "Blockchain Traceability Module (Polygon)",
    "p3-desc": "An automotive traceability prototype on Polygon. Each part inspection commits compliance metadata to an immutable ledger, closing off documentation tampering across international supply chains — a next-gen layer on top of IATF 16949.",
    "p4-cat": "B2B Growth Engineering",
    "p4-title": "Automated B2B Outreach Pipelines",
    "p4-desc": "Automated lead generation for complex B2B sales cycles. Multi-source scraping (LinkedIn API, Google Maps, Apollo), automated scoring, and personalised multi-channel outbound sequences via Brevo, synced directly into HubSpot CRM.",
    "cs2-h1": "The problem",
    "cs2-p1": "Manual B2B prospecting at scale is slow and inconsistent — leads sourced from scattered places, no unified scoring, outreach written one email at a time. The goal: a system that could find, qualify, and contact verified B2B targets with no manual bottleneck.",
    "cs2-h2": "The approach",
    "cs2-li1": "Multi-source extraction: LinkedIn Sales Navigator via Apify, Google Maps API for local businesses, Apollo for verified email data",
    "cs2-li2": "Automated enrichment — each lead scored on firmographic criteria (company size, sector, decision-maker title) before entering the sequence",
    "cs2-li3": "Personalised outbound sequences built in Brevo, triggered by n8n based on lead-score thresholds",
    "cs2-li4": "Full CRM sync to HubSpot — every touchpoint logged, deal stage updated automatically on reply or click",
    "cs2-h3": "The result",
    "cs2-r1": "Multi-source lead engine",
    "cs2-r2": "Automated scoring",
    "cs2-r3": "0 manual outreach",
    "cs2-r4": "HubSpot fully synced",
    "edu-label": "Education",
    "edu-title": "Academic Credentials & Certifications",
    "edu1-name": "MSc in Business Engineering",
    "edu1-deg": "Dual Degree: MSc & Master in Business Development (2026)",
    "edu1-desc": "Translating complex technical structures into high-value commercial propositions. Enterprise solution architecture and pre-sales strategy.",
    "edu2-name": "Parcours Ingénieur — Business & Data Analyst",
    "edu2-deg": "Blockchain, AI & Data Engineering Track",
    "edu2-desc": "Information system design, algorithmic logic, complex metrics analysis, and business intelligence mapping.",
    "edu3-name": "Master's in Quality & Performance Management",
    "edu3-deg": "Graduated 2018",
    "edu3-desc": "Industrial operations, international compliance auditing, process validation, and system risk reduction frameworks.",
    "edu4-name": "B.Sc. in Computer Engineering",
    "edu4-deg": "Dual Diploma",
    "edu4-desc": "Algorithmic logic, advanced data schemas, cross-platform software interoperability, and network foundations.",
    "cert-label": "Verified Certifications",
    "cert-title": "Technical Architecture & Security Credentials",
    "cert1-title": "Infrastructure Security & Networks",
    "cert2-title": "CRM Architecture & Automation",
    "cert3-title": "AI Optimization & Prompt Engineering",
    "cert4-title": "Regulatory Governance & System Excellence",
    "int-label": "Interests & Agility",
    "int-title": "Situational Intelligence & High-Pressure Systems",
    "int1-title": "Rallye Historique du Maroc",
    "int1-desc": "Course steward & track safety marshal — on-track safety protocols, real-time crisis routing, and mechanical incident evaluation across a 2,500 km desert course.",
    "int2-title": "Aeronautics & Flight Training",
    "int2-desc": "Active PPL student at Aéroclub ARC (Chavenay) — cross-country navigation, aeronautical weather interpolation, structural aerodynamics, and a soft spot for Jodel wood-and-fabric airframes.",
    "int3-title": "Automotive Engineering & Mechanics",
    "int3-desc": "Passionate about mechanics and reverse engineering for repair, tuning, and power optimization. Handling complex diagnostic and model-specific maintenance procedures. Hands-on experience on my personal cars: rebuilding VAG group TFSI, TSI, and TDI (1.9 and 3.0 V6) engines (Golf GTI and Audi A5), full restoration of my Mercedes CL600 V12, engine tuning on my BMW 335d E92, and a drift project swapping a 1JZ-GTE into my Lexus IS200.",
    "int4-title": "36-Country Overland Expedition",
    "int4-desc": "Morocco → Europe → Turkey · Malaysia · Indonesia · Philippines · Georgia · Azerbaijan — adaptability under uncertainty.",
    "int5-title": "Drift Dynamics",
    "int5-desc": "Studying controlled-oversteer physics, weight-transfer management, and vehicle dynamics at the limit — engineering principles applied to real-time car control.",
    "int6-title": "Blockchain Engineering",
    "int6-desc": "A Polygon-based traceability module committing automotive compliance metadata to immutable on-chain records — exploring decentralized architectures as enterprise trust infrastructure.",
    "map-visited": "Visited (36)",
    "map-not": "Not yet",
    "map-hover": "hover a country",
    "contact-label": "Contact",
    "contact-title": "Let's Connect.",
    "contact-h3": "Product Owner · E-Commerce & B2B Platforms<br><span style=\"color:var(--gold);font-size:.88rem;font-weight:400\">CDI — Starting September 2026</span>",
    "contact-p": "Six years of engineering discipline. A product brought from a legacy WordPress site to a fully automated, multi-marketplace Shopify Plus platform, owning the roadmap, prioritization, and cross-functional delivery end-to-end. If you are looking for someone who can sit down with users and stakeholders, turn ambiguity into a prioritized backlog, and deliver, let's talk.",
    "clink-phone": "Phone",
    "clink-loc": "Location",
    "calendly-btn": "Book a 20-min intro call",
    "form-name": "Name",
    "form-name-ph": "Your name",
    "form-email": "Email",
    "form-message": "Message",
    "form-msg-ph": "Your message...",
    "submit-btn": "Send Message",
    "footer-copy": "© 2026 Saad Bayahia",
    "footer-top": "↑ Top",
    "nav-github": "GitHub",
    "github-label": "Open Source & Code",
    "github-title": "Projects & source code",
    "git-loading": "Loading repositories from GitHub...",
    "git-error": "Could not load repositories. Please view them directly on <a href=\"https://github.com/saad2jz\" target=\"_blank\" style=\"color:var(--gold)\">GitHub</a>.",
    "git-stars": "stars",
    "git-view": "View Code",
    "skip-link": "Skip to main content",
    "menu-label": "Main navigation",
    "close-banner": "Close availability banner",
    "back-top": "Back to top",
    "theme-light": "Switch to light theme",
    "theme-dark": "Switch to dark theme",
    "meta-description": "Saad Bayahia, Product Owner in Paris: Shopify Plus rebuild, 5 marketplace integrations and B2B automation. Explore my work and get in touch."
  },
  "fr": {
    "nav-about": "À propos",
    "nav-shopify": "Réalisations Produit",
    "nav-presales": "Ma méthode",
    "nav-exp": "Expérience",
    "nav-proj": "Projets",
    "nav-edu": "Formation",
    "nav-contact": "Contact",
    "nav-cta": "Me contacter",
    "mob-cta": "Me contacter →",
    "banner-html": "<strong>Disponible en CDI dès septembre 2026</strong><span class=\"avail-banner-text\"> — Product Owner · E-Commerce & B2B · Paris &amp; remote</span>",
    "hero-eyebrow": "Product Owner · Plateformes E-Commerce & B2B · Ex Architecte Solutions",
    "hero-tagline": "<strong>Je transforme l'ambiguïté en produit livré et mesuré.</strong> Ownership complet de la roadmap sur la refonte Shopify Plus d'une marque — discovery, priorisation du backlog, et delivery cross-fonctionnelle avec les équipes engineering, ops et 5 partenaires marketplace — avec des pipelines d'automatisation qui tournent sans aucune intervention manuelle. 6 ans de discipline d'ingénieur derrière chaque arbitrage.",
    "btn-shopify": "Découvrir mes réalisations",
    "btn-projects": "Voir les projets",
    "btn-talk": "Discutons",
    "btn-resume": "Voir mon CV ↗",
    "scroll-hint": "défiler",
    "pill-status-lbl": "Statut",
    "pill-status-val": "Disponible en CDI",
    "pill-shopify-val": "20+ boutiques",
    "pill-loc-lbl": "📍 Localisation",
    "pill-loc-val": "Paris",
    "pill-target-lbl": "🎯 Cible",
    "pill-target-val": "Product Owner · E-Commerce",
    "about-label": "À propos",
    "about-title": "Ingénieur orienté produit. Propriétaire de roadmap. Opérateur cross-fonctionnel.",
    "about-p1": "I work at the intersection of <strong>product discovery, cross-functional delivery, and data-driven iteration</strong>. L'approche reste la même : comprendre le problème réel d'abord, prioriser sans pitié, puis livrer une solution robuste et pérenne, sans raccourci ni boîte noire.",
    "about-p2": "Mon parcours n'est pas le chemin classique du e-commerce. Un <strong>double diplôme de Génie Informatique</strong> (UIR × Université de Nantes), un <strong>Master en Management de la Qualité et de la Performance</strong> (Université de Franche-Comté), et <strong>6 ans passés dans des environnements industriels exigeants</strong>, notamment dans l'automobile chez Schaeffler Group (norme IATF 16949) et les dispositifs médicaux à la Fondation MASCIR. Quand je rédige une spec produit ou priorise un backlog, je ne devine pas le périmètre : j'applique la même discipline de cause racine apprise sur une ligne d'assemblage, rendant chaque décision traçable, chaque arbitrage documenté, et chaque élément de roadmap cadré avant d'écrire la première ligne.",
    "about-p3": "À la FFA, j'ai piloté la roadmap produit de toute la plateforme digitale wholesale de la marque, de la discovery à la delivery : <strong>Shopify Plus ↔ Erplain ERP</strong>, onboarding sur 5 marketplaces, pipeline de fulfillment zéro-touche, chatbot IA spécifié et déployé par mes soins, et réduction de 40 % de la charge admin B2B. J'ai priorisé cette automatisation sur l'impact en raison de sa valeur évidente. Au passage, j'ai identifié une fuite critique de données Google Analytics lors d'un audit de routine et repriorisé le correctif immédiatement, en le reconstruisant sous forme d'architecture de tags côté serveur alignée ISO 27001. C'est le genre de sujet qui devient un problème de conformité si personne ne prend la responsabilité de le chercher.",
    "about-p4": "En dehors de FFA, j'ai géré plus de 20 produits DTC en propre, assumant un ownership P&L complet et une priorisation sous contraintes réelles avec une équipe à distance aux Philippines. Je sais ce qu'un mauvais arbitrage coûte à 2 h du matin, c'est pourquoi je garde l'habitude de valider l'impact avant de cadrer le scope.",
    "about-p5": "Actuellement en fin de <strong>MSc en Ingénierie d'Affaires à KEDGE</strong>, je recherche un CDI à partir de septembre 2026 en tant que Product Owner, Chef de Produit ou Product Manager E-Commerce. En dehors de l'écran, je suis <a href=\"#interests\" style=\"color:var(--gold);text-decoration:none;border-bottom:1px solid var(--border-gold)\">élève pilote PPL, commissaire de sécurité rallye et passionné de V12</a>. Des expériences qui forgent un jugement en situation réelle que l'on n'apprend pas dans un navigateur.",
    "skills-label": "Compétences clés",
    "skill-1": "Roadmap produit & priorisation backlog",
    "skill-2": "Alignement cross-fonctionnel & stakeholders",
    "skill-3": "Décisions data-driven (KPIs)",
    "skill-4": "Product ops e-commerce & marketplace",
    "skill-5": "Delivery agile & aisance technique",
    "skill-6": "Discovery & cadrage de solution",
    "skill-7": "Ingénierie qualité / analyse cause racine",
    "kpi-1": "Produits/boutiques pilotés de bout en bout",
    "kpi-2": "SKUs sous ownership roadmap actif",
    "kpi-3": "Charge admin réduite par refonte process",
    "kpi-4": "Années de discipline d'ingénierie",
    "kpi-5": "Audits process & stakeholders menés",
    "kpi-6": "Pays parcourus en overland",
    "shopify-label": "Expertise Shopify",
    "shopify-title": "Des décisions produit, livrées — du storefront à la supply chain.",
    "sh-kpi-1": "Boutiques Shopify & Shopify Plus construites, configurées et développées",
    "sh-kpi-2": "Intégrations enseignes & marketplaces — Veepee · AstoreShop · N&D · Ankorstore · Kviste",
    "sh-kpi-3": "Saisies manuelles sur le flux fulfillment-facturation FFA, une fois automatisé",
    "sh-kpi-4": "Charge admin de facturation B2B chez FFA après intégration Pennylane",
    "sh-group-core": "Architecture principale",
    "sh-group-accounts": "Comptes clés & canaux",
    "sh-group-tech": "Ops techniques",
    "sh-group-dtc": "Portefeuille DTC",
    "sh-card1-cat": "Shopify Plus · Wholesale B2B",
    "sh-card1-title": "Architecture de portail wholesale B2B sur mesure",
    "sh-card1-desc": "Portails de gros Shopify Plus B2B construits avec des règles de tarification personnalisées, des comptes au niveau de l'entreprise, des flux de draft-order, et conditions de paiement nettes, associés à un mapping complet de schéma entre Shopify B2B et l'ERP Erplain pour garder le stock synchro en temps réel sur 367 SKUs.",
    "sh-card2-cat": "Automatisation · Ops zéro-touche",
    "sh-card2-title": "Pipeline de fulfillment zéro-touche",
    "sh-card2-desc": "Construit sous n8n : chaque commande déclenche une chaîne automatisée de bout en bout, garantissant 0 saisie manuelle sur le flux principal de fulfillment. Ce système est conforme FinOps et prêt pour un contrôle fiscal à tout moment.",
    "sh-card3-cat": "Comptes clés · Mirakl · Marketplace",
    "sh-card3-title": "Intégrations retailers comprenant Veepee · AstoreShop (Accor) · Nature & Découvertes · Ankorstore · Kviste",
    "sh-card3-li1": "<strong>AstoreShop (Groupe Accor) :</strong> Création et maintenance de fiches Mirakl dédiées pour garder le catalogue synchronisé sur les canaux B2B et B2C en même temps, en pilotant la taxonomie des champs, le mapping des variantes, les règles de prix et la conformité SLA de l'onboarding aux opérations en direct.",
    "sh-card3-li2": "<strong>Nature & Découvertes :</strong> Fiches Mirakl personnalisées selon les standards de classification produit de N&D — onboarding catalogue, synchronisation continue et contrôle qualité sur la complétude des champs.",
    "sh-card3-li3": "<strong>Veepee :</strong> Ownership technique complet de l'intégration des campagnes lors des campagnes de ventes privées, ce qui inclut la synchronisation catalogue, le mapping variantes, la configuration de prix et la validation du flux de commande sous fort trafic.",
    "sh-card3-li4": "<strong>Ankorstore :</strong> Onboarding technique du catalogue et synchronisation continue des champs sur la marketplace de gros Ankorstore, ce qui comprend la structuration des données produit et la configuration de prix pour les acheteurs B2B.",
    "sh-card3-li5": "<strong>Kviste :</strong> Distribution du catalogue et gestion des fiches produit sur la plateforme Kviste, assurant le mapping des variantes et l'alignement des catégories selon les spécificités de la plateforme.",
    "sh-card4-cat": "Affiliation · Croissance",
    "sh-card4-title": "Régie d'affiliation Kwanko — déploiement & activation",
    "sh-card4-desc": "Intégration de Kwanko comme régie d'affiliation de la marque, en configurant l'infrastructure de tracking, en définissant les structures de commission par type de partenaire, et en gérant l'activation des éditeurs pour développer le chiffre d'affaires B2C.",
    "sh-card5-cat": "IA · Intelligence client",
    "sh-card5-title": "Adaptation et configuration d'un chatbot IA avec segmentation par intention",
    "sh-card5-desc": "Adaptation d'une application de chatbot Shopify open-source en véritable outil de support pour FFA. J'ai construit une base de connaissances détaillée à partir des questions clients réelles et mis en place une logique conditionnelle triant automatiquement les conversations par intention (support, suggestions, réclamations, achat), permettant à l'équipe de prioriser les files et d'extraire des insights.",
    "sh-card6-cat": "Migration · Fondation · Préservation SEO",
    "sh-card6-title": "WordPress → Shopify : reconstruction complète de la plateforme",
    "sh-card6-desc": "À partir d'une sauvegarde WordPress obsolète, reconstruction complète de la boutique sur Shopify Plus, incluant le thème, les données produit et le portail B2B, avant d'ajouter la synchro ERP, les marketplaces et l'automatisation. Les redirections d'URL et les structures canoniques ont été préservées de bout en bout, garantissant 0 perte de ranking SEO après migration. Tout le reste sur cette page repose sur cette fondation.",
    "sh-card7-cat": "Logistique · API de géolocalisation",
    "sh-card7-title": "Sélecteur de point relais dynamique",
    "sh-card7-desc": "Intégration de l'API Google Maps/Places dans le checkout Shopify pour proposer un sélecteur de Point Relais dynamique. Dès que le client choisit son point relais, ce choix génère automatiquement l'étiquette Colissimo en back-office pour expédier sans aucune saisie.",
    "sh-card8-cat": "Analytics · FinOps · SecOps",
    "sh-card8-title": "Tracking, sécurité des données & opérations financières",
    "sh-card8-desc": "Dashboard de ventes en temps réel sur 167 SKUs (visibilité sur plus de 60 k€ de volume). Identification et correction définitive d'une configuration Google Analytics critique qui exposait des données comportementales à des domaines externes, que j'ai reconstruite sous forme de séparation des tags côté serveur alignée ISO 27001.",
    "sh-card9-cat": "UI/UX · Conversion · Design storefront",
    "sh-card9-title": "Design UX du storefront & optimisation de la conversion",
    "sh-card9-li1": "<strong>UX du checkout :</strong> Refonte des tunnels de checkout pour réduire la friction — progression des étapes simplifiée, signaux de confiance (icônes de paiement, badges de sécurité) et parcours de récupération d'erreur clairs, appliqués aux storefronts DTC comme aux portails wholesale B2B.",
    "sh-card9-li2": "<strong>Architecture des pages produit :</strong> Pages produit structurées pour la conversion, en optimisant la hiérarchie de l'information, l'UX du sélecteur de variantes, les bundle builders dynamiques et le placement des upsells calés sur les signaux d'intention d'achat.",
    "sh-card9-li3": "<strong>Personnalisation de thème & Liquid :</strong> Modifications de thème Shopify sur mesure en Liquid, incluant des surcharges de sections, le rendu conditionnel selon le tag client (B2B vs B2C), et une mise en page responsive pensée mobile-first.",
    "sh-card9-li4": "<strong>Funnels UX & logique A/B :</strong> Conception et iteration de funnels d'acquisition sur plus de 20 boutiques DTC, optimisant la structure de landing page, la hiérarchie au-dessus de la ligne de flottaison, le placement des CTA et le parcours post-achat pensés pour faire progresser la LTV.",
    "sh-card9-li5": "<strong>Performance :</strong> Pipelines d'optimisation d'images (Cloudinary), lazy loading et suivi des Core Web Vitals pour garder un LCP rapide et un CLS minimal sur tous les storefronts.",
    "sh-card10-cat": "Opérations DTC · Croissance",
    "sh-card10-title": "Portefeuille de 20+ boutiques DTC — ownership de bout en bout",
    "sh-card10-li1": "Construction et développement en autonomie de plus de 20 storefronts Shopify sur différentes verticales — sourcing produit, architecture de la boutique, personnalisation du thème, optimisation du checkout, funnels UX.",
    "sh-card10-li2": "Acquisition multicanale via Google Ads, Facebook/Instagram Ads et SEO (Semrush), avec ownership P&L complet — négociations fournisseurs, gestion des marges, ROI des dépenses publicitaires.",
    "sh-card10-li3": "Recrutement et pilotage d'une équipe à distance aux Philippines : workflows asynchrones, dashboards KPI, pipelines de production de contenu pour les canaux Instagram.",
    "sh-card10-li4": "Construction de moteurs d'abonnement avec commandes récurrentes automatisées et kitting de bundles saisonniers pour faire progresser le panier moyen.",
    "sh-ecosystem": "Écosystème intégré",
    "presales-label": "Ma méthode",
    "presales-title": "Les 4 dimensions de l'ownership produit",
    "dim1-num": "01 — Discovery",
    "dim1-title": "Cartographier le problème avant la solution",
    "dim1-desc": "Comprendre l'utilisateur, les contraintes business et la donnée — tout auditer avant d'écrire la première user story.",
    "dim2-num": "02 — Prioritization",
    "dim2-title": "Une roadmap qui dit non autant que oui",
    "dim2-desc": "Classer le backlog par impact business et coût de delivery, pas par celui qui insiste le plus fort — et défendre ce classement devant les stakeholders.",
    "dim3-num": "03 — Cross-Functional Delivery",
    "dim3-title": "Livrer avec ceux qui construisent",
    "dim3-desc": "Travailler au quotidien avec l'engineering, les ops et les partenaires marketplace pour transformer une spec en produit vivant — sécurité et conformité intégrées dès la conception, pas ajoutées après coup.",
    "dim4-num": "04 — Measurement & Iteration",
    "dim4-title": "Livrer, mesurer, ajuster",
    "dim4-desc": "Suivre le seul KPI qui compte, arrêter ce qui ne le fait pas bouger, et réinjecter le résultat dans le sprint suivant.",
    "insight-lbl": "Le parallèle avec l'ingénierie industrielle",
    "insight-body": "Six ans en ingénierie qualité m'ont appris une règle avant toutes les autres : <strong>ne jamais accepter une anomalie ou une demande de fonctionnalité sans en comprendre la cause racine</strong>. Je mesure avant de confirmer et documente pour que la décision soit traçable et reproductible. Quand je priorise un backlog, j'applique la même logique FMEA qu'en ligne de production chez Schaeffler : identifier ce qui casse vraiment, quantifier l'impact, et corriger la cause plutôt que le symptôme.",
    "exp-label": "Expérience",
    "exp-title": "Trajectoire professionnelle",
    "tl-1": "Lic. Génie Informatique",
    "tl-2": "Master Qualité",
    "tl-3": "Ing. Qualité",
    "tl-4": "Ing. QHSE",
    "tl-5": "QA Logiciel",
    "tl-6": "Chef de projet Qualité",
    "tl-7": "MSc Ing. d'Affaires",
    "tl-8": "Chef de Projet / PO",
    "stack-lbl": "Stack technologique",
    "tt1-title": "Shopify Plus & B2B",
    "tt1-body": "20+ boutiques, portails B2B, onboarding Mirakl, migrations WordPress avec préservation SEO.",
    "tt2-title": "Automatisation de workflows",
    "tt2-body": "Pipeline zéro-touche FFA : Shopify → Erplain → Colissimo → Pennylane. 0 saisie manuelle.",
    "tt3-title": "Marketplace Connect",
    "tt3-body": "Onboarding de FFA sur AstoreShop (Accor), N&D, Veepee, Ankorstore et Kviste — fiches sur mesure par plateforme.",
    "tt4-title": "Scripting & ETL",
    "tt4-body": "Pipelines de données, moteurs de scraping B2B (Apollo, API LinkedIn, Google Maps), scoring de leads.",
    "tt5-title": "Intégration IA",
    "tt5-body": "Chatbot en direct chez FFA avec segmentation par intention — classe automatiquement les conversations par gravité et par type.",
    "tt6-title": "Architecture CRM",
    "tt6-body": "Scoring de leads, automatisation du pipeline, synchronisation Brevo/Sidely pour des flux de nurturing B2B multicanaux.",
    "tt7-title": "FinOps & Facturation",
    "tt7-body": "Facturation B2B automatisée chez FFA — 40 % de charge admin en moins. Rapprochement prêt pour le contrôle fiscal.",
    "tt8-title": "Synchronisation ERP B2B",
    "tt8-body": "Synchronisation de stock en temps réel sur 367 SKUs entre Shopify B2B et Erplain. Zéro écart de données.",
    "tt9-title": "Base de données & requêtes",
    "tt9-body": "Structuration, reporting et analytics sur des bases MySQL pour les couches de données CRM et e-commerce.",
    "tt10-title": "Blockchain / Web3",
    "tt10-body": "Traçabilité automobile — données d'inspection engagées dans un registre immuable on-chain. Construit sur IATF 16949.",
    "tt11-title": "SEO & Analytics",
    "tt11-body": "Audits techniques, écarts de mots-clés, analyse concurrentielle et suivi des Core Web Vitals sur les boutiques DTC.",
    "tt12-title": "CDN image & médias",
    "tt12-body": "Pipelines d'optimisation sur 20+ boutiques Shopify — conversion de format, lazy loading, réglage du LCP.",
    "exp1-date": "2025 – Présent",
    "exp1-role": "Product Owner pilotant la refonte globale de ffaperitif.com (Shopify Plus, B2B & B2C)",
    "exp1-li1": "<strong>Roadmap & plateforme B2B :</strong> Ownership de la roadmap de la stack digitale wholesale de la marque, avec la mise en place d'un portail Shopify Plus B2B synchronisé avec l'ERP Erplain, de flux de stock en temps réel sur 367 SKUs, et d'un moteur de bundles/abonnements dynamique pour le cadeau saisonnier et les commandes récurrentes.",
    "exp1-li2": "<strong>Automatisation priorisée :</strong> Spécification et livraison de l'automatisation n8n reliant Shopify, Erplain, Colissimo et Pennylane, garantissant 0 saisie manuelle du réassort à la facturation, ainsi qu'un sélecteur de Point Relais dynamique via l'API Google Maps, intégré directement au checkout.",
    "exp1-li3": "<strong>Delivery cross-fonctionnelle :</strong> Ownership de l'onboarding catalogue et de l'alignement stakeholders sur 5 partenaires marketplace via Mirakl, dont AstoreShop (Groupe Accor), Nature & Découvertes, Veepee, Ankorstore et Kviste. Des fiches dédiées ont été construites par plateforme, couvrant canaux B2B et B2C, taxonomie des champs, mapping des variantes et conformité SLA.",
    "exp1-li4": "<strong>Nouvelle ligne de revenu :</strong> Intégration de Kwanko comme régie d'affiliation de la marque, en configurant le tracking, en définissant les structures de commission, et en pilotant l'activation des éditeurs pour générer du revenu B2C additionnel.",
    "exp1-li5": "Spécification de fonctionnalité : Spécification, déploiement et itération d'une fonctionnalité de chatbot IA. J'ai adapté une app de chatbot Shopify open-source en véritable outil de support, construite autour d'une knowledge base détaillée et d'une logique conditionnelle qui classe automatiquement les conversations par gravité et par type, ce qui aide l'équipe à prioriser les files de chat et à en tirer une lecture client exploitable.",
    "exp1-li6": "<strong>Reprioritisation par impact :</strong> Réduction de 40% de la charge de facturation B2B (priorisé sur l'impact) ; identification d'une fuite critique de données GA en audit et reprioritisation immédiate du correctif, que j'ai reconstruit sous forme d'architecture de tags côté serveur alignée ISO 27001.",
    "exp1-li7": "<strong>Release zéro régression :</strong> Pilotage de la migration WordPress → Shopify legacy comme une release zéro régression, en préservant entièrement le SEO (redirections d'URL, mapping canonique, migration des metafields).",
    "exp2-date": "2023 – 2025",
    "exp2-role": "PM Qualité & Optimisation des Processus",
    "exp2-body": "Conception de boucles de feedback (RETEX) pour identifier les causes racines, traduisant les points de friction opérationnels en spécifications d'amélioration. Pilotage de la cartographie des processus interservices pour réduire le gaspillage et optimiser les délais.",
    "exp3-date": "2022 – 2023",
    "exp3-role": "Ingénieur QA & Support Produit",
    "exp3-body": "Discovery sur les anomalies et tickets techniques clients pour diagnostiquer les bugs systémiques et spécifier des solutions correctives durables. Rédaction de plans de tests fonctionnels et validation de version (QA) avant mise en production.",
    "exp4-date": "2020 – 2022",
    "exp4-role": "Ingénieur QHSE — Dispositifs médicaux",
    "exp4-body": "Cartographies de risques complètes et audits de conformité QHSE sur les principales lignes de sous-traitance. Supervision des réglementations de sécurité chimique et des cadres sanitaires institutionnels. Cartographie des processus interservices pour éliminer le gaspillage et fluidifier les transmissions entre équipes.",
    "exp5-date": "2018 – 2019",
    "exp5-role": "Ingénieur Qualité — Automobile (Schaeffler)",
    "exp5-body": "Analyse des anomalies de production via les méthodes AMDEC pour prioriser le backlog correctif et concevoir des workflows préventifs. Pilotage du déploiement d'un outil interne d'archivage numérique, réduisant le temps de recherche documentaire des équipes.",
    "proj-label": "Entrepreneuriat",
    "proj-title": "Croissance internationale & opérations DTC",
    "p1-cat": "Shopify · Automatisation · FinOps",
    "p1-title": "Cluster opérationnel zéro-touche — FFA",
    "p1-desc": "Automatisation de bout en bout reliant Shopify Plus (storefront), Erplain (ERP B2B), Colissimo (logistique) et Pennylane (facturation). Chaque commande déclenche automatiquement la mise à jour du stock, une étiquette d'expédition et une facture conforme. Résultat : 0 saisie manuelle sur le flux principal, 40 % de charge admin B2B en moins.",
    "cs-btn": "Étude de cas ↓",
    "cs1-h1": "Le problème",
    "cs1-p1": "Le processus de fulfillment de FFA reposait sur la saisie manuelle à chaque transfert, les commandes Shopify étant recopiées dans Erplain, les étiquettes d'expédition faites à la main, et les factures tapées une à une dans Pennylane. Chaque étape ajoutait du délai, de l'erreur humaine et un risque de conformité sur la facturation B2B.",
    "cs1-h2": "L'approche",
    "cs1-li1": "Cartographie complète du flux de fulfillment de bout en bout avant d'écrire la moindre règle d'automatisation",
    "cs1-li2": "Conception d'une architecture pilotée par webhooks dans n8n, où chaque événement de commande Shopify déclenche une chaîne séquentielle avec gestion d'erreur à chaque nœud",
    "cs1-li3": "Mapping de schéma au niveau du champ entre Shopify, Erplain, Colissimo et Pennylane, évitant tout champ non mappé pour éliminer les échecs silencieux",
    "cs1-li4": "Ajout d'une validation côté serveur pour intercepter les payloads malformés avant qu'ils n'atteignent les systèmes en aval",
    "cs1-h3": "Le résultat",
    "cs1-r1": "0 saisie manuelle",
    "cs1-r2": "−40 % de charge admin",
    "cs1-r3": "100 % conforme FinOps",
    "cs1-r4": "Prêt pour le contrôle fiscal",
    "p2-cat": "Fondateur DTC · 20+ boutiques",
    "p2-title": "Portefeuille de marques DTC internationales",
    "p2-desc": "Construction et développement de plus de 20 storefronts Shopify avec ownership P&L complet. Acquisition multicanale (Google Ads, Meta, SEO) et équipe à distance aux Philippines pilotant des workflows asynchrones et des dashboards KPI. Moteurs d'abonnement et kitting de bundles saisonniers pour faire progresser le panier moyen.",
    "p3-cat": "Web3 · Supply chain · Blockchain",
    "p3-title": "Module de traçabilité blockchain (Polygon)",
    "p3-desc": "Un prototype de traçabilité automobile sur Polygon. Chaque inspection de pièce engage des métadonnées de conformité dans un registre immuable, verrouillant toute falsification documentaire sur des supply chains internationales, apportant une couche nouvelle génération au-dessus de l'IATF 16949.",
    "p4-cat": "Ingénierie de croissance B2B",
    "p4-title": "Pipelines de prospection B2B automatisés",
    "p4-desc": "Génération de leads automatisée pour des cycles de vente B2B complexes. Scraping multi-sources (API LinkedIn, Google Maps, Apollo), scoring automatisé et séquences outbound multicanales personnalisées via Brevo, synchronisées directement avec le CRM HubSpot.",
    "cs2-h1": "Le problème",
    "cs2-p1": "La prospection B2B manuelle à grande échelle est lente et inégale — des leads venus de sources éparses, aucun scoring unifié, des messages écrits un par un. L'objectif : un système capable de trouver, qualifier et contacter des cibles B2B vérifiées sans goulot d'étranglement manuel.",
    "cs2-h2": "L'approche",
    "cs2-li1": "Extraction multi-sources : LinkedIn Sales Navigator via Apify, API Google Maps pour les commerces locaux, Apollo pour les emails vérifiés",
    "cs2-li2": "Enrichissement automatisé — chaque lead scoré sur des critères firmographiques (taille d'entreprise, secteur, poste du décideur) avant d'entrer dans la séquence",
    "cs2-li3": "Séquences outbound personnalisées construites dans Brevo, déclenchées par n8n selon des seuils de score",
    "cs2-li4": "Synchronisation CRM complète avec HubSpot — chaque point de contact enregistré, étape de deal mise à jour automatiquement à la réponse ou au clic",
    "cs2-h3": "Le résultat",
    "cs2-r1": "Moteur de leads multi-sources",
    "cs2-r2": "Scoring automatisé",
    "cs2-r3": "0 prospection manuelle",
    "cs2-r4": "HubSpot entièrement synchronisé",
    "edu-label": "Formation",
    "edu-title": "Parcours académique & certifications",
    "edu1-name": "MSc en Ingénierie d'Affaires",
    "edu1-deg": "Double diplôme : MSc & Master en Développement Commercial (2026)",
    "edu1-desc": "Traduire des structures techniques complexes en propositions commerciales à forte valeur ajoutée. Architecture de solutions d'entreprise et stratégie avant-vente.",
    "edu2-name": "Parcours Ingénieur — Business & Data Analyst",
    "edu2-deg": "Parcours Blockchain, IA & Data Engineering",
    "edu2-desc": "Conception de systèmes d'information, logique algorithmique, analyse de métriques complexes et cartographie de business intelligence.",
    "edu3-name": "Master en Management de la Qualité et de la Performance",
    "edu3-deg": "Diplômé en 2018",
    "edu3-desc": "Opérations industrielles, audit de conformité international, validation de process et cadres de réduction des risques systèmes.",
    "edu4-name": "Licence en Génie Informatique",
    "edu4-deg": "Double diplôme",
    "edu4-desc": "Logique algorithmique, schémas de données avancés, interopérabilité logicielle multiplateforme et bases réseau.",
    "cert-label": "Certifications vérifiées",
    "cert-title": "Accréditations en architecture technique & sécurité",
    "cert1-title": "Sécurité des infrastructures & réseaux",
    "cert2-title": "Architecture CRM & automatisation",
    "cert3-title": "Optimisation IA & prompt engineering",
    "cert4-title": "Gouvernance réglementaire & excellence système",
    "int-label": "Centres d'intérêt & agilité",
    "int-title": "Intelligence situationnelle & systèmes sous pression",
    "int1-title": "Rallye Historique du Maroc",
    "int1-desc": "Commissaire de course & marshal de sécurité piste — protocoles de sécurité en piste, orientation en temps réel en cas de crise et évaluation des incidents mécaniques sur un parcours désertique de 2 500 km.",
    "int2-title": "Aéronautique & formation au pilotage",
    "int2-desc": "Élève pilote PPL actif à l'Aéroclub ARC (Chavenay) — navigation longue distance, interpolation météo aéronautique, aérodynamique structurelle, et un faible pour les cellules en bois et toile des Jodel.",
    "int3-title": "Ingénierie & Mécanique Automobile",
    "int3-desc": "Passionné de mécanique et de reverse engineering pour la réparation, l'augmentation de puissance et l'optimisation. Diagnostics et procédures de maintenance complexes spécifiques à chaque modèle. Expérience pratique sur mes véhicules personnels : reconstruction de blocs TFSI, TSI et TDI (1.9 et 3.0 V6) du groupe VAG (Golf GTI et Audi A5), restauration complète de ma Mercedes CL600 V12, préparation moteur de ma BMW 335d E92 et projet drift de ma Lexus IS200 avec swap moteur 1JZ-GTE.",
    "int4-title": "Expédition overland — 36 pays",
    "int4-desc": "Maroc → Europe → Turquie · Malaisie · Indonésie · Philippines · Géorgie · Azerbaïdjan — une capacité d'adaptation testée à chaque frontière.",
    "int5-title": "Dynamique de drift",
    "int5-desc": "Étude de la physique du survirage contrôlé, du transfert de masse et de la dynamique du véhicule à la limite — des principes d'ingénierie appliqués au pilotage en temps réel.",
    "int6-title": "Ingénierie blockchain",
    "int6-desc": "Un module de traçabilité sur Polygon qui engage des métadonnées de conformité automobile dans des registres immuables on-chain — exploration des architectures décentralisées comme infrastructure de confiance en entreprise.",
    "map-visited": "Visités (36)",
    "map-not": "Pas encore",
    "map-hover": "survoler un pays",
    "contact-label": "Contact",
    "contact-title": "Travaillons ensemble.",
    "contact-h3": "Product Owner · Plateformes E-Commerce & B2B<br><span style=\"color:var(--gold);font-size:.88rem;font-weight:400\">CDI — à partir de septembre 2026</span>",
    "contact-p": "Six ans de discipline d'ingénieur. Un produit emmené d'un site WordPress legacy à une plateforme Shopify Plus entièrement automatisée et multi-marketplace, en pilotant la roadmap, la priorisation et la delivery cross-fonctionnelle de bout en bout. Si vous cherchez quelqu'un capable de s'asseoir avec les utilisateurs et les stakeholders, de transformer l'ambiguïté en backlog priorisé et de livrer, c'est ce profil. Discutons.",
    "clink-phone": "Téléphone",
    "clink-loc": "Localisation",
    "calendly-btn": "Réserver un appel de 20 min",
    "form-name": "Nom",
    "form-name-ph": "Votre nom",
    "form-email": "Email",
    "form-message": "Message",
    "form-msg-ph": "Votre message...",
    "submit-btn": "Envoyer le message",
    "footer-copy": "© 2026 Saad Bayahia",
    "footer-top": "↑ Haut",
    "nav-github": "GitHub",
    "github-label": "Open Source & Code",
    "github-title": "Projets & code source",
    "git-loading": "Chargement des dépôts depuis GitHub...",
    "git-error": "Impossible de charger les dépôts. Veuillez les consulter directement sur <a href=\"https://github.com/saad2jz\" target=\"_blank\" style=\"color:var(--gold)\">GitHub</a>.",
    "git-stars": "étoiles",
    "git-view": "Voir le code",
    "skip-link": "Aller au contenu principal",
    "menu-label": "Navigation principale",
    "close-banner": "Fermer le bandeau",
    "back-top": "Retour en haut",
    "theme-light": "Activer le thème clair",
    "theme-dark": "Activer le thème sombre",
    "meta-description": "Saad Bayahia, Product Owner à Paris : refonte Shopify Plus, intégration de 5 marketplaces et automatisation B2B. Découvrez mes réalisations et contactez-moi."
  }
};

    /* ════════════════════════════════════════════
       SETLANG
    ════════════════════════════════════════════ */
    function setLang(lang) {
      if (!Object.hasOwn(i18n,lang)) lang='en';
      document.documentElement.setAttribute('data-lang', lang);
      document.documentElement.setAttribute('lang', lang);
      try { localStorage.setItem('lang', lang); } catch (e) { }
      document.querySelectorAll('.lang-toggle button').forEach(button => { const active=button.dataset.l===lang;button.classList.toggle('active',active);button.setAttribute('aria-pressed',String(active)); });
      const t = i18n[lang]; if (!t) return;

      twStart(lang);
      document.querySelector('meta[name="description"]').content=t['meta-description'];
      document.querySelector('meta[property="og:description"]').content=t['meta-description'];
      document.querySelector('meta[name="twitter:description"]').content=t['meta-description'];
      document.querySelector('meta[property="og:locale"]').content=lang==='fr'?'fr_FR':'en_US';
      document.querySelector('meta[property="og:locale:alternate"]').content=lang==='fr'?'en_US':'fr_FR';
      document.querySelectorAll('[data-i18n-aria-label]').forEach(el=>el.setAttribute('aria-label',t[el.dataset.i18nAriaLabel]));
      updateThemeLabel();

      document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.textContent = t[key];
      });
      document.querySelectorAll('[data-i18n-html]').forEach(el => {
        const key = el.getAttribute('data-i18n-html');
        if (t[key] !== undefined) el.innerHTML = t[key];
      });
      document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key] !== undefined) el.setAttribute('placeholder', t[key]);
      });
      const bannerEl = document.getElementById('banner-text');
      if (bannerEl && t['banner-html']) bannerEl.innerHTML = t['banner-html'];
      ['about-p1', 'about-p2', 'about-p3', 'about-p4', 'about-p5'].forEach(key => {
        const el = document.querySelector(`[data-i18n="${key}"]`);
        if (el && t[key]) el.innerHTML = t[key];
      });
      const ib = document.querySelector('[data-i18n="insight-body"]');
      if (ib && t['insight-body']) ib.innerHTML = t['insight-body'];
      ['sh-card2-desc', 'sh-card5-desc', 'sh-card7-desc'].forEach(key => {
        const el = document.querySelector(`[data-i18n="${key}"]`);
        if (el && t[key]) el.innerHTML = t[key];
      });
      const htmlListKeys = ['sh-card3-li1', 'sh-card3-li2', 'sh-card3-li3', 'sh-card3-li4', 'sh-card3-li5', 'sh-card9-li1', 'sh-card9-li2', 'sh-card9-li3', 'sh-card9-li4', 'sh-card9-li5', 'exp1-li1', 'exp1-li2', 'exp1-li3', 'exp1-li4', 'exp1-li5', 'exp1-li6', 'exp1-li7'];
      htmlListKeys.forEach(key => {
        const el = document.querySelector(`[data-i18n="${key}"]`);
        if (el && t[key]) el.innerHTML = t[key];
      });
      document.querySelectorAll('.cs-btn').forEach(btn => {
        if (t['cs-btn']) {
          const isOpen = btn.classList.contains('open');
          const label = t['cs-btn'].replace(' ↓', '').replace(' ↓', '');
          btn.textContent = label + ' ';
          const sp = document.createElement('span');
          sp.className = 'cs-arrow';
          sp.textContent='↓';sp.setAttribute('aria-hidden','true');
          if (isOpen) sp.style.transform = 'rotate(180deg)';
          btn.appendChild(sp);
        }
      });
      const mapTip = document.getElementById('map-tip');
      if (mapTip && t['map-hover']) mapTip.textContent = t['map-hover'];
      const ch3 = document.querySelector('[data-i18n-html="contact-h3"]');
      if (ch3 && t['contact-h3']) ch3.innerHTML = t['contact-h3'];
      if (typeof fetchGithubRepos === 'function') fetchGithubRepos();
    }

    function updateThemeLabel() {
      const button=document.getElementById('theme-btn');
      const light=document.documentElement.dataset.theme==='light';
      const label=i18n[document.documentElement.lang][light?'theme-dark':'theme-light'];
      button.setAttribute('aria-label',label);button.title=label;
      button.setAttribute('aria-pressed',String(light));
    }

    /* ════════════════════════════════════════════
       CASE STUDY TOGGLE
    ════════════════════════════════════════════ */
    function toggleCS(btn) {
      btn.classList.toggle('open');
      btn.setAttribute('aria-expanded',String(btn.classList.contains('open')));
      const arrow = btn.querySelector('.cs-arrow');
      if (arrow) arrow.style.transform = btn.classList.contains('open') ? 'rotate(180deg)' : '';
      const panel = btn.nextElementSibling;
      panel.classList.toggle('open');
      panel.inert=!panel.classList.contains('open');
    }

    /* ════════════════════════════════════════════
       SCROLL HINT HIDE
    ════════════════════════════════════════════ */
    (function () {
      const hint = document.getElementById('scroll-hint');
      if (!hint) return;
      window.addEventListener('scroll', () => { hint.style.opacity = '0'; hint.style.transition = 'opacity .4s'; }, { passive: true, once: true });
    })();
    /* ════════════════════════════════════════════
       GITHUB PROJECTS FETCH
    ════════════════════════════════════════════ */
    (function () {
      const githubUser = 'saad2jz';
      const fallbackRepos = [
        { name: 'leadhunt', description: '', language: 'Python', stargazers_count: null, html_url: 'https://github.com/saad2jz/leadhunt' },
        { name: 'Cardiag', description: '', language: 'JavaScript', stargazers_count: null, html_url: 'https://github.com/saad2jz/Cardiag' },
        { name: 'Portfolio', description: '', language: 'HTML', stargazers_count: null, html_url: 'https://github.com/saad2jz/Portfolio' },
        { name: 'alx-system_engineering-devops', description: '', language: 'Bash', stargazers_count: null, html_url: 'https://github.com/saad2jz/alx-system_engineering-devops' }
      ];

      const repoDescriptions = {
        en: {
          'leadhunt': 'SaaS B2B Prospection engine featuring multi-source data enrichment cascades, automated lead scoring, and n8n workflows syncing directly with HubSpot CRM.',
          'Cardiag': 'CarDiag.online diagnostics platform mapping OBD motor fault codes directly to guided troubleshooting logs and step-by-step repair guides for automotive experts.',
          'Portfolio': 'Bilingual portfolio showcase utilizing a custom client-side i18n engine, glassmorphic layout components, and a D3.js travel logging world map.',
          'alx-system_engineering-devops': 'ALX Software Engineering track covering system engineering, automation scripting, server configuration, and networking protocols.'
        },
        fr: {
          'leadhunt': 'Outil SaaS de prospection B2B automatisant l\'enrichissement de contacts multi-sources, le scoring de leads et la synchronisation n8n vers le CRM HubSpot.',
          'Cardiag': 'Plateforme de diagnostic OBD CarDiag.online, associant directement les codes défauts moteur à des procédures guidées de réparation pour les techniciens.',
          'Portfolio': 'Site vitrine premium avec moteur de traduction dynamique FR/EN, interface glassmorphique et carte interactive D3.js de suivi de voyages.',
          'alx-system_engineering-devops': 'Spécialisation ingénierie système ALX, axée sur les scripts d\'automatisation shell, la configuration de serveurs et les couches réseau.'
        }
      };

      const cacheKey='portfolio-github-v1',cacheLifetime=30*60*1000;
      let cachedRepos=fallbackRepos, loaded=false, pending=null, shouldFetch=false;
      try { const saved=JSON.parse(sessionStorage.getItem(cacheKey));if(saved&&Date.now()-saved.at<cacheLifetime&&Array.isArray(saved.repos)&&saved.repos.length){cachedRepos=saved.repos;loaded=true;} }catch{}
      window.fetchGithubRepos=function() {
        renderRepos(cachedRepos);
        if(!shouldFetch||loaded||pending)return pending;
        const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),8000);
        pending=fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated&per_page=12`,{signal:controller.signal})
          .then(response=>{if(!response.ok)throw new Error('GitHub unavailable');return response.json();})
          .then(data=>{
            if(!Array.isArray(data))throw new Error('Invalid GitHub response');
            const selected=data.filter(repo=>!repo.fork&&!['alx-pre_course','alx-zero_day'].includes(repo.name)&&typeof repo.html_url==='string'&&repo.html_url.startsWith(`https://github.com/${githubUser}/`));
            selected.sort((a,b)=>b.stargazers_count-a.stargazers_count);
            if(selected.length)cachedRepos=selected.slice(0,6);
            loaded=true;
            try{sessionStorage.setItem(cacheKey,JSON.stringify({at:Date.now(),repos:cachedRepos}));}catch{}
            renderRepos(cachedRepos);
          }).catch(()=>{loaded=true;renderRepos(cachedRepos);})
          .finally(()=>{clearTimeout(timeout);pending=null;});
        return pending;
      };
      const githubObserver=new IntersectionObserver(entries=>{if(entries[0].isIntersecting){shouldFetch=true;window.fetchGithubRepos();githubObserver.disconnect();}},{rootMargin:'300px'});
      githubObserver.observe(document.getElementById('github'));

      function renderRepos(repos) {
        const container = document.getElementById('github-repos-container');
        if (!container) return;
        container.innerHTML = '';
        
        const lang = document.documentElement.getAttribute('data-lang') || 'en';
        const t = i18n[lang];
        
        repos.forEach(repo => {
          const card = document.createElement('a');
          card.className = 'git-card rv-s';
          card.href = typeof repo.html_url==='string'&&repo.html_url.startsWith(`https://github.com/${githubUser}/`)?repo.html_url:`https://github.com/${githubUser}`;
          card.target = '_blank';
          card.rel = 'noopener noreferrer';
          
          let displayName = repo.name;
          if (displayName === 'Cardiag') {
            displayName = 'cardiag.online';
          }
          
          const descDict = repoDescriptions[lang] || repoDescriptions.en;
          const description = descDict[repo.name] || repo.description || (lang === 'fr' ? 'Aucune description disponible.' : 'No description available.');
          
          const escapeHTML=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
          card.innerHTML = `
            <div>
              <div class="git-repo-header">
                <div class="git-repo-title">${escapeHTML(displayName)}</div>
                <div class="git-repo-stars">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.82 1.4-8.168L.132 9.21l8.2-1.192z"/></svg>
                  <span>${Number.isFinite(repo.stargazers_count) ? repo.stargazers_count : ""}</span>
                </div>
              </div>
              <div class="git-repo-desc">${escapeHTML(description)}</div>
            </div>
            <div class="git-repo-footer">
              <span class="git-repo-lang">${escapeHTML(repo.language || 'Code')}</span>
              <span class="git-repo-link">${t['git-view'] || 'View Code'} →</span>
            </div>
          `;
          const stars=card.querySelector('.git-repo-stars');if(!Number.isFinite(repo.stargazers_count))stars.remove();else stars.setAttribute('aria-label',`${repo.stargazers_count} ${t['git-stars']}`);
          card.querySelector('svg')?.setAttribute('aria-hidden','true');
          container.appendChild(card);
        });
        
        // Re-observe dynamic cards
        if (typeof io !== 'undefined') {
          container.querySelectorAll('.rv-s').forEach(el => io.observe(el));
        }
      }
    })();

    /* ════════════════════════════════════════════
       INIT (banner + lang)
    ════════════════════════════════════════════ */
    (function () {
      try { if (localStorage.getItem('banner-closed') === '1') { const b = document.getElementById('avail-banner'); if (b) b.classList.add('hidden'); } } catch (e) { }
      let savedLang = 'en';
      try { savedLang = localStorage.getItem('lang') || 'en'; } catch (e) { }
      setLang(savedLang);
    })();

    /* ════════════════════════════════════════════
       WORLD MAP — parallel D3 + TopoJSON load
    ════════════════════════════════════════════ */
    (function () {
      if (!document.getElementById('portfolio-map')) return;
      const visited = new Set([504, 724, 620, 250, 276, 528, 56, 756, 380, 40, 203, 616, 703, 348, 705, 191, 70, 499, 688, 807, 8, 300, 792, 100, 642, 498, 233, 428, 440, 458, 360, 608, 31, 268, 12, 788]);
      const names = { 504: 'Morocco', 724: 'Spain', 620: 'Portugal', 250: 'France', 276: 'Germany', 528: 'Netherlands', 56: 'Belgium', 756: 'Switzerland', 380: 'Italy', 40: 'Austria', 203: 'Czech Republic', 616: 'Poland', 703: 'Slovakia', 348: 'Hungary', 705: 'Slovenia', 191: 'Croatia', 70: 'Bosnia & Herz.', 499: 'Montenegro', 688: 'Serbia', 807: 'North Macedonia', 8: 'Albania', 300: 'Greece', 792: 'Turkey', 100: 'Bulgaria', 642: 'Romania', 498: 'Moldova', 233: 'Estonia', 428: 'Latvia', 440: 'Lithuania', 458: 'Malaysia', 360: 'Indonesia', 608: 'Philippines', 31: 'Azerbaijan', 268: 'Georgia', 12: 'Algeria', 788: 'Tunisia' };
      const namesFr = { 504: 'Maroc', 724: 'Espagne', 620: 'Portugal', 250: 'France', 276: 'Allemagne', 528: 'Pays-Bas', 56: 'Belgique', 756: 'Suisse', 380: 'Italie', 40: 'Autriche', 203: 'Rép. tchèque', 616: 'Pologne', 703: 'Slovaquie', 348: 'Hongrie', 705: 'Slovénie', 191: 'Croatie', 70: 'Bosnie-Herzégovine', 499: 'Monténégro', 688: 'Serbie', 807: 'Macédoine du Nord', 8: 'Albanie', 300: 'Grèce', 792: 'Turquie', 100: 'Bulgarie', 642: 'Roumanie', 498: 'Moldavie', 233: 'Estonie', 428: 'Lettonie', 440: 'Lituanie', 458: 'Malaisie', 360: 'Indonésie', 608: 'Philippines', 31: 'Azerbaïdjan', 268: 'Géorgie', 12: 'Algérie', 788: 'Tunisie' };

      function loadScript(src) {
        return new Promise((resolve, reject) => {
          const s = document.createElement('script');
          s.src = src; s.onload = resolve; s.onerror = reject;
          document.head.appendChild(s);
        });
      }

      const mapObserver=new IntersectionObserver(entries=>{
        if(!entries[0].isIntersecting)return;
        mapObserver.disconnect();
        Promise.all([
          loadScript('https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js'),
          loadScript('https://cdnjs.cloudflare.com/ajax/libs/topojson/3.0.2/topojson.min.js')
        ]).then(initMap).catch(()=>{});
      },{rootMargin:'300px'});
      mapObserver.observe(document.getElementById('portfolio-map'));

      function initMap() {
        const wrap = document.getElementById('portfolio-map');
        if (!wrap) return;
        const w = wrap.clientWidth || 680;
        const h = Math.round(w * 0.48);
        const svg = d3.select('#portfolio-map').append('svg').attr('viewBox', '0 0 ' + w + ' ' + h).attr('width', '100%').attr('role','img').attr('aria-label',document.documentElement.lang==='fr'?'Carte des 36 pays visités':'Map of 36 visited countries').style('display', 'block');
        const proj = d3.geoNaturalEarth1().scale(w / 6.4).translate([w / 2, h / 2]);
        const path = d3.geoPath(proj);
        const tip = document.getElementById('map-tip');
        svg.append('rect').attr('width', w).attr('height', h).attr('fill', '#0d1117');
        d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(world => {
          const features = topojson.feature(world, world.objects.countries).features;
          svg.selectAll('path.mc').data(features).join('path').attr('class', 'mc')
            .attr('d', path).attr('fill', d => visited.has(+d.id) ? '#C8963E' : '#1e2433')
            .attr('stroke', '#0d1117').attr('stroke-width', 0.5)
            .style('cursor', d => visited.has(+d.id) ? 'pointer' : 'default')
            .on('mouseover', function (event, d) {
              const id = +d.id;
              const lang = document.documentElement.getAttribute('data-lang') || 'en';
              const nmap = lang === 'fr' ? namesFr : names;
              if (visited.has(id)) { d3.select(this).attr('fill', '#E8B060'); if (tip) tip.textContent = '📍 ' + (nmap[id] || ''); }
              else { if (tip) tip.textContent = nmap[id] || ''; }
            })
            .on('mouseout', function (event, d) {
              const id = +d.id;
              d3.select(this).attr('fill', visited.has(id) ? '#C8963E' : '#1e2433');
              const lang = document.documentElement.getAttribute('data-lang') || 'en';
              const t = i18n[lang];
              if (tip) tip.textContent = t ? t['map-hover'] : 'hover a country';
            });
        }).catch(err => console.warn('World atlas load failed:', err));
      }
    })();

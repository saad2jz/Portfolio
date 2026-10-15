"""Generate the public, phone-free FR/EN CV from owner-confirmed portfolio facts.
Requires reportlab; the PDFs are checked in, so deployment needs no Python.
"""
from pathlib import Path
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.lib.enums import TA_LEFT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.lib.pagesizes import A4

root=Path(__file__).resolve().parent.parent
out=root/'public/cv';out.mkdir(parents=True,exist_ok=True)
pdfmetrics.registerFont(TTFont('CV','C:/Windows/Fonts/arial.ttf'))
pdfmetrics.registerFont(TTFont('CVBold','C:/Windows/Fonts/arialbd.ttf'))
pdfmetrics.registerFontFamily('CV',normal='CV',bold='CVBold')
base=ParagraphStyle('body',fontName='CV',fontSize=9.2,leading=12,textColor=HexColor('#24332e'),spaceAfter=5)
heading=ParagraphStyle('heading',parent=base,fontName='CVBold',fontSize=10.7,leading=14,textColor=HexColor('#27664f'),spaceBefore=10,spaceAfter=5)
title=ParagraphStyle('name',parent=base,fontName='CVBold',fontSize=26,leading=30,spaceAfter=4)
sub=ParagraphStyle('sub',parent=base,fontSize=13,leading=18,spaceAfter=7)
copy={
'fr':{
'title':'Product Owner · Paris',
'intro':'Pilotage produit, e-commerce B2B et automatisation. Six ans d’expérience en qualité et management des processus, au service de la priorisation, de la résolution de problèmes et de la validation produit.',
'experience':'EXPÉRIENCES PROFESSIONNELLES',
'rows':[
('2025–2026 · FFA','Chef de projet e-commerce B2B / Product Manager — alternance KEDGE. Refonte Shopify Plus ; 5 marketplaces, 367 références et flux commande, stock, expédition et facturation.'),
('2023–2025 · SIT Group','Chef de projet qualité et amélioration des processus. Analyse des risques, AMDEC, PDCA, recherche des causes racines et coordination des plans d’action.'),
('2022–2023 · Webmedia Solutions','Qualité logicielle et support produit. Analyse des anomalies, plans de tests fonctionnels, recette et validation des versions.'),
('2020–2022 · Fondation MASCIR','Ingénierie QHSE et dispositifs médicaux. Cartographie des risques, audits des sous-traitants, sécurité chimique et amélioration interservices.'),
('2018–2019 · Schaeffler Group','Qualité production automobile. AMDEC, résolution de problèmes, actions correctives et traçabilité documentaire.'),
('2015 · ALLIANCES / 2016 · TGR','Audit des systèmes d’information (ALLIANCES) ; développement web, procédures SQL et tests fonctionnels d’un portail interne (TGR).')],
'projects':'PROJETS & ENTREPRENEURIAT',
'projectsText':'<b>LeadHunt</b> — produit de prospection B2B avec copilote conversationnel et extension Chrome. <b>Cardiag</b> — inspection guidée : 12 points rapides, 33 contrôles complets, 201 marques ; version publique depuis septembre 2026, environ 10 utilisateurs.<br/><b>Commerce indépendant · depuis 2019</b> — 20+ boutiques Shopify / WooCommerce, branding, sourcing Chine/Turquie, négociation, affiliation, acquisition et ventes internationales.',
'education':'FORMATIONS',
'educationText':'<b>2025–2026 · KEDGE Business School, Toulon</b> — double diplôme MSc Business Engineer & Master Ingénieur d’Affaires.<br/><b>2025–2026 · ISEN, Toulon</b> — Track Business & Data Analyst ; module académique ISO/IEC 27001.<br/><b>2016–2018 · Université de Franche-Comté, Besançon</b> — Master Qualité et Management des Performances.<br/><b>2012–2016 · UIR × Université de Nantes</b> — Licence en Génie Informatique, double diplôme.',
'skills':'COMPÉTENCES & FORMATION CONTINUE',
'skillsText':'Discovery, backlog, critères d’acceptation, MoSCoW, vente complexe et B2B. Shopify, n8n, HubSpot, JavaScript/TypeScript, Python et SQL. AMDEC, 8D, PDCA, Lean Six Sigma. SAP S/4HANA Cloud Public Edition : formation en cours en 2026.',
'extra':'Français et arabe courants · anglais professionnel · espagnol élémentaire. Formation PPL en cours, sécurité rallye, restauration de moteurs et simracing.',
'award':'Hackathon Ansys · KEDGE Business School · 2026 : première place, catégorie Innovation.',
},
'en':{
'title':'Product Owner · Paris',
'intro':'Product ownership, B2B e-commerce and automation. Six years in quality and process management support prioritisation, problem solving and product validation.',
'experience':'PROFESSIONAL EXPERIENCE',
'rows':[
('2025–2026 · FFA','B2B E-Commerce Project Lead / Product Manager — KEDGE work-study placement. Shopify Plus rebuild; 5 marketplaces, 367 SKUs and connected order, stock, shipping and invoice workflows.'),
('2023–2025 · SIT Group','Quality Project Lead and process improvement. Risk analysis, FMEA, PDCA, root-cause investigation and coordinated action plans.'),
('2022–2023 · Webmedia Solutions','Software quality and product support. Defect analysis, functional test plans, acceptance testing and release validation.'),
('2020–2022 · MASCIR Foundation','QHSE engineering and medical-device operations. Risk mapping, contractor audits, chemical safety and cross-functional improvement.'),
('2018–2019 · Schaeffler Group','Automotive production quality. FMEA, problem solving, corrective actions and document traceability.'),
('2015 · ALLIANCES / 2016 · TGR','Information-systems audit (ALLIANCES); web development, SQL procedures and functional testing for an internal portal (TGR).')],
'projects':'PROJECTS & ENTREPRENEURSHIP',
'projectsText':'<b>LeadHunt</b> — B2B prospecting product with a conversational copilot and Chrome extension. <b>Cardiag</b> — guided inspection: 12 quick points, 33 full checks and 201 makes; public since September 2026, approximately 10 users.<br/><b>Independent commerce · since 2019</b> — 20+ Shopify / WooCommerce stores, branding, China/Turkey sourcing, negotiation, affiliates, acquisition and international sales.',
'education':'EDUCATION',
'educationText':'<b>2025–2026 · KEDGE Business School, Toulon</b> — MSc Business Engineer & Master Ingénieur d’Affaires dual qualification.<br/><b>2025–2026 · ISEN, Toulon</b> — Business & Data Analyst track; academic ISO/IEC 27001 module.<br/><b>2016–2018 · Université de Franche-Comté, Besançon</b> — Master in Quality and Performance Management.<br/><b>2012–2016 · UIR × Université de Nantes</b> — dual qualification in Computer Science.',
'skills':'SKILLS & CONTINUING EDUCATION',
'skillsText':'Discovery, backlogs, acceptance criteria, MoSCoW, complex sales and B2B. Shopify, n8n, HubSpot, JavaScript/TypeScript, Python and SQL. FMEA, 8D, PDCA and Lean Six Sigma. SAP S/4HANA Cloud Public Edition: training in progress in 2026.',
'extra':'Fluent French and Arabic · professional English · elementary Spanish. PPL training in progress, rally safety, engine restoration and simracing.',
'award':'Ansys hackathon · KEDGE Business School · 2026: first place, Innovation category.',
}}
for lang,data in copy.items():
 target=out/f'saad-bayahia-{lang}.pdf'
 doc=SimpleDocTemplate(str(target),pagesize=A4,leftMargin=38,rightMargin=38,topMargin=32,bottomMargin=32,title=f'Saad Bayahia — {data["title"]}',author='Saad Bayahia')
 story=[Paragraph('SAAD BAYAHIA',title),Paragraph(data['title'],sub),Paragraph('<link href="https://www.saadbayahia.com/">saadbayahia.com</link> · <link href="https://calendly.com/saad-bayahia">Calendly</link> · <link href="https://www.linkedin.com/in/saad-bayahia-2b025916a/">LinkedIn</link>',base),Paragraph(data['intro'],base),Paragraph(data['experience'],heading)]
 for date,body in data['rows']:story+=[Paragraph('<b>'+date+'</b><br/>'+body,base)]
 story+=[Paragraph(data['projects'],heading),Paragraph(data['projectsText'],base),Paragraph(data['award'],base),Paragraph(data['education'],heading),Paragraph(data['educationText'],base),Paragraph(data['skills'],heading),Paragraph(data['skillsText'],base),Paragraph(data['extra'],base)]
 doc.build(story)
 print(target)

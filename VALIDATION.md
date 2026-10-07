# Vérifications — 7 octobre 2026

Version locale vérifiée avec Playwright, Google Chrome et axe-core 4.10.3.

## Affichage

20 combinaisons testées : largeurs 320, 390, 768, 1024 et 1440 pixels × français/anglais × sombre/clair. Aucun débordement horizontal de la page.

Revue visuelle des aperçus ordinateur et mobile. L'identité sombre et dorée est conservée, avec une action principale plus visible et une typographie plus lisible.

## Accessibilité et interactions

- Audit axe-core, règles WCAG 2 A/AA et WCAG 2.1 AA : aucun problème détecté dans les audits finaux. Ce résultat automatisé ne constitue pas une certification complète d'accessibilité.
- Contenu visible immédiatement et sans JavaScript ; quatre liens de projets présents hors ligne.
- Boutons de langue utilisables avec Entrée.
- Menu mobile : état ARIA, liens inaccessibles lorsqu'il est fermé, fermeture par Échap et retour du focus au bouton.
- Ancres : URL mise à jour et focus déplacé vers la section cible.
- Études de cas : ouverture/fermeture et flèche conservée après changement de langue.
- Préférence de réduction des animations : contenu toujours visible et effet machine à écrire arrêté.
- Formulaire : erreur HTTP non JSON, reprise de l'envoi, succès annoncé et champs réinitialisés. Requêtes interceptées localement, sans envoi réel.
- GitHub : une seule requête lors de changements rapides FR/EN, cache conservé après rechargement, données contenant du HTML affichées comme texte.
- Absence d'erreur JavaScript pendant le parcours vérifié.

## Chargements et limites

Les tests vérifient que D3, TopoJSON, les données de la carte et l'API GitHub ne sont pas sollicités à l'ouverture de la page. Ils sont chargés quand leurs sections approchent de l'écran.

Le portrait utilise une transformation Cloudinary de 260 × 260 pixels, contre une image de 1017 pixels de large observée dans la version initiale. Son transfert mesuré dans Chrome passe de 47 728 à 4 980 octets, soit environ 90 % de moins dans ces conditions locales.

Le HTML a été séparé des styles et scripts pour rendre leur cache et leur maintenance indépendants. Cette séparation ne suffit pas, à elle seule, à prouver un gain de vitesse. Les temps de chargement en production restent à mesurer sur l'hébergement définitif.

Le domaine et l'hébergement définitifs n'ont pas été configurés. Le compte Formspree, les permissions du CV Google Drive et la disponibilité Calendly nécessitent une vérification par leur propriétaire avant publication.

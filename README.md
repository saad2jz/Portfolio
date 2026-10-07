# Portfolio — Saad Bayahia

Portfolio statique bilingue FR/EN, avec thèmes sombre et clair. Aucun framework, aucune compilation ni dépendance à installer pour le site.

## Aperçu local

Ouvrir `index.html` dans un navigateur, ou servir ce dossier :

```sh
python -m http.server 8000
```

Puis ouvrir `http://localhost:8000`. Un serveur local permet de vérifier les appels réseau dans les mêmes conditions qu'un site hébergé.

## Fichiers

- `index.html` : page d'accueil.
- `portfolio.html` : même page, pour préserver les liens existants.
- `styles.css` : styles, responsive, thèmes et contrastes.
- `script.js` : traductions, navigation, formulaire, animations et chargements différés.
- `favicon.svg` : icône du site.
- `avatar.jpg` : illustration déjà présente dans le dépôt ; le portrait affiché utilise Cloudinary.

Après une modification du HTML, synchroniser les deux pages :

```sh
cp index.html portfolio.html
```

PowerShell : `Copy-Item index.html portfolio.html`.

## Optimisations

- Lecture immédiate : les contenus ne dépendent plus d'une animation JavaScript pour apparaître. Les textes et les liens GitHub restent présents sans JavaScript.
- Portrait Cloudinary redimensionné à 260 × 260 pixels pour un affichage maximal de 130 × 130, avec priorité de chargement haute.
- Carte : D3, TopoJSON et les données géographiques ne chargent qu'à proximité de la section. La carte dispose aussi d'une liste textuelle des pays visités et d'un espace réservé pour limiter les déplacements de contenu.
- GitHub : chargement à proximité de la section, cache de session de 30 minutes, une requête partagée pendant les changements de langue, délai maximal de 8 secondes et cartes de secours sans étoiles inventées. Les données de l'API sont échappées avant affichage.
- Animations : particules et effet machine à écrire suspendus hors écran et lorsque l'onglet est masqué. La préférence de réduction des animations est respectée. La progression de lecture utilise une transformation CSS et une mise à jour par frame.
- Navigation : vrais boutons de langue, logo cliquable au clavier, focus visible, zones tactiles de 44 pixels, menu fermé exclu de la navigation clavier, fermeture par Échap, ancres natives avec historique et focus.
- Présentation : largeur de lecture maîtrisée, textes plus lisibles, action principale mise en évidence, cartes mobiles corrigées et contrastes adaptés au thème clair.
- Contenu : restauration des paragraphes anglais écrasés par du français et nettoyage des doublons du HTML initial.
- Structure : titres H2, repère `main`, métadonnées de partage cohérentes, description traduite et favicon.
- Contact : statut annoncé aux lecteurs d'écran, protection contre les doubles envois, délai maximal de 15 secondes et reprise après une réponse serveur non JSON. L'envoi HTML natif reste disponible sans JavaScript.

## Publication

Publier les deux fichiers HTML, `styles.css`, `script.js` et `favicon.svg` ensemble. Le site fonctionne sur un hébergement statique, y compris un sous-dossier GitHub Pages : les ressources locales utilisent des chemins relatifs.

Le domaine `saad-bayahia.dev`, présent dans le code initial, ne résolvait pas dans le DNS lors de la vérification du 7 octobre 2026. Ses références ont été retirées. Une fois l'adresse publique confirmée, ajouter cette adresse à `og:url`, au champ `url` du JSON-LD et à une balise canonique dans les deux pages. Ne pas déclarer une URL canonique vers un domaine inexistant.

Le formulaire conserve l'adresse Formspree existante. Les tests utilisent des réponses interceptées : aucun message réel n'a été envoyé et l'accès au compte Formspree n'a pas été validé.

## Vérifications

Voir [VALIDATION.md](VALIDATION.md). Les mesures portent sur la version locale ; aucun score Lighthouse ou gain de temps en production n'est revendiqué.

---
_schema: default
date: 2024-05-02T21:43:46Z
title: Toutes les fonctionnalités
draft: false
featured: true
permalink:
tags:
  - bells
  - whistles
author: Test Richardson
thumb_image_path: /assets/images/blog/blog-thumb-5.jpg
thumb_image_alt: >-
  Trois personnes travaillent ensemble sur un ordinateur portable. Un homme
  code pendant que les deux autres font des suggestions.
image: /assets/images/blog/featured-image-2.jpg
image_alt: >-
  Des enfants souriants entourent un ordinateur portable, tandis qu'une enfant
  travaille dessus, de dos.
seo:
  page_description: >-
    Une page de démonstration présentant certaines des fonctionnalités
    d'édition markdown offertes par le CMS CloudCannon.
  canonical_url:
  featured_image: /assets/images/blog/featured-image-2.jpg
  featured_image_alt: >-
    Des enfants souriants entourent un ordinateur portable, tandis qu'une
    enfant travaille dessus, de dos.
  author_twitter_handle:
  open_graph_type: article
  no_index: false
---
Un nouvel article pour tester et présenter ce que vous pouvez faire depuis l'éditeur de contenu de CloudCannon.

{% alert "#FF785A", "Test test test", "#FEF9EF", "fa-solid fa-bell" %}

## Un titre de niveau 2

Du texte en **gras** Du texte en *italique* sur une nouvelle ligne

Du texte <u>souligné</u> dans un nouveau paragraphe.Une autre ligne avec du <s>barré.</s>

### Un titre de niveau 3

Du texte en <sub>indice</sub>

Un exposant<sup>TM</sup>

`const code = 'cool';`

Aligné à gauche

<p class="align-center">Centré</p>

<p class="align-right">Aligné à droite</p>

1. Une liste numérotée
   1. Un petit sous-élément
2. Un autre numéro
   1. Joli
   2. Waouh
3. Terminé

* Une liste à puces
* Un autre élément
  * Un sous-élément quand même
  * Un autre sous-élément


<img src="/assets/images/blog/blog-thumb-1.jpg" height="413" width="500" />

---

> Une citation - Test Richardson

```
object:
  colors:
    options:
      red: '#FF0000'
      white: '#FFFFFF'
```

<table><caption><p>Quelle table</p></caption><thead><tr><th><p>Col. 1</p></th><th><p>Col. 2</p></th></tr></thead><tbody><tr><td><p>true</p></td><td><p>false</p></td></tr><tr><td><p>true</p></td><td><p>true</p></td></tr><tr><td><p>null</p></td><td><p>true</p></td></tr><tr><td><p>false</p></td><td><p>false</p></td></tr></tbody></table>

{% alert "#034AD8", "Ceci est un message d'alerte", "#000000", "fa-solid fa-bell" %}

{% file "/assets/documents/test.pdf", "test-file", "Un fichier de test pour montrer comment proposer un lien téléchargeable dans votre markdown" %}

Du texte de couleur normale - {% tint, "#F7B2AD" %}Waouh, une teinte !{% endtint %} Encore un peu de texte pour montrer que la teinte est en ligne.

{% video "/assets/videos/test.mp4" %}

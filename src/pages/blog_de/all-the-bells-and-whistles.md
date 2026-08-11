---
_schema: default
date: 2024-05-02T21:43:46Z
title: Alle Extras
draft: false
featured: true
permalink:
tags:
  - bells
  - whistles
author: Test Richardson
thumb_image_path: /assets/images/blog/blog-thumb-5.jpg
thumb_image_alt: >-
  Drei Personen arbeiten gemeinsam an einem Laptop. Ein Mann programmiert,
  während die beiden anderen Vorschläge machen.
image: /assets/images/blog/featured-image-2.jpg
image_alt: >-
  Kinder stehen lächelnd um einen Laptop herum, während ein Mädchen mit dem
  Rücken zu uns daran arbeitet.
seo:
  page_description: >-
    Eine Demoseite, die einige der Markdown-Bearbeitungsfunktionen des
    CloudCannon-CMS zeigt.
  canonical_url:
  featured_image: /assets/images/blog/featured-image-2.jpg
  featured_image_alt: >-
    Kinder stehen lächelnd um einen Laptop herum, während ein Mädchen mit dem
    Rücken zu uns daran arbeitet.
  author_twitter_handle:
  open_graph_type: article
  no_index: false
---
Ein neuer Beitrag, um zu testen und zu zeigen, was Sie im Content-Editor von CloudCannon alles tun können.

{% alert "#FF785A", "Test test test", "#FEF9EF", "fa-solid fa-bell" %}

## Eine Überschrift 2

Etwas **fetter** Text Etwas *kursiver* Text in einer neuen Zeile

Etwas <u>unterstrichener</u> Text in einem neuen Absatz.Eine weitere Zeile mit <s>Durchstreichung.</s>

### Eine Überschrift 3

Etwas <sub>tiefgestellt</sub>

Ein hochgestelltes<sup>TM</sup>

`const code = 'cool';`

Linksbündig

<p class="align-center">Zentriert</p>

<p class="align-right">Rechtsbündig</p>

1. Eine nummerierte Liste
   1. Ein kleiner Unterpunkt
2. Eine weitere Nummer
   1. Hübsch
   2. Wow
3. Fertig

* Eine unsortierte Liste
* Ein weiterer Eintrag
  * Aber ein Unterpunkt
  * Ein weiterer Unterpunkt


<img src="/assets/images/blog/blog-thumb-1.jpg" height="413" width="500" />

---

> Ein Zitat - Test Richardson

```
object:
  colors:
    options:
      red: '#FF0000'
      white: '#FFFFFF'
```

<table><caption><p>Was für eine Tabelle</p></caption><thead><tr><th><p>Sp. 1</p></th><th><p>Sp. 2</p></th></tr></thead><tbody><tr><td><p>true</p></td><td><p>false</p></td></tr><tr><td><p>true</p></td><td><p>true</p></td></tr><tr><td><p>null</p></td><td><p>true</p></td></tr><tr><td><p>false</p></td><td><p>false</p></td></tr></tbody></table>

{% alert "#034AD8", "Dies ist eine Hinweismeldung", "#000000", "fa-solid fa-bell" %}

{% file "/assets/documents/test.pdf", "test-file", "Eine Testdatei, die zeigt, wie Sie einen Download-Link in Ihrem Markdown einbinden" %}

Etwas Text in normaler Farbe - {% tint, "#F7B2AD" %}Wow, eine Tönung!{% endtint %} Noch etwas Text, um zu zeigen, dass die Tönung inline ist.

{% video "/assets/videos/test.mp4" %}

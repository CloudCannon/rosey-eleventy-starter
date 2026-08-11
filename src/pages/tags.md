---
layout: layouts/tags.html
eleventyExcludeFromCollections: false
rosey_seo: true
pagination:
  data: collections.tagPages
  size: 1
  alias: tagPage
permalink: '{{ tagPage.url }}'
eleventyComputed:
  title: '{{ tagPage.tag | tagLabel }}'
  locale: '{{ tagPage.locale }}'
  # Per-tag title, but one shared description — otherwise every tag page
  # repeats the same sentence as its own translatable key.
  rosey_title_key: 'tag_page_titles:{{ tagPage.tag }}'
  rosey_description_key: 'tag_page_description'
seo:
  page_description: 'Posts tagged on the Eleventy Multilingual Starter blog.'
---

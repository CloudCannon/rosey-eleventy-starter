---
title: Blog
layout: layouts/blog.html
eleventyExcludeFromCollections: false
rosey_seo: true
pagination:
  data: collections.blogListingPages
  size: 1
  alias: listing
permalink: '{{ listing.url }}'
eleventyComputed:
  locale: '{{ listing.locale }}'
seo:
  page_description: 'A blog template with tags.'
  canonical_url:
  featured_image:
  featured_image_alt:
  author_twitter_handle:
  open_graph_type: website
  no_index: false
---

---
_schema: default
title: Home
rosey_seo: true
seo:
  page_description: >-
    A starting point for developers building a multilingual website with
    Eleventy, Rosey and CloudCannon. Create your own copy, and start
    translating.
  canonical_url:
  featured_image:
  featured_image_alt:
  author_twitter_handle:
  open_graph_type:
  no_index: false
layout: layouts/component-page.html
# Built once per locale so the Featured Posts block lists that locale's posts.
# The page's own text is still translated by Rosey, via one shared set of keys.
pagination:
  data: collections.localeHomes
  size: 1
  alias: home
permalink: '{{ home.url }}'
eleventyComputed:
  locale: '{{ home.locale }}'
  posts_collection: '{{ home.posts_collection }}'
eleventyExcludeFromCollections: false
content_blocks:
  - _type: components/hero
    _uuid: 8b6c6715-bec1-4872-a9cd-0f56b06d301e
    background_color: '#ffffff'
    heading:
      heading_text: Eleventy Multilingual Starter
      heading_gradient_color: '#a0a2ff'
    subheading:
      markdown_content: >-
        A starting point for **developers building a multilingual website with
        Eleventy, Rosey and CloudCannon**. Translate this page from the Visual
        Editor, or edit the locale files directly — both round-trip to the same
        place.
      color: '#393939'
    image:
      image_path: /assets/images/undraw-online-test.svg
      alt_text: >-
        An illustration of someone leaning against the inside of a desktop
        computer monitor, with one leg dangled off the side. They're holding a
        piece of paper with a large 'A', and are next to some buttons on the
        screen.
    buttons:
      - _type: components/buttons/primary
        _uuid: 0ab0c3c9-3440-4c7f-a3a7-80506f747ac0
        button_text: GitHub
        button_icon: fa-brands fa-github
        button_link: https://github.com/CloudCannon/eleventy-starter/
        background_color: '#034ad8'
        hover_brightness: 0.85
        text_color: '#ffffff'
      - _type: components/buttons/secondary
        _uuid: cd883c9e-ef47-4d5f-8e76-725ef0c7b8e3
        button_text: CloudCannon
        button_icon: CloudCannon
        button_link: https://www.cloudcannon.com
        text_color: '#034ad8'
        hover_brightness: 0.95
  - _type: components/left-right
    _uuid: 01acab69-cdbe-492c-a70f-e4dc5fb36658
    background_color: '#ffffff'
    heading:
      heading_text: Keep what you need. Delete the rest.
      color: '#393939'
    text:
      markdown_content: >-
        To help save you time, some features are set up in this template, like:

        - Translations powered by [Rosey](https://rosey.cc/) and the Rosey
        CloudCannon Connector

        - A split-by-directory blog, with a whole content file per language

        - [Editable
        regions](https://cloudcannon.com/documentation/articles/introduction-to-editable-regions/)

        - Blog with pagination, tags and
        [snippets](https://cloudcannon.com/documentation/articles/snippets-using-eleventy-shortcodes/)

        - [Image optimization](https://www.11ty.dev/docs/plugins/image/)

        - SEO Controls

        - Responsive header and footer

        - [Font Awesome
        Icons](https://fontawesome.com/search?o=r&m=free&s=solid)

        - Schemas for adding new pages

        - Editable color pallete

        - Markdown styles

        - CloudCannon configuration
      color: '#393939'
    image:
      image_path: /assets/images/undraw-hello.svg
      alt_text: >-
        An illustration of someone sitting a desk with a monitor and a pile of
        books on it. Seen from behind, the figure is turned around to face us
        and is waving.
    flipped: true
    button:
      _type: components/buttons/primary
      _uuid: 6e12ae2e-97e7-49b2-80f4-38fe5282e494
      button_text: GitHub
      button_icon: fa-brands fa-github
      button_link: https://github.com/CloudCannon/eleventy-starter/
      background_color: '#034ad8'
      hover_brightness: 0.85
      text_color: '#ffffff'
  - _type: components/left-right
    _uuid: f8d20580-8173-4f97-bb2b-ad6729854cb6
    background_color: '#ffffff'
    flipped: false
    heading:
      heading_text: You choose your editing experience.
      text_color: '#333232'
    text:
      markdown_content: >-
        CloudCannon is a flexible Git-backed CMS that specialises in editing
        markdown and data files.


        Visual editing allows you to preview your changes live before you save
        them.


        Git-backed means you can keep all your familiar git workflows, while
        providing an easy-to-understand interface for non-technical editors to
        collaborate via Git.
      text_color: '#333232'
    image:
      image_path: /assets/images/undraw-startup.svg
      alt_text: >-
        An illustration of someone leaning on one leg while facing us, next to a
        laptop that comes up their waist. One of their hands is on the back of
        the laptop, and one is in their pocket. On the laptop screen is an
        illustration of the world.
    button:
      _type: components/buttons/primary
      button_text: GitHub
      button_icon: fa-brands fa-github
      button_link: https://github.com/CloudCannon/eleventy-starter/
      _uuid: b558262b-21f6-4d3c-8a33-0c3ff076cf48
      button_aria_label:
      background_color: '#034AD8'
      hover_brightness: 0.85
      text_color: '#ffffff'
  - _type: components/featured-posts
    _uuid: 0f1b6a7c-2d3e-4f50-9a1b-7c8d9e0f1a2b
    background_color: '#ffffff'
    heading:
      heading_text: Featured posts
      color: '#393939'
    description:
      markdown_content: >-
        A hand-picked selection of posts from the blog.
      color: '#393939'
    limit: 3
---

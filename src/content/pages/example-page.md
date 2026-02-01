---
title: "Example Content Page"
description: "This is an example page showing how to use the reusable content layout with markdown."
image: "https://placehold.co/800x600/6442d6/ffffff"
date: "2026-01-31"
---

## Introduction

This is an example content page that demonstrates the reusable layout. The layout includes a hero section with the title on the left and an image on the right, followed by a back button and this markdown content.

## Features

The reusable page layout supports:

- **Hero Section**: Title and description on the left, image on the right
- **Back Button**: Easy navigation back to the home page
- **Markdown Content**: Full markdown support with custom styling
- **Responsive Design**: Works great on all screen sizes

## Code Example

Here's some example code:

```typescript
interface ContentPage {
  title: string;
  description?: string;
  image?: string;
  date?: string;
}

const examplePage: ContentPage = {
  title: "Example Content Page",
  description: "This is an example page",
  image: "https://example.com/image.jpg",
  date: "2026-01-31"
};
```

## Lists

Unordered list:
- First item
- Second item
- Third item

Ordered list:
1. First step
2. Second step
3. Third step

## Blockquote

> This is a blockquote example. It can be used for highlighting important information or quotes.

## Table

| Feature | Status | Notes |
|---------|--------|-------|
| Hero Section | ✅ Complete | Two-tile layout |
| Back Button | ✅ Complete | Returns to home |
| Markdown | ✅ Complete | Full support |

## Links

You can add [links to other pages](/) or external resources.

## Conclusion

This template can be reused for both projects and notes, providing a consistent experience across your site.

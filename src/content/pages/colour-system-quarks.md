---
title: "Colour System: Quarks"
description: "Developing a robust colour system in typescript and css for the Quarks design system"
image: "https://placehold.co/800x600/6442d6/ffffff"
date: "2021-Present"
---

**Role:** Lead Designer, Frontend Developer - 2021 - Present
**Stack:** React, TypeScript, Jest, GraphQL, Vercel
**Tools:** Github, Jira, Agile, VS Code, Figma, Apollo, Mixpanel
**Context:** Enterprise SaaS (Security, Defense)

## Summary

Working on a lean engineering team, I contribute to the design and implementation of front-end features in a real-time crisis alerting SaaS platform. I own UI and design system decisions while writing and testing production-ready code in React and TypeScript. This role positions me at the intersection of engineering and product development.

## Case Study: Creating a Dynamic and Flexible Colour System

### The problem

As the product grew and the team expanded, our UI had accumulated over 40 hard-coded colours, duplicated patterns, and inconsistent states (we were losing count of the shades of grey). Different engineers used slightly different greys, interaction states weren't standardized, and accessibility issues were starting to surface. Changing a colour meant manually updating styles in multiple files, which introduced regressions.

We needed a single source of truth for colour that was:

*   predictable and semantic
*   accessible by default
*   strongly typed
*   easy for engineers to consume
*   flexible enough for future theming and product expansion

### Step 1: Defining the Base Palette

We started by defining a colour palette using CSS custom properties (variables). This is essential because custom properties allow you to set and reuse colours across your app. By using hsl() (Hue, Saturation, Lightness) colour notation, you can easily tweak the hues, saturations, and lightness values to generate a set of related colours.

```css
--palette-blue-h: 220;
--palette-blue-s: 62%;
--palette-blue-l: 10%;

--palette-blue-0: hsl(
    var(--palette-blue-h),
    var(--palette-blue-s),
    var(--palette-blue-l)
);
--palette-blue-100: hsl(
    var(--palette-blue-h),
    var(--palette-blue-s),
    calc(var(--palette-blue-l) + 3%)
);
--palette-blue-200: hsl(
    var(--palette-blue-h),
    var(--palette-blue-s),
    calc(var(--palette-blue-l) + 6%)
);
--palette-blue-300: hsl(
    var(--palette-blue-h),
    var(--palette-blue-s),
    calc(var(--palette-blue-l) + 12%)
);
--palette-blue-400: hsl(
    var(--palette-blue-h),
    var(--palette-blue-s),
    calc(var(--palette-blue-l) + 22%)
);
```

In this setup, we define a base blue colour with `hsl()` notation. We then expand the blue palette with multiple tints of that base colour by adjusting the lightness (`--palette-blue-l`) using the `calc()` function. This allows for an easy way to tweak the palette values later on, by adjusting just the root variables.

### Step 2: Structuring the Theme with TypeScript

Once we have defined the colour palette, we begin to structure the theme using TypeScript. By using TypeScript, we can create strict types for our theme, ensuring consistency across all components and making the system more maintainable in the long run.

We start by defining types for **elements, states, and variants**.

```typescript
type ColorString = `var(--${string})`;

export const elements = ["surface", "text", "border"];
const states = ["base", "hover", "active", "disabled"];
const variants = ["primary", "secondary", "tertiary"];

export type Elements = (typeof elements)[number];
type States = (typeof states)[number];
type Variants = (typeof variants)[number];

type StateMap = Record<States, ColorString>;
type ElementMap = Record<Elements, StateMap>;
type VariantMap = Record<Variants, ElementMap>;

export interface Theme {
    surface: ColorString;
    border: ColorString;
    primary: {
        text: ColorString;
        surface: ColorString;
    };
    secondary: {
        text: ColorString;
        surface: ColorString;
    };
    tertiary: {
        text: ColorString;
    };
}
```

In this structure:

*   Elements represent the main structural elements (e.g., `surface`, `text`, `border`).
*   States represent different interaction states (e.g., `base`, `hover`, `active`, `disabled`).
*   Variants define the different levels of importance for certain UI elements (e.g., `primary`, `secondary`, `tertiary`).
*   StateMap: Each token can have multiple states (base, hover, active, etc.), and each state corresponds to a CSS colour.
*   Theme: The full theme object includes all of these elements, ensuring that your theme is modular and easy to customize.

### Step 3: Assigning Properties from the Palette to the Theme

Our next step was to assign these palette values to the appropriate properties within the theme. This ties the colours from our palette to the specific UI components, states, and variants that we'll use in our application.

In this step, we map the palette's custom properties (such as `--palette-grey-0`, `--palette-green-70`, etc.) to our theme structure, which includes elements like `surface`, `text`, `border`, and various states such as `hover`, and `active`.

```typescript
export const base: Theme = {
  // Primary color variant
  primary: {
    text: "var(--palette-gray-900)",  // Primary text color
    surface: "var(--palette-gray-100)", // Primary surface color
    border: "var(--palette-gray-400)", // Primary border color
  },
```

Each colour variant (primary, secondary, tertiary) is assigned the appropriate palette colour variables. For instance:

The `primary.text` is assigned `--palette-grey-900`, which will be the text colour for primary elements.

The `primary.surface` is assigned `--palette-grey-100`, which will be the background color for primary elements.

You can imagine this carrying on for success and destructive elements that require surface, text, and borders.

By assigning palette colours to the theme, we ensure consistent colour usage across the entire application, regardless of how the components are styled.

### Step 4: Compiling the Theme into CSS Variables

Now we've defined our theme in TypeScript, we've mapped the colour palette to the theme's properties and ensured everything is correctly typed, but we still need to apply these colours as CSS.

So, we need to **compile the TypeScript theme into CSS variables**, which can be used in our component's CSS modules. This might seem like a roundabout journey from CSS to TypeScript and then back to CSS but each step is important for different reasons.

```typescript
export function compileTheme(
    theme: ThemePartial,
    prefix: string = "--color"
): Record<string, string> {
    const cssVariables: Record<string, string> = {};

    // Recursively process the theme object
    const processLevel = (obj: any, path: string[] = []): void => {
        Object.entries(obj).forEach(([key, value]) => {
            // Generate variable name
            const variableName = `${prefix}-${[...path, key].join("-")}`;
            if (typeof value === "string") {
                cssVariables[variableName] = value; // Assign value to variable
            } else if (typeof value === "object") {
                processLevel(value, [...path, key]); // Recurse into objects
            }
        });
    };

    processLevel(theme); // Start processing the theme
    return cssVariables;
}
```

**1. Traversing the Theme Object**
The theme object is structured with elements (e.g., `surface`, `text`, `border`), variants (e.g., `primary`, `secondary`, `tertiary`), and states (e.g., `base`, `hover`, `active`, `disabled`). The process starts by recursively traversing through this object to ensure all colour values are captured.

**2. Generating Variable Names**
For each colour value, we generate a CSS variable name using the pattern `--color-[element]-[variant]-[state]`. Here's how it breaks down:

*   Element: Refers to the core components of the UI, such as `surface`, `text`, and `border`.
*   Variant: Refers to the specific type or version of the element, such as `primary`, `secondary`, or `tertiary`.
*   State: Refers to the interaction state of the element, such as `base`, `hover`, `active`, or `disabled`.

For example:

*   A colour defined as `surface.primary.active` will generate a variable name like `--color-surface-primary-active`.
*   A colour defined as `text.secondary.hover` will generate a variable name like `--color-text-secondary-hover`.

**3. Storing the Variables**
As we traverse the theme object, the generated variable names are stored in a simple key-value structure:

*   Key: The CSS variable name, like `--color-surface-primary-active`.
*   Value: The corresponding colour value.

**4. Benefits of This Approach**
This approach provides several key benefits:

*   Centralized colour management: All colour definitions are maintained in one place, making it easy to update a colour globally.
*   Scalability: As the theme grows, adding new elements, states, or variants requires only simple modifications, making the system flexible and maintainable.
*   Consistency: Using a consistent variable naming convention ensures that styles remain predictable and well-organized.

### Step 5: Using the Compiled CSS Variables

Once the theme is compiled into CSS variables, these variables can be used in our component styles. This can be done using CSS modules, SCSS, or plain CSS.

```css
.Button {
  background-color: var(--color-surface-primary);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border-primary);
}

.Button:hover {
  background-color: var(--color-surface-primary-hover);
  color: var(--color-text-primary-hover);
  border: 1px solid var(--color-border-primary-hover);
}
```

Here, the compiled CSS variables are used to define the colours for different button states. The benefit of this approach is that it decouples the colour scheme from the component, making it easy to update the theme without modifying individual component files.

### Step 6: Updating the Theme

With this setup, we can easily tweak the theme in one central location (the palette), and the changes will propagate across our entire application. For example, changing the base grey colour in the palette will automatically update all related states like `hover`, `active`, etc.

To update the theme, we only need to modify the CSS variables in the :root block or adjust the theme object and recompile it. This enables easy maintenance of the colour scheme and improves flexibility when updating UI designs.

---

## Conclusion

By combining CSS custom properties with a TypeScript-driven theme schema and a small compiler, we created a colour system that balances developer experience, accessibility, and long-term maintainability. The system:

*   reduced cognitive overhead for engineers through typed tokens and IDE support,
*   enforced semantic usage so colours convey meaning consistently across the app,
*   enabled safe, global updates to the visual language,
*   simplified future initiatives like theming and accessibility improvements.

This work demonstrates how engineering-first design system decisions can remove friction, reduce regressions, and scale visual consistency across a complex SaaS product.

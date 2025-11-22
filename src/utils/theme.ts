export const themes = [
    // "light",
    // "dark",
    // "cupcake",
    // "bumblebee",
    // "emerald",
    "corporate",
    "synthwave",
    // "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    // "garden",
    // "forest",
    "aqua",
    // "lofi",
    // "pastel",
    // "fantasy",
    // "wireframe",
    // "black",
    "luxury",
    // "dracula",
    // "cmyk",
    "autumn",
    // "business",
    // "acid",
    "lemonade",
    "night",
    "coffee",
    // "winter",
    "dim",
    "nord",
    "sunset",
    "caramellatte",
    "abyss",
    "silk",
];

export function getRandomTheme(currentTheme: string): string {
    let newTheme = currentTheme;

    if (!currentTheme || !themes.includes(currentTheme)) {
         return themes[Math.floor(Math.random() * themes.length)];
    }

    while (newTheme === currentTheme) {
        newTheme = themes[Math.floor(Math.random() * themes.length)];
    }
    return newTheme;
}

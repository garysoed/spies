YUI.add("yuidoc-meta", function(Y) {
   Y.YUIDoc = { meta: {
    "classes": [
        "1. Setup",
        "2. Spies",
        "3. Matchers",
        "4. Fakes",
        "5. Plugins",
        "Fakes",
        "Matchers",
        "SpiedFn",
        "Spies",
        "Utils",
        "matcher.Any",
        "matcher.IsA",
        "matcher.Matcher"
    ],
    "modules": [
        "api",
        "tutorial"
    ],
    "allModules": [
        {
            "displayName": "api",
            "name": "api"
        },
        {
            "displayName": "tutorial",
            "name": "tutorial",
            "description": "There are several ways to use this library:\n- HTML Import `main.html`:\n```html\n<link rel=\"import\" href=\"path/to/main.html\">\n```\n- Or you can import the JS file directly:\n```html\n<script src=\"path/to/main.js\"></script>\n```\n- If you use the expect pattern of <a href=\"http://chaijs.com/\">Chai JS</a>, import\n  `main_chai_expect.html`, or import the plugin under `src/plugin/chai-expect.js`. If you load\n  the JS file, make sure to import the plugin after importing `chai.js`."
        }
    ]
} };
});
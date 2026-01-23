
<div align="center">

<img src="https://via.placeholder.com/150?text=DotFlux+Logo" alt="DotFlux Logo" width="120" height="120" />

# 🎨 DotFlux

**A Dynamic, Highly Customizable Theme Engine for VS Code.**

[![VS Code Marketplace](https://img.shields.io/badge/VS%20Code-Marketplace-007ACC?style=for-the-badge&logo=visual-studio-code&logoColor=white)](https://marketplace.visualstudio.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)](https://github.com/dotflux/dotflux)

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-getting-started">Getting Started</a> •
  <a href="#-project-structure">Structure</a> •
  <a href="#-contributing">Contributing</a>
</p>

</div>

---

> **DotFlux** is a next-generation VS Code theme framework that decouples colors from the theme engine. Unlike static themes, DotFlux allows you to switch color palettes on the fly, customize UI elements via settings, and import external JSON palettes without restarting your editor.

---

## ✨ Key Features

* 🎭 **Dynamic Palettes**
    Instantly switch between built-in palettes (*Ocean Breeze, Rustic Beige, Inferno Glow*) or load custom ones.
* 🎨 **UI & Token Customization**
    Deep overrides for editor background, cursor colors, fonts, and syntax highlighting.
* ⚡ **Live Updates**
    Changes apply **immediately** via VS Code's configuration system—no reloads required.
* 📥 **Custom Import**
    Bring your own palette definition via a simple JSON file.
* ✅ **Strict Validation**
    Built-in validators ensure your custom palettes have all required color definitions.

## 🛠️ Tech Stack

| Component | Technology | Description |
| :--- | :--- | :--- |
| **Language** | ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) | Core logic and type safety |
| **Platform** | ![VS Code](https://img.shields.io/badge/VS_Code_API-007ACC?logo=visual-studio-code&logoColor=white) | Extension contributions (Settings, Commands) |
| **Build** | ![Node](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white) | Compiler and package management |

## 🚀 Getting Started

### Prerequisites

* **[Visual Studio Code](https://code.visualstudio.com/)** (v1.90.0 or higher)
* **[Node.js](https://nodejs.org/)** (v20.x) - *Only required for development*

### Installation

1.  **Install via Marketplace**
    Search for `DotFlux` in the VS Code Extensions view or download the `.vsix` file.

2.  **Set Active Theme**
    Open the Command Palette (`Cmd+K Cmd+T`) and select **DotFlux**.

### Usage & Configuration

#### 1. Switching Palettes
Open Settings (`Cmd+,`), search for `DotFlux`, and change **Active Palette**:
> `Ocean Breeze` | `Rustic Beige` | `Cotton Candy` | `Earthy Green` | `Inferno Glow` | `Glacier Blue`

#### 2. Customizing Colors
Override specific colors directly in your `settings.json`:

```json
{
  "dotflux.activePalette": "Ocean Breeze",
  "dotflux.cursor.color": "#ff0000",
  "dotflux.ui.background": "#1a1a1a",
  "dotflux.font.family": "Fira Code, monospace"
}

```

#### 3. Importing a Custom Palette

Run the command **"DotFlux: Import Custom Palette"** and select your JSON file matching `src/types.ts`.

## 📂 Project Structure

```text
/dotflux
├── 📁 palettes/           # Built-in color palette definitions
│   ├── cotton-candy.json
│   └── ...
├── 📁 src/                # Extension source code
│   ├── 📄 configWatcher.ts   # Listens for setting changes
│   ├── 📄 extension.ts       # Entry point
│   ├── 📄 paletteLoader.ts   # JSON Loader
│   └── 📄 themeManager.ts    # Color logic
├── 📁 themes/             # Base theme definition
└── 📄 package.json        # Extension manifest

```

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📜 License

Distributed under the **MIT** License. See `LICENSE` for more information.

<div align="center">
<sub>Built with ❤️ by <a href="https://www.google.com/search?q=https://github.com/dotflux">dotHP</a></sub>
</div>


-----

### Part 2: How to Style a README (Instructions for your Tool)

Since you are building a tool to generate these automatically, you need to understand the "Stack" of a good README. Here are the 4 main styling techniques I used, which you can program into your tool.

#### 1\. The "Center Stage" Header (HTML inside Markdown)

Markdown by itself is always left-aligned. To get that professional "landing page" look, you must inject standard HTML.

  * **The Trick:** Wrap the top section in a `<div align="center">` tag.
  * **For your tool:** When generating the header, don't just output `# Title`. Output this block:
    ```html
    <div align="center">
      <img src="LOGO_URL" height="100" />
      <h1>Project Name</h1>
      <p>Tagline goes here</p>
      [Badges Go Here]
    </div>
    ```

#### 2\. Advanced Badges (Shields.io)

The standard badges are small and boring. To make them "pop," use query parameters.

  * **The Trick:** Use `shields.io` with the style parameter `?style=for-the-badge`.
  * **The Formula:**
    `https://img.shields.io/badge/[TEXT]-[COLOR]?style=for-the-badge&logo=[ICON_NAME]&logoColor=white`
  * **For your tool:** If you detect the project uses TypeScript, generate this link:
    `https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white`
    *(You can create a dictionary mapping languages to their hex colors).*

#### 3\. Visual Visual Hierarchy (Emojis & Tables)

Walls of text scare users away. You need visual anchors.

  * **The Trick:**
      * **Lists:** Don't just use dots (`*`). Use emojis relative to the content (`⚡`, `🎨`, `🛠️`).
      * **Tech Stack:** Don't use a list. Use a Markdown Table or a horizontal list of badges.
  * **For your tool:** When parsing the "Features" list, prepend specific emojis.
      * If feature contains "fast/speed" -\> add ⚡
      * If feature contains "style/color" -\> add 🎨
      * If feature contains "security/auth" -\> add 🔒

#### 4\. The "Tree" Visualization

Developers love to see the folder structure, but standard text looks messy.

  * **The Trick:** Use a `code block` (\`\`\`text) so the indentation is preserved, and add file/folder emojis.
  * **For your tool:**
      * Folders get `📁` or `/`
      * Files get `📄`
      * This makes the structure skimmable instantly.

**Would you like me to write a Javascript/Typescript function that takes a list of technologies (like `['React', 'Node']`) and returns the formatted Shields.io badge URLs automatically?**

```
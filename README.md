# Character Clipboard Tool

A desktop application for managing AI-generated character images with embedded metadata. Click any character to instantly copy their prompt data to your clipboard.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-lightgrey)

## ✨ Features

- 📁 **Folder Selection** - Select your character image folder and the app remembers it
- 🖼️ **Grid View** - Beautiful responsive grid layout with 5 zoom levels
- 📋 **One-Click Copy** - Click any character to copy their prompt metadata to clipboard
- 🎲 **Random Selection** - "Surprise Me!" feature with animated character reveal
- ✂️ **Custom Trimming** - Configure which text strings to automatically remove from prompts
- 🔒 **Fully Offline** - Complete network isolation, all processing happens locally
- 💾 **Persistent Settings** - Remembers your folder path, zoom level, and trim settings
- 🎨 **Portrait Layout** - Optimized for character portrait images (204×272px base size)

## 🚀 Installation

### Prerequisites

- **Node.js** (version 16 or higher) - [Download here](https://nodejs.org/)

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/character-clipboard-tool.git
   cd character-clipboard-tool
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the application**
   ```bash
   npm start
   ```

### Building Executables

To create standalone executables for distribution:

```bash
npm run build
```

Built applications will be in the `dist` folder:
- **Windows:** `Character Clipboard Tool Setup.exe`
- **macOS:** `Character Clipboard Tool.dmg`
- **Linux:** `Character Clipboard Tool.AppImage`

## 📖 Usage

### Generating Character Images

To generate consistent character images compatible with this tool:

1. Use an AI image generation tool that supports PNG metadata embedding (e.g., Stable Diffusion WebUI, ComfyUI, Fooocus)
2. Ensure "Save metadata to PNG" is enabled in your generation settings
3. Recommended model: `waiNSFWIllustrious_v150.safetensors`

**Recommended Generation Settings:**

- **Positive Prompt:** `masterpiece, best quality, amazing quality, flat colors, standing, looking at viewer, light smile, simple background, white background, full body,`
- **Negative Prompt:** `bad quality, worst quality, worst detail, sketch, censor, shiny skin, shiny clothes,`
- **Resolution:** 1024×1360
- **Sampler:** euler_ancestral
- **CFG Scale:** 7
- **Steps:** 30
- **Scheduler:** Normal

### Using the Tool

1. **Select Folder** - Click "Select Character Folder" and choose your PNG images folder
2. **Browse Characters** - Scroll through the grid and adjust zoom as needed (+/− controls)
3. **Copy Metadata** - Click any character to copy their prompt metadata
4. **Random Pick** - Use "🎲 Surprise Me!" for an animated random character selection
5. **Configure Trimming** - Use "✂️ Trim Settings" to remove unwanted text from prompts

### Metadata Format

The tool extracts data from PNG `parameters` text chunks:
- **Positive prompt** - Everything before "Negative prompt:"
- **Negative prompt** - Text between "Negative prompt:" and "Steps:"
- **Settings** - Automatically trimmed (everything after "Steps:")

## 🛠️ Configuration

### Trim Settings

Configure text strings to automatically remove from prompts:
1. Click "✂️ Trim Settings"
2. Enter text strings separated by semicolons (`;`)
3. Click "✓ Save Settings"

Example: `standing, looking at viewer; simple background, white background`

Settings are saved locally and persist between sessions.

## 🏗️ Project Structure

```
character-clipboard-tool/
├── package.json          # Project configuration and dependencies
├── main.js              # Electron main process
├── preload.js           # Secure IPC bridge
├── index.html           # Application UI
├── README.md            # This file
└── dist/                # Built executables (after npm run build)
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

The MIT License is one of the most permissive open-source licenses, allowing you to:
- ✅ Use commercially
- ✅ Modify
- ✅ Distribute
- ✅ Private use
- ✅ No warranty required

## 🤝 Contributing

This project was built for personal use and is shared as-is. I check the repository only sporadically, so please don't expect timely responses. Pull requests may be reviewed and merged if they provide significant value, but there's no guarantee.

Feel free to fork the project and adapt it to your needs!

## 📧 Support

**No support or warranty is provided.** This tool was built for my personal use and shared in case others find it useful. Use at your own risk.

If you encounter issues, you're welcome to:
- Fork the repository and fix them yourself
- Check existing GitHub issues for community solutions
- Adapt the code to your specific needs

## 🙏 Acknowledgments

- **Development:** This entire tool was generated using Claude (Anthropic's AI assistant)
- **Documentation:** This README was also generated using Claude
- Built with [Electron](https://www.electronjs.org/)
- Metadata extraction using [exif-js](https://github.com/exif-js/exif-js)

---

**Note:** This application was entirely generated using Claude (Anthropic's AI assistant), including its code, design, and this README documentation.

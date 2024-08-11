# nss_libs - NssSvgReplacer

This component replaces all SVG images with inline SVG code. So you can use CSS to style the SVG images.

## ES6 module import

For `NssUiApi` usage, please see the [README.md](../README.md#load-components-via-api) of the `nss_libs/ui` folder.

Alternative example of direct ES6 module import:

```javascript
import {NssSvgReplacer} from "nui://nss_libs/ui/NssSvgReplacer/NssSvgReplacer.js";
```

## Setup replacer

```javascript
import {NssSvgReplacer} from "nui://nss_libs/ui/NssSvgReplacer/NssSvgReplacer.js";

new NssSvgReplacer();
```

That's it. All existing and upcoming added SVG images will be replaced with inline SVG code.

## How to use

### Replace image with inline SVG

```html
<img src="img/example.svg" alt="Example"/>
```

__Important:__

- `width` and `height` attributes will be removed on the SVG element.
- `preserveAspectRatio="none"` can be added to allow the SVG element to stretch to the viewport of the SVG element.
- Attributes like `class`, `style`, `id`, `data-*` will be copied to the SVG element.

### Add SVG to CSS `mask-image`

Loads the given URL (if it's SVG file) and adds it to the CSS `mask-image` (`-webkit-mask-image`) property of the
element.

```html
<div data-nss-libs-svg-replacer-image-mask="./img/dialog_bg_optimized.svg"></div>
```

__Important:__
- `preserveAspectRatio="none"` will be automatically added to allow stretching via CSS.
# nss_libs - NssResponsive

The component provides a solution for responsive design.

The component sets the `font-size` of the `html` element based on the screen width.
The `font-size` is set to `100%` for a screen width of `1920px`. With `100%` the size `1rem` represents `16px`.
The `font-size` is calculated linear. As higher the screen width as higher the `font-size` will be and vice versa.

The component provides CSS properties like `--1rpx` which automatically rescaling with the `font-size` of the `html`
element.

So if you style a div element with a width of `600px` in 1920px screen width then you can use `--1rpx` to set the width
dynamically, like this:

```css
div {
    width: calc(600 * var(--1rpx));
}
```

If the screen solution changes to 1280px then the `font-size` of the `html` element will be `75%` and the width of the
div will be smaller.

For fonts please use the `rem` unit. The `rem` unit is relative to the `font-size` of the `html` element. Additionally
you can use the `--1rpx` property to scale the font size dynamically if you want to use pixel values.

__Why not use percanetages?__

The problem with percentages is that they are relative to the parent element. So if you have a parent element with a
width of `100%` and a child element with a width of `50%` then the child element will have a width of `50%` of the
parent element. But if the parent element has a width of `50%` and the child element has a width of `50%` then the
child element will have a width of `25%` of the parent element.

For a second case it is difficult to calculate the width of an element in percentage if you have to adapt a design by
pixels.

The third case is that font sizes automatically rescaling with the screen width with that solution.

__Important:__

All NssLibs components are designed to work with the `NssResponsive` component. So if you use a component from the
`nss_libs/ui` folder then the components will automatically initialize the `NssResponsive` component.

--------------------------------------------------------------------------------------------------------

## How to use

### ES6 module import

For `NssUiApi` usage, please see the [README.md](../README.md#load-components-via-api) of the `nss_libs/ui` folder.

Alternative example of direct ES6 module import:

```javascript
import {NssResponsive} from "nui://nss_libs/ui/NssResponsive/NssResponsive.js";
```

--------------------------------------------------------------------------------------------------------

### Enable responsive design

```javascript
import {NssResponsive} from "nui://nss_libs/ui/NssResponsive/NssResponsive.js";

new NssResponsive();
```

That's it. Now the `font-size` of the `html` element will be set automatically by the screen width.

--------------------------------------------------------------------------------------------------------

### Fonts support

Work with the `rem` unit for fonts. The `rem` unit is relative to the `font-size` of the `html` element.

```css
.your_element {
    font-size: 1rem;
    font-family: rdr_crock, sans-serif;
}
```

Currently available fonts:

- `rdr_crock`
- `rdr`

--------------------------------------------------------------------------------------------------------

## Open todos

* [ ] Simplify fonts usage (all components use fonts from `NssResponsive` component).
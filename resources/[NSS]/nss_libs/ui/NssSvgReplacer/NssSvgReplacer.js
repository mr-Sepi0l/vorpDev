import {NssUiComponent} from "../NssUiComponent.js";

/**
 * @extends {NssUiComponent}
 */
class NssSvgReplacer extends NssUiComponent {

    constructor() {
        super();
        this.setupImageObserver();
    }

    setupImageObserver() {

        const config = {
            attributes: false,
            childList: true,
            characterData: false,
            subtree: true,
        };

        const svg_regex = /^.*\.svg$/gm;

        const resetSvgRegex = function () {
            svg_regex.lastIndex = 0;
        }

        const isSvg = function (img_url) {
            const is_svg = svg_regex.exec(img_url) !== null;
            resetSvgRegex();
            return is_svg;
        }

        const observer = new MutationObserver(function (mutations) {

            mutations.forEach(function (/**MutationRecord*/mutation) {

                mutation.addedNodes.forEach(function (/**Node|HTMLElement*/node) {

                    if (typeof node.getElementsByTagName !== 'function') {
                        return;
                    }

                    const image_nodes = node.getElementsByTagName('img') || [];

                    const image_list = Array.prototype.slice.call(image_nodes);

                    image_list.forEach(function (/**HTMLImageElement*/img) {

                        const image_url = img.src || '';

                        if (false === isSvg(image_url)) {
                            return;
                        }

                        this.loadSvg(image_url, img);

                    }.bind(this));

                    const attribute_name = 'data-nss-libs-svg-replacer-image-mask';

                    const image_mask_nodes = node.querySelectorAll(`[${attribute_name}]`) || [];

                    const image_mask_list = Array.prototype.slice.call(image_mask_nodes);

                    image_mask_list.forEach(function (/**HTMLElement*/el) {

                        const image_url = el.getAttribute(attribute_name) || '';

                        if (false === isSvg(image_url)) {
                            return;
                        }

                        el.removeAttribute(attribute_name);

                        this.loadSvgToImageMask(image_url, el);

                    }.bind(this));

                }.bind(this));

            }.bind(this));

        }.bind(this));

        observer.observe(document.body, config);
    }

    /**
     * @param {string} url
     * @param {HTMLElement} el
     */
    loadSvgToImageMask(url, el) {

        this._loadSvg(url, (svg_code) => {

            svg_code = svg_code.replace(/<svg/g, `<svg preserveAspectRatio="none" `);

            const mask_image = `url('data:image/svg+xml;utf8,${svg_code}')`;
            const mask_size = '100% 100%';

            el.style.webkitMaskImage = mask_image;
            el.style.maskImage = mask_image;

            el.style.webkitMaskSize = mask_size;
            el.style.maskSize = mask_size;
        });
    }

    /**
     * @param {string} url
     * @param {HTMLImageElement} img_el
     */
    loadSvg(url, img_el) {

        this._loadSvg(url, (svg_code) => {

            const css_classes = img_el.getAttribute('class');

            const svg_container = document.createElement('div');
            svg_container.innerHTML = svg_code;

            const svg_el = svg_container.querySelector('svg');
            svg_el.setAttribute('class', css_classes);

            /**
             * @type {HTMLOrSVGElement}
             */
            const svg_clone = svg_el.cloneNode(true);
            svg_clone.removeAttribute('width');
            svg_clone.removeAttribute('height');

            img_el.after(svg_clone);
            img_el.remove();
        });
    }

    /**
     * @param {string} url
     * @param {function(svg_code:string)} cb
     * @private
     */
    _loadSvg(url, cb) {

        const xhr = new XMLHttpRequest();

        xhr.open("GET", url, false);
        xhr.overrideMimeType("image/svg+xml");

        xhr.onload = function (e) {
            cb(e.target.responseText);
        };

        xhr.send("");
    }

    static getComponentName() {
        return "NssSvgReplacer";
    }

    static getStyleFilenames() {
        return [];
    }
}

export {NssSvgReplacer};

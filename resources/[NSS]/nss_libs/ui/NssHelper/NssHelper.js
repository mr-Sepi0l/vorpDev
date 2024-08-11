class NssHelper {

    /**
     * @type {number}
     * @private
     * @static
     */
    static _unique_id = 0;

    /**
     * @param {HTMLElement} target
     * @param {string} property_name
     * @param {number} [default_duration_in_ms=500]
     * @return {number}
     * @static
     */
    static getAnimDuration(target, property_name, default_duration_in_ms) {

        const style = getComputedStyle(target);
        const anim_dur_str = style.getPropertyValue(property_name) || ((default_duration_in_ms || 500) + 'ms')
        let anim_dur_number = parseInt(anim_dur_str, 10);
        let anim_dur_float = parseFloat(anim_dur_str);

        if (anim_dur_float > anim_dur_number) {
            anim_dur_number = anim_dur_float;
        }

        let anim_dur_in_ms = 1000;

        if (anim_dur_str.indexOf('ms') !== -1) {
            anim_dur_in_ms = anim_dur_number;
        } else if (anim_dur_str.indexOf('s') !== -1) {
            anim_dur_in_ms = anim_dur_number * 1000;
        }

        return anim_dur_in_ms;
    }

    /**
     * @return {boolean}
     * @static
     */
    static isCfxBrowser() {
        return navigator.userAgent.indexOf("CitizenFX") > -1;
    }

    /**
     * @return {string}
     * @static
     */
    static getUniqueId() {
        NssHelper._unique_id++;
        return 'nss_helper_' + NssHelper._unique_id;
    }

    /**
     * @param {function} callback
     * @param {number} interval_in_ms
     * @return {(function(): void)|*}
     * @static
     */
    static debounceClocked(callback, interval_in_ms) {

        let timeout_id;
        let last_args = null;

        return function (...args) {

            last_args = args;

            if (timeout_id) {
                return;
            }

            timeout_id = window.setTimeout(function () {

                if (Array.isArray(last_args) && last_args.length > 0) {
                    callback.apply(null, last_args);
                } else {
                    callback();
                }

                timeout_id = null;
                last_args = null;

            }, interval_in_ms);
        };
    }

    /**
     * @param {function} callback
     * @param {number} interval_in_ms
     * @return {(function(): void)|*}
     * @static
     */
    static debounce(callback, interval_in_ms) {

        let timeout_id;
        let last_args = null;

        return function (...args) {

            last_args = args;

            if (timeout_id) {
                window.clearTimeout(timeout_id)
            }

            timeout_id = window.setTimeout(function () {

                if (Array.isArray(last_args) && last_args.length > 0) {
                    callback.apply(null, last_args);
                } else {
                    callback();
                }

                timeout_id = null;
                last_args = null;

            }, interval_in_ms);
        };
    }

    /**
     * @param {HTMLElement} el
     * @param {number} percentage
     * @static
     */
    static setCircleClip(el, percentage) {

        const rect = el.getBoundingClientRect();

        const width = rect.width;
        const width_radius = width / 2;

        const height = rect.height;
        const height_radius = height / 2;

        const radius = Math.max(width_radius, height_radius);

        const offsetX = (x) => {
            return x + width_radius;
        }

        const offsetY = (y) => {
            return y + height_radius;
        }

        const pointOnCircle = (percent) => {
            const angle = (2 * Math.PI * percent) - (0.5 * Math.PI);
            const bigger_radius = radius * 2;
            return {
                x: Math.round(bigger_radius * Math.cos(angle) * 100) / 100,
                y: Math.round(bigger_radius * Math.sin(angle) * 100) / 100,
            };
        }

        const points = [];

        const middle_point = {
            x: offsetX(0),
            y: offsetY(0)
        }

        points.push(middle_point);

        const border_start_point = {
            x: offsetX(0),
            y: offsetY(-radius)
        }

        points.push(border_start_point);

        const on_degree = 360 / (2 * Math.PI);

        const angle = 2 * Math.PI * percentage * on_degree;

        if (angle > 45) {
            const corner_tr_point = {
                x: offsetX(radius),
                y: offsetY(-radius)
            }

            points.push(corner_tr_point);
        }

        if (angle > 135) {
            const corner_br_point = {
                x: offsetX(radius),
                y: offsetY(radius)
            }

            points.push(corner_br_point);
        }

        if (angle > 225) {
            const corner_bl_point = {
                x: offsetX(-radius),
                y: offsetY(radius)
            }

            points.push(corner_bl_point);
        }

        if (angle > 315) {
            const corner_tl_point = {
                x: offsetX(-radius),
                y: offsetY(-radius)
            }

            points.push(corner_tl_point);
        }

        const border_end_point = pointOnCircle(percentage);
        border_end_point.x = offsetX(border_end_point.x);
        border_end_point.y = offsetY(border_end_point.y);
        points.push(border_end_point);

        let pol_parts = [];

        points.forEach((point) => {
            let x = (point.x / width) * 100;
            let y = (point.y / height) * 100;

            const pol_part = `${x}% ${y}%`;
            pol_parts.push(pol_part);
        });

        let pol_parts_str = pol_parts.join(', ');

        el.style.clipPath = `polygon(${pol_parts_str})`;
    }

    /**
     * @param {Object} original_obj
     * @param {boolean} [remove_nulls=false]
     * @return {Object|null}
     * @static
     */
    static createObjectClone(original_obj, remove_nulls = false) {

        if (typeof original_obj !== 'object' || original_obj === null) {
            return null;
        }

        let cloned_obj = structuredClone(original_obj);

        for (let key in cloned_obj) {

            if (cloned_obj.hasOwnProperty(key)) {

                const value = cloned_obj[key];

                if (value === null) {
                    delete cloned_obj[key];
                }
            }
        }

        return cloned_obj;
    }

    /**
     * @param array
     * @return {*|null}
     */
    static getRandomArrayElement(array) {

        if (!Array.isArray(array) || array.length === 0) {
            return null;
        }

        return array[Math.floor(Math.random() * array.length)];
    }
}

export {NssHelper};
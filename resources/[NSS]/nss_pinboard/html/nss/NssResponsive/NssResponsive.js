const ResponsiveIt = function () {

    /**
     * @type {Function}
     */
    this.updateScreenWidthFactorDebounceClocked = null;

    this.initialize();
}

ResponsiveIt.prototype = {

    updateScreenWidthFactor: function () {
        const screen_width_factor = Math.round((window.outerWidth / 1920) * 100);
        document.documentElement.style.fontSize = screen_width_factor + "%";
    },

    debounceClocked: function (callback, interval_in_ms) {

        let timeout_id;

        return function () {

            if (timeout_id) {
                return;
            }

            timeout_id = window.setTimeout(function () {
                callback();
                timeout_id = null;
            }, interval_in_ms);
        };
    },

    initialize: function () {

        const interval_in_ms = 100;

        this.updateScreenWidthFactorDebounceClocked = this.debounceClocked(this.updateScreenWidthFactor, interval_in_ms);

        window.addEventListener('resize', this.updateScreenWidthFactorDebounceClocked);

        this.updateScreenWidthFactor();
    }
};

new ResponsiveIt();
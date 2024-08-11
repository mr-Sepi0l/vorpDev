class Language {

    /**
     * @type {Language}
     * @private
     */
    static _instance;

    /**
     * @param {PinBoardLanguage} language
     */
    static setupLanguage(language) {
        Language._instance = new Language(language);
    }

    /**
     * @param {string} key
     * @param {string|number} args
     * @return {string}
     */
    static l(key, ...args) {
        return Language._instance._translate(key, ...args);
    }

    /**
     * @param {string} key
     * @param {string|number} args
     * @return {string}
     */
    static lHtml(key, ...args) {
        const text = Language.l(key, ...args);
        return Language._htmlSpecialChars(text);
    }

    /**
     * @param {string} key
     * @param {string|number} args
     * @return {string}
     */
    static L(key, ...args) {
        return Language._instance._translateUcFirst(key, ...args);
    }

    /**
     * @param {string} key
     * @param {string|number} args
     * @return {string}
     */
    static LHtml(key, ...args) {
        const text = Language.L(key, ...args);
        return Language._htmlSpecialChars(text);
    }

    /**
     * @param {string} text
     * @return {string}
     * @private
     */
    static _htmlSpecialChars(text) {
        return text
            .toString()
            .replaceAll(/&/g, "&amp;")
            .replaceAll(/ü/g, "&uuml;")
            .replaceAll(/Ü/g, "&Uuml;")
            .replaceAll(/ö/g, "&ouml;")
            .replaceAll(/Ö/g, "&ouml;")
            .replaceAll(/ä/g, "&auml;")
            .replaceAll(/Ä/g, "&Auml;")
            .replaceAll(/ß/g, "&szlig;")
            .replaceAll(/\n/g, "<br />");
    }

    /**
     * @param {PinBoardLanguage} language
     */
    constructor(language) {

        /**
         * @type {PinBoardLanguage}
         * @private
         */
        this._language = language;
    }

    /**
     * @private
     * @param {string} key
     * @param {string|number} args
     * @return {string}
     */
    _translateUcFirst(key, ...args) {
        const translation = this._translate(key, ...args);
        return this._capitalizeFirstLetter(translation);
    }

    /**
     * @private
     * @param {string} key
     * @param {string|number} args
     * @return {string}
     */
    _translate(key, ...args) {

        if (false === this._language.hasOwnProperty(key)) {
            console.error('nss_pinboard: No translation for key [' + key + ']', this._language);
            return '[' + key + ']';
        }

        args = args || [];

        let translation = this._language[key];
        let formatted_translation = translation;

        const regex = /(%)(\d*[.]?\d*)([sfd]?)/gmi;

        args.every((arg, index) => {

            const match = regex.exec(translation);

            if (match && match.index === regex.lastIndex) {
                regex.lastIndex++;
            }

            if (match === null) {
                return false;
            }

            const pattern = match[0];
            const pad_times = (match[2] || '').toString();
            const type = (match[3] || 's').toLowerCase();

            let formatted_arg = arg;

            switch (type) {

                case 'd':
                    formatted_arg = this._padLeft(arg, pad_times);
                    break;

                case 'f':

                    const pad_times_parts = pad_times.split('.');
                    const pad_left = pad_times_parts[0] || false;
                    const pad_right = pad_times_parts[1] || false;

                    const arg_parts = arg.toString().split('.');
                    let arg_left = arg_parts[0] || '';
                    let arg_right = arg_parts[1] || '';
                    let new_args = [];

                    if (pad_left !== false) {
                        arg_left = this._padLeft(arg_left, pad_left);
                    }

                    if (pad_right !== false) {
                        arg_right = this._padRight(arg_right, pad_right);
                    }

                    if (arg_left !== '') {
                        new_args.push(arg_left);
                    }

                    if (arg_right !== '') {
                        new_args.push(arg_right);
                    }

                    formatted_arg = new_args.join('.');

                    break;
            }

            formatted_translation = formatted_translation.replace(pattern, formatted_arg);

            return true;
        });

        return formatted_translation;
    }

    /**
     * @param {string|number} value
     * @param {string|number} pad_times
     * @param {string|number} [pad_char='0']
     * @return {string|number}
     * @private
     */
    _padLeft(value, pad_times, pad_char) {

        value = value.toString();
        pad_char = (pad_char || '0').toString();

        if (typeof pad_times === "string") {
            pad_times = parseInt(pad_times, 10);
        }

        if (isNaN(pad_times)) {
            return value;
        }

        if (value.length >= pad_times) {
            return value;
        }

        const prefix = pad_char.repeat(pad_times);

        const formatted_value = (prefix + '' + value).slice((pad_times * -1));

        return formatted_value;
    }

    /**
     * @param {string|number} value
     * @param {string|number} pad_times
     * @param {string|number} [pad_char='0']
     * @return {string|number}
     * @private
     */
    _padRight(value, pad_times, pad_char) {

        value = value.toString();
        pad_char = (pad_char || '0').toString();

        if (typeof pad_times === "string") {
            pad_times = parseInt(pad_times, 10);
        }

        if (isNaN(pad_times)) {
            return value;
        }

        const postfix = pad_char.repeat(pad_times);

        const formatted_value = (value + '' + postfix).slice(0, pad_times);

        return formatted_value;
    }

    /**
     * @param {string|number} value
     * @return {string}
     * @private
     */
    _capitalizeFirstLetter(value) {
        value = value.toString();
        return value.charAt(0).toUpperCase() + '' + value.slice(1);
    }

}

export {Language};
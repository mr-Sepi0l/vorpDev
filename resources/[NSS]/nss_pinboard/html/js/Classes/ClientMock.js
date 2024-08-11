import {Client} from './Client.js';
import {NssTip} from "../../nss/NssTip/NssTip.js";
import {Language} from "./Language.js";

class ClientMock extends Client {

    /**
     * @type {PinBoardMessageResponse}
     * @private
     */
    static _poster_list = {
        "remove_allowed": true,
        "table_for_json": [{
            id: 5,
            type: "image",
            content: {
                image_url: "https://i.postimg.cc/1zZ7S3Gx/Coleman-Kopie-Kopie.png"
            },
            location: "?",
            creator_vorp_char_id: 176,
            created_at: 12345
        }, {
            id: 9,
            type: "image",
            content: {
                image_url: "https://cdn.discordapp.com/attachments/957955600157917194/999239726294896660/Clayton_und_Steiner.jpg"
            },
            location: "?",
            creator_vorp_char_id: 138,
            created_at: 12345
        }, {
            id: 13,
            type: "image",
            content: {
                image_url: "https://i.imgur.com/VlXjYhz.png"
            },
            location: "?",
            creator_vorp_char_id: 119,
            created_at: 12345
        }, {
            id: 14,
            type: "text",
            content: {
                paper: 2,
                sections: [{
                    type: "headline",
                    text: "Hallo Hobbs!",
                    align: "center"
                }, {
                    type: "text",
                    text: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, \n\nsed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. \n" +
                        "\n" +
                        "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. \n" +
                        "\n" +
                        "Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. \n" +
                        "\n" +
                        "Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. \n" +
                        "\n" +
                        "Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis. ",
                    align: "left"
                }]
            },
            location: "?",
            creator_vorp_char_id: 120,
            created_at: 12345
        }, {
            id: 22,
            type: "image",
            content: {
                image_url: "https://hummelhummel-ag.de/risingsun/sc01.png"
            },
            location: "?",
            creator_vorp_char_id: 108,
            created_at: 12345
        }, {
            id: 27,
            type: "image",
            content: {
                image_url: "https://cdn.discordapp.com/attachments/957955600157917194/1012316729021583370/Pferdegestut_Clark.jpg"
            },
            location: "?",
            creator_vorp_char_id: 136,
            created_at: 12345
        }, {
            id: 32,
            type: "image",
            content: {
                image_url: "https://i.imgur.com/OP7zWJn.jpg"
            },
            location: "?",
            creator_vorp_char_id: 49,
            created_at: 12345
        }, {
            id: 44,
            type: "text",
            content: {
                paper: 1,
                sections: [{
                    type: "text",
                    text: "Mittwochs und Samstags zum 20. Glockenschlag Markt in Blackwater!",
                    align: "left"
                }]
            },
            location: "?",
            creator_vorp_char_id: 49,
            created_at: 12345
        }],
        type: "rtuid_1",
        charidentifier: 205,
        success: true
    };

    static LANGUAGE_EN = {
        bulletin_board:"Bulletin Board",
        timeout:"Timeout while waiting for server response.",
        no_location_found:"No bulletin board location near player found.",
        you_unpinned_something:"You took something off the bulletin board.",
        you_pinned_something:"You pinned something to the bulletin board.",
        new_notice:"New notice",
        leave_bulletin_board:"Leave",
        really_unpin:"Do you really want to remove the notice?",
        really_unpin_yes:"Yes",
        really_unpin_no:"No",
        what_you_want_create:"What do you want to create?",
        text:"Text",
        image_link:"Image link",
        placeholder_your_text_here:"Your text here...",
        notice_discard:"Discard",
        notice_pin:"Pin",
        notice_unpin:"Take down",
        notice_leave:"Back",
        open_bulletin_board:"Read",
        check_image:"Check",
        image_url_empty:"Please provide an image link.",
        no_valid_image_url:"Please provide a valid image link,\ne.g. https://something.com/image.png.",
        image_not_found:"Image could not be found at given image link.",
        image_tip:"For best results, the image should be in 3:4 format (portrait), e.g. 900x1200 pixels.",
        ok: 'OK',
        no_entries:"No entries...",
        discord_title_image_poster_added:"New picture pinned",
        discord_title_text_poster_added:"New text pinned",
        discord_title_image_poster_removed:"Image hung",
        discord_title_text_poster_removed:"Text hung",
        discord_town:"Town: %s",
        discord_title_postfix_outdated:"Outdated",
        discord_title_postfix_console:"Console via admin",
    };

    static LANGUAGE_DE = {
        bulletin_board: "Schwarzes Brett",
        timeout: "Timeout während des Wartens auf Server-Antwort.",
        no_location_found: "Keine Position eines Schwarzen Brettes in der Nähe des Spielers gefunden.",
        you_unpinned_something: "Du hast etwas vom schwarzen Brett abgehängt.",
        you_pinned_something: "Du hast etwas ans schwarze Brett gepinnt.",
        new_notice: "Neuer Aushang",
        leave_bulletin_board: "Verlassen",
        really_unpin: "Möchtest Du den Aushang wirklich entfernen?",
        really_unpin_yes: "Ja",
        really_unpin_no: "Nein",
        what_you_want_create: "Was möchtest Du erstellen?",
        text: "Text",
        image_link: "Bild-Link",
        placeholder_your_text_here: "Dein Text hier...",
        notice_discard: "Verwerfen",
        notice_pin: "Anpinnen",
        notice_unpin: "Abhängen",
        notice_leave: "Zurück",
        check_image: "Prüfen",
        image_url_empty: "Bitte gib einen Bild-Link an.",
        no_valid_image_url: "Bitte gib einen gültigen Bild-Link an,\nz. B. https://irgendwas.de/bild.png.",
        image_not_found: "Das Bild konnte nicht gefunden werden.",
        image_tip: "Für beste Ergebnisse sollte das Bild im 3:4 Format (hochkant), z. B. 900x1200 Pixel, sein.",
        ok: 'OK',
        discord_title_image_poster_added: "Neues Bild angepinnt",
        discord_title_text_poster_added: "Neuer Text angepinnt",
        discord_title_image_poster_removed: "Bild abgehangen",
        discord_title_text_poster_removed: "Text abgehangen",
        discord_town: "Stadt: %s",
    };

    static _language = ClientMock.LANGUAGE_EN;

    static _config = {
        UseCustomTips: true
    };

    /**
     * @inheritDoc
     */
    constructor(on_show, on_hide, pinboard) {

        console.info('Use Mock because not in game!');

        super(on_show, on_hide, pinboard);

        this._resource_name = 'mock';

        this._setupMockSwitches();

        this._is_night = false;

        /**
         * @type {NssPinboardCharDetails}
         * @private
         */
        this._char_details = {
            permissions: {
                post_everywhere_at_once: true,
            },
            char_name: 'MockName',
            char_id: 1,
            group: 'MockGroup',
            is_admin: true,
            job: 'MockJob',
            job_grade: 1,
        }

        window.setTimeout(function () {
            this._pinboard.show(ClientMock._language, ClientMock._config, this._is_night, this._char_details);
        }.bind(this), 100);

    }

    /**
     * @private
     */
    _setupMockSwitches() {

        window.addEventListener('keydown', function (/**KeyboardEvent*/event) {

            if (this._pinboard.isLocked()) {
                return;
            }

            if (event.key === 'g') {
                this._pinboard.show();
            }

            if (event.key === "d") {
                this._is_night = false;
                this._pinboard.setDay();
            }

            if (event.key === "n") {
                this._is_night = true;
                this._pinboard.setNight();
            }
        }.bind(this));
    }

    /**
     * @inheritDoc
     */
    removePoster(poster_id, cb) {

        ClientMock._poster_list.table_for_json = ClientMock._poster_list.table_for_json.filter(function (poster) {
            return poster.id !== poster_id;
        });

        cb({success: true});
        return this;
    }

    /**
     * @return {number}
     * @private
     */
    _getNextAvailableId() {

        let highest_id = 0;

        ClientMock._poster_list.table_for_json.forEach(function (poster) {
            if (highest_id < poster.id) {
                highest_id = poster.id;
            }
        });

        highest_id++;

        return highest_id;
    }

    /**
     * @param {PinBoardTextPoster} text_poster
     * @param {function} [cb]
     * @return {Client}
     */
    saveTextPoster(text_poster, cb) {

        const new_row = {
            id: this._getNextAvailableId(),
            type: "text",
            content: text_poster,
            location: "?",
            creator_vorp_char_id: ClientMock._poster_list.charidentifier,
            created_at: 12345
        }

        ClientMock._poster_list.table_for_json.push(new_row);

        cb({success: true});

        return this;
    }

    /**
     * @param {PinBoardImagePoster} image_poster
     * @param {function} [cb]
     * @return {Client}
     */
    saveImagePoster(image_poster, cb) {

        const new_row = {
            id: this._getNextAvailableId(),
            type: "image",
            content: image_poster,
            location: "?",
            creator_vorp_char_id: ClientMock._poster_list.charidentifier,
            created_at: 12345
        }

        ClientMock._poster_list.table_for_json.push(new_row);

        cb({success: true});

        return this;
    }

    /**
     * @inheritDoc
     */
    getPosterList(cb) {
        const response = Object.assign(ClientMock._poster_list, {success: true});
        cb(response);
        return this;
    }

    /**
     * @inheritDoc
     */
    close() {
        this._on_hide();
        return this;
    }

    /**
     * @param {function} cb
     * @return {Client}
     */
    getDayMode(cb) {
        const response = {success: true, is_night: this._is_night};
        cb(response);
        return this;
    }
}

export {ClientMock};
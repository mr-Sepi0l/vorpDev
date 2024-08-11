import {Poster} from "./Poster.js";
import {PosterDetails} from "./PosterDetails.js";
import {NssTip} from "../../nss/NssTip/NssTip.js";
import {Language} from "./Language.js";

class PosterPreview extends Poster {

    /**
     * @inheritDoc
     */
    _determineElements() {

        super._determineElements();

        this._el.classList.add('pb-poster--preview');
    }

    /**
     * @inheritDoc
     */
    _setupEvents() {

        super._setupEvents();

        this._el.addEventListener('click', this._onPosterClick.bind(this));
    }


    /**
     * @private
     */
    _onPosterClick() {

        const current_modal_el = document.querySelector('.pb-modal') || null;
        if (current_modal_el !== null) {
            current_modal_el.remove();
        }

        const modal_el = document.createElement('div');
        modal_el.classList.add('pb-modal');
        document.body.appendChild(modal_el);

        const poster_container_el = document.createElement('div');
        poster_container_el.classList.add('pb-modal__poster-container');
        document.body.appendChild(poster_container_el);

        const poster_details = this.createClone(PosterDetails);
        poster_container_el.appendChild(poster_details.getEl());

        this._pinboard.setOpenPoster(poster_details);

        const close_details = function () {
            modal_el.remove();
            poster_container_el.remove();
            this._pinboard.resetOpenPoster();
        }.bind(this);

        poster_details.listenOnClose(close_details);

        const poster_removed = function () {

            close_details();

            this._pinboard.showNotice(Language.LHtml('you_unpinned_something'));

            this._pinboard._loadPosters();

        }.bind(this);

        poster_details.listenOnRemove(poster_removed);

        modal_el.addEventListener('click', close_details);
    }
}

export {PosterPreview};
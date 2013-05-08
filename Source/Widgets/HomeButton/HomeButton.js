/*global define*/
define(['./HomeButtonViewModel',
        '../../Core/DeveloperError',
        '../../Core/destroyObject',
        '../../ThirdParty/knockout'
        ], function(
         HomeButtonViewModel,
         DeveloperError,
         destroyObject,
         knockout) {
    "use strict";

    /**
     * A single button widget for toggling fullscreen mode.
     *
     * @alias HomeButton
     * @constructor
     *
     * @param {Element|String} container The DOM element or ID that will contain the widget.
     *
     * @exception {DeveloperError} container is required.
     */
    var HomeButton = function(container, scene, transitioner, ellipsoid) {
        if (typeof container === 'undefined') {
            throw new DeveloperError('container is required.');
        }

        if (typeof container === 'string') {
            var tmp = document.getElementById(container);
            if (tmp === null) {
                throw new DeveloperError('Element with id "' + container + '" does not exist in the document.');
            }
            container = tmp;
        }

        /**
         * Gets the parent container.
         * @memberof HomeButton
         * @type {Element}
         */
        this.container = container;

        /**
         * Gets the viewModel being used by the widget.
         * @memberof HomeButton
         * @type {HomeButtonViewModel}
         */
        this.viewModel = new HomeButtonViewModel(scene, transitioner, ellipsoid);

        /**
         * Gets the container element for the widget.
         * @memberof HomeButton
         * @type {Element}
         */
        this.container = container;

        this._element = document.createElement('span');
        this._element.className = 'cesium-homeButton';
        this._element.setAttribute('data-bind', 'attr: { title: tooltip }, click: command');
        container.appendChild(this._element);

        knockout.applyBindings(this.viewModel, this._element);
    };

    /**
     * Destroys the  widget.  Should be called if permanently
     * removing the widget from layout.
     * @memberof HomeButton
     */
    HomeButton.prototype.destroy = function() {
        var container = this.container;
        knockout.cleanNode(container);
        container.removeChild(this._element);
        return destroyObject(this);
    };

    return HomeButton;
});

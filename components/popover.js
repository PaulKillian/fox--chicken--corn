import { createPopper } from '@popperjs/core';

const Popover = () => {
    const cornPopper = document.querySelector('#corn');
    const chickenPopper = document.querySelector('#chicken');
    const tooltip = document.querySelector('#tooltip');
    const popperInstance = Popper.createPopper(cornPopper, tooltip);
    const showEvents = ['mouseenter', 'focus'];
    const hideEvents = ['mouseleave', 'blur'];

    createPopper(cornPopper, tooltip, {
        placement: 'top',
    });

    showEvents.forEach(event => {
        cornPopper.addEventListener(event, show);
    });

    hideEvents.forEach(event => {
        cornPopper.addEventListener(event, hide);
    });

    function show() {
        tooltip.setAttribute('data-show', '');

        // We need to tell Popper to update the tooltip position
        // after we show the tooltip, otherwise it will be incorrect
        popperInstance.update();
    }

    function hide() {
        tooltip.removeAttribute('data-show');
    }
}

export default Popover;
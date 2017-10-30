lineemotes.categories = function() {}

lineemotes.categories.buildContainer = function() {
    var container = '';
    var categories = '';


    var storage = lineemotes.storage.get();
    if (storage) {
        for (var pack = 0; pack < storage.length; ++pack) {
            categories += `<div class="item" data-id="${storage[pack]['starting_id']}" onclick="$('#bda-qem-line-container .line-pack')[${pack}].scrollIntoView()" style='background-image: url("https://sdl-stickershop.line.naver.jp/stickershop/v1/sticker/${storage[pack]['starting_id']}/android/sticker.png;compress=true")'></div>`;
        }
    }
    var localization_strings = lineemotes.prototype.getLocalizationStrings();
    var numbersOnly = "return event.charCode >= 48 && event.charCode <= 57";
    container += `
<div class="add-form" style="opacity: 0; pointer-events: none;">
    <div class="labels">
        <label for="line-add-title">${localization_strings['addform-title']}</label>
        <label for="line-add-length">${localization_strings['addform-length']}</label>
        <label for="line-add-id">${localization_strings['addform-id']}</label>
    </div>
    <div class="inputs">
        <input id="line-add-title" placeholder="${localization_strings['addform-title']}">
        <input id="line-add-length" onkeypress="${numbersOnly}" placeholder="${localization_strings['addform-length']}" value="40">
        <input id="line-add-id" onkeypress="${numbersOnly}" placeholder="${localization_strings['addform-id']}">
    </div>

    <button type="button" class="line-add-button ui-button filled brand small">
        <div class="ui-button-contents">${localization_strings['addform-add']}</div>
    </button>
</div>
<div class="categories-container">
    <div class="categories-wrapper">
        <div class="item add-pack-button">
            <svg class="add-pack" width="20" height="20" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>
            </svg>
        </div>
        ${categories}
    </div>
</div>
`;
    return container;
};

lineemotes.categories.init = function () {
    lineemotes.editbar.init();
    $('#bda-qem-line-container .categories-container .categories-wrapper').bind('mousewheel', function(event) {
	if ((event.originalEvent.wheelDelta || event.originalEvent.detail) > 0)
            this.scrollLeft -= 25;
        else
            this.scrollLeft += 25;
	return false;
    });
    $('#bda-qem-line-container .categories-container .add-pack').off('click');
    $('#bda-qem-line-container .categories-container .add-pack').on('click', (event) => {
        var state = $('#bda-qem-line-container .add-form').css('opacity');
        if (state == '1') {
            $('#bda-qem-line-container .categories-container .add-pack').addClass('icon-plus');
            $('#bda-qem-line-container .categories-container .add-pack').removeClass('icon-minus');
            $('#bda-qem-line-container .add-form').css('opacity', '0');
            $('#bda-qem-line-container .add-form').css('pointer-events', 'none');
        }
        else if (state == '0') {
            $('#bda-qem-line-container .categories-container .add-pack').addClass('icon-minus');
            $('#bda-qem-line-container .categories-container .add-pack').removeClass('icon-plus');
            $('#bda-qem-line-container .add-form').css('opacity', '1');
            $('#bda-qem-line-container .add-form').css('pointer-events', 'unset');
        }
    });

    var state = {
        'id': false,
        'length': true,
        'title': false
    };

    function validate() {
        function clearAndSet(target, state) {
            $(target).removeClass('valid');
            $(target).removeClass('invalid');
            $(target).addClass(state);
        }
        if (state['id'] && state['length'] && state['title']) {
            clearAndSet($('#bda-qem-line-container .line-add-button'), 'valid');
            return true;
        } else {
            clearAndSet($('#bda-qem-line-container .line-add-button'), 'invalid');
            return false;
        }
    }

    $(`#line-add-title`).off();
    $(`#line-add-length`).off();
    $(`#line-add-id`).off();

    $(`#line-add-title`).keyup((event) => {
        if ($(event.target).val()) state['title'] = true;
        else state['title'] = false;
        validate();
    });
    $(`#line-add-length`).keyup((event) => {
        if (Number($(event.target).val())) state['length'] = true;
        else state['length'] = false;
        validate();
    });
    $(`#line-add-id`).keyup((event) => {
        if (Number($(event.target).val().trim())) state['id'] = true;
        else state['id'] = false;
        validate();
    });

    $('#bda-qem-line-container .line-add-button').off('click');
    $('#bda-qem-line-container .line-add-button').mouseenter((event) => {
        validate();
    });
    $('#bda-qem-line-container .line-add-button').on('click', (event) => {
        if (validate()) {
            var title = $('#line-add-title').val().trim();
            var length = $('#line-add-length').val().trim();
            var id = $('#line-add-id').val().trim();
            lineemotes.appendPack(title, id, length);
            $('#line-add-title').val('');
            $('#line-add-length').val(40);
            $('#line-add-id').val('');
        }
    });
};

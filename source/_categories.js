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
    
    var numbersOnly = "return event.charCode >= 48 && event.charCode <= 57";
    container += `
<div class="add-form" style="display: inline-flex; opacity: 0; pointer-events: none;">
    <div class="labels" style="margin-right: 10px; font-size: 14px; line-height: 17px;">
        <label for="line-add-title">Title</label><br>
        <label for="line-add-length">Length</label><br>
        <label for="line-add-id">First sticker ID</label>
    </div>
    <div class="inputs" style="padding-top: 0.5px";>
        <input id="line-add-title" placeholder="Title"><br>
        <input id="line-add-length" onkeypress="${numbersOnly}" placeholder="Length" value="40"><br>
        <input id="line-add-id" onkeypress="${numbersOnly}" placeholder="First sticker ID">
    </div>
    
    <button type="button" class="line-add-button ui-button filled brand small" style="margin-left: 10px; width: 42px; height: auto; top: 1px; padding: 0px; background-color: #98aab6;">
        <div class="ui-button-contents">Add</div>
    </button>
</div>
<div class="categories-container">
  <div class="categories-wrapper"><div class="item"><div class="add-pack icon-plus"></div></div>${categories}</div>
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
lineemotes.preview = function() {}

lineemotes.preview.buildContainer = function() {
    var container = '';
    container += `
<div class="preview-container">
    <div class="preview-wrapper" style="visibility: hidden; opacity: 0; background-size: inherit;"></div>
</div>`;
    return container;
}

lineemotes.preview.init = function() {
    $('#bda-qem-line-container .emote-menu-inner img')
        .mouseenter(function(e) { lineemotes.preview.show(e.target.src); })
        .mouseleave(function(e) { lineemotes.preview.hide(); });
};

lineemotes.preview.show = function(url) {
    var preview = $('#bda-qem-line-container .preview-container .preview-wrapper');
    preview.css('visibility', 'visible');
    preview.css('opacity', '1');
    // preview.css('background', `url("${url}") rgb(53, 53, 53) no-repeat center`);
    preview.css('background-image', `url("${url}")`);
};

lineemotes.preview.hide = function() {
    var preview = $('#bda-qem-line-container .preview-container .preview-wrapper');
    preview.css('visibility', 'hidden');
    preview.css('opacity', '0');
};

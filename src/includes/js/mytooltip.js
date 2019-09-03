$(document).ready(function () {
    $('body').on('mouseenter', '.mytooltip:not(.tooltipstered)', function(){
        $(this)
            .tooltipster({                       
                contentCloning: true,
                animation: 'fade',
                delay: 200,
                theme: 'tooltipster-punk',
                trigger: 'click',
                functionPosition: function(instance, helper, position){
                    position.coord.top += 10;
                    position.coord.left += 10;
                    return position;
                },
                interactive: true 
            })
            .tooltipster('show');
    });
    console.log("`tooltipster.js` is DONE");
});
(function($){
$.fn.autoContents = function(settingsOverrides){

    // options

        var settings = $.extend({
            'contentsElement': $('.autoContents'), // this is where the table of contents will be created
        }, settingsOverrides);

    // plugin
    
        // find headings
        
            contents = [];
            prevLevel = 0;
            prevIndent = 0;
            $(this).find('h1, h2, h3, h4, h5, h6').each(function(){
                
                var currLevel = $(this).prop('nodeName').substring(1);
                
                if ( currLevel > prevLevel ) {
                    // indent
                    var indent = prevIndent+1;
                } else if ( currLevel < prevLevel ) {
                    // outdent
                    var indent = prevIndent-1;
                } else {
                    // stay the same
                    var indent = prevIndent;
                }
                
                if ( !$(this).attr('id') ) {
                    var id = Math.random().toString(16).substr(2, 8);
                    $(this).attr('id', id)
                }
                
                var heading = {
                    id: $(this).attr('id'),
                    title: $(this).html(),
                    indent: indent
                };
                
                contents.push(heading);
                
                prevLevel = currLevel;
                prevIndent = indent;
                
            });
            
            // console.log({contents});
            
        // build table of contents
            
            contentsHTML = '';
            prevLevel = 0;
            $.each(contents, function(index, value){
                
                if ( value['indent'] > prevLevel ) {
                    // indent
                    contentsHTML += '<ul>';
                } else if ( value['indent'] < prevLevel ) {
                    // outdent
                    contentsHTML += '</ul>';
                }
                
                contentsHTML += '<li><a href="#'+value['id']+'">'+value['title']+'</a></li>';
                
                prevLevel = value['indent'];
                
            });
            
        // populate

            $(settings.contentsElement).html(contentsHTML);
    
};
})(jQuery);

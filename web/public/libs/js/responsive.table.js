/**
 * Created by rufusmbugua on 25/11/2015.
 */

$.ResponsiveTable = function(element){
    //console.log(element);
    var list=[];
    function convert_table(element) {
        function build_content(element) {

            $.each($(element).find('td'),function(index,value){
                list.push('<li class="responsiveTable">'+$(value).html()+'</li>');
            });
        }
        build_content(element);
    }


    convert_table(element);
    return list;
};

$.ResponsiveHeader= function(element){
    //console.log(element.html())
    var headers = [];
    function convert_table(element) {

        function build_headers(element){
            var rowCount=0;
            $.each($(element).find('th'),function(i,v){
                headers[i]= '<div class="'+$(v).attr("class")+'">'+$(v).html()+'</div>';
            })
        }
        build_headers(element);
    }

    convert_table(element);
    return headers;
};

$.ResponsiveFooter= function(element){
    var headers = [];
    function convert_table(element) {

        function build_headers(element){
            var rowCount=0;
            $.each($(element).find('td'),function(i,v){
                headers[i]= '<div class="'+$(v).attr("class")+'">'+$(v).html()+'</div>';
            })
        }
        build_headers(element);
    }

    convert_table(element);
    return headers;
};
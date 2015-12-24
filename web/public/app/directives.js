app.directive('isActiveNav', ['$location', function($location) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            scope.location = $location;
            scope.$watch('location.path()', function(currentPath) {
                if ('#' + currentPath == element[0].hash) {
                    element.parent().addClass('active');
                } else {
                    element.parent().removeClass('active');
                }
            });
        }
    };
}]);

/**
 * @ngdoc   responsiveHeader
 * @description Converting a Table to a List
 */
app.directive('responsiveHeader',[function() {
    return {
        restrict: 'A',
        //transclude: false,
        link: function (scope, element) {
            var header=[];
            var titles=[];
            var size=0;
            $("#price_list").on("loaded",function(){
                $.each(element.find('tr'),function(index,value){
                    header[index] = $.ResponsiveHeader(value);
                    size = header[index].length;
                });
                for(x=0;x<size;x++){
                    titles[x]="";
                }
                $.each(header,function(index,value){
                    $.each(value,function(i,v){
                        if(typeof v!=undefined){
                            titles[i]+= v;
                        }
                    })
                });
                $.each(titles,function(index,value){
                    if(index>0){
                        $('li[name="header[' + (index - 1) + ']"]').html(value);
                    }
                });
            })
        }
    }

}])

app.directive('responsiveFooter',[function() {
    return {
        restrict: 'A',
        //transclude: false,
        link: function (scope, element) {
            var header=[];
            var titles=[];
            var size=0;
            $("#price_list").on("loaded",function(){
                $.each(element.find('tr'),function(index,value){
                    header[index] = $.ResponsiveFooter(value);
                    size = header[index].length;
                });
                for(x=0;x<size;x++){
                    titles[x]="";
                }
                $.each(header,function(index,value){
                    $.each(value,function(i,v){
                        if(typeof v!=undefined){
                            titles[i]+= v;
                        }
                    })
                });
                $.each(titles,function(index,value){
                    if(index>0){
                        $('li[name="footer[' + (index - 1) + ']"]').html(value);
                    }
                });
            })
        }
    }

}]);

app.directive('responsiveRow',['$timeout',function($timeout){
    return {
        restrict: 'A',
        //transclude: false,
        link: function (scope, element) {
            var ul=[];
            var lists=[];
            var size=0;
            if(scope.$last){
                $timeout(function(){
                    // Convert Table to Array
                    $.each(element.parent().find('tr'),function(index,value){
                        lists[index]=$.ResponsiveTable(value);
                        size=lists[index].length;
                    });

                    for(x=0;x<size-1;x++){
                        ul[x]=[];
                    }
                    $.each(lists,function(index,value){
                        var first_column;
                        $.each(value,function(i,v){
                            if(i==0){
                                first_column=v;
                            }
                            else{
                                ul[i-1][index]=[first_column,v];
                            }

                        })
                    });
                    //Build Lists
                    var final_list='';
                    $.each(ul,function(index,value){

                        var output='<ul class="responsiveCollection"><li name="header['+index+']" class="header"></li>';
                        $.each(value,function(i,v){
                            output+='<div class="responsiveSection">';
                            $.each(v,function(ii,val){

                                output+=val;
                            })
                            output+='</div>';
                        })
                        final_list+=output+'<li name="footer['+index+']" class="footer"></li></ul>';

                    });
                    $('#price_list').html(final_list);
                    $('#price_list').trigger('loaded');
                });

            }
        }
    }
}]);
app.directive('isActiveLink', ['$location', function($location) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            scope.location = $location;
            scope.$watch('location.path()', function(currentPath) {
                if ('#' + currentPath == element[0].hash) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            });
        }
    };
}]);

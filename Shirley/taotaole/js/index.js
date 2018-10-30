window.onload =function(){
    
    var gallery = mui('.mui-slider');
    gallery.slider({
        interval:2000
    });
    
    var index =0;
    var gallery = mui('.mui-slider');
    gallery.slider().gotoItem(index);
}
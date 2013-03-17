$(function(){
    $.each(links, function(k,v){
        if(isArray(v.url)) {
            var dropdown = $("<li></li>", {
                "class": "dropdown"
            }).appendTo($("#siteLinks"));
            dropdown.append($("<a></a>", {
                "class": "dropdown-toggle",
                "data-toggle": "dropdown",
                "href": "#",
                "text": v.text
            }).append($("<b></b>", {
                "class": "carat"
            })));
            var dropdownMenu = $("<ul></ul>", {
                "class": "dropdown-menu"
            }).appendTo(dropdown);
            $.each(v.url, function(a, b){
                dropdownMenu.append($("<li></li>").append($("<a></a>", {
                    "href": (b.url.indexOf("http") == -1) ? base + b.url : b.url,
                    "text": b.text
                })));
            });
        }else{
            $("#siteLinks").append($("<li></li>").append($("<a></a>",{
                "href": (v.url.indexOf("http") == -1) ? base + v.url : v.url,
                "text": v.text
            })));
        }
    });
    $("#siteLinks").find("li").each(function(k,v){
        if($(v).find("a").attr("href") == document.location.href.toString()){
            $(v).addClass("active");
        }
    });
});
function isArray(o) {
    return Object.prototype.toString.call(o) === '[object Array]';
}
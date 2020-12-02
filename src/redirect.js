
function RedirectByLanguage(pageLanguage)
{
    var browserLanguage = navigator.language || navigator.browserLanguage;
    cookie = key => ((new RegExp((key || '=') + '=(.*?); ', 'gm')).exec(document.cookie + '; ') || ['', null])[1]
    var redirected = cookie('redirected')
    console.log('redirected', redirected, ' language', browserLanguage);
    if (redirected == null || !redirected && browserLanguage != pageLanguage) {
        document.cookie = "redirected=true; path=/";
        var path = pageLanguage == "en" ? "." : "..";
        switch (browserLanguage) {
            case 'he':
                path += '/he/';
                break;
            case 'es':
                path += '/es/';
                break;
        }

        location = path;
    }
}


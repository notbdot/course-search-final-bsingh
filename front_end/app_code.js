var URL = window.location.hostname;
var updateView = async (button) => {
    if (button.dataset.querytype == 'by_instructor') {
        let queryvalue = document.querySelector('#nameQuery').value;
        api = `https://course-search-final.herokuapp.com/api/by_instructor/${queryvalue}`;
    }
    else if (button.dataset.querytype == 'by_code') {
        let queryvalue = document.querySelector('#codeQuery').value;
        api = `https://course-search-final.herokuapp.com/api/by_course_code/${queryvalue}`;
    }
    else if (button.dataset.querytype == 'by_title') {
        let queryvalue = document.querySelector('#titleQuery').value;
        api = `https://course-search-final.herokuapp.com/api/by_title/${queryvalue}`;
    }
    else if (button.dataset.querytype == 'by_level') {
        let queryvalue = document.querySelector('#levelQuery').value;
        api = `https://course-search-final.herokuapp.com/api/by_level/${queryvalue}`;
    }
    else if (button.dataset.querytype == 'combined_query') {
        let combinedIns = document.querySelector('#combinedIns').value;
        let combinedLev = document.querySelector('#combinedLev').value;
        api = `https://course-search-final.herokuapp.com/api/combined_query/${combinedIns}/${combinedLev}`;
    }

    const data = await fetch(api);
    const model = await data.json();

    render_view(model);
}
var render_view = (model) => {
    var source =  document.querySelector("#show_results_view").innerHTML;
    var template = Handlebars.compile(source);
    var html = template(model);

    document.querySelector("#results").innerHTML = html;
}

(function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();
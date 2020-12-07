var URL = window.location.hostname;
var updateView = async (button) => {
    if (button.dataset.querytype == 'by_instructor') {
        let queryvalue = document.querySelector('#nameQuery').value;
        api = `https://${URL}/api/by_instructor/${queryvalue}`;
    }
    else if (button.dataset.querytype == 'by_code') {
        let queryvalue = document.querySelector('#codeQuery').value;
        api = `https://${URL}/api/by_course_code/${queryvalue}`;
    }
    else if (button.dataset.querytype == 'by_title') {
        let queryvalue = document.querySelector('#titleQuery').value;
        api = `https://${URL}/api/by_title/${queryvalue}`;
    }
    else if (button.dataset.querytype == 'by_level') {
        let queryvalue = document.querySelector('#levelQuery').value;
        api = `https://${URL}/api/by_level/${queryvalue}`;
    }
    else if (button.dataset.querytype == 'combined_query') {
        let combinedIns = document.querySelector('#combinedIns').value;
        let combinedLev = document.querySelector('#combinedLev').value;
        api = `httpS://${URL}/api/combined_query/${combinedIns}/${combinedLev}`;
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

(function(){
    let links = [];
    let ids = [];

    // read youtu.be/xxx
    let link_elements = document.evaluate(
        "//*[starts-with(@href, 'https://youtu.be/')]",
        document);
    while (a = link_elements.iterateNext()) {
        let link = {
            'text': a.parentNode.parentNode.textContent,
            'link': a.href.split('/').pop()
        }
        if (ids.indexOf(link.link) > -1)
            continue;
        links.push(link);
        ids.push(link.link);
    };

    // read youtube.com/watch?v=xxxx
    link_elements = document.evaluate(
        "//*[starts-with(@href, 'https://www.youtube.com/watch')]",
        document);
    while (a = link_elements.iterateNext()) {
        let link = {
            'text': a.parentNode.parentNode.textContent,
            'link': a.href.split('=').pop()
        }
        if (ids.indexOf(link.link) > -1)
            continue;
        links.push(link);
        ids.push(link.link);
    };

    //console.log(links);
    return JSON.stringify(links);
})();

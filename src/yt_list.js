// init
console.log("Start");
document.querySelector("#holotools")
        .addEventListener("click", run_holotool);

// fireofx
if(typeof chrome === "undefined")
    var chrome = browser;

// Search youtube link in tab
chrome.tabs.executeScript({file: "get_yt_url.js"}, (links) => {
    links = JSON.parse(links[0]);
    links.forEach((link) => {
        let main = document.querySelector("#links");

        // checkbox
        let div_input = document.createElement("input");
        div_input.setAttribute("type", "checkbox");
        div_input.setAttribute("id", link.link);
        main.appendChild(div_input);

        // text
        let div_label = document.createElement("label");
        div_label.setAttribute("for", link.link);
        let text = link.text.trim()
                            .replaceAll("\t", " ")
                            .replaceAll("\n", " ")
                            .replace(/ +(?= )/g, "");
        div_label.textContent = text;
        main.appendChild(div_label);

        // break
        main.appendChild(document.createElement("br"));
    })
})


// Add links to holotool
function run_holotool() {
    document.evaluate("//input[starts-with(@href, 'https://youtu')]",
                      document);
    let links = [];
    document.querySelectorAll("input").forEach((link) => {
        if (link.checked)
            links.push(link.id);
    });
    chrome.tabs.create({
        url: ("https://hololive.jetri.co/#/ameliawatchon?videoId="
              + links.join(","))
    });
}

let MAX = 6;

function parseBonusBlocks() {
    const spans = document.querySelectorAll("span.tooltips_help_text_simple__Uqz9F");
    const rows = [];

    spans.forEach(span => {
        const title = span.textContent.trim();

        let values = [];
        let node = span.parentElement.nextElementSibling;

        for (let i = 0; i < MAX; i++) {
            if (!node) break;
            let text = node.textContent.trim();
        
            // Convertir a número seguro
            let num = parseInt(text);
            if (isNaN(num)) num = 0;
        
            values.push(num);
            node = node.nextElementSibling;
        }
        
        
        rows.push({ title, values });
    });

    return rows;
}

function getSupportHeaders() {
    const cards = document.querySelectorAll(".compare_clickable__CtBGa");
    const headers = [];

    for (let i = 0; i < MAX; i++) {
        const card = cards[i];

        const nameNode = card.querySelector("div div, .sc-af488da5-0");
        let name = nameNode ? nameNode.textContent.trim() : "";
        name = name.replace(/\s+/g, " ").trim();

        headers.push({
            img: "",   // vacío porque ya no quieres imágenes
            name: name
        });
    }

    return headers;
}




function toCSV(rows, headers) {
    let csv = "";

    // // Fila 0 → imágenes
    // csv += "\t"; // primera celda vacía
    // headers.forEach(h => {
    //     csv += (h.img || "") + "\t";
    // });
    // csv += "\n";

    // Fila 1 → nombres
    csv += "\t";
    headers.forEach(h => {
        csv += (h.name || "") + "\t";
    });
    csv += "\n";

    // Resto de filas → Race Bonus, Fan Bonus, etc.
    rows.forEach(row => {
        csv += row.title + "\t";
        row.values.forEach(v => {
            csv += v + "\t";
        });
        csv += "\n";
    });

    return csv;
}




chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (msg.action === "GET_CSV") {

        const rows = parseBonusBlocks();
        const headers = getSupportHeaders();
        const csv = toCSV(rows, headers);
        sendResponse({ csv });
        
    }
});


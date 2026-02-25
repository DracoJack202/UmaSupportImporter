document.getElementById("copy").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.tabs.sendMessage(tab.id, { action: "GET_CSV" }, (response) => {
        if (!response || !response.csv) {
            alert("No se pudo obtener el CSV");
            return;
        }

        navigator.clipboard.writeText(response.csv)
            .then(() => alert("CSV copiado al portapapeles"))
            .catch(err => alert("Error al copiar: " + err));
    });
});

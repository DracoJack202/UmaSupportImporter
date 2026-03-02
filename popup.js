document.getElementById("copy").addEventListener("click", async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.tabs.sendMessage(tab.id, { action: "GET_CSV" }, (response) => {
        if (!response || !response.csv) {
            alert("Couldn't get the CSV");
            return;
        }

        navigator.clipboard.writeText(response.csv)
            .then(() => alert("CSV copied to clipboard successfully"))
            .catch(err => alert("Error: " + err));
    });
});

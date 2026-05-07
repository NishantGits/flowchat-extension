chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log(request, sender);
  const id = sender.tab.id;
  
  if (request.action == "getSelection") {
    chrome.scripting
      .executeScript({
        target: { tabId: id, allFrames: true },
        func: () => {
          return window.getSelection().toString();
        },
      })
      .then((res) => {
        console.log(res);
        sendResponse({ data: res[0]["result"] });
      });
  } else if (request.action == "writeText") {
    function writeTextToInput(text) {
      const activeElement = document.activeElement;
      if (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA")
      ) {
        activeElement.value = `${activeElement.value}${text}`;

        if (activeElement.tagName === "TEXTAREA") {
          activeElement.scrollTop = activeElement.scrollHeight;
        }
      } else {
        console.warn("No active input or textarea field found.");
      }
    }
    chrome.scripting.executeScript({
      target: { tabId: id, allFrames: true },
      func: writeTextToInput,
      args: [request.text],
    });
    sendResponse({});
  } else if (request.action == "getModels") {
    // Handle getModels API call to avoid CORS issues
    getModels(request.key, request.url)
      .then(models => {
        sendResponse({ success: true, models: models });
      })
      .catch(error => {
        console.log("Background getModels error:", error);
        sendResponse({ success: false, error: error.message });
      });
  } else if (request.action == "getStorage") {
    chrome.storage.local.get()
      .then(result => {
        sendResponse({ success: true, data: result });
      })
      .catch(error => {
        console.log("Error in getStorage:", error);
        sendResponse({ success: false, error: error.message });
      });
  } else if (request.action == "setStorage") {
    chrome.storage.local.set(request.data)
      .then(() => {
        sendResponse({ success: true });
      })
      .catch(error => {
        console.log("Error in setStorage:", error);
        sendResponse({ success: false, error: error.message });
      });
  } else {
    sendResponse({});
  }

  return true;
});

// Helper function to get models from API
async function getModels(key, url) {
  console.log("Background fetching models from:", `${url}/api/models`);
  console.log("Using API key:", key ? "***" : "none");
  
  try {
    const headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    
    if (key) {
      try {
        // Handle API key encoding properly
        const encodedKey = encodeURIComponent(key);
        headers.append("Authorization", `Bearer ${key}`);
      } catch (encodingError) {
        console.log("Background API key encoding error:", encodingError);
        // Fallback: try without special characters
        const cleanKey = key.replace(/[^\x00-\x7F]/g, "");
        headers.append("Authorization", `Bearer ${cleanKey}`);
      }
    }

    const response = await fetch(`${url}/api/models`, {
      method: "GET",
      headers: headers,
    });

    console.log("Response status:", response.status, response.statusText);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.log("Error response:", errorText);
      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const res = await response.json();
    console.log("Raw response:", res);

    // Handle different response formats
    let models = [];
    if (Array.isArray(res)) {
      models = res;
    } else if (res && Array.isArray(res.data)) {
      models = res.data;
    } else if (res && Array.isArray(res.models)) {
      models = res.models;
    } else {
      console.log("Unexpected response format:", res);
      return [];
    }

    models = models
      .filter((model) => model && (model.id || model.name))  // Filter out invalid models
      .sort((a, b) => {
        // Compare case-insensitively
        const nameA = (a.name || a.id || "").toLowerCase();
        const nameB = (b.name || b.id || "").toLowerCase();

        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
        return 0;
      });

    console.log("Processed models:", models);
    return models;
  } catch (err) {
    console.log("Background fetch error:", err);
    throw err;
  }
}

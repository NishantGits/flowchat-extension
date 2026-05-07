console.log('FlowChat extension content script loaded!');

const appDiv = document.createElement("div");
appDiv.id = "extension-app";
document.body.appendChild(appDiv);

function injectCSS(file) {
  const link = document.createElement("link");
  link.href = file;
  link.type = "text/css";
  link.rel = "stylesheet";
  document.getElementsByTagName("head")[0].appendChild(link);
}

// Inject CSS first
injectCSS(chrome.runtime.getURL("extension/dist/style.css"));

// Set up a global storage bridge that the Svelte app can use
window.flowchatStorage = {
  get: async () => {
    try {
      const result = await chrome.storage.local.get();
      return result;
    } catch (error) {
      console.log("Storage get error:", error);
      return {};
    }
  },
  set: async (data) => {
    try {
      await chrome.storage.local.set(data);
      return true;
    } catch (error) {
      console.log("Storage set error:", error);
      return false;
    }
  }
};

// Load the Svelte app
const script = document.createElement('script');
script.src = chrome.runtime.getURL("extension/dist/main.js");
script.onload = function() {
  console.log('Svelte app loaded successfully');
};
document.body.appendChild(script);

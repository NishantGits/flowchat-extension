export const getModels = async (key, url) => {
  console.log("Requesting models from background script:", `${url}/api/models`);
  console.log("Using API key:", key ? "***" : "none");
  
  // Check if chrome.runtime is available (content script limitation)
  if (typeof chrome === 'undefined' || typeof chrome.runtime === 'undefined') {
    console.log("Chrome runtime not available, falling back to direct API call");
    // Fallback to direct API call if chrome.runtime is not available
    const controller = new AbortController();
    let error = null;

    // Create a proper Headers object to handle encoding
    const headers = new Headers();
    headers.append("Content-Type", "application/json");
    
    // Handle API key encoding properly
    if (key) {
      try {
        // Try to encode the API key to handle special characters
        const encodedKey = encodeURIComponent(key);
        headers.append("Authorization", `Bearer ${key}`);
      } catch (encodingError) {
        console.log("API key encoding error:", encodingError);
        // Fallback: try without special characters
        const cleanKey = key.replace(/[^\x00-\x7F]/g, "");
        headers.append("Authorization", `Bearer ${cleanKey}`);
      }
    }

    const res = await fetch(`${url}/api/models`, {
      signal: controller.signal,
      method: "GET",
      headers: headers,
    }).catch((err) => {
      console.log(err);
      error = err;
      return null;
    });

    if (error) {
      throw error;
    }

    if (!res || !res.ok) {
      throw new Error(`HTTP error! status: ${res?.status || 'unknown'}`);
    }

    const data = await res.json();
    console.log("Models received directly:", data);
    return data;
  }
  
  try {
    const response = await chrome.runtime.sendMessage({
      action: "getModels",
      key: key,
      url: url
    });

    if (response && response.success) {
      console.log("Models received from background:", response.models);
      return response.models;
    } else {
      console.log("Background script error:", response?.error || "Unknown error");
      throw new Error(response?.error || "Failed to get models");
    }
  } catch (err) {
    console.log("Error communicating with background script:", err);
    throw err;
  }
};

export const generateOpenAIChatCompletion = async (
  api_key = "",
  body = {},
  url = "https://flowchats.org"
) => {
  const controller = new AbortController();
  let error = null;

  const res = await fetch(`${url}/chat/completions`, {
    signal: controller.signal,
    method: "POST",
    headers: {
      Authorization: `Bearer ${api_key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).catch((err) => {
    console.log(err);
    error = err;
    return null;
  });

  if (error) {
    throw error;
  }

  return [res, controller];
};

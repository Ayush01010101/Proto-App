function generateShortCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

function shortenURL() {
    const originalUrl = document.getElementById('original-url').value;
    
    if (!originalUrl) {
        alert('Please enter a URL');
        return;
    }

    // Validate URL format
    try {
        new URL(originalUrl);
    } catch {
        alert('Please enter a valid URL');
        return;
    }

    const shortCode = generateShortCode();
    const shortUrl = `${window.location.origin}/${shortCode}`;

    // Store in localStorage
    localStorage.setItem(shortCode, originalUrl);

    // Display result
    document.getElementById('short-url-text').textContent = shortUrl;
    document.querySelector('.result').style.display = 'block';
}

function copyToClipboard() {
    const text = document.getElementById('short-url-text').textContent;
    navigator.clipboard.writeText(text).then(() => {
        const copyBtn = document.querySelector('.copy-btn');
        copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
        setTimeout(() => {
            copyBtn.innerHTML = '<i class="fas fa-copy"></i> Copy';
        }, 2000);
    });
}
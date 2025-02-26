async function shortenURL() {
    const originalUrl = document.getElementById('original-url').value;
    const loading = document.getElementById('loading');
    const result = document.getElementById('result');
    const error = document.getElementById('error');

    // Reset states
    error.style.display = 'none';
    result.style.display = 'none';
    
    if (!originalUrl) {
        showError('Please enter a URL');
        return;
    }

    try {
        new URL(originalUrl);
    } catch {
        showError('Please enter a valid URL');
        return;
    }

    loading.style.display = 'block';

    try {
        const response = await fetch(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(originalUrl)}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const shortUrl = await response.text();

        if (shortUrl.startsWith('http')) {
            document.getElementById('short-url-text').textContent = shortUrl;
            document.getElementById('short-url-text').href = shortUrl;
            result.style.display = 'block';
        } else {
            throw new Error('Invalid response from server');
        }
    } catch (error) {
        showError('Failed to shorten URL. Please try again.');
    } finally {
        loading.style.display = 'none';
    }
}

function showError(message) {
    const error = document.getElementById('error');
    document.getElementById('error-text').textContent = message;
    error.style.display = 'flex';
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
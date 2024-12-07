const baseUrl = 'https://my-own-counter-api-production.up.railway.app';

function showLoading() {
    document.getElementById('result').innerHTML = `
        <div class="result-content">
            <i class="fas fa-spinner fa-spin"></i> Processing...
        </div>
    `;
}

function showError(error) {
    document.getElementById('result').innerHTML = `
        <div class="result-content" style="color: var(--error-color)">
            <i class="fas fa-exclamation-circle"></i> ${error}
        </div>
    `;
}

function showSuccess(message) {
    document.getElementById('result').innerHTML = `
        <div class="result-content" style="color: var(--success-color)">
            <i class="fas fa-check-circle"></i> ${message}
        </div>
    `;
}

function createOrIncrementCounter() {
    const namespace = document.getElementById('namespace').value;
    const key = document.getElementById('key').value;
    
    if (!namespace || !key) {
        showError('Please provide both namespace and key');
        return;
    }
    
    showLoading();
    fetch(`${baseUrl}/hit/${namespace}/${key}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(data => {
        showSuccess(`Counter incremented: ${JSON.stringify(data)}`);
    })
    .catch(error => {
        showError(`Error: ${error}`);
    });
}

function getCounterValue() {
    const namespace = document.getElementById('namespace').value;
    const key = document.getElementById('key').value;
    
    if (!namespace || !key) {
        showError('Please provide both namespace and key');
        return;
    }
    
    showLoading();
    fetch(`${baseUrl}/get/${namespace}/${key}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        showSuccess(`Counter value: ${JSON.stringify(data)}`);
    })
    .catch(error => {
        showError(`Error: ${error}`);
    });
}

function setCounterValue() {
    const namespace = document.getElementById('namespace').value;
    const key = document.getElementById('key').value;
    const newValue = document.getElementById('newValue').value;
    
    if (!namespace || !key || !newValue) {
        showError('Please provide namespace, key, and new value');
        return;
    }
    
    showLoading();
    fetch(`${baseUrl}/set/${namespace}/${key}?value=${newValue}`, {
        method: 'PUT'
    })
    .then(response => response.json())
    .then(data => {
        showSuccess(`Counter set: ${JSON.stringify(data)}`);
    })
    .catch(error => {
        showError(`Error: ${error}`);
    });
}

// Theme switcher
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Add event listener when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
});
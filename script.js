(async function() {
    const iframe = document.getElementById('displayFrame');
    const loading = document.getElementById('loading');
    const errorMessage = document.getElementById('errorMessage');
    
    loading.style.display = 'block';
    
    try {
        const { initializeApp } = await import('https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js');
        const { getDatabase, ref, get } = await import('https://www.gstatic.com/firebasejs/12.10.0/firebase-database.js');
        
        const firebaseConfig = {
            apiKey: "AIzaSyBMGvF7UJyzIWtIEXreIac3-MrzNBneRUI",
            authDomain: "security-4e69d.firebaseapp.com",
            projectId: "security-4e69d",
            databaseURL: "https://security-4e69d-default-rtdb.firebaseio.com/",
            storageBucket: "security-4e69d.firebasestorage.app",
            messagingSenderId: "600508685606",
            appId: "1:600508685606:web:aada3ec7b20678a2f1f5e7"
        };
        
        const app = initializeApp(firebaseConfig);
        const db = getDatabase(app);
        
        const snapshot = await get(ref(db, 'display/url'));
        const url = snapshot.val();
        
        loading.style.display = 'none';
        
        if (url) {
            try {
                new URL(url);
                iframe.src = url;
            } catch (e) {
                iframe.src = 'about:blank';
                errorMessage.style.display = 'block';
                errorMessage.textContent = 'Invalid URL: ' + url;
                addReloadButton();
            }
        } else {
            iframe.src = 'about:blank';
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'No URL saved';
            addReloadButton();
        }
        
    } catch (error) {
        console.error('Firebase error:', error);
        loading.style.display = 'none';
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Connection error';
        addReloadButton();
    }
    
    function addReloadButton() {
        const btn = document.createElement('button');
        btn.textContent = 'Reload';
        btn.onclick = () => window.location.reload();
        errorMessage.appendChild(btn);
    }
})();
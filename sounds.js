const bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.30;
const clickSoundEl = document.getElementById('clickSound');
const soundToggle = document.getElementById('soundToggle');
let soundEnabled = localStorage.getItem('soundEnabled') === 'true';
let isNavigating = false;

function updateUI() {
    soundToggle.classList.toggle('muted', !soundEnabled);
}

soundToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', soundEnabled);
    updateUI();
    if (soundEnabled) bgMusic.play().catch(() => {});
    else bgMusic.pause();
});

// === SPA Navigation ===
var pageCSS = [];
var app = document.getElementById('app');

app.style.transition = 'opacity 0.15s ease';

function getPageCSS(doc) {
    return Array.from(doc.querySelectorAll('link[rel="stylesheet"]'))
        .map(function(l) { return l.getAttribute('href'); })
        .filter(function(h) { return h && h !== 'style.css'; });
}

function swapCSS(newCSS) {
    pageCSS.forEach(function(href) {
        var el = document.querySelector('link[href="' + href + '"]');
        if (el) el.remove();
    });
    pageCSS = newCSS;
    newCSS.forEach(function(href) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        document.head.appendChild(link);
    });
}

function reexecScripts(container) {
    var scripts = container.querySelectorAll('script');
    scripts.forEach(function(old) {
        var s = document.createElement('script');
        if (old.src) { s.src = old.src; }
        else { s.textContent = old.textContent; }
        old.parentNode.replaceChild(s, old);
    });
}

function navigateTo(url, pushState) {
    if (isNavigating) return;
    isNavigating = true;
    if (pushState === undefined) pushState = true;

    app.style.opacity = '0';

    setTimeout(function() {
        fetch(url).then(function(r) { return r.text(); }).then(function(html) {
            var doc = new DOMParser().parseFromString(html, 'text/html');

            if (window.canvasInterval) { clearInterval(window.canvasInterval); window.canvasInterval = null; }

            var newApp = doc.getElementById('app');
            if (newApp && app) {
                app.innerHTML = newApp.innerHTML;
                reexecScripts(app);
            }

            swapCSS(getPageCSS(doc));
            document.body.className = doc.body.className;
            document.title = doc.title;
            if (pushState) history.pushState({}, '', url);

            if (document.getElementById('codeBackground') && typeof initCanvas === 'function') {
                initCanvas();
            }

            app.style.opacity = '1';
            isNavigating = false;
        }).catch(function() {
            app.style.opacity = '1';
            isNavigating = false;
        });
    }, 150);
}

document.addEventListener('click', function(e) {
    var link = e.target.closest('a[href]');
    if (!link || link.closest('.sound-box')) return;

    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#' || href.startsWith('http') || href.startsWith('mailto:') || /\.(pdf|svg|mp3|png|jpg|jpeg|gif|css|js)$/i.test(href)) return;

    e.preventDefault();
    navigateTo(href);
});

window.addEventListener('popstate', function() {
    if (!isNavigating) navigateTo(location.href, false);
});

updateUI();
if (soundEnabled) bgMusic.play().catch(() => {});
pageCSS = getPageCSS(document);

document.getElementById('loginForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            let isValid = true;
            
            // Clear previous errors
            document.getElementById('username-error').style.display = 'none';
            document.getElementById('password-error').style.display = 'none';
            document.getElementById('username').classList.remove('invalid', 'valid');
            document.getElementById('password').classList.remove('invalid', 'valid');
            
        
            if (username.length < 4) {
                document.getElementById('username-error').textContent = 'Username must be at least 4 characters long';
                document.getElementById('username-error').style.display = 'block';
                document.getElementById('username').classList.add('invalid');
                isValid = false;
            }
            
           
            if (password.length < 8) {
                document.getElementById('password-error').textContent = 'Password must be at least 8 characters long';
                document.getElementById('password-error').style.display = 'block';
                document.getElementById('password').classList.add('invalid');
                isValid = false;
            }
            
            
            if (isValid) {
                if (username !== 'admin' || password !== 'password') {
                    document.getElementById('password-error').textContent = 'Invalid username or password';
                    document.getElementById('password-error').style.display = 'block';
                    document.getElementById('username').classList.add('invalid');
                    document.getElementById('password').classList.add('invalid');
                    isValid = false;
                }
            }
            
            if (isValid) {
            
                document.getElementById('username').classList.add('valid');
                document.getElementById('password').classList.add('valid');
                
                // Hide login page, show home page
                document.getElementById('login-page').style.display = 'none';
                document.getElementById('home-page').style.display = 'block';
                
                // Store login state
                localStorage.setItem('isLoggedIn', 'true');
                
                // Update URL hash
                window.location.hash = '#home-page';

                // Show success toast
                showToast('Login successful. Welcome, ' + (document.getElementById('username').value || 'User') + '!');
            }
        });
        
        // Password visibility toggle
        document.getElementById('password-toggle').addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? 'Show' : 'Hide';
        });
        
        // Real-time validation
        document.getElementById('username').addEventListener('input', function() {
            if (this.value.length >= 4) {
                this.classList.remove('invalid');
                this.classList.add('valid');
                document.getElementById('username-error').style.display = 'none';
            } else {
                this.classList.remove('valid');
            }
        });
        
        document.getElementById('password').addEventListener('input', function() {
            if (this.value.length >= 8) {
                this.classList.remove('invalid');
                this.classList.add('valid');
                document.getElementById('password-error').style.display = 'none';
            } else {
                this.classList.remove('valid');
            }
        });
        
        // Logout functionality
        document.addEventListener('click', function(e) {
            if (e.target.id === 'logout-link' || e.target.hasAttribute('data-logout')) {
                e.preventDefault();
                localStorage.removeItem('isLoggedIn');
                document.querySelectorAll('[id$="-page"]').forEach(page => {
                    page.style.display = 'none';
                });
                document.getElementById('login-page').style.display = 'block';
                window.location.hash = '#login-page';
            }
        });
        
        // Date and Time Display
        function updateDateTime() {
            const now = new Date();
            const options = { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            };
            document.getElementById('current-date-time').textContent = now.toLocaleDateString('en-US', options);
        }
        
        setInterval(updateDateTime, 1000);
        updateDateTime();
        
        // Image Slideshow with Smooth Rotation
        let slideIndex = 0;
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        
        function showSlides() {
            // Remove active class from all slides
            for (let i = 0; i < slides.length; i++) {
                slides[i].classList.remove("active", "prev");
                slides[i].style.display = "none";
            }
            
            // Remove active class from all dots
            for (let i = 0; i < dots.length; i++) {
                dots[i].classList.remove("active");
            }
            
            // Move to next slide
            slideIndex++;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            
            // Show current slide with smooth transition
            if (slides[slideIndex-1]) {
                slides[slideIndex-1].style.display = "block";
                // Small delay to ensure display is set before adding active class
                setTimeout(() => {
                    slides[slideIndex-1].classList.add("active");
                }, 10);
                dots[slideIndex-1].classList.add("active");
            }
            
            setTimeout(showSlides, 4000); // Change image every 4 seconds
        }
        
        function plusSlides(n) {
            slideIndex += n;
            if (slideIndex > slides.length) {
                slideIndex = 1;
            }
            if (slideIndex < 1) {
                slideIndex = slides.length;
            }
            showSlides();
        }
        
        function currentSlide(n) {
            slideIndex = n;
            showSlides();
        }
        

        showSlides();
        
    
        let isNavigating = false;
        
        function showPageFromHash() {
            if (isNavigating) return;
            isNavigating = true;
            
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const hash = window.location.hash.replace('#', '');
            
         
            if (!isLoggedIn) {
                document.querySelectorAll('[id$="-page"]').forEach(page => {
                    page.style.display = 'none';
                });
                document.getElementById('login-page').style.display = 'block';
                isNavigating = false;
                return;
            }
            
            
            let targetPage = hash || 'home-page';
            
         
            if (!targetPage.endsWith('-page')) {
                targetPage = targetPage + '-page';
            }
            
        
            document.querySelectorAll('[id$="-page"]').forEach(page => {
                page.style.display = 'none';
            });
            
            // Show the target page if it exists, otherwise show home page
            const targetElement = document.getElementById(targetPage);
            if (targetElement) {
                targetElement.style.display = 'block';
                // Update hash if it doesn't match
                if (window.location.hash !== '#' + targetPage) {
                    window.location.hash = '#' + targetPage;
                }
            } else {
                document.getElementById('home-page').style.display = 'block';
                window.location.hash = '#home-page';
            }
            
            isNavigating = false;
        }

        // Clear any existing login state on page load
        window.addEventListener('load', function() {
            // Clear any existing login state to ensure fresh start
            localStorage.removeItem('isLoggedIn');
            // Show login page by default
            document.querySelectorAll('[id$="-page"]').forEach(page => {
                page.style.display = 'none';
            });
            document.getElementById('login-page').style.display = 'block';
        });

        window.addEventListener('hashchange', showPageFromHash);

        // Enhanced navigation link handling with better stability
        document.addEventListener('click', function(e) {
            // Handle navigation links
            if (e.target.matches('.nav-links a, .dropdown-content a, .back-button')) {
                const href = e.target.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Prevent rapid clicking
                    if (isNavigating) return;
                    
                    // Update hash and trigger navigation
                    const newHash = href;
                    if (window.location.hash !== newHash) {
                        window.location.hash = newHash;
                    }
                }
            }
            
            // Handle dropdown clicks
            if (e.target.matches('.dropdown > a')) {
                e.preventDefault();
                e.stopPropagation();
                
                const dropdown = e.target.parentElement;
                const isActive = dropdown.classList.contains('active');
                
                // Close all other dropdowns
                document.querySelectorAll('.dropdown.active').forEach(d => {
                    if (d !== dropdown) {
                        d.classList.remove('active');
                    }
                });
                
                // Toggle current dropdown
                dropdown.classList.toggle('active', !isActive);
            }
            
            // Close dropdowns when clicking outside
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown.active').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });

        // Vue 3 Widget
        (function() {
            if (document.getElementById('vue-widget')) {
                const { createApp, ref, computed } = Vue;
                createApp({
                    setup() {
                        const name = ref('Emmanuel');
                        const count = ref(0);
                        const greeting = computed(() => `Hello, ${name.value}!`);
                        function increment() { count.value += 1; }
                        function decrement() { count.value -= 1; }
                        return { name, count, greeting, increment, decrement };
                    },
                    template: `
                        <div>
                            <h3 class="widget-title">Vue 3 Interactive Widget</h3>
                            <label style="display:block;margin-bottom:15px;">
                                Your name:
                                <input v-model="name" style="margin-left:8px;padding:8px;border:1px solid #ddd;border-radius:4px;width:200px;" />
                            </label>
                            <p style="margin:15px 0;font-size:1.1rem;">{{ greeting }}</p>
                            <div style="display:flex;align-items:center;gap:15px;margin-top:15px;">
                                <button @click="decrement" style="padding:10px 15px;background:#e74c3c;color:#fff;border:none;border-radius:4px;cursor:pointer;">-</button>
                                <strong style="font-size:1.2rem;">{{ count }}</strong>
                                <button @click="increment" style="padding:10px 15px;background:#27ae60;color:#fff;border:none;border-radius:4px;cursor:pointer;">+</button>
                            </div>
                        </div>
                    `
                }).mount('#vue-widget');
            }
        })();

        // React 18 Widget
        (function() {
            const reactMount = document.getElementById('react-widget');
            if (reactMount && window.React && window.ReactDOM) {
                const e = React.createElement;
                function LikeButton() {
                    const [likes, setLikes] = React.useState(0);
                    const [liked, setLiked] = React.useState(false);
                    return e(
                        'div',
                        null,
                        e('h3', { className: 'widget-title' }, 'React 18 Interactive Widget'),
                        e('p', null, liked ? 'You like this portfolio!' : 'Do you like this portfolio?'),
                        e('div', { style: { display: 'flex', alignItems: 'center', gap: '15px', marginTop: '15px' } },
                            e('button', {
                                onClick: () => setLiked(!liked),
                                style: { padding: '10px 15px', background: '#3498db', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
                            }, liked ? 'Unlike' : 'Like'),
                            e('button', {
                                onClick: () => setLikes(likes + 1),
                                style: { padding: '10px 15px', background: '#27ae60', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
                            }, `Appreciate (${likes})`)
                        )
                    );
                }
                const root = ReactDOM.createRoot(reactMount);
                root.render(e(LikeButton));
            }
        })();

        // Toast helper
        function showToast(message, options = {}) {
            const toast = document.getElementById('toast');
            if (!toast) return;
            toast.textContent = message;
            toast.classList.add('show');
            const durationMs = options.durationMs || 2500;
            clearTimeout(showToast._timer);
            showToast._timer = setTimeout(() => {
                toast.classList.remove('show');
            }, durationMs);
        }

        // Download Manager with progress
        const activeDownloads = new Map();
        function ensureDownloadUIVisible() {
            const mgr = document.getElementById('download-manager');
            if (!mgr) return;
            mgr.classList.toggle('active', activeDownloads.size > 0);
            if (activeDownloads.size === 0) mgr.innerHTML = '';
        }
        function renderDownloadItem(id, title) {
            const mgr = document.getElementById('download-manager');
            if (!mgr) return;
            const wrapper = document.createElement('div');
            wrapper.className = 'download-item';
            wrapper.id = `dl-${id}`;
            wrapper.innerHTML = `
                <div class="download-title" title="${title}">${title}</div>
                <div class="progress-bar"><div class="progress-fill" style="width:0%"></div></div>
                <div class="download-actions">
                    <span class="download-status">Starting...</span>
                    <button class="download-cancel" data-cancel="${id}">Cancel</button>
                </div>
            `;
            mgr.appendChild(wrapper);
            ensureDownloadUIVisible();
            return wrapper;
        }
        function updateDownloadItem(id, percent, statusText) {
            const item = document.getElementById(`dl-${id}`);
            if (!item) return;
            const fill = item.querySelector('.progress-fill');
            if (fill && typeof percent === 'number') fill.style.width = Math.max(0, Math.min(100, percent)) + '%';
            const status = item.querySelector('.download-status');
            if (status && statusText) status.textContent = statusText;
        }
        function removeDownloadItem(id) {
            const item = document.getElementById(`dl-${id}`);
            if (item && item.parentElement) item.parentElement.removeChild(item);
            activeDownloads.delete(id);
            ensureDownloadUIVisible();
        }
        
        async function downloadFile(url, suggestedName) {
            const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
            const title = suggestedName || url.split('/').pop() || 'download';
            const ui = renderDownloadItem(id, title);
            let controller;
            try {
                controller = new AbortController();
                activeDownloads.set(id, controller);
                const res = await fetch(url, { signal: controller.signal });
                if (!res.ok) throw new Error('Network error: ' + res.status);
                const contentLength = parseInt(res.headers.get('Content-Length') || '0', 10);
                const reader = res.body && res.body.getReader ? res.body.getReader() : null;
                const chunks = [];
                let received = 0;
                if (reader) {
                    updateDownloadItem(id, 0, 'Downloading...');
                    while (true) {
                        const { done, value } = await reader.read();
                        if (done) break;
                        chunks.push(value);
                        received += value.byteLength;
                        if (contentLength) {
                            updateDownloadItem(id, (received / contentLength) * 100, `${Math.floor((received / contentLength) * 100)}%`);
                        } else {
                            updateDownloadItem(id, Math.min(99, (received % (1024 * 1024)) / (1024 * 10)), `${(received / (1024*1024)).toFixed(1)} MB`);
                        }
                    }
                    const blob = new Blob(chunks);
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = title;
                    document.body.appendChild(link);
                    link.click();
                    URL.revokeObjectURL(link.href);
                    link.remove();
                } else {
                    // Fallback: no streams support
                    updateDownloadItem(id, 0, 'Preparing file...');
                    const blob = await res.blob();
                    const link = document.createElement('a');
                    link.href = URL.createObjectURL(blob);
                    link.download = title;
                    document.body.appendChild(link);
                    link.click();
                    URL.revokeObjectURL(link.href);
                    link.remove();
                }
                updateDownloadItem(id, 100, 'Completed');
                setTimeout(() => removeDownloadItem(id), 1200);
                showToast('Download completed: ' + title, { durationMs: 2000 });
            } catch (err) {
                if (controller && controller.signal.aborted) {
                    updateDownloadItem(id, undefined, 'Cancelled');
                } else {
                    updateDownloadItem(id, undefined, 'Failed');
                    showToast('Download failed. Please try again.', { durationMs: 2500 });
                }
                setTimeout(() => removeDownloadItem(id), 1200);
            }
        }

        // Cancel button for downloads
        document.addEventListener('click', function(e) {
            const cancelId = e.target && e.target.getAttribute && e.target.getAttribute('data-cancel');
            if (cancelId && activeDownloads.has(cancelId)) {
                const controller = activeDownloads.get(cancelId);
                controller.abort();
                removeDownloadItem(cancelId);
            }
        });

        // Intercept data-download clicks
        document.addEventListener('click', function(e) {
            const downloadEl = e.target.closest('[data-download]');
            if (downloadEl) {
                const url = downloadEl.getAttribute('data-download') || downloadEl.getAttribute('href');
                const filename = (downloadEl.getAttribute('download') || '') || (url && url.split('/').pop());
                if (url) {
                    e.preventDefault();
                    downloadFile(url, filename);
                }
            }
        });

        // Image loading debug helper
        function debugImageLoading() {
            const images = document.querySelectorAll('img[src]');
            images.forEach((img, index) => {
                console.log(`Image ${index + 1}:`, {
                    src: img.src,
                    alt: img.alt,
                    complete: img.complete,
                    naturalWidth: img.naturalWidth,
                    naturalHeight: img.naturalHeight
                });
                
                img.addEventListener('load', function() {
                    console.log(`✅ Image loaded successfully: ${this.src}`);
                });
                
                img.addEventListener('error', function() {
                    console.error(`❌ Image failed to load: ${this.src}`);
                    console.error('Possible issues:');
                    console.error('1. File path is incorrect');
                    console.error('2. File does not exist');
                    console.error('3. File name has special characters');
                    console.error('4. File is in wrong folder');
                    console.error('5. File extension is wrong');
                    
                    // Show user-friendly error
                    this.style.border = '2px solid #dc3545';
                    this.style.background = '#f8d7da';
                    this.title = 'Image not found: ' + this.src;
                });
            });
        }

        // Run image debug on page load
        window.addEventListener('load', function() {
            setTimeout(debugImageLoading, 1000);
        });
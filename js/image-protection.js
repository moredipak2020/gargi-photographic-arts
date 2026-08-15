// ==========================================================================
// GARGI PHOTOGRAPHIC ARTS - DIGITAL RIGHTS MANAGEMENT (DRM) & PROTECTION SUITE
// Protects photography against right-click, drag, PrintScreen, snipping, & shortcuts
// ==========================================================================

(function() {
  'use strict';

  // 1. Toast Notification Manager for Protected Actions
  let toastTimeout = null;

  function showProtectionToast(message) {
    let toast = document.getElementById('drmProtectionToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'drmProtectionToast';
      toast.className = 'drm-toast';
      document.body.appendChild(toast);
    }

    toast.innerHTML = `
      <div class="drm-toast-icon">🔒</div>
      <div class="drm-toast-content">
        <div class="drm-toast-title">Protected by Copyright</div>
        <div class="drm-toast-desc">${message || 'Gargi Photographic Arts — Unauthorized saving and captures are disabled.'}</div>
      </div>
    `;

    toast.classList.add('visible');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toast.classList.remove('visible');
    }, 2800);
  }

  // 2. Lock Context Menu (Right Click) on Images & Visual Canvas
  function initContextMenuGuard() {
    document.addEventListener('contextmenu', function(e) {
      const target = e.target;
      const isProtectedElement = 
        target.tagName === 'IMG' || 
        target.tagName === 'VIDEO' ||
        target.closest('.gallery-card') || 
        target.closest('.lightbox-media') || 
        target.closest('.category-tile') ||
        target.closest('.museum-frame-card') ||
        target.closest('.hero');

      if (isProtectedElement) {
        e.preventDefault();
        e.stopPropagation();
        showProtectionToast('Right-click saving is disabled on all high-resolution photography.');
        return false;
      }
    }, { capture: true });
  }

  // 3. Lock Image Drag & Drop
  function initDragDropGuard() {
    document.addEventListener('dragstart', function(e) {
      if (e.target.tagName === 'IMG' || e.target.closest('.gallery-card') || e.target.closest('.lightbox-media')) {
        e.preventDefault();
        return false;
      }
    }, { capture: true });

    // Set draggable=false on all existing and dynamically inserted images
    const applyNoDrag = () => {
      document.querySelectorAll('img').forEach(img => {
        img.setAttribute('draggable', 'false');
        img.setAttribute('oncontextmenu', 'return false;');
      });
    };

    applyNoDrag();
    const observer = new MutationObserver(applyNoDrag);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // 4. Keyboard Shortcut Interceptor (Ctrl+S, Ctrl+P, Ctrl+U, F12, DevTools)
  function initKeyboardGuard() {
    document.addEventListener('keydown', function(e) {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const key = (e.key || '').toLowerCase();

      // Block Ctrl+S (Save Page)
      if (isCtrlOrCmd && key === 's') {
        e.preventDefault();
        e.stopPropagation();
        showProtectionToast('Page and asset saving is disabled.');
        return false;
      }

      // Block Ctrl+P (Print to PDF / Paper)
      if (isCtrlOrCmd && key === 'p') {
        e.preventDefault();
        e.stopPropagation();
        showProtectionToast('Printing and PDF export are disabled for photographic assets.');
        return false;
      }

      // Block Ctrl+U (View Source)
      if (isCtrlOrCmd && key === 'u') {
        e.preventDefault();
        e.stopPropagation();
        showProtectionToast('Source inspection is restricted.');
        return false;
      }

      // Block F12 and Ctrl+Shift+I / J / C (Developer Tools)
      if (
        e.keyCode === 123 || // F12
        (isCtrlOrCmd && e.shiftKey && (key === 'i' || key === 'j' || key === 'c'))
      ) {
        e.preventDefault();
        e.stopPropagation();
        showProtectionToast('Developer Tools inspection is restricted on master gallery pages.');
        return false;
      }
    }, { capture: true });
  }

  // 5. Snipping Tool & Screenshot Mitigation (Window Blur Shield)
  function initSnippingShield() {
    let shield = document.getElementById('antiSnipShield');
    if (!shield) {
      shield = document.createElement('div');
      shield.id = 'antiSnipShield';
      shield.className = 'anti-snip-shield';
      shield.innerHTML = `
        <div class="anti-snip-content">
          <div class="anti-snip-badge">🔒 GARGI PHOTOGRAPHIC ARTS</div>
          <h2>Master Visual Asset Protected</h2>
          <p>Click back onto the window to resume viewing high-resolution gallery collections.</p>
        </div>
      `;
      document.body.appendChild(shield);
    }

    // When OS window loses focus (e.g. Snipping tool, Win+Shift+S, Alt-Tab), activate blur shield
    window.addEventListener('blur', function() {
      shield.classList.add('active');
      document.body.classList.add('anti-snip-active');
    });

    // When user refocuses the window, dismiss shield
    window.addEventListener('focus', function() {
      shield.classList.remove('active');
      document.body.classList.remove('anti-snip-active');
    });
  }

  // 6. PrintScreen Key Clipboard Eraser Guard
  function initPrintScreenGuard() {
    window.addEventListener('keyup', function(e) {
      if (e.key === 'PrintScreen' || e.keyCode === 44) {
        // Overwrite system clipboard to invalidate captured image data
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('© Gargi Photographic Arts (Dipak More). All master photography is protected under international copyright law. Unauthorized copying is prohibited.').catch(() => {});
        }
        showProtectionToast('Screen capture detected. Clipboard asset has been protected.');
      }
    });
  }

  // Initialize Protection Suite on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initContextMenuGuard();
      initDragDropGuard();
      initKeyboardGuard();
      initSnippingShield();
      initPrintScreenGuard();
    });
  } else {
    initContextMenuGuard();
    initDragDropGuard();
    initKeyboardGuard();
    initSnippingShield();
    initPrintScreenGuard();
  }

})();

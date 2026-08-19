// ==========================================================================
// GARGI PHOTOGRAPHIC ARTS - DIGITAL RIGHTS MANAGEMENT (DRM) & PROTECTION SUITE
// Advanced Screenshot/Snipping Lock, PrintScreen Blackout, Clipboard Eraser & DRM
// ==========================================================================

(function() {
  'use strict';

  let toastTimeout = null;
  let blackoutTimer = null;
  let isCaptureLocked = false;

  // 1. Luxury Gold Toast Notification Manager
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
    }, 2500);
  }

  // 2. Blackout Protection Shield Manager
  function getOrCreateBlackoutShield() {
    let shield = document.getElementById('antiSnipShield');
    if (!shield) {
      shield = document.createElement('div');
      shield.id = 'antiSnipShield';
      shield.className = 'anti-snip-shield';
      shield.innerHTML = `
        <div class="anti-snip-content">
          <div class="anti-snip-badge">🔒 GARGI PHOTOGRAPHIC ARTS</div>
          <h2>Master Visual Asset Protected</h2>
          <p>Photography is protected under international copyright law. Screen captures and saving are restricted.</p>
        </div>
      `;
      document.body.appendChild(shield);
    }
    return shield;
  }

  function wipeClipboard() {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText('© Gargi Photographic Arts (Dipak More). All master photography is protected under international copyright law. Unauthorized copying is prohibited.').catch(() => {});
      }
    } catch (e) {}
  }

  function activateBlackoutShield(durationMs = 0) {
    const shield = getOrCreateBlackoutShield();
    shield.classList.add('active');
    document.documentElement.classList.add('drm-defocused-guard');
    document.body.classList.add('anti-snip-active');

    // Wipe clipboard memory immediately to discard any captured bitmap
    wipeClipboard();

    if (durationMs > 0) {
      isCaptureLocked = true;
      if (blackoutTimer) clearTimeout(blackoutTimer);
      
      // Sanitizer interval to repeatedly overwrite clipboard if OS is asynchronous
      const clipboardSanitizer = setInterval(wipeClipboard, 150);
      
      blackoutTimer = setTimeout(() => {
        clearInterval(clipboardSanitizer);
        isCaptureLocked = false;
        dismissBlackoutShield();
      }, durationMs);
    }
  }

  function dismissBlackoutShield() {
    // CRITICAL: DO NOT DISMISS if capture lock is active or window is blurred/defocused
    if (isCaptureLocked) return;
    if (!document.hasFocus() || document.hidden) return;

    const shield = document.getElementById('antiSnipShield');
    if (shield) {
      shield.classList.remove('active');
    }
    document.documentElement.classList.remove('drm-defocused-guard');
    document.body.classList.remove('anti-snip-active');
  }

  // 3. Global Context Menu (Right Click) Lock on all Photographic Assets
  function initContextMenuGuard() {
    document.addEventListener('contextmenu', function(e) {
      const target = e.target;
      const isProtectedElement = 
        target.tagName === 'IMG' || 
        target.tagName === 'VIDEO' ||
        target.closest('.gallery-card') || 
        target.closest('.museum-frame-card') ||
        target.closest('.lightbox-media') || 
        target.closest('.category-tile') ||
        target.closest('.hero') ||
        target.closest('.gallery-img-wrapper') ||
        target.closest('.gallery-grid') ||
        target.closest('#kidsFramesGrid') ||
        target.closest('#weddingsGrid');

      if (isProtectedElement) {
        e.preventDefault();
        e.stopPropagation();
        showProtectionToast('Right-click saving is disabled on all high-resolution photography.');
        return false;
      }
    }, { capture: true });
  }

  // 4. Global Drag & Drop Lock
  function initDragDropGuard() {
    document.addEventListener('dragstart', function(e) {
      if (e.target.tagName === 'IMG' || e.target.closest('.gallery-card') || e.target.closest('.museum-frame-card') || e.target.closest('.lightbox-media')) {
        e.preventDefault();
        return false;
      }
    }, { capture: true });

    const applyNoDrag = () => {
      document.querySelectorAll('img, video, .gallery-card, .museum-frame-card').forEach(el => {
        el.setAttribute('draggable', 'false');
        el.setAttribute('oncontextmenu', 'return false;');
      });
    };

    applyNoDrag();
    const observer = new MutationObserver(applyNoDrag);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // 5. Intelligent Keyboard & Snipping Tool Interceptor
  function initKeyboardAndSnippingGuard() {
    // A. Detect PrintScreen Key (keydown & keyup)
    window.addEventListener('keydown', function(e) {
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      const key = (e.key || '').toLowerCase();
      const code = e.code || '';

      // PrintScreen Key -> Instant Blackout + Clipboard Wipe
      if (e.key === 'PrintScreen' || code === 'PrintScreen' || e.keyCode === 44) {
        activateBlackoutShield(3000);
        showProtectionToast('Screen capture locked. Clipboard asset has been protected.');
        return false;
      }

      // Windows Snipping Tool (Win + Shift + S) or Browser Snipping
      if ((e.shiftKey && (isCtrlOrCmd || e.key === 'Meta' || code.includes('Meta'))) || (isCtrlOrCmd && e.shiftKey && key === 's')) {
        activateBlackoutShield(3000);
        showProtectionToast('Snipping tool detected. High-resolution screen protected.');
        return false;
      }

      // Block Ctrl+S (Save Page / Asset)
      if (isCtrlOrCmd && key === 's') {
        e.preventDefault();
        showProtectionToast('Page and asset saving is disabled.');
        return false;
      }

      // Block Ctrl+P (Print to PDF / Paper)
      if (isCtrlOrCmd && key === 'p') {
        e.preventDefault();
        activateBlackoutShield(3000);
        showProtectionToast('Printing and PDF export are disabled for photographic assets.');
        return false;
      }

      // Block Ctrl+U (View Source)
      if (isCtrlOrCmd && key === 'u') {
        e.preventDefault();
        showProtectionToast('Source inspection is restricted.');
        return false;
      }

      // Block F12 and Ctrl+Shift+I / J / C (DevTools)
      if (
        e.keyCode === 123 ||
        (isCtrlOrCmd && e.shiftKey && (key === 'i' || key === 'j' || key === 'c'))
      ) {
        e.preventDefault();
        showProtectionToast('Developer Tools inspection is restricted on master gallery pages.');
        return false;
      }
    }, { capture: true });

    window.addEventListener('keyup', function(e) {
      const code = e.code || '';
      if (e.key === 'PrintScreen' || code === 'PrintScreen' || e.keyCode === 44) {
        activateBlackoutShield(3000);
        showProtectionToast('Screen capture locked. Clipboard asset has been protected.');
      }
    }, { capture: true });

    // B. Airtight Snipping Tool Interception:
    // When Snipping Tool takes focus away from the browser (Win+Shift+S or Start Menu snip),
    // activate blackout shield. It CANNOT be dismissed until document.hasFocus() is true!
    window.addEventListener('blur', function() {
      activateBlackoutShield(0);
    });

    // When user returns/refocuses, dismiss blackout smoothly only if document has focus and no active lock
    window.addEventListener('focus', function() {
      setTimeout(() => {
        if (!isCaptureLocked && document.hasFocus() && !document.hidden) {
          dismissBlackoutShield();
        }
      }, 300);
    });

    // Mouse movement or click inside the window dismisses the shield ONLY if window is focused and no active lock
    window.addEventListener('mousemove', function() {
      if (!isCaptureLocked && document.hasFocus() && !document.hidden) {
        dismissBlackoutShield();
      }
    }, { passive: true });

    window.addEventListener('mousedown', function() {
      if (!isCaptureLocked && document.hasFocus() && !document.hidden) {
        dismissBlackoutShield();
      }
    }, { passive: true });

    // Document visibility change (tab switch / screen clipping)
    document.addEventListener('visibilitychange', function() {
      if (document.hidden || !document.hasFocus()) {
        activateBlackoutShield(0);
      } else if (!isCaptureLocked) {
        dismissBlackoutShield();
      }
    });
  }

  // Initialize DRM Protection Suite on DOM Ready
  function init() {
    initContextMenuGuard();
    initDragDropGuard();
    initKeyboardAndSnippingGuard();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();

// public/js/blockSwitch.js
(function (window) {
  // Send block/unblock request and return { ok, data }
  async function sendBlockRequest(type, id, action, reason = "") {
    const url = `/${type}s/${action}/${id}`;
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const data = await res.json().catch(() => ({}));
      return { ok: res.ok, status: res.status, data };
    } catch (err) {
      return { ok: false, data: { error: err.message } };
    }
  }

  window.handleBlockSwitch = function (type, id, switchEl, isChecked) {
    // isChecked true => Active (unblocked). false => Blocked
    if (!switchEl) return;
    const label = switchEl
      .closest(".form-check")
      ?.querySelector(".form-check-label");

    if (!isChecked) {
      // Blocking: ask for reason via modal
      openConfirmModal({
        title: `Block ${type}`,
        text: `Are you sure you want to block this ${type}?`,
        showReason: true,
        onConfirm: async (reason) => {
          const result = await sendBlockRequest(type, id, "block", reason);
          if (result.ok && result.data.success) {
            if (label) label.textContent = "Blocked";
            return { success: true };
          } else {
            // revert switch
            switchEl.checked = true;
            return {
              success: false,
              error: result.data.error || "Failed to block",
            };
          }
        },
      });
    } else {
      // Unblocking: immediate (no reason)
      (async () => {
        const result = await sendBlockRequest(type, id, "unblock", "");
        if (result.ok && result.data.success) {
          if (label) label.textContent = "Active";
        } else {
          alert(result.data.error || "Failed to unblock");
          switchEl.checked = false; // revert
        }
      })();
    }
  };

  // helper to init switches on page load
  window.initBlockSwitches = function (
    selector = ".user-block-switch, .post-block-switch"
  ) {
    document.querySelectorAll(selector).forEach((s) => {
      s.addEventListener("change", (ev) => {
        const checked = ev.target.checked;
        const type = s.classList.contains("post-block-switch")
          ? "post"
          : "user";
        handleBlockSwitch(type, s.dataset.id, s, checked);
      });
    });
  };

  // auto-init when DOM ready
  document.addEventListener("DOMContentLoaded", () => {
    initBlockSwitches();
  });
})(window);

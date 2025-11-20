// public/js/notifications.js
(function (window) {
  async function markRead(url, rowId, btnEl) {
    try {
      const res = await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        const row = document.getElementById(rowId);
        if (row) {
          const readCell = row.querySelector("[data-read-cell]");
          if (readCell) readCell.innerText = "Yes";
        }
        if (btnEl) btnEl.remove();
      } else {
        alert(data.error || "Failed");
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  function initMarkReadButtons() {
    document.querySelectorAll(".mark-read-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        markRead(btn.dataset.url, btn.dataset.rowId, btn);
      });
    });
  }

  // attach delete buttons (uses deleteModal's global deleteResource)
  function initDeleteButtons() {
    document.querySelectorAll("button[data-delete-url]").forEach((btn) => {
      btn.addEventListener("click", () => {
        openConfirmModal({
          title: "Delete",
          text: "Are you sure?",
          showReason: false,
          onConfirm: async (reason) => {
            return deleteResource(
              btn.dataset.deleteUrl,
              btn.dataset.rowId,
              reason
            );
          },
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initMarkReadButtons();
    initDeleteButtons();
  });
})(window);

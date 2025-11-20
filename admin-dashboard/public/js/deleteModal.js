// public/js/deleteModal.js
(function (window) {
  const confirmModalEl = document.getElementById("confirmActionModal");
  if (!confirmModalEl) return;
  const confirmModal = new bootstrap.Modal(confirmModalEl);
  const confirmText = document.getElementById("confirmActionText");
  const reasonWrap = document.getElementById("confirmReasonWrap");
  const reasonInput = document.getElementById("confirmReason");
  const confirmBtn = document.getElementById("confirmActionBtn");
  const confirmLabel = document.getElementById("confirmActionLabel");

  let _onConfirm = null;

  window.openConfirmModal = function ({
    title = "Confirm",
    text = "Are you sure?",
    showReason = false,
    onConfirm = null,
  }) {
    confirmLabel.innerText = title;
    confirmText.innerText = text;
    reasonWrap.style.display = showReason ? "block" : "none";
    reasonInput.value = "";
    _onConfirm = onConfirm;
    confirmModal.show();
  };

  async function handleConfirm() {
    if (!_onConfirm) {
      confirmModal.hide();
      return;
    }
    const reason = reasonInput.value || "";
    try {
      const result = await _onConfirm(reason);
      if (result && result.success) {
        confirmModal.hide();
      } else if (result && result.error) {
        // show error but keep modal open so admin can retry or cancel
        alert(result.error || "Action failed");
      } else {
        // fallback: hide
        confirmModal.hide();
      }
    } catch (err) {
      alert("Error: " + err.message);
    }
  }

  confirmBtn.addEventListener("click", handleConfirm);

  // deleteResource helper (returns { success, error? })
  window.deleteResource = async function (url, rowId, reason = "") {
    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        const row = document.getElementById(rowId);
        if (row) row.remove();
        return { success: true };
      }
      return { success: false, error: data.error || data.message || "Failed" };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };
})(window);

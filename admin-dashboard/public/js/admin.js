// /public/js/admin.js

async function toggleBlock(type, id, btnEl, showAlert = true) {
  const blocked = btnEl.dataset.blocked === "true";
  const action = blocked ? "unblock" : "block";
  const url = `/${type}s/${action}/${id}`; // match route
  // e.g., /users/:id/block or /posts/:id/block

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (res.ok && data.success) {
      btnEl.dataset.blocked = (!blocked).toString();
      btnEl.classList.toggle("btn-success", blocked);
      btnEl.classList.toggle("btn-warning", !blocked);
      btnEl.textContent = blocked ? "Block" : "Unblock";

      if (showAlert) alert(data.message || `${type} ${action}ed successfully`);
    } else {
      alert(data.error || data.message || "Action failed");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
}

async function deleteItem(url, rowId) {
  if (!confirm("Are you sure? This action cannot be undone.")) return;
  try {
    const res = await fetch(url, { method: "DELETE" });
    const data = await res.json();
    if (data.success) {
      const row = document.getElementById(rowId);
      if (row) row.remove();
    } else {
      alert(data.error || "Failed");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
}

async function markRead(url, rowId) {
  try {
    const res = await fetch(url, { method: "PUT" });
    const data = await res.json();
    if (data.success) {
      // reload row or the page
      const row = document.getElementById(rowId);
      if (row) row.querySelector("td:nth-child(5)").innerText = "Yes";
    } else {
      alert(data.error || "Failed");
    }
  } catch (err) {
    alert("Error: " + err.message);
  }
}

// public/js/admin.js

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

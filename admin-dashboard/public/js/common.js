// public/js/common.js
// plain-browser helpers attached to window

(function (window) {
  window.showAlert = function (msg) {
    // replace with a toast if you have one
    alert(msg);
  };

  window.fetchJson = async function (url, opts = {}) {
    try {
      const res = await fetch(url, opts);
      let data = {};
      try {
        data = await res.json();
      } catch (e) {}
      return { ok: res.ok, status: res.status, data };
    } catch (err) {
      return { ok: false, status: 0, data: { error: err.message } };
    }
  };
})(window);

(function () {
  "use strict";

  const tabs = document.querySelectorAll(".ratelist-tab");
  const panels = document.querySelectorAll(".ratelist-panel");
  const searchInput = document.getElementById("rateSearch");
  const noResults = document.getElementById("rateNoResults");

  if (!tabs.length) return;

  function showPanel(id) {
    panels.forEach((panel) => {
      const match = panel.id === id;
      panel.classList.toggle("active", match);
      panel.hidden = !match;
    });
    tabs.forEach((tab) => {
      const selected = tab.dataset.tab === id;
      tab.classList.toggle("active", selected);
      tab.setAttribute("aria-selected", selected);
    });
    filterRows();
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => showPanel(tab.dataset.tab));
  });

  function filterRows() {
    const query = (searchInput?.value || "").trim().toLowerCase();
    const activePanel = document.querySelector(".ratelist-panel.active");
    if (!activePanel) return;

    let visibleCount = 0;
    activePanel.querySelectorAll(".ratelist-table tbody tr").forEach((row) => {
      const text = row.textContent.toLowerCase();
      const show = !query || text.includes(query);
      row.hidden = !show;
      if (show) visibleCount++;
    });

    if (noResults) {
      noResults.hidden = visibleCount > 0 || !query;
    }
  }

  if (searchInput) {
    searchInput.addEventListener("input", filterRows);
  }
})();

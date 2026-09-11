const CODE_SAMPLES = {
  javascript: `import { AirKit } from "@air3/airkit";

const air = new AirKit({ partnerId: "pk_live_..." });

const credential = await air.verify(user);
// issued once · portable at every AIR3 partner`,
  swift: `import AirKit

let air = AirKit(partnerId: "pk_live_...")

let credential = try await air.verify(user: user)
// issued once · portable at every AIR3 partner`,
  kotlin: `import com.air3.airkit.AirKit

val air = AirKit(partnerId = "pk_live_...")

val credential = air.verify(user)
// issued once · portable at every AIR3 partner`,
  flutter: `import 'package:airkit/airkit.dart';

final air = AirKit(partnerId: 'pk_live_...');

final credential = await air.verify(user);
// issued once · portable at every AIR3 partner`,
};

function fillCodePanels(root) {
  root.querySelectorAll(".quickstart__code[id^='landing-panel-']").forEach((panel) => {
    const lang = panel.id.replace("landing-panel-", "");
    if (!CODE_SAMPLES[lang] || panel.dataset.filled === "true") return;
    panel.textContent = CODE_SAMPLES[lang];
    panel.dataset.filled = "true";
  });
}

function positionIndicator(track, tab, animate) {
  const indicator = track.querySelector(".air-tabs-indicator");
  if (!tab || !indicator) return;
  if (!animate) indicator.style.transition = "none";
  indicator.style.width = `${tab.offsetWidth}px`;
  indicator.style.height = `${tab.offsetHeight}px`;
  indicator.style.transform = `translate(${tab.offsetLeft}px, ${tab.offsetTop}px)`;
  if (!animate) {
    indicator.getBoundingClientRect();
    indicator.style.transition = "";
  }
}

function selectTab(track, tab, { focus } = {}) {
  const tabs = [...track.querySelectorAll('[role="tab"]')];
  tabs.forEach((item) => {
    const selected = item === tab;
    item.setAttribute("aria-selected", selected ? "true" : "false");
    item.tabIndex = selected ? 0 : -1;
    const panel = document.getElementById(item.getAttribute("aria-controls"));
    if (panel) panel.hidden = !selected;
  });
  positionIndicator(track, tab, true);
  if (focus) tab.focus();
}

function bindTrack(track) {
  if (track.dataset.airTabsReady === "true") return;
  track.dataset.airTabsReady = "true";

  const tabs = [...track.querySelectorAll('[role="tab"]')];
  const selected = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0];
  if (selected) selectTab(track, selected);

  track.addEventListener("click", (event) => {
    const tab = event.target.closest('[role="tab"]');
    if (!tab || !track.contains(tab)) return;
    selectTab(track, tab, { focus: true });
  });

  track.addEventListener("keydown", (event) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    const items = [...track.querySelectorAll('[role="tab"]')];
    if (!items.length) return;
    const current = items.findIndex((tab) => tab.getAttribute("aria-selected") === "true");
    let next = current < 0 ? 0 : current;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (current + 1) % items.length;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (current - 1 + items.length) % items.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = items.length - 1;
    event.preventDefault();
    selectTab(track, items[next], { focus: true });
  });

  if (typeof ResizeObserver !== "undefined") {
    const observer = new ResizeObserver(() => {
      const active = tabs.find((tab) => tab.getAttribute("aria-selected") === "true") || tabs[0];
      positionIndicator(track, active, false);
    });
    observer.observe(track);
  }
}

function initLandingTabs() {
  document.querySelectorAll(".docs-landing").forEach(fillCodePanels);
  document.querySelectorAll(".docs-landing .air-tabs-track").forEach(bindTrack);
}

const start = () => initLandingTabs();
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", start, { once: true });
} else {
  start();
}

const mutationObserver = new MutationObserver(() => initLandingTabs());
mutationObserver.observe(document.documentElement, { childList: true, subtree: true });

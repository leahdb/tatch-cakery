export function serializeSvg(svgEl) {
  if (!svgEl) return null;
  const s = new XMLSerializer();
  let str = s.serializeToString(svgEl);
  if (!str.includes('xmlns=')) {
    str = str.replace('<svg', '<svg xmlns="http://www.w3.org/2000/svg"');
  }
  return str;
}


export function buildConfigFromState({
  selectedCake,
  selectedFilling,
  selectedCream,
  selectedTopCream,
  topCreamColor,
  customInput,
  motifChoice,
  plexiColor,
  selectedCustomization,
  letteringMode,
}) {
  return {
    cakeFlavor: selectedCake?.code || null,
    fillingFlavor: selectedFilling?.code || null,
    creamFlavor: selectedCream?.code || null,
    topCreamFlavor: selectedTopCream?.code || null,
    topCreamColor: selectedTopCream?.code === "colored_vanilla" ? topCreamColor || null : null,
    message: customInput || "",
    motif: selectedCustomization?.code === "plexi_motif" ? motifChoice || null : null,
    plexiColor: plexiColor || null,
    letteringMode:
      selectedCustomization?.code === "choco_letters"
        ? "chocolate"
        : selectedCustomization?.code === "plexi_writing"
        ? "plexi"
        : "none",
  };
}


export function applyConfigToState(cfg, setters) {
  const {
    setSelectedCake,
    setSelectedFilling,
    setSelectedCream,
    setSelectedTopCream,
    setTopCreamColor,
    setCustomInput,
    setMotifChoice,
    setPlexiColor,
    setSelectedCustomization,
  } = setters;

  if (!cfg) return;

  if (cfg.cakeFlavor) setSelectedCake({ code: cfg.cakeFlavor, label: cfg.cakeFlavor });
  if (cfg.fillingFlavor) setSelectedFilling({ code: cfg.fillingFlavor, label: cfg.fillingFlavor });
  if (cfg.creamFlavor) setSelectedCream({ code: cfg.creamFlavor, label: cfg.creamFlavor });
  if (cfg.topCreamFlavor) setSelectedTopCream({ code: cfg.topCreamFlavor, label: cfg.topCreamFlavor });
  if (cfg.topCreamColor) setTopCreamColor(cfg.topCreamColor);

  if (typeof cfg.message === "string") setCustomInput(cfg.message);
  if (cfg.motif) setMotifChoice(cfg.motif);
  if (cfg.plexiColor) setPlexiColor(cfg.plexiColor);

  if (cfg.letteringMode === "chocolate") setSelectedCustomization({ code: "choco_letters" });
  else if (cfg.letteringMode === "plexi") setSelectedCustomization({ code: "plexi_writing" });
  else if (cfg.motif) setSelectedCustomization({ code: "plexi_motif" });
  else setSelectedCustomization({ code: "none" });
}

// optionCodes.ts
export const sizeCode = (label) => {
  const map= {
    "6 inch": "6inch",
    "8 inch": "8inch",
    "10 inch": "10inch",
  };
  return map[label || ""] || null;
};

export const creamCode = (label) => {
  const map = {
    "Chocolate": "chocolate",
    "Vanilla": "vanilla",
    "Strawberry": "strawberry",
    "Lotus": "lotus",
    "Pistachio": "pistachio",
    "Colored Vanilla": "colored_vanilla",
  };
  return map[label] || "";
};

export const fillingCode = (label) => {
  const map = {
    "Nutella": "nutella",
    "Pistachio": "pistachio",
    "Strawberry": "strawberry",
    "Lotus": "lotus",
  };
  return map[label] || "";
};

export const toppingCode = (label) => {
  const map = {
    "Fresh Strawberries": "fresh_berries",
    "Hazelnuts": "hazelnuts",
    "oreo crumbs": "oreo_crumbs",
  };
  return map[label] || "";
};

export const customizationCode = (label) => {
  const map = {
    "No Customization": "none",
    "Chocolate Letters Writing": "choco_letters",
    "Plexi Writing": "plexi_writing",
    "Plexi Motif": "plexi_motif",
  };
  return map[label] || "none";
};

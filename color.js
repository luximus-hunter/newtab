let colors = [];

const setColors = () => {
  document.querySelectorAll("img").forEach((img) => {
    if (!img || img.parentNode.styled == "true") return;

    if (colors.map((item) => item.url).includes(img.src)) {
      const color = colors.find((item) => item.url === img.src);
      setParentColors(img, color.color);
    } else {
      if (img.complete) {
        let color = colorThief.getColor(img);
        setParentColors(img, rgbToHex(color[0], color[1], color[2]));
        colors.push({
          url: img.src,
          color: rgbToHex(color[0], color[1], color[2]),
        });
      } else {
        img.addEventListener("load", function () {
          let color = colorThief.getColor(img);
          setParentColors(img, rgbToHex(color[0], color[1], color[2]));
          colors.push({
            url: img.src,
            color: rgbToHex(color[0], color[1], color[2]),
          });
        });
      }
    }
  });
};

const setParentColors = (element, color) => {
  element.parentNode.style = `--color: ${color.toLowerCase()};`;
};

const rgbToHex = (r, g, b) =>
  "#" +
  [r, g, b]
    .map((x) => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    })
    .join("");

const colorIsDark = (color) => luma(color) < 100;

const contrastingColor = (color) => {
  return colorIsDark(color) ? "#ffffff" : "#000000";
};

const luma = (color) => {
  color = color.replace("#", "");
  var rgb = typeof color === "string" ? hexToRGBArray(color) : color;
  return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]; // SMPTE C, Rec. 709 weightings
};

const hexToRGBArray = (color) => {
  color = color.trim();
  if (color.length === 3)
    color =
      color.charAt(0) +
      color.charAt(0) +
      color.charAt(1) +
      color.charAt(1) +
      color.charAt(2) +
      color.charAt(2);
  else if (color.length !== 6) throw "Invalid hex color: " + color;
  var rgb = [];
  for (var i = 0; i <= 2; i++) rgb[i] = parseInt(color.substr(i * 2, 2), 16);
  return rgb;
};

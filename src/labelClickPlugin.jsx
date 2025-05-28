export function createLabelClickPlugin(
  labels,
  invertedSpokes,
  toggleInversion
) {
  const RECT_WIDTH = 100;
  const RECT_HEIGHT = 30;

  return {
    id: "labelClickPlugin",
    afterEvent(chart, args) {
      const { event } = args;
      if (event.type !== "click") return;

      const { x, y } = event;
      const centerX = chart.chartArea.left + chart.chartArea.width / 2;
      const centerY = chart.chartArea.top + chart.chartArea.height / 2;
      const radius = chart.scales.r.drawingArea;
      const angleStep = (2 * Math.PI) / labels.length;

      labels.forEach((label, i) => {
        const angle = i * angleStep - Math.PI / 2;
        const labelRadius = radius * 1.07;
        const px = centerX + labelRadius * Math.cos(angle);
        const py = centerY + labelRadius * Math.sin(angle);

        const rectLeft = px - RECT_WIDTH / 2;
        const rectTop = py - RECT_HEIGHT / 2;

        if (
          x >= rectLeft &&
          x <= rectLeft + RECT_WIDTH &&
          y >= rectTop &&
          y <= rectTop + RECT_HEIGHT
        ) {
          toggleInversion(label);
        }
      });
    },
    // afterDraw(chart) {
    //   const ctx = chart.ctx;
    //   const centerX = chart.chartArea.left + chart.chartArea.width / 2;
    //   const centerY = chart.chartArea.top + chart.chartArea.height / 2;
    //   const radius = chart.scales.r.drawingArea;
    //   const angleStep = (2 * Math.PI) / labels.length;

    //   labels.forEach((label, i) => {
    //     const angle = i * angleStep - Math.PI / 2;
    //     const labelRadius = radius * 1.07;
    //     const px = centerX + labelRadius * Math.cos(angle);
    //     const py = centerY + labelRadius * Math.sin(angle);

    //     const rectLeft = px - RECT_WIDTH / 2;
    //     const rectTop = py - RECT_HEIGHT / 2;

    //     ctx.fillStyle = invertedSpokes[label]
    //       ? "rgba(255,0,0,0.2)" // Red = inverted
    //       : "rgba(0,0,255,0.2)"; // Blue = normal

    //     ctx.strokeStyle = "black";
    //     ctx.lineWidth = 1;
    //     ctx.strokeRect(rectLeft, rectTop, RECT_WIDTH, RECT_HEIGHT);
    //   });
    // },
  };
}

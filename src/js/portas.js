// Portas lógicas — símbolos esquemáticos reutilizáveis (p5.js instance mode)
// Uso: Portas.desenharAnd(p, cfg)  |  Portas.desenharOr(p, cfg)
// cfg: { x, y, gw, gh, pinX, inY1, inY2, outContactX, outPinX, outY }
window.Portas = (function () {
  const fios = (p, cfg, x) => {
    const { pinX, inY1, inY2, outContactX, outPinX, outY } = cfg;
    p.line(pinX, inY1, x, inY1);
    p.line(pinX, inY2, x, inY2);
    p.line(outContactX, outY, outPinX, outY);
  };

  function desenharAnd(p, cfg) {
    const { x, y, gw, gh, outY } = cfg;
    const bodyW = gw - gh;
    const cxArc = x + bodyW;

    p.stroke(0);
    p.strokeWeight(3);
    p.noFill();

    p.line(x, y, x + bodyW, y);
    p.arc(cxArc, outY, gh, gh, -p.HALF_PI, p.HALF_PI);
    p.line(x, y + gh, cxArc, y + gh);
    p.line(x, y, x, y + gh);

    fios(p, cfg, x);
  }

  function desenharOr(p, cfg) {
    const { x, y, gw, gh, outY } = cfg;
    const bodyW = gw - gh;
    const flatW = Math.min(12, gh / 6);

    p.stroke(0);
    p.strokeWeight(3);
    p.noFill();

    p.line(x, y, x, y + gh);

    p.line(x, y, x + flatW, y);
    p.line(x, y + gh, x + flatW, y + gh);

    p.beginShape();
    p.vertex(x + flatW, y);
    p.bezierVertex(
      x + flatW + gh / 3, y + gh / 4,
      x + flatW + gh / 3, y + (3 * gh) / 4,
      x + flatW, y + gh
    );
    p.endShape();

    p.line(x + flatW, y, x + bodyW, y);
    p.arc(x + bodyW, outY, gh, gh, -p.HALF_PI, p.HALF_PI);
    p.line(x + flatW, y + gh, x + bodyW, y + gh);

    fios(p, cfg, x);
  }

  return {
    desenharAnd: desenharAnd,
    desenharOr: desenharOr
  };
})();

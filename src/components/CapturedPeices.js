import { jsx as _jsx } from "react/jsx-runtime";
export function CapturedPieces({ color, pieces }) {
    return (_jsx("div", { className: "p-4 rounded-lg", children: _jsx("div", { className: "flex gap-1 flex-wrap", children: pieces.map((piece, i) => (_jsx("img", { src: `/pieces/${color === "white" ? "w" : "b"}${piece}.svg`, alt: `Captured ${piece}`, className: "w-6 h-6" }, i))) }) }));
}

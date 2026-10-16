import { LocalizedText, localizedText } from "./i18n";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export default function ProductDNA({ onOpen }) {
  const [branch, setBranch] = useState("ugc");
  return (
    <div className="product-dna">
      <span className="tiny-label"><LocalizedText>PRODUCT DNA</LocalizedText></span>
      <button className="dna-origin" onClick={() => onOpen("foodspot")}>
        <LocalizedText>FOODSPOT MOBILE</LocalizedText> <ArrowUpRight size={12} />
      </button>
      <svg viewBox="0 0 280 50" aria-hidden="true">
        <path
          className={branch === "ugc" ? "active" : ""}
          d="M140 2v8c0 22-69 7-69 37"
        />
        <path
          className={branch === "menutap" ? "active" : ""}
          d="M140 2v8c0 22 69 7 69 37"
        />
      </svg>
      <div className="dna-branches">
        <button
          aria-pressed={branch === "ugc"}
          onClick={() => setBranch("ugc")}
        >
          <LocalizedText>UGC CAMERA</LocalizedText>
        </button>
        <button
          aria-pressed={branch === "menutap"}
          onClick={() => setBranch("menutap")}
        >
          <LocalizedText>MENUTAP</LocalizedText>
        </button>
      </div>
      <p role="status">
        {branch === "ugc"
          ? "The post-purchase photo moment became a focused camera."
          : "Menus, games and restaurant UX found a simpler way in."}
      </p>
      <small><LocalizedText>BUILD · LEARN · NARROW · REUSE · BUILD AGAIN</LocalizedText></small>
    </div>
  );
}

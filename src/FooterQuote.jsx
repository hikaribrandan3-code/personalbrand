import { LocalizedText, localizedText } from "./i18n";
export function FooterQuote() {
  return <blockquote className="footer-quote">
    <p><LocalizedText>“I can do all things through Christ which strengtheneth me.”</LocalizedText></p>
    <cite><LocalizedText>Philippians 4:13 · KJV</LocalizedText></cite>
  </blockquote>;
}

import { LocalizedText, localizedHref, useLanguage } from "./i18n";
import { openNotes, projectPaths } from "./projectPaths";

export default function BuildNotesLink({ project, onOpen, children, ...props }) {
  const { locale } = useLanguage();
  return <a href={localizedHref(projectPaths[project], locale)} onClick={(event) => openNotes(event, onOpen)} {...props}><LocalizedText>{children}</LocalizedText></a>;
}

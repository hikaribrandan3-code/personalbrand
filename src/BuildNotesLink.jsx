import { openNotes, projectPaths } from "./projectPaths";

export default function BuildNotesLink({ project, onOpen, children, ...props }) {
  return <a href={projectPaths[project]} onClick={(event) => openNotes(event, onOpen)} {...props}>{children}</a>;
}

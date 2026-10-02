import { lazy, Suspense, useEffect, useState } from "react";
import MobilePortfolio from "./MobilePortfolio";

const DesktopPortfolio = lazy(() => import("./App"));
const ProjectDrawer = lazy(() => import("./ProjectDrawer"));

export default function PortfolioRoot() {
  const [mobile, setMobile] = useState(() => window.matchMedia("(max-width: 767px)").matches);
  const [project, setProject] = useState(null);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => { setMobile(media.matches); setProject(null); };
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  if (!mobile) return <Suspense fallback={<div role="status" style={{padding:32,color:"#f7f6f1",minHeight:"100vh"}}>Opening the portfolio…</div>}><DesktopPortfolio /></Suspense>;
  return <>
    <a className="skip-link" href="#projects">Skip to projects</a>
    <MobilePortfolio onOpen={setProject} />
    {project && <Suspense fallback={<div className="drawer-loading" role="status">Opening the story…</div>}><ProjectDrawer project={project} onClose={() => setProject(null)} /></Suspense>}
  </>;
}

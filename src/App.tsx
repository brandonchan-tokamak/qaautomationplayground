import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import WaitConditions from "./pages/WaitConditions";
import KeyboardActions from "./pages/KeyboardActions";
import MouseActions from "./pages/MouseActions";
import PopupWindows from "./pages/PopupWindows";
import Frames from "./pages/Frames";
import Forms from "./pages/Forms";
import SamplePages from "./pages/SamplePages";
import AdvancedUI from "./pages/AdvancedUI";
import IframeContent from "./pages/IframeContent";
import Tutorial from "./pages/Tutorial";
import Tables from "./pages/Tables";
import Search from "./pages/Search";
import UploadDownload from "./pages/UploadDownload";
import Admin from "./pages/Admin";
import Learn from "./pages/Learn";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/iframe-content" element={<IframeContent />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tutorial" element={<Tutorial />} />
          <Route path="learn" element={<Learn />} />
          <Route path="tables" element={<Tables />} />
          <Route path="search" element={<Search />} />
          <Route path="wait-conditions" element={<WaitConditions />} />
          <Route path="keyboard-actions" element={<KeyboardActions />} />
          <Route path="mouse-actions" element={<MouseActions />} />
          <Route path="popup-windows" element={<PopupWindows />} />
          <Route path="frames" element={<Frames />} />
          <Route path="forms" element={<Forms />} />
          <Route path="sample-pages" element={<SamplePages />} />
          <Route path="advanced-ui" element={<AdvancedUI />} />
          <Route path="upload-download" element={<UploadDownload />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </HashRouter> // Fixed: Added the '/' here
  );
}

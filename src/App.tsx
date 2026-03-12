import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import CheatSheet from "./pages/CheatSheet";
import WaitConditions from "./pages/WaitConditions";
import KeyboardActions from "./pages/KeyboardActions";
import MouseActions from "./pages/MouseActions";
import PopupWindows from "./pages/PopupWindows";
import Forms from "./pages/Forms";
import DatePickers from "./pages/DatePickers";
import DragAndDrop from "./pages/DragAndDrop";
import Toasts from "./pages/Toasts";
import SamplePages from "./pages/SamplePages";
import AdvancedUI from "./pages/AdvancedUI";
import Tutorial from "./pages/Tutorial";
import Tables from "./pages/Tables";
import Search from "./pages/Search";
import UploadDownload from "./pages/UploadDownload";
import Admin from "./pages/Admin";
import AGGridPage from "./pages/AGGridPage";

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="cheat-sheet" element={<CheatSheet />} />
          <Route path="tutorial" element={<Tutorial />} />
          <Route path="tables" element={<Tables />} />
          <Route path="search" element={<Search />} />
          <Route path="wait-conditions" element={<WaitConditions />} />
          <Route path="keyboard-actions" element={<KeyboardActions />} />
          <Route path="mouse-actions" element={<MouseActions />} />
          <Route path="popup-windows" element={<PopupWindows />} />
          <Route path="forms" element={<Forms />} />
          <Route path="date-pickers" element={<DatePickers />} />
          <Route path="drag-and-drop" element={<DragAndDrop />} />
          <Route path="toasts" element={<Toasts />} />
          <Route path="sample-pages" element={<SamplePages />} />
          <Route path="advanced-ui" element={<AdvancedUI />} />
          <Route path="ag-grid" element={<AGGridPage />} />
          <Route path="upload-download" element={<UploadDownload />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </HashRouter> // Fixed: Added the '/' here
  );
}

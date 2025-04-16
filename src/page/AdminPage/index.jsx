import { useState } from "react";
import s from "./index.module.scss";
import AdminTasksPage from "../../components/AdminComponents/AdminTasksPage";
import Sidebar from "../../components/AdminComponents/Sidebar";
const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("tasks");

  const renderContent = () => {
    switch (activeSection) {
      case "tasks":
        return <AdminTasksPage />;
    }
  };

  return (
    <div className={s["content-wrapper"]}>
      <Sidebar setActiveSection={setActiveSection} />
      <div className={s["content-wrapper__content-area"]}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminPage;

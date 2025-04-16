import { useState } from "react";
import s from "./index.module.scss";
import AdminTasksPage from "../../components/AdminComponents/AdminTasksPage";
import Sidebar from "../../components/AdminComponents/Sidebar";
import AdminCompletedTasksPage from "../../components/AdminComponents/AdminCompletedTasksPage";
const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("completed-task");

  const renderContent = () => {
    switch (activeSection) {
      case "completed-task":
        return <AdminCompletedTasksPage />;
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

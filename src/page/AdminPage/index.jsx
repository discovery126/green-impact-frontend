import { useState } from "react";
import s from "./index.module.scss";
import AdminTasksPage from "../../components/AdminComponents/AdminTasksPage";
import Sidebar from "../../components/AdminComponents/Sidebar";
import AdminCompletedTasksPage from "../../components/AdminComponents/AdminCompletedTasksPage";
import AdminEventsPage from "../../components/AdminComponents/AdminEventsPage";
const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("completed-task");

  const renderContent = () => {
    switch (activeSection) {
      case "completed-task":
        return <AdminCompletedTasksPage />;
      case "tasks":
        return <AdminTasksPage />;
      case "events":
        return <AdminEventsPage />;
      case "rewards":
        return <div>Награды</div>;
      case "cities":
        return <div>Города</div>;
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

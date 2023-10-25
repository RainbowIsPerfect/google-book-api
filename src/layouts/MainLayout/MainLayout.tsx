import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import s from "./MainLayout.module.scss";

export const MainLayout = () => {
  return (
    <>
      <header className={s.header}>
        <div className={s.container}>
          <Header />
        </div>
      </header>
      <main className={s.main}>
        <div className={s.container}>
          <Outlet />
        </div>
      </main>
    </>
  );
};

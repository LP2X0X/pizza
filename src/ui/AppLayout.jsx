import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";
import { useNavigation } from "react-router";
import Loader from "./Loader";
import styles from "./AppLayout.module.css";

function AppLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "idle";

  return (
    <div className={styles.appLayout}>
      {isLoading && <Loader />}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default AppLayout;

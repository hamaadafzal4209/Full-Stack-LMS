import { useState } from "react";
import DashboardHeader from "./DashboardHeader";


type Props = {
  isDashboard?: boolean;
};

const AdminDashboardHero = ({isDashboard}: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <DashboardHeader open={open} setOpen={setOpen} />
    </div>
  );
};

export default AdminDashboardHero;

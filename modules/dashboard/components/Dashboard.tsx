import CodingActive from "./CodingActive";
import Contributions from "./Contributions";

import { GITHUB_ACCOUNTS } from "@/common/constants/github";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <Contributions endpoint={GITHUB_ACCOUNTS.endpoint} />
      <CodingActive />
    </div>
  );
};

export default Dashboard;

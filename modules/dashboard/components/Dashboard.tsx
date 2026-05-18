import Breakline from "@/common/components/elements/Breakline";
import { GITHUB_ACCOUNTS } from "@/common/constants/github";

import CodingActive from "./CodingActive";
import Contributions from "./Contributions";

const Dashboard = () => {
  return (
    <div>
      <Contributions endpoint={GITHUB_ACCOUNTS.endpoint} />
      <Breakline className="my-8" />
      <CodingActive />
    </div>
  );
};

export default Dashboard;

import Monkeytype from "./Monkeytype";
import CodingActive from "./CodingActive";
import Contributions from "./Contributions";
import Umami from "./Umami";

import { GITHUB_ACCOUNTS } from "@/common/constants/github";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <Umami />
      <Contributions endpoint={GITHUB_ACCOUNTS.endpoint} />
      <CodingActive />
      <Monkeytype />
    </div>
  );
};

export default Dashboard;

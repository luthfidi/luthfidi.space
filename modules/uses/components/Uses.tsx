import { USES } from "@/common/constants/uses";

import UseSection from "./UseSection";

const Uses = () => (
  <div className="space-y-8">
    {USES.map((section) => (
      <UseSection key={section.title.en} {...section} />
    ))}
  </div>
);

export default Uses;

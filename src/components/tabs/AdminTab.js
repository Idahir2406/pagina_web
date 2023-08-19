import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import { tabs } from "./tabsOptions";
export const AdminTab = () => {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" items={tabs}>
        {({ id, title, body }) => (
          <Tab key={id} title={title}>
            <Card>
              <CardBody>{body}</CardBody>
            </Card>
          </Tab>
        )}
      </Tabs>
    </div>
  );
};

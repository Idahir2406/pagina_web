import { Accordion as Acc, AccordionItem } from "@nextui-org/react";

export const Accordion = ({ options }) => {
  return (
    <Acc>
      {options.map((option, index) => (
        <AccordionItem key={index} aria-label={option.title} title={option.title}>
          {option.content}
        </AccordionItem>
      ))}
    </Acc>
  );
};

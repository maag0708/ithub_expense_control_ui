export type HandleChange = {
  (e: React.ChangeEvent<unknown>): void;
  <T = string | React.ChangeEvent<unknown>>(
    field: T
  ): T extends React.ChangeEvent<unknown>
    ? void
    : (e: string | React.ChangeEvent<unknown>) => void;
};

export type HandleBlur = {
  (e: React.FocusEvent<unknown, Element>): void;
  <T = unknown>(fieldOrEvent: T): T extends string
    ? (e: unknown) => void
    : void;
};

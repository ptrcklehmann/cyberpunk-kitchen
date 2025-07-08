import { Input } from "@heroui/input";
import { Kbd } from "@heroui/kbd";

import { SearchIcon } from "../icons";

export const SearchInput = () => (
  <Input
    aria-label="Search"
    classNames={{
      inputWrapper: ["bg-default-100", "hover:bg-default-200/50"],
      input: "text-sm",
    }}
    endContent={
      <Kbd className="hidden lg:inline-block" keys={["command"]}>
        K
      </Kbd>
    }
    labelPlacement="outside"
    placeholder="Search..."
    startContent={
      <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
    }
    type="search"
  />
);

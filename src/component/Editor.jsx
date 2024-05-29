import { LexicalComposer } from "@lexical/react/LexicalComposer";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import {
  BeautifulMentionsPlugin,
  BeautifulMentionNode,
} from "lexical-beautiful-mentions";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { Menu, MenuItem } from "./ui/Menu";
const mentionItems = {
  "@": [
    "Anton",
    "Boris",
    "Catherine",
    "Dmitri",
    "Elena",
    "Felix",
    { value: "Gina", id: "1", avatar: null },
    { value: "Gina", id: "2", avatar: "https://example.com/avatars/1.jpg" },
  ],
  "#": ["Apple", "Banana", "Cherry", "Date", "Elderberry", "Fig", "Grape"],
  "due:": ["Today", "Tomorrow", "01-01-2023"],
  "rec:": ["week", "month", "year"],
  "\\w+:": [],
};

const queryMentions = async (trigger, queryString, asynchronous) => {
  const items = mentionItems[trigger];
  if (!items) {
    return [];
  }
  if (trigger) {
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  return items.filter((item) => {
    const value = typeof item === "string" ? item : item.value;
    return value.toLowerCase().includes(queryString.toLowerCase());
  });
};

const beautifulMentionsTheme = {
  "@": "px-1 mx-px bg-[#22c55e] ...",
  "@Focused": "",
  "due:": {
    trigger: "text-blue-400 ...",
    value: "text-orange-400 ...",
    container: "px-1 mx-px ...",
    containerFocused: "outline-none shadow-md ...",
  },
};

function onError(error) {
  console.error(error);
}

const Empty = () => (
  <div className="top-[2px] m-0 min-w-[10rem] text-white ...">
    No results found.
  </div>
);

function Editor() {
  const initialConfig = {
    namespace: "RichTextEditor",
    theme: {
      beautifulMentions: beautifulMentionsTheme,
    },
    onError,
    nodes: [BeautifulMentionNode],
  };

  return (
    <LexicalComposer initialConfig={initialConfig}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable
            style={{ tabSize: 1 }}
            className={
              "z-1 relative w-full flex-1 rounded-sm border border-gray-500 px-3 py-2 min-h-[5rem]"
            }
          />
        }
        ErrorBoundary={LexicalErrorBoundary}
      />
      <BeautifulMentionsPlugin
        items={mentionItems}
        emptyComponent={Empty}
        triggers={["@", "#"]}
        onSearch={queryMentions}
        menuComponent={Menu}
        menuItemComponent={MenuItem}
      />
    </LexicalComposer>
  );
}

export default Editor;

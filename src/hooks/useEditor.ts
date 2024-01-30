import { ContentState, EditorState } from "draft-js";
import { useState } from "react";

const useEditor = (text = "", onChange?: (plaintText: string) => void) => {
  const [editor, setEditor] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(text))
  );

  const handleEditor = (editor: EditorState) => {
    if (onChange) {
      const plaintText = editor.getCurrentContent().getPlainText();
      
      onChange(plaintText);
    }
    setEditor(editor);
  };

  return { editor, handleEditor };
};

export default useEditor;

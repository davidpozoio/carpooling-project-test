import { ContentState, EditorState } from "draft-js";
import { useState } from "react";

const useEditor = (text = "", onChange?: (plaintText: string) => void) => {
  const [editor, setEditor] = useState(() =>
    EditorState.createWithContent(ContentState.createFromText(text))
  );
  const [currentText, setCurrentText] = useState(text);

  const handleEditor = (editor: EditorState) => {
    if (!onChange) return;
    const plaintText = editor.getCurrentContent().getPlainText();
    if (plaintText != currentText) {
      onChange(plaintText);
    }
    setCurrentText(plaintText);
    setEditor(editor);
  };

  const setPlainText = (plainText: string) => {
    setEditor(() =>
      EditorState.createWithContent(ContentState.createFromText(plainText))
    );
  };

  return { editor, handleEditor, setPlainText };
};

export default useEditor;

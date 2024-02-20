import { ContentState, Editor, EditorState } from "draft-js";
import { useRef, useState } from "react";

const useEditor = (text = "", onChange?: (plaintText: string) => void) => {
  const ref = useRef<Editor>(null);

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

  const focus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return { editor, handleEditor, setPlainText, focus, ref };
};

export default useEditor;

"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Toolbar } from "./Toolbar";
import Heading from "@tiptap/extension-heading";
import Blockquote from "@tiptap/extension-blockquote";
import Document from "@tiptap/extension-document";
import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import Bold from "@tiptap/extension-bold";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";

export default function TipTap({ blog_description, onChange, setValue }) {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Text,
      Image,
      Dropcursor,
      Heading,
      Italic,
      Strike,
      Bold,
      BulletList,
      ListItem,
      Blockquote,
    ],
    // content: description,
    editorProps: {
      attributes: {
        class: "rounded-md border min-h-[150px] border-input p-3",
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
      setValue("blog_description", editor.getHTML());
      // console.log(editor.getHTML());
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}

"use client";

import { Editor } from "@tiptap/react";

import {
  Bold,
  Strikethrough,
  Italic,
  List,
  Heading2,
  Heading1,
  ImagePlus,
} from "lucide-react";

import { Toggle } from "@/components/ui/toggle";
import { Button } from "@/components/ui/button";

export function Toolbar({ editor }) {
  const addImage = () => {
    event.preventDefault(); // Prevent the default f
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="border border-input bg-transparent rounded-md">
      <Toggle
        size="lg"
        pressed={editor.isActive("heading", { level: 1 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 1 }).run()
        }
      >
        <Heading1 className="h-6 w-6" />
      </Toggle>

      <Toggle
        size="lg"
        pressed={editor.isActive("heading", { level: 2 })}
        onPressedChange={() =>
          editor.chain().focus().toggleHeading({ level: 2 }).run()
        }
      >
        <Heading2 className="h-6 w-6" />
      </Toggle>

      <Toggle
        size="lg"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="h-6 w-6" />
      </Toggle>

      <Toggle
        size="lg"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="h-6 w-6" />
      </Toggle>

      <Toggle
        size="lg"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="h-6 w-6" />
      </Toggle>

      <Toggle
        size="lg"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="h-6 w-6" />
      </Toggle>

      <Button onClick={() => addImage()} variant="ghost" size="icon">
        <ImagePlus className="h-6 w-6" />
      </Button>

      <Button
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={editor.isActive("blockquote") ? "is-active" : ""}
      >
        toggleBlockquote
      </Button>
      <Button
        onClick={() => editor.chain().focus().setBlockquote().run()}
        disabled={!editor.can().setBlockquote()}
      >
        setBlockquote
      </Button>
      <Button
        onClick={() => editor.chain().focus().unsetBlockquote().run()}
        disabled={!editor.can().unsetBlockquote()}
      >
        unsetBlockquote
      </Button>
    </div>
  );
}

"use client";

import dynamic from "next/dynamic";

const EditorComponent = dynamic(() => import("@/components/Editor"), { ssr: false });

export default function EditorPage() {
  return <EditorComponent />;
}


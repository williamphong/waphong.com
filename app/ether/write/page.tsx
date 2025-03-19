'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import 'reactjs-tiptap-editor/style.css';
import RichTextEditor, {
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  ColumnActionButton,
  Emoji,
  ExportPdf,
  ExportWord,
  FontFamily,
  FontSize,
  FormatPainter,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Iframe,
  Image,
  ImportWord,
  Indent,
  Italic,
  Katex,
  LineHeight,
  Link,
  MoreMark,
  OrderedList,
  SearchAndReplace,
  SlashCommand,
  Strike,
  Table,
  TaskList,
  TextAlign,
  Underline,
  Video,
  locale,
  TableOfContents,
  Excalidraw,
  TextDirection,
  Mention,
  Attachment,
  ImageGif,
  Mermaid,
  Twitter,
} from 'reactjs-tiptap-editor';

const extensions = [
  BaseKit.configure({
    multiColumn: true,
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  History,
  SearchAndReplace,
  TextDirection,
  TableOfContents,
  FormatPainter.configure({ spacer: true }),
  Clear,
  FontFamily,
  Heading.configure({ spacer: true }),
  FontSize,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Katex,
  Emoji,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ['heading', 'paragraph'], spacer: true }),
  Indent,
  LineHeight,
  TaskList.configure({
    spacer: true,
    taskItem: {
      nested: true,
    },
  }),
  Link,
  Image.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files));
        }, 500);
      });
    },
  }),
  Video.configure({
    upload: (files: File) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files));
        }, 500);
      });
    },
  }),
  ImageGif.configure({
    GIPHY_API_KEY: process.env.NEXT_PUBLIC_GIPHY_API_KEY,
  }),
  Blockquote.configure({ spacer: true }),
  SlashCommand,
  HorizontalRule,
  Code.configure({
    toolbar: false,
  }),
  CodeBlock.configure({ defaultTheme: 'dracula' }),
  ColumnActionButton,
  Table,
  Iframe,
  ExportPdf.configure({ spacer: true }),
  ImportWord.configure({
    upload: (files: File[]) => {
      const f = files.map((file) => ({
        src: URL.createObjectURL(file),
        alt: file.name,
      }));
      return Promise.resolve(f);
    },
  }),
  ExportWord,
  Excalidraw,
  Mention,
  Attachment.configure({
    upload: (file: any) => {
      // fake upload return base 64
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string);
          resolve(URL.createObjectURL(blob));
        }, 300);
      });
    },
  }),
  Mermaid.configure({
    upload: (file: any) => {
      // fake upload return base 64
      const reader = new FileReader();
      reader.readAsDataURL(file);

      return new Promise((resolve) => {
        setTimeout(() => {
          const blob = convertBase64ToBlob(reader.result as string);
          resolve(URL.createObjectURL(blob));
        }, 300);
      });
    },
  }),
  Twitter,
];

function convertBase64ToBlob(base64: string): Blob {
  const [prefix, base64Data] = base64.split(',');
  const contentType = prefix.match(/:(.*?);/)?.[1] || '';
  const byteCharacters = atob(base64Data);
  const byteNumbers = Array.from(byteCharacters).map((char) =>
    char.charCodeAt(0)
  );
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: contentType });
}

function debounce(func: any, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    // @ts-expect-error this implicitly has type any
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

const DEFAULT = '';

const WritePage = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [content, setContent] = useState(DEFAULT);
  const refEditor = React.useRef<any | null>(null);

  const onValueChange = useCallback(
    debounce((value: string) => {
      setContent(value);
    }, 300),
    []
  );

  useEffect(() => {
    if (status === 'unauthenticated' || session?.provider !== 'google') {
      router.push('/ether'); // Navigate after rendering
    }
  }, [status, session, router]); // Dependencies

  if (status === 'loading') {
    return <div>loading...</div>; // Handle loading state
  }

  return (
    <main>
      <div className="m-10">
        <RichTextEditor
          ref={refEditor}
          output="html"
          content={DEFAULT}
          onChangeContent={onValueChange}
          extensions={extensions}
        />

        {typeof content === 'string' && (
          <textarea
            className="textarea"
            readOnly
            style={{
              marginTop: 20,
              height: 100,
              width: '100%',
              borderRadius: 4,
              padding: 10,
              whiteSpace: 'pre-wrap',
            }}
            value={content}
          />
        )}
      </div>
    </main>
  );
};

export default WritePage;

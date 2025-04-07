'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import RcTiptapEditor from 'reactjs-tiptap-editor';
import 'reactjs-tiptap-editor/style.css';
import {
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
  TableOfContents,
  //Excalidraw,
  TextDirection,
  Mention,
  Attachment,
  ImageGif,
  Mermaid,
  Twitter,
} from 'reactjs-tiptap-editor/extension-bundle';

const extensions = [
  BaseKit.configure({
    multiColumn: true,
    placeholder: { showOnlyCurrent: true },
    characterCount: { limit: 50_000 },
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
  TaskList.configure({ spacer: true, taskItem: { nested: true } }),
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
  Code.configure({ toolbar: false }),
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
  //Excalidraw,
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

const currDate = new Date();

const DEFAULT = `
  <h1 dir="auto">Title</h1> 
  <h6 dir="auto" style="line-height: 100%" >subtitle</h6>
  <span style="font-size: 12px">${currDate.toDateString()}</span> 
  <div data-type="horizontalRule"><hr></div>
  <h2 dir="auto">Header</h2>
  <p dir="auto"></p>
  <p dir="auto">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  <p dir="auto"></p>
  <p dir="auto"></p>
`;

console.log(DEFAULT);

const WritePage = () => {
  const [content, setContent] = useState(DEFAULT);
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const [isClient, setIsClient] = useState(false);
  const [disable, setDisable] = useState(false);
  const refEditor = React.useRef<any>(null);

  useEffect(() => {
    setIsClient(true);
    if (!isPending && !session) {
      router.push('/ether');
    }
  }, [session, isPending, router]);

  const onValueChange = useCallback(
    debounce((value: string) => {
      setContent(value);
    }, 300),
    []
  );

  if (!isClient || isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!session) {
    return null; // Or redirect immediately
  }

  return (
    <main>
      <button onClick={() => setDisable(!disable)}>
        {disable ? 'Editable' : 'Readonly'}
      </button>
      <div className="m-10">
        <RcTiptapEditor
          ref={refEditor}
          output="html"
          content={DEFAULT}
          onChangeContent={onValueChange}
          extensions={extensions}
          disabled={disable}
          //immediatelyRender={false}
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

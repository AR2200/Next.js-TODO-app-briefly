// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next' // Metadataをインポート

export const metadata: Metadata = { // Metadata型を指定
  title: 'Next-TODO-App',
  description: 'Next.jsで作成したTODOリストアプリ',
  icons: { // アイコン設定を追加
    icon: '/favicon.ico', // publicディレクトリからのパス
    shortcut: '/favicon.ico', // 別のアイコンを指定する場合
    apple: '/favicon.ico', // Appleデバイス用
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  )
}
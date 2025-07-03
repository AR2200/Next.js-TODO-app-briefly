// src/app/layout.tsx
import './globals.css'
import type { Metadata } from 'next' // Metadataをインポート

export const metadata: Metadata = { // Metadata型を指定
  title: 'Next-TODO-App',
  description: 'Next.jsで作成したTODOリストアプリ',
  icons: { // アイコン設定を追加
    icon: '/icon.ico', // publicディレクトリからのパス
    shortcut: '/icon.png', // 別のアイコンを指定する場合
    apple: '/icon.png', // Appleデバイス用
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
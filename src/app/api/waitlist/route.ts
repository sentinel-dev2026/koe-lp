import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    // バリデーション
    if (!email || typeof email !== 'string') {
      return NextResponse.json(
        { error: 'メールアドレスを入力してください' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '正しいメールアドレスを入力してください' },
        { status: 400 }
      )
    }

    // Supabaseに保存
    const { error } = await supabase
      .from('waitlist')
      .insert({ email: email.toLowerCase().trim() })

    if (error) {
      // 重複エラー（unique constraint violation）
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'このメールアドレスは既に登録済みです', duplicate: true },
          { status: 409 }
        )
      }
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: '登録に失敗しました。しばらくしてからお試しください' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: '登録が完了しました' })
  } catch (err) {
    console.error('Waitlist API error:', err)
    return NextResponse.json(
      { error: 'サーバーエラーが発生しました' },
      { status: 500 }
    )
  }
}

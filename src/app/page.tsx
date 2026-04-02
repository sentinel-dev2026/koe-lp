"use client";

import { useState } from "react";

/* ─── Constants ─── */
const TOTAL = 17;
const ACCENT = "#C4704B";

/* ─── Shared UI ─── */
function SectionLabel({ cat, num }: { cat: string; num: number }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: ACCENT }}>
        {cat}
      </span>
      <span className="text-xs tabular-nums text-gray-400">
        {String(num).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
      </span>
    </div>
  );
}

const Star = ({ filled = true }: { filled?: boolean }) => (
  <svg viewBox="0 0 20 20" fill={filled ? "#F59E0B" : "#D1D5DB"} className="w-4 h-4">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.176 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.063 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
  </svg>
);

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} filled={i < count} />
      ))}
    </div>
  );
}

function Check() {
  return (
    <svg className="w-4 h-4 flex-shrink-0" style={{ color: ACCENT }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

/* ─────────────────────────── PAGE ─────────────────────────── */
export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-[#fafafa]">
      {/* ── HEADER ── */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold" style={{ color: ACCENT }}>
            KoeLog
          </span>
          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-600">
            <a href="#demo" className="hover:text-gray-900 transition">デモ機能</a>
            <a href="#pricing" className="hover:text-gray-900 transition">料金</a>
            <a href="#faq" className="hover:text-gray-900 transition">FAQ</a>
          </nav>
          <a
            href="#waitlist"
            className="text-white text-sm font-medium px-5 py-2 rounded-lg transition hover:opacity-90"
            style={{ backgroundColor: ACCENT }}
          >
            無料で始める
          </a>
        </div>
      </header>

      {/* ── 01 HERO ── */}
      <section className="py-20 md:py-32">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <SectionLabel cat="KoeLog" num={1} />
          <h1 className="text-4xl md:text-5xl font-bold text-[#111827] leading-tight">
            お客様の声を、もっと簡単に。
          </h1>
          <p className="mt-6 text-lg text-gray-500 max-w-2xl mx-auto">
            収集・承認・サイト表示まで、わずか2分。手作業を減らして、信頼を増やす。
          </p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#waitlist"
              className="text-white font-medium px-8 py-3 rounded-lg transition hover:opacity-90"
              style={{ backgroundColor: ACCENT }}
            >
              無料で始める
            </a>
            <a
              href="#demo"
              className="border border-gray-300 text-[#111827] font-medium px-8 py-3 rounded-lg hover:border-gray-400 transition"
            >
              デモを見る
            </a>
          </div>
        </div>
      </section>

      {/* ── 02 WIDGET DEMO: Card Grid ── */}
      <section id="demo" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionLabel cat="ウィジェット" num={2} />
          <h2 className="text-2xl font-bold text-[#111827] mb-2">カード型レイアウト</h2>
          <p className="text-gray-500 mb-8">複数の声をグリッドで一覧表示</p>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { name: "田中美咲", role: "サロンオーナー", text: "施術後の仕上がりが毎回素晴らしく、友人にも勧めています。", rating: 5 },
              { name: "佐藤健太", role: "マーケター", text: "予約が取りやすく、スタッフの対応も丁寧です。", rating: 5 },
              { name: "山田花子", role: "個人事業主", text: "リラックスできる雰囲気で安心しました。", rating: 4 },
              { name: "鈴木一郎", role: "店舗経営", text: "お客様の声が増えて、集客に繋がっています。", rating: 5 },
            ].map((r) => (
              <div key={r.name} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                <Stars count={r.rating} />
                <p className="text-sm text-gray-700 mt-3 leading-relaxed">{r.text}</p>
                <div className="mt-4 flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: ACCENT }}
                  >
                    {r.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#111827]">{r.name}</p>
                    <p className="text-xs text-gray-400">{r.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 03 WIDGET DEMO: Carousel ── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <SectionLabel cat="ウィジェット" num={3} />
          <h2 className="text-2xl font-bold text-[#111827] mb-2">カルーセル型</h2>
          <p className="text-gray-500 mb-8">1件ずつスライドして表示</p>
          <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
            <Stars count={5} />
            <p className="mt-4 text-gray-700 leading-relaxed">
              施術後の仕上がりが毎回素晴らしく、友人にも勧めています。予約もスムーズで助かっています。
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: ACCENT }}
              >
                田
              </div>
              <div className="text-left">
                <p className="text-sm font-medium text-[#111827]">田中美咲</p>
                <p className="text-xs text-gray-400">エステサロン経営</p>
              </div>
            </div>
            <div className="flex justify-center gap-2 mt-6">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ACCENT }} />
              <span className="w-2 h-2 rounded-full bg-gray-200" />
              <span className="w-2 h-2 rounded-full bg-gray-200" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 04 WIDGET DEMO: Badge ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionLabel cat="ウィジェット" num={4} />
          <h2 className="text-2xl font-bold text-[#111827] mb-2">バッジ型</h2>
          <p className="text-gray-500 mb-8">コンパクトに評価スコアを表示</p>
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 bg-gray-50 rounded-full px-6 py-3 border border-gray-100 shadow-sm">
              <Star />
              <span className="text-lg font-bold text-[#111827]">4.8</span>
              <span className="text-gray-300">|</span>
              <span className="text-sm text-gray-500">48件のレビュー</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── 05 BEFORE: 集め方 (7 steps, 2-col grid compact) ── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <SectionLabel cat="Before — 集め方" num={5} />
          <h2 className="text-2xl font-bold text-[#111827] mb-2">今の集め方</h2>
          <p className="text-gray-500 mb-8">
            毎回これを繰り返す…7ステップ、毎回この手間は大変…
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "Googleフォームを作成",
              "顧客にURLを送る",
              "回答をExcelにコピー",
              "良い声だけ選別",
              "テキストを整形",
              "サイトにコピペ",
              "デザインを調整",
            ].map((step, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-gray-200 p-3 flex items-start gap-2"
              >
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 text-gray-500 text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm text-gray-700 leading-snug">{step}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 06 AFTER: 集め方 (3 steps) ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionLabel cat="After — 集め方" num={6} />
          <h2 className="text-2xl font-bold text-[#111827] mb-2">KoeLogなら</h2>
          <p className="text-gray-500 mb-8">7ステップ → 3ステップに短縮</p>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: "フォームURLを顧客に送る", desc: "自動生成されるフォームを共有するだけ" },
              { title: "ダッシュボードで「承認」をクリック", desc: "ワンクリックで掲載をコントロール" },
              { title: "サイトに自動表示", desc: "埋め込みコードで全自動" },
            ].map((s, i) => (
              <div key={i} className="rounded-xl p-6 border" style={{ backgroundColor: "#fdf5f0", borderColor: "#fbe8dc" }}>
                <span
                  className="inline-flex items-center justify-center w-8 h-8 rounded-full text-white text-sm font-bold"
                  style={{ backgroundColor: ACCENT }}
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 font-semibold text-[#111827]">{s.title}</h3>
                <p className="mt-2 text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 07 BEFORE: 見え方 ── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <SectionLabel cat="Before — 見え方" num={7} />
          <h2 className="text-2xl font-bold text-[#111827] mb-2">今のサイト表示</h2>
          <p className="text-gray-500 mb-8">テキストだけの味気ない表示になっていませんか？</p>
          <div className="max-w-lg mx-auto bg-white rounded-xl border border-gray-200 p-6">
            <p className="text-sm font-medium text-gray-400 mb-4">Googleフォームの回答</p>
            {[
              "「とても良かったです」 — 田中",
              "「また利用したいです」 — 佐藤",
              "「スタッフが丁寧でした」 — 山田",
            ].map((t, i) => (
              <p key={i} className="text-sm text-gray-500 py-2 border-b border-gray-100 last:border-0">
                {t}
              </p>
            ))}
            <p className="mt-4 text-xs text-red-400 text-center">
              テキストだけで、信頼感が伝わらない…
            </p>
          </div>
        </div>
      </section>

      {/* ── 08 AFTER: 見え方 ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionLabel cat="After — 見え方" num={8} />
          <h2 className="text-2xl font-bold text-[#111827] mb-2">KoeLogならこう変わる</h2>
          <p className="text-gray-500 mb-8">写真付き・星評価・デザイン統一</p>
          <div className="max-w-lg mx-auto space-y-4">
            {[
              { name: "田中美咲", text: "施術後の仕上がりが毎回素晴らしく、友人にも勧めています。" },
              { name: "佐藤健太", text: "予約が取りやすく、スタッフの対応も丁寧です。" },
              { name: "山田花子", text: "リラックスできる雰囲気で安心しました。" },
            ].map((r) => (
              <div key={r.name} className="bg-gray-50 rounded-xl p-5 border border-gray-100 flex gap-4">
                <div
                  className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: ACCENT }}
                >
                  {r.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-[#111827]">{r.name}</span>
                    <Stars count={5} />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{r.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 09 MANAGEMENT DASHBOARD ── */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <SectionLabel cat="管理画面プレビュー" num={9} />
          <h2 className="text-2xl font-bold text-[#111827] mb-2">直感的なダッシュボード</h2>
          <p className="text-gray-500 mb-8">声の収集・承認・分析をひとつの画面で</p>
          <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
            <div className="bg-gray-100 px-4 py-2 flex items-center gap-2 text-xs text-gray-400 border-b border-gray-200">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-red-300" />
                <span className="w-3 h-3 rounded-full bg-yellow-300" />
                <span className="w-3 h-3 rounded-full bg-green-300" />
              </div>
              <span className="ml-2">app.koelog.jp/dashboard</span>
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-[#111827] mb-4">Beauty Salon Aoi</h3>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {[
                  { label: "総件数", value: "24件" },
                  { label: "平均評価", value: "4.8" },
                  { label: "今月", value: "3件" },
                ].map((m) => (
                  <div key={m.label} className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-lg font-bold text-[#111827]">{m.value}</p>
                    <p className="text-xs text-gray-500">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {[
                  { name: "田中美咲", text: "施術後の仕上がりが毎回素晴らしく…", status: "承認済み", color: "green" as const },
                  { name: "佐藤健太", text: "予約が取りやすく、スタッフの対応も…", status: "未承認", color: "yellow" as const },
                  { name: "山田花子", text: "初めてでしたが、リラックスできる…", status: "非公開", color: "gray" as const },
                ].map((r) => (
                  <div key={r.name} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: ACCENT }}
                      >
                        {r.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-[#111827]">{r.name}</p>
                        <p className="text-xs text-gray-400">{r.text}</p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        r.color === "green"
                          ? "bg-green-100 text-green-700"
                          : r.color === "yellow"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 10 FEATURES ── */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionLabel cat="機能" num={10} />
          <h2 className="text-2xl font-bold text-[#111827] text-center mb-12">主な機能</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { icon: "📋", title: "収集フォーム", desc: "URLを共有するだけ。お客様がフォームから声を投稿できます。" },
              { icon: "✅", title: "ワンクリック承認", desc: "管理画面から承認・非承認をワンクリックで切り替え。" },
              { icon: "🧩", title: "埋め込みウィジェット", desc: "スクリプトタグ1行でサイトにお客様の声を表示。" },
              { icon: "🎨", title: "カスタムデザイン", desc: "カラー・レイアウト・フォントを自由にカスタマイズ。" },
              { icon: "🔒", title: "承認フロー", desc: "掲載前に必ず承認ステップ。不適切な投稿を防止。" },
              { icon: "📊", title: "CSVエクスポート", desc: "収集した声をCSV形式でいつでもダウンロード可能。" },
            ].map((f) => (
              <div key={f.title} className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                <span className="text-2xl">{f.icon}</span>
                <h3 className="mt-3 font-semibold text-[#111827]">{f.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11 PRICING (3 plans) ── */}
      <section id="pricing" className="py-16">
        <div className="max-w-5xl mx-auto px-4">
          <SectionLabel cat="料金" num={11} />
          <h2 className="text-2xl font-bold text-[#111827] text-center mb-12">料金プラン</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {([
              {
                name: "Free",
                price: "¥0",
                period: "",
                features: ["プロジェクト1件", "お客様の声10件", "基本ウィジェット"],
                rec: false,
              },
              {
                name: "Pro",
                price: "¥1,980",
                period: "/月（税込）",
                features: ["プロジェクト3件", "お客様の声100件", "カスタムデザイン", "優先サポート"],
                rec: true,
              },
              {
                name: "Agency",
                price: "¥3,980",
                period: "/月（税込）",
                features: ["プロジェクト無制限", "お客様の声無制限", "カスタムデザイン", "優先サポート", "API アクセス"],
                rec: false,
              },
            ] as const).map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 border flex flex-col bg-white ${
                  plan.rec ? "border-2 shadow-lg relative" : "border-gray-200"
                }`}
                style={plan.rec ? { borderColor: ACCENT } : undefined}
              >
                {plan.rec && (
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-3 py-1 rounded-full"
                    style={{ backgroundColor: ACCENT }}
                  >
                    おすすめ
                  </span>
                )}
                <h3 className="text-lg font-bold text-[#111827]">{plan.name}</h3>
                <p className="mt-4">
                  <span className="text-3xl font-bold text-[#111827]">{plan.price}</span>
                  <span className="text-sm text-[#111827] font-medium">{plan.period}</span>
                </p>
                <ul className="mt-6 space-y-3 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#111827] font-medium">
                      <Check />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#waitlist"
                  className={`mt-8 block text-center py-2.5 rounded-lg text-sm font-medium transition ${
                    plan.rec ? "text-white hover:opacity-90" : "bg-gray-100 text-[#111827] hover:bg-gray-200"
                  }`}
                  style={plan.rec ? { backgroundColor: ACCENT } : undefined}
                >
                  始める
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12 FAQ ── */}
      <section id="faq" className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          <SectionLabel cat="FAQ" num={12} />
          <h2 className="text-2xl font-bold text-[#111827] text-center mb-12">よくある質問</h2>
          <div className="space-y-3">
            {[
              { q: "無料プランに期限はありますか？", a: "いいえ、無料プランに期限はありません。ずっと無料でお使いいただけます。" },
              { q: "クレジットカードは必要ですか？", a: "無料プランではクレジットカードは不要です。有料プランへのアップグレード時に登録いただきます。" },
              { q: "どんなサイトにも埋め込めますか？", a: "はい、HTMLを編集できるサイトであれば、スクリプトタグを貼り付けるだけで表示できます。" },
              { q: "デザインはカスタマイズできますか？", a: "はい、Proプラン以上でカラー・レイアウト・フォントなどを自由にカスタマイズできます。" },
              { q: "データのエクスポートは可能ですか？", a: "はい、収集したお客様の声はCSV形式でいつでもダウンロードできます。" },
              { q: "解約はいつでもできますか？", a: "はい、いつでも解約可能です。解約後も期間終了まではご利用いただけます。" },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl border border-gray-100">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-sm font-medium text-[#111827]">{item.q}</span>
                  <svg
                    className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openFaq === i && (
                  <div className="px-5 pb-5">
                    <p className="text-sm text-gray-500 leading-relaxed">{item.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13 WAITLIST ── */}
      <section id="waitlist" className="py-16">
        <div className="max-w-xl mx-auto px-4 text-center">
          <SectionLabel cat="事前登録" num={13} />
          <h2 className="text-2xl font-bold text-[#111827] mb-4">事前登録する</h2>
          <p className="text-gray-700 mb-8">リリース時に優先的にご案内します</p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("ご登録ありがとうございます！");
              setEmail("");
            }}
            className="flex gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="メールアドレス"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent"
            />
            <button
              type="submit"
              className="text-white font-medium px-6 py-3 rounded-lg transition hover:opacity-90 text-sm"
              style={{ backgroundColor: ACCENT }}
            >
              登録
            </button>
          </form>
        </div>
      </section>

      {/* ── 14 FOOTER ── */}
      <footer className="py-8 border-t border-gray-100 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <SectionLabel cat="フッター" num={14} />
          <div className="text-center">
            <p className="text-sm text-gray-400">&copy; 2026 KoeLog</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

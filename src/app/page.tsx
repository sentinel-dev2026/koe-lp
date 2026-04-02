"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  motion,
  type Variants,
} from "framer-motion";
import {
  FileText,
  CheckCircle,
  Code,
  Star,
  LayoutGrid,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  Check,
  Send,
  Plus,
  Minus,
  Palette,
  Shield,
  Download,
} from "lucide-react";

/* ═══════════════════════════════════════════
   Animation helpers
   ═══════════════════════════════════════════ */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeLeft: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const fadeRight: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = (stagger = 0.15): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
});

const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.175, 0.885, 0.32, 1.275] },
  },
};

const bounceFade: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.175, 0.885, 0.32, 1.1] },
  },
};

/* ═══════════════════════════════════════════
   Data
   ═══════════════════════════════════════════ */

const testimonials = [
  {
    name: "田中美咲",
    role: "エステサロン経営",
    rating: 5,
    comment:
      "施術後の仕上がりが毎回素晴らしく、友人にも勧めています。予約もスムーズで助かっています。",
    initial: "田",
  },
  {
    name: "佐藤健太",
    role: "飲食店オーナー",
    rating: 5,
    comment: "予約が取りやすく、スタッフの対応も丁寧です。リピーターが増えました。",
    initial: "佐",
  },
  {
    name: "山田花子",
    role: "ヨガインストラクター",
    rating: 4,
    comment:
      "初めてでしたが、リラックスできる雰囲気で安心しました。生徒さんの声が簡単に集まります。",
    initial: "山",
  },
  {
    name: "鈴木一郎",
    role: "Web制作会社",
    rating: 5,
    comment:
      "技術力が高く、イメージ通りに仕上げてくれます。クライアント案件で重宝しています。",
    initial: "鈴",
  },
];

const features = [
  {
    icon: FileText,
    title: "収集フォーム",
    desc: "URLを共有するだけ。お客様がフォームから声を投稿できます。",
  },
  {
    icon: CheckCircle,
    title: "ワンクリック承認",
    desc: "管理画面から承認・非承認をワンクリックで切り替え。",
  },
  {
    icon: Code,
    title: "埋め込みウィジェット",
    desc: "スクリプトタグ1行でサイトにお客様の声を表示。",
  },
  {
    icon: Palette,
    title: "カスタムデザイン",
    desc: "カラー・レイアウト・フォントを自由にカスタマイズ。",
  },
  {
    icon: Shield,
    title: "承認フロー",
    desc: "掲載前に必ず承認ステップ。不適切な投稿を防止。",
  },
  {
    icon: Download,
    title: "CSVエクスポート",
    desc: "収集した声をCSV形式でいつでもダウンロード可能。",
  },
];

const plans = [
  {
    name: "Free",
    price: "¥0",
    period: "",
    features: ["プロジェクト1件", "お客様の声10件", "基本ウィジェット"],
    recommended: false,
  },
  {
    name: "Pro",
    price: "¥1,980",
    period: "/月",
    features: [
      "プロジェクト3件",
      "お客様の声100件",
      "カスタムデザイン",
      "優先サポート",
    ],
    recommended: true,
  },
  {
    name: "Agency",
    price: "¥3,980",
    period: "/月",
    features: [
      "プロジェクト無制限",
      "お客様の声無制限",
      "カスタムデザイン",
      "優先サポート",
      "API アクセス",
    ],
    recommended: false,
  },
];

const faqData = [
  {
    q: "無料プランに期限はありますか？",
    a: "いいえ、無料プランは期間無制限でお使いいただけます。",
  },
  {
    q: "クレジットカードは必要ですか？",
    a: "無料プランではクレジットカードは不要です。有料プランへのアップグレード時にご登録いただきます。",
  },
  {
    q: "どんなサイトにも埋め込めますか？",
    a: "はい。スクリプトタグ1行を貼り付けるだけで、WordPress・Shopify・静的サイトなどあらゆるサイトに対応します。",
  },
  {
    q: "デザインはカスタマイズできますか？",
    a: "Pro以上のプランでカラー・レイアウト・フォントなどを自由にカスタマイズ可能です。",
  },
  {
    q: "データのエクスポートは可能ですか？",
    a: "はい。CSV形式でいつでもエクスポートできます。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "はい。管理画面からいつでもワンクリックで解約でき、次回更新日以降の課金は発生しません。",
  },
];

/* ═══════════════════════════════════════════
   Shared Components
   ═══════════════════════════════════════════ */

function Stars({ count }: { count: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          className={
            i <= count
              ? "fill-[#E8634A] text-[#E8634A]"
              : "text-gray-300"
          }
        />
      ))}
    </span>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 text-xs font-medium uppercase tracking-widest text-[#E8634A]">
      {children}
    </p>
  );
}

/* ═══════════════════════════════════════════
   FullPage Section Wrapper
   ═══════════════════════════════════════════ */

function FullPageSection({
  index,
  currentSection,
  children,
}: {
  index: number;
  currentSection: number;
  children: React.ReactNode;
}) {
  const state = index === currentSection ? "active" : index > currentSection ? "below" : "above";

  return (
    <div className="fullpage-section" data-state={state}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════
   Section animation wrapper
   ═══════════════════════════════════════════ */

function AnimatedSection({
  isActive,
  variants,
  className,
  children,
}: {
  isActive: boolean;
  variants?: Variants;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate={isActive ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   1. Header
   ═══════════════════════════════════════════ */

const SECTION_NAMES = [
  "ヒーロー",
  "課題",
  "カード型",
  "カルーセル型",
  "バッジ型",
  "集め方Before",
  "集め方After",
  "管理画面",
  "見え方Before",
  "見え方After",
  "導入",
  "機能",
  "Free",
  "Pro",
  "Agency",
  "FAQ",
  "登録",
];

function Header({
  currentSection,
  goTo,
}: {
  currentSection: number;
  goTo: (i: number) => void;
}) {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        currentSection > 0
          ? "border-b border-gray-200/60 bg-white/70 backdrop-blur-md shadow-sm"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1100px] items-center justify-between px-6 py-4">
        <button
          onClick={() => goTo(0)}
          className="text-lg font-bold tracking-tight cursor-pointer bg-transparent border-none"
          style={{ fontFamily: "var(--font-inter)" }}
        >
          KoeLog
        </button>
        <div className="hidden md:flex items-center gap-6">
          <button onClick={() => goTo(2)} className="text-sm text-[#374151] hover:text-[#1A1A1A] transition-colors bg-transparent border-none cursor-pointer">デモ</button>
          <button onClick={() => goTo(11)} className="text-sm text-[#374151] hover:text-[#1A1A1A] transition-colors bg-transparent border-none cursor-pointer">機能</button>
          <button onClick={() => goTo(12)} className="text-sm text-[#374151] hover:text-[#1A1A1A] transition-colors bg-transparent border-none cursor-pointer">料金</button>
          <button onClick={() => goTo(15)} className="text-sm text-[#374151] hover:text-[#1A1A1A] transition-colors bg-transparent border-none cursor-pointer">FAQ</button>
        </div>
        <button
          onClick={() => goTo(16)}
          className="rounded-md bg-[#E8634A] px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 cursor-pointer border-none"
        >
          無料で始める
        </button>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════
   2. Hero
   ═══════════════════════════════════════════ */

function DashboardMock() {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold text-[#1A1A1A]" style={{ fontFamily: "var(--font-inter)" }}>
          KoeLog Dashboard
        </span>
        <span className="rounded-md bg-[#F5F3EF] px-2 py-0.5 text-[10px] text-[#374151]">
          プロジェクト: サロンA
        </span>
      </div>
      <div className="mb-4 grid grid-cols-3 gap-3">
        {[
          { label: "総件数", value: "48" },
          { label: "承認済み", value: "42" },
          { label: "平均評価", value: "4.8" },
        ].map((s) => (
          <div key={s.label} className="rounded-md border border-gray-100 bg-[#FAFAFA] px-3 py-2">
            <p className="text-[10px] text-[#374151]">{s.label}</p>
            <p className="text-lg font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-inter)" }}>
              {s.value}
            </p>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        {testimonials.slice(0, 3).map((t) => (
          <div key={t.name} className="flex items-center gap-3 rounded-md border border-gray-100 px-3 py-2">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F5F3EF] text-[11px] font-bold text-[#1A1A1A]">
              {t.initial}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs text-[#1A1A1A]">{t.name}</p>
              <p className="truncate text-[10px] text-[#374151]">{t.comment}</p>
            </div>
            <span className="shrink-0 rounded bg-green-50 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
              承認済
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero({ isActive, goTo }: { isActive: boolean; goTo: (i: number) => void }) {
  return (
    <div className="flex h-full items-center px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.15)} className="mx-auto grid max-w-[1100px] items-center gap-12 md:grid-cols-[1fr_420px] w-full">
        <motion.div variants={fadeLeft}>
          <SectionLabel>お客様の声管理ツール</SectionLabel>
          <h1 className="mb-5 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
            お客様の声を、
            <br />
            もっと簡単に。
          </h1>
          <p className="mb-8 max-w-md text-lg leading-relaxed text-[#374151]">
            収集・承認・サイト表示まで、わずか2分。
            <br />
            手作業を減らして、信頼を増やす。
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => goTo(16)}
              className="inline-flex items-center gap-2 rounded-md bg-[#E8634A] px-7 py-3.5 font-medium text-white transition-opacity hover:opacity-90 cursor-pointer border-none"
            >
              無料で始める
              <ArrowRight size={16} />
            </button>
            <button
              onClick={() => goTo(2)}
              className="text-sm font-medium text-[#374151] underline underline-offset-4 transition-colors hover:text-[#1A1A1A] cursor-pointer bg-transparent border-none"
            >
              デモを見る
            </button>
          </div>
        </motion.div>
        <motion.div className="hidden md:block" variants={fadeRight}>
          <DashboardMock />
        </motion.div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   3. Pain Points
   ═══════════════════════════════════════════ */

function CountUp({ target, suffix, isActive }: { target: number; suffix: string; isActive: boolean }) {
  const [count, setCount] = useState(0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isActive || hasAnimated.current) return;
    hasAnimated.current = true;
    const duration = 1200;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isActive, target]);

  return <span>{count}{suffix}</span>;
}

function PainPoints({ isActive }: { isActive: boolean }) {
  const points = [
    { num: 70, suffix: "%", text: "の事業者がお客様の声の収集に課題を感じている" },
    { num: 2, suffix: "分", text: "KoeLogなら収集からサイト表示まで" },
    { num: 1, suffix: "行", text: "のコードでどんなサイトにも埋め込み可能" },
  ];

  return (
    <div className="flex h-full items-center border-t border-gray-200 bg-[#F5F3EF] px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.1)} className="mx-auto max-w-[1100px] w-full">
        <div className="grid gap-12 md:grid-cols-3">
          {points.map((p) => (
            <motion.div key={p.suffix + p.num} variants={fadeUp}>
              <p
                className="mb-2 text-4xl font-bold text-[#E8634A]"
                style={{ fontFamily: "var(--font-inter)" }}
              >
                <CountUp target={p.num} suffix={p.suffix} isActive={isActive} />
              </p>
              <p className="text-lg font-semibold leading-relaxed" style={{ color: '#111827' }}>{p.text}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   4. Widget Demo — Card
   ═══════════════════════════════════════════ */

function WidgetBrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="flex items-center gap-1.5 border-b border-gray-100 px-3 md:px-4 py-2">
        <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-gray-300" />
        <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-gray-300" />
        <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-gray-300" />
        <span className="ml-2 md:ml-3 text-[10px] md:text-[11px] text-[#374151]">your-website.com</span>
      </div>
      <div className="p-4 sm:p-8">
        {children}
      </div>
    </div>
  );
}

function WidgetDemoCard({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex h-full items-center px-4 md:px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.15)} className="mx-auto max-w-[1100px] w-full">
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between">
            <SectionLabel>サイトでの表示イメージ</SectionLabel>
            <span className="text-xs text-[#374151]">1/3</span>
          </div>
          <h2 className="mb-2 md:mb-3 text-lg font-bold md:text-4xl">カード型レイアウト</h2>
          <p className="mb-4 md:mb-8 max-w-md text-xs md:text-base leading-relaxed text-[#374151]">
            複数の声をグリッドで一覧表示
          </p>
        </motion.div>

        <motion.div variants={scaleUp}>
          <WidgetBrowserFrame>
            <div className="grid gap-3 sm:grid-cols-2">
              {testimonials.map((t) => (
                <div key={t.name} className="rounded-md border border-gray-200 bg-white p-4">
                  <div className="mb-2.5 flex items-center gap-2.5">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F5F3EF] text-xs font-bold text-[#1A1A1A]">
                      {t.initial}
                    </span>
                    <div>
                      <p className="text-sm font-medium text-[#1A1A1A]">{t.name}</p>
                      <Stars count={t.rating} />
                    </div>
                  </div>
                  <p className="text-sm leading-relaxed text-[#374151]">{t.comment}</p>
                </div>
              ))}
            </div>
          </WidgetBrowserFrame>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   5. Widget Demo — Carousel
   ═══════════════════════════════════════════ */

function WidgetDemoCarousel({ isActive }: { isActive: boolean }) {
  const [current, setCurrent] = useState(0);
  const len = testimonials.length;
  const next = useCallback(() => setCurrent((c) => (c + 1) % len), [len]);
  const prev = () => setCurrent((c) => (c - 1 + len) % len);

  useEffect(() => {
    if (!isActive) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next, isActive]);

  const t = testimonials[current];

  return (
    <div className="flex h-full items-center bg-[#F5F3EF] px-4 md:px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.15)} className="mx-auto max-w-[1100px] w-full">
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between">
            <SectionLabel>サイトでの表示イメージ</SectionLabel>
            <span className="text-xs text-[#374151]">2/3</span>
          </div>
          <h2 className="mb-2 md:mb-3 text-lg font-bold md:text-4xl">カルーセル型</h2>
          <p className="mb-4 md:mb-8 max-w-md text-xs md:text-base leading-relaxed text-[#374151]">
            1件ずつスライドして表示
          </p>
        </motion.div>

        <motion.div variants={scaleUp}>
          <WidgetBrowserFrame>
            <div className="relative mx-auto max-w-sm">
              <div className="rounded-md border border-gray-200 bg-white p-6 text-center">
                <span className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F5F3EF] text-sm font-bold text-[#1A1A1A]">
                  {t.initial}
                </span>
                <div className="mb-3 flex justify-center">
                  <Stars count={t.rating} />
                </div>
                <p className="mb-3 text-sm leading-relaxed text-[#374151]">
                  &ldquo;{t.comment}&rdquo;
                </p>
                <p className="text-sm font-medium text-[#1A1A1A]">{t.name}</p>
                <p className="text-xs text-[#374151]">{t.role}</p>
              </div>

              <button
                onClick={prev}
                aria-label="前へ"
                className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-1.5 transition-colors hover:bg-gray-50"
              >
                <ChevronLeft size={14} className="text-[#374151]" />
              </button>
              <button
                onClick={next}
                aria-label="次へ"
                className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-1.5 transition-colors hover:bg-gray-50"
              >
                <ChevronRight size={14} className="text-[#374151]" />
              </button>

              <div className="mt-4 flex justify-center gap-1.5">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    aria-label={`${i + 1}番目`}
                    className={`h-1.5 rounded-full transition-all ${
                      i === current ? "w-4 bg-[#E8634A]" : "w-1.5 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </WidgetBrowserFrame>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   6. Widget Demo — Badge
   ═══════════════════════════════════════════ */

function WidgetDemoBadge({ isActive }: { isActive: boolean }) {
  const avg = (
    testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length
  ).toFixed(1);

  return (
    <div className="flex h-full items-center px-4 md:px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.15)} className="mx-auto max-w-[1100px] w-full">
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between">
            <SectionLabel>サイトでの表示イメージ</SectionLabel>
            <span className="text-xs text-[#374151]">3/3</span>
          </div>
          <h2 className="mb-2 md:mb-3 text-lg font-bold md:text-4xl">バッジ型</h2>
          <p className="mb-4 md:mb-8 max-w-md text-xs md:text-base leading-relaxed text-[#374151]">
            コンパクトに評価スコアを表示
          </p>
        </motion.div>

        <motion.div variants={scaleUp}>
          <WidgetBrowserFrame>
            <div className="flex justify-center py-8">
              <div className="inline-flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-8 py-5 shadow-sm">
                <span className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star
                      key={i}
                      size={22}
                      className={
                        i <= Math.round(Number(avg))
                          ? "fill-[#E8634A] text-[#E8634A]"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </span>
                <span className="text-2xl font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-inter)" }}>
                  {avg}
                </span>
                <span className="text-base text-[#374151]">/ {testimonials.length}件</span>
              </div>
            </div>
          </WidgetBrowserFrame>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   7. Before Collect (集め方)
   ═══════════════════════════════════════════ */

const collectStepsBefore = [
  "Googleフォームを作成",
  "顧客にURLを送る",
  "回答をExcelにコピー",
  "良い声だけ選別",
  "テキストを整形",
  "サイトにコピペ",
  "デザインを調整",
];

function BeforeCollect({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex h-full items-center border-t border-gray-200 bg-[#FAFAF8] px-4 md:px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.1)} className="mx-auto max-w-[700px] w-full">
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between">
            <SectionLabel>集め方の比較</SectionLabel>
            <span className="text-xs text-[#374151]">1/4</span>
          </div>
          <h2 className="mb-2 md:mb-3 text-lg font-bold md:text-2xl">今の集め方</h2>
          <p className="mb-3 md:mb-4 max-w-md text-xs md:text-sm leading-relaxed text-[#374151]">
            こんな手間、かけていませんか？
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="rounded-lg border border-gray-200 bg-[#F3F3F0] p-3 md:p-6">
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              {collectStepsBefore.map((step, i) => (
                <div key={i} className="flex items-center gap-2 rounded-md bg-white border border-gray-300 px-3 py-1.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-200 text-[10px] font-bold text-gray-500">
                    {i + 1}
                  </span>
                  <span className="text-xs md:text-sm text-[#374151]">{step}</span>
                </div>
              ))}
              <div className="flex items-center justify-center rounded-md bg-gray-100 px-3 py-1.5">
                <span className="text-xs text-gray-400">毎回これを繰り返す…</span>
              </div>
            </div>
            <p className="mt-3 text-center text-xs md:text-sm text-gray-400">
              7ステップ、毎回この手間は大変…
            </p>
          </div>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   8. After Collect (集め方)
   ═══════════════════════════════════════════ */

const collectStepsAfter = [
  "フォームURLを顧客に送る",
  "ダッシュボードで「承認」をクリック",
  "サイトに自動表示",
];

function AfterCollect({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex h-full items-center px-4 md:px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.1)} className="mx-auto max-w-[700px] w-full">
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between">
            <SectionLabel>集め方の比較</SectionLabel>
            <span className="text-xs text-[#374151]">2/4</span>
          </div>
          <h2 className="mb-2 md:mb-3 text-2xl font-bold md:text-4xl">KoeLogなら</h2>
          <p className="mb-4 md:mb-8 max-w-md text-xs md:text-base leading-relaxed text-[#374151]">
            たった3ステップで完了
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-8">
            <div className="space-y-0">
              {collectStepsAfter.map((step, i) => (
                <div key={i}>
                  <div className="flex items-center gap-3 rounded-md border border-[#E8634A]/20 bg-[#FEF7F5] px-4 py-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#E8634A] text-xs font-bold text-white">
                      <CheckCircle size={16} />
                    </span>
                    <span className="text-sm md:text-base font-medium text-[#1A1A1A]">{step}</span>
                  </div>
                  {i < collectStepsAfter.length - 1 && (
                    <div className="flex justify-center py-1">
                      <span className="text-[#E8634A] text-lg">↓</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <p className="mt-4 text-center text-xs md:text-sm text-[#E8634A] font-medium">
              7ステップ → 3ステップに短縮
            </p>
          </div>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   8b. Dashboard Preview (管理画面)
   ═══════════════════════════════════════════ */

function DashboardPreview({ isActive }: { isActive: boolean }) {
  const dashboardVoices = [
    { name: "田中 美咲", initial: "田", bg: "bg-pink-100", text: "text-pink-600", rating: 5, comment: "施術後の仕上がりが毎回素晴らしく…", status: "承認済み", statusColor: "bg-green-50 text-green-700" },
    { name: "山田 花子", initial: "山", bg: "bg-purple-100", text: "text-purple-600", rating: 4, comment: "初めてでしたが、リラックスできる…", status: "未承認", statusColor: "bg-orange-50 text-orange-700" },
    { name: "高橋 由美", initial: "高", bg: "bg-amber-100", text: "text-amber-600", rating: 3, comment: "待ち時間が少し長かった…", status: "非公開", statusColor: "bg-gray-100 text-gray-500" },
  ];

  return (
    <div className="flex h-full items-center bg-[#FAFAF8] px-4 md:px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.15)} className="mx-auto max-w-[700px] w-full">
        <motion.div variants={fadeUp}>
          <SectionLabel>管理画面</SectionLabel>
          <h2 className="mb-1 md:mb-2 text-xl font-bold md:text-3xl">直感的なダッシュボード</h2>
          <p className="mb-3 md:mb-6 max-w-md text-xs md:text-sm leading-relaxed text-[#374151]">
            声の収集・承認・分析をひとつの画面で
          </p>
        </motion.div>

        <motion.div variants={scaleUp}>
          {/* Browser Frame */}
          <div className="rounded-lg border border-gray-200 bg-white">
            <div className="flex items-center gap-1.5 border-b border-gray-100 px-3 md:px-4 py-2">
              <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-gray-300" />
              <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-gray-300" />
              <span className="h-2 w-2 md:h-2.5 md:w-2.5 rounded-full bg-gray-300" />
              <span className="ml-2 md:ml-3 text-[10px] md:text-[11px] text-[#374151]">app.koelog.jp/dashboard</span>
            </div>
            <div className="p-3 md:p-5 bg-[#FAFAFA]">
              {/* Header bar */}
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <span className="text-xs md:text-sm font-bold text-[#1A1A1A]">ダッシュボード</span>
                <span className="rounded bg-[#F5F3EF] px-2 py-0.5 text-[9px] md:text-[10px] text-[#374151]">Beauty Salon Aoi</span>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
                {[
                  { label: "総件数", value: "24", unit: "件" },
                  { label: "平均評価", value: "4.8", unit: "" },
                  { label: "今月", value: "3", unit: "件" },
                ].map((s) => (
                  <div key={s.label} className="rounded-md border border-gray-200 bg-white px-2 md:px-3 py-2 md:py-3">
                    <p className="text-[9px] md:text-[10px] text-[#374151]">{s.label}</p>
                    <p className="text-sm md:text-lg font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-inter)" }}>
                      {s.value}
                      {s.unit && <span className="text-[9px] md:text-xs font-normal text-gray-400 ml-0.5">{s.unit}</span>}
                    </p>
                    {s.label === "平均評価" && (
                      <div className="flex gap-0.5 mt-0.5">
                        {[1,2,3,4,5].map(i => (
                          <Star key={i} size={8} className={i <= 4 ? "fill-[#E8634A] text-[#E8634A]" : "text-gray-300"} />
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Voice List */}
              <div className="rounded-md border border-gray-200 bg-white">
                <div className="flex items-center justify-between px-2 md:px-3 py-1.5 md:py-2 border-b border-gray-100">
                  <span className="text-[10px] md:text-xs font-bold text-[#1A1A1A]">最近の声</span>
                  <span className="text-[9px] md:text-[10px] text-[#E8634A]">すべて見る →</span>
                </div>
                <div className="divide-y divide-gray-50">
                  {dashboardVoices.map((v) => (
                    <div key={v.name} className="flex items-center gap-2 md:gap-3 px-2 md:px-3 py-1.5 md:py-2">
                      <span className={`flex h-5 w-5 md:h-6 md:w-6 shrink-0 items-center justify-center rounded-full ${v.bg} ${v.text} text-[8px] md:text-[10px] font-bold`}>
                        {v.initial}
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] md:text-xs font-medium text-[#1A1A1A]">{v.name}</span>
                          <span className="flex gap-0.5">
                            {[1,2,3,4,5].map(i => (
                              <Star key={i} size={7} className={i <= v.rating ? "fill-[#E8634A] text-[#E8634A]" : "text-gray-300"} />
                            ))}
                          </span>
                        </div>
                        <p className="truncate text-[9px] md:text-[10px] text-[#374151]">{v.comment}</p>
                      </div>
                      <span className={`shrink-0 rounded px-1.5 py-0.5 text-[8px] md:text-[9px] font-medium ${v.statusColor}`}>
                        {v.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   9. Before Display (見え方)
   ═══════════════════════════════════════════ */

function BeforeDisplay({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex h-full items-center border-t border-gray-200 bg-[#FAFAF8] px-4 md:px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.15)} className="mx-auto max-w-[700px] w-full">
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between">
            <SectionLabel>サイト表示の比較</SectionLabel>
            <span className="text-xs text-[#374151]">3/4</span>
          </div>
          <h2 className="mb-2 md:mb-3 text-2xl font-bold md:text-4xl">今のサイト表示</h2>
          <p className="mb-4 md:mb-8 max-w-md text-xs md:text-base leading-relaxed text-[#374151]">
            テキストだけの味気ない表示になっていませんか？
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="rounded-lg border border-gray-200 bg-gray-100 p-4 md:p-8">
            <div className="mb-3 md:mb-4 rounded border border-gray-300 bg-white px-3 md:px-4 py-2 md:py-3 text-left text-xs md:text-sm text-[#374151]">
              Googleフォーム - お客様の声
            </div>
            <div className="space-y-2 md:space-y-3">
              {["まあ良かったです。", "対応が丁寧でした。", "また利用したいです。"].map(
                (text) => (
                  <div key={text} className="rounded border border-gray-300 bg-white p-3 md:p-4">
                    <p className="text-xs md:text-sm text-[#374151]">回答:</p>
                    <p className="text-sm md:text-base text-[#1A1A1A]">{text}</p>
                  </div>
                )
              )}
            </div>
            <p className="mt-4 md:mt-6 text-center text-xs md:text-sm text-[#374151]">
              テキストだけで、信頼感が伝わらない…
            </p>
          </div>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   10. After Display (見え方)
   ═══════════════════════════════════════════ */

function AfterDisplay({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex h-full items-center px-4 md:px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.15)} className="mx-auto max-w-[700px] w-full">
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between">
            <SectionLabel>サイト表示の比較</SectionLabel>
            <span className="text-xs text-[#374151]">4/4</span>
          </div>
          <h2 className="mb-2 md:mb-3 text-2xl font-bold md:text-4xl">
            KoeLogならこう変わる
          </h2>
          <p className="mb-4 md:mb-8 max-w-md text-xs md:text-base leading-relaxed text-[#374151]">
            写真付き・星評価・デザイン統一
          </p>
        </motion.div>

        <motion.div variants={fadeUp}>
          <div className="rounded-lg border border-gray-200 bg-white p-4 md:p-8">
            <div className="space-y-3 md:space-y-4">
              {testimonials.slice(0, 3).map((t) => (
                <div key={t.name} className="rounded-md border border-gray-100 p-3 md:p-4">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 md:h-9 md:w-9 items-center justify-center rounded-full bg-[#F5F3EF] text-xs md:text-sm font-bold text-[#1A1A1A]">
                      {t.initial}
                    </span>
                    <div>
                      <p className="text-xs md:text-sm font-medium text-[#1A1A1A]">{t.name}</p>
                      <Stars count={t.rating} />
                    </div>
                  </div>
                  <p className="mt-2 text-sm md:text-base leading-relaxed text-[#374151]">
                    {t.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   9. Steps
   ═══════════════════════════════════════════ */

function Steps({ isActive }: { isActive: boolean }) {
  const steps = [
    {
      num: "1",
      title: "フォームURLを共有",
      desc: "自動生成されるフォームURLをお客様にシェアするだけ。",
      icon: FileText,
    },
    {
      num: "2",
      title: "ワンクリック承認",
      desc: "届いた声を管理画面で承認。掲載内容をコントロール。",
      icon: CheckCircle,
    },
    {
      num: "3",
      title: "サイトに自動表示",
      desc: "埋め込みコードをコピペ。あとは全自動。",
      icon: Code,
    },
  ];

  return (
    <div className="flex h-full items-center px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.15)} className="mx-auto max-w-[1100px] w-full">
        <motion.div variants={fadeUp}>
          <SectionLabel>導入フロー</SectionLabel>
          <h2 className="mb-6 md:mb-12 text-2xl font-bold md:text-4xl">
            3ステップで完了
          </h2>
        </motion.div>

        <div className="grid gap-12 md:grid-cols-3">
          {steps.map((s) => (
            <motion.div key={s.num} variants={fadeUp}>
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="flex h-9 w-9 items-center justify-center rounded-md bg-[#F5F3EF] text-sm font-bold text-[#E8634A]"
                  style={{ fontFamily: "var(--font-inter)" }}
                >
                  {s.num}
                </span>
                <s.icon size={18} className="text-[#374151]" />
              </div>
              <h3 className="mb-2 text-lg font-bold">{s.title}</h3>
              <p className="text-base leading-relaxed text-[#374151]">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   10. Features
   ═══════════════════════════════════════════ */

function Features({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex h-full items-center border-t border-gray-200 px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.1)} className="mx-auto max-w-[1100px] w-full">
        <motion.div variants={fadeUp}>
          <SectionLabel>機能</SectionLabel>
          <h2 className="mb-6 md:mb-12 text-2xl font-bold md:text-4xl">主な機能</h2>
        </motion.div>

        <div className="grid gap-3 md:gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <motion.div
              key={f.title}
              className="rounded-lg border border-gray-200 bg-white p-3 md:p-5 transition-colors hover:border-gray-300"
              variants={fadeUp}
            >
              <div className="mb-2 md:mb-3 flex items-center gap-3">
                <f.icon size={18} className="text-[#374151]" />
                <h3 className="text-sm md:text-base font-bold">{f.title}</h3>
              </div>
              <p className="text-xs md:text-sm leading-relaxed text-[#374151]">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   11. Pricing — Free
   ═══════════════════════════════════════════ */

function PricingCard({
  plan,
  goTo,
  accent,
}: {
  plan: typeof plans[number];
  goTo: (i: number) => void;
  accent?: boolean;
}) {
  return (
    <div className={`relative mx-auto w-full max-w-[400px] rounded-xl border ${accent ? "border-[#E8634A]" : "border-gray-200"} bg-white p-8 md:p-10`}>
      {plan.recommended && (
        <span className="absolute -top-3.5 left-6 rounded-md bg-[#E8634A] px-4 py-1 text-xs font-medium text-white">
          おすすめ
        </span>
      )}
      <h3 className="mb-2 text-xl font-bold" style={{ fontFamily: "var(--font-inter)" }}>
        {plan.name}
      </h3>
      <p className="mb-6">
        <span className="text-4xl font-bold" style={{ fontFamily: "var(--font-inter)" }}>
          {plan.price}
        </span>
        {plan.period && (
          <span className="text-base font-medium" style={{ color: '#111827' }}>{plan.period}（税込）</span>
        )}
      </p>
      <ul className="mb-8 space-y-3">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-2.5 text-base font-medium" style={{ color: '#111827' }}>
            <Check size={16} className="mt-0.5 shrink-0 text-[#E8634A]" />
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={() => goTo(16)}
        className={`block w-full rounded-md py-3 text-center text-base font-medium transition-opacity hover:opacity-90 cursor-pointer border-none ${
          accent
            ? "bg-[#E8634A] text-white"
            : "border border-gray-200 bg-white text-[#1A1A1A] hover:border-gray-300"
        }`}
      >
        始める
      </button>
    </div>
  );
}

function PricingFree({ isActive, goTo }: { isActive: boolean; goTo: (i: number) => void }) {
  return (
    <div className="flex h-full items-center bg-[#F5F3EF] px-4 md:px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.15)} className="mx-auto max-w-[1100px] w-full">
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between">
            <SectionLabel>料金プラン</SectionLabel>
            <span className="text-xs text-[#374151]">1/3</span>
          </div>
          <h2 className="mb-2 md:mb-3 text-2xl font-bold md:text-4xl">Free</h2>
          <p className="mb-6 md:mb-10 max-w-md text-xs md:text-base leading-relaxed text-[#374151]">
            まずは無料で試す
          </p>
        </motion.div>
        <motion.div variants={popIn}>
          <PricingCard plan={plans[0]} goTo={goTo} />
        </motion.div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   12. Pricing — Pro
   ═══════════════════════════════════════════ */

function PricingPro({ isActive, goTo }: { isActive: boolean; goTo: (i: number) => void }) {
  return (
    <div className="flex h-full items-center px-4 md:px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.15)} className="mx-auto max-w-[1100px] w-full">
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between">
            <SectionLabel>料金プラン</SectionLabel>
            <span className="text-xs text-[#374151]">2/3</span>
          </div>
          <h2 className="mb-2 md:mb-3 text-2xl font-bold md:text-4xl">Pro — おすすめ</h2>
          <p className="mb-6 md:mb-10 max-w-md text-xs md:text-base leading-relaxed text-[#374151]">
            本格運用に
          </p>
        </motion.div>
        <motion.div variants={popIn}>
          <PricingCard plan={plans[1]} goTo={goTo} accent />
        </motion.div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   13. Pricing — Agency
   ═══════════════════════════════════════════ */

function PricingAgency({ isActive, goTo }: { isActive: boolean; goTo: (i: number) => void }) {
  return (
    <div className="flex h-full items-center bg-[#F5F3EF] px-4 md:px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.15)} className="mx-auto max-w-[1100px] w-full">
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-between">
            <SectionLabel>料金プラン</SectionLabel>
            <span className="text-xs text-[#374151]">3/3</span>
          </div>
          <h2 className="mb-2 md:mb-3 text-2xl font-bold md:text-4xl">Agency</h2>
          <p className="mb-6 md:mb-10 max-w-md text-xs md:text-base leading-relaxed text-[#374151]">
            複数クライアントを管理
          </p>
        </motion.div>
        <motion.div variants={popIn}>
          <PricingCard plan={plans[2]} goTo={goTo} />
        </motion.div>
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   14. FAQ
   ═══════════════════════════════════════════ */

function FaqItem({
  item,
  isOpen,
  toggle,
}: {
  item: { q: string; a: string };
  isOpen: boolean;
  toggle: () => void;
}) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={toggle}
        className="flex w-full items-center justify-between py-3 md:py-5 text-left"
      >
        <span className="pr-4 text-sm md:text-base font-medium text-[#1A1A1A]">{item.q}</span>
        {isOpen ? (
          <Minus size={16} className="shrink-0 text-[#374151]" />
        ) : (
          <Plus size={16} className="shrink-0 text-[#374151]" />
        )}
      </button>
      {isOpen && (
        <p className="pb-5 text-sm leading-relaxed text-[#374151]">{item.a}</p>
      )}
    </div>
  );
}

function FAQ({ isActive }: { isActive: boolean }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="flex h-full items-center px-6">
      <AnimatedSection isActive={isActive} variants={staggerContainer(0.08)} className="mx-auto max-w-[700px] w-full">
        <motion.div variants={fadeUp}>
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="mb-4 md:mb-10 text-2xl font-bold md:text-4xl">よくある質問</h2>
        </motion.div>

        {faqData.map((item, i) => (
          <motion.div key={i} variants={fadeUp}>
            <FaqItem
              item={item}
              isOpen={open === i}
              toggle={() => setOpen(open === i ? null : i)}
            />
          </motion.div>
        ))}
      </AnimatedSection>
    </div>
  );
}

/* ═══════════════════════════════════════════
   15. CTA + Footer
   ═══════════════════════════════════════════ */

function WaitlistSection({ isActive }: { isActive: boolean }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ email });
    setSubmitted(true);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-1 items-center justify-center bg-[#F5F3EF] px-6">
        <AnimatedSection isActive={isActive} variants={bounceFade} className="mx-auto max-w-[480px] text-center">
          <h2 className="mb-3 text-3xl font-bold md:text-4xl">
            事前登録する
          </h2>
          <p className="mb-8 text-base" style={{ color: '#6B7280' }}>
            リリース時に優先的にご案内します
          </p>

          {submitted ? (
            <div className="py-8">
              <Check size={32} className="mx-auto mb-3 text-[#E8634A]" />
              <p className="font-bold text-[#1A1A1A]">登録ありがとうございます</p>
              <p className="mt-1 text-sm text-[#374151]">
                招待メールをお待ちください。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="min-w-0 flex-1 rounded-md border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-[#E8634A]"
              />
              <button
                type="submit"
                className="shrink-0 rounded-md bg-[#E8634A] px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                登録
              </button>
            </form>
          )}
        </AnimatedSection>
      </div>
      <footer className="border-t border-gray-200 bg-[#F5F3EF] px-6 py-8">
        <div className="mx-auto flex max-w-[1100px] items-center justify-between">
          <span className="text-sm font-bold text-[#1A1A1A]" style={{ fontFamily: "var(--font-inter)" }}>
            KoeLog
          </span>
          <span className="text-xs text-[#374151]">&copy; 2026 KoeLog</span>
        </div>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════
   Navigation Dots
   ═══════════════════════════════════════════ */

function NavDots({
  total,
  current,
  goTo,
}: {
  total: number;
  current: number;
  goTo: (i: number) => void;
}) {
  return (
    <nav className="nav-dots" aria-label="セクションナビゲーション">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          className={`nav-dot ${i === current ? "active" : ""}`}
          onClick={() => goTo(i)}
          aria-label={SECTION_NAMES[i] || `セクション ${i + 1}`}
        />
      ))}
    </nav>
  );
}

/* ═══════════════════════════════════════════
   Page — FullPage Controller
   ═══════════════════════════════════════════ */

const TOTAL_SECTIONS = 17;
const DEBOUNCE_MS = 900;

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const isTransitioning = useRef(false);
  const touchStartY = useRef(0);

  const goTo = useCallback((index: number) => {
    if (index < 0 || index >= TOTAL_SECTIONS || index === currentSection) return;
    if (isTransitioning.current) return;
    isTransitioning.current = true;
    setCurrentSection(index);
    setTimeout(() => {
      isTransitioning.current = false;
    }, DEBOUNCE_MS);
  }, [currentSection]);

  const goNext = useCallback(() => goTo(currentSection + 1), [currentSection, goTo]);
  const goPrev = useCallback(() => goTo(currentSection - 1), [currentSection, goTo]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const target = e.target as HTMLElement;
      const scrollable = target.closest(".fullpage-section[data-state='active']");
      if (scrollable) {
        const el = scrollable as HTMLElement;
        const hasScroll = el.scrollHeight > el.clientHeight;
        if (hasScroll) {
          const atTop = el.scrollTop <= 0;
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
          if (e.deltaY > 0 && !atBottom) return;
          if (e.deltaY < 0 && !atTop) return;
        }
      }

      e.preventDefault();
      if (e.deltaY > 5) goNext();
      else if (e.deltaY < -5) goPrev();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        goPrev();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 50) return;

      const target = e.target as HTMLElement;
      const scrollable = target.closest(".fullpage-section[data-state='active']");
      if (scrollable) {
        const el = scrollable as HTMLElement;
        const hasScroll = el.scrollHeight > el.clientHeight;
        if (hasScroll) {
          const atTop = el.scrollTop <= 0;
          const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 2;
          if (deltaY > 0 && !atBottom) return;
          if (deltaY < 0 && !atTop) return;
        }
      }

      if (deltaY > 0) goNext();
      else goPrev();
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [goNext, goPrev]);

  return (
    <>
      <Header currentSection={currentSection} goTo={goTo} />
      <NavDots total={TOTAL_SECTIONS} current={currentSection} goTo={goTo} />
      <div className="fullpage-container">
        <FullPageSection index={0} currentSection={currentSection}>
          <Hero isActive={currentSection === 0} goTo={goTo} />
        </FullPageSection>
        <FullPageSection index={1} currentSection={currentSection}>
          <PainPoints isActive={currentSection === 1} />
        </FullPageSection>
        <FullPageSection index={2} currentSection={currentSection}>
          <WidgetDemoCard isActive={currentSection === 2} />
        </FullPageSection>
        <FullPageSection index={3} currentSection={currentSection}>
          <WidgetDemoCarousel isActive={currentSection === 3} />
        </FullPageSection>
        <FullPageSection index={4} currentSection={currentSection}>
          <WidgetDemoBadge isActive={currentSection === 4} />
        </FullPageSection>
        <FullPageSection index={5} currentSection={currentSection}>
          <BeforeCollect isActive={currentSection === 5} />
        </FullPageSection>
        <FullPageSection index={6} currentSection={currentSection}>
          <AfterCollect isActive={currentSection === 6} />
        </FullPageSection>
        <FullPageSection index={7} currentSection={currentSection}>
          <DashboardPreview isActive={currentSection === 7} />
        </FullPageSection>
        <FullPageSection index={8} currentSection={currentSection}>
          <BeforeDisplay isActive={currentSection === 8} />
        </FullPageSection>
        <FullPageSection index={9} currentSection={currentSection}>
          <AfterDisplay isActive={currentSection === 9} />
        </FullPageSection>
        <FullPageSection index={10} currentSection={currentSection}>
          <Steps isActive={currentSection === 10} />
        </FullPageSection>
        <FullPageSection index={11} currentSection={currentSection}>
          <Features isActive={currentSection === 11} />
        </FullPageSection>
        <FullPageSection index={12} currentSection={currentSection}>
          <PricingFree isActive={currentSection === 12} goTo={goTo} />
        </FullPageSection>
        <FullPageSection index={13} currentSection={currentSection}>
          <PricingPro isActive={currentSection === 13} goTo={goTo} />
        </FullPageSection>
        <FullPageSection index={14} currentSection={currentSection}>
          <PricingAgency isActive={currentSection === 14} goTo={goTo} />
        </FullPageSection>
        <FullPageSection index={15} currentSection={currentSection}>
          <FAQ isActive={currentSection === 15} />
        </FullPageSection>
        <FullPageSection index={16} currentSection={currentSection}>
          <WaitlistSection isActive={currentSection === 16} />
        </FullPageSection>
      </div>
    </>
  );
}

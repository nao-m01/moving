import React, { useState } from "react";

// ====== サンプルデータ ======
const PROJECT = {
  client: "株式会社サンプル商事",
  moveDate: "2026年7月14日（火）",
  from: "渋谷区道玄坂1-2-3 第一ビル5F",
  to: "港区虎ノ門4-5-6 新虎ノ門タワー8F",
  note: "エレベーター使用時間 8:00〜18:00。旧オフィス駐車場は2台まで。搬入口は新オフィス地下1F。",
};

const LEADERS = [
  {
    id: 1,
    name: "田中 誠",
    role: "搬出リーダー",
    color: "#E85D04",
    icon: "📦",
    truck: "4tトラック ① （品川 あ 1234）",
    area: "旧オフィス全域（A〜Dゾーン）",
    schedule: [
      { time: "07:30", task: "現地集合・朝礼", type: "meeting" },
      { time: "08:00", task: "旧オフィス搬出開始（Aゾーン）", type: "work" },
      { time: "09:30", task: "Bゾーン搬出", type: "work" },
      { time: "11:00", task: "C・Dゾーン搬出", type: "work" },
      { time: "12:00", task: "昼休憩（30分）", type: "break" },
      { time: "12:30", task: "搬出完了確認・積み込み", type: "work" },
      { time: "14:00", task: "旧オフィス出発", type: "move" },
    ],
    cautions: [
      "精密機器（サーバー）は専用クレートに分離",
      "A4緑シール＝優先搬入品（先に積む）",
      "旧オフィス鍵は搬出完了後に担当者へ返却",
    ],
    emergency: [{ name: "本部 山田", tel: "090-1234-5678" }],
  },
  {
    id: 2,
    name: "鈴木 花子",
    role: "搬入リーダー",
    color: "#0077B6",
    icon: "🏢",
    truck: "4tトラック ② （港 い 5678）",
    area: "新オフィス全域（1〜4エリア）",
    schedule: [
      { time: "07:30", task: "新オフィス現地集合・下見", type: "meeting" },
      { time: "08:00", task: "養生・搬入準備", type: "work" },
      { time: "10:00", task: "搬入開始（1・2エリア）", type: "work" },
      { time: "12:00", task: "昼休憩（30分）", type: "break" },
      { time: "12:30", task: "3・4エリア搬入", type: "work" },
      { time: "15:00", task: "精密機器・サーバー設置", type: "work" },
      { time: "17:00", task: "養生撤去・完了確認", type: "work" },
      { time: "18:00", task: "完了報告・引き渡し", type: "meeting" },
    ],
    cautions: [
      "エレベーター内に養生シート必須（管理会社指示）",
      "搬入口は地下1F（高さ制限2.2m）",
      "レイアウト図はアプリ下部PDF参照",
    ],
    emergency: [{ name: "本部 山田", tel: "090-1234-5678" }],
  },
  {
    id: 3,
    name: "佐藤 大輔",
    role: "輸送リーダー",
    color: "#2D6A4F",
    icon: "🚛",
    truck: "2tトラック ③ （目黒 う 9012）",
    area: "精密機器・重要物品 専任輸送",
    schedule: [
      { time: "08:00", task: "旧オフィス到着・積み込み待機", type: "meeting" },
      { time: "13:00", task: "精密機器積み込み開始", type: "work" },
      { time: "13:45", task: "積み込み完了・出発", type: "move" },
      { time: "14:30", task: "新オフィス到着", type: "move" },
      { time: "14:45", task: "精密機器搬入・設置立ち会い", type: "work" },
      { time: "16:00", task: "完了確認", type: "meeting" },
    ],
    cautions: [
      "サーバーは縦置き禁止・振動に注意",
      "到着時は必ず搬入リーダー（鈴木）に連絡",
      "走行中 急ブレーキ・急ハンドル厳禁",
    ],
    emergency: [{ name: "本部 山田", tel: "090-1234-5678" }],
  },
];

const typeStyle = {
  meeting: { bg: "#FFF3E0", color: "#E65100", label: "●" },
  work: { bg: "#E3F2FD", color: "#1565C0", label: "▶" },
  break: { bg: "#F3E5F5", color: "#6A1B9A", label: "☕" },
  move: { bg: "#E8F5E9", color: "#2E7D32", label: "🚛" },
};

export default function App() {
  const [view, setView] = useState("top"); // top | leader | tab
  const [selectedLeader, setSelectedLeader] = useState(null);
  const [activeTab, setActiveTab] = useState("schedule");

  // ── トップ画面 ──
  if (view === "top") {
    return (
      <div style={styles.shell}>
        {/* ヘッダー */}
        <div style={{ background: "#1a1a2e", padding: "28px 20px 20px" }}>
          <div style={{ fontSize: 10, color: "#888", letterSpacing: 3, marginBottom: 6 }}>
            MOVING OPERATION
          </div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", lineHeight: 1.3 }}>
            作業指示書
          </div>
          <div style={{ marginTop: 14, background: "#16213e", borderRadius: 12, padding: "14px 16px" }}>
            <Row label="お客様" value={PROJECT.client} />
            <Row label="移転日" value={PROJECT.moveDate} accent />
            <Row label="旧住所" value={PROJECT.from} small />
            <Row label="新住所" value={PROJECT.to} small />
          </div>
          <div style={{
            marginTop: 12, background: "#16213e", borderRadius: 12, padding: "12px 16px",
            borderLeft: "3px solid #E85D04",
          }}>
            <div style={{ fontSize: 11, color: "#E85D04", fontWeight: 700, marginBottom: 4 }}>⚠ 全体注意事項</div>
            <div style={{ fontSize: 13, color: "#ccc", lineHeight: 1.6 }}>{PROJECT.note}</div>
          </div>
        </div>

        {/* リーダー選択 */}
        <div style={{ padding: "20px 16px 100px" }}>
          <div style={{ fontSize: 13, color: "#888", marginBottom: 12, fontWeight: 600, letterSpacing: 1 }}>
            担当リーダーを選択
          </div>
          {LEADERS.map(leader => (
            <button key={leader.id} onClick={() => { setSelectedLeader(leader); setActiveTab("schedule"); setView("leader"); }}
              style={{
                width: "100%", background: "#1e1e2e", border: `1px solid ${leader.color}44`,
                borderRadius: 16, padding: "18px 16px", marginBottom: 12,
                cursor: "pointer", textAlign: "left", display: "flex", alignItems: "center", gap: 14,
              }}>
              <div style={{
                width: 52, height: 52, borderRadius: 14, flexShrink: 0,
                background: `${leader.color}22`, border: `2px solid ${leader.color}`,
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 22 }}>{leader.icon}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 800, color: "#fff" }}>{leader.name}</div>
                <div style={{ fontSize: 12, color: leader.color, fontWeight: 600, marginTop: 2 }}>{leader.role}</div>
                <div style={{ fontSize: 11, color: "#666", marginTop: 4 }}>{leader.truck}</div>
              </div>
              <div style={{ fontSize: 20, color: "#444" }}>›</div>
            </button>
          ))}
        </div>
      </div>
    );
  }

  // ── リーダー詳細画面 ──
  const L = selectedLeader;
  const tabs = [
    { id: "schedule", label: "スケジュール", icon: "🕐" },
    { id: "area", label: "担当エリア", icon: "📍" },
    { id: "caution", label: "注意事項", icon: "⚠️" },
    { id: "emergency", label: "緊急連絡", icon: "📞" },
  ];

  return (
    <div style={styles.shell}>
      {/* ヘッダー */}
      <div style={{ background: "#1a1a2e", padding: "20px 16px 0" }}>
        <button onClick={() => setView("top")} style={{
          background: "none", border: "none", color: "#888", cursor: "pointer",
          fontSize: 13, padding: "0 0 12px", display: "flex", alignItems: "center", gap: 4,
        }}>
          ‹ 戻る
        </button>
        <div style={{ display: "flex", alignItems: "center", gap: 14, paddingBottom: 16 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, flexShrink: 0,
            background: `${L.color}22`, border: `2px solid ${L.color}`,
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26,
          }}>
            {L.icon}
          </div>
          <div>
            <div style={{ fontSize: 11, color: L.color, fontWeight: 700, letterSpacing: 1 }}>{L.role}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: "#fff" }}>{L.name}</div>
            <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{L.truck}</div>
          </div>
        </div>

        {/* タブ */}
        <div style={{ display: "flex", borderTop: "1px solid #333", overflowX: "auto" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
              flex: "0 0 auto", padding: "11px 16px", background: "none", border: "none",
              cursor: "pointer", fontSize: 12, fontWeight: 600,
              color: activeTab === t.id ? L.color : "#555",
              borderBottom: activeTab === t.id ? `2px solid ${L.color}` : "2px solid transparent",
              whiteSpace: "nowrap",
            }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* コンテンツ */}
      <div style={{ padding: "16px 16px 80px", overflowY: "auto" }}>

        {/* スケジュール */}
        {activeTab === "schedule" && (
          <div>
            <div style={{ fontSize: 12, color: "#666", marginBottom: 14 }}>
              📅 {PROJECT.moveDate}
            </div>
            {L.schedule.map((s, i) => {
              const ts = typeStyle[s.type];
              const isNext = i === L.schedule.findIndex(x => x.type !== "break");
              return (
                <div key={i} style={{ display: "flex", gap: 12, marginBottom: 4 }}>
                  {/* タイムライン線 */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: 48, flexShrink: 0 }}>
                    <div style={{
                      fontSize: 12, fontWeight: 700, color: "#aaa",
                      fontVariantNumeric: "tabular-nums",
                    }}>{s.time}</div>
                    {i < L.schedule.length - 1 && (
                      <div style={{ width: 1, flex: 1, background: "#333", minHeight: 16, margin: "4px 0" }} />
                    )}
                  </div>
                  {/* カード */}
                  <div style={{
                    flex: 1, background: ts.bg, borderRadius: 10,
                    padding: "10px 14px", marginBottom: 8,
                    borderLeft: `3px solid ${ts.color}`,
                  }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>
                      {ts.label} {s.task}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 担当エリア */}
        {activeTab === "area" && (
          <div>
            <div style={{ background: `${L.color}18`, border: `1px solid ${L.color}44`, borderRadius: 14, padding: "16px" }}>
              <div style={{ fontSize: 12, color: L.color, fontWeight: 700, marginBottom: 6 }}>担当エリア</div>
              <div style={{ fontSize: 17, fontWeight: 800, color: "#111", lineHeight: 1.4 }}>{L.area}</div>
            </div>

            <div style={{ marginTop: 16, background: "#f8f9fa", borderRadius: 14, padding: "16px" }}>
              <div style={{ fontSize: 12, color: "#888", fontWeight: 700, marginBottom: 10 }}>使用車両</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 32 }}>🚛</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: "#111" }}>{L.truck}</div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 16, background: "#fff3e0", borderRadius: 14, padding: "16px" }}>
              <div style={{ fontSize: 12, color: "#E65100", fontWeight: 700, marginBottom: 8 }}>📍 現場住所</div>
              <div style={{ fontSize: 13, color: "#333", marginBottom: 6 }}>
                <span style={{ color: "#888", fontSize: 11 }}>旧オフィス</span><br />
                {PROJECT.from}
              </div>
              <div style={{ borderTop: "1px solid #ffe0b2", paddingTop: 10, marginTop: 4 }}>
                <span style={{ color: "#888", fontSize: 11 }}>新オフィス</span><br />
                <span style={{ fontSize: 13, color: "#333" }}>{PROJECT.to}</span>
              </div>
            </div>
          </div>
        )}

        {/* 注意事項 */}
        {activeTab === "caution" && (
          <div>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>必ず全員で確認してください</div>
            {L.cautions.map((c, i) => (
              <div key={i} style={{
                background: "#fff", border: "1px solid #eee",
                borderLeft: `4px solid ${L.color}`,
                borderRadius: 12, padding: "14px 16px", marginBottom: 10,
                display: "flex", gap: 12, alignItems: "flex-start",
              }}>
                <div style={{
                  width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
                  background: L.color, color: "#fff",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 13, fontWeight: 700,
                }}>{i + 1}</div>
                <div style={{ fontSize: 14, color: "#111", lineHeight: 1.6, fontWeight: 600 }}>{c}</div>
              </div>
            ))}

            <div style={{ marginTop: 16, background: "#fff3e0", borderRadius: 12, padding: "14px 16px", borderLeft: "4px solid #E85D04" }}>
              <div style={{ fontSize: 12, color: "#E85D04", fontWeight: 700, marginBottom: 6 }}>⚠ 全体共通注意事項</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>{PROJECT.note}</div>
            </div>
          </div>
        )}

        {/* 緊急連絡 */}
        {activeTab === "emergency" && (
          <div>
            <div style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>緊急時・判断に迷う場合は下記へ</div>

            {/* 体制図 */}
            <div style={{ background: "#1a1a2e", borderRadius: 14, padding: "16px", marginBottom: 16 }}>
              <div style={{ fontSize: 12, color: "#888", marginBottom: 12, fontWeight: 600 }}>作業体制図</div>
              <div style={{ textAlign: "center" }}>
                <div style={{
                  display: "inline-block", background: "#E85D04", color: "#fff",
                  borderRadius: 8, padding: "8px 20px", fontSize: 13, fontWeight: 700, marginBottom: 8
                }}>
                  現場統括：山田 部長
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 2, marginBottom: 8 }}>
                  {["", "│", ""].map((x, i) => <div key={i} style={{ width: 80, textAlign: "center", color: "#444", fontSize: 18 }}>{i === 1 ? "│" : ""}</div>)}
                </div>
                <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                  {LEADERS.map(ldr => (
                    <div key={ldr.id} style={{
                      background: ldr.id === L.id ? `${ldr.color}33` : "#111",
                      border: `1px solid ${ldr.color}`,
                      borderRadius: 8, padding: "8px 10px", fontSize: 11, color: "#fff",
                      fontWeight: ldr.id === L.id ? 800 : 400, textAlign: "center",
                    }}>
                      {ldr.icon}<br />{ldr.name.split(" ")[0]}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 連絡先 */}
            {[...L.emergency, { name: "緊急本部直通", tel: "03-1234-5678" }].map((e, i) => (
              <a key={i} href={`tel:${e.tel}`} style={{
                display: "flex", alignItems: "center", gap: 14,
                background: "#fff", border: "1px solid #eee", borderRadius: 14,
                padding: "16px", marginBottom: 10, textDecoration: "none",
              }}>
                <div style={{
                  width: 44, height: 44, borderRadius: "50%", background: "#E8F5E9",
                  display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0
                }}>📞</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: "#888", marginBottom: 2 }}>{e.name}</div>
                  <div style={{ fontSize: 20, fontWeight: 800, color: "#111", letterSpacing: 1 }}>{e.tel}</div>
                </div>
                <div style={{
                  background: "#2D6A4F", color: "#fff", borderRadius: 20,
                  padding: "6px 14px", fontSize: 12, fontWeight: 700,
                }}>発信</div>
              </a>
            ))}

            <div style={{ marginTop: 8, background: "#FFF8E1", borderRadius: 12, padding: "14px 16px" }}>
              <div style={{ fontSize: 12, color: "#F57F17", fontWeight: 700, marginBottom: 4 }}>📋 判断基準</div>
              <div style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>
                • 怪我・事故 → 即時連絡<br />
                • 作業遅延30分以上 → 報告<br />
                • お客様クレーム → 即時エスカレーション
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Row({ label, value, accent, small }) {
  return (
    <div style={{ display: "flex", gap: 8, marginBottom: 8, alignItems: "flex-start" }}>
      <div style={{ fontSize: 10, color: "#666", minWidth: 44, paddingTop: 2, letterSpacing: 0.5 }}>{label}</div>
      <div style={{ fontSize: accent ? 15 : small ? 11 : 13, fontWeight: accent ? 800 : 500, color: accent ? "#F59E0B" : "#ccc", lineHeight: 1.4 }}>
        {value}
      </div>
    </div>
  );
}

const styles = {
  shell: {
    minHeight: "100vh",
    background: "#f0f2f5",
    fontFamily: "'Noto Sans JP', 'Hiragino Kaku Gothic ProN', sans-serif",
    maxWidth: 480,
    margin: "0 auto",
    overflowX: "hidden",
  },
};

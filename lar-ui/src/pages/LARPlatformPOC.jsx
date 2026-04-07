import { useState } from "react";

// ============================================================================
// LAR LIFECYCLE MANAGEMENT PLATFORM — POC v3
// Beazer Homes × Calance
// Style: SharePoint-aligned (reverse-engineered from Vera/Land Acq pages)
// ============================================================================

// -- TOKENS (from beazer-lar-platform-style-guide.yaml) --
const T = {
  red: "#9F2C32", redDk: "#7A2128", redLt: "#C4545A",
  white: "#FFFFFF", offWhite: "#F8F8F8", lightGray: "#F3F2F1",
  midGray: "#EDEBE9", borderGray: "#D2D0CE",
  txt2: "#605E5C", txt1: "#323130", txtDk: "#201F1E",
  success: "#107C10", successBg: "#DFF6DD",
  warning: "#FFB900", warningBg: "#FFF4CE",
  error: "#D13438", errorBg: "#FDE7E9",
  info: "#0078D4", infoBg: "#EDF2F9",
};
const FF = "'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif";

const ZONES = [
  { id: "z1", label: "Pre-LAR", title: "Pre-LAR / Site Screening", accent: T.info, bg: T.infoBg, desc: "Scout litmus test, preliminary pro forma, remain check approval" },
  { id: "z2", label: "Due Diligence", title: "Due Diligence & LAR Package", accent: T.warning, bg: T.warningBg, desc: "60–90 day feasibility, tech assessment, CMA, full pro forma, President's Letter" },
  { id: "z3", label: "Clear to Close", title: "Clear to Close", accent: T.success, bg: T.successBg, desc: "Updated CMA, TOP refresh, tech assessment update, update memo" },
  { id: "z4", label: "Land Banking", title: "Land Banking / Check-in", accent: T.txt2, bg: T.lightGray, desc: "Margin review, activation strategy, updated pro forma" },
];

const DEALS = [
  { id: 1, name: "Kings Grove", div: "Southeast", zone: "z2", type: "Master Plan", risk: "normal", status: "In Progress", days: 22, pct: 55, lead: "Sarah Mitchell", next: "CMA due in 8 days", score: 72 },
  { id: 2, name: "Ridgewater Estates", div: "Texas", zone: "z1", type: "Raw Land", risk: "fastTrack", status: "Screening", days: 5, pct: 30, lead: "John Parekh", next: "Scout TOP pending", score: null },
  { id: 3, name: "Pinehurst Landing", div: "Mid-Atlantic", zone: "z3", type: "Infill", risk: "normal", status: "Clear to Close", days: 12, pct: 70, lead: "Maria Lopez", next: "Update memo draft", score: 81 },
  { id: 4, name: "Osprey Point", div: "Southeast", zone: "z2", type: "Finished Lots", risk: "fastTrack", status: "In Progress", days: 41, pct: 85, lead: "David Chen", next: "President's Letter review", score: 88 },
  { id: 5, name: "Brookstone Village", div: "West", zone: "z4", type: "Master Plan", risk: "higherRisk", status: "Land Bank Review", days: 8, pct: 40, lead: "Amy Tran", next: "Proforma refresh due", score: 65 },
  { id: 6, name: "Harvest Glen", div: "Texas", zone: "z1", type: "Raw Land", risk: "normal", status: "Remain Check", days: 3, pct: 60, lead: "Carlos Rivera", next: "Approval pending", score: null },
];

const ST = {
  complete: { label: "Complete", bg: T.successBg, color: T.success, icon: "✓" },
  in_progress: { label: "In Progress", bg: T.warningBg, color: "#7A6400", icon: "◐" },
  not_started: { label: "Not Started", bg: T.lightGray, color: T.txt2, icon: "○" },
  blocked: { label: "Blocked", bg: T.errorBg, color: T.error, icon: "⊘" },
  overdue: { label: "Overdue", bg: T.errorBg, color: T.error, icon: "!" },
};

const RISK = {
  fastTrack: { bg: T.successBg, color: T.success, label: "Fast Track" },
  normal: { bg: T.infoBg, color: T.info, label: "Normal" },
  higherRisk: { bg: T.warningBg, color: "#7A6400", label: "Higher Risk" },
  boardNotification: { bg: T.errorBg, color: "#A4262C", label: "Board Notif." },
  boardApproval: { bg: T.error, color: T.white, label: "Board Approval" },
};

const Z2_ITEMS = [
  { id: "proforma", label: "Pro Forma", team: "Land Acquisition", person: "Sarah Mitchell", status: "complete", eta: "Mar 15", submitted: "Mar 14", desc: "Full pro forma with sale starts, closing schedule, development budget", handoffFrom: null, handoffTo: null },
  { id: "contract", label: "Contract Summary", team: "Land Acquisition", person: "Sarah Mitchell", status: "complete", eta: "Mar 12", submitted: "Mar 12", desc: "Contract terms, contingencies, key dates", handoffFrom: null, handoffTo: null },
  { id: "tech", label: "Technical Assessment", team: "Land Development", person: "Mike Torres", status: "in_progress", eta: "Apr 2", submitted: null, desc: "Environmental, easements, offsite improvements, soils, title review", handoffFrom: "Land Acquisition", handoffTo: "Land Acquisition" },
  { id: "cma", label: "CMA / Market Analysis", team: "Sales", person: "Jennifer Walsh", status: "in_progress", eta: "Mar 30", submitted: null, desc: "Comparable market analysis, pricing strategy, competitive landscape", handoffFrom: "Land Acquisition", handoffTo: "Land Acquisition" },
  { id: "top", label: "Triangle of Potential (TOP)", team: "Land Acquisition", person: "Sarah Mitchell", status: "not_started", eta: "Apr 5", submitted: null, desc: "Affordability test — ASP, mortgage rates, fair share of demand", handoffFrom: null, handoffTo: null, dependsOn: ["cma", "proforma"] },
  { id: "3w", label: "3W Alignment Test", team: "Land Acquisition", person: "Sarah Mitchell", status: "not_started", eta: "Apr 5", submitted: null, desc: "Who (buyer profile), What (product fit), Where (location strategy)", handoffFrom: null, handoffTo: null, dependsOn: ["top"] },
  { id: "marketing", label: "Marketing / Activation Plan", team: "Marketing", person: "Lisa Park", status: "not_started", eta: "Apr 4", submitted: null, desc: "Community activation, startup strategy, brand positioning", handoffFrom: "Land Acquisition", handoffTo: "Land Acquisition" },
  { id: "budget", label: "Directs / Building Costs", team: "Finance & Purchasing", person: "Tom Bradley", status: "in_progress", eta: "Mar 28", submitted: null, desc: "Sticks & bricks cost, price reduction/increase forecasts", handoffFrom: "Land Acquisition", handoffTo: "Land Acquisition" },
  { id: "letter", label: "President's Letter", team: "AI + Land Acquisition", person: "Sarah Mitchell", status: "blocked", eta: "Apr 8", submitted: null, desc: "Executive summary — AI-generated once all components complete", handoffFrom: null, handoffTo: null, dependsOn: ["proforma", "contract", "tech", "cma", "top", "3w", "marketing", "budget"] },
];

const Z3_ITEMS = [
  { id: "cma_update", label: "CMA Update", team: "Sales", person: "Jennifer Walsh", status: "in_progress", eta: "Apr 15", submitted: null, desc: "Refreshed CMA with current conditions", handoffFrom: "Land Acquisition", handoffTo: "Land Acquisition" },
  { id: "top_refresh", label: "TOP Refresh", team: "Land Acquisition", person: "Maria Lopez", status: "not_started", eta: "Apr 18", submitted: null, desc: "Updated Triangle of Potential", handoffFrom: null, handoffTo: null },
  { id: "tech_update", label: "Tech Assessment Update", team: "Land Development", person: "Mike Torres", status: "not_started", eta: "Apr 20", submitted: null, desc: "Updated site conditions, remaining risks", handoffFrom: "Land Acquisition", handoffTo: "Land Acquisition" },
  { id: "proforma_update", label: "Pro Forma Update", team: "Land Acquisition", person: "Maria Lopez", status: "not_started", eta: "Apr 22", submitted: null, desc: "Revised pro forma with current costs", handoffFrom: null, handoffTo: null },
  { id: "update_memo", label: "Update Memo", team: "AI + Land Acquisition", person: "Maria Lopez", status: "blocked", eta: "Apr 25", submitted: null, desc: "AI-generated summary of changes since LAR approval", handoffFrom: null, handoffTo: null, dependsOn: ["cma_update", "top_refresh", "tech_update", "proforma_update"] },
];

const Z4_ITEMS = [
  { id: "proforma_refresh", label: "Pro Forma Refresh", team: "Land Acquisition", person: "Amy Tran", status: "in_progress", eta: "Apr 10", submitted: null, desc: "Current margin analysis, updated cost assumptions", handoffFrom: null, handoffTo: null },
  { id: "cma_refresh", label: "CMA Refresh", team: "Sales", person: "Jennifer Walsh", status: "not_started", eta: "Apr 12", submitted: null, desc: "Current market conditions, pricing validation", handoffFrom: "Land Acquisition", handoffTo: "Land Acquisition" },
  { id: "activation", label: "Activation Strategy", team: "Marketing", person: "Lisa Park", status: "not_started", eta: "Apr 15", submitted: null, desc: "Community launch plan, timing, brand positioning", handoffFrom: "Land Acquisition", handoffTo: "Land Acquisition" },
  { id: "checkin_memo", label: "Check-in Memo", team: "AI + Land Acquisition", person: "Amy Tran", status: "blocked", eta: "Apr 18", submitted: null, desc: "AI-generated status on project health and activation readiness", handoffFrom: null, handoffTo: null, dependsOn: ["proforma_refresh", "cma_refresh", "activation"] },
];

const NOTIFICATIONS = [
  { id: 1, type: "overdue", deal: "Kings Grove", msg: "Directs / Building Costs approaching ETA (Mar 28)", team: "Finance & Purchasing", person: "Tom Bradley", time: "Just now", urgency: "high" },
  { id: 2, type: "upcoming", deal: "Kings Grove", msg: "CMA due in 5 days", team: "Sales", person: "Jennifer Walsh", time: "2h ago", urgency: "medium" },
  { id: 3, type: "submitted", deal: "Osprey Point", msg: "President's Letter draft generated by AI", team: "AI", person: "System", time: "Yesterday", urgency: "info" },
  { id: 4, type: "handoff", deal: "Kings Grove", msg: "Tech Assessment delegated to Land Development", team: "Land Acquisition → Land Development", person: "Sarah Mitchell → Mike Torres", time: "3 days ago", urgency: "info" },
  { id: 5, type: "overdue", deal: "Osprey Point", msg: "Marketing plan is 3 days past ETA", team: "Marketing", person: "Lisa Park", time: "3 days ago", urgency: "high" },
  { id: 6, type: "zone_change", deal: "Pinehurst Landing", msg: "Deal moved to Clear to Close", team: "System", person: "Auto", time: "5 days ago", urgency: "info" },
];

const RISK_ITEMS = [
  { category: "Market", flag: "ASP assumptions 8% above current comps", severity: "high", source: "CMA vs Pro Forma" },
  { category: "Timeline", flag: "Development start assumes Q2 approvals — no permits filed", severity: "high", source: "Tech Assessment + Pro Forma" },
  { category: "Financial", flag: "Building cost escalation not factored beyond 12 months", severity: "medium", source: "Pro Forma sensitivity" },
  { category: "Competitive", flag: "3 active communities within 2mi at lower price points", severity: "medium", source: "CMA analysis" },
  { category: "Regulatory", flag: "Pending HOA document review — developer non-responsive", severity: "low", source: "Tech Assessment" },
];

// ---- SHARED UI (SharePoint-aligned) ----

const SectionBanner = ({ title, sub }) => (
  <div style={{ background: T.red, padding: "16px 24px", marginTop: 24, marginBottom: 16 }}>
    <div style={{ fontSize: 20, fontWeight: 600, color: T.white }}>{title}</div>
    {sub && <div style={{ fontSize: 12, color: "rgba(255,255,255,0.85)", marginTop: 2 }}>{sub}</div>}
  </div>
);

const SectionHeading = ({ children, right }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28, marginBottom: 12 }}>
    <div style={{ fontSize: 20, fontWeight: 600, color: T.txtDk }}>{children}</div>
    {right}
  </div>
);

const Metric = ({ label, value, accent, sub }) => (
  <div style={{ background: T.white, border: `1px solid ${T.borderGray}`, borderLeft: `3px solid ${accent || T.red}`, borderRadius: 2, padding: "10px 14px", flex: 1, minWidth: 100 }}>
    <div style={{ fontSize: 12, fontWeight: 600, color: T.txt2, marginBottom: 4 }}>{label}</div>
    <div style={{ fontSize: 20, fontWeight: 600, color: accent || T.red }}>{value}</div>
    {sub && <div style={{ fontSize: 11, color: T.txt2, marginTop: 2 }}>{sub}</div>}
  </div>
);

const Progress = ({ pct, accent, h }) => (
  <div style={{ background: T.midGray, borderRadius: 2, height: h || 4, width: "100%", overflow: "hidden" }}>
    <div style={{ width: `${pct}%`, height: "100%", borderRadius: 2, background: accent || T.red, transition: "width 0.4s" }} />
  </div>
);

const Badge = ({ status }) => { const s = ST[status] || ST.not_started; return <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 2, background: s.bg, color: s.color }}>{s.icon} {s.label}</span>; };

const ZTag = ({ zone }) => { const z = ZONES.find(x => x.id === zone); return z ? <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 2, background: z.bg, color: z.accent, borderLeft: `3px solid ${z.accent}` }}>{z.label}</span> : null; };

const RiskTag = ({ risk }) => { const r = RISK[risk]; return r ? <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 2, background: r.bg, color: r.color }}>{r.label}</span> : null; };

const Tag = ({ text, color, bg }) => <span style={{ fontSize: 11, fontWeight: 400, padding: "2px 8px", borderRadius: 2, background: bg || T.lightGray, color: color || T.txt2 }}>{text}</span>;

const Card = ({ children, style, onClick }) => (
  <div onClick={onClick} style={{ background: T.white, border: `1px solid ${T.borderGray}`, borderRadius: 2, padding: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)", cursor: onClick ? "pointer" : "default", ...style }}>
    {children}
  </div>
);

const Btn = ({ children, primary, onClick, style }) => (
  <button onClick={onClick} style={{ padding: "6px 16px", borderRadius: 2, border: primary ? "none" : `1px solid ${T.borderGray}`, background: primary ? T.red : T.white, color: primary ? T.white : T.txt1, fontSize: 13, fontWeight: 600, cursor: "pointer", ...style }}>{children}</button>
);

// ---- HEADER ----
function Header({ view, onNav }) {
  const urgent = NOTIFICATIONS.filter(n => n.urgency === "high").length;
  const navItems = ["dashboard", "pipeline", "deal", "architecture"];
  return (
    <div style={{ position: "sticky", top: 0, zIndex: 100, background: T.white }}>
      {/* Suite bar */}
      <div style={{ background: T.white, borderBottom: `1px solid ${T.borderGray}`, padding: "8px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: T.red, letterSpacing: 0.5 }}>BEAZER</span>
          <span style={{ fontSize: 14, fontWeight: 300, color: T.txt2 }}>HOMES</span>
          <div style={{ width: 1, height: 20, background: T.borderGray, margin: "0 8px" }} />
          <span style={{ fontSize: 14, fontWeight: 600, color: T.txtDk }}>LAR Lifecycle Platform</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: 14, color: T.txt2, cursor: "pointer" }}>Notifications</span>
            {urgent > 0 && <span style={{ position: "absolute", top: -6, right: -10, background: T.error, color: T.white, fontSize: 10, fontWeight: 700, width: 16, height: 16, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{urgent}</span>}
          </div>
          <span style={{ fontSize: 12, color: T.txt2 }}>In partnership with <strong style={{ color: T.txtDk }}>Calance</strong></span>
        </div>
      </div>
      {/* Nav bar */}
      <div style={{ background: T.white, borderBottom: `1px solid ${T.borderGray}`, padding: "0 24px", display: "flex", gap: 0 }}>
        {navItems.map(v => (
          <button key={v} onClick={() => onNav(v)} style={{
            padding: "10px 16px", border: "none", background: "transparent", cursor: "pointer",
            fontSize: 14, fontWeight: view === v ? 600 : 400, color: view === v ? T.txtDk : T.txt1,
            borderBottom: view === v ? `2px solid ${T.red}` : "2px solid transparent",
            textTransform: "capitalize",
          }}>{v === "deal" ? "Deal Detail" : v}</button>
        ))}
      </div>
    </div>
  );
}

// ---- DASHBOARD ----
function Dashboard({ onNav }) {
  return (
    <div>
      {/* Lifecycle flow — top of dashboard */}
      <SectionHeading>LAR Lifecycle Flow</SectionHeading>
      <Card style={{ marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 0 }}>
          {ZONES.map((z, i) => (
            <div key={z.id} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ textAlign: "center", minWidth: 140, padding: "12px 16px", border: `1px solid ${z.accent}`, borderLeft: `3px solid ${z.accent}`, borderRadius: 2, background: T.white }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: z.accent }}>{z.label}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.txtDk, marginTop: 2 }}>{z.title}</div>
              </div>
              {i < 3 && <div style={{ padding: "0 8px", color: T.txt2, fontSize: 16 }}>→</div>}
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, padding: "10px 16px", background: T.lightGray, borderLeft: `3px solid ${T.red}`, borderRadius: 2 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.txtDk }}>AI Intelligence Layer</div>
          <div style={{ fontSize: 12, color: T.txt2, marginTop: 2 }}>Deal Summarization · Scout Litmus Test · RAG Chatbot · Risk Analysis · Proposal Scoring · Prediction Services</div>
        </div>
      </Card>

      <SectionBanner title="Land Acquisition" sub="LAR Lifecycle Dashboard — All Divisions" />
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        <Metric label="Active Deals" value={DEALS.length} accent={T.red} />
        <Metric label="Due Diligence" value={DEALS.filter(d => d.zone === "z2").length} accent={T.warning} />
        <Metric label="Clear to Close" value={DEALS.filter(d => d.zone === "z3").length} accent={T.success} />
        <Metric label="Avg Days in Zone" value="18" accent={T.info} />
        <Metric label="Overdue Items" value={NOTIFICATIONS.filter(n => n.type === "overdue").length} accent={T.error} sub="across all deals" />
      </div>

      {/* Zone cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 24 }}>
        {ZONES.map(z => {
          const cnt = DEALS.filter(d => d.zone === z.id).length;
          return (
            <Card key={z.id} onClick={() => onNav("pipeline")} style={{ borderLeft: `3px solid ${z.accent}` }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: z.accent, marginBottom: 4 }}>{z.label}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.txtDk, marginBottom: 6 }}>{z.title}</div>
              <div style={{ fontSize: 12, color: T.txt2, lineHeight: 1.4, marginBottom: 10 }}>{z.desc}</div>
              <div style={{ fontSize: 24, fontWeight: 600, color: z.accent }}>{cnt}</div>
              <div style={{ fontSize: 11, color: T.txt2 }}>Active Deals</div>
            </Card>
          );
        })}
      </div>



      {/* Notifications */}
      <SectionHeading right={<span style={{ fontSize: 12, color: T.error, fontWeight: 600 }}>{NOTIFICATIONS.filter(n => n.urgency === "high").length} urgent</span>}>Notifications & ETA Tracker</SectionHeading>
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 24 }}>
        {NOTIFICATIONS.map(n => (
          <div key={n.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: n.urgency === "high" ? T.errorBg : T.white, border: `1px solid ${n.urgency === "high" ? T.error : T.borderGray}`, borderLeft: `3px solid ${n.urgency === "high" ? T.error : n.urgency === "medium" ? T.warning : T.info}`, borderRadius: 2 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: T.txtDk }}><span style={{ color: n.urgency === "high" ? T.error : T.txtDk }}>{n.deal}</span> — {n.msg}</div>
              <div style={{ fontSize: 11, color: T.txt2, marginTop: 2 }}>{n.person} · {n.team}</div>
            </div>
            <span style={{ fontSize: 12, color: T.txt2, whiteSpace: "nowrap" }}>{n.time}</span>
            {n.urgency === "high" && <Btn primary style={{ fontSize: 11, padding: "4px 12px" }}>Follow Up</Btn>}
          </div>
        ))}
      </div>

      {/* Activity */}
      <SectionHeading>Recent Activity</SectionHeading>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {[
          { time: "2h ago", text: "CMA uploaded for Kings Grove", user: "Sales Team", accent: T.warning },
          { time: "Yesterday", text: "AI draft: President's Letter for Osprey Point", user: "AI System", accent: T.info },
          { time: "2d ago", text: "Pinehurst Landing moved to Clear to Close", user: "Maria Lopez", accent: T.success },
          { time: "3d ago", text: "Risk flag: ASP assumptions above comps — Kings Grove", user: "Risk Analysis", accent: T.error },
        ].map((a, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 16px", background: T.white, border: `1px solid ${T.borderGray}`, borderLeft: `3px solid ${a.accent}`, borderRadius: 2 }}>
            <span style={{ fontSize: 12, color: T.txt2, minWidth: 60 }}>{a.time}</span>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.txtDk, flex: 1 }}>{a.text}</span>
            <span style={{ fontSize: 12, color: T.txt2 }}>{a.user}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- PIPELINE ----
function Pipeline({ onSelect }) {
  const [fz, setFz] = useState("all");
  const list = fz === "all" ? DEALS : DEALS.filter(d => d.zone === fz);
  return (
    <div>
      <SectionBanner title="Deal Pipeline" sub={`${list.length} active deals`} />
      <div style={{ display: "flex", gap: 4, marginBottom: 16, flexWrap: "wrap" }}>
        <button onClick={() => setFz("all")} style={{ padding: "6px 14px", borderRadius: 2, border: `1px solid ${fz === "all" ? T.red : T.borderGray}`, background: fz === "all" ? T.red : T.white, color: fz === "all" ? T.white : T.txt1, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>All</button>
        {ZONES.map(z => <button key={z.id} onClick={() => setFz(z.id)} style={{ padding: "6px 14px", borderRadius: 2, border: `1px solid ${fz === z.id ? z.accent : T.borderGray}`, background: fz === z.id ? z.bg : T.white, color: fz === z.id ? z.accent : T.txt1, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{z.label}</button>)}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {list.map(d => {
          const z = ZONES.find(x => x.id === d.zone);
          return (
            <div key={d.id} onClick={() => onSelect(d)} style={{ background: T.white, border: `1px solid ${T.borderGray}`, borderLeft: `3px solid ${z.accent}`, borderRadius: 2, padding: "14px 20px", cursor: "pointer", display: "grid", gridTemplateColumns: "1.3fr 70px 110px 70px 140px 60px", alignItems: "center", gap: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: T.txtDk }}>{d.name}</span>
                  <ZTag zone={d.zone} />
                  <Tag text={d.type} />
                  <RiskTag risk={d.risk} />
                </div>
                <div style={{ fontSize: 12, color: T.txt2 }}>{d.div} · {d.lead}</div>
              </div>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 11, color: T.txt2 }}>Days</div><div style={{ fontSize: 16, fontWeight: 600, color: d.days > 30 ? T.error : T.txtDk }}>{d.days}</div></div>
              <div><div style={{ fontSize: 11, color: T.txt2, marginBottom: 4 }}>Progress</div><Progress pct={d.pct} accent={z.accent} /><div style={{ fontSize: 11, color: T.txt2, textAlign: "right", marginTop: 2 }}>{d.pct}%</div></div>
              <div style={{ textAlign: "center" }}><div style={{ fontSize: 11, color: T.txt2 }}>Score</div><div style={{ fontSize: 16, fontWeight: 600, color: d.score ? (d.score >= 80 ? T.success : d.score >= 60 ? "#7A6400" : T.error) : T.txt2 }}>{d.score || "—"}</div></div>
              <div><div style={{ fontSize: 11, color: T.txt2 }}>Next Milestone</div><div style={{ fontSize: 13, fontWeight: 600, color: T.txtDk }}>{d.next}</div></div>
              <div style={{ textAlign: "right" }}><span style={{ fontSize: 13, color: T.red, fontWeight: 600 }}>View →</span></div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---- DEAL DETAIL ----
function DealDetail({ deal }) {
  const [tab, setTab] = useState("workflow");
  const z = ZONES.find(x => x.id === deal.zone);
  const items = deal.zone === "z3" ? Z3_ITEMS : deal.zone === "z4" ? Z4_ITEMS : Z2_ITEMS;
  const tabs = ["workflow", "risk", "scoring", "docs", "timeline", "chat"];
  const tabLabels = { workflow: "Workflow & Delegation", risk: "Risk Analysis", scoring: "Proposal Score", docs: "Documents", timeline: "Timeline", chat: "AI Chat" };
  return (
    <div>
      {/* Deal header */}
      <div style={{ background: T.red, padding: "20px 24px", marginTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <span style={{ fontSize: 20, fontWeight: 600, color: T.white }}>{deal.name}</span>
            <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 2, background: "rgba(255,255,255,0.2)", color: T.white }}>{z.label}: {z.title}</span>
            {deal.score && <span style={{ fontSize: 12, padding: "2px 8px", borderRadius: 2, background: "rgba(255,255,255,0.2)", color: T.white }}>Score: {deal.score}</span>}
            <RiskTag risk={deal.risk} />
          </div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>{deal.div} Division · {deal.type} · Lead: {deal.lead}</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", marginBottom: 4 }}>Progress</div>
          <div style={{ width: 160 }}><Progress pct={deal.pct} accent={T.white} h={6} /></div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.white, marginTop: 4 }}>{deal.pct}%</div>
        </div>
      </div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${T.borderGray}`, background: T.white, marginBottom: 16 }}>
        {tabs.map(t => <button key={t} onClick={() => setTab(t)} style={{ padding: "10px 16px", border: "none", background: "transparent", cursor: "pointer", fontSize: 13, fontWeight: tab === t ? 600 : 400, color: tab === t ? T.txtDk : T.txt2, borderBottom: tab === t ? `2px solid ${T.red}` : "2px solid transparent" }}>{tabLabels[t]}</button>)}
      </div>
      {tab === "workflow" && <WorkflowTab deal={deal} items={items} />}
      {tab === "risk" && <RiskTab />}
      {tab === "scoring" && <ScoringTab deal={deal} />}
      {tab === "docs" && <DocsTab />}
      {tab === "timeline" && <TimelineTab />}
      {tab === "chat" && <ChatTab deal={deal} />}
    </div>
  );
}

// ---- WORKFLOW TAB ----
function WorkflowTab({ deal, items }) {
  const z = ZONES.find(x => x.id === deal.zone);
  const completePct = Math.round((items.filter(i => i.status === "complete").length / items.length) * 100);
  return (
    <div>
      {/* Delegation diagram */}
      <Card style={{ marginBottom: 16, borderLeft: `3px solid ${T.red}` }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: T.txtDk, marginBottom: 12 }}>Delegation Flow — {z.title}</div>
        <div style={{ display: "flex", alignItems: "flex-start", overflowX: "auto", gap: 0, paddingBottom: 8 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", minWidth: 110 }}>
            <div style={{ background: T.red, color: T.white, borderRadius: 2, padding: "10px 12px", textAlign: "center", fontSize: 12, fontWeight: 600, width: 100 }}>Land Acq Lead<div style={{ fontSize: 11, fontWeight: 400, opacity: 0.8, marginTop: 2 }}>Hub — manages process</div></div>
            <div style={{ width: 1, height: 12, background: T.borderGray }} />
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { team: "Sales", item: "CMA", color: T.warning },
                { team: "Land Dev", item: "Tech Assess", color: T.info },
                { team: "Marketing", item: "Activation", color: "#8764B8" },
                { team: "Finance", item: "Directs", color: T.error },
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ fontSize: 11, color: T.txt2 }}>↓</div>
                  <div style={{ background: T.white, border: `1px solid ${T.borderGray}`, borderLeft: `3px solid ${t.color}`, borderRadius: 2, padding: "8px 10px", textAlign: "center", minWidth: 80 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: t.color }}>{t.team}</div>
                    <div style={{ fontSize: 11, color: T.txt2 }}>{t.item}</div>
                  </div>
                  <div style={{ fontSize: 11, color: T.txt2 }}>↓</div>
                  <div style={{ fontSize: 10, color: T.success, fontWeight: 600 }}>Returns</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 12px", minHeight: 100 }}>
            <div style={{ fontSize: 20, color: T.txt2 }}>⟹</div>
            <div style={{ fontSize: 10, color: T.txt2 }}>All inputs</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
            <div style={{ background: T.red, color: T.white, borderRadius: 2, padding: "10px 14px", textAlign: "center", minWidth: 110 }}>
              <div style={{ fontSize: 13, fontWeight: 600 }}>{deal.zone === "z2" ? "President's Letter" : deal.zone === "z3" ? "Update Memo" : "Check-in Memo"}</div>
              <div style={{ fontSize: 11, opacity: 0.8 }}>AI-Generated</div>
            </div>
            <div style={{ fontSize: 11, color: T.txt2 }}>↓</div>
            <div style={{ background: T.white, border: `1px solid ${T.borderGray}`, borderLeft: `3px solid ${T.warning}`, borderRadius: 2, padding: "8px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.txtDk }}>Div. President Review</div>
              <div style={{ fontSize: 11, color: T.txt2 }}>Sign-off / comments</div>
            </div>
          </div>
        </div>
      </Card>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Metric label="Complete" value={`${items.filter(i => i.status === "complete").length}/${items.length}`} accent={T.success} />
        <Metric label="In Progress" value={items.filter(i => i.status === "in_progress").length} accent={T.warning} />
        <Metric label="Blocked" value={items.filter(i => i.status === "blocked").length} accent={T.error} />
        <Metric label="Checklist" value={`${completePct}%`} accent={completePct >= 70 ? T.success : T.warning} />
      </div>

      <div style={{ background: T.lightGray, borderLeft: `3px solid ${T.warning}`, borderRadius: 2, padding: "10px 14px", fontSize: 12, color: T.txt2, marginBottom: 14 }}>
        <strong style={{ color: T.txtDk }}>Note:</strong> Checklist adapts by deal type. For <strong>{deal.type}</strong>, all items required — review depth varies. Handoff arrows show delegation chain.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {items.map(item => {
          const sc = ST[item.status];
          return (
            <div key={item.id} style={{ background: T.white, border: `1px solid ${T.borderGray}`, borderLeft: `3px solid ${sc.color}`, borderRadius: 2, padding: "12px 16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "24px 1fr 130px 80px 80px 80px", alignItems: "center", gap: 10 }}>
                <div style={{ width: 20, height: 20, borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center", background: sc.bg, color: sc.color, fontSize: 12, fontWeight: 700 }}>{sc.icon}</div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.txtDk }}>{item.label}</div>
                  <div style={{ fontSize: 12, color: T.txt2, marginTop: 1 }}>{item.desc}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: T.txt2 }}>Assigned</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: T.txtDk }}>{item.person}</div>
                  <div style={{ fontSize: 11, color: T.txt2 }}>{item.team}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: T.txt2 }}>ETA</div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: item.status === "complete" ? T.success : T.txtDk }}>{item.eta}</div>
                  {item.submitted && <div style={{ fontSize: 11, color: T.success }}>✓ {item.submitted}</div>}
                </div>
                <Badge status={item.status} />
                <div style={{ textAlign: "right" }}>
                  {item.status === "complete" ? <span style={{ fontSize: 11, color: T.success }}>✓ Verified</span>
                    : item.status === "blocked" ? <span style={{ fontSize: 11, color: T.error }}>Awaiting deps</span>
                    : <Btn primary style={{ fontSize: 11, padding: "3px 10px" }}>Upload</Btn>}
                </div>
              </div>
              {item.handoffFrom && <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.midGray}`, fontSize: 12, color: T.txt2 }}>Delegated: <strong>{item.handoffFrom}</strong> → <strong>{item.team}</strong> · Returns to <strong>{item.handoffTo}</strong></div>}
              {item.dependsOn && <div style={{ marginTop: 8, paddingTop: 8, borderTop: `1px solid ${T.midGray}`, fontSize: 12, color: T.txt2 }}>Depends on: {item.dependsOn.map(dep => items.find(x => x.id === dep)?.label || dep).join(", ")}</div>}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 16, padding: "14px 20px", background: T.red, borderRadius: 2 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: T.white }}>{deal.zone === "z2" ? "AI President's Letter Generator" : deal.zone === "z3" ? "AI Update Memo Generator" : "AI Check-in Memo Generator"}</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.8)", marginTop: 2 }}>All components complete → AI auto-generates summary. Edit inline, track versions, route for approval.</div>
          </div>
          <button style={{ padding: "8px 20px", borderRadius: 2, border: "1px solid rgba(255,255,255,0.4)", background: "rgba(255,255,255,0.1)", color: T.white, cursor: "pointer", fontSize: 13, fontWeight: 600, whiteSpace: "nowrap" }}>Generate Draft</button>
        </div>
      </div>
    </div>
  );
}

// ---- RISK TAB ----
function RiskTab() {
  const sev = { high: T.error, medium: T.warning, low: T.success };
  const sevBg = { high: T.errorBg, medium: T.warningBg, low: T.successBg };
  return (
    <div>
      <div style={{ background: T.lightGray, borderLeft: `3px solid ${T.error}`, borderRadius: 2, padding: "10px 14px", fontSize: 12, color: T.txt2, marginBottom: 14 }}>
        <strong style={{ color: T.error }}>Risk Analysis Service:</strong> AI-powered cross-referencing of pro forma assumptions vs. CMA data, tech assessment findings, and historical deal performance.
      </div>
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Metric label="Risk Flags" value={RISK_ITEMS.length} accent={T.error} />
        <Metric label="High" value={RISK_ITEMS.filter(r => r.severity === "high").length} accent={T.error} />
        <Metric label="Medium" value={RISK_ITEMS.filter(r => r.severity === "medium").length} accent={T.warning} />
        <Metric label="Low" value={RISK_ITEMS.filter(r => r.severity === "low").length} accent={T.success} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {RISK_ITEMS.map((r, i) => (
          <div key={i} style={{ background: T.white, border: `1px solid ${T.borderGray}`, borderLeft: `3px solid ${sev[r.severity]}`, borderRadius: 2, padding: "12px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 2, background: sevBg[r.severity], color: sev[r.severity] }}>{r.severity}</span>
              <Tag text={r.category} />
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.txtDk, marginBottom: 4 }}>{r.flag}</div>
            <div style={{ fontSize: 12, color: T.txt2 }}>Source: {r.source}</div>
          </div>
        ))}
      </div>
      <SectionHeading>Sensitivity Analysis</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
        {[
          { scenario: "ASP drops 5%", impact: "IRR falls from 22% → 16%", risk: "high" },
          { scenario: "Dev delays 3 months", impact: "Carrying costs +~$180K", risk: "medium" },
          { scenario: "Building costs +8%", impact: "Margin compresses 2.1 pts", risk: "medium" },
          { scenario: "Sales pace -15%", impact: "Breakeven extends 6 months", risk: "high" },
        ].map((s, i) => (
          <Card key={i} style={{ borderLeft: `3px solid ${sev[s.risk]}` }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: sev[s.risk] }}>If: {s.scenario}</div>
            <div style={{ fontSize: 12, color: T.txtDk, marginTop: 4 }}>→ {s.impact}</div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ---- SCORING TAB ----
function ScoringTab({ deal }) {
  const dims = [
    { name: "Financial Returns (NCM/MIRR)", score: 78, weight: 30 },
    { name: "Market Strength (Submarket Resilience)", score: 65, weight: 20 },
    { name: "Execution Risk", score: 82, weight: 20 },
    { name: "Strategic Fit (3W Alignment)", score: 90, weight: 15 },
    { name: "Completeness", score: 55, weight: 15 },
  ];
  const weighted = Math.round(dims.reduce((s, d) => s + (d.score * d.weight / 100), 0));
  const sc = weighted >= 80 ? T.success : weighted >= 60 ? "#7A6400" : T.error;
  return (
    <div>
      <div style={{ background: T.lightGray, borderLeft: `3px solid ${T.warning}`, borderRadius: 2, padding: "10px 14px", fontSize: 12, color: T.txt2, marginBottom: 14 }}>
        <strong style={{ color: T.txtDk }}>Proposal Evaluator:</strong> AI-scored assessment using Beazer underwriting filters (NCM/MIRR thresholds, 10 LAR Criteria, Submarket Resilience, 3W Alignment, TOP). Trained over time by committee feedback.
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 24, marginBottom: 20 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", border: `3px solid ${sc}`, display: "flex", alignItems: "center", justifyContent: "center", background: T.white }}>
            <span style={{ fontSize: 24, fontWeight: 600, color: sc }}>{weighted}</span>
          </div>
          <div style={{ fontSize: 12, color: T.txt2, marginTop: 4, fontWeight: 600 }}>Composite</div>
        </div>
        <div style={{ flex: 1 }}>
          {dims.map((d, i) => {
            const dc = d.score >= 80 ? T.success : d.score >= 60 ? "#7A6400" : T.error;
            return (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
                <div style={{ width: 180, fontSize: 12, fontWeight: 400, color: T.txtDk }}>{d.name}</div>
                <div style={{ flex: 1 }}><Progress pct={d.score} accent={dc} h={6} /></div>
                <div style={{ width: 28, fontSize: 14, fontWeight: 600, color: dc, textAlign: "right" }}>{d.score}</div>
                <div style={{ width: 28, fontSize: 11, color: T.txt2, textAlign: "right" }}>{d.weight}%</div>
              </div>
            );
          })}
        </div>
      </div>
      <SectionHeading>AI Recommendations</SectionHeading>
      <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
        {[
          { area: "Completeness", rec: "Upload marketing plan + finalize 3W test → score from 55 to 80+", impact: "+5 pts" },
          { area: "Market", rec: "Add differentiation strategy or adjust ASP assumptions", impact: "+4 pts" },
          { area: "Financial", rec: "Model 3-month delay scenario in pro forma", impact: "Risk mitigation" },
        ].map((r, i) => (
          <div key={i} style={{ background: T.white, border: `1px solid ${T.borderGray}`, borderLeft: `3px solid ${T.success}`, borderRadius: 2, padding: "10px 14px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><Tag text={r.area} color={T.success} bg={T.successBg} /><span style={{ fontSize: 11, color: T.success, fontWeight: 600 }}>{r.impact}</span></div>
            <div style={{ fontSize: 13, color: T.txtDk }}>{r.rec}</div>
          </div>
        ))}
      </div>
      <SectionHeading>Historical Comparison</SectionHeading>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
        {[
          { name: "Avg Approved", score: 79, featured: false },
          { name: "This Deal", score: weighted, featured: true },
          { name: "Avg Rejected", score: 52, featured: false },
        ].map((h, i) => (
          <div key={i} style={{ background: h.featured ? T.red : T.white, border: h.featured ? "none" : `1px solid ${T.borderGray}`, borderRadius: 2, padding: "14px", textAlign: "center", color: h.featured ? T.white : T.txtDk }}>
            <div style={{ fontSize: 11, opacity: 0.7, marginBottom: 4 }}>{h.name}</div>
            <div style={{ fontSize: 24, fontWeight: 600 }}>{h.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---- DOCS TAB ----
function DocsTab() {
  const docs = [
    { name: "Pro Forma v3.2.xlsx", type: "Pro Forma", date: "Mar 18", size: "2.4 MB", st: "current" },
    { name: "Contract_Summary.pdf", type: "Contract", date: "Mar 12", size: "840 KB", st: "current" },
    { name: "Phase1_Environmental.pdf", type: "Tech", date: "Mar 20", size: "5.1 MB", st: "current" },
    { name: "CMA_Draft_v1.xlsx", type: "CMA", date: "Mar 22", size: "1.8 MB", st: "draft" },
    { name: "Pro Forma v2.1.xlsx", type: "Pro Forma", date: "Mar 5", size: "2.3 MB", st: "superseded" },
    { name: "Title_Review.pdf", type: "Tech", date: "Mar 8", size: "320 KB", st: "current" },
  ];
  const stColor = { current: T.success, draft: "#7A6400", superseded: T.txt2 };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontSize: 13, color: T.txt2 }}>{docs.length} documents · ETL pipeline ingested</span>
        <Btn primary>+ Upload Document</Btn>
      </div>
      {/* Table header */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 90px 70px 60px 70px", gap: 0, background: T.red, padding: "8px 16px", borderRadius: "2px 2px 0 0" }}>
        {["Document", "Type", "Date", "Size", "Status"].map(h => <span key={h} style={{ fontSize: 12, fontWeight: 600, color: T.white }}>{h}</span>)}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
        {docs.map((d, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 90px 70px 60px 70px", gap: 0, padding: "10px 16px", background: d.st === "superseded" ? T.lightGray : (i % 2 === 0 ? T.offWhite : T.white), opacity: d.st === "superseded" ? 0.6 : 1, borderBottom: `1px solid ${T.midGray}` }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: T.txtDk }}>{d.name}</span>
            <span style={{ fontSize: 12, color: T.txt2 }}>{d.type}</span>
            <span style={{ fontSize: 12, color: T.txt2 }}>{d.date}</span>
            <span style={{ fontSize: 12, color: T.txt2 }}>{d.size}</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: stColor[d.st] }}>{d.st}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 12, padding: "10px 14px", background: T.lightGray, borderLeft: `3px solid ${T.info}`, borderRadius: 2 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: T.info, marginBottom: 2 }}>Sourcing & Ingestion Layer</div>
        <div style={{ fontSize: 12, color: T.txt2 }}>Documents processed via ETL: Excel parsed for financials, PDFs text-extracted, all content feeds deal knowledge base for AI summarization and chat.</div>
      </div>
    </div>
  );
}

// ---- TIMELINE TAB ----
function TimelineTab() {
  const events = [
    { date: "Mar 3", label: "Site identified via Scout", zone: "z1", done: true },
    { date: "Mar 5", label: "Preliminary pro forma uploaded", zone: "z1", done: true },
    { date: "Mar 7", label: "Scout litmus test: Green", zone: "z1", done: true },
    { date: "Mar 8", label: "Remain check submitted ($125K)", zone: "z1", done: true },
    { date: "Mar 9", label: "Approved → Due Diligence", zone: "z1", done: true },
    { date: "Mar 12", label: "Contract summary completed", zone: "z2", done: true },
    { date: "Mar 14", label: "Pro forma v1 — delegated tech to Land Dev", zone: "z2", done: true },
    { date: "Mar 18", label: "Pro forma v3.2 (updated costs from Finance)", zone: "z2", done: true },
    { date: "Mar 20", label: "Phase 1 environmental by Land Dev", zone: "z2", done: true },
    { date: "Mar 22", label: "CMA draft from Sales — under review", zone: "z2", done: true },
    { date: "Mar 28", label: "Directs due (Finance)", zone: "z2", done: false },
    { date: "Mar 30", label: "CMA finalized", zone: "z2", done: false },
    { date: "Apr 2", label: "Tech assessment complete", zone: "z2", done: false },
    { date: "Apr 5", label: "TOP & 3W finalized", zone: "z2", done: false },
    { date: "Apr 8", label: "President's Letter (AI)", zone: "z2", done: false },
    { date: "Apr 10", label: "LAR package → Div. President", zone: "z2", done: false },
  ];
  return (
    <div style={{ paddingLeft: 8 }}>
      <div style={{ position: "relative", paddingLeft: 24 }}>
        <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 2, background: T.borderGray }} />
        {events.map((e, i) => {
          const zn = ZONES.find(z => z.id === e.zone);
          return (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8, opacity: e.done ? 1 : 0.4 }}>
              <div style={{ width: 14, height: 14, borderRadius: "50%", flexShrink: 0, background: e.done ? zn.accent : T.lightGray, border: e.done ? "none" : `2px solid ${T.borderGray}`, display: "flex", alignItems: "center", justifyContent: "center", position: "relative", left: -16 }}>
                {e.done && <span style={{ color: T.white, fontSize: 8 }}>✓</span>}
              </div>
              <div style={{ marginLeft: -6 }}>
                <div style={{ fontSize: 11, color: T.txt2 }}>{e.date}</div>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.txtDk }}>{e.label}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ---- CHAT TAB ----
function ChatTab({ deal }) {
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState([{ role: "system", text: `AI Deal Assistant for ${deal.name}. RAG access to all documents, risk data, and historical deals.` }]);
  const send = () => {
    if (!input.trim()) return;
    const z = ZONES.find(x => x.id === deal.zone);
    setMsgs(m => [...m, { role: "user", text: input }, { role: "ai", text: `[${deal.name}] Pro forma v3.2 (Mar 18) updated building costs. CMA in draft — 3 active comps within 2mi. Risk: ASP 8% above comps. ${deal.days} days in ${z?.title}.\n\nSimulated response — production RAG assistant queries full deal KB.` }]);
    setInput("");
  };
  return (
    <div>
      <div style={{ background: T.lightGray, borderLeft: `3px solid ${T.info}`, borderRadius: 2, padding: "10px 14px", fontSize: 12, color: T.txt2, marginBottom: 14 }}>
        <strong style={{ color: T.info }}>AI Deal Assistant</strong> — RAG-powered. Ask about docs, metrics, risk, delegation, history, or "How could this deal fall apart?"
      </div>
      <div style={{ background: T.white, border: `1px solid ${T.borderGray}`, borderRadius: 2, height: 240, overflowY: "auto", padding: 16, marginBottom: 8, display: "flex", flexDirection: "column", gap: 8 }}>
        {msgs.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "75%", padding: "8px 12px", borderRadius: 2, background: m.role === "user" ? T.red : m.role === "ai" ? T.lightGray : T.offWhite, color: m.role === "user" ? T.white : T.txtDk, fontSize: 13, lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{m.text}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder={`Ask about ${deal.name}...`} style={{ flex: 1, padding: "8px 12px", borderRadius: 2, border: `1px solid ${T.borderGray}`, fontSize: 13, fontFamily: FF, outline: "none" }} />
        <Btn primary onClick={send}>Send</Btn>
      </div>
      <div style={{ display: "flex", gap: 4, marginTop: 8, flexWrap: "wrap" }}>
        {["Current margin?", "Who hasn't uploaded?", "How could this fail?", "Compare to past deals", "Risk profile?"].map((q, i) => (
          <button key={i} onClick={() => setInput(q)} style={{ padding: "4px 10px", borderRadius: 2, border: `1px solid ${T.borderGray}`, background: T.white, color: T.txt2, fontSize: 11, cursor: "pointer" }}>{q}</button>
        ))}
      </div>
    </div>
  );
}

// ---- ARCHITECTURE VIEW ----
function ArchitectureView() {
  const groups = [
    { title: "Input & Delegation Layer", accent: T.info, items: [
      { name: "Team A Input", desc: "Land Acq Lead — pro forma, contract, TOP" },
      { name: "Team B Input", desc: "Sales, Marketing, Finance — CMA, activation, directs" },
      { name: "Team C Input", desc: "Land Development — tech assessment, environmental" },
      { name: "Delegation Engine", desc: "Assign tasks with ETAs, trigger handoffs, auto-notifications" },
    ]},
    { title: "Sourcing & Ingestion (ETL)", accent: T.warning, items: [
      { name: "Document Ingestion", desc: "Excel, PDFs, Word docs — parsed and structured" },
      { name: "Extract Transform Load", desc: "Financial metric extraction, text parsing, normalization" },
      { name: "Knowledge Base Builder", desc: "Deal-scoped KB from all docs for RAG" },
    ]},
    { title: "Core Platform Services", accent: T.red, items: [
      { name: "Deal Summarization", desc: "AI President's Letters, update memos, check-in reports" },
      { name: "Litmus Test (Scout)", desc: "Scout as platform module — quick go/no-go" },
      { name: "AI Chatbot & Analytics", desc: "RAG deal chat, cross-deal queries, NL interface" },
      { name: "Risk Analysis", desc: "Pro forma sensitivity, market risk, doc cross-ref" },
      { name: "Proposal Evaluator", desc: "LAR scorecard, AI scoring, feedback loop" },
      { name: "Prediction Services", desc: "Pricing optimization, community forecasting (future)" },
    ]},
    { title: "Business Logic & Orchestration", accent: T.warning, items: [
      { name: "2nd-Level Doc Gen", desc: "Derivative docs from source — letters, memos" },
      { name: "KB Access & Inference", desc: "RAG layer for chatbot and doc generation" },
      { name: "Delivery Orchestrator", desc: "Assembles LAR packages, routes approvals" },
    ]},
    { title: "Lifecycle & Operations", accent: T.error, items: [
      { name: "Lifecycle Mgmt", desc: "Zone transitions, stage gates, Z1→Z2→Z3→Z4" },
      { name: "Azure Entra / RBAC", desc: "User auth, group KPI/KRA, role-based access" },
      { name: "Auditing", desc: "Version history, change tracking, compliance trail" },
      { name: "Tracker & Notifications", desc: "ETA monitoring, email follow-ups, escalation" },
    ]},
  ];
  return (
    <div>
      <SectionBanner title="Platform Architecture" sub="Functional Service Map" />
      <div style={{ background: T.lightGray, borderLeft: `3px solid ${T.warning}`, borderRadius: 2, padding: "10px 14px", fontSize: 12, color: T.txt2, marginBottom: 16 }}>
        <strong style={{ color: T.txtDk }}>Reference:</strong> Maps Bharat's functional architecture into platform service layers — from team input through AI processing to operational management.
      </div>
      {groups.map((g, gi) => (
        <div key={gi} style={{ marginBottom: 16 }}>
          <div style={{ background: T.red, color: T.white, padding: "8px 16px", fontSize: 14, fontWeight: 600, borderRadius: "2px 2px 0 0", borderLeft: `3px solid ${g.accent}` }}>{g.title}</div>
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(g.items.length, 3)}, 1fr)`, gap: 0, border: `1px solid ${T.borderGray}`, borderTop: "none", borderRadius: "0 0 2px 2px" }}>
            {g.items.map((s, si) => (
              <div key={si} style={{ padding: "12px 14px", borderRight: si < g.items.length - 1 ? `1px solid ${T.midGray}` : "none", borderBottom: si < g.items.length - 3 ? `1px solid ${T.midGray}` : "none" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.txtDk, marginBottom: 4 }}>{s.name}</div>
                <div style={{ fontSize: 12, color: T.txt2, lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            ))}
          </div>
        </div>
      ))}
      <SectionHeading>Data Flow — End to End</SectionHeading>
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap" }}>
          {[
            { label: "Team Inputs", sub: "Excel, PDF, docs", accent: T.info },
            { label: "ETL Pipeline", sub: "Extract, transform", accent: T.warning },
            { label: "Knowledge Base", sub: "Deal-scoped RAG", accent: T.txtDk },
            { label: "AI Services", sub: "Summarize, score", accent: T.red },
            { label: "Delivery", sub: "Letters, packages", accent: T.warning },
            { label: "Review", sub: "Committee vote", accent: T.error },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ textAlign: "center", minWidth: 90 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: s.accent, color: T.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 600, margin: "0 auto 4px" }}>{i + 1}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.txtDk }}>{s.label}</div>
                <div style={{ fontSize: 11, color: T.txt2 }}>{s.sub}</div>
              </div>
              {i < 5 && <div style={{ fontSize: 14, color: T.txt2, padding: "0 4px" }}>→</div>}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ---- MAIN ----
export default function LARPlatform() {
  const [view, setView] = useState("dashboard");
  const [deal, setDeal] = useState(DEALS[0]);
  const nav = (v) => setView(v);
  const pick = (d) => { setDeal(d); setView("deal"); };
  return (
    <div style={{ fontFamily: FF, background: T.offWhite, minHeight: "100vh", color: T.txt1 }}>
      <Header view={view} onNav={nav} />
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 32px 40px" }}>
        {view === "dashboard" && <Dashboard onNav={nav} />}
        {view === "pipeline" && <Pipeline onSelect={pick} />}
        {view === "deal" && <DealDetail deal={deal} />}
        {view === "architecture" && <ArchitectureView />}
      </div>
      <div style={{ padding: "16px 32px", borderTop: `1px solid ${T.borderGray}`, textAlign: "center", fontSize: 12, color: T.txt2, background: T.white }}>
        <strong style={{ color: T.txtDk }}>Beazer Homes</strong> × <strong style={{ color: T.txtDk }}>Calance</strong> — LAR Lifecycle Management Platform · POC v3 · March 2026
      </div>
    </div>
  );
}

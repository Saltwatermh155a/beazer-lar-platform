// ============================================================================
// BEAZER HOMES — LAR LIFECYCLE PLATFORM — DESIGN TOKENS
// Auto-generated from beazer-lar-platform-style-guide.yaml
// Source: Beazer SharePoint / Vera intranet screenshots
// ============================================================================

// ---- COLORS ----
export const colors = {
  // Brand
  beazerRed:       "#9F2C32",
  beazerRedDark:   "#7A2128",
  beazerRedLight:  "#C4545A",

  // Neutrals (SharePoint-aligned)
  white:           "#FFFFFF",
  offWhite:        "#F8F8F8",
  lightGray:       "#F3F2F1",
  midGray:         "#EDEBE9",
  borderGray:      "#D2D0CE",
  textSecondary:   "#605E5C",
  textPrimary:     "#323130",
  textDark:        "#201F1E",
  black:           "#000000",

  // Semantic
  success:         "#107C10",
  successBg:       "#DFF6DD",
  warning:         "#FFB900",
  warningBg:       "#FFF4CE",
  error:           "#D13438",
  errorBg:         "#FDE7E9",
  info:            "#0078D4",
  infoBg:          "#EDF2F9",
};

// ---- TYPOGRAPHY ----
export const fonts = {
  family: "'Segoe UI', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif",
  mono:   "'Cascadia Code', 'Fira Mono', Consolas, monospace",
};

export const type = {
  pageTitle:      { fontSize: 28, fontWeight: 600, lineHeight: 1.2, color: colors.white },
  sectionHeading: { fontSize: 20, fontWeight: 600, lineHeight: 1.3, color: colors.textDark },
  cardTitle:      { fontSize: 14, fontWeight: 400, lineHeight: 1.3, color: colors.textDark },
  navItem:        { fontSize: 14, fontWeight: 400, lineHeight: 1,   color: colors.textPrimary },
  body:           { fontSize: 14, fontWeight: 400, lineHeight: 1.5, color: colors.textPrimary },
  bodySmall:      { fontSize: 12, fontWeight: 400, lineHeight: 1.4, color: colors.textSecondary },
  label:          { fontSize: 12, fontWeight: 600, lineHeight: 1.2, color: colors.textSecondary },
  caption:        { fontSize: 11, fontWeight: 400, lineHeight: 1.3, color: colors.textSecondary },
};

// ---- SPACING ----
export const space = {
  xs:  4,
  sm:  8,
  md:  16,
  lg:  24,
  xl:  32,
  xxl: 48,
};

// ---- RADII ----
// SharePoint uses near-square elements. NOT rounded/pill shapes.
export const radii = {
  none: 0,
  sm:   2,    // Default for cards, buttons, inputs
  md:   4,    // Search bars, dropdowns
};

// ---- SHADOWS ----
// SharePoint is nearly flat. Very subtle shadows only.
export const shadows = {
  card:      "0 1px 3px rgba(0,0,0,0.04)",
  cardHover: "0 2px 6px rgba(0,0,0,0.08)",
  elevated:  "0 3px 10px rgba(0,0,0,0.10)",
};

// ---- ZONE COLORS ----
// Lifecycle zones use semantic accents, NOT custom brand colors
export const zones = {
  z1: { accent: colors.info,          label: "Pre-LAR",         bg: colors.infoBg },
  z2: { accent: colors.warning,       label: "Due Diligence",   bg: colors.warningBg },
  z3: { accent: colors.success,       label: "Clear to Close",  bg: colors.successBg },
  z4: { accent: colors.textSecondary, label: "Land Banking",    bg: colors.lightGray },
};

// ---- DEAL RISK TIERS ----
export const riskTiers = {
  fastTrack:         { bg: colors.successBg,  color: colors.success,       label: "Fast Track" },
  normal:            { bg: colors.infoBg,      color: colors.info,          label: "Normal Risk" },
  higherRisk:        { bg: colors.warningBg,   color: "#7A6400",            label: "Higher Risk" },
  boardNotification: { bg: colors.errorBg,     color: "#A4262C",            label: "Board Notification" },
  boardApproval:     { bg: colors.error,       color: colors.white,         label: "Board Approval" },
};

// ---- STATUS STATES ----
export const status = {
  complete:    { color: colors.success,       bg: colors.successBg, icon: "✓",  label: "Complete" },
  inProgress:  { color: colors.warning,       bg: colors.warningBg, icon: "◐",  label: "In Progress" },
  notStarted:  { color: colors.textSecondary, bg: colors.lightGray, icon: "○",  label: "Not Started" },
  overdue:     { color: colors.error,         bg: colors.errorBg,   icon: "!",  label: "Overdue" },
  blocked:     { color: colors.error,         bg: colors.errorBg,   icon: "⊘",  label: "Blocked" },
};

// ---- COMMITTEE TIMELINE (12-day LAR review) ----
export const committeeDays = [
  { day: 0,  label: "Submit",          bg: colors.beazerRed, color: colors.white },
  { day: 5,  label: "Review Complete", bg: colors.lightGray, color: colors.textDark },
  { day: 7,  label: "Questions",       bg: colors.lightGray, color: colors.textDark },
  { day: 9,  label: "Answers Due",     bg: colors.lightGray, color: colors.textDark },
  { day: 12, label: "Vote",            bg: colors.beazerRed, color: colors.white },
];

// ---- COMPOSED THEME OBJECT ----
// Single import for styling entire components
const theme = {
  colors,
  fonts,
  type,
  space,
  radii,
  shadows,
  zones,
  riskTiers,
  status,
  committeeDays,
};

export default theme;

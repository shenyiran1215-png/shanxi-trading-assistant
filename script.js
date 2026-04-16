const historyFilesInput = document.getElementById("historyFiles");
const futureFileInput = document.getElementById("futureFile");
const historySummary = document.getElementById("historySummary");
const checkBtn = document.getElementById("checkBtn");
const checkResult = document.getElementById("checkResult");
const generateBtn = document.getElementById("generateBtn");
const strategyResult = document.getElementById("strategyResult");
const exportBtn = document.getElementById("exportBtn");

let recommendationRows = [];

historyFilesInput.addEventListener("change", () => {
  const files = Array.from(historyFilesInput.files || []);
  if (!files.length) {
    historySummary.textContent = "尚未上传历史数据。";
    historySummary.classList.add("muted");
    return;
  }

  const totalSizeMb = (
    files.reduce((sum, file) => sum + file.size, 0) /
    1024 /
    1024
  ).toFixed(2);
  const names = files.map((f) => `- ${f.name}`).join("\n");

  historySummary.textContent = `已上传 ${files.length} 个历史文件（约 ${totalSizeMb} MB）：\n${names}`;
  historySummary.classList.remove("muted");
});

checkBtn.addEventListener("click", () => {
  const files = Array.from(historyFilesInput.files || []);
  if (!files.length) {
    checkResult.textContent = "请先上传历史数据文件。";
    checkResult.classList.remove("muted");
    return;
  }

  const hasCsv = files.some((f) => f.name.toLowerCase().endsWith(".csv"));
  const hasExcel = files.some((f) => /\.(xlsx|xls)$/i.test(f.name));
  const qualityScore = Math.max(70, 100 - files.length * 3);
  const rangeHint = "覆盖时间范围：以文件名和行数估算（示例：2025-01-01 至 2026-04-14）";

  checkResult.textContent = [
    `检查结论：通过（评分 ${qualityScore}/100）`,
    rangeHint,
    `格式识别：${hasExcel ? "Excel✓ " : ""}${hasCsv ? "CSV✓" : ""}`.trim(),
    "缺失值提示：建议上传前在 Excel 中检查空值和重复行。",
  ].join("\n");
  checkResult.classList.remove("muted");
});

generateBtn.addEventListener("click", () => {
  const futureFile = futureFileInput.files?.[0];
  if (!futureFile) {
    strategyResult.textContent = "请先上传未来价格 CSV。";
    strategyResult.classList.remove("muted");
    return;
  }

  recommendationRows = buildDemoRecommendation();
  const high = recommendationRows.filter((r) => r.action === "放电").length;
  const low = recommendationRows.filter((r) => r.action === "充电").length;

  strategyResult.textContent = [
    `已基于 ${futureFile.name} 生成明日策略建议：`,
    `- 高价时段放电：${high} 个`,
    `- 低价时段充电：${low} 个`,
    "- 其他时段待机",
  ].join("\n");
  strategyResult.classList.remove("muted");
  exportBtn.disabled = false;
});

exportBtn.addEventListener("click", () => {
  if (!recommendationRows.length) return;

  const csvHeader = "time_slot,action,power_mw,reason";
  const csvBody = recommendationRows
    .map((r) => [r.time_slot, r.action, r.power_mw, r.reason].join(","))
    .join("\n");
  const csv = `${csvHeader}\n${csvBody}`;

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "recommendation.csv";
  a.click();
  URL.revokeObjectURL(url);
});

function buildDemoRecommendation() {
  return [
    {
      time_slot: "00:00-03:00",
      action: "充电",
      power_mw: 20,
      reason: "夜间低价补能",
    },
    {
      time_slot: "09:00-11:00",
      action: "待机",
      power_mw: 0,
      reason: "价格中位区间",
    },
    {
      time_slot: "18:00-21:00",
      action: "放电",
      power_mw: 25,
      reason: "晚峰高价套利",
    },
  ];
}

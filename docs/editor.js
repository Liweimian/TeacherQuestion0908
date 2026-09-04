const params = new URLSearchParams(location.search);
const topicId = params.get("topic") || "t15";
const contextName = params.get("context") || "series";
const fromAi = params.get("from") === "ai";
const sourceTabId = params.get("tabId") || "";

const topicTitles = {
  t2: "2026 深圳南山区初一上期末数学真题",
  t8: "正数与负数概念巩固题单",
  t9: "有理数运算基础过关配套题单",
  t14: "2026 深圳福田区初一下期中数学真题",
  t15: "坂田片区课堂小测精选题单",
  t25: "2025 深圳中考数学基础题单",
  t31: "代数式实际意义专项题单"
};

const defaultQuestions = [
  { id:"q1", section:"基础提优题", text:"如果向东走 3 米记作 +3 米，那么向西走 5 米应记作（　　）。", options:["A. +5 米","B. −5 米","C. +3 米","D. −3 米"], answer:"B", path:"初中 / 数学 / 单项选择题 / 较易 / 1 分钟", tags:["26-27·七年级上全品作业本","正负数意义"], competency:"运算能力", explanation:"规定向东为正，向西就用负数表示，所以应记作 −5 米。" },
  { id:"q2", section:"基础提优题", text:"若 |−m| = |− 1/2|，则 m 的值为（　　）。", options:["A. ±2","B. −1/2 或 1/2","C. 1/2","D. −1/2"], answer:"B", path:"初中 / 数学 / 单项选择题 / 较易 / 1 分钟", tags:["26-27·七年级上全品作业本","绝对值"], competency:"抽象能力", explanation:"由绝对值的定义可知，|m| = 1/2，因此 m = ±1/2。" }
];

const bankQuestions = [
  { id:"b1", text:"下列各数中，绝对值最小的是（　　）。", meta:"绝对值 · 较易 · 选择题", answer:"C" },
  { id:"b2", text:"若 a、b 互为相反数，则 |a| 与 |b| 的关系是（　　）。", meta:"相反数 · 较易 · 选择题", answer:"相等" },
  { id:"b3", text:"小明向东走 4 米，再向西走 7 米，他最后的位置是（　　）。", meta:"正负数 · 中等 · 应用题", answer:"西侧 3 米" },
  { id:"b4", text:"比较 −3/4、−2/3、0、1/2 的大小，并按从小到大排列。", meta:"有理数大小比较 · 中等 · 填空题", answer:"−3/4＜−2/3＜0＜1/2" },
  { id:"b5", text:"若 |x−2|=3，则 x 的值为（　　）。", meta:"绝对值 · 中等 · 选择题", answer:"−1 或 5" },
  { id:"b6", text:"某地一周最低气温为 −4℃，最高气温为 9℃，温差是多少？", meta:"情境应用 · 较易 · 解答题", answer:"13℃" }
];

function formatDateListTitle(date = new Date()) {
  const pad = value => String(value).padStart(2, "0");
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}题单`;
}

function decodePayloadHash() {
  const raw = location.hash.replace(/^#/, "");
  if (!raw.startsWith("p=")) return null;
  try {
    const json = decodeURIComponent(escape(atob(decodeURIComponent(raw.slice(2)))));
    const parsed = JSON.parse(json);
    if (parsed?.questions?.length) return parsed;
  } catch {}
  return null;
}

function convertTabToEditorPayload(tab) {
  const visible = (tab.questions || [])
    .filter(q => !(tab.removedQuestionIds || []).includes(q.id))
    .sort((a, b) => (a.num || 0) - (b.num || 0));

  return {
    tabId: tab.id,
    title: tab.title,
    isQuestionList: Boolean(tab.isQuestionList),
    questions: visible.map((q, index) => {
      const modified = tab.modifiedQuestions?.[q.id] || {};
      const stem = modified.stem ?? q.stem ?? "";
      const type = modified.type ?? q.type ?? "选择题";
      const difficulty = modified.difficulty ?? q.difficulty ?? "中等";
      const knowledge = modified.knowledge ?? q.knowledge ?? "";
      return {
        id: String(q.id || `q-${index + 1}`),
        num: index + 1,
        section: q.section || (tab.isQuestionList ? "题单题目" : "试卷题目"),
        text: stem,
        options: [...(modified.options ?? q.options ?? [])],
        answer: modified.answer ?? q.answer ?? "",
        path: `初中 / 数学 / ${type} / ${difficulty} / ${q.minutes || 2} 分钟`,
        tags: [tab.meta?.source || "飞象题库", knowledge].filter(Boolean),
        competency: q.competency || "运算能力",
        explanation: modified.analysis ?? q.analysis ?? ""
      };
    })
  };
}

function loadQuestionsFromWorkspace(tabId) {
  if (!tabId) return null;
  const workspaceKeys = [
    "feixiang-ai-workspace-v4-paper",
    "feixiang-ai-workspace-v4-series"
  ];
  for (const storage of [sessionStorage, localStorage]) {
    for (const key of workspaceKeys) {
      try {
        const raw = storage.getItem(key);
        if (!raw) continue;
        const workspace = JSON.parse(raw);
        const tab = workspace.tabs?.find(item => item.id === tabId);
        if (!tab) continue;
        const payload = convertTabToEditorPayload(tab);
        if (payload.questions.length) return payload;
      } catch {}
    }
  }
  return null;
}

function loadEditorPayload() {
  const fromHash = decodePayloadHash();
  if (fromHash) return fromHash;

  const keys = [
    sourceTabId ? `feixiang-editor-payload-${sourceTabId}` : "",
    "feixiang-editor-payload"
  ].filter(Boolean);

  for (const storage of [sessionStorage, localStorage]) {
    for (const key of keys) {
      try {
        const saved = storage.getItem(key);
        if (!saved) continue;
        const parsed = JSON.parse(saved);
        if (parsed?.questions?.length) return parsed;
      } catch {}
    }
  }

  return loadQuestionsFromWorkspace(sourceTabId);
}

const payload = loadEditorPayload();
const documentTitle = payload?.title || topicTitles[topicId] || formatDateListTitle();
const usePayloadQuestions = Boolean(payload?.questions?.length);
let activeQuestions = (usePayloadQuestions ? payload.questions : defaultQuestions).map(question => ({ ...question }));
let deletedQuestions = [];
let selectedId = activeQuestions[0]?.id;
let modalMode = "add";

const $ = selector => document.querySelector(selector);
const esc = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[char]));

function renderOrder() {
  const sections = [...new Set(activeQuestions.map(question => question.section))];
  $("#orderList").innerHTML = sections.map(section => {
    const items = activeQuestions.filter(question => question.section === section);
    return `<section class="order-section"><h3>${esc(section)}</h3><div class="order-items">${items.map(question => {
      const number = activeQuestions.findIndex(item => item.id === question.id) + 1;
      return `<button class="order-item ${question.id === selectedId ? "active" : ""}" data-select-question="${question.id}" type="button">${number}</button>`;
    }).join("")}</div></section>`;
  }).join("");
}

function renderQuestionList() {
  $("#questionList").innerHTML = activeQuestions.map((question, index) => `
    <article class="question-card ${question.id === selectedId ? "selected" : ""}" data-question-id="${question.id}">
      <span class="question-number">${index + 1}.</span>
      ${question.id === selectedId ? `<div class="question-toolbar">
        <button class="replace-button" data-question-action="replace" type="button"><i class="ri-loop-left-line"></i>换题</button>
        <button data-question-action="up" type="button" aria-label="上移"><i class="ri-arrow-up-line"></i></button>
        <button data-question-action="down" type="button" aria-label="下移"><i class="ri-arrow-down-line"></i></button>
        <button data-question-action="delete" type="button" aria-label="删除"><i class="ri-delete-bin-line"></i></button>
      </div>` : ""}
      <p class="question-text">${esc(question.text)}</p>
      ${question.options?.length ? `<div class="question-options">${question.options.map(option => `<span>${esc(option)}</span>`).join("")}</div>` : ""}
    </article>`).join("");
}

function renderInfo() {
  const question = activeQuestions.find(item => item.id === selectedId) || activeQuestions[0];
  if (!question) {
    $("#infoContent").innerHTML = "<p class=\"info-path\">题单中还没有题目</p>";
    return;
  }
  const mainTag = question.tags?.[0] || "26-27·七年级上全品作业本";
  const knowledgeTags = (question.tags || []).slice(1);
  $("#infoContent").innerHTML = `
    <span class="info-tag-main">${esc(mainTag)}</span>
    <div class="info-path">${esc(question.path)}</div>
    <p class="info-label">知识点</p>
    <div class="info-tags">${(knowledgeTags.length ? knowledgeTags : ["待补充"]).map(tag => `<span>${esc(tag)}</span>`).join("")}</div>
    <p class="info-label">核心素养</p>
    <div class="info-tags"><span>${esc(question.competency || "运算能力")}</span></div>
    <p class="info-label">答案</p>
    <div class="info-answer">${esc(question.answer)}</div>
    <div class="info-explanation-head">
      <p class="info-label">解析</p>
      <span class="info-ai-badge">AI生成</span>
    </div>
    <div class="info-explanation">${esc(question.explanation)}</div>`;
}

function renderAll() {
  renderOrder();
  renderQuestionList();
  renderInfo();
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1700);
}

function openModal(mode) {
  modalMode = mode;
  $("#modalLayer").hidden = false;
  $("#modalKicker").textContent = mode === "replace" ? "替换当前题目" : mode === "deleted" ? "回收站" : "题库";
  $("#modalTitle").textContent = mode === "replace" ? "换一道更合适的题" : mode === "deleted" ? "已删除题目" : "从题库添加题目";
  $("#bankSearch").value = "";
  renderBank();
  $("#bankSearch").focus();
}

function closeModal() {
  $("#modalLayer").hidden = true;
}

function renderBank() {
  const query = $("#bankSearch").value.trim().toLowerCase();
  if (modalMode === "deleted") {
    $("#bankList").innerHTML = deletedQuestions.length ? deletedQuestions.map(question => `
      <div class="bank-item"><div><h3>${esc(question.text)}</h3><p>原第 ${question.originalIndex} 题 · ${esc(question.path)}</p></div><button data-restore-question="${question.id}" type="button">恢复</button></div>`).join("") : `<p class="info-path">暂无已删除题目</p>`;
    return;
  }
  const list = bankQuestions.filter(question => !query || `${question.text}${question.meta}`.toLowerCase().includes(query));
  $("#bankList").innerHTML = list.map(question => `
    <div class="bank-item"><div><h3>${esc(question.text)}</h3><p>${esc(question.meta)} · 答案 ${esc(question.answer)}</p></div><button data-bank-question="${question.id}" type="button">${modalMode === "replace" ? "换成这道" : "添加"}</button></div>`).join("") || `<p class="info-path">没有找到匹配题目</p>`;
}

function selectQuestion(id, shouldScroll = false) {
  if (!activeQuestions.some(question => question.id === id)) return;
  selectedId = id;
  renderAll();
  if (shouldScroll) document.querySelector(`[data-question-id="${id}"]`)?.scrollIntoView({ behavior:"smooth", block:"center" });
}

function moveQuestion(direction) {
  const index = activeQuestions.findIndex(question => question.id === selectedId);
  const nextIndex = index + direction;
  if (index < 0 || nextIndex < 0 || nextIndex >= activeQuestions.length) {
    showToast(direction < 0 ? "已经是第一道题" : "已经是最后一道题");
    return;
  }
  [activeQuestions[index], activeQuestions[nextIndex]] = [activeQuestions[nextIndex], activeQuestions[index]];
  renderAll();
  showToast(direction < 0 ? "题目已上移" : "题目已下移");
}

function deleteQuestion() {
  const index = activeQuestions.findIndex(question => question.id === selectedId);
  if (index < 0) return;
  const [removed] = activeQuestions.splice(index, 1);
  deletedQuestions.push({ ...removed, originalIndex: index + 1 });
  selectedId = activeQuestions[Math.min(index, activeQuestions.length - 1)]?.id;
  renderAll();
  showToast("题目已移入已删除题目");
}

function addBankQuestion(id) {
  const source = bankQuestions.find(question => question.id === id);
  if (!source) return;
  const question = {
    id: `q-${Date.now()}`,
    section: "基础提优题",
    text: source.text,
    options: [],
    answer: source.answer,
    path: `初中 / 数学 / ${source.meta.split(" · ")[0]}`,
    tags: ["25-26·七年级上5年中考3年模拟", source.meta.split(" · ")[0], "题库精选"],
    explanation: `这道题来自题库精选，答案为${source.answer}，可继续调整后使用。`
  };
  const insertIndex = activeQuestions.findIndex(item => item.id === selectedId);
  activeQuestions.splice(insertIndex < 0 ? activeQuestions.length : insertIndex + 1, 0, question);
  selectedId = question.id;
  closeModal();
  renderAll();
  showToast("题目已添加到题单");
}

function replaceQuestion(id) {
  const source = bankQuestions.find(question => question.id === id);
  const index = activeQuestions.findIndex(question => question.id === selectedId);
  if (!source || index < 0) return;
  activeQuestions[index] = {
    id: activeQuestions[index].id,
    section: activeQuestions[index].section,
    text: source.text,
    options: [],
    answer: source.answer,
    path: `初中 / 数学 / ${source.meta.split(" · ")[0]}`,
    tags: ["25-26·七年级上5年中考3年模拟", source.meta.split(" · ")[0], "题库精选"],
    explanation: `已用题库中的相近题目替换，答案为${source.answer}。`
  };
  closeModal();
  renderAll();
  showToast("题目已替换");
}

function initPageChrome() {
  $("#paperTitle").textContent = documentTitle;
  document.title = `${documentTitle} · 飞象 AI 题库`;
  $("#breadcrumbLeaf").textContent = payload?.isQuestionList ? "新建题单" : "排版题单";

  const backLink = $("#backLink");
  if (fromAi) {
    backLink.href = `./detail-ai.html?topic=${encodeURIComponent(topicId)}&context=${encodeURIComponent(contextName)}${sourceTabId ? `&tabId=${encodeURIComponent(sourceTabId)}` : ""}`;
    backLink.innerHTML = '<i class="ri-folder-3-line"></i>返回试卷详情';
  } else {
    backLink.href = `./detail-ai.html?topic=${encodeURIComponent(topicId)}&context=${encodeURIComponent(contextName)}`;
    backLink.innerHTML = '<i class="ri-folder-3-line"></i>返回题单详情';
  }
}

initPageChrome();
if (fromAi && !usePayloadQuestions) {
  showToast("未读取到题单题目，请返回重新进入排版");
}
renderAll();

$("#orderList").addEventListener("click", event => {
  const button = event.target.closest("[data-select-question]");
  if (button) selectQuestion(button.dataset.selectQuestion, true);
});

$("#questionList").addEventListener("click", event => {
  const card = event.target.closest("[data-question-id]");
  if (!card) return;
  const action = event.target.closest("[data-question-action]")?.dataset.questionAction;
  if (!action) return selectQuestion(card.dataset.questionId);
  selectedId = card.dataset.questionId;
  if (action === "replace") openModal("replace");
  if (action === "up") moveQuestion(-1);
  if (action === "down") moveQuestion(1);
  if (action === "delete") deleteQuestion();
});

document.querySelectorAll('[data-editor-action="add"]').forEach(button => button.addEventListener("click", () => openModal("add")));
document.querySelector('[data-editor-action="deleted"]').addEventListener("click", () => openModal("deleted"));
document.querySelector('[data-editor-action="preview"]').addEventListener("click", () => showToast("正在打开预览…"));
document.querySelector('[data-editor-action="save"]').addEventListener("click", () => showToast("题单已保存"));
document.querySelector('[data-editor-action="assign"]').addEventListener("click", () => showToast("已发送到对话"));
document.querySelector('[data-editor-action="print"]').addEventListener("click", () => showToast("正在准备打印…"));
document.querySelector('[data-editor-action="download"]').addEventListener("click", () => showToast("正在生成可打印文件…"));

$("#bankList").addEventListener("click", event => {
  const bankButton = event.target.closest("[data-bank-question]");
  const restoreButton = event.target.closest("[data-restore-question]");
  if (bankButton) {
    if (modalMode === "replace") replaceQuestion(bankButton.dataset.bankQuestion);
    else addBankQuestion(bankButton.dataset.bankQuestion);
  }
  if (restoreButton) {
    const index = deletedQuestions.findIndex(question => question.id === restoreButton.dataset.restoreQuestion);
    if (index < 0) return;
    const [restored] = deletedQuestions.splice(index, 1);
    delete restored.originalIndex;
    activeQuestions.push(restored);
    selectedId = restored.id;
    renderAll();
    renderBank();
    showToast("题目已恢复");
  }
});

$("#bankSearch").addEventListener("input", renderBank);
document.querySelectorAll("[data-close-modal]").forEach(element => element.addEventListener("click", closeModal));

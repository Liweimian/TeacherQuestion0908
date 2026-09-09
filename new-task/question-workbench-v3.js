(() => {
  const STORAGE_KEY = 'feixiang-question-workbench-v3-drafts'
  const ACTIVE_DRAFT_KEY = 'feixiang-question-workbench-v3-active-draft'
  const $ = (selector, root = document) => root.querySelector(selector)
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)]

  const escapeHtml = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

  const svg = (body) => `<svg viewBox="0 0 24 24" aria-hidden="true">${body}</svg>`
  const icons = {
    back: svg('<path d="m14.5 5-7 7 7 7"/>'),
    search: svg('<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 4.5 4.5"/>'),
    upload: svg('<path d="M5 4h14v16H5z"/><path d="m9 11 3-3 3 3M12 8v7M8 17h8"/>'),
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    check: svg('<path d="m5 12 4 4L19 6"/>'),
    sparkle: svg('<path d="m12 3 1.3 4.2L17.5 8.5l-4.2 1.3L12 14l-1.3-4.2-4.2-1.3 4.2-1.3L12 3Z"/>'),
    up: svg('<path d="m7 14 5-5 5 5"/>'),
    blank: svg('<path d="M6 3.5h9l3 3V20H6z"/><path d="M15 3.5V7h3M9 11h6M9 14h6M9 17h4"/>'),
    chevron: svg('<path d="m9 6 6 6-6 6"/>'),
    knowledge: svg('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>'),
    image: svg('<rect x="3.5" y="4.5" width="17" height="15" rx="2"/><circle cx="9" cy="10" r="2"/><path d="m5.5 17 4-4 3 3 2.5-2.5 3.5 3.5"/>'),
    eye: svg('<path d="M2.5 12s3.5-5.5 9.5-5.5 9.5 5.5 9.5 5.5-3.5 5.5-9.5 5.5S2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.5"/>'),
    download: svg('<path d="M12 3v12M7.5 10.5 12 15l4.5-4.5M5 20h14"/>'),
    workbench: svg('<rect x="4" y="5" width="7" height="6" rx="1.5"/><rect x="13" y="5" width="7" height="6" rx="1.5"/><rect x="4" y="13" width="7" height="6" rx="1.5"/><path d="M16.5 13v6M13.5 16h6"/>'),
    trash: svg('<path d="M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/>'),
  }

  const defaultPaperFormat = { fontSize: 13, lineHeight: 1.65, answerHeight: 28, questionGap: 8 }

  function paperFormat() {
    activeDraft.format = { ...defaultPaperFormat, ...(activeDraft.format || {}) }
    if (!activeDraft.format.questionGapVersion) {
      activeDraft.format.questionGap = 8
      activeDraft.format.questionGapVersion = 2
    }
    return activeDraft.format
  }

  function paperToolbarMarkup() {
    const format = paperFormat()
    return `<div class="wb3-paper-toolbar" role="toolbar" aria-label="画布编辑工具">
      <label class="wb3-tool-select" data-tooltip="字号"><span class="wb3-tool-icon font-size-icon">T</span><select data-paper-format="fontSize" aria-label="字号"><option value="12" ${format.fontSize === 12 ? 'selected' : ''}>小五</option><option value="13" ${format.fontSize === 13 ? 'selected' : ''}>五号</option><option value="14" ${format.fontSize === 14 ? 'selected' : ''}>小四</option><option value="16" ${format.fontSize === 16 ? 'selected' : ''}>四号</option></select></label>
      <div class="wb3-tool-group text"><button type="button" data-rich-command="bold" data-tooltip="加粗" aria-label="加粗"><b>B</b></button><button type="button" data-rich-command="italic" data-tooltip="斜体" aria-label="斜体"><i>I</i></button><button type="button" data-rich-command="underline" data-tooltip="下划线" aria-label="下划线"><u>U</u></button></div>
      <i class="wb3-tool-separator"></i>
      <label class="wb3-tool-select" data-tooltip="行间距"><span class="wb3-tool-icon line-height-icon"><i>↕</i><b>≡</b></span><select data-paper-format="lineHeight" aria-label="行间距"><option value="1.4" ${format.lineHeight === 1.4 ? 'selected' : ''}>1.0</option><option value="1.65" ${format.lineHeight === 1.65 ? 'selected' : ''}>1.5</option><option value="2" ${format.lineHeight === 2 ? 'selected' : ''}>2.0</option></select></label>
      <label class="wb3-tool-select" data-tooltip="作答区行高"><span class="wb3-tool-icon answer-height-icon"><i>↕</i><b></b></span><select data-paper-format="answerHeight" aria-label="作答区行高"><option value="20" ${format.answerHeight === 20 ? 'selected' : ''}>1.0</option><option value="28" ${format.answerHeight === 28 ? 'selected' : ''}>1.5</option><option value="40" ${format.answerHeight === 40 ? 'selected' : ''}>2.0</option></select></label>
      <label class="wb3-tool-select" data-tooltip="题间距"><span class="wb3-tool-icon question-gap-icon"><i>↕</i><b>H</b></span><select data-paper-format="questionGap" aria-label="题间距"><option value="8" ${format.questionGap === 8 ? 'selected' : ''}>0.5</option><option value="12" ${format.questionGap === 12 ? 'selected' : ''}>1.0</option><option value="20" ${format.questionGap === 20 ? 'selected' : ''}>1.5</option></select></label>
    </div>`
  }

  const bankQuestions = [
    { id: 'b1', type: '填空题', knowledge: '部分合作问题', difficulty: '较易', score: 1, text: '用无人机喷洒农药、施肥等，可以极大地提高农业生产效率。农场给一片农田喷洒农药，一架小型无人机8小时能完成这片农田的喷洒任务。使用这架无人机喷洒1小时后，随即又调来了一架中型无人机加入到喷洒农药工作中，已知这架中型无人机每小时喷洒的农田面积是小型无人机的2倍。请你算一算，还需（　　）小时就能完成这片农田的农药喷洒工作。' },
    { id: 'b2', type: '填空题', knowledge: '长方形', difficulty: '较易', score: 1, text: '将一张长40厘米、宽24厘米的长方形纸对折后，变成两个同样大的小长方形，小长方形的长是（　　）厘米，宽是（　　）厘米或长是（　　）厘米，宽是（　　）厘米。' },
    { id: 'b3', type: '选择题', knowledge: '直线、射线和线段', difficulty: '较易', score: 1, text: '“有始有终”常常被用来形容一个人做事能够坚持到底，在数学上可以用这个成语来形容（　）。', options: ['A. 射线', 'B. 直线', 'C. 线段', 'D. 以上都可以'] },
    { id: 'b4', type: '选择题', knowledge: '线段', difficulty: '较易', score: 1, text: '把一条长3厘米的线段向两端各延长3厘米，得到一条（　）。', options: ['A. 直线', 'B. 线段', 'C. 射线', 'D. 无法确定'] },
    { id: 'b5', type: '选择题', knowledge: '三位数乘两位数', difficulty: '较易', score: 1, text: '要使256×□的积是一个四位数，□里最大可以填（　）。', options: ['A. 37', 'B. 38', 'C. 39', 'D. 40'] },
    { id: 'b6', type: '填空题', knowledge: '因数末尾有0', difficulty: '较易', score: 1, text: '12×13×14×15×16×17×18×19×20，积的末尾有（　　）个0。' },
    { id: 'b7', type: '解答题', knowledge: '同向追及问题', difficulty: '中等', score: 3, text: '共享单车作为一种低碳、绿色的出行方式，俨然成为市民出行的“新宠”。甲、乙两人骑共享单车环岛行，他们来到同一地点，甲先去买水花费了3分钟，甲去买水的同时，乙开始以每分钟340米骑行，甲骑行了12分钟追上乙，那么甲的速度是多少？' },
    { id: 'b8', type: '选择题', knowledge: '钟面上的角', difficulty: '较易', score: 1, text: '从早上6：00到早上6：30钟面上分针旋转了（　）。', options: ['A. 180°', 'B. 90°', 'C. 30°'] },
    { id: 'b9', type: '解答题', knowledge: '长方体体积', difficulty: '中等', score: 3, text: '一个长方体盒子的底面积是4/9平方分米，高是1/2分米。一个正方体盒子的体积是1/8立方分米。长方体盒子的体积比正方体盒子的体积多多少立方分米？' },
    { id: 'b10', type: '选择题', knowledge: '折痕关系', difficulty: '较易', score: 1, text: '把一张正方形纸对折两次后展开，折痕（　）。', options: ['A. 相交', 'B. 互相平行', 'C. 互相垂直', 'D. 可能互相平行，也可能互相垂直'] },
  ].map((question) => ({ ...question, curriculum: '小学数学', hasAnswer: true })).concat([
    { id: 'cn1', curriculum: '小学语文', hasAnswer: true, type: '选择题', knowledge: '词语运用', difficulty: '基础', score: 3, text: '下列词语使用恰当的一项是（　）。', options: ['A. 津津有味', 'B. 迫不及待', 'C. 理所当然', 'D. 难以置信'] },
    { id: 'cn2', curriculum: '小学语文', hasAnswer: true, type: '选择题', knowledge: '病句修改', difficulty: '中等', score: 3, text: '下列句子中没有语病的一项是（　）。' },
    { id: 'cn3', curriculum: '小学语文', hasAnswer: true, type: '解答题', knowledge: '现代文阅读', difficulty: '中等', score: 8, text: '阅读短文，概括主人公的性格特点并说明理由。' },
    { id: 'cn4', curriculum: '小学语文', hasAnswer: false, type: '解答题', knowledge: '习作', difficulty: '提高', score: 20, text: '以“一次难忘的尝试”为题，完成一篇习作。' },
    { id: 'en1', curriculum: '小学英语', hasAnswer: true, type: '选择题', knowledge: '词汇', difficulty: '基础', score: 2, text: 'Choose the different word from the group.', options: ['A. Monday', 'B. Tuesday', 'C. weekend', 'D. Friday'] },
    { id: 'en2', curriculum: '小学英语', hasAnswer: true, type: '填空题', knowledge: '一般现在时', difficulty: '中等', score: 3, text: 'She ____ (go) to school by bus every day.' },
    { id: 'en3', curriculum: '小学英语', hasAnswer: true, type: '解答题', knowledge: '阅读理解', difficulty: '中等', score: 6, text: 'Read the passage and answer the questions.' },
    { id: 'en4', curriculum: '小学英语', hasAnswer: false, type: '解答题', knowledge: '书面表达', difficulty: '提高', score: 10, text: 'Write five sentences about your weekend.' },
    { id: 'jm1', curriculum: '初中数学', hasAnswer: true, type: '选择题', knowledge: '有理数', difficulty: '基础', score: 3, text: '−3 的相反数是（　）。', options: ['A. −3', 'B. 3', 'C. 1/3', 'D. −1/3'] },
    { id: 'jm2', curriculum: '初中数学', hasAnswer: true, type: '填空题', knowledge: '一元一次方程', difficulty: '中等', score: 3, text: '方程 3x−2＝10 的解为____。' },
    { id: 'jm3', curriculum: '初中数学', hasAnswer: true, type: '解答题', knowledge: '三角形', difficulty: '中等', score: 8, text: '已知三角形两内角分别为 45°、65°，求第三个内角。' },
    { id: 'jm4', curriculum: '初中数学', hasAnswer: false, type: '解答题', knowledge: '数据分析', difficulty: '提高', score: 8, text: '根据一组调查数据绘制统计图并分析变化趋势。' },
    { id: 'hm1', curriculum: '高中数学', hasAnswer: true, type: '选择题', knowledge: '集合', difficulty: '基础', score: 5, text: '已知集合 A＝{1,2,3}，B＝{2,3,4}，则 A∩B＝（　）。' },
    { id: 'hm2', curriculum: '高中数学', hasAnswer: true, type: '填空题', knowledge: '函数性质', difficulty: '中等', score: 5, text: '函数 f(x)＝x²−2x 的对称轴为____。' },
    { id: 'hm3', curriculum: '高中数学', hasAnswer: true, type: '解答题', knowledge: '立体几何', difficulty: '提高', score: 12, text: '证明直线与平面垂直，并求相关几何量。' },
    { id: 'hm4', curriculum: '高中数学', hasAnswer: false, type: '解答题', knowledge: '概率统计', difficulty: '提高', score: 12, text: '利用样本数据估计总体特征并说明结论。' },
  ])

  const bankPapers = [
    { id: 'paper-1', title: '四年级数学综合练习', subject: '数学', grade: '四年级', paperType: '综合练习', meta: '精选真题 · 5题 · 15分钟', questions: bankQuestions.slice(0, 5) },
    { id: 'paper-2', title: '四年级数学期中基础练习', subject: '数学', grade: '四年级', paperType: '期中', meta: '校级题库 · 5题 · 15分钟', questions: bankQuestions.slice(0, 5) },
    { id: 'paper-3', title: '四年级易错题专项卷', subject: '数学', grade: '四年级', paperType: '专项练习', meta: '精选题单 · 4题 · 12分钟', questions: [bankQuestions[0], bankQuestions[1], bankQuestions[3], bankQuestions[4]] },
  ]

  const knowledgePapers = [
    { id: 'k1', title: '四年级数学错题集', type: '收藏题集', meta: '18 题 · 四年级上册', questions: [bankQuestions[0], bankQuestions[1], bankQuestions[3]] },
    { id: 'k2', title: '四年级数学期末卷', type: '历史试卷', meta: '26 题 · 区级题库', questions: [bankQuestions[2], bankQuestions[4]] },
    { id: 'k3', title: '长方体互动课件配套题', type: '校本资源', meta: '课件资源 · 6 道配套题', questions: [bankQuestions[2], bankQuestions[4]] },
    { id: 'k4', title: '四年级计算每日练', type: '收藏题集', meta: '12 题 · 最近更新', questions: [bankQuestions[0], bankQuestions[2], bankQuestions[4]] },
  ]

  const aiHistoryQuestions = bankQuestions.slice(5, 10).map((question) => ({
    ...question,
    id: `ai-history-${question.id}`,
    originId: question.id,
    source: 'ai-record',
  }))

  let personalQuestions = [...knowledgePapers[0].questions, ...aiHistoryQuestions]
  let aiImportRecords = [
    { id: 'record-complete', filename: '四年级数学综合练习.pdf', status: 'completed', stage: '解析完成', submittedAt: '09-06 16:20', completedAt: '09-06 16:27', questions: aiHistoryQuestions },
    { id: 'record-processing', filename: '四年级上册期末复习.docx', status: 'processing', stage: '正在提取题目与答案', submittedAt: '今天 10:28', eta: '预计还需 4–10 分钟', questions: [] },
  ]
  let aiComposeRecords = [
    {
      id: 'compose-history-1',
      title: '五年级小数乘除法基础练习',
      prompt: '生成 5 道五年级小数乘除法基础题',
      mode: 'generate',
      status: 'completed',
      createdAt: '09-06 15:40',
      plan: { count: 5, types: '选择、填空、解答', difficulty: '基础为主，适量中等', knowledge: '数与运算、数量关系、图形与几何', minutes: 15 },
      questions: bankQuestions.slice(0, 5).map((question, index) => ({ ...question, id: `compose-history-1-q${index + 1}`, originId: question.id, source: 'ai-compose' })),
    },
  ]

  const curriculumCatalog = {
    '小学数学': { subject: '四年级 · 数学', groups: [['全部知识点',10],['数与运算',2],['三位数乘两位数',1],['因数末尾有0',1],['数量关系',2],['部分合作问题',1],['同向追及问题',1],['图形与几何',6],['长方形',1],['直线、射线和线段',1],['线段',1],['钟面上的角',1],['长方体体积',1],['折痕关系',1]], parents: { '数与运算':['三位数乘两位数','因数末尾有0'], '数量关系':['部分合作问题','同向追及问题'], '图形与几何':['长方形','直线、射线和线段','线段','钟面上的角','长方体体积','折痕关系'] } },
    '小学语文': { subject: '五年级 · 语文', groups: [['全部知识点',4],['语言文字积累',2],['词语运用',1],['病句修改',1],['阅读与鉴赏',1],['现代文阅读',1],['表达与交流',1],['习作',1]], parents: { '语言文字积累':['词语运用','病句修改'], '阅读与鉴赏':['现代文阅读'], '表达与交流':['习作'] } },
    '小学英语': { subject: '五年级 · 英语', groups: [['全部知识点',4],['语言知识',2],['词汇',1],['一般现在时',1],['阅读',1],['阅读理解',1],['表达',1],['书面表达',1]], parents: { '语言知识':['词汇','一般现在时'], '阅读':['阅读理解'], '表达':['书面表达'] } },
    '初中数学': { subject: '七年级 · 数学', groups: [['全部知识点',4],['数与式',1],['有理数',1],['方程与不等式',1],['一元一次方程',1],['图形与几何',1],['三角形',1],['统计与概率',1],['数据分析',1]], parents: { '数与式':['有理数'], '方程与不等式':['一元一次方程'], '图形与几何':['三角形'], '统计与概率':['数据分析'] } },
    '高中数学': { subject: '高一 · 数学', groups: [['全部知识点',4],['预备知识',1],['集合',1],['函数',1],['函数性质',1],['几何',1],['立体几何',1],['统计与概率',1],['概率统计',1]], parents: { '预备知识':['集合'], '函数':['函数性质'], '几何':['立体几何'], '统计与概率':['概率统计'] } },
  }

  let root
  let activeDraft
  let questionSource = 'official'
  let curriculumKey = '小学数学'
  let treeSearchQuery = ''
  let activeKnowledge = '全部知识点'
  let filterType = '全部题型'
  let filterDifficulty = '全部难度'
  let selectedQuestionId = ''
  let answerEditorQuestionId = ''
  let revealedAnswerIds = new Set()
  let uploadParsing = false
  let aiGenerating = false
  let importMenuOpen = false
  let knowledgeModalOpen = false
  let importWorkspaceView = 'library'
  let openWorkspaceTabs = []
  let activeImportRecordId = ''
  let activeAiComposeRecordId = ''
  let previewKnowledgePaperId = ''
  let adaptRequest = null
  let adaptPicker = null
  let autoSavedAt = 0

  function makeId(prefix = 'q') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
  }

  function createBlankDraft() {
    return { id: makeId('draft'), title: '未命名题单', subject: currentCurriculum().subject, curriculumKey, questions: [], createdAt: Date.now(), updatedAt: Date.now() }
  }

  function loadActiveDraft() {
    try {
      const activeId = localStorage.getItem(ACTIVE_DRAFT_KEY)
      if (!activeId) return null
      const draft = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').find((item) => item.id === activeId) || null
      if (draft?.questions) draft.questions = draft.questions.filter((question) => !(question.source === 'knowledge' && question.status === 'draft'))
      return draft
    } catch { return null }
  }

  function savedDraftPapers() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter((draft) => draft.questions?.some((question) => question.status === 'confirmed')).map((draft) => {
        const questions = draft.questions.filter((question) => question.status === 'confirmed')
        return { id: `saved-${draft.id}`, draftId: draft.id, title: draft.title || '未命名题单', type: '我的组题', meta: `自动保存 · ${questions.length} 题`, questions }
      })
    } catch { return [] }
  }

  function allKnowledgePapers() {
    const saved = savedDraftPapers()
    return [...saved, ...knowledgePapers.filter((paper) => !saved.some((item) => item.id === paper.id))]
  }

  function cloneQuestion(question, extra = {}) {
    return { ...question, id: makeId('sheet'), sourceId: question.id, status: 'confirmed', source: question.source || 'bank', ...extra }
  }

  function getAddedMap() {
    const map = new Map()
    ;(activeDraft?.questions || []).forEach((q, index) => {
      if (q.status === 'confirmed' && q.sourceId) map.set(q.sourceId, index + 1)
    })
    return map
  }

  function draftMeta() {
    const confirmed = (activeDraft?.questions || []).filter((q) => q.status === 'confirmed')
    const pending = (activeDraft?.questions || []).filter((q) => q.status === 'draft' || q.status === 'adapt')
    const score = confirmed.reduce((sum, q) => sum + Number(q.score || 0), 0)
    const pendingScore = pending.reduce((sum, q) => sum + Number(q.score || 0), 0)
    const minutes = Math.max(5, Math.round(confirmed.length * 1.8))
    const typeCount = {}
    const diffCount = {}
    const knowledgeSet = new Set()
    confirmed.forEach((q) => {
      typeCount[q.type] = (typeCount[q.type] || 0) + 1
      diffCount[q.difficulty] = (diffCount[q.difficulty] || 0) + 1
      if (q.knowledge) knowledgeSet.add(q.knowledge)
    })
    return { count: confirmed.length, score, minutes, pendingCount: pending.length, pendingScore, typeCount, diffCount, knowledgeCount: knowledgeSet.size }
  }

  function persistDraft() {
    if (!activeDraft) return
    activeDraft.curriculumKey = curriculumKey
    activeDraft.updatedAt = Date.now()
    try {
      const drafts = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]').filter((d) => d.id !== activeDraft.id)
      drafts.unshift(activeDraft)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts.slice(0, 20)))
      localStorage.setItem(ACTIVE_DRAFT_KEY, activeDraft.id)
      autoSavedAt = activeDraft.updatedAt
    } catch { /* ignore */ }
  }

  function startNewDraft() {
    persistDraft()
    activeDraft = createBlankDraft()
    selectedQuestionId = ''
    revealedAnswerIds = new Set()
    adaptRequest = null
    adaptPicker = null
    importWorkspaceView = 'library'
    activeImportRecordId = ''
    activeAiComposeRecordId = ''
    previewKnowledgePaperId = ''
    autoSavedAt = 0
    persistDraft()
    render()
    showToast('已新建组题，上一份内容已自动保存')
  }

  function showToast(text) {
    const toast = $('#wb3Toast', root)
    if (!toast) return
    toast.textContent = text
    toast.classList.add('show')
    window.clearTimeout(showToast.timer)
    showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 2200)
  }

  function currentCurriculum() {
    return curriculumCatalog[curriculumKey] || curriculumCatalog['小学数学']
  }

  function currentBankQuestions() {
    if (questionSource === 'personal') {
      return personalQuestions.filter((question) => question.curriculum === curriculumKey)
    }
    return bankQuestions.filter((question) => question.curriculum === curriculumKey)
  }

  function findQuestionById(id) {
    return bankQuestions.find((question) => question.id === id)
      || personalQuestions.find((question) => question.id === id)
      || allKnowledgePapers().flatMap((paper) => paper.questions || []).find((question) => question.id === id)
      || aiImportRecords.flatMap((record) => record.questions || []).find((question) => question.id === id)
      || aiComposeRecords.flatMap((record) => record.questions || []).find((question) => question.id === id)
  }

  function knowledgeCount(name) {
    const curriculum = currentCurriculum()
    const questions = currentBankQuestions()
    if (name === '全部知识点') return questions.length
    if (curriculum.parents[name]) return questions.filter((question) => curriculum.parents[name].includes(question.knowledge)).length
    return questions.filter((question) => question.knowledge === name).length
  }

  function filterBankQuestions() {
    const curriculum = currentCurriculum()
    const treeQuery = treeSearchQuery.trim().toLowerCase()
    return currentBankQuestions().filter((question) => {
      const scopeMatch = treeQuery
        ? question.knowledge.toLowerCase().includes(treeQuery)
          || question.text.toLowerCase().includes(treeQuery)
          || (question.options || []).some((option) => option.toLowerCase().includes(treeQuery))
          || Object.entries(curriculum.parents).some(([parent, children]) => parent.toLowerCase().includes(treeQuery) && children.includes(question.knowledge))
        : activeKnowledge === '全部知识点' || question.knowledge === activeKnowledge || curriculum.parents[activeKnowledge]?.includes(question.knowledge)
      const typeMatch = filterType === '全部题型' || question.type === filterType
      const difficultyMatch = filterDifficulty === '全部难度' || question.difficulty === filterDifficulty
      return scopeMatch && typeMatch && difficultyMatch
    })
  }

  function visibleTreeGroups() {
    const curriculum = currentCurriculum()
    const query = treeSearchQuery.trim().toLowerCase()
    if (!query) return curriculum.groups.filter(([name]) => name !== '全部知识点')
    const matchedKnowledge = new Set(currentBankQuestions().filter((question) => (
      question.knowledge.toLowerCase().includes(query)
      || question.text.toLowerCase().includes(query)
      || (question.options || []).some((option) => option.toLowerCase().includes(query))
      || Object.entries(curriculum.parents).some(([parent, children]) => parent.toLowerCase().includes(query) && children.includes(question.knowledge))
    )).map((question) => question.knowledge))
    return curriculum.groups.filter(([name]) => name !== '全部知识点' && (
      name.toLowerCase().includes(query)
      || curriculum.parents[name]?.some((child) => child.toLowerCase().includes(query))
      || matchedKnowledge.has(name)
      || curriculum.parents[name]?.some((child) => matchedKnowledge.has(child))
    ))
  }

  function questionAnswerText(question) {
    return {
      b1: '2又1/3小时。', b2: '24；20；40；12。', b3: 'C. 线段', b4: 'B. 线段', b5: 'C. 39', b6: '2个。', b7: '425米/分。', b8: 'A. 180°', b9: '7/72立方分米。', b10: 'D. 可能互相平行，也可能互相垂直',
      cn1: '结合具体语境判断。', cn2: '依据句子成分与搭配判断。', cn3: '抓住人物的语言、动作和心理描写概括。', cn4: '开放性答案。',
      en1: 'C. weekend', en2: 'goes', en3: 'According to the passage.', en4: '开放性答案。',
      jm1: 'B. 3', jm2: 'x＝4', jm3: '70°', jm4: '开放性答案。', hm1: '{2,3}', hm2: 'x＝1', hm3: '见标准证明过程。', hm4: '开放性答案。',
    }[question.originId || question.sourceId || question.id] || question.answer || '请查看题库答案。'
  }

  function questionAnalysisText(question) {
    const id = question.originId || question.sourceId || question.id
    return question.analysis || {
      b1: '先分别计算两种无人机每小时完成的工作量，再用剩余工作量除以两架无人机的效率和。',
      b2: '沿不同方向对折时，对折方向的边长减半，另一条边保持不变。',
      b3: '线段有两个端点，符合“有始有终”的含义。',
      b4: '延长后仍有两个确定端点，所以所得图形仍是线段。',
      b5: '积为四位数需满足256×□≤9999，据此求出方框内的最大整数。',
      b6: '将各因数分解质因数，统计2和5能够配成多少组10。',
      b7: '先求乙领先的路程，再用领先路程除以追及时间求速度差。',
      b8: '30分钟内分针转过半圈，即180°。',
      b9: '先用底面积乘高求长方体体积，再与正方体体积作差。',
      b10: '两次对折的方向不同，得到的折痕关系也会不同。',
    }[id] || `围绕“${question.knowledge || '本题考点'}”提取条件，选择对应公式或关系，分步推理并核对结果。`
  }

  function questionCardMarkup(question, addedMap) {
    const addedIndex = addedMap.get(question.id)
    const answerShown = revealedAnswerIds.has(question.id)
    const answerText = questionAnswerText(question)
    const adapting = (adaptRequest?.inline && adaptRequest.source.id === question.id) || adaptPicker?.source.id === question.id
    const canDeletePersonal = importWorkspaceView === 'library' && questionSource === 'personal' && personalQuestions.some((item) => item.id === question.id)
    return `<article class="wb3-qcard ${addedIndex ? 'added' : ''} ${answerShown ? 'answer-open' : ''} ${adapting ? 'adapting' : ''}" data-qid="${question.id}">
      ${addedIndex ? `<span class="wb3-added-status">已加入 · 第 ${addedIndex} 题</span>` : ''}
      <span>
        <span class="wb3-qcard-tags">
          <span>${escapeHtml(question.type)}</span>
          <span>${escapeHtml(question.difficulty)}</span>
          <span>${escapeHtml(question.knowledge)}</span>
        </span>
        <p>${escapeHtml(question.text)}</p>
        ${question.options?.length ? `<span class="wb3-qcard-options">${question.options.map((option) => `<span>${escapeHtml(option)}</span>`).join('')}</span>` : ''}
        ${answerShown ? `<span class="wb3-qcard-answer"><span><b>答案</b>${escapeHtml(answerText)}</span><span><b>解析</b>${escapeHtml(questionAnalysisText(question))}</span></span>` : ''}
      </span>
      <span class="wb3-qcard-actions">
        ${canDeletePersonal ? `<button type="button" class="delete" data-delete-personal-question="${question.id}" title="从我的题库删除" aria-label="从我的题库删除">${icons.trash}</button>` : ''}
        <button type="button" class="answer" data-quick-answer="${question.id}" title="${answerShown ? '收起答案' : '显示答案'}" aria-label="${answerShown ? '收起答案' : '显示答案'}">答</button>
        <button type="button" class="adapt" data-quick-adapt="${question.id}" title="AI 改编" aria-label="AI 改编">${icons.sparkle}</button>
        <button type="button" data-quick-add="${question.id}" title="${addedIndex ? '取消选用' : '选用题目'}" aria-label="${addedIndex ? '取消选用' : '选用题目'}">${addedIndex ? icons.check : icons.plus}</button>
      </span>
      ${inlineAdaptMarkup(question)}
    </article>`
  }

  function inlineAdaptMarkup(question) {
    const isRequesting = adaptRequest?.inline && adaptRequest.source.id === question.id
    const isGenerating = adaptPicker?.source.id === question.id
    if (!isRequesting && !isGenerating) return ''
    if (isRequesting) return `<section class="wb3-inline-adapt"><header><span>${icons.sparkle}</span><b>AI 改编</b><div class="wb3-inline-adapt-prompts"><button type="button" data-inline-adapt-prompt="换成生活情境，保持知识点和难度不变">换情境</button><button type="button" data-inline-adapt-prompt="降低难度，保持知识点不变">降低难度</button><button type="button" data-inline-adapt-prompt="生成同考点、不同数据的变式题">同考点变式</button></div><button type="button" data-close-inline-adapt aria-label="关闭AI改编" title="关闭">×</button></header><div class="wb3-inline-adapt-input"><textarea id="wb3InlineAdaptInput" rows="1" placeholder="描述改编要求"></textarea><button type="button" data-inline-adapt-submit>生成</button></div></section>`
    return `<section class="wb3-inline-adapt results"><header><span>${icons.sparkle}</span><b>AI 改编候选题</b><button type="button" data-close-inline-adapt aria-label="关闭AI改编" title="关闭">×</button></header>${adaptPicker.loading ? '<div class="wb3-inline-adapt-loading"><i></i>正在生成改编题</div>' : `<div class="wb3-inline-adapt-options">${adaptPicker.candidates.map((candidate, index) => `<article><div><span>AI 改编 ${index + 1}</span><em>${escapeHtml(candidate.difficulty)}</em><em>${escapeHtml(candidate.knowledge)}</em></div><p>${escapeHtml(candidate.text)}</p>${candidate.options?.length ? `<small>${candidate.options.map((option) => escapeHtml(option)).join('　')}</small>` : ''}<button type="button" data-use-adapt-candidate="${candidate.id}">选用题目</button></article>`).join('')}</div>`}</section>`
  }

  function importMenuMarkup() {
    if (!importMenuOpen) return ''
    return `<div class="wb3-import-menu" role="menu">
      <button type="button" data-import="upload" role="menuitem">${icons.upload}<span><b>上传文件</b><small>AI 录题并自动打标，后台解析约 4–10 分钟</small></span></button>
      <button type="button" data-import="history" role="menuitem">${icons.blank}<span><b>AI录题记录</b><small>${aiImportRecords.filter((record) => record.status === 'processing').length} 个处理中 · 可复用历史结果</small></span></button>
      <button type="button" data-import="knowledge" role="menuitem">${icons.knowledge}<span><b>我的知识库</b><small>按整份题单预览或导入</small></span></button>
      <button type="button" data-import="ai-compose" role="menuitem">${icons.sparkle}<span><b>AI组题记录</b><small>查看 AI 生成的整套题目</small></span></button>
    </div>`
  }

  function knowledgeModalMarkup() {
    if (!knowledgeModalOpen) return ''
    return `<div class="wb3-overlay" data-close-overlay>
      <div class="wb3-modal" role="dialog" aria-labelledby="wb3KnowledgeTitle">
        <header><div><h2 id="wb3KnowledgeTitle">从知识库导入题单</h2><p>选择一份历史题单，导入后将在右侧待确认</p></div><button type="button" data-close-knowledge aria-label="关闭">×</button></header>
        <div class="wb3-modal-body">${allKnowledgePapers().map((p) => `<button class="wb3-knowledge-row" type="button" data-import-paper="${p.id}"><span>${icons.blank}</span><span><b>${escapeHtml(p.title)}</b><small>${escapeHtml(p.type)} · ${escapeHtml(p.meta)} · ${p.questions.length} 题</small></span>${icons.chevron}</button>`).join('')}</div>
      </div>
    </div>`
  }

  function buildAdaptCandidates(source, requirement = '') {
    const replaceNumbers = (text, offset) => text.replace(/\d+(?:\.\d+)?/g, (value) => {
      const number = Number(value)
      if (!Number.isFinite(number)) return value
      return String(Number.isInteger(number) ? Math.max(1, number + offset) : Math.max(0.1, Number((number + offset / 10).toFixed(1))))
    })
    return [
      { ...source, id: makeId('adapt-option'), originId: source.originId || source.id, source: 'ai-adapt', variant: '方案一', text: replaceNumbers(source.text, 2), adaptRequirement: requirement },
      { ...source, id: makeId('adapt-option'), originId: source.originId || source.id, source: 'ai-adapt', variant: '方案二', text: `学校开展数学实践活动，请运用“${source.knowledge}”解决下面的问题：${source.text}`, adaptRequirement: requirement },
      { ...source, id: makeId('adapt-option'), originId: source.originId || source.id, source: 'ai-adapt', variant: '方案三', difficulty: /降低|简单|基础/.test(requirement) ? '较易' : source.difficulty === '较易' ? '中等' : source.difficulty, score: Number(source.score || 1) + (/降低|简单|基础/.test(requirement) ? 0 : 1), text: `${source.text.replace(/。?$/, '')}，并说明你的思考过程。`, adaptRequirement: requirement },
    ]
  }

  function adaptPickerMarkup() {
    if (!adaptPicker) return ''
    const source = adaptPicker.source
    return `<div class="wb3-adapt-side-mask" data-close-adapt-picker><section class="wb3-adapt-picker" role="dialog" aria-label="AI改编候选题"><header><div><span>${icons.sparkle} AI改编</span><h2>选择一道改编题</h2><p>按照“${escapeHtml(adaptPicker.requirement)}”生成 · 原题不会加入题单。</p></div><button type="button" data-close-adapt-picker aria-label="关闭">×</button></header><div class="wb3-adapt-picker-original"><b>原题</b><p>${escapeHtml(source.text)}</p></div><div class="wb3-adapt-picker-body">${adaptPicker.loading ? `<div class="wb3-processing-card"><i></i><b>正在生成改编题</b><p>保持“${escapeHtml(source.knowledge)}”考点不变，正在按您的要求调整题目。</p></div>` : adaptPicker.candidates.map((question, index) => `<article class="wb3-adapt-option"><div><span>方案 ${index + 1}</span><em>${escapeHtml(question.difficulty)}</em><em>${escapeHtml(question.knowledge)}</em></div><p>${escapeHtml(question.text)}</p>${question.options?.length ? `<small>${question.options.map((option) => escapeHtml(option)).join('　')}</small>` : ''}<button type="button" data-use-adapt-candidate="${question.id}">${adaptPicker.targetId ? '选用并替换原题' : '选用此题'}</button></article>`).join('')}</div></section></div>`
  }

  function openAdaptPicker(source, targetId = '', requirement = '') {
    if (!source) return
    adaptRequest = null
    adaptPicker = { source: { ...source }, targetId, requirement, loading: true, candidates: [] }
    render()
    window.setTimeout(() => {
      if (!adaptPicker || adaptPicker.source.id !== source.id) return
      adaptPicker.loading = false
      adaptPicker.candidates = buildAdaptCandidates(source, requirement)
      render()
    }, 700)
  }

  const workspaceTabCatalog = {
    'ai-create': { label: 'AI组题', view: 'ai-entry' },
    upload: { label: '上传文件', view: 'ai-upload' },
    knowledge: { label: '我的知识库', view: 'knowledge' },
    'ai-compose': { label: '历史AI组题', view: 'ai-compose' },
  }

  function activeWorkspaceTabId() {
    if (importWorkspaceView === 'library') return 'library'
    if (importWorkspaceView === 'add-more') return 'add-more'
    if (importWorkspaceView === 'ai-entry') return 'ai-create'
    if (importWorkspaceView === 'ai-record') return `record:${activeImportRecordId}`
    if (['ai-upload', 'ai-history'].includes(importWorkspaceView)) return 'upload'
    if (importWorkspaceView === 'knowledge' && previewKnowledgePaperId) return `paper:${previewKnowledgePaperId}`
    if (importWorkspaceView === 'knowledge') return 'knowledge'
    if (importWorkspaceView === 'ai-compose-record') return `compose:${activeAiComposeRecordId}`
    if (importWorkspaceView === 'ai-compose') return 'ai-compose'
    return 'add-more'
  }

  function workspaceTabInfo(id) {
    if (workspaceTabCatalog[id]) return workspaceTabCatalog[id]
    if (id.startsWith('paper:')) {
      const paper = allKnowledgePapers().find((item) => item.id === id.slice(6))
      return paper ? { label: paper.title, view: 'knowledge' } : null
    }
    if (id.startsWith('record:')) {
      const record = aiImportRecords.find((item) => item.id === id.slice(7))
      return record ? { label: record.filename.replace(/\.[^.]+$/, ''), view: 'ai-record' } : null
    }
    if (id.startsWith('compose:')) {
      const record = aiComposeRecords.find((item) => item.id === id.slice(8))
      return record ? { label: record.title, view: 'ai-compose-record' } : null
    }
    return null
  }

  function workspaceTabsMarkup() {
    const active = activeWorkspaceTabId()
    return `<nav class="wb3-workspace-tabs" aria-label="组题来源"><span class="wb3-workspace-brand"><button type="button" data-action="exit" aria-label="退出组题工作台" title="退出组题工作台">${icons.back}</button><i>${icons.workbench}</i><b>组题工作台</b></span><button type="button" class="${active === 'library' ? 'active' : ''}" data-workspace-tab="library">题库</button><button type="button" class="${active === 'add-more' ? 'active' : ''}" data-workspace-tab="add-more">更多题源</button>${openWorkspaceTabs.map((id) => { const tab = workspaceTabInfo(id); return tab ? `<span class="wb3-workspace-dynamic ${active === id ? 'active' : ''}"><button type="button" data-workspace-tab="${id}" title="${escapeHtml(tab.label)}">${escapeHtml(tab.label)}</button><button type="button" data-close-workspace-tab="${id}" aria-label="关闭${escapeHtml(tab.label)}">×</button></span>` : '' }).join('')}</nav>`
  }

  function openWorkspaceTab(id) {
    const tab = workspaceTabInfo(id)
    if (!tab) return
    if (!openWorkspaceTabs.includes(id)) openWorkspaceTabs.push(id)
    importWorkspaceView = tab.view
    activeImportRecordId = id.startsWith('record:') ? id.slice(7) : ''
    previewKnowledgePaperId = id.startsWith('paper:') ? id.slice(6) : ''
    activeAiComposeRecordId = id.startsWith('compose:') ? id.slice(8) : ''
    render()
  }

  function composePlanMarkup(record) {
    const plan = record.plan || { count: record.questions?.length || 5, types: '选择、填空、解答', difficulty: '基础与中等搭配', knowledge: '结合当前学段学科', minutes: 15 }
    const steps = record.status === 'completed'
      ? [['命题参数定义与模型构建', `识别组题场景，规划 ${plan.count} 道题、${plan.minutes} 分钟的试卷结构`, true], ['题库检索与初筛', `围绕“${plan.knowledge}”检索并去除重复、超纲题目`, true], ['命题双向细目表', `按 ${plan.types} 配置题型，并建立题目与知识点的对应关系`, true], ['试题多维校验', '逐题检查题干、选项、答案、知识点和能力层级', true], ['试题结构平衡性复核', `复核难度分布：${plan.difficulty}`, true], ['AI 试题模拟与质量验收', '完成整卷模拟作答、分值与结构一致性检查', true], ['标准化文档输出', '生成试卷、答案解析和命题说明书', true]]
      : [['命题参数定义与模型构建', `正在识别组题场景并规划 ${plan.count} 道题`, true], ['题库检索与初筛', `正在围绕“${plan.knowledge}”检索候选题`, true], ['命题双向细目表', '等待建立题目、知识点与能力层级对应关系', false], ['试题多维校验', '等待检查题干、选项和答案', false], ['试题结构平衡性复核', '等待复核题型与难度结构', false], ['AI 试题模拟与质量验收', '等待整卷模拟验收', false], ['标准化文档输出', '等待生成标准文档', false]]
    return `<section class="wb3-compose-thinking"><header><div><b>专业组题过程</b><span>${record.status === 'completed' ? '已完成质量检查' : 'AI 正在执行组题方案'}</span></div><em>${record.mode === 'append' ? '补充题目' : record.mode === 'adapt' ? '改编单题' : '生成新题单'}</em></header><div class="wb3-compose-steps">${steps.map(([label, description, done], index) => `<article class="${done ? 'done' : index === 2 && record.status !== 'completed' ? 'current' : ''}"><i>${done ? '✓' : index + 1}</i><div><b>${label}</b><p>${escapeHtml(description)}</p></div></article>`).join('')}</div><details ${record.status === 'completed' ? '' : 'open'}><summary>查看组题蓝图</summary><div class="wb3-compose-plan"><span><b>${plan.count}</b>题目数量</span><span><b>${escapeHtml(plan.types)}</b>题型结构</span><span><b>${escapeHtml(plan.difficulty)}</b>难度分布</span><span><b>${escapeHtml(plan.knowledge)}</b>知识点覆盖</span><span><b>${plan.minutes} 分钟</b>建议用时</span></div></details></section>`
  }

  function aiOutputMarkup(record) {
    if (record.status !== 'completed' || record.mode !== 'generate') return ''
    return `<section class="wb3-ai-outputs"><header><div><b>AI 输出</b><span>命题说明书已生成</span></div></header><div class="wb3-ai-output-files"><details class="wb3-brief-file"><summary><span class="pdf">PDF</span><div><b>命题说明书.pdf</b><small>包含双向细目表、选题依据、难度结构与质量校验</small></div><span class="wb3-brief-actions"><em>查看</em><button type="button" data-download-brief>下载</button></span></summary><div class="wb3-brief-preview"><header><b>命题说明书</b><button type="button" data-download-brief>下载 PDF</button></header><section><h4>命题参数与结构</h4><p>题目数量：${record.plan?.count || record.questions.length} 题　题型：${escapeHtml(record.plan?.types || '选择、填空、解答')}　建议用时：${record.plan?.minutes || 15} 分钟</p></section><section><h4>双向细目表</h4>${record.questions.slice(0, 5).map((question, index) => `<p>${index + 1}. ${escapeHtml(question.type)}　${escapeHtml(question.knowledge)}　${escapeHtml(question.difficulty)}</p>`).join('')}</section><section><h4>质量校验结论</h4><p>题型、知识点与难度结构符合命题要求；已完成重复题、答案完整性和整卷结构检查。</p></section></div></details></div></section>`
  }

  function aiGeneratedQuestionsMarkup(record, addedMap) {
    return `<details class="wb3-ai-generated" open><summary><span>${icons.sparkle}<b>AI 生成题目</b><em>${record.questions.length} 道</em></span><small>点击折叠 / 展开</small></summary><div class="wb3-ai-generated-toolbar"><span>可以逐题选用，也可以一次全部加入组题画布</span><button type="button" data-compose-record-all="${record.id}">${record.allAdded ? '已全部加入' : '全部加入组题画布'}</button></div><div class="wb3-import-question-list">${record.questions.map((question) => questionCardMarkup(question, addedMap)).join('')}</div></details>`
  }

  function composeConversationHistoryMarkup(record, addedMap) {
    const conversationId = record.conversationId || record.id
    let turns = aiComposeRecords
      .filter((item) => (item.conversationId || item.id) === conversationId)
      .sort((a, b) => (a.turnIndex || 1) - (b.turnIndex || 1))
    // 兼容旧记录：首次续聊前没有 conversationId 时仍可沿父链恢复历史。
    if (turns.length === 1 && record.parentRecordId) {
      const parents = []
      let parentId = record.parentRecordId
      while (parentId) {
        const parent = aiComposeRecords.find((item) => item.id === parentId)
        if (!parent) break
        parents.unshift(parent)
        parentId = parent.parentRecordId
      }
      turns = [...parents, record]
    }
    const history = turns.filter((item) => item.id !== record.id)
    return `${history.map((item, index) => `<section class="wb3-chat-turn history"><div class="wb3-chat-user"><span>我</span><p>${escapeHtml(item.prompt)}</p></div><div class="wb3-chat-ai"><span>${icons.sparkle}</span><div><b>第 ${index + 1} 轮 · AI 已完成组题</b><p>生成 ${item.questions.length} 道题目，本轮记录已保留。</p><details><summary>展开本轮 ${item.questions.length} 道题</summary><div class="wb3-ai-generated-toolbar"><span>展开后仍可逐题选用</span><button type="button" data-compose-record-all="${item.id}">${item.allAdded ? '已全部加入' : '全部加入组题画布'}</button></div><div class="wb3-import-question-list">${item.questions.map((question) => questionCardMarkup(question, addedMap)).join('')}</div></details></div></div></section>`).join('')}<section class="wb3-chat-turn current"><div class="wb3-chat-user"><span>我</span><p>${escapeHtml(record.prompt)}</p></div><div class="wb3-chat-ai"><span>${icons.sparkle}</span><div><b>第 ${history.length + 1} 轮 · ${record.status === 'completed' ? 'AI 已完成组题' : 'AI 正在组题'}</b><p>${record.status === 'completed' ? `已生成 ${record.questions.length} 道题，可在下方查看和选用。` : '正在理解要求并执行专业组题流程…'}</p></div></div></section>`
  }

  function appendAssistMarkup(record) {
    if (record.status !== 'completed') return `<section class="wb3-append-assist processing"><span>${icons.sparkle}</span><div><b>正在分析当前题单</b><p>我已看到画布中有 ${record.existingCount || 0} 道题，正在检查知识点、题型和难度缺口，并匹配不重复的补充题目…</p></div></section>`
    if (record.autoAdded) return `<section class="wb3-append-assist added"><span>${icons.check}</span><div><b>${record.questions.length} 道补充题已加入组题画布</b><p>已补充当前题单的知识点与难度梯度，你可以继续在右侧调整或删除题目。</p></div></section>`
    return `<section class="wb3-append-assist"><span>${icons.sparkle}</span><div><b>已为当前题单准备好 ${record.questions.length} 道补充题</b><p>这些题目补充了当前题单的知识点与难度梯度，并尽量避开已有题目。你可以全部加入，也可以在下方逐题选用。</p><div class="wb3-append-confirm"><strong>是否将这 ${record.questions.length} 道题直接加入当前题单？</strong><button type="button" data-compose-record-all="${record.id}">全部加入组题画布</button></div></div></section>`
  }

  function importWorkspaceMarkup() {
    const addedMap = getAddedMap()
    const activeRecord = aiImportRecords.find((record) => record.id === activeImportRecordId)
    const activeComposeRecord = aiComposeRecords.find((record) => record.id === activeAiComposeRecordId)
    const previewPaper = allKnowledgePapers().find((paper) => paper.id === previewKnowledgePaperId)
    let content = ''

    if (importWorkspaceView === 'ai-entry') {
      content = `<div class="wb3-ai-create-page"><div class="wb3-import-page-title"><div><h2>AI 组题</h2><p>描述需要的题量、知识点和难度，生成结果将进入组题画布。</p></div></div><div class="wb3-ai-create-prompts"><button type="button" data-ai-create-suggestion="生成 10 道基础练习题">10 道基础题</button><button type="button" data-ai-create-suggestion="生成一份难度递进的综合练习">难度递进</button><button type="button" data-ai-create-suggestion="补 3 道中等题，避免与现有题目重复">补充中等题</button></div><div class="wb3-ai-create-input"><textarea id="wb3AiCreateInput" rows="4" placeholder="例如：生成一份五年级小数乘法练习，共 10 题，基础为主"></textarea><button type="button" data-ai-create-send>${icons.sparkle}开始组题</button></div></div>`
    } else if (importWorkspaceView === 'add-more') {
      content = `<div class="wb3-add-more-page"><div class="wb3-import-page-title"><div><h2>更多题源</h2><p>通过 AI 录题、已保存题单或 AI 组题，继续向画布添加题目。</p></div></div><div class="wb3-add-source-list"><button type="button" data-open-source="upload"><span>${icons.upload}</span><div><b>上传文件</b><small>上传题目与答案文件，AI 智能识别并自动打标，一键生成专属个人题库，题目可直接选用</small></div><em>上传文件</em></button><button type="button" data-open-source="knowledge"><span>${icons.knowledge}</span><div><b>从我的知识库添加</b><small>打开我在组题画布中保存的题单，可整份添加，也可逐题选用</small></div><em>选择题单</em></button><button type="button" data-start-ai-entry><span>${icons.sparkle}</span><div><b>让 AI 帮我组题</b><small>告诉 AI 题量、知识点和难度要求，生成题目后添加到当前组题画布</small></div><em>开始组题</em></button></div></div>`
    } else if (importWorkspaceView === 'ai-upload') {
      content = `<div class="wb3-upload-page"><button type="button" class="wb3-ai-dropzone" data-start-upload>${icons.upload}<b>点击上传 / 拖动文件到此处</b><span>支持 PDF、DOCX、PNG、JPG，单文件 20M 内</span></button><section class="wb3-upload-history"><div class="wb3-import-page-title"><div><h2>AI解析进度</h2><p>上传任务会在后台解析，完成后可查看并选用题目。</p></div></div><div class="wb3-record-list">${aiImportRecords.map((record) => `<article class="wb3-record-row ${record.status}"><span class="wb3-record-file">${icons.blank}</span><div><span class="wb3-record-status">${record.status === 'completed' ? '解析完成' : record.status === 'failed' ? '解析失败' : '处理中'}</span><b>${escapeHtml(record.filename)}</b><small>提交于 ${escapeHtml(record.submittedAt)}${record.completedAt ? ` · 完成于 ${escapeHtml(record.completedAt)}` : ''}${record.questions?.length ? ` · ${record.questions.length} 题` : ''}</small><em>${escapeHtml(record.stage)}${record.eta ? ` · ${escapeHtml(record.eta)}` : ''}</em></div><button type="button" data-open-record="${record.id}">${record.status === 'completed' ? '查看题目' : '查看进度'}</button></article>`).join('')}</div></section></div>`
    } else if (importWorkspaceView === 'ai-history') {
      content = `<div class="wb3-record-page"><div class="wb3-import-page-title"><div><h2>AI录题记录</h2><p>处理中任务可以离开页面，已完成结果可随时重新选题。</p></div></div>
        <div class="wb3-record-list">${aiImportRecords.map((record) => `<article class="wb3-record-row ${record.status}">
          <span class="wb3-record-file">${icons.blank}</span><div><span class="wb3-record-status">${record.status === 'completed' ? '解析完成' : record.status === 'failed' ? '解析失败' : '处理中'}</span><b>${escapeHtml(record.filename)}</b><small>提交于 ${escapeHtml(record.submittedAt)}${record.completedAt ? ` · 完成于 ${escapeHtml(record.completedAt)}` : ''}${record.questions?.length ? ` · ${record.questions.length} 题` : ''}</small><em>${escapeHtml(record.stage)}${record.eta ? ` · ${escapeHtml(record.eta)}` : ''}</em></div>
          <button type="button" data-open-record="${record.id}">${record.status === 'completed' ? '查看题目' : '查看进度'}</button>
        </article>`).join('')}</div></div>`
    } else if (importWorkspaceView === 'ai-record' && activeRecord) {
      content = `<div class="wb3-record-detail"><div class="wb3-import-page-title"><div><h2>${escapeHtml(activeRecord.filename)}</h2><p>${activeRecord.status === 'completed' ? `${activeRecord.questions.length} 道题 · 已自动关联到我的题库` : `${escapeHtml(activeRecord.stage)} · ${escapeHtml(activeRecord.eta || '')}`}</p></div>${activeRecord.status === 'completed' ? `<button type="button" class="primary" data-import-record-all="${activeRecord.id}">全部选用</button>` : ''}</div>
        ${activeRecord.status === 'completed' ? `<div class="wb3-library-sync-note compact">${icons.check}<span><b>这些题目已自动进入“我的题库”</b><small>下方卡片与普通题库一致，可逐题显示答案、AI改编或选用。</small></span></div><div class="wb3-import-question-list">${activeRecord.questions.map((question) => questionCardMarkup(question, addedMap)).join('')}</div>` : `<div class="wb3-processing-card"><i></i><b>${escapeHtml(activeRecord.stage)}</b><p>${escapeHtml(activeRecord.eta || '预计需要 4–10 分钟')}。可以返回题库继续组题。</p><span>上传完成　→　识别题目　→　提取答案　→　自动打标　→　关联我的题库</span></div>`}
      </div>`
    } else if (importWorkspaceView === 'ai-compose-record' && activeComposeRecord) {
      const isAdaptRecord = activeComposeRecord.mode === 'adapt'
      const isAppendRecord = activeComposeRecord.mode === 'append' && activeComposeRecord.needsCanvasConfirmation
      content = `<div class="wb3-record-detail"><div class="wb3-import-page-title"><div><h2>${escapeHtml(activeComposeRecord.title)}</h2><p>${activeComposeRecord.status === 'completed' ? `${activeComposeRecord.questions.length} 道候选题 · ${escapeHtml(activeComposeRecord.prompt)}` : 'AI 正在根据要求生成题目'}</p></div></div>
        ${composeConversationHistoryMarkup(activeComposeRecord, addedMap)}
        ${isAppendRecord ? appendAssistMarkup(activeComposeRecord) : composePlanMarkup(activeComposeRecord)}
        ${aiOutputMarkup(activeComposeRecord)}
        ${activeComposeRecord.status === 'completed' ? `${isAdaptRecord && activeComposeRecord.original ? `<div class="wb3-adapt-original"><b>原题</b><p>${escapeHtml(activeComposeRecord.original.text)}</p></div><div class="wb3-import-question-list">${activeComposeRecord.questions.map((question) => `${questionCardMarkup(question, addedMap)}<div class="wb3-adapt-result-actions"><button type="button" data-adapt-result-replace="${question.id}" data-compose-id="${activeComposeRecord.id}">替换原题</button><button type="button" class="primary" data-quick-add="${question.id}">另加为新题</button></div>`).join('')}</div>` : isAppendRecord ? (activeComposeRecord.autoAdded ? '' : `<div class="wb3-import-question-list">${activeComposeRecord.questions.map((question) => questionCardMarkup(question, addedMap)).join('')}</div>`) : aiGeneratedQuestionsMarkup(activeComposeRecord, addedMap)}` : isAppendRecord ? '' : `<div class="wb3-processing-card"><i></i><b>${isAdaptRecord ? '正在生成改编方案' : '正在生成新题单'}</b><p>AI 正在分析题量、题型、难度和知识点，生成后可整份或逐题加入右侧。</p></div>`}
        ${activeComposeRecord.status === 'completed' && !isAdaptRecord ? `<div class="wb3-ai-continue"><div><b>${icons.sparkle}继续调整这份题单</b><span><button type="button" data-ai-followup-suggestion="再补 3 道中等题">补 3 道中等题</button><button type="button" data-ai-followup-suggestion="增加应用题，避免重复">增加应用题</button></span></div><div><textarea id="wb3AiFollowupInput" rows="1" placeholder="继续描述补题或调整要求"></textarea><button type="button" data-ai-followup-send aria-label="发送" title="发送">${icons.up}</button></div></div>` : ''}
      </div>`
    } else if (importWorkspaceView === 'ai-compose') {
      content = `<div class="wb3-record-page"><div class="wb3-import-page-title"><div><h2>AI组题记录</h2><p>保留每次 AI 协作生成的题单，可再次整份或逐题选用。</p></div></div>
        <div class="wb3-record-list">${aiComposeRecords.map((record) => `<article class="wb3-record-row ${record.status}"><span class="wb3-record-file">${icons.sparkle}</span><div><span class="wb3-record-status">${record.status === 'completed' ? '生成完成' : '生成中'}</span><b>${escapeHtml(record.title)}</b><small>${record.mode === 'append' ? '补充题目' : record.mode === 'adapt' ? '改编单题' : '生成新题单'} · ${escapeHtml(record.createdAt)} · ${record.questions.length} 题</small><em>${escapeHtml(record.prompt)}</em></div><button type="button" data-open-compose-record="${record.id}">${record.status === 'completed' ? '查看题目' : '查看进度'}</button></article>`).join('')}</div></div>`
    } else if (importWorkspaceView === 'knowledge' && previewPaper) {
      content = `<div class="wb3-record-detail"><div class="wb3-import-page-title"><div><h2>${escapeHtml(previewPaper.title)}</h2><p>${escapeHtml(previewPaper.meta)} · ${previewPaper.questions.length} 题 · 可逐题选用</p></div><button type="button" class="primary" data-import-knowledge-all="${previewPaper.id}">全部选用</button></div><div class="wb3-import-question-list">${previewPaper.questions.map((question) => questionCardMarkup(question, addedMap)).join('')}</div></div>`
    } else {
      content = `<div class="wb3-knowledge-page"><div class="wb3-import-page-title"><div><h2>我的知识库</h2><p>先查看整套题目，再像官方题库一样逐题选用。</p></div></div><div class="wb3-knowledge-grid">${allKnowledgePapers().map((paper) => `<article><span>${icons.blank}</span><div><b>${escapeHtml(paper.title)}</b><small>${escapeHtml(paper.type)} · ${escapeHtml(paper.meta)}</small></div><div><button type="button" data-preview-knowledge="${paper.id}">查看</button></div></article>`).join('')}</div></div>`
    }

    return `<section class="wb3-library wb3-import-workspace">${workspaceTabsMarkup()}<div class="wb3-import-center-body">${content}</div></section>`
  }

  function leftPanelMarkup() {
    if (importWorkspaceView !== 'library') return importWorkspaceMarkup()
    const addedMap = getAddedMap()
    const curriculum = currentCurriculum()
    const questions = filterBankQuestions()
    const treeGroups = visibleTreeGroups()
    const parentNames = Object.keys(curriculum.parents)
    const difficultyOptions = [...new Set(currentBankQuestions().map((question) => question.difficulty))]
    const resultsBody = questions.length
      ? questions.map((question) => questionCardMarkup(question, addedMap)).join('')
      : `<div class="wb3-empty-results">没有符合当前筛选或搜索条件的题目</div>`
    return `<section class="wb3-library">
      ${workspaceTabsMarkup()}
      <div class="wb3-library-body">
        <aside class="wb3-tree">
          <label class="wb3-tree-subject"><select class="wb3-subject-switch" aria-label="当前学段和学科">${Object.keys(curriculumCatalog).map((key) => `<option ${curriculumKey === key ? 'selected' : ''}>${key}</option>`).join('')}</select></label>
          <div class="wb3-source-tabs" role="tablist" aria-label="题目来源">
            <button type="button" role="tab" data-question-source="official" aria-selected="${questionSource === 'official'}" class="${questionSource === 'official' ? 'active' : ''}">官方题库</button>
            <button type="button" role="tab" data-question-source="personal" aria-selected="${questionSource === 'personal'}" class="${questionSource === 'personal' ? 'active' : ''}">我的题库</button>
          </div>
          <div class="wb3-tree-list">${treeGroups.length ? treeGroups.map(([name]) => `<button type="button" class="${activeKnowledge === name ? 'active' : ''} ${parentNames.includes(name) ? 'group' : ''}" data-knowledge="${name}" data-tree-name="${escapeHtml(name.toLowerCase())}"><span>${parentNames.includes(name) ? '⌄ ' : ''}${name}</span><em>${knowledgeCount(name)}</em></button>`).join('') : '<p class="wb3-tree-empty">没有匹配的知识点</p>'}</div>
        </aside>
        <div class="wb3-results">
          <header class="wb3-results-head">
            <div class="wb3-results-filters"><label><select id="wb3FilterType" aria-label="题型"><option value="全部题型" ${filterType === '全部题型' ? 'selected' : ''}>全部题型</option><option ${filterType === '选择题' ? 'selected' : ''}>选择题</option><option ${filterType === '填空题' ? 'selected' : ''}>填空题</option><option ${filterType === '解答题' ? 'selected' : ''}>解答题</option></select></label><label><select id="wb3FilterDifficulty" aria-label="难度"><option value="全部难度" ${filterDifficulty === '全部难度' ? 'selected' : ''}>全部难度</option>${difficultyOptions.map((name) => `<option ${filterDifficulty === name ? 'selected' : ''}>${escapeHtml(name)}</option>`).join('')}</select></label><label class="wb3-filter-search"><span class="wb3-main-search">${icons.search}<input id="wb3TreeSearch" type="search" value="${escapeHtml(treeSearchQuery)}" placeholder="搜索知识点或题干关键词"></span></label></div>
          </header>
          ${uploadParsing ? `<div class="wb3-upload-status"><i></i>正在解析上传文件，识别结果将出现在右侧待确认区…</div>` : ''}
          <div class="wb3-result-scroll">${resultsBody}</div>
        </div>
      </div>
    </section>`
  }

  function sheetQuestionMarkup(question, index) {
    if (question.status === 'adapt') {
      return `<article class="wb3-adapt-card" data-sheet-id="${question.id}">
        <b>第 ${index + 1} 题 · AI 改编待确认</b>
        <div class="wb3-adapt-before">原题：${escapeHtml(question.originalText || '')}</div>
        <div class="wb3-adapt-after">变式：${escapeHtml(question.text || '')}</div>
        <div class="wb3-adapt-actions">
          <button type="button" class="primary" data-adapt-accept="${question.id}">替换原题</button>
          <button type="button" data-adapt-as-new="${question.id}">另加为新题</button>
          <button type="button" data-adapt-reject="${question.id}">不要</button>
        </div>
      </article>`
    }
    if (question.status === 'draft') {
      const sourceNote = question.sourceLabel ? ` · ${escapeHtml(question.sourceLabel)}` : question.source === 'ai' ? ' · AI 生成' : ''
      return `<article class="wb3-sheet-q draft" data-sheet-id="${question.id}">
        <span class="wb3-sheet-q-num">${index + 1}</span>
        <div class="wb3-sheet-q-main">
          <span class="wb3-draft-label">${icons.sparkle} 待确认${sourceNote}</span>
          <div class="wb3-sheet-q-tags"><span>${escapeHtml(question.type)}</span><span>${escapeHtml(question.knowledge)}</span><span>${escapeHtml(question.difficulty)}</span></div>
          <div class="wb3-sheet-q-text">${escapeHtml(question.text)}</div>
          ${question.options?.length ? `<small class="wb3-sheet-q-options">${escapeHtml(question.options.join('　'))}</small>` : ''}
          <div class="wb3-draft-actions">
            <button type="button" class="primary" data-draft-accept="${question.id}">采纳</button>
            <button type="button" data-draft-regen="${question.id}">换一版</button>
            <button type="button" data-draft-reject="${question.id}">不要</button>
          </div>
        </div>
      </article>`
    }
    const answerShown = revealedAnswerIds.has(question.id)
    const answerLines = Number(question.answerLines || 0)
    const answerStyle = question.answerStyle === 'lined' ? 'lined' : 'blank'
    const answerEditorOpen = answerEditorQuestionId === question.id
    const answerControl = `<span class="wb3-answer-control-wrap">
      <button type="button" class="wb3-answer-trigger ${answerLines ? 'has-area' : ''}" data-answer-editor="${question.id}" title="设置作答区" aria-label="设置作答区"><span>▤</span>${answerLines ? `<em>${answerLines}行</em>` : ''}</button>
      ${answerEditorOpen ? `<div class="wb3-answer-editor-popover">
        <header><b>作答区</b>${answerLines ? `<button type="button" data-answer-space-clear="${question.id}">清除</button>` : '<span>选择一种样式</span>'}</header>
        <div class="wb3-answer-style-options">
          <button type="button" class="${answerLines && answerStyle === 'blank' ? 'active' : ''}" data-answer-style-set="blank" data-question="${question.id}"><i class="blank"></i><span><b>空白区</b><small>适合计算、画图</small></span></button>
          <button type="button" class="${answerLines && answerStyle === 'lined' ? 'active' : ''}" data-answer-style-set="lined" data-question="${question.id}"><i class="lined"></i><span><b>横线区</b><small>适合文字作答</small></span></button>
        </div>
        <footer><span>高度</span><button type="button" data-answer-line-remove="${question.id}" ${answerLines < 1 ? 'disabled' : ''}>−</button><em>${answerLines || 2} 行</em><button type="button" data-answer-line-add="${question.id}">＋</button></footer>
      </div>` : ''}
    </span>`
    return `<article class="wb3-sheet-q ${selectedQuestionId === question.id ? 'selected' : ''} ${answerShown ? 'answer-open' : ''} ${answerEditorOpen ? 'answer-editor-open' : ''}" data-sheet-id="${question.id}" data-question-id="${question.id}">
      <span class="wb3-sheet-q-num">${index + 1}</span>
      <div class="wb3-sheet-q-main">
        <div class="wb3-sheet-q-tags"><span>${escapeHtml(question.type)}</span><span>${escapeHtml(question.knowledge)}</span><span>${escapeHtml(question.difficulty)}</span><span>${Number(question.score || 0)} 分</span></div>
        <div class="wb3-sheet-q-text" contenteditable="true">${escapeHtml(question.text)}</div>
        ${question.options?.length ? `<small class="wb3-sheet-q-options">${escapeHtml(question.options.join('　'))}</small>` : ''}
        ${answerLines > 0 ? `<div class="wb3-answer-space ${answerStyle}" style="--wb3-answer-lines:${answerLines}" aria-label="${answerLines} 行${answerStyle === 'lined' ? '横线' : '空白'}作答区"></div>` : ''}
        ${answerShown ? `<div class="wb3-sheet-q-answer"><p><b>答案</b>${escapeHtml(questionAnswerText(question))}</p><p><b>解析</b>${escapeHtml(questionAnalysisText(question))}</p></div>` : ''}
        <div class="wb3-sheet-q-tools">
          ${answerControl}
          <button type="button" data-sheet-answer="${question.id}" title="${answerShown ? '收起答案' : '显示答案'}" aria-label="${answerShown ? '收起答案' : '显示答案'}">答</button>
          <button type="button" class="danger" data-delete-question="${question.id}" title="删除题目" aria-label="删除题目">${icons.trash}</button>
        </div>
      </div>
    </article>`
  }

  function rightPanelMarkup() {
    const meta = draftMeta()
    const questions = activeDraft?.questions || []
    const confirmed = questions.filter((q) => q.status === 'confirmed')
    const savedTime = autoSavedAt ? new Date(autoSavedAt).toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) : ''
    const selectedIndex = questions.findIndex((q) => q.id === selectedQuestionId && q.status === 'confirmed')

    const pendingBanner = meta.pendingCount
      ? `<div class="wb3-draft-banner"><span>${meta.pendingCount} 道待确认${meta.pendingScore ? ` · 预计 +${meta.pendingScore} 分` : ''}</span><div><button type="button" class="primary" data-draft-accept-all>全部采纳</button><button type="button" data-draft-reject-all>全部不要</button></div></div>`
      : ''

    const sheetBody = confirmed.length || questions.some((q) => q.status !== 'confirmed')
      ? questions.map(sheetQuestionMarkup).join('')
      : `<div class="wb3-empty-sheet">
          <span class="wb3-empty-icon">${icons.blank}</span>
          <b>空白题单</b>
          <p>从左侧题库逐题选用，或通过“更多题源”上传文件、打开个人题单和历史 AI 组题。</p>
          <div class="wb3-empty-actions">
            <button type="button" data-empty-import="library">${icons.knowledge}去题库选题</button>
            <button type="button" data-empty-import="add-more">${icons.plus}更多题源</button>
          </div>
        </div>`

    return `<aside class="wb3-sheet">
      <header class="wb3-sheet-head">
        <div class="wb3-sheet-head-top">
          <div><b>组题画布</b><span id="wb3AutoSaveStatus">${savedTime ? `已自动保存 ${savedTime}` : '草稿将自动保存'}</span></div>
          <div class="wb3-sheet-head-right"><div class="wb3-sheet-stats">
              <strong>${meta.count} 题 · ${meta.score || 0} 分</strong>
              ${meta.pendingCount ? `<em>${meta.pendingCount} 道待确认</em>` : ''}
            </div><button type="button" class="wb3-new-draft" data-new-draft aria-label="新建组题" title="新建组题">${icons.plus}</button><button type="button" class="wb3-new-draft" data-action="download" aria-label="下载题单" title="下载题单">${icons.download}</button>
          </div>
        </div>
      </header>
      ${paperToolbarMarkup()}
      ${pendingBanner}
      <div class="wb3-sheet-scroll">
        <div class="wb3-paper" style="--wb3-paper-font-size:${paperFormat().fontSize}px;--wb3-paper-line-height:${paperFormat().lineHeight};--wb3-answer-height:${paperFormat().answerHeight}px;--wb3-question-gap:${paperFormat().questionGap}px">
          <div class="wb3-paper-meta">学校：____________________　班级：________　姓名：________</div>
          <input class="wb3-paper-title" id="wb3PaperTitle" value="${escapeHtml(activeDraft?.title || '未命名题单')}">
          <div class="wb3-paper-sub"><span>${escapeHtml(activeDraft?.subject || '四年级 · 数学')}</span><span>共 ${meta.count} 题</span><span>${meta.score || '--'} 分</span></div>
          ${sheetBody}
        </div>
      </div>
    </aside>`
  }

  function render() {
    if (!root || !activeDraft) return
    root.innerHTML = `<div class="wb3-shell">${leftPanelMarkup()}${rightPanelMarkup()}</div>
    ${knowledgeModalMarkup()}
    <input id="wb3FileInput" type="file" accept=".doc,.docx,.pdf,.png,.jpg,.jpeg" hidden>
    <div class="wb3-toast" id="wb3Toast" role="status"></div>`
  }

  function toggleQuestionFromBank(id) {
    const existing = activeDraft.questions.findIndex((q) => q.sourceId === id && q.status === 'confirmed')
    if (existing >= 0) {
      if (selectedQuestionId === activeDraft.questions[existing].id) selectedQuestionId = ''
      activeDraft.questions.splice(existing, 1)
      persistDraft()
      showToast('已从题单移除')
      render()
      return
    }
    const source = findQuestionById(id)
    if (!source) return
    activeDraft.questions.push(cloneQuestion(source))
    persistDraft()
    showToast('已加入题单')
    highlightAdded(id)
    render()
  }

  function addConfirmedQuestionsFromSources(list, message) {
    const addedMap = getAddedMap()
    const newItems = list.filter((question) => !addedMap.has(question.id))
    newItems.forEach((question) => activeDraft.questions.push(cloneQuestion(question)))
    if (!newItems.length) { showToast('这些题目已经在当前题单中'); return }
    persistDraft()
    render()
    showToast(message || `已加入 ${newItems.length} 道题`)
    highlightLastAdded()
  }

  function downloadPaperBundle() {
    const includeAnswers = window.confirm('下载的试卷是否需要包含答案解析？\n\n确定：下载试卷＋答案解析\n取消：仅下载试卷')
    showToast(includeAnswers ? '正在下载试卷与答案解析' : '正在下载试卷')
  }

  function highlightAdded(sourceId) {
    window.requestAnimationFrame(() => {
      const target = $(`[data-question-id="${activeDraft.questions.find((q) => q.sourceId === sourceId)?.id}"]`, root)
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      target?.classList.add('wb3-question-just-added')
      window.setTimeout(() => target?.classList.remove('wb3-question-just-added'), 1200)
    })
  }

  function highlightLastAdded() {
    window.requestAnimationFrame(() => {
      const confirmed = activeDraft.questions.filter((q) => q.status === 'confirmed')
      const target = confirmed.length ? $(`[data-sheet-id="${confirmed[confirmed.length - 1].id}"]`, root) : null
      target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      target?.classList.add('wb3-question-just-added')
      window.setTimeout(() => target?.classList.remove('wb3-question-just-added'), 1200)
    })
  }

  function addPendingQuestions(list, sourceLabel, source = 'import') {
    list.forEach((item) => {
      activeDraft.questions.push({
        ...item,
        id: makeId('draft'),
        status: 'draft',
        source,
        sourceLabel,
      })
    })
    persistDraft()
    render()
    window.requestAnimationFrame(() => {
      $('.wb3-draft-banner', root)?.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    })
  }

  function handleUpload(file) {
    if (!file) return
    importMenuOpen = false
    const recordId = makeId('record')
    aiImportRecords.unshift({ id: recordId, filename: file.name, status: 'processing', stage: '正在识别题目', submittedAt: '刚刚', eta: '预计还需 4–10 分钟', questions: [] })
    if (!openWorkspaceTabs.includes('upload')) openWorkspaceTabs.push('upload')
    activeImportRecordId = ''
    importWorkspaceView = 'ai-upload'
    render()
    showToast('文件已上传，正在 AI解析')
    window.setTimeout(() => {
      const record = aiImportRecords.find((item) => item.id === recordId)
      if (!record) return
      record.questions = bankQuestions.slice(0, 5).map((question, index) => ({ ...question, id: `${recordId}-q${index + 1}`, originId: question.id, source: 'ai-record' }))
      record.status = 'completed'
      record.stage = '解析完成'
      record.completedAt = '刚刚'
      delete record.eta
      record.questions.forEach((question) => {
        if (!personalQuestions.some((item) => item.id === question.id)) personalQuestions.unshift(question)
      })
      if (root && !root.hidden) render()
      showToast('AI录题完成，题目已自动关联到“我的题库”')
    }, 6500)
  }

  function importKnowledgePaper(paperId) {
    const paper = allKnowledgePapers().find((p) => p.id === paperId)
    if (!paper) return
    knowledgeModalOpen = false
    const confirmed = activeDraft.questions.filter((q) => q.status === 'confirmed')
    if (confirmed.length && !window.confirm(`题单已有 ${confirmed.length} 题。导入「${paper.title}」将追加 ${paper.questions.length} 道待确认题，是否继续？`)) return
    addPendingQuestions(paper.questions.map((q) => ({ ...q })), paper.title, 'knowledge')
    showToast(`已从知识库导入 ${paper.questions.length} 道待确认题`)
  }

  function aiModeFromPrompt() {
    if (adaptRequest) return 'adapt'
    return activeDraft.questions.some((q) => q.status === 'confirmed') ? 'append' : 'generate'
  }

  function generateAiDrafts(prompt, mode = 'append') {
    if (aiGenerating) return
    aiGenerating = true
    const selected = activeDraft.questions.find((q) => q.id === selectedQuestionId && q.status === 'confirmed')
    if (mode === 'adapt' && !selected) { aiGenerating = false; showToast('请先选择要改编的题目'); return }
    const requestedCount = Number(/(\d+)\s*道/.exec(prompt)?.[1] || (mode === 'adapt' ? 2 : 5))
    const activeConversationRecord = importWorkspaceView === 'ai-compose-record' ? aiComposeRecords.find((record) => record.id === activeAiComposeRecordId) : null
    const previousComposeRecord = activeConversationRecord || aiComposeRecords.find((record) => record.autoAdded)
    const reusedTabId = mode === 'append' && activeConversationRecord ? `compose:${activeConversationRecord.id}` : ''
    const composeId = makeId('compose')
    const conversationId = activeConversationRecord?.conversationId || activeConversationRecord?.id || composeId
    const conversationTurns = aiComposeRecords.filter((item) => (item.conversationId || item.id) === conversationId)
    const composeRecord = {
      id: composeId,
      conversationId,
      turnIndex: conversationTurns.length + 1,
      title: mode === 'adapt' ? `改编：${selected.text.slice(0, 16)}…` : prompt.length > 22 ? `${prompt.slice(0, 22)}…` : prompt,
      prompt,
      mode,
      status: 'processing',
      createdAt: '刚刚',
      questions: [],
      original: selected ? { ...selected } : null,
      originalQuestionId: activeDraft.questions.some((item) => item.id === selected?.id) ? selected.id : '',
      needsCanvasConfirmation: activeDraft.questions.some((item) => item.status === 'confirmed'),
      existingCount: activeDraft.questions.filter((item) => item.status === 'confirmed').length,
      parentRecordId: reusedTabId ? previousComposeRecord.id : '',
      plan: {
        count: mode === 'adapt' ? 2 : Math.min(requestedCount, 10),
        types: mode === 'adapt' ? selected.type : '选择、填空、解答',
        difficulty: mode === 'adapt' ? `${selected.difficulty}，按要求调整` : mode === 'append' ? '结合当前题单补足梯度' : '基础为主，难度递进',
        knowledge: mode === 'adapt' ? selected.knowledge : activeKnowledge === '全部知识点' ? '覆盖当前学科核心知识点' : activeKnowledge,
        minutes: mode === 'adapt' ? Number(selected.score || 1) : Math.max(10, Math.min(requestedCount, 10) * 3),
      },
    }
    aiComposeRecords.unshift(composeRecord)
    const composeTabId = `compose:${composeRecord.id}`
    if (reusedTabId && openWorkspaceTabs.includes(reusedTabId)) openWorkspaceTabs = openWorkspaceTabs.map((id) => id === reusedTabId ? composeTabId : id)
    else if (!openWorkspaceTabs.includes(composeTabId)) openWorkspaceTabs.push(composeTabId)
    activeAiComposeRecordId = composeRecord.id
    importWorkspaceView = 'ai-compose-record'
    render()

    window.setTimeout(() => {
      aiGenerating = false
      const confirmed = activeDraft.questions.filter((q) => q.status === 'confirmed')
      if (mode === 'adapt' && selected) {
        composeRecord.questions = [
          { ...selected, id: `${composeRecord.id}-q1`, source: 'ai-compose', text: `${selected.text.replace(/。?$/, '')}（变式一：结合校园生活情境重新表述。）` },
          { ...selected, id: `${composeRecord.id}-q2`, source: 'ai-compose', text: `${selected.text.replace(/。?$/, '')}（变式二：保持知识点不变，调整数据与设问。）` },
        ]
        composeRecord.status = 'completed'
        render()
        showToast('AI 已生成 2 个改编方案，可替换原题或另加新题')
        return
      }

      const templates = bankQuestions.filter((question) => (question.curriculum || '小学数学') === curriculumKey)
      const list = templates.slice(0, Math.min(requestedCount, templates.length))
      composeRecord.questions = list.map((question, index) => ({ ...question, id: `${composeRecord.id}-q${index + 1}`, source: 'ai-compose' }))
      composeRecord.status = 'completed'
      render()
      showToast(`AI 已生成 ${list.length} 道题，可逐题选用或全部加入组题画布`)
    }, 1200)
  }

  function acceptDraft(id) {
    const q = activeDraft.questions.find((item) => item.id === id)
    if (!q) return
    q.status = 'confirmed'
    q.id = makeId('sheet')
    delete q.sourceLabel
    persistDraft()
    showToast('已采纳')
    render()
  }

  function rejectDraft(id) {
    activeDraft.questions = activeDraft.questions.filter((item) => item.id !== id)
    persistDraft()
    showToast('已丢弃')
    render()
  }

  function acceptAllDrafts() {
    activeDraft.questions.forEach((q) => {
      if (q.status === 'draft') {
        q.status = 'confirmed'
        q.id = makeId('sheet')
        delete q.sourceLabel
      }
    })
    persistDraft()
    showToast('已全部采纳')
    render()
  }

  function rejectAllDrafts() {
    activeDraft.questions = activeDraft.questions.filter((q) => q.status !== 'draft')
    persistDraft()
    showToast('已丢弃全部待确认题')
    render()
  }

  function acceptAdapt(id) {
    const adapt = activeDraft.questions.find((item) => item.id === id)
    if (!adapt) return
    const original = activeDraft.questions.find((q) => q.id === adapt.adaptTargetId)
    if (original) {
      original.text = adapt.text
      original.options = adapt.options
    }
    activeDraft.questions = activeDraft.questions.filter((item) => item.id !== id)
    persistDraft()
    showToast('已替换原题')
    render()
  }

  function acceptAdaptAsNew(id) {
    const q = activeDraft.questions.find((item) => item.id === id)
    if (!q) return
    q.status = 'confirmed'
    q.id = makeId('sheet')
    delete q.originalText
    persistDraft()
    showToast('已另加为新题')
    render()
  }

  function rejectAdapt(id) {
    activeDraft.questions = activeDraft.questions.filter((item) => item.id !== id)
    persistDraft()
    showToast('已放弃本次改编')
    render()
  }

  function ensureRoot() {
    if (root) return
    root = document.createElement('section')
    root.className = 'fx-question-workbench-v3'
    root.hidden = true
    root.setAttribute('role', 'dialog')
    root.setAttribute('aria-modal', 'true')
    root.setAttribute('aria-label', '组题工作台')
    document.body.appendChild(root)

    root.addEventListener('click', (event) => {
      const closeWorkspaceTab = event.target.closest('[data-close-workspace-tab]')
      if (closeWorkspaceTab) {
        const id = closeWorkspaceTab.dataset.closeWorkspaceTab
        openWorkspaceTabs = openWorkspaceTabs.filter((item) => item !== id)
        if (activeWorkspaceTabId() === id) {
          if (id.startsWith('paper:')) importWorkspaceView = 'knowledge'
          else if (id.startsWith('record:')) importWorkspaceView = 'ai-upload'
          else if (id.startsWith('compose:')) importWorkspaceView = 'ai-compose'
          else importWorkspaceView = 'add-more'
          activeImportRecordId = ''
          previewKnowledgePaperId = ''
          activeAiComposeRecordId = ''
        }
        render()
        return
      }

      const workspaceTab = event.target.closest('[data-workspace-tab]')
      if (workspaceTab) {
        const id = workspaceTab.dataset.workspaceTab
        if (id === 'library') { importWorkspaceView = 'library'; render(); return }
        if (id === 'add-more') { importWorkspaceView = 'add-more'; render(); return }
        openWorkspaceTab(id)
        return
      }

      const openSource = event.target.closest('[data-open-source]')
      if (openSource) {
        openWorkspaceTab(openSource.dataset.openSource)
        return
      }

      if (event.target.closest('[data-start-ai-entry]')) {
        adaptRequest = null
        adaptPicker = null
        openWorkspaceTab('ai-create')
        window.requestAnimationFrame(() => $('#wb3AiCreateInput', root)?.focus())
        return
      }

      const inlineAdaptPrompt = event.target.closest('[data-inline-adapt-prompt]')
      if (inlineAdaptPrompt) {
        const input = $('#wb3InlineAdaptInput', root)
        if (input) { input.value = inlineAdaptPrompt.dataset.inlineAdaptPrompt; input.focus() }
        return
      }

      const aiCreateSuggestion = event.target.closest('[data-ai-create-suggestion]')
      if (aiCreateSuggestion) {
        const input = $('#wb3AiCreateInput', root)
        if (input) { input.value = aiCreateSuggestion.dataset.aiCreateSuggestion; input.focus() }
        return
      }

      if (event.target.closest('[data-ai-create-send]')) {
        const prompt = ($('#wb3AiCreateInput', root)?.value || '').trim()
        if (!prompt) { showToast('请输入组题要求'); return }
        generateAiDrafts(prompt, 'generate')
        return
      }

      const followupSuggestion = event.target.closest('[data-ai-followup-suggestion]')
      if (followupSuggestion) {
        const input = $('#wb3AiFollowupInput', root)
        if (input) { input.value = followupSuggestion.dataset.aiFollowupSuggestion; input.focus() }
        return
      }

      if (event.target.closest('[data-ai-followup-send]')) {
        const prompt = ($('#wb3AiFollowupInput', root)?.value || '').trim()
        if (!prompt) { showToast('请输入补题或调整要求'); return }
        generateAiDrafts(prompt, 'append')
        return
      }

      if (event.target.closest('[data-inline-adapt-submit]')) {
        const requirement = ($('#wb3InlineAdaptInput', root)?.value || '').trim()
        if (!requirement) { showToast('请输入改编要求'); return }
        if (adaptRequest?.inline) openAdaptPicker(adaptRequest.source, '', requirement)
        return
      }

      if (event.target.closest('[data-close-inline-adapt]')) {
        adaptRequest = null
        adaptPicker = null
        render()
        return
      }

      const useAdaptCandidate = event.target.closest('[data-use-adapt-candidate]')
      if (useAdaptCandidate && adaptPicker) {
        const candidate = adaptPicker.candidates.find((item) => item.id === useAdaptCandidate.dataset.useAdaptCandidate)
        if (!candidate) return
        let selectedSheetId = ''
        if (adaptPicker.targetId) {
          const target = activeDraft.questions.find((item) => item.id === adaptPicker.targetId)
          if (!target) { showToast('原题已不在题单中，请重新选择'); return }
          selectedSheetId = target.id
          Object.assign(target, { ...candidate, id: target.id, sourceId: candidate.id, status: 'confirmed' })
        } else {
          const newQuestion = cloneQuestion(candidate)
          selectedSheetId = newQuestion.id
          activeDraft.questions.push(newQuestion)
        }
        adaptPicker = null
        selectedQuestionId = ''
        persistDraft()
        render()
        window.requestAnimationFrame(() => {
          const target = $(`[data-sheet-id="${selectedSheetId}"]`, root)
          target?.scrollIntoView({ behavior: 'smooth', block: 'center' })
          target?.classList.add('wb3-question-just-added')
          window.setTimeout(() => target?.classList.remove('wb3-question-just-added'), 1200)
        })
        showToast('已选用改编题并加入右侧题单')
        return
      }

      if (event.target.matches('[data-close-adapt-picker]') || event.target.closest('button[data-close-adapt-picker]')) {
        adaptPicker = null
        render()
        return
      }

      if (event.target.closest('[data-new-draft]')) {
        startNewDraft()
        return
      }

      if (event.target.closest('[data-toggle-import]')) {
        importMenuOpen = !importMenuOpen
        render()
        return
      }

      const importAction = event.target.closest('[data-import]')
      if (importAction) {
        importMenuOpen = false
        if (importAction.dataset.import === 'upload') importWorkspaceView = 'ai-upload'
        if (importAction.dataset.import === 'history') importWorkspaceView = 'ai-history'
        if (importAction.dataset.import === 'knowledge') importWorkspaceView = 'knowledge'
        if (importAction.dataset.import === 'ai-compose') importWorkspaceView = 'ai-compose'
        render()
        return
      }

      if (event.target.closest('[data-return-library]')) {
        importWorkspaceView = 'library'
        activeImportRecordId = ''
        activeAiComposeRecordId = ''
        previewKnowledgePaperId = ''
        render()
        return
      }

      const importView = event.target.closest('[data-import-view]')
      if (importView) {
        importWorkspaceView = importView.dataset.importView
        if (importWorkspaceView !== 'ai-record') activeImportRecordId = ''
        if (importWorkspaceView !== 'ai-compose-record') activeAiComposeRecordId = ''
        if (importWorkspaceView !== 'knowledge') previewKnowledgePaperId = ''
        render()
        return
      }

      if (event.target.closest('[data-start-upload]')) { $('#wb3FileInput', root)?.click(); return }

      const openRecord = event.target.closest('[data-open-record]')
      if (openRecord) {
        openWorkspaceTab(`record:${openRecord.dataset.openRecord}`)
        return
      }

      const importRecordAll = event.target.closest('[data-import-record-all]')
      if (importRecordAll) {
        const record = aiImportRecords.find((item) => item.id === importRecordAll.dataset.importRecordAll)
        if (record?.status === 'completed') addConfirmedQuestionsFromSources(record.questions, `已从 AI录题记录加入 ${record.questions.length} 道题`)
        return
      }

      const importKnowledgeAll = event.target.closest('[data-import-knowledge-all]')
      if (importKnowledgeAll) {
        const paper = allKnowledgePapers().find((item) => item.id === importKnowledgeAll.dataset.importKnowledgeAll)
        if (paper) addConfirmedQuestionsFromSources(paper.questions, `已从「${paper.title}」选用 ${paper.questions.length} 道题`)
        return
      }

      const openComposeRecord = event.target.closest('[data-open-compose-record]')
      if (openComposeRecord) {
        openWorkspaceTab(`compose:${openComposeRecord.dataset.openComposeRecord}`)
        return
      }

      const composeRecordAll = event.target.closest('[data-compose-record-all]')
      if (composeRecordAll) {
        const record = aiComposeRecords.find((item) => item.id === composeRecordAll.dataset.composeRecordAll)
        if (record?.status === 'completed') {
          if (record.mode === 'append') record.autoAdded = true
          else record.allAdded = true
          addConfirmedQuestionsFromSources(record.questions, `已将 ${record.questions.length} 道题加入组题画布`)
        }
        return
      }

      if (event.target.closest('[data-download-paper-bundle]')) { downloadPaperBundle(); return }
      if (event.target.closest('[data-download-brief]')) { event.preventDefault(); showToast('正在下载命题说明书 PDF'); return }

      const previewKnowledge = event.target.closest('[data-preview-knowledge]')
      if (previewKnowledge) {
        openWorkspaceTab(`paper:${previewKnowledge.dataset.previewKnowledge}`)
        return
      }

      if (event.target.closest('[data-back-knowledge]')) {
        previewKnowledgePaperId = ''
        render()
        return
      }

      if (event.target.closest('[data-close-knowledge]') || (event.target.closest('[data-close-overlay]') && !event.target.closest('.wb3-modal'))) {
        knowledgeModalOpen = false
        render()
        return
      }

      const importPaper = event.target.closest('[data-import-paper]')
      if (importPaper) { importKnowledgePaper(importPaper.dataset.importPaper); return }

      const emptyImport = event.target.closest('[data-empty-import]')
      if (emptyImport) {
        if (emptyImport.dataset.emptyImport === 'library') { importWorkspaceView = 'library'; render() }
        if (emptyImport.dataset.emptyImport === 'add-more') { importWorkspaceView = 'add-more'; render() }
        return
      }

      const sourceTab = event.target.closest('[data-question-source]')
      if (sourceTab) {
        questionSource = sourceTab.dataset.questionSource
        activeKnowledge = '全部知识点'
        treeSearchQuery = ''
        filterType = '全部题型'
        filterDifficulty = '全部难度'
        render()
        return
      }

      const knowledge = event.target.closest('[data-knowledge]')
      if (knowledge) {
        activeKnowledge = knowledge.dataset.knowledge
        treeSearchQuery = ''
        render()
        return
      }

      const quickAdd = event.target.closest('[data-quick-add]')
      if (quickAdd) { toggleQuestionFromBank(quickAdd.dataset.quickAdd); return }

      const deletePersonal = event.target.closest('[data-delete-personal-question]')
      if (deletePersonal) {
        const id = deletePersonal.dataset.deletePersonalQuestion
        personalQuestions = personalQuestions.filter((question) => question.id !== id)
        revealedAnswerIds.delete(id)
        if (adaptRequest?.source?.id === id) adaptRequest = null
        if (adaptPicker?.source?.id === id) adaptPicker = null
        render()
        showToast('已从“我的题库”删除')
        return
      }

      const quickAnswer = event.target.closest('[data-quick-answer]')
      if (quickAnswer) {
        const id = quickAnswer.dataset.quickAnswer
        if (revealedAnswerIds.has(id)) revealedAnswerIds.delete(id)
        else revealedAnswerIds.add(id)
        render()
        return
      }

      const quickAdapt = event.target.closest('[data-quick-adapt]')
      if (quickAdapt) {
        const source = findQuestionById(quickAdapt.dataset.quickAdapt)
        if (source) {
          adaptPicker = null
          adaptRequest = { source: { ...source }, targetId: '', inline: true }
          render()
          window.requestAnimationFrame(() => $('#wb3InlineAdaptInput', root)?.focus())
        }
        return
      }

      const sheetAnswer = event.target.closest('[data-sheet-answer]')
      if (sheetAnswer) {
        const id = sheetAnswer.dataset.sheetAnswer
        if (revealedAnswerIds.has(id)) revealedAnswerIds.delete(id)
        else revealedAnswerIds.add(id)
        render()
        return
      }

      const answerLineAdd = event.target.closest('[data-answer-line-add]')
      if (answerLineAdd) {
        const question = activeDraft.questions.find((item) => item.id === answerLineAdd.dataset.answerLineAdd)
        if (question) {
          question.answerLines = Math.min(12, Number(question.answerLines || 0) + 1)
          question.answerStyle ||= 'blank'
          answerEditorQuestionId = question.id
        }
        persistDraft()
        render()
        return
      }

      const answerEditor = event.target.closest('[data-answer-editor]')
      if (answerEditor) {
        answerEditorQuestionId = answerEditorQuestionId === answerEditor.dataset.answerEditor ? '' : answerEditor.dataset.answerEditor
        render()
        return
      }

      const answerStyleSet = event.target.closest('[data-answer-style-set]')
      if (answerStyleSet) {
        const question = activeDraft.questions.find((item) => item.id === answerStyleSet.dataset.question)
        if (question) {
          question.answerLines = Number(question.answerLines || 0) || 2
          question.answerStyle = answerStyleSet.dataset.answerStyleSet === 'lined' ? 'lined' : 'blank'
          answerEditorQuestionId = question.id
        }
        persistDraft()
        render()
        return
      }

      const answerSpaceClear = event.target.closest('[data-answer-space-clear]')
      if (answerSpaceClear) {
        const question = activeDraft.questions.find((item) => item.id === answerSpaceClear.dataset.answerSpaceClear)
        if (question) question.answerLines = 0
        persistDraft()
        render()
        return
      }

      const answerLineRemove = event.target.closest('[data-answer-line-remove]')
      if (answerLineRemove) {
        const question = activeDraft.questions.find((item) => item.id === answerLineRemove.dataset.answerLineRemove)
        if (question) {
          question.answerLines = Math.max(0, Number(question.answerLines || 0) - 1)
          answerEditorQuestionId = question.id
        }
        persistDraft()
        render()
        return
      }

      const adaptResultReplace = event.target.closest('[data-adapt-result-replace]')
      if (adaptResultReplace) {
        const record = aiComposeRecords.find((item) => item.id === adaptResultReplace.dataset.composeId)
        const candidate = record?.questions.find((item) => item.id === adaptResultReplace.dataset.adaptResultReplace)
        const target = activeDraft.questions.find((item) => item.id === record?.originalQuestionId)
        if (candidate && target) {
          Object.assign(target, { ...candidate, id: target.id, sourceId: candidate.id, status: 'confirmed' })
          persistDraft()
          render()
          showToast('已用改编题替换原题')
        } else showToast('原题已不在当前题单，可选择另加为新题')
        return
      }

      const deleteQ = event.target.closest('[data-delete-question]')
      if (deleteQ) {
        activeDraft.questions = activeDraft.questions.filter((q) => q.id !== deleteQ.dataset.deleteQuestion)
        if (selectedQuestionId === deleteQ.dataset.deleteQuestion) selectedQuestionId = ''
        persistDraft()
        showToast('已删除题目')
        render()
        return
      }

      const draftAccept = event.target.closest('[data-draft-accept]')
      if (draftAccept) { acceptDraft(draftAccept.dataset.draftAccept); return }
      const draftReject = event.target.closest('[data-draft-reject]')
      if (draftReject) { rejectDraft(draftReject.dataset.draftReject); return }
      const draftRegen = event.target.closest('[data-draft-regen]')
      if (draftRegen) {
        rejectDraft(draftRegen.dataset.draftRegen)
        generateAiDrafts('换一版')
        return
      }
      if (event.target.closest('[data-draft-accept-all]')) { acceptAllDrafts(); return }
      if (event.target.closest('[data-draft-reject-all]')) { rejectAllDrafts(); return }

      const adaptAccept = event.target.closest('[data-adapt-accept]')
      if (adaptAccept) { acceptAdapt(adaptAccept.dataset.adaptAccept); return }
      const adaptAsNew = event.target.closest('[data-adapt-as-new]')
      if (adaptAsNew) { acceptAdaptAsNew(adaptAsNew.dataset.adaptAsNew); return }
      const adaptReject = event.target.closest('[data-adapt-reject]')
      if (adaptReject) { rejectAdapt(adaptReject.dataset.adaptReject); return }

      if (event.target.closest('[data-ai-send]')) {
        const prompt = ($('#wb3AiInput', root)?.value || '').trim()
        if (!prompt) { showToast('请输入 AI 要求'); return }
        if (adaptRequest) {
          openAdaptPicker(adaptRequest.source, adaptRequest.targetId, prompt)
          return
        }
        generateAiDrafts(prompt, aiModeFromPrompt(prompt))
        const input = $('#wb3AiInput', root)
        if (input) input.value = ''
        return
      }

      const aiSuggestion = event.target.closest('[data-ai-suggestion]')
      if (aiSuggestion) {
        const input = $('#wb3AiInput', root)
        if (input) { input.value = aiSuggestion.dataset.aiSuggestion; input.focus() }
        return
      }

      if (event.target.closest('[data-clear-context]')) { adaptRequest = null; render(); return }

      if (!event.target.closest('.wb3-import-wrap')) importMenuOpen = false

      const action = event.target.closest('[data-action]')?.dataset.action
      if (action === 'exit') {
        if (standalone) { window.location.href = './index.html'; return }
        api.close()
        window.dispatchEvent(new CustomEvent('fx-question-workbench-v3-exit'))
        return
      }
      if (action === 'download') {
        const pending = activeDraft.questions.some((q) => q.status === 'draft' || q.status === 'adapt')
        if (pending) showToast('还有待确认题，请先采纳或丢弃后再下载')
        else downloadPaperBundle()
        return
      }

      const richCommand = event.target.closest('[data-rich-command]')
      if (richCommand) {
        document.execCommand(richCommand.dataset.richCommand, false, richCommand.dataset.richValue || null)
        richCommand.classList.toggle('active', document.queryCommandState(richCommand.dataset.richCommand))
        persistDraft()
        return
      }
    })

    root.addEventListener('input', (event) => {
      if (event.target.id === 'wb3TreeSearch') {
        treeSearchQuery = event.target.value
        const caret = treeSearchQuery.length
        render()
        window.requestAnimationFrame(() => {
          const input = $('#wb3TreeSearch', root)
          input?.focus()
          input?.setSelectionRange(caret, caret)
        })
        return
      }
      if (event.target.id === 'wb3FilterType') { filterType = event.target.value; render(); return }
      if (event.target.id === 'wb3FilterDifficulty') { filterDifficulty = event.target.value; render(); return }
      if (event.target.id === 'wb3DraftTitle' || event.target.id === 'wb3PaperTitle') {
        activeDraft.title = event.target.value
        persistDraft()
      }
      if (event.target.matches('[data-paper-format]')) {
        const key = event.target.dataset.paperFormat
        const raw = event.target.value
        paperFormat()[key] = Number(raw)
        persistDraft()
        render()
      }
    })

    root.addEventListener('mousedown', (event) => {
      if (event.target.closest('.wb3-paper-toolbar button')) event.preventDefault()
    })

    root.addEventListener('pointerout', (event) => {
      const questionCard = event.target.closest('.wb3-sheet-q.answer-editor-open')
      if (!questionCard || questionCard.contains(event.relatedTarget)) return
      answerEditorQuestionId = ''
      render()
    })

    root.addEventListener('change', (event) => {
      if (event.target.classList.contains('wb3-subject-switch')) {
        curriculumKey = event.target.value
        questionSource = 'official'
        activeDraft.subject = currentCurriculum().subject
        activeKnowledge = '全部知识点'
        treeSearchQuery = ''
        filterType = '全部题型'
        filterDifficulty = '全部难度'
        persistDraft()
        render()
        showToast(`已切换到${event.target.value}`)
        return
      }
      if (event.target.id === 'wb3FileInput') handleUpload(event.target.files?.[0])
    })

    document.addEventListener('click', (event) => {
      if (!root || root.hidden || !importMenuOpen) return
      if (!event.target.closest('.wb3-import-wrap')) {
        importMenuOpen = false
        render()
      }
    })
  }

  let standalone = false

  function restoreAiConversationHandoff() {
    const params = new URLSearchParams(window.location.search)
    const draftId = params.get('draft') || ''
    if (params.get('source') !== 'ai-compose' || !draftId || activeDraft?.id !== draftId) return false
    let handoff = null
    try {
      handoff = JSON.parse(sessionStorage.getItem(`feixiang-question-workbench-v3-ai-handoff:${draftId}`) || 'null')
    } catch { handoff = null }
    const composeId = `compose-handoff-${draftId}`
    let record = aiComposeRecords.find((item) => item.id === composeId)
    if (!record) {
      record = {
        id: composeId,
        conversationId: composeId,
        turnIndex: 1,
        title: handoff?.title || activeDraft.title || 'AI组题',
        prompt: handoff?.prompt || `继续编辑「${activeDraft.title || '这份题单'}」`,
        mode: 'generate',
        status: 'completed',
        createdAt: handoff?.createdAt || '刚刚',
        plan: handoff?.plan || {
          count: activeDraft.questions.length,
          types: '选择、填空、解答',
          difficulty: '基础为主，难度递进',
          knowledge: '当前题单知识点',
          minutes: Math.max(5, Math.round(activeDraft.questions.length * 1.8)),
        },
        questions: activeDraft.questions.filter((item) => item.status === 'confirmed').map((question) => ({
          ...question,
          id: question.sourceId || `handoff-${question.id}`,
          originId: question.id,
          source: 'ai-compose',
        })),
      }
      aiComposeRecords.unshift(record)
    }
    const tabId = `compose:${composeId}`
    if (!openWorkspaceTabs.includes(tabId)) openWorkspaceTabs.push(tabId)
    activeAiComposeRecordId = composeId
    importWorkspaceView = 'ai-compose-record'
    return true
  }

  const api = {
    open(options = {}) {
      ensureRoot()
      standalone = Boolean(options.standalone)
      questionSource = 'official'
      curriculumKey = '小学数学'
      const restoredDraft = options.newDraft ? null : loadActiveDraft()
      if (restoredDraft?.curriculumKey && curriculumCatalog[restoredDraft.curriculumKey]) curriculumKey = restoredDraft.curriculumKey
      activeDraft = restoredDraft || createBlankDraft()
      autoSavedAt = activeDraft.updatedAt || 0
      treeSearchQuery = ''
      activeKnowledge = '全部知识点'
      filterType = '全部题型'
      filterDifficulty = '全部难度'
      selectedQuestionId = ''
      revealedAnswerIds = new Set()
      uploadParsing = false
      aiGenerating = false
      importMenuOpen = false
      knowledgeModalOpen = false
      importWorkspaceView = 'library'
      openWorkspaceTabs = []
      activeImportRecordId = ''
      activeAiComposeRecordId = ''
      previewKnowledgePaperId = ''
      adaptRequest = null
      adaptPicker = null
      restoreAiConversationHandoff()
      document.body.classList.add('fx-question-workbench-v3-open')
      root.hidden = false
      render()
    },
    close() {
      if (!root) return
      root.hidden = true
      importMenuOpen = false
      knowledgeModalOpen = false
      importWorkspaceView = 'library'
      openWorkspaceTabs = []
      activeAiComposeRecordId = ''
      adaptRequest = null
      adaptPicker = null
      document.body.classList.remove('fx-question-workbench-v3-open')
    },
    isOpen() {
      return Boolean(root && !root.hidden)
    },
  }

  window.FxQuestionWorkbenchV3 = api
})()

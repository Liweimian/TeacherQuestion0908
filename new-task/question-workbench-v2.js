(() => {
  const STORAGE_KEY = 'feixiang-question-workbench-v2-drafts'
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
    sparkle: svg('<path d="m12 3 1.3 4.2L17.5 8.5l-4.2 1.3L12 14l-1.3-4.2-4.2-1.3 4.2-1.3L12 3Z"/><path d="m18.5 14 .7 2.3 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.3Z"/>'),
    blank: svg('<path d="M6 3.5h9l3 3V20H6z"/><path d="M15 3.5V7h3M9 11h6M9 14h6M9 17h4"/>'),
    bank: svg('<path d="M4 5h7a3 3 0 0 1 3 3v12a3 3 0 0 0-3-3H4zM20 5h-3a3 3 0 0 0-3 3v12a3 3 0 0 1 3-3h3z"/><path d="M8 9h3M17 9h1"/>'),
    upload: svg('<path d="M5 4h14v16H5z"/><path d="m9 11 3-3 3 3M12 8v7M8 17h8"/>'),
    plus: svg('<path d="M12 5v14M5 12h14"/>'),
    search: svg('<circle cx="10.5" cy="10.5" r="6"/><path d="m15 15 4.5 4.5"/>'),
    clock: svg('<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/>'),
    dots: svg('<circle cx="5" cy="12" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/>'),
    edit: svg('<path d="M5 19h4l10-10-4-4L5 15z"/><path d="m13.5 6.5 4 4"/>'),
    knowledge: svg('<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 8h8M8 12h8M8 16h5"/>'),
    download: svg('<path d="M12 4v11m-4-4 4 4 4-4M5 19h14"/>'),
    save: svg('<path d="M5 4h12l2 2v14H5z"/><path d="M8 4v5h8V4M8 16h8"/>'),
    tune: svg('<path d="M4 7h10M18 7h2M4 17h2M10 17h10"/><circle cx="16" cy="7" r="2"/><circle cx="8" cy="17" r="2"/>'),
    list: svg('<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="5" cy="6" r="1"/><circle cx="5" cy="12" r="1"/><circle cx="5" cy="18" r="1"/>'),
    check: svg('<path d="m5 12 4 4L19 6"/>'),
    chevron: svg('<path d="m9 6 6 6-6 6"/>'),
    trash: svg('<path d="M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/>'),
    replace: svg('<path d="M4 7h11l-2.5-2.5M20 17H9l2.5 2.5"/><path d="M17 7a6 6 0 0 1 1 8M7 17a6 6 0 0 1-1-8"/>'),
    share: svg('<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/>'),
    up: svg('<path d="m7 14 5-5 5 5"/>'),
    down: svg('<path d="m7 10 5 5 5-5"/>'),
  }

  const bankQuestions = [
    { id: 'b1', type: '选择题', knowledge: '小数乘法', difficulty: '基础', score: 3, text: '下列算式中，积最大的是（　）。', options: ['A. 3.2×0.8', 'B. 3.2×1.2', 'C. 0.32×12', 'D. 32×0.12'] },
    { id: 'b2', type: '填空题', knowledge: '小数除法', difficulty: '基础', score: 3, text: '6.4÷0.8＝____，640÷80＝____。' },
    { id: 'b3', type: '解答题', knowledge: '多边形面积', difficulty: '中等', score: 6, text: '一块平行四边形草地的底是 18 米，高是 12 米。每平方米需要 0.6 千克草种，一共需要多少千克？' },
    { id: 'b4', type: '选择题', knowledge: '简易方程', difficulty: '易错', score: 3, text: '方程 2x＋6＝18 的解是（　）。', options: ['A. x＝4', 'B. x＝6', 'C. x＝8', 'D. x＝12'] },
    { id: 'b5', type: '填空题', knowledge: '可能性', difficulty: '基础', score: 2, text: '盒子里有 5 个红球和 1 个蓝球，任意摸一个，摸到____球的可能性更大。' },
    { id: 'b6', type: '解答题', knowledge: '分段计费', difficulty: '提高', score: 8, text: '某快递前 1 千克收费 12 元，超过部分每 0.5 千克收费 4 元。寄 2.8 千克物品需付多少元？' },
  ]

  const bankPapers = [
    { id: 'paper-1', title: '五年级上册小数乘除法单元检测', subject: '数学', grade: '五年级', paperType: '单元检测', meta: '人教版 · 6题 · 35分钟', questions: bankQuestions },
    { id: 'paper-2', title: '五年级数学期中基础练习', subject: '数学', grade: '五年级', paperType: '期中', meta: '校级题库 · 5题 · 30分钟', questions: bankQuestions.slice(0, 5) },
    { id: 'paper-3', title: '小数计算易错题专项卷', subject: '数学', grade: '五年级', paperType: '专项练习', meta: '精选题单 · 4题 · 20分钟', questions: [bankQuestions[0], bankQuestions[1], bankQuestions[3], bankQuestions[5]] },
    { id: 'paper-4', title: '五年级数学期末综合测试', subject: '数学', grade: '五年级', paperType: '期末', meta: '区级题库 · 6题 · 40分钟', questions: [...bankQuestions].reverse() },
  ]

  const demoProjects = [
    { id: 'demo-1', title: '有理数单元测试卷', subject: '七年级 · 数学', count: 12, status: '未完成', time: '今天 10:24', tone: 'mint' },
    { id: 'demo-2', title: '五年级上册期末练习', subject: '五年级 · 数学', count: 26, status: '已完成', time: '昨天 16:08', tone: 'blue' },
    { id: 'demo-3', title: '长方体配套练习', subject: '五年级 · 数学', count: 8, status: '未完成', time: '9月5日', tone: 'sand' },
  ]

  const sharedProjects = [
    { id: 'shared-1', title: '五年级小数乘除法单元卷', subject: '王老师共享 · 五年级数学', count: 18, status: '可编辑副本', time: '今天', tone: 'blue', shared: true },
    { id: 'shared-2', title: '期中复习易错题精选', subject: '数学教研组共享 · 七年级', count: 15, status: '可编辑副本', time: '昨天', tone: 'mint', shared: true },
    { id: 'shared-3', title: '长方体与正方体分层练习', subject: '李老师共享 · 五年级数学', count: 12, status: '可编辑副本', time: '9月4日', tone: 'sand', shared: true },
  ]

  let root
  let activeDraft
  let activeTool = 'add'
  let sourceView = 'overview'
  let aiProcess = null
  let activity = []
  let uploadedFile = ''
  let uploadSession = null
  let saveTimer
  let pickerTarget = { mode: 'append', afterId: '' }
  let bankBrowseMode = 'question'
  let bankSelectedIds = []
  let bankSelectedPaperId = ''
  let bankPaperDetailId = ''
  let bankSearchQuery = ''
  let draggedQuestionId = ''
  let selectedQuestionId = ''
  let homeProjectTab = 'mine'

  function readDrafts() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
      return Array.isArray(value) ? value : []
    } catch {
      return []
    }
  }

  function persistDraft(message) {
    if (!activeDraft) return
    activeDraft.updatedAt = Date.now()
    const drafts = readDrafts().filter((item) => item.id !== activeDraft.id)
    drafts.unshift(activeDraft)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(drafts.slice(0, 12)))
    const state = $('#wb2SaveState', root)
    if (state) state.innerHTML = '<span></span>正在保存'
    window.clearTimeout(saveTimer)
    saveTimer = window.setTimeout(() => {
      const current = $('#wb2SaveState', root)
      if (current) current.innerHTML = `${icons.check}已自动保存`
    }, 420)
    if (message) addActivity(message)
  }

  function addActivity(text) {
    activity.unshift({ text, time: new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' }) })
    activity = activity.slice(0, 20)
  }

  function makeId(prefix = 'draft') {
    return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`
  }

  function cloneQuestion(question) {
    return { ...question, id: makeId('q'), options: question.options ? [...question.options] : undefined }
  }

  function projectList() {
    if (homeProjectTab === 'shared') return sharedProjects
    const local = readDrafts().map((draft) => ({
      id: draft.id,
      title: draft.title || '未命名题单',
      subject: draft.subject || '五年级 · 数学',
      count: draft.questions?.length || 0,
      status: draft.questions?.length ? '未完成' : '空白草稿',
      time: '刚刚',
      tone: 'local',
      local: true,
    }))
    return [...local, ...demoProjects]
  }

  function projectRow(project) {
    return `<button class="wb2-project-row" type="button" data-project="${escapeHtml(project.id)}" data-project-search="${escapeHtml(`${project.title}${project.subject}`.toLowerCase())}">
      <span class="wb2-project-thumb ${project.tone || 'mint'}">${icons.blank}</span>
      <span><b>${escapeHtml(project.title)}</b><small>${escapeHtml(project.subject)} · ${project.count} 题</small></span>
      <em>${escapeHtml(project.time)}</em>
    </button>`
  }

  function projectCard(project) {
    return `<button class="wb2-recent-card" type="button" data-project="${escapeHtml(project.id)}">
      <span class="wb2-paper-mini ${project.tone || 'mint'}"><i></i><i></i><i></i><i></i></span>
      <span class="wb2-recent-copy"><b>${escapeHtml(project.title)}</b><small>${escapeHtml(project.subject)} · ${project.count} 题</small><em>${escapeHtml(project.status)} · ${escapeHtml(project.time)}</em></span>
      <span class="wb2-row-arrow">${icons.chevron}</span>
    </button>`
  }

  function starterCard(mode, icon, title, copy, badge = '') {
    return `<button class="wb2-start-card wb2-start-${mode}" type="button" data-start="${mode}">
      <span class="wb2-start-icon">${icons[icon]}</span>
      <span><b>${title}</b><small>${copy}</small></span>
      ${badge ? `<em>${badge}</em>` : ''}<i>${icons.chevron}</i>
    </button>`
  }

  function renderHome() {
    const projects = projectList()
    root.dataset.view = 'home'
    root.innerHTML = `<header class="wb2-topbar">
      <button class="wb2-brand" type="button" data-action="exit" aria-label="返回飞象老师">${icons.back}<span class="wb2-brand-mark">${icons.sparkle}</span><b>飞象老师 组题工作台</b></button>
      <div class="wb2-topbar-spacer"></div>
    </header>
    <div class="wb2-home-shell">
      <aside class="wb2-projects-panel">
        <div class="wb2-segment"><button class="${homeProjectTab === 'mine' ? 'active' : ''}" type="button" data-home-tab="mine">我的题单</button><button class="${homeProjectTab === 'shared' ? 'active' : ''}" type="button" data-home-tab="shared">共享给我</button></div>
        <label class="wb2-search">${icons.search}<input id="wb2ProjectSearch" type="search" placeholder="${homeProjectTab === 'shared' ? '搜索共享题单' : '搜索题单'}"></label>
        <div class="wb2-side-heading"><span>${homeProjectTab === 'shared' ? '最近收到' : '最近'}</span><button type="button" aria-label="题单排序">${icons.dots}</button></div>
        <div class="wb2-project-list">${projects.slice(0, 8).map(projectRow).join('')}</div>
      </aside>
      <main class="wb2-home-main">
        <section class="wb2-welcome">
          <h1>开始一份新题单</h1>
          <p>从空白题单开始，也可以直接选题、导入试卷，或使用 AI 组题。</p>
          <div class="wb2-start-grid">
            ${starterCard('blank', 'blank', '空白题单', '自己添加、编辑和编排题目')}
            ${starterCard('bank', 'bank', '从官方题库挑题', '按知识点、题型和难度筛选')}
            ${starterCard('upload', 'upload', '上传文件或图片', '导入 Word、PDF 或试卷照片')}
            ${starterCard('knowledge', 'knowledge', '从我的知识库', '从个人收藏、校本资源和历史题单中复用')}
          </div>
          <form class="wb2-home-ai" id="wb2HomeAiForm">
            <div class="wb2-home-ai-intro">
              <span class="wb2-home-ai-icon">${icons.sparkle}</span>
              <span><b>AI 组题</b><small>说出年级、知识点、题量或使用场景，AI 将直接创建题单</small></span>
            </div>
            <div class="wb2-home-ai-composer">
              <textarea id="wb2HomeAiInput" rows="2" maxlength="500" required placeholder="例如：五年级上册数学，出一份 20 分钟的小数乘法随堂练习……"></textarea>
              <span>Enter 发送 · Shift + Enter 换行</span>
              <button type="submit" aria-label="发送组题要求">${icons.up}</button>
            </div>
            <div class="wb2-home-ai-examples"><span>可以这样说</span><button type="button" data-home-ai-example="五年级上册数学，出一份20分钟的小数乘法随堂练习">五年级小数乘法随堂练习</button><button type="button" data-home-ai-example="七年级数学有理数单元检测，基础题和提高题比例为7比3">七年级有理数单元检测</button><button type="button" data-home-ai-example="根据学生错题补充3道同知识点变式题，并逐步提高难度">根据错题补充3道变式题</button></div>
          </form>
        </section>
      </main>
    </div>`
  }

  function draftMeta() {
    const questions = activeDraft?.questions || []
    const score = questions.reduce((sum, item) => sum + Number(item.score || 0), 0)
    const minutes = Math.max(5, Math.round(questions.length * 1.8))
    return { count: questions.length, score, minutes }
  }

  function questionMarkup(question, index) {
    return `<article class="wb2-question ${selectedQuestionId === question.id ? 'selected' : ''}" data-question-id="${escapeHtml(question.id)}" draggable="true" title="点击选中，拖动可调整题目顺序">
      <div class="wb2-question-number">${index + 1}</div>
      <div class="wb2-question-main">
        <div class="wb2-question-text" contenteditable="true" data-question-text="${escapeHtml(question.id)}">${escapeHtml(question.text || '请输入题目内容……')}</div>
        ${question.options?.length ? `<div class="wb2-question-options">${question.options.map((option) => `<span>${escapeHtml(option)}</span>`).join('')}</div>` : ''}
        <div class="wb2-question-tools" aria-label="第 ${index + 1} 题操作">
          <button type="button" data-question-add="${escapeHtml(question.id)}" aria-label="在本题后加题" title="加题">${icons.plus}</button>
          <button type="button" data-question-replace="${escapeHtml(question.id)}" aria-label="换题" title="换题">${icons.replace}</button>
          <button type="button" data-question-adapt="${escapeHtml(question.id)}" aria-label="AI改编" title="AI改编">${icons.sparkle}</button>
          <button class="danger" type="button" data-delete-question="${escapeHtml(question.id)}" aria-label="删除" title="删除">${icons.trash}</button>
        </div>
      </div>
    </article>`
  }

  function paperMarkup() {
    const questions = activeDraft.questions || []
    const meta = draftMeta()
    return `<div class="wb2-paper" id="wb2Paper">
      <header class="wb2-paper-header">
        <p>学校：____________________　班级：________　姓名：________</p>
        <input class="wb2-paper-title" id="wb2PaperTitle" value="${escapeHtml(activeDraft.title || '未命名题单')}" aria-label="画布中的题单名称" title="点击编辑题单名称">
        <div><span>${escapeHtml(activeDraft.subject || '五年级 · 数学')}</span><span>共 ${meta.count} 题</span><span>${meta.score || '--'} 分</span><span>建议 ${meta.minutes} 分钟</span></div>
      </header>
      ${questions.length ? `<section class="wb2-paper-questions">${questions.map(questionMarkup).join('')}</section>` : `<section class="wb2-empty-paper">
        <span class="wb2-empty-paper-icon">${icons.blank}</span>
        <h2>从这里开始组题</h2>
        <p>可以从右侧官方题库、文件或我的知识库中添加。</p>
        <div><button type="button" data-source="bank">${icons.plus}从官方题库挑题</button></div>
      </section>`}
      <footer class="wb2-paper-footer">第 1 页 · 题单内容已保存到本地工作区</footer>
    </div>`
  }

  function sourceCard(view, icon, title, copy, action = '打开') {
    return `<button class="wb2-source-card" type="button" data-source="${view}"><span>${icons[icon]}</span><span><b>${title}</b><small>${copy}</small></span><em>${action}</em></button>`
  }

  function sourcePanelMarkup() {
    if (sourceView === 'bank') {
      if (bankBrowseMode === 'paper' && bankPaperDetailId) {
        const paper = bankPapers.find((item) => item.id === bankPaperDetailId)
        if (paper) return `<div class="wb2-paper-detail">
          <div class="wb2-paper-detail-head"><button type="button" data-action="paper-list" aria-label="返回试卷列表">${icons.back}</button><div><span>${escapeHtml(paper.paperType)}</span><h2>${escapeHtml(paper.title)}</h2><p>${escapeHtml(paper.subject)} · ${escapeHtml(paper.grade)} · ${escapeHtml(paper.meta)}</p></div></div>
          <div class="wb2-paper-detail-summary"><b>试卷内容</b><span>共 ${paper.questions.length} 题</span></div>
          <div class="wb2-paper-preview">${paper.questions.map((question, index) => `<article><em>${index + 1}</em><div><span>${escapeHtml(question.type)} · ${escapeHtml(question.knowledge)}</span><p>${escapeHtml(question.text)}</p></div><b>${Number(question.score || 0)} 分</b></article>`).join('')}</div>
          <div class="wb2-panel-footer"><span>${paper.questions.length} 题 · 可整套加入</span><button class="wb2-primary-button" type="button" data-action="add-paper-detail" data-paper-id="${paper.id}">整套加入题单</button></div>
        </div>`
      }
      return `<div class="wb2-bank-search-top"><button type="button" data-source="overview" aria-label="返回添加题目">${icons.back}</button><label class="wb2-bank-keyword">${icons.search}<input id="wb2BankSearch" type="search" value="${escapeHtml(bankSearchQuery)}" placeholder="搜索题目或试卷"></label></div>
        <div class="wb2-bank-mode"><button class="${bankBrowseMode === 'question' ? 'active' : ''}" type="button" data-bank-mode="question">按单题</button><button class="${bankBrowseMode === 'paper' ? 'active' : ''}" type="button" data-bank-mode="paper" ${pickerTarget.mode === 'replace' ? 'disabled' : ''}>按套卷</button></div>
        ${bankBrowseMode === 'question' ? `<div class="wb2-bank-search-row">
          <label class="wb2-bank-knowledge"><select id="wb2BankKnowledge" aria-label="知识点"><option>全部知识点</option><optgroup label="数与代数"><option>小数乘法</option><option>小数除法</option><option>简易方程</option><option>分段计费</option></optgroup><optgroup label="图形与几何"><option>多边形面积</option></optgroup><optgroup label="统计与概率"><option>可能性</option></optgroup></select></label>
        </div>
        <div class="wb2-selection-head">${pickerTarget.mode === 'replace' ? '<span>请选择 1 道题</span>' : `<label><input id="wb2BankSelectAll" type="checkbox" ${bankSelectedIds.length === bankQuestions.length ? 'checked' : ''}>全选当前结果</label>`}<span id="wb2BankVisibleCount">共 ${bankQuestions.length} 题</span></div>
        <div class="wb2-structured-list">${bankQuestions.map((question) => `<label class="wb2-structured-item" data-bank-row data-knowledge="${escapeHtml(question.knowledge)}" data-search="${escapeHtml(`${question.type} ${question.knowledge} ${question.difficulty} ${question.text}`.toLowerCase())}"><input type="checkbox" data-bank-question value="${question.id}" ${bankSelectedIds.includes(question.id) ? 'checked' : ''}><span><span class="wb2-structured-tags"><em>${escapeHtml(question.type)}</em><em>${escapeHtml(question.knowledge)}</em><em>${escapeHtml(question.difficulty)}</em></span><b>${escapeHtml(question.text)}</b>${question.options?.length ? `<small>${escapeHtml(question.options.slice(0, 2).join('　'))}</small>` : ''}</span></label>`).join('')}</div>
        <div class="wb2-panel-footer"><span id="wb2BankCount">已选 ${bankSelectedIds.length} 题</span><button class="wb2-primary-button" type="button" data-action="add-bank">${pickerTarget.mode === 'replace' ? '确认换题' : '加入题单'}</button></div>` : `<div class="wb2-bank-filters wb2-paper-filters"><label><span>学科</span><select id="wb2PaperSubject"><option>全部学科</option><option>数学</option><option>语文</option><option>英语</option></select></label><label><span>年级</span><select id="wb2PaperGrade"><option>全部年级</option><option>五年级</option><option>六年级</option><option>七年级</option></select></label><label><span>类型</span><select id="wb2PaperType"><option>全部类型</option><option>单元检测</option><option>期中</option><option>期末</option><option>专项练习</option></select></label></div>
        <div class="wb2-paper-result-head"><span>试卷列表</span><em id="wb2PaperVisibleCount">共 ${bankPapers.length} 套</em></div>
        <div class="wb2-paper-pick-list">${bankPapers.map((paper) => `<article class="wb2-paper-pick" data-paper-card data-subject="${escapeHtml(paper.subject)}" data-grade="${escapeHtml(paper.grade)}" data-paper-type="${escapeHtml(paper.paperType)}" data-search="${escapeHtml(`${paper.title} ${paper.subject} ${paper.grade} ${paper.paperType}`.toLowerCase())}"><label title="选择整套试卷"><input type="radio" name="wb2BankPaper" data-bank-paper value="${paper.id}" ${bankSelectedPaperId === paper.id ? 'checked' : ''}></label><button type="button" data-paper-detail="${paper.id}"><span class="wb2-paper-pick-icon">${icons.blank}</span><span><b>${escapeHtml(paper.title)}</b><small>${escapeHtml(paper.subject)} · ${escapeHtml(paper.grade)} · ${escapeHtml(paper.paperType)} · ${escapeHtml(paper.meta)}</small></span><em>${icons.chevron}</em></button></article>`).join('')}</div>
        <div class="wb2-panel-footer"><span id="wb2PaperCount">${bankSelectedPaperId ? `已选 1 套 · ${bankPapers.find((item) => item.id === bankSelectedPaperId)?.questions.length || 0} 题` : '未选择试卷'}</span><button class="wb2-primary-button" type="button" data-action="add-paper">整套加入题单</button></div>`}`
    }
    if (sourceView === 'knowledge') {
      return `<div class="wb2-tool-head"><button type="button" data-source="overview">${icons.back}</button><div><h2>从我的知识库复用</h2><p>使用已沉淀的练习和教学资料</p></div></div>
        <div class="wb2-knowledge-list">
          <button type="button" data-action="add-knowledge"><span class="mint">练</span><span><b>小数乘除法错题集</b><small>18 题 · 五年级上册</small></span><em>选用</em></button>
          <button type="button" data-action="add-knowledge"><span class="sand">卷</span><span><b>2025 年西城区期末卷</b><small>26 题 · 区级题库</small></span><em>选用</em></button>
          <button type="button" data-action="add-knowledge"><span class="blue">课</span><span><b>长方体互动课件</b><small>可按课件内容生成配套练习</small></span><em>选用</em></button>
        </div>`
    }
    if (sourceView === 'manual') {
      return `<div class="wb2-tool-head"><button type="button" data-source="overview">${icons.back}</button><div><h2>手动录入题目</h2><p>新题将添加到题单末尾</p></div></div>
        <form class="wb2-manual-form" id="wb2ManualForm"><label><span>题型</span><select id="wb2ManualType"><option>选择题</option><option>填空题</option><option>计算题</option><option>解答题</option></select></label><label><span>题目内容</span><textarea id="wb2ManualText" placeholder="输入题干……"></textarea></label><div><label><span>知识点</span><input id="wb2ManualKnowledge" placeholder="例如：小数乘法"></label><label><span>分值</span><input id="wb2ManualScore" type="number" value="5" min="1"></label></div><button class="wb2-primary-button" type="submit">添加到题单</button></form>`
    }
    const selectedIndex = activeDraft?.questions?.findIndex((item) => item.id === selectedQuestionId) ?? -1
    const selectedQuestion = selectedIndex >= 0 ? activeDraft.questions[selectedIndex] : null
    return `<div class="wb2-overview-scroll"><div class="wb2-source-list wb2-source-list-overview">
        ${sourceCard('bank', 'bank', '官方题库', '覆盖主流教材与常用题型，可按知识点、题型和难度精准挑题')}
        ${sourceCard('upload', 'upload', '上传文件或图片', '支持 Word、PDF 和试卷照片，识别后可逐题检查并加入题单')}
        ${sourceCard('knowledge', 'knowledge', '我的知识库', '从个人收藏、校本资源和历史题单中快速复用已沉淀内容')}
      </div></div>
      <section class="wb2-add-ai">
        <div class="wb2-add-ai-head"><span>${icons.sparkle}</span><div><h3>AI 组题</h3><p>输入组题要求，或选中左侧题目进行补题、改编和检查</p></div></div>
        <div class="wb2-ai-suggestions"><button type="button" data-ai-prompt="添加两道小数乘法易错题">加两道易错题</button><button type="button" data-ai-prompt="补充三道基础巩固题">补充基础题</button><button type="button" data-ai-prompt="检查知识点覆盖并补题">检查并补题</button></div>
        <div class="wb2-ai-composer">${selectedQuestion ? `<div class="wb2-ai-context-card"><span>${icons.blank}</span><b>第 ${selectedIndex + 1} 题</b><button type="button" data-action="clear-question-context" aria-label="移除第 ${selectedIndex + 1} 题">×</button></div>` : ''}<textarea id="wb2AiInput" placeholder="${selectedQuestion ? '针对第 ' + (selectedIndex + 1) + ' 题输入修改要求……' : '例如：补充3道五年级小数乘法基础题……'}"></textarea><button class="wb2-ai-send" type="button" data-action="ai-send" aria-label="发送">${icons.up}</button></div>
        <small>提交后将打开“生成过程”，题目生成完成后自动加入左侧画布</small>
      </section>`
  }

  function uploadPanelMarkup() {
    const session = uploadSession || { status: 'empty', fileName: '' }
    if (session.status === 'empty') {
      return `<div class="wb2-tool-head"><div><h2>上传文件或图片</h2><p>上传后将在此处拆分为结构化题目</p></div></div>
        <div class="wb2-dropzone" id="wb2Dropzone"><span>${icons.upload}</span><b>拖入文件，或点击上传</b><p>支持 Word、PDF、JPG 和 PNG</p><button type="button" data-action="choose-file">选择文件</button></div>
        <div class="wb2-upload-tip"><b>先校对，再加入题单</b><p>系统会识别题干、选项、答案和知识点；你可以单选或全选后加入。</p></div>`
    }
    if (session.status === 'parsing') {
      return `<div class="wb2-tool-head"><div><h2>正在解析文件</h2><p>${escapeHtml(session.fileName)}</p></div></div>
        <div class="wb2-upload-parsing"><span>${icons.upload}</span><b>正在识别题目结构…</b><p>提取题干、选项、答案和图片位置</p><i></i></div>`
    }
    const questions = session.questions || []
    const addedIds = session.addedIds || []
    const availableIds = questions.filter((question) => !addedIds.includes(question.id)).map((question) => question.id)
    const selectedIds = session.selectedIds || []
    const allAvailableSelected = availableIds.length > 0 && availableIds.every((id) => selectedIds.includes(id))
    return `<div class="wb2-tool-head"><div><h2>文件解析结果</h2><p>${escapeHtml(session.fileName)} · 已识别 ${questions.length} 题</p></div><button type="button" data-action="choose-file" aria-label="重新上传">${icons.upload}</button></div>
      <div class="wb2-upload-summary"><span>${icons.check}</span><div><b>结构化完成</b><small>请检查题型和题干，选择后加入题单</small></div></div>
      <div class="wb2-selection-head"><label><input id="wb2UploadSelectAll" type="checkbox" ${allAvailableSelected ? 'checked' : ''} ${availableIds.length ? '' : 'disabled'}>全选未加入题目</label><span>共 ${questions.length} 题</span></div>
      <div class="wb2-structured-list">${questions.map((question) => { const added = addedIds.includes(question.id); const checked = (session.selectedIds || []).includes(question.id); return `<label class="wb2-structured-item ${added ? 'added' : ''}"><input type="checkbox" data-upload-question value="${question.id}" ${checked ? 'checked' : ''} ${added ? 'disabled' : ''}><span><span class="wb2-structured-tags"><em>${escapeHtml(question.type)}</em><em>${escapeHtml(question.knowledge)}</em><em>${escapeHtml(question.difficulty)}</em>${added ? '<em class="is-added">已加入</em>' : ''}</span><b>${escapeHtml(question.text)}</b>${question.options?.length ? `<small>${escapeHtml(question.options.slice(0, 2).join('　'))}</small>` : ''}</span></label>` }).join('')}</div>
      <div class="wb2-panel-footer"><span id="wb2UploadCount">已选 ${(session.selectedIds || []).length} 题</span><button class="wb2-primary-button" type="button" data-action="add-upload">加入题单</button></div>`
  }

  function aiProcessPanelMarkup() {
    const process = aiProcess || { prompt: '', status: 'running', completed: 0 }
    const steps = [
      ['理解组题要求', '识别年级、知识点、题量与难度'],
      ['检索候选题目', '从题库中匹配并去除重复题目'],
      ['校验题单结构', '检查题型比例、难度和知识点覆盖'],
      ['加入题单画布', '保留题目来源并生成可编辑内容'],
    ]
    return `<div class="wb2-process-panel">
      <div class="wb2-tool-head"><div><h2>AI 生成过程</h2><p>${process.status === 'done' ? '题目已加入画布，可以继续编辑' : '正在处理，本页可随时切回添加题目'}</p></div></div>
      <section class="wb2-process-request"><span>${icons.sparkle}</span><div><small>本次要求</small><p>${escapeHtml(process.prompt || 'AI 组题')}</p></div></section>
      <div class="wb2-process-steps">${steps.map((step, index) => {
        const done = index < process.completed
        const running = index === process.completed && process.status !== 'done'
        return `<article class="${done ? 'done' : running ? 'running' : ''}"><span>${done ? icons.check : running ? '<i></i>' : index + 1}</span><div><b>${step[0]}</b><small>${step[1]}</small></div><em>${done ? '完成' : running ? '进行中' : '等待'}</em></article>`
      }).join('')}</div>
      ${process.status === 'done' ? `<section class="wb2-process-result">${icons.check}<div><b>${escapeHtml(process.result || '已生成题目并加入画布')}</b><p>你可以直接修改题干，或使用换题、AI改编和删除。</p></div></section>` : '<div class="wb2-process-loading"><i></i><span>正在生成候选题目，请稍候……</span></div>'}
      <button class="wb2-process-back" type="button" data-tool="add">继续添加题目</button>
    </div>`
  }

  function activityPanelMarkup() {
    const items = activity.length ? activity : [{ text: '题单已创建，等待添加题目', time: '刚刚' }]
    return `<div class="wb2-tool-head"><div><h2>操作记录</h2><p>本次题单的添加和修改记录</p></div></div><div class="wb2-activity-list">${items.map((item, index) => `<div><span>${index ? '' : icons.check}</span><p><b>${escapeHtml(item.text)}</b><small>${escapeHtml(item.time)}</small></p></div>`).join('')}</div>`
  }

  function renderEditor() {
    const meta = draftMeta()
    const draftTitle = activeDraft.title || '未命名题单'
    const titleSize = Math.min(Math.max([...draftTitle].length, 6), 22)
    root.dataset.view = 'editor'
    root.innerHTML = `<header class="wb2-topbar wb2-editor-topbar">
      <button class="wb2-back-home" type="button" data-action="home" aria-label="返回我的题单">${icons.back}<span class="wb2-brand-mark">${icons.sparkle}</span></button>
      <div class="wb2-title-stack"><div class="wb2-title-line"><input id="wb2DraftTitle" size="${titleSize}" value="${escapeHtml(draftTitle)}" aria-label="题单名称" title="点击编辑题单名称"><div class="wb2-doc-stats"><span>${meta.count} 题</span><span>${meta.score || '--'} 分</span><span>${meta.minutes} 分钟</span></div></div><span id="wb2SaveState">${icons.check}已自动保存</span></div>
      <div class="wb2-topbar-spacer"></div>
      <button class="wb2-primary-button" type="button" data-action="download">${icons.download}下载</button>
      <button class="wb2-secondary-button" type="button" data-action="share">${icons.share || icons.up}分享</button>
    </header>
    <div class="wb2-editor-shell">
      <main class="wb2-canvas-area">
        <div class="wb2-canvas-toolbar"><span>题单画布</span><div><button type="button">75%</button><button type="button" data-action="focus">专注编辑</button></div></div>
        <div class="wb2-canvas-scroll">${paperMarkup()}</div>
      </main>
      <aside class="wb2-tools-panel">
        <nav class="wb2-tool-tabs"><button class="${activeTool === 'add' ? 'active' : ''}" type="button" data-tool="add">${icons.plus}添加题目</button>${uploadSession ? `<button class="${activeTool === 'upload' ? 'active' : ''}" type="button" data-tool="upload">${icons.upload}${uploadSession.status === 'empty' ? '上传文件' : uploadSession.status === 'done' ? '文件解析' : '解析中'}</button>` : ''}${aiProcess ? `<button class="${activeTool === 'process' ? 'active' : ''}" type="button" data-tool="process">${icons.sparkle}${aiProcess.status === 'done' ? '生成结果' : '生成中'}</button>` : ''}<button class="${activeTool === 'activity' ? 'active' : ''}" type="button" data-tool="activity">${icons.list}记录</button></nav>
        <div class="wb2-tool-content ${activeTool === 'add' && sourceView === 'overview' ? 'wb2-tool-content-overview' : ''}">${activeTool === 'upload' ? uploadPanelMarkup() : activeTool === 'process' ? aiProcessPanelMarkup() : activeTool === 'activity' ? activityPanelMarkup() : sourcePanelMarkup()}</div>
      </aside>
    </div>
    <input id="wb2FileInput" type="file" accept=".doc,.docx,.pdf,.png,.jpg,.jpeg" hidden>
    <div class="wb2-toast" id="wb2Toast" role="status"></div>`
    if (sourceView === 'bank' && activeTool === 'add' && !bankPaperDetailId) {
      if (bankBrowseMode === 'paper') syncPaperFilters()
      else syncBankQuestionFilters()
    }
  }

  function newDraft(mode = 'blank', template) {
    const titles = { practice: '15分钟随堂练习', unit: '小数乘除法单元检测', final: '五年级数学期末试卷', courseware: '长方体配套练习' }
    const templateQuestions = template ? bankQuestions.slice(0, template === 'final' ? 6 : 3).map(cloneQuestion) : []
    activeDraft = { id: makeId(), title: titles[template] || '未命名题单', subject: '五年级 · 数学', questions: templateQuestions, createdAt: Date.now(), updatedAt: Date.now() }
    activeTool = mode === 'upload' ? 'upload' : 'add'
    sourceView = mode === 'bank' ? 'bank' : mode === 'knowledge' ? 'knowledge' : 'overview'
    aiProcess = null
    selectedQuestionId = ''
    bankSearchQuery = ''
    uploadSession = mode === 'upload' ? { status: 'empty', fileName: '', questions: [] } : null
    activity = []
    uploadedFile = ''
    addActivity(template ? `已从「${titles[template]}」模板创建` : '已创建新题单')
    persistDraft()
    renderEditor()
    if (mode === 'ai') window.setTimeout(() => $('#wb2AiInput', root)?.focus(), 0)
  }

  function startAiDraftFromHome(prompt) {
    const request = String(prompt || '').trim()
    if (!request) {
      $('#wb2HomeAiInput', root)?.focus()
      return
    }
    newDraft('ai')
    const editorInput = $('#wb2AiInput', root)
    if (!editorInput) return
    editorInput.value = request
    handleAiSend()
  }

  function openProject(id) {
    const local = readDrafts().find((item) => item.id === id)
    if (local) activeDraft = JSON.parse(JSON.stringify(local))
    else {
      const demo = [...demoProjects, ...sharedProjects].find((item) => item.id === id) || demoProjects[0]
      activeDraft = { id: makeId(), title: demo.title, subject: demo.subject, questions: bankQuestions.slice(0, Math.min(6, demo.count)).map(cloneQuestion), createdAt: Date.now(), updatedAt: Date.now() }
    }
    activeTool = 'add'
    sourceView = 'overview'
    selectedQuestionId = ''
    aiProcess = null
    uploadSession = null
    activity = [{ text: '已恢复最近编辑状态', time: '刚刚' }]
    renderEditor()
  }

  function showToast(text) {
    const toast = $('#wb2Toast', root)
    if (!toast) return
    toast.textContent = text
    toast.classList.add('visible')
    window.setTimeout(() => toast.classList.remove('visible'), 1800)
  }

  function addQuestions(questions, message) {
    activeDraft.questions.push(...questions.map(cloneQuestion))
    persistDraft(message || `已添加 ${questions.length} 道题`)
    renderEditor()
    showToast(message || `已加入 ${questions.length} 道题`)
  }

  function normalizePickedQuestions(selection = []) {
    return selection.map((item, index) => {
      const question = item?.question || item || {}
      return {
        id: makeId('q'),
        type: question.type || question.section || '解答题',
        knowledge: question.knowledge || '题库选题',
        difficulty: question.difficulty || '中等',
        score: Number(question.score || 5),
        text: question.stem || question.text || `已选题目 ${index + 1}`,
        options: Array.isArray(question.options) ? [...question.options] : undefined,
        answer: question.answer || '',
        analysis: question.analysis || '',
        sourceTitle: item?.sourceTitle || item?.sourceShortTitle || '题库',
      }
    })
  }

  function requestQuestionPicker(target = {}) {
    pickerTarget = { mode: target.mode || 'append', afterId: target.afterId || '' }
    if (pickerTarget.mode === 'replace') bankBrowseMode = 'question'
    bankSelectedIds = []
    bankSelectedPaperId = ''
    bankPaperDetailId = ''
    activeTool = 'add'
    sourceView = 'bank'
    renderEditor()
  }

  function addPickedQuestions(selection = []) {
    if (!activeDraft) return
    const questions = normalizePickedQuestions(selection)
    if (!questions.length) return
    const targetIndex = activeDraft.questions.findIndex((item) => item.id === pickerTarget.afterId)
    if (pickerTarget.mode === 'replace' && targetIndex >= 0) {
      activeDraft.questions.splice(targetIndex, 1, questions[0])
      persistDraft('已从题库替换 1 道题')
      sourceView = 'overview'
      renderEditor()
      showToast('题目已替换')
    } else if (pickerTarget.mode === 'insert' && targetIndex >= 0) {
      activeDraft.questions.splice(targetIndex + 1, 0, ...questions)
      persistDraft(`已在第 ${targetIndex + 1} 题后加入 ${questions.length} 道题`)
      sourceView = 'overview'
      renderEditor()
      showToast(`已加入 ${questions.length} 道题`)
    } else {
      sourceView = 'overview'
      addQuestions(questions, `已从题库加入 ${questions.length} 道题`)
    }
    pickerTarget = { mode: 'append', afterId: '' }
  }

  function handleAiSend() {
    const input = $('#wb2AiInput', root)
    const text = input?.value.trim()
    if (!text) return
    const draftId = activeDraft?.id
    const processId = makeId('process')
    aiProcess = { id: processId, prompt: text, status: 'running', completed: 1, result: '' }
    activeTool = 'process'
    addActivity(`AI 需求：${text}`)
    renderEditor()
    window.setTimeout(() => {
      if (!aiProcess || aiProcess.id !== processId || activeDraft?.id !== draftId || root?.hidden) return
      aiProcess.completed = 2
      if (activeTool === 'process') renderEditor()
    }, 260)
    window.setTimeout(() => {
      if (!aiProcess || aiProcess.id !== processId || activeDraft?.id !== draftId || root?.hidden) return
      aiProcess.completed = 3
      if (activeTool === 'process') renderEditor()
    }, 500)
    window.setTimeout(() => {
      if (!activeDraft || activeDraft.id !== draftId || !root || root.hidden || root.dataset.view !== 'editor') return
      if (!aiProcess || aiProcess.id !== processId) return
      activeDraft.questions.push(...bankQuestions.slice(0, 3).map(cloneQuestion))
      aiProcess.status = 'done'
      aiProcess.completed = 4
      aiProcess.result = '已生成 3 道候选题并加入题单'
      persistDraft('AI 已添加 3 道候选题')
      renderEditor()
      showToast('AI 已添加 3 道题')
    }, 720)
  }

  function handleFiles(files) {
    const file = files?.[0]
    if (!file) return
    uploadedFile = file.name
    const draftId = activeDraft?.id
    const sessionId = makeId('upload')
    uploadSession = { id: sessionId, status: 'parsing', fileName: file.name, questions: [], selectedIds: [], addedIds: [] }
    activeTool = 'upload'
    addActivity(`已选择文件：${file.name}`)
    renderEditor()
    window.setTimeout(() => {
      if (!uploadSession || uploadSession.id !== sessionId || activeDraft?.id !== draftId || root?.hidden) return
      uploadSession.status = 'done'
      uploadSession.questions = bankQuestions.slice(0, 5).map(cloneQuestion)
      addActivity(`已从「${file.name}」识别 ${uploadSession.questions.length} 道题`)
      renderEditor()
      showToast('文件解析完成，请选择题目')
    }, 650)
  }

  function syncBankQuestionFilters() {
    const knowledge = $('#wb2BankKnowledge', root)?.value || '全部知识点'
    const query = ($('#wb2BankSearch', root)?.value || '').trim().toLowerCase()
    const rows = $$('[data-bank-row]', root)
    rows.forEach((row) => {
      const matchesKnowledge = knowledge === '全部知识点' || row.dataset.knowledge === knowledge
      const matchesQuery = !query || (row.dataset.search || '').includes(query)
      row.hidden = !matchesKnowledge || !matchesQuery
      if (row.hidden) $('input', row).checked = false
    })
    const visibleInputs = rows.filter((row) => !row.hidden).map((row) => $('[data-bank-question]', row)).filter(Boolean)
    bankSelectedIds = $$('[data-bank-question]:checked', root).map((input) => input.value)
    const countLabel = $('#wb2BankCount', root)
    if (countLabel) countLabel.textContent = `已选 ${bankSelectedIds.length} 题`
    const visibleCount = $('#wb2BankVisibleCount', root)
    if (visibleCount) visibleCount.textContent = `共 ${visibleInputs.length} 题`
    const selectAll = $('#wb2BankSelectAll', root)
    if (selectAll) {
      const checked = visibleInputs.filter((input) => input.checked).length
      selectAll.checked = visibleInputs.length > 0 && checked === visibleInputs.length
      selectAll.indeterminate = checked > 0 && checked < visibleInputs.length
      selectAll.disabled = visibleInputs.length === 0
    }
  }

  function syncPaperFilters() {
    const subject = $('#wb2PaperSubject', root)?.value || '全部学科'
    const grade = $('#wb2PaperGrade', root)?.value || '全部年级'
    const type = $('#wb2PaperType', root)?.value || '全部类型'
    const query = ($('#wb2BankSearch', root)?.value || bankSearchQuery).trim().toLowerCase()
    const cards = $$('[data-paper-card]', root)
    cards.forEach((card) => {
      card.hidden = (subject !== '全部学科' && card.dataset.subject !== subject)
        || (grade !== '全部年级' && card.dataset.grade !== grade)
        || (type !== '全部类型' && card.dataset.paperType !== type)
        || Boolean(query && !(card.dataset.search || '').includes(query))
      if (card.hidden) $('input', card).checked = false
    })
    const selected = $('[data-bank-paper]:checked', root)
    bankSelectedPaperId = selected?.value || ''
    const visibleCount = cards.filter((card) => !card.hidden).length
    const label = $('#wb2PaperVisibleCount', root)
    if (label) label.textContent = `共 ${visibleCount} 套`
    const selectedLabel = $('#wb2PaperCount', root)
    if (selectedLabel && !bankSelectedPaperId) selectedLabel.textContent = '未选择试卷'
  }

  function ensureRoot() {
    if (root) return
    root = document.createElement('section')
    root.className = 'fx-question-workbench-v2'
    root.hidden = true
    root.setAttribute('role', 'dialog')
    root.setAttribute('aria-modal', 'true')
    root.setAttribute('aria-label', '组题工作台')
    document.body.appendChild(root)

    root.addEventListener('click', (event) => {
      const homeTab = event.target.closest('[data-home-tab]')
      if (homeTab) { homeProjectTab = homeTab.dataset.homeTab; renderHome(); return }
      const homeAiExample = event.target.closest('[data-home-ai-example]')
      if (homeAiExample) {
        const input = $('#wb2HomeAiInput', root)
        if (input) { input.value = homeAiExample.dataset.homeAiExample; input.focus() }
        return
      }
      const start = event.target.closest('[data-start]')
      if (start) { newDraft(start.dataset.start); return }
      const template = event.target.closest('[data-template]')
      if (template) { newDraft('blank', template.dataset.template); return }
      const project = event.target.closest('[data-project]')
      if (project) { openProject(project.dataset.project); return }
      const bankMode = event.target.closest('[data-bank-mode]')
      if (bankMode && !bankMode.disabled) { bankBrowseMode = bankMode.dataset.bankMode; bankPaperDetailId = ''; renderEditor(); return }
      const paperDetail = event.target.closest('[data-paper-detail]')
      if (paperDetail) { bankPaperDetailId = paperDetail.dataset.paperDetail; renderEditor(); return }
      const tool = event.target.closest('[data-tool]')
      if (tool) { activeTool = tool.dataset.tool; renderEditor(); return }
      const source = event.target.closest('[data-source]')
      if (source) {
        activeTool = 'add'
        if (source.dataset.source === 'bank') { requestQuestionPicker(); return }
        if (source.dataset.source === 'upload') {
          uploadSession = uploadSession || { status: 'empty', fileName: '', questions: [] }
          activeTool = 'upload'
          renderEditor()
          return
        }
        if (source.dataset.source === 'overview') pickerTarget = { mode: 'append', afterId: '' }
        sourceView = source.dataset.source
        renderEditor()
        return
      }
      const aiPrompt = event.target.closest('[data-ai-prompt]')
      if (aiPrompt) { const input = $('#wb2AiInput', root); if (input) { input.value = aiPrompt.dataset.aiPrompt; input.focus() } return }
      const move = event.target.closest('[data-move]')
      if (move && activeDraft) {
        const index = activeDraft.questions.findIndex((item) => item.id === move.dataset.question)
        const next = move.dataset.move === 'up' ? index - 1 : index + 1
        if (index >= 0 && next >= 0 && next < activeDraft.questions.length) {
          const [question] = activeDraft.questions.splice(index, 1)
          activeDraft.questions.splice(next, 0, question)
          persistDraft(`已调整第 ${index + 1} 题顺序`)
          renderEditor()
        }
        return
      }
      const remove = event.target.closest('[data-delete-question]')
      if (remove && activeDraft) {
        if (selectedQuestionId === remove.dataset.deleteQuestion) selectedQuestionId = ''
        activeDraft.questions = activeDraft.questions.filter((item) => item.id !== remove.dataset.deleteQuestion)
        persistDraft('已删除 1 道题')
        renderEditor()
        showToast('题目已删除')
        return
      }
      const addAfter = event.target.closest('[data-question-add]')
      if (addAfter) { requestQuestionPicker({ mode: 'insert', afterId: addAfter.dataset.questionAdd }); return }
      const replace = event.target.closest('[data-question-replace]')
      if (replace) { requestQuestionPicker({ mode: 'replace', afterId: replace.dataset.questionReplace }); return }
      const adapt = event.target.closest('[data-question-adapt]')
      if (adapt && activeDraft) {
        const index = activeDraft.questions.findIndex((item) => item.id === adapt.dataset.questionAdapt)
        const question = activeDraft.questions[index]
        if (question) {
          question.text = `${question.text.replace(/（AI变式）$/, '')}（AI变式）`
          question.difficulty = question.difficulty === '基础' ? '中等' : question.difficulty
          aiProcess = { id: makeId('process'), prompt: `AI 改编第 ${index + 1} 题`, status: 'done', completed: 4, result: `第 ${index + 1} 题已改编：保留原知识点，调整了设问与难度` }
          activeTool = 'process'
          persistDraft(`AI 已改编第 ${index + 1} 题`)
          renderEditor()
          showToast(`第 ${index + 1} 题已完成 AI 改编`)
        }
        return
      }
      const selectedQuestion = event.target.closest('.wb2-question')
      if (selectedQuestion && activeDraft) {
        const id = selectedQuestion.dataset.questionId
        if (event.target.matches('[contenteditable]') && selectedQuestionId === id) return
        selectedQuestionId = id
        activeTool = 'add'
        sourceView = 'overview'
        renderEditor()
        window.setTimeout(() => $('#wb2AiInput', root)?.focus(), 0)
        return
      }
      const actionNode = event.target.closest('[data-action]')
      const action = actionNode?.dataset.action
      if (!action) return
      if (action === 'exit') { api.close(); window.dispatchEvent(new CustomEvent('fx-question-workbench-v2-exit')); return }
      if (action === 'home') { persistDraft(); renderHome(); return }
      if (action === 'choose-file') { const fileInput = $('#wb2FileInput', root); if (fileInput) { fileInput.value = ''; fileInput.click() } return }
      if (action === 'paper-list') { bankPaperDetailId = ''; renderEditor(); return }
      if (action === 'add-bank') {
        const ids = [...bankSelectedIds]
        if (!ids.length) { showToast('请先选择题目'); return }
        const selection = bankQuestions.filter((item) => ids.includes(item.id)).map((question) => ({ question: { ...question, stem: question.text } }))
        addPickedQuestions(selection)
        bankSelectedIds = []
        return
      }
      if (action === 'add-paper') {
        const id = bankSelectedPaperId
        const paper = bankPapers.find((item) => item.id === id)
        if (!paper) { showToast('请先选择一套试卷'); return }
        const selection = paper.questions.map((question) => ({ question: { ...question, stem: question.text }, sourceTitle: paper.title }))
        addPickedQuestions(selection)
        bankSelectedPaperId = ''
        return
      }
      if (action === 'add-paper-detail') {
        const paper = bankPapers.find((item) => item.id === actionNode.dataset.paperId)
        if (!paper) return
        const selection = paper.questions.map((question) => ({ question: { ...question, stem: question.text }, sourceTitle: paper.title }))
        addPickedQuestions(selection)
        bankPaperDetailId = ''
        bankSelectedPaperId = ''
        return
      }
      if (action === 'add-upload') {
        const ids = [...(uploadSession?.selectedIds || [])]
        const questions = (uploadSession?.questions || []).filter((item) => ids.includes(item.id))
        if (!questions.length) { showToast('请先选择题目'); return }
        uploadSession.addedIds = [...new Set([...(uploadSession.addedIds || []), ...ids])]
        uploadSession.selectedIds = []
        addQuestions(questions, `已从「${uploadSession.fileName}」加入 ${questions.length} 道题`)
        return
      }
      if (action === 'add-knowledge') { addQuestions(bankQuestions.slice(3, 5), '已从知识库加入 2 道题'); return }
      if (action === 'ai-send') { handleAiSend(); return }
      if (action === 'clear-question-context') { selectedQuestionId = ''; renderEditor(); return }
      if (action === 'save-knowledge') { persistDraft('已保存到我的知识库'); showToast('已保存到我的知识库'); return }
      if (action === 'download') { showToast('下载菜单：学生版 / 答案解析 / PDF'); return }
      if (action === 'share') { showToast('分享链接已生成'); return }
      if (action === 'settings') { showToast('题单设置：纸张、分值、用时和答题区'); return }
      if (action === 'focus') { root.classList.toggle('focus-mode'); actionNode.textContent = root.classList.contains('focus-mode') ? '退出专注' : '专注编辑' }
    })

    root.addEventListener('input', (event) => {
      if (event.target.id === 'wb2BankSearch') {
        bankSearchQuery = event.target.value
        if (bankBrowseMode === 'paper') syncPaperFilters()
        else syncBankQuestionFilters()
        return
      }
      if (event.target.id === 'wb2ProjectSearch') {
        const query = event.target.value.trim().toLowerCase()
        $$('[data-project-search]', root).forEach((item) => { item.hidden = !item.dataset.projectSearch.includes(query) })
        return
      }
      if (event.target.id === 'wb2DraftTitle' && activeDraft) {
        activeDraft.title = event.target.value || '未命名题单'
        const title = $('#wb2PaperTitle', root)
        if (title) title.value = activeDraft.title
        event.target.size = Math.min(Math.max([...activeDraft.title].length, 6), 22)
        persistDraft('已修改题单名称')
        return
      }
      if (event.target.id === 'wb2PaperTitle' && activeDraft) {
        activeDraft.title = event.target.value || '未命名题单'
        const title = $('#wb2DraftTitle', root)
        if (title) {
          title.value = activeDraft.title
          title.size = Math.min(Math.max([...activeDraft.title].length, 6), 22)
        }
        persistDraft('已修改题单名称')
        return
      }
      if (event.target.matches('[data-question-text]') && activeDraft) {
        const question = activeDraft.questions.find((item) => item.id === event.target.dataset.questionText)
        if (question) { question.text = event.target.textContent.trim(); persistDraft('已编辑题目') }
      }
    })

    root.addEventListener('change', (event) => {
      if (event.target.id === 'wb2FileInput') handleFiles(event.target.files)
      if (event.target.id === 'wb2BankSelectAll') {
        $$('[data-bank-row]', root).filter((row) => !row.hidden).forEach((row) => {
          const input = $('[data-bank-question]', row)
          if (input) input.checked = event.target.checked
        })
      }
      if (event.target.matches('[data-bank-question],#wb2BankSelectAll')) {
        if (pickerTarget.mode === 'replace' && event.target.matches('[data-bank-question]') && event.target.checked) {
          $$('[data-bank-question]', root).forEach((input) => { if (input !== event.target) input.checked = false })
        }
        const inputs = $$('[data-bank-question]', root)
        const count = inputs.filter((input) => input.checked).length
        bankSelectedIds = inputs.filter((input) => input.checked).map((input) => input.value)
        const label = $('#wb2BankCount', root)
        if (label) label.textContent = `已选 ${count} 题`
        const selectAll = $('#wb2BankSelectAll', root)
        if (selectAll && event.target !== selectAll) {
          const visibleInputs = $$('[data-bank-row]', root).filter((row) => !row.hidden).map((row) => $('[data-bank-question]', row)).filter(Boolean)
          const visibleChecked = visibleInputs.filter((input) => input.checked).length
          selectAll.checked = visibleInputs.length > 0 && visibleChecked === visibleInputs.length
          selectAll.indeterminate = visibleChecked > 0 && visibleChecked < visibleInputs.length
        }
      }
      if (event.target.id === 'wb2BankKnowledge') {
        syncBankQuestionFilters()
      }
      if (event.target.matches('#wb2PaperSubject,#wb2PaperGrade,#wb2PaperType')) {
        syncPaperFilters()
      }
      if (event.target.matches('[data-bank-paper]')) {
        const paper = bankPapers.find((item) => item.id === event.target.value)
        bankSelectedPaperId = paper?.id || ''
        const label = $('#wb2PaperCount', root)
        if (label) label.textContent = paper ? `已选 1 套 · ${paper.questions.length} 题` : '未选择试卷'
      }
      if (event.target.id === 'wb2UploadSelectAll') {
        $$('[data-upload-question]:not(:disabled)', root).forEach((input) => { input.checked = event.target.checked })
      }
      if (event.target.matches('[data-upload-question],#wb2UploadSelectAll')) {
        const inputs = $$('[data-upload-question]:not(:disabled)', root)
        const count = inputs.filter((input) => input.checked).length
        if (uploadSession) uploadSession.selectedIds = inputs.filter((input) => input.checked).map((input) => input.value)
        const label = $('#wb2UploadCount', root)
        if (label) label.textContent = `已选 ${count} 题`
        const selectAll = $('#wb2UploadSelectAll', root)
        if (selectAll && event.target !== selectAll) {
          selectAll.checked = count === inputs.length
          selectAll.indeterminate = count > 0 && count < inputs.length
        }
      }
    })

    root.addEventListener('keydown', (event) => {
      if (event.target.id !== 'wb2HomeAiInput' || event.key !== 'Enter' || event.shiftKey || event.isComposing) return
      event.preventDefault()
      startAiDraftFromHome(event.target.value)
    })

    root.addEventListener('submit', (event) => {
      if (event.target.id === 'wb2HomeAiForm') {
        event.preventDefault()
        startAiDraftFromHome($('#wb2HomeAiInput', root)?.value)
        return
      }
      if (event.target.id !== 'wb2ManualForm') return
      event.preventDefault()
      const text = $('#wb2ManualText', root)?.value.trim()
      if (!text) { showToast('请输入题目内容'); return }
      addQuestions([{ id: 'manual', type: $('#wb2ManualType', root)?.value, knowledge: $('#wb2ManualKnowledge', root)?.value || '自定义', difficulty: '自定义', score: Number($('#wb2ManualScore', root)?.value || 5), text }], '已手动添加 1 道题')
    })

    root.addEventListener('dragstart', (event) => {
      const question = event.target.closest('.wb2-question')
      if (!question) return
      draggedQuestionId = question.dataset.questionId
      question.classList.add('dragging')
      if (event.dataTransfer) {
        event.dataTransfer.effectAllowed = 'move'
        event.dataTransfer.setData('text/plain', draggedQuestionId)
      }
    })
    root.addEventListener('dragend', () => {
      draggedQuestionId = ''
      $$('.wb2-question.dragging,.wb2-question.drag-over', root).forEach((item) => item.classList.remove('dragging', 'drag-over'))
    })
    root.addEventListener('dragover', (event) => {
      const question = event.target.closest('.wb2-question')
      if (question && draggedQuestionId && question.dataset.questionId !== draggedQuestionId) {
        event.preventDefault()
        $$('.wb2-question.drag-over', root).forEach((item) => item.classList.remove('drag-over'))
        question.classList.add('drag-over')
        if (event.dataTransfer) event.dataTransfer.dropEffect = 'move'
        return
      }
      if (event.target.closest('#wb2Dropzone')) { event.preventDefault(); event.target.closest('#wb2Dropzone').classList.add('dragging') }
    })
    root.addEventListener('dragleave', (event) => {
      event.target.closest('#wb2Dropzone')?.classList.remove('dragging')
      const question = event.target.closest('.wb2-question')
      if (question && !question.contains(event.relatedTarget)) question.classList.remove('drag-over')
    })
    root.addEventListener('drop', (event) => {
      const targetQuestion = event.target.closest('.wb2-question')
      if (targetQuestion && draggedQuestionId && activeDraft) {
        event.preventDefault()
        const fromIndex = activeDraft.questions.findIndex((item) => item.id === draggedQuestionId)
        const targetId = targetQuestion.dataset.questionId
        const targetRect = targetQuestion.getBoundingClientRect()
        const placeAfter = event.clientY > targetRect.top + targetRect.height / 2
        if (fromIndex >= 0 && targetId !== draggedQuestionId) {
          const [moved] = activeDraft.questions.splice(fromIndex, 1)
          const targetIndex = activeDraft.questions.findIndex((item) => item.id === targetId)
          activeDraft.questions.splice(targetIndex + (placeAfter ? 1 : 0), 0, moved)
          persistDraft('已拖动调整题目顺序')
          renderEditor()
          showToast('题目顺序已调整')
        }
        draggedQuestionId = ''
        return
      }
      const zone = event.target.closest('#wb2Dropzone')
      if (!zone) return
      event.preventDefault()
      zone.classList.remove('dragging')
      handleFiles(event.dataTransfer.files)
    })
  }

  const api = {
    open() {
      ensureRoot()
      document.body.classList.add('fx-question-workbench-v2-open')
      root.hidden = false
      renderHome()
    },
    close() {
      if (!root) return
      root.hidden = true
      root.classList.remove('focus-mode')
      document.body.classList.remove('fx-question-workbench-v2-open')
      window.clearTimeout(saveTimer)
    },
    isOpen() {
      return Boolean(root && !root.hidden)
    },
    importFiles(files) {
      handleFiles(files)
    },
    addPickedQuestions,
  }

  window.FxQuestionWorkbenchV2 = api
})()

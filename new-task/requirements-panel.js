(() => {
  const documents = {
    home: `
      <div class="prd-summary"><span>页面属性<b>存量首页增量改造</b></span><span>本次新增<b>从题库中添加</b></span><span>结果承接<b>当前对话</b></span></div>
      <section class="prd-section">
        <h3>1. 本次新增内容（基于原有首页） <span class="prd-status">P0</span></h3>
        <p>首页为已有页面，本需求不重做首页。本次只在原有首页上补充“从题库加题”能力，原有教学技能、资源广场、工作区、输入框及其他入口均保持不变。</p>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>新增位置</th><th>新增内容</th><th>结果</th></tr></thead><tbody>
          <tr><td>首页输入框左下角“＋”菜单</td><td>新增“从题库中添加”按钮，文案固定，不使用“从题库中加题”。</td><td>点击后在当前首页上方打开题库选择弹窗。</td></tr>
          <tr><td>首页激活“AI组题”后，再点击“＋”</td><td>同样新增“从题库中添加”按钮。</td><td>复用同一个题库选择弹窗，选题关联当前AI组题对话。</td></tr>
          <tr><td>首页输入区域</td><td>新增已选题附件状态。</td><td>完成选择后显示“已选N道题”，用户仍停留首页。</td></tr>
          <tr><td>题库选择弹窗</td><td>新增官方题库/我的题库、知识点、题型、难度、搜索、答、AI改编、添加及积分解锁。</td><td>作为首页覆盖层出现，不改变原页面路由。</td></tr>
        </tbody></table></div>
        <h4>新增功能主流程</h4>
        <div class="prd-flow"><span>首页点击＋</span><i>→</i><span>从题库中添加</span><i>→</i><span>选择题目</span><i>→</i><span>加入对话</span><i>→</i><span>首页显示“已选N道题”</span></div>
        <div class="prd-flow"><span>点击AI组题</span><i>→</i><span>再点击＋</span><i>→</i><span>同一题库选择器</span><i>→</i><span>加入当前对话</span></div>
        <div class="prd-note">从首页打开题库并完成添加后，必须停留在首页；不得自动跳进组题工作台。只有用户发送组题需求或明确点击进入工作台时才跳转。</div>
      </section>
      <section class="prd-section">
        <h3>2. 新增入口及相关控件交互</h3>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>控件</th><th>触发与结果</th><th>状态/约束</th></tr></thead><tbody>
          <tr><td>原“＋”按钮</td><td>沿用原菜单，并在菜单中增加“从题库中添加”。</td><td>再次点击或点空白区关闭；不清空输入框。</td></tr>
          <tr><td>新增“从题库中添加”</td><td>在当前页面打开题库选择弹窗，不新开页面。</td><td>首页直接点击＋、激活AI组题后点击＋，两处行为一致。</td></tr>
          <tr><td>加入对话</td><td>关闭选择器，在输入区上方显示“已选N道题”。</td><td>N=0时禁用；添加成功才关闭。</td></tr>
          <tr><td>取消</td><td>关闭选择器并回到原页面。</td><td>本次临时选择不写入对话。</td></tr>
          <tr><td>发送</td><td>将文本、已选题和附件作为一次消息发送。</td><td>无文本但有已选题时允许发送。</td></tr>
        </tbody></table></div>
      </section>
      <section class="prd-section">
        <h3>3. 从题库中添加：结构与筛选</h3>
        <ul>
          <li>左侧：学段学科、官方题库/我的题库、知识点树（官方树节点<strong>不</strong>展示题量；我的题库树节点展示题量）。</li>
          <li>右侧：题型、难度、关键词搜索、题目卡片、分页或解锁提示；搜索词写入本地存储，离开题库页签或刷新后再回到题库仍恢复上次搜索（按「学段学科 + 官方/我的题库」分别记忆）。</li>
          <li>切换学科、题库来源、知识点、题型、难度或关键词后回到第1页；已选题保持，除非题目已失效。</li>
          <li>“我的题库”不消耗积分；是否分页由实际数据量决定，不复用官方题库的付费解锁逻辑。</li>
        </ul>
      </section>
      <section class="prd-section">
        <h3>4. 官方题库数量边界（研发必读） <span class="prd-status">P0</span></h3>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>服务端总数</th><th>页面展示</th><th>底部行为</th></tr></thead><tbody>
          <tr><td>0题</td><td>展示空状态“暂无符合条件的题目”，给出“清除筛选/切换知识点”。</td><td>不展示分页、不展示积分解锁；加入对话仅在全局已选数为0时禁用。</td></tr>
          <tr><td>1–19题</td><td>一次展示全部实际题目。</td><td>不展示解锁和分页；不得补假数据凑20。</td></tr>
          <tr><td>恰好20题</td><td>展示20题。</td><td><code>hasMore=false</code> 时不展示解锁；只有 <code>total&gt;20</code> 才提示解锁。</td></tr>
          <tr><td>21–40题</td><td>首屏20题。</td><td>一句话提示“消耗20积分，解锁更多内容”，按钮紧跟文案；确认后可到第2页，末页按实际数量展示。</td></tr>
          <tr><td>41–60题</td><td>首屏20题。</td><td>确认解锁一次后可翻第2、3页；最多展示60题。</td></tr>
          <tr><td>超过60题</td><td>本期仍只开放前60题。</td><td>第3页无“下一页”；可提示“当前最多查看60题”，不再次扣分。</td></tr>
        </tbody></table></div>
        <div class="prd-note warn">解锁维度建议为“用户 + 题库来源 + 学科 + 知识点/检索条件 + 内容版本 + <strong>自然日（yyyy-MM-dd，服务端时区）</strong>”。同一范围在同一自然日内只扣一次；改变知识点或检索范围后按服务端权益结果决定是否重新解锁；<strong>次日权益失效</strong>，仍只展示首屏 20 题，需再次消耗积分解锁。</div>
        <p>解锁文案必须按真实数据动态计算。例如总数21题显示“消耗20积分，解锁剩余1题”；总数40题显示“解锁剩余20题，共2页”；总数41题显示“解锁剩余21题，共3页”。不得对所有情况固定写“后2页，共60道题”。</p>
      </section>
      <section class="prd-section">
        <h3>5. 解锁、积分和分页状态</h3>
        <ol>
          <li>点击“解锁更多”打开二次确认，明确“将消耗20积分、解锁后续2页、最多60题”。</li>
          <li>确认时按钮进入 loading 并禁用；服务端成功扣分后跳到第2页，同时刷新剩余积分。</li>
          <li>积分不足：不扣分、不翻页，提示余额并提供“去获取积分/取消”；返回仍停第1页。</li>
          <li>扣分成功但拉题失败：权益保留，展示重试；重试不得再次扣分。</li>
          <li>上一页/下一页到边界禁用；翻页后滚动到题目列表顶部，已选、答案展开状态按题目ID恢复。</li>
        </ol>
      </section>
      <section class="prd-section">
        <h3>6. 单题卡片按钮</h3>
        <p>默认只展示题干与选项；知识点、题型、难度及操作按钮在鼠标悬浮或键盘聚焦时显示。</p>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>按钮</th><th>功能</th><th>关键状态</th></tr></thead><tbody>
          <tr><td>答</td><td>在当前卡片内展开/收起“答案”和“解析”。</td><td>不得使用“参考答案”；展开不影响其他卡片。</td></tr>
          <tr><td>AI改编</td><td>与组题工作台左侧题库卡片<strong>内联交互一致</strong>（见工作台 §7.1）：卡片内展开改编区、快捷要求、自定义输入、生成候选、选用后入已选。</td><td>原题不自动加入；生成中/失败可重试；「答」与「AI改编」面板互斥展开。</td></tr>
          <tr><td>＋ / ✓</td><td>选择或取消当前题目。</td><td>选中后显示“已加入·第N题”（N 为当前对话/题单内序号，规则同工作台 §7.2）；重复点击为取消。</td></tr>
        </tbody></table></div>
      </section>
      <section class="prd-section"><h3>7. 首页验收场景</h3><ul><li>分别验证首页＋、AI组题后＋均进入同一选择器。</li><li>分别构造0、7、20、21、40、41、60、61题数据检查底部状态。</li><li>验证余额不足、重复确认、接口超时、跨页选题、筛选后返回、取消和加入对话。</li><li>加入完成后仍在首页，正确显示“已选N道题”。</li></ul></section>
      <div class="prd-note">首页在<strong>未进入</strong> AI 组题教学任务时，以本 Tab 为准。进入「教学技能 · AI 组题」会话后，组题链路规则见<strong>「教学技能·AI组题」</strong> Tab；落地到组题工作台后见<strong>「组题工作台」</strong> Tab。</div>`,

    teachingCompose: `
      <div class="prd-summary"><span>对齐基准<b>线上飞象老师 · AI 老师</b></span><span>技能<b>AI 组题</b></span><span>组题细则<b>复用组题工作台</b></span></div>
      <section class="prd-section">
        <h3>1. 对齐基准 <span class="prd-status">P0</span></h3>
        <p>「教学技能 · AI 组题」在<strong>组题任务页内</strong>的对话推理、右侧题单/详情编辑、多轮改题、附件与题源、导出与任务历史等，<strong>与线上飞象老师（AI 老师）现网 AI 组题一致</strong>；文案与视觉以现网为准，本文不重复展开逐步 UI。</p>
        <h4>1.1 入口</h4>
        <ul>
          <li>首页「教学技能」推荐位 / 教学技能库卡片；</li>
          <li>新任务输入区「＋ → AI组题」；</li>
          <li>其他教学成果一键带入组题上下文（若有）—— 发送时按组题任务处理。</li>
        </ul>
        <h4>1.2 首次点击：技能介绍弹窗 →「开始使用」 <span class="prd-status">P0</span></h4>
        <p>用户<strong>首次</strong>从上述入口点击「AI组题」时，<strong>不直接进入组题任务页</strong>，先弹出<strong>技能详情层</strong>（全屏/居中卡片，可视为介绍弹窗）：</p>
        <ol>
          <li><strong>内容</strong>：技能分类、标题「AI组题」、能力说明与卖点要点（如题库规模、命题思路、导出形态等，与现网一致）；AI 组题侧可配<strong>动态演示</strong>（过程 → 成卷结果，支持重播）。</li>
          <li><strong>主操作</strong>：底部主按钮文案为<strong>「开始使用」</strong>（非其他技能的「去生成」）。</li>
          <li><strong>关闭</strong>：支持返回/关闭（←、×、点击遮罩等）；关闭后仍停留在进入前的页面，<strong>未点击「开始使用」前不激活组题任务</strong>。</li>
          <li><strong>点击「开始使用」</strong>：关闭详情层；在<strong>当前页</strong>进入 AI 组题<strong>就绪态</strong>—— 输入区挂载「AI组题/组题」技能标签、预填一条示例组卷需求（可编辑）、占位符切换为组题口径；「＋」菜单切换为组题专用项（从题库添加、从知识库添加、上传文件等，顺序与现网一致）。</li>
        </ol>
        <h4>1.3 发送需求 → 组题任务页</h4>
        <p>用户在就绪态编辑需求并<strong>发送</strong>（可带附件/选题，规则见 §2 与现网）后：</p>
        <ol>
          <li>离开首页布局，进入<strong>组题任务页</strong>：顶栏展示组题任务标题；左侧为对话区（用户消息、AI 推理/步骤、结果与产物卡片）；右侧为<strong>可编辑题单</strong>预览（题干、答案解析、排序与换题等，<strong>同线上飞象老师 AI 老师</strong>）。</li>
          <li>生成过程中对话区逐步展示推理/命题步骤；完成后提供查看题单、下载等操作，并支持继续用自然语言多轮改题。</li>
          <li>任务历史保留本次生成与修改过程（与现网一致）。</li>
        </ol>
        <h4>1.4 非首次点击</h4>
        <p>同一用户/session 内<strong>再次</strong>从首页等入口点击「AI组题」时，<strong>不再重复完整介绍弹窗</strong>，直接进入 §1.3 的就绪态或恢复最近一次组题任务上下文（与现网行为一致；Demo 以实现为准）。</p>
      </section>
      <section class="prd-section">
        <h3>2. 首页「从题库中添加」（组题对话内）</h3>
        <p>在 AI 组题任务已激活、用户通过输入区「＋」使用<strong>从题库中添加</strong>时，规则<strong>复用「首页」Tab §1–§7</strong>（同一选择器、积分解锁、已选 N 道题、不自动跳转组题工作台等）。题目卡片「答 / AI 改编 / ＋」与工作台 §7.1–§7.2 口径一致。</p>
      </section>
      <section class="prd-section">
        <h3>3. 进入组题工作台后的规则复用 <span class="prd-status">P0</span></h3>
        <p>用户从 AI 组题任务进入<strong>组题工作台</strong>（或直接在 Demo 工作台组题）后，题库、更多题源、右侧画布、自动保存、下载等<strong>一律以《组题工作台》PRD 为准</strong>，本 Tab 不重复展开：</p>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>能力</th><th>复用章节</th></tr></thead><tbody>
          <tr><td>官方/我的题库、知识点树、筛选、积分解锁、空状态</td><td>组题工作台 §4–§6</td></tr>
          <tr><td>题目卡片「答 / AI 改编 / 选用」与画布联动</td><td>组题工作台 §7</td></tr>
        </tbody></table></div>
        <p class="prd-note">上传文件、知识库、AI 组题对话历史、右侧画布、下载、自动保存与知识库「编辑」等，见<strong>组题工作台</strong> Tab 与<strong>我的知识库</strong> Tab，本 Tab 不重复列表。</p>
      </section>
      <section class="prd-section"><h3>4. 验收要点</h3><ul><li>首次点击 AI组题：出现技能详情层 → 仅「开始使用」后进入就绪态（预填示例、组题「＋」菜单）；关闭弹窗未点开始时不激活任务。</li><li>发送后组题任务页（对话 + 右侧题单）与<strong>现网飞象老师 AI 组题</strong>一致。</li><li>非首次入口不再重复完整介绍弹窗。</li><li>组题对话内「从题库中添加」符合首页 Tab 规则。</li><li>进入组题工作台后的能力符合<strong>组题工作台</strong> Tab。</li></ul></section>`,

    workbench: `
      <div class="prd-summary"><span>页面目标<b>多来源组题与编排</b></span><span>核心区域<b>左题库 / 右画布</b></span><span>保存目标<b>我的组题</b></span></div>
      <section class="prd-section">
        <h3>1. 页面定位与信息架构 <span class="prd-status">P0</span></h3>
        <p>组题工作台为新增页面。左侧负责找题、预览题源与 AI 组题过程，右侧为当前题单画布。左侧顶部为<strong>来源页签栏</strong>：固定「题库」「更多题源」，以及由更多题源衍生的<strong>可关闭动态页签</strong>（规则见 §2）。</p>
        <ul><li>题库：官方题库、我的题库，支持学科/知识点/题型/难度/搜索。</li><li>更多题源：上传文件、从我的知识库添加、让AI帮我组题。</li><li>右侧画布：展示已选题目、答案解析及作答区，自动保存。</li></ul>
      </section>
      <section class="prd-section">
        <h3>2. 左侧来源页签与动态 Tab <span class="prd-status">P0</span></h3>
        <p>用户在「更多题源」内进入具体能力，或继续「查看」某条上传记录 / 知识库题单 / AI 组题对话时，在「更多题源」<strong>右侧依次追加</strong>动态页签。切换页签只改变<strong>左侧内容区</strong>，右侧组题画布始终保留。</p>
        <h4>页签类型</h4>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>类型</th><th>示例</th><th>关闭</th></tr></thead><tbody>
          <tr><td>固定页签</td><td>题库、更多题源</td><td><strong>不可</strong>关闭；始终位于栏最左侧（「组题工作台」标识之后）。</td></tr>
          <tr><td>动态页签 · 入口</td><td>上传文件、我的知识库、AI 组题</td><td>右侧 <strong>×</strong> 可关闭；同一入口全局<strong>最多一个</strong>页签，重复进入则激活已有页签。</td></tr>
          <tr><td>动态页签 · 子页</td><td>某次上传任务详情、某份知识库题单预览、某条 AI 组题对话</td><td>× 可关闭；以 <code>recordId</code> / <code>paperId</code> / <code>composeId</code> 区分，同一 ID 已打开则激活已有页签，不重复创建。</td></tr>
        </tbody></table></div>
        <h4>打开顺序</h4>
        <ul>
          <li>动态页签按<strong>打开时间</strong>从左到右排列在「更多题源」之后，先开的在左、后开的在右。</li>
          <li>点击页签标题切换激活态；激活页签下方绿色指示条与 Demo 一致。</li>
          <li>从「更多题源」卡片进入「上传文件 / 从我的知识库添加 / 让 AI 帮我组题」时，若对应入口页签不存在则新建，若已存在则<strong>仅切换激活</strong>。</li>
          <li>在入口页内点击「查看题目」「查看题单」「查看历史对话」等，为当前上下文<strong>再开一层</strong>子页动态页签，标题取文件名（去后缀）、题单标题或对话摘要（过长省略）。</li>
        </ul>
        <h4>关闭与激活回退（对齐浏览器标签页）</h4>
        <ul>
          <li>点击动态页签上的 <strong>×</strong> 关闭该页签，并释放其左侧视图状态（未保存的纯浏览状态可丢弃；右侧画布已加题不受影响）。</li>
          <li>若关闭的是<strong>当前激活</strong>页签：激活<strong>左侧相邻</strong>页签（与 Chrome 关闭当前标签一致）；若其左侧无动态页签，则激活「更多题源」。</li>
          <li>若关闭的是非激活页签：保持当前激活页签不变。</li>
          <li>关闭「上传文件 / 我的知识库 / AI 组题」入口页签时，其下由该入口打开的<strong>子页页签一并关闭</strong>（同一入口栈内级联关闭，避免 orphan 子页签）。</li>
        </ul>
        <h4>页签过多时的交互（参考浏览器多标签）</h4>
        <ul>
          <li>页签栏<strong>单行</strong>展示，总宽度超出容器时启用<strong>横向滚动</strong>（触控板横滑、Shift+滚轮、拖拽滚动条），<strong>不换行</strong>、不自动折行到第二行。</li>
          <li>标题过长：单 Tab 内<strong>省略号截断</strong>，完整名称通过 <code>title</code> / tooltip 展示。</li>
          <li>切换激活页签时，将该 Tab <strong>scrollIntoView</strong> 滚入可见区域（避免激活项在可视区外）。</li>
          <li>本期<strong>不限制</strong>动态页签数量上限，依赖横向滚动承载；后续若需可迭代「收拢为 ▾ 列表 / +N 更多」等浏览器式溢出菜单（本期不做硬要求）。</li>
          <li>每个动态页签独立记住该页的滚动位置、列表筛选等轻量 UI 状态；再次激活时恢复，关闭后清除。</li>
        </ul>
        <div class="prd-note">与 §8 各题源「查看」的关系：知识库题单预览、上传记录详情、AI 组题对话等均通过本节动态页签打开，而非整页跳转。</div>
      </section>
      <section class="prd-section">
        <h3>3. 进入与退出</h3>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>入口</th><th>打开结果</th><th>返回</th></tr></thead><tbody>
          <tr><td>首页明确进入工作台</td><td>新建或恢复最近草稿；左侧默认官方题库，右侧显示当前画布。</td><td>退出回首页，先保存草稿。</td></tr>
          <tr><td>知识库“编辑”</td><td>从「我的云盘 → 我的组题」对题单 A 点<strong>编辑</strong>：进入组题工作台，<strong>右侧画布直接打开题单 A</strong>（见知识库 PRD §4 与 §9.9）。</td><td>若切换前画布 B 已有题，先自动保存 B 再打开 A；返回知识库时仍定位「我的组题」。</td></tr>
          <tr><td>历史AI组题/上传记录</td><td>左侧打开对应记录页；右侧保留当前画布。</td><td>关闭对应动态页签（§2）；必要时回到「更多题源」或「题库」。</td></tr>
        </tbody></table></div>
      </section>
      <section class="prd-section">
        <h3>4. 官方题库：知识树、科目与选题范围 <span class="prd-status">P0</span></h3>
        <p>左侧「官方题库」知识树数据来自飞象题库<strong>全部已上线</strong>的知识树（按当前用户可见范围与接口返回为准），不在前端写死 Demo 树。切换学段学科后，拉取对应学科上线树并渲染。</p>
        <h4>开放学科（本期）</h4>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>学段</th><th>学科</th><th>说明</th></tr></thead><tbody>
          <tr><td>小学</td><td>语文、数学、英语、科学、道德与法治</td><td>五科均展示完整上线知识树（学科范围见产品图2）。</td></tr>
          <tr><td>初中</td><td>语文、数学、英语、物理、化学、生物、科学、道德与法治、历史、地理</td><td>十科均展示完整上线知识树；在语数英理化生基础上，补充开放科学、道德与法治、历史、地理（见产品图1）。</td></tr>
          <tr><td>高中</td><td>语文、数学、英语、物理、化学、生物、政治、历史、地理</td><td>九科均展示完整上线知识树（学科范围与顺序见产品图3）。</td></tr>
        </tbody></table></div>
        <ul>
          <li><strong>父节点选题范围</strong>：选中知识树<strong>父节点</strong>时，题目列表包含该节点下<strong>所有子节点</strong>已关联的上线题目（子节点题目并集，去重后参与筛选与分页）。</li>
          <li><strong>叶子节点</strong>：仅展示绑定在该叶子知识点上的题目。</li>
          <li><strong>树 UI</strong>：官方题库知识点树节点<strong>不展示题量</strong>（删除节点右侧数量角标）；父/子层级、搜索高亮、选中态保持。</li>
          <li><strong>排序</strong>：官方题库题目列表默认按题目<strong>上线时间</strong>（<code>onlineAt</code> / 发布至题库时间）<strong>从新到旧</strong>；同秒并列时以 <code>questionId</code> 稳定排序。</li>
        </ul>
        <div class="prd-note">接口需返回：树节点 id、名称、父 id、是否叶子；题目需带 <code>onlineAt</code> 及关联知识点 id 列表，便于父节点聚合与排序。</div>
      </section>
      <section class="prd-section">
        <h3>5. 左侧题库与数量、解锁规则</h3>
        <p>官方题库严格复用首页题库的数量、积分和分页规则：每页20题、一次消耗20积分、最多3页/60题。不得在两个入口实现两套口径。</p>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>数量</th><th>工作台行为</th><th>验收重点</th></tr></thead><tbody>
          <tr><td>0</td><td>空状态；无解锁、无分页。若当前选中知识点在树下<strong>确实无题</strong>（非筛选导致），展示专用提示（见下节）。</td><td>右侧已有题目不受影响。</td></tr>
          <tr><td>1–19</td><td>一次展示全部实际题目。</td><td><strong>不展示</strong>积分解锁与分页；不得凑满 20 条。</td></tr>
          <tr><td>20</td><td>仅在服务端 <code>total&gt;20</code> 或 <code>hasMore=true</code> 时显示解锁。</td><td>不能仅因本页返回 20 条就展示解锁。</td></tr>
          <tr><td>&gt;20</td><td>首屏 20 题；底部解锁文案 + 按钮；解锁后显示页码。</td><td>上限 60 题；<strong>同一自然日</strong>内同范围只扣一次；次日回到仅 20 题可见。</td></tr>
        </tbody></table></div>
        <p>筛选变化回第1页并重置官方分页至第 1 页；解锁权益按<strong>自然日</strong>读取服务端；翻页不清空已选或右侧画布。「我的题库」不走积分解锁；左侧树节点<strong>展示题量</strong>；选中「我的题库」时，在官方/我的页签下方左对齐展示<strong>共N道</strong>（N=用户个人题库题目总数，含上传、录题等入库题目）。</p>
        <p>题库搜索框内容需持久化到本地（如 <code>localStorage</code>），用户切换到「更多题源」等其它左侧页签再返回「题库」时，搜索词与筛选结果状态保持一致；切换学段学科或官方/我的题库时，分别恢复该维度下上次保存的搜索词。</p>
      </section>
      <section class="prd-section">
        <h3>6. 空状态与提示文案</h3>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>场景</th><th>展示</th><th>操作</th></tr></thead><tbody>
          <tr><td>官方 · 当前知识点下无题（total=0，且非题型/难度/关键词筛空）</td><td>提示：<strong>暂无题目</strong>。</td><td>可引导切换知识点或清除搜索。</td></tr>
          <tr><td>官方 · 有题但被筛选/搜索筛空</td><td>「没有符合当前筛选或搜索条件的题目」。</td><td>清除筛选或调整条件。</td></tr>
          <tr><td>我的题库 · 当前学科下无任何个人题（total=0）</td><td>中间区域居中展示：标题<strong>还没有题目</strong>；说明<strong>上传题目与答案，AI 识别并打标，生成个人题库后即可在此选用</strong>；主按钮<strong>上传文件</strong>（带上传图标）。</td><td>点击按钮进入「更多题源 → 上传文件」页（Demo 直达上传页）；上传完成后题目进入我的题库。</td></tr>
          <tr><td>我的题库 · 有题但当前知识点/筛选无结果</td><td>同官方筛空文案。</td><td>切换知识点或清除筛选。</td></tr>
        </tbody></table></div>
        <div class="prd-note">研发按上表区分「整库为空」与「当前节点/筛选为空」两类，不得共用同一套误导性文案。</div>
      </section>
      <section class="prd-section">
        <h3>7. 题目卡片交互</h3>
        <ul>
          <li>默认隐藏标签和操作，悬浮/聚焦显示“答、AI改编、＋”。</li>
          <li>“答”原位展开答案与解析；再次点击收起。所有题目卡片行为一致。</li>
          <li>我的题库可额外提供删除：点击删除后弹出<strong>二次确认</strong>（标题「从我的题库删除？」+ 一句说明 +「取消 / 确认删除」），<strong>不展示题干预览</strong>。若该题已通过来源关联加入当前画布，弹窗须额外提示「确认后将从我的题库与当前画布一并移除」；确认后同步删除画布中 <code>sourceId</code> 对应的已确认题并重排题号。</li>
        </ul>
        <h4>7.1 AI 改编（题库单题 · 与左侧卡片一致） <span class="prd-status">P0</span></h4>
        <p>官方题库、我的题库、上传结果列表中的题目卡片，以及首页题库选择弹窗，<strong>共用同一套 AI 改编交互</strong>（工作台左侧已实现的内联样式为准）。</p>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>步骤</th><th>交互</th><th>规则</th></tr></thead><tbody>
          <tr><td>1. 点击「AI改编」</td><td>在当前题目卡片下方展开内联改编区；再次点击或点「×」收起。</td><td>展开改编区时收起「答」面板；原题不自动加入画布/已选。</td></tr>
          <tr><td>2. 快捷要求</td><td>提供固定 chips，如「换情境」「降低难度」「同考点变式」。</td><td>点击 chip 可填入或触发一次生成（与 Demo 一致）。</td></tr>
          <tr><td>3. 自定义要求</td><td>单行/多行输入 +「生成」。</td><td>空要求禁用生成；生成中按钮 loading。</td></tr>
          <tr><td>4. 候选结果</td><td>卡片内列表展示 2–3 道候选变式，含题型/难度/知识点与「选用题目」。</td><td>选用后才加入右侧画布或首页已选；未选用关闭面板不影响原题。</td></tr>
          <tr><td>5. 失败</td><td>展示失败原因 +「重试」。</td><td>重试不重复扣积分（如有）。</td></tr>
        </tbody></table></div>
        <div class="prd-note">画布内对某题发起「替换式」改编时，仍走同一候选选用流程，选用后替换画布目标题，而非题库卡片内直接覆盖。</div>
        <h4>7.2 「已加入 · 第 N 题」与画布联动 <span class="prd-status">P0</span></h4>
        <ul>
          <li>左侧题库题目从「＋」加入右侧画布后，卡片左上角展示 <strong>「已加入 · 第 N 题」</strong>；N 为题目在<strong>当前打开题单画布</strong>中<strong>已确认题</strong>的序号（1 起算，随删增、排序实时更新）。</li>
          <li>切换题单（新建组题、从知识库编辑打开另一 <code>paperId</code>、恢复另一草稿）后，联动关系以<strong>当前激活题单</strong>为准；仅当来源 <code>questionId</code> 仍存在于当前画布且仍保持来源关联时显示「已加入」。</li>
          <li>画布侧对该题<strong>题干/选项等实质内容</strong>发生编辑后，视为新题：<strong>解除</strong>与左侧来源题的联动（不再显示「已加入」、左侧「＋」可再次添加为新题）；右侧仍保留编辑后的题目。</li>
          <li>再次点击左侧「✓」取消选用时，从当前画布移除对应题并重排 N；其它来源题序号同步更新。</li>
        </ul>
        <p>实现建议：画布题保存 <code>sourceId</code> + 入库快照；编辑后比对快照不一致则清空 <code>sourceId</code>。序号以当前 draft 内题目顺序从 1 连续计算。</p>
      </section>
      <section class="prd-section">
        <h3>8. 更多题源</h3>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>入口</th><th>产品定义</th><th>完成态</th></tr></thead><tbody>
          <tr><td>上传文件</td><td>优先支持<strong>一次上传多张图片</strong>（PNG/JPG 等）；亦支持 PDF、DOCX。AI 识别、拆题、提取答案并自动打标，生成个人题库。</td><td>每份上传任务独立进「AI解析进度」；<strong>解析成功后</strong>题目以<strong>结构化题目</strong>写入「我的题库」（题型、知识点、难度、分值、选项/答案结构齐全，见 §9.1），可逐题或全部加入画布。</td></tr>
          <tr><td>从我的知识库添加</td><td>读取<strong>我的知识库 → 我的云盘 → 我的组题</strong>文件夹下的题单（画布自动保存等），支持预览、逐题选用、全部选用。</td><td>题目加入当前画布；原题单不变。</td></tr>
          <tr><td>让AI帮我组题</td><td>根据题量、知识点、题型、难度和时长生成完整候选题单；输入区支持<strong>文字、附件（＋）、语音</strong>。</td><td>支持逐题/全部加入当前画布；<strong>不</strong>写入「我的云盘 → 我的组题」。</td></tr>
        </tbody></table></div>
        <h4>8.1 让 AI 帮我组题 · 输入区</h4>
        <ul>
          <li>入口：<strong>更多题源 → 让 AI 帮我组题</strong>（或「开始组题」进入同一页）。</li>
          <li>输入框下方工具栏：<strong>＋ 添加文件</strong>、<strong>语音输入</strong>、<strong>开始组题</strong>；布局与首页对话输入区能力对齐。</li>
          <li><strong>添加文件（＋）</strong>：支持一次选择多个附件，格式与上传文件一致（PNG/JPG/WebP、PDF、DOC/DOCX 等）；选中后在输入框上方展示文件名标签，可单个移除；发送时若无文字，则按「根据附件组题」语义提交（附件随请求上传并由 AI 理解）。</li>
          <li><strong>语音输入</strong>：点击开始听写，识别结果实时写入输入框；再次点击或识别结束停止；无麦克风权限或不支持时给出明确提示，不阻断文字输入。</li>
          <li>快捷建议 chip、下方<strong>历史记录</strong>（点击查看历史对话）行为不变。</li>
        </ul>
        <h4>8.2 上传文件 · AI 解析进度</h4>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>状态</th><th>列表展示</th><th>操作</th></tr></thead><tbody>
          <tr><td>处理中</td><td>状态标签「处理中」、文件名、提交时间、当前阶段文案。</td><td><strong>不展示</strong>「查看进度」等按钮；用户可离开页面，后台继续解析。</td></tr>
          <tr><td>解析完成</td><td>「解析完成」、题量、完成时间。</td><td>「查看题目」进入题目列表；列表内每题为<strong>结构化题目</strong>（与官方/我的题库卡片一致），可逐题或全部选用加入画布。</td></tr>
          <tr><td>解析失败</td><td>「解析失败」、失败原因摘要。</td><td>展示<strong>「重新解析」</strong>；点击后任务回到处理中并重新走解析链路，不重复创建个人题库脏数据。</td></tr>
          <tr><td>无任何上传任务</td><td>「AI解析进度」列表区域展示空状态文案<strong>暂无记录</strong>（不展示表头占位行）。</td><td>保留上传区，引导用户上传首张图片或文件。</td></tr>
        </tbody></table></div>
        <h4>8.3 从我的知识库添加</h4>
        <p>入口：<strong>更多题源 → 从我的知识库添加</strong>。左侧进入知识库选题流程，<strong>右侧组题画布保持可见</strong>，用户边预览边向当前题单加题。</p>
        <h4>数据来源与列表</h4>
        <p>本功能只有<strong>一个数据来源</strong>，对应知识库中的固定路径：<strong>我的知识库 → 我的云盘 → 我的组题</strong>（系统文件夹，与「我的知识库」页内目录一致）。</p>
        <ul>
          <li>列表仅展示上述<strong>「我的组题」文件夹内</strong>、由<strong>组题工作台右侧画布自动保存</strong>的题单（以 <code>paperId</code> / <code>draftId</code> 唯一标识）。</li>
          <li>列表页展示：题单<strong>标题</strong>、<strong>元信息</strong>（题量、学科/年级摘要、最近保存/更新时间等）、操作<strong>「查看」</strong>；列表顶部或说明区固定展示路径「我的知识库 / 我的云盘 / 我的组题」。</li>
          <li>列表为空时：提示「我的组题」中尚无题单，引导用户在<strong>右侧画布组题并等待自动保存</strong>后再来选用。</li>
        </ul>
        <h4>查看与页签</h4>
        <ul>
          <li>点击「查看」进入该题单的<strong>题目预览页</strong>（非整卷编辑态）：展示标题、元信息、题量说明。</li>
          <li>点击「查看」按 §2 在来源页签栏<strong>新开动态页签</strong>（页签名为题单标题），可与上传 / AI 组题等页签并存；关闭该页签回到「我的知识库」入口页或 §2 规定的相邻页签。</li>
          <li>预览页题目卡片与左侧「题库」卡片<strong>交互一致</strong>：悬浮显示「答、AI 改编、＋」；展开答案/改编规则同 §7.1。</li>
        </ul>
        <h4>选用规则（加入右侧画布）</h4>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>操作</th><th>行为</th><th>约束</th></tr></thead><tbody>
          <tr><td>逐题「＋」</td><td>将单题以<strong>已确认题</strong>加入当前题单画布末尾；卡片显示「已加入 · 第 N 题」（规则同 §7.2）。</td><td>同一来源题在当前画布未解除关联前不得重复加入；再次点击为取消选用并从画布移除。</td></tr>
          <tr><td>「全部选用」</td><td>将该预览题单内<strong>全部题目</strong>一次性加入当前画布（已存在的来源题跳过）。</td><td>成功后 toast 提示选用数量；知识库中的<strong>原题单不被修改或删除</strong>（仅复制到画布）。</td></tr>
        </tbody></table></div>
        <div class="prd-note warn">与知识库「编辑」的区别：「编辑」以 <code>paperId</code> 打开整份题单进入画布<strong>编辑原稿</strong>（切换规则见 §9.9）；「从我的知识库添加」是在<strong>当前正在组题的画布</strong>上追加题目，不改变知识库原题单内容。</div>
        <h4>异常与边界</h4>
        <ul>
          <li>题单加载失败：列表/预览原位提示并可重试；不影响右侧已有画布。</li>
          <li>题单内部分题目失效/下架：失效题不可选用，其余题正常；已在画布中的副本按 §10「题目失效」处理。</li>
          <li>切换当前草稿/题单后，「已加入 · 第 N 题」联动规则同 §7.2（以当前激活画布为准）。</li>
          <li>不走官方题库积分解锁；无 20 题分页限制。</li>
        </ul>
      </section>
      <section class="prd-section">
        <h3>9. 右侧组题画布 <span class="prd-status">P0</span></h3>
        <p>组题画布是题单的<strong>所见即所得编辑区</strong>：支持<strong>结构化</strong>与<strong>非结构化</strong>题目混排，拖拽排序，富文本与公式排版，作答区与导出。题目均经左侧来源（题库、更多题源）<strong>选用即进入画布</strong>；进入后在右侧改序、改字、改公式、删题。</p>

        <h4>9.1 题目类型与加入方式</h4>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>类型</th><th>定义（来源与数据形态）</th><th>进入画布</th></tr></thead><tbody>
          <tr><td><strong>结构化题目</strong></td><td><strong>来源</strong>：① <strong>题库</strong>（官方题库、我的题库）；② <strong>上传文件</strong>经 AI 解析<strong>成功</strong>后入库「我的题库」的题目（默认可视为结构化，见 §8.2）；③ <strong>AI 组题</strong>产出中<strong>具备完整结构化数据</strong>的部分；④ <strong>我的知识库 → 我的云盘 → 我的组题</strong>中选用、且带题型/选项/答案等等价模型的题目。<br><strong>形态</strong>：带题型、知识点、难度、分值及选项/答案结构（JSON 或等价模型）。</td><td>左侧或预览页「＋」/「全部选用」后以<strong>已确认题</strong>插入；保留 <code>sourceId</code> 与入库快照（见 §7.2）。</td></tr>
          <tr><td><strong>非结构化题目</strong></td><td><strong>来源（仅此两类）</strong>：① <strong>AI 组题</strong>产出中<strong>未能解析为结构化模型</strong>的部分；② <strong>我的知识库 → 我的组题</strong>中选用、仅为题干/自由排版、<strong>无固定选项结构</strong>的题目。<strong>不</strong>包含用户在画布内凭空新建空白题作为独立来源。<br><strong>形态</strong>：以题干 + 手动排版为主，可补作答区、公式；画布侧使用仅绑定当前 <code>draftId</code> 的实例 ID，不强制对应题库 <code>questionId</code>。</td><td>同左栏「＋」/「全部选用」或 AI 组题结果选用，<strong>直接进入画布</strong>并参与题号；可在画布内继续富文本编辑（§9.3）。</td></tr>
        </tbody></table></div>
        <p>同一题单可<strong>结构化与非结构化题目混排</strong>；题号从 1 连续编号。结构化 / 非结构化以<strong>进入画布时</strong>服务端或题单快照中的数据形态为准，而非用户是否在画布内改过字。</p>
        <div class="prd-note"><strong>上传文件 → 结构化</strong>：上传不绕过题库直写画布；AI 解析<strong>成功</strong>后，拆题结果带完整字段入库「我的题库」，<strong>即按结构化题目</strong>管理。用户从「我的题库」或上传记录详情选用加入画布时，走 §9.1 结构化题目规则。解析失败或仅部分字段缺失时走 §8.2 重试/补全，不得将未解析成功的片段当作结构化题入库。</div>

        <h4>9.2 拖拽排序</h4>
        <ul>
          <li>画布内每道<strong>已确认题</strong>支持通过<strong>拖拽题块</strong>（建议拖拽手柄或题号区域）调整顺序；拖动过程中给出插入位置指示线/占位。</li>
          <li><strong>松手即生效</strong>：更新 draft 内题目数组顺序，题号 1…N 立即重算；触发自动保存。</li>
          <li>拖拽仅改变<strong>卷内顺序</strong>，不改变题库原题、知识库题单内容。</li>
          <li>展开中的「答/作答区设置」浮层不参与拖拽或拖拽时自动收起浮层，避免误操作。</li>
        </ul>

        <h4>9.3 单题编辑、删题与题目 ID</h4>
        <ul>
          <li><strong>题干 / 选项 / 答案 / 解析</strong>：均可点击直接编辑（富文本 + 公式，见 §9.4–§9.7）；选项按行编辑（一行一项）；展开「答」后的答案、解析区域同样可编辑并自动保存。</li>
          <li><strong>删光即删题</strong>：若用户将某题题干（及选项等主体内容）<strong>全部删空</strong>并失焦，或仅剩不可见空白，视为<strong>移除整道题</strong>（等同点击删除按钮）：从 draft 删除该题、重排题号、更新总分；若该题曾关联 <code>sourceId</code>，左侧「已加入 · 第 N 题」同步解除（§7.2）。</li>
          <li><strong>显式删除</strong>：题卡工具区提供删除；二次确认（可选，产品定）；删除后同样重排题号。</li>
          <li><strong>修改后题目 ID</strong>：用户对某道已确认题做了<strong>实质内容变更</strong>（题干/选项相对入库快照不一致）时：<strong>解除</strong>与来源题的 <code>sourceId</code> 关联；并为画布内该题实例分配<strong>新的画布题目 ID</strong>（<code>sheetQuestionId</code> / 新 UUID），视为卷内<strong>新题目实体</strong>，可再次从左侧重复添加原题库题。服务端若需同步题库，走「另存为新题」而非覆盖原 <code>questionId</code>。</li>
          <li>仅修改排版（字号、加粗、公式插入、作答区行数等）且语义文本未变：不视为新题，不更换 ID、不解除 <code>sourceId</code>。</li>
        </ul>

        <h4>9.4 整卷排版工具栏（使用方式）</h4>
        <p>工具栏固定在画布上方、卷面滚动区之上，<strong>水平居中</strong>。作用范围如下：</p>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>控件</th><th>作用范围</th><th>行为</th></tr></thead><tbody>
          <tr><td>字号</td><td>整卷默认</td><td>下拉：小五 / 五号 / 小四 / 四号等；改变卷面 CSS 变量，新输入继承。</td></tr>
          <tr><td>行间距</td><td>整卷题干行距</td><td>1.0 / 1.5 / 2.0 档；影响卷内文字段落，不影响作答区内部行高。</td></tr>
          <tr><td>作答区行高</td><td>所有已插入作答区</td><td>统一调整空白/横线作答区的单行高度倍数。</td></tr>
          <tr><td>题间距</td><td>题与题之间</td><td>控制相邻题目块垂直间距（如 0.5 / 1.0 / 1.5 档）。</td></tr>
        </tbody></table></div>
        <p>题单<strong>标题</strong>可在卷面直接编辑并自动保存。<strong>学校 / 班级 / 姓名</strong>栏<strong>不在画布展示</strong>，仅在<strong>下载 Word / PDF</strong>时自动插入卷首（固定下划线占位，供打印后手写）。题目默认<strong>紧凑排列</strong>，不画整题分隔横线（除非用户插入）。</p>

        <h4>9.5 作答区</h4>
        <ul>
          <li>每题工具区「作答区」按钮：打开<strong>设置浮层</strong>（非整页跳转）。</li>
          <li>样式二选一：<strong>空白区</strong>（适合作图/草稿）、<strong>横线区</strong>（适合文字作答）；可设<strong>行数</strong>（步进或输入）。</li>
          <li>确认后作答区<strong>持久显示</strong>在题块下方；仅设置浮层在点击外部或失焦后收起，作答区不消失。</li>
          <li>浮层内「清除」移除该题全部作答区；清除后保存。</li>
        </ul>

        <h4>9.6 浮动富文本条（加粗 / 斜体 / 下划线 / 公式 / 符号）</h4>
        <p>在题干、选项、答案、解析等<strong>可编辑区域聚焦</strong>时，在编辑区上方出现<strong>浮动工具条</strong>（从左到右）：<strong>加粗 B</strong>、<strong>斜体 I</strong>、<strong>下划线 U</strong>、分隔线、<strong>公式 f<sub>x</sub></strong>、<strong>插入符号 Ω</strong>（§9.7）。<strong>顶栏整卷工具条不含 B/I/U</strong>，字符样式仅在此浮动条操作。</p>
        <ul>
          <li>浮动条<strong>随鼠标离开</strong>当前编辑区与浮动条本身而收起（打开公式/符号模态框期间保持可用）；失焦时保存编辑内容。</li>
          <li>B/I/U 作用于当前光标选区；无选区时对后续输入生效。</li>
        </ul>
        <h4>9.6.1 公式编辑器</h4>
        <p>点击浮动条「公式」打开<strong>公式编辑器</strong>模态框（参考产品图 2）。</p>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>区域</th><th>能力</th></tr></thead><tbody>
          <tr><td>顶栏</td><td>标题「公式编辑器」、关闭 ×；模式 Tab：<strong>可视化编辑</strong>（默认）、<strong>表格模式</strong>（LaTeX/表格输入，与可视化双向同步或只读预览，以实现为准）。</td></tr>
          <tr><td>工具条</td><td>撤销 / 重做；结构模板（根号、分式、上下标、括号、矩阵、求和/积分/极限等）；符号分页（运算、关系、希腊字母、箭头、大型运算等）。</td></tr>
          <tr><td>编辑区</td><td>中央 WYSIWYG 公式预览区，点击模板后在占位框内继续输入；支持键盘导航与删除。</td></tr>
          <tr><td>右侧库</td><td><strong>学科公式</strong> / <strong>公式组</strong> Tab；按学科（如数学）列出常用公式（圆面积、梯形面积、体积等），点击<strong>插入到当前光标</strong>。</td></tr>
          <tr><td>底部</td><td><strong>取消</strong>关闭且不改动；<strong>确认</strong>将公式以<strong>内联公式对象</strong>（MathML/LaTeX 存储 + 渲染）写回画布光标处，并触发自动保存。</td></tr>
        </tbody></table></div>
        <ul>
          <li>公式与纯文本混排；导出 PDF/Word 时需保留公式渲染或降级策略（产品/export 联调定义）。</li>
          <li>双击已有公式可再次打开编辑器修改；删除公式块等同删除字符。</li>
        </ul>

        <h4>9.7 插入符号</h4>
        <p>点击浮动条「插入符号」，打开<strong>插入符号</strong>模态框（参考产品图 3）。</p>
        <ul>
          <li>顶部分类 Tab：<strong>数学、序号、括号、拉丁、拼音、特殊字符</strong>等；切换 Tab 刷新下方符号网格。</li>
          <li>符号以<strong>网格按钮</strong>展示，支持滚动；点击某一符号即<strong>插入到当前编辑区光标位置</strong>并关闭弹窗（或保持打开连续插入，产品二选一，默认插入后关闭）。</li>
          <li>数学类含运算、关系、集合、微积分、希腊字母、单位等；序号类含带圈数字、罗马数字等；拼音类含声调字母组合。</li>
          <li>插入的是 Unicode 字符或专用字形，与 §9.6 公式对象区分：简单符号不走公式编辑器。</li>
        </ul>

        <h4>9.8 答案、解析与选题联动</h4>
        <ul>
          <li>题卡「答」：展开/收起<strong>答案与解析</strong>（教师卷预览）；默认收起，不影响学生版导出。</li>
          <li>展开后答案、解析均为<strong>可编辑</strong>富文本，修改写入当前 draft；实质变更时按 §9.3 解除 <code>sourceId</code> 并更换画布题目 ID。</li>
          <li>点击题块可选中（高亮），供「替换式 AI 改编」等能力定位目标题（与左侧 §7.1 改编流程衔接）。</li>
        </ul>

        <h4>9.9 保存、新建与导出</h4>
        <ul>
          <li>题干、排版、顺序、作答区、标题等变更<strong>自动保存</strong>至当前 draft；顶栏展示最近保存时间；失败时 §10 提示「未保存」并可重试。</li>
          <li>题单标题可编辑；默认名为<strong>未命名题单</strong>。新建多份未改标题时系统自动递增：<strong>未命名题单</strong> → <strong>未命名题单 2</strong> → <strong>未命名题单 3</strong>…（按本地已存 draft 占用序号，避免重名）。</li>
          <li>画布顶栏仅展示<strong>共 N 题</strong>，<strong>不展示卷面总分</strong>；题目标题下不再展示学科/题量/分值副标题行。</li>
          <li>画布顶栏 <strong>＋（新建组题）</strong> 行为见下条「知识库编辑与 ＋ 切换」；常规情况下先自动保存当前题单，再新建空白题单。</li>
          <li><strong>知识库编辑与 ＋ 切换</strong>：在「我的云盘 → 我的组题」对<strong>题单 A</strong>点<strong>编辑</strong>后，右侧画布<strong>直接加载 A</strong>。若进入前当前最新画布<strong>题单 B 已有题目</strong>，系统<strong>先自动保存 B</strong>再打开 A，并记住 B；此时再点画布 <strong>＋</strong> → <strong>打开刚保存的 B</strong>（非新建空白）。若进入编辑 A 时，当前最新画布<strong>为空</strong>（无已确认题），则点 <strong>＋</strong> → <strong>新建空白题单</strong>。从 B 切回或新建完成后，后续 <strong>＋</strong> 恢复为「保存当前卷 + 新建空白」默认逻辑。</li>
          <li>「下载题单」：点击后弹出确认框；<strong>确定</strong>默认下载<strong>一份 Word（.doc）</strong>，<strong>题目与答案、解析合并在同一文件</strong>，卷首含学校/班级/姓名栏；<strong>取消</strong>关闭弹窗不下载。</li>
          <li>自动保存写入「我的知识库 → 我的组题」规则见知识库 PRD；画布编辑不触发题库原题变更。</li>
        </ul>

        <div class="prd-note">Demo 已实现：整卷排版工具栏（字号/行距/作答区/题间距）、浮动条 <strong>B/I/U + f<sub>x</sub> + Ω</strong>（鼠标离开收起）、题干/选项/答案/解析可编辑、公式与符号模态框、删空即删题、未命名题单递增、下载卷首学籍栏。<strong>拖拽排序、表格模式公式、完整 LaTeX 渲染</strong>仍待对齐。</div>
      </section>
      <section class="prd-section">
        <h3>10. 工作台状态与异常</h3>
        <ul><li>空画布：给出从题库、更多题源、AI补题三个明确入口。</li><li>加载中：保留布局骨架，禁止重复加题；单个卡片失败不阻断列表。</li><li>保存失败：顶部提示“未保存”，支持重试；不得伪装成已保存。</li><li>并发编辑：本期至少用更新时间检测覆盖风险，冲突时提示保留本地或加载新版本。</li><li>题目失效：画布已有副本仍可编辑；来源处显示已下架，不允许再次添加。</li></ul>
      </section>`,

    knowledge: `
      <div class="prd-summary"><span>页面属性<b>存量知识库增量改造</b></span><span>本次新增<b>我的组题文件夹</b></span><span>新增操作<b>查看 / 编辑 / 删除</b></span></div>
      <section class="prd-section">
        <h3>1. 本次新增内容（基于原有我的知识库） <span class="prd-status">P0</span></h3>
        <p>“我的知识库 / 我的云盘”为已有页面，本需求不改造原有云盘能力。本次围绕组题结果新增一个系统文件夹、一类题单列表、三项列表操作及一个题单预览页面。</p>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>新增位置</th><th>新增内容</th><th>说明</th></tr></thead><tbody>
          <tr><td>我的云盘文件夹列表</td><td>在“我的工作成果”下面新增“我的组题”文件夹。</td><td>汇总用户在<strong>组题工作台画布</strong>自动保存的题单；不含 AI 组题单独生成的题单。</td></tr>
          <tr><td>我的组题文件夹内</td><td>新增题单列表。</td><td>展示题单名称、学段/学科/题数、更新时间；不展示“来源”列。</td></tr>
          <tr><td>每份题单操作区</td><td>新增“查看、编辑、删除”三个按钮。</td><td>查看留在知识库；编辑跳转工作台右侧画布；删除执行二次确认和软删除。</td></tr>
          <tr><td>点击“查看”后</td><td>新增知识库内题单预览页。</td><td>顶部新增“编辑、分享、下载”，编辑按钮放在分享前。</td></tr>
        </tbody></table></div>
        <div class="prd-note">“我的组题”为系统目录：用户可查看内容，但不可重命名、移动或删除文件夹本身。</div>
        <h4>排序</h4><p>系统文件夹顺序固定：我的工作成果 → 我的组题 → 对话中上传的文件。文件夹内题单默认按更新时间倒序。</p>
      </section>
      <section class="prd-section">
        <h3>2. 题单入库规则</h3>
        <ul>
          <li>用户在组题工作台画布<strong>首次自动保存</strong>后写入「我的组题」；后续自动保存更新同一条记录，不重复创建。</li>
          <li>「让 AI 帮我组题」产出的题目只加入当前画布（及工作台内 AI 生成记录），<strong>不</strong>自动写入「我的组题」文件夹。</li>
          <li>同一 <code>paperId</code> 只保留一条，标题相同但ID不同允许并存。</li>
          <li>列表至少返回：paperId、标题、学段学科、题数、更新时间、状态、权限、可下载格式。</li>
        </ul>
      </section>
      <section class="prd-section">
        <h3>3. 文件夹与列表状态</h3>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>状态</th><th>展示</th><th>可执行操作</th></tr></thead><tbody>
          <tr><td>0份题单</td><td>空状态「还没有组题」，说明在组题工作台画布组题并自动保存后会出现在这里。</td><td>「去组题」跳转工作台新建态。</td></tr>
          <tr><td>有数据</td><td>题单名称、学科/年级/题数、更新时间；不展示“来源”列。</td><td>查看、编辑、删除。</td></tr>
          <tr><td>加载中</td><td>列表骨架屏，保留表头。</td><td>禁用写操作。</td></tr>
          <tr><td>加载失败</td><td>错误说明和重试。</td><td>重试保持搜索词。</td></tr>
          <tr><td>搜索无结果</td><td>“未找到相关题单”。</td><td>清空搜索。</td></tr>
        </tbody></table></div>
      </section>
      <section class="prd-section">
        <h3>4. 列表按钮与跳转</h3>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>按钮</th><th>目标行为</th><th>验收规则</th></tr></thead><tbody>
          <tr><td>查看</td><td>仍停留在我的知识库，打开该题单的只读文档预览。</td><td>URL/状态保留paperId；浏览器返回回到原列表位置。</td></tr>
          <tr><td>编辑</td><td>跳转组题工作台，以 <code>paperId</code> 载入，<strong>右侧组题画布直接打开该题单</strong>（非左侧预览）。若工作台当前画布另有题单且<strong>已有题目</strong>，<strong>先自动保存</strong>再切换；并支持通过画布 <strong>＋</strong> 切回刚保存的题单（规则见工作台 §9.9）。</td><td>不得打开错误题单；进入前保存知识库列表状态。</td></tr>
          <tr><td>删除</td><td>二次确认后移入回收站或软删除。</td><td>成功后移除并更新数量；失败恢复；当前打开题单被删除时给出提示。</td></tr>
        </tbody></table></div>
      </section>
      <section class="prd-section">
        <h3>5. 知识库内预览页</h3>
        <p>顶部从左到右：返回、面包屑、搜索、编辑、分享、下载。编辑必须位于分享之前。</p>
        <ul>
          <li>返回：回“我的组题”列表，并恢复搜索、滚动位置和排序。</li>
          <li>编辑：跳转工作台，右侧组题画布打开当前题单（与列表「编辑」同一套切换与 ＋ 规则）。</li>
          <li>分享：创建只读分享链接；生成中显示loading；成功后可复制链接；无权限时说明原因。</li>
          <li>下载：默认下载DOCX；如支持多格式则弹出学生版/教师版及DOCX/PDF选择。</li>
          <li>预览正文：显示题单标题、元信息、题目与选项；只读，不展示画布编辑控件。</li>
        </ul>
      </section>
      <section class="prd-section">
        <h3>6. 删除、分享与权限边界</h3>
        <ul><li>删除使用软删除并支持撤销；被分享题单删除后，外链进入失效页。</li><li>只有拥有者可编辑/删除；协作者权限由服务端返回，前端不自行推断。</li><li>分享链接默认只读，不暴露答案时需明确选择学生版；教师版分享须二次确认。</li><li>下载失败保留预览页并支持重试；文件名使用题单标题并过滤非法字符。</li></ul>
      </section>
      <section class="prd-section"><h3>7. 知识库验收场景</h3><ul><li>新用户空目录；1条、多条、重名题单；搜索无结果。</li><li>画布自动保存后题单出现在列表；改名/增删题后列表同步题数与更新时间；仅 AI 组题不出现于此文件夹。</li><li>查看留在知识库；编辑进入工作台右侧指定画布；返回状态正确。</li><li>分享成功/失败/无权限，下载学生版/教师版，删除取消/成功/失败/撤销。</li></ul></section>`
  }

  const TRIGGER_POS_KEY = 'feixiang-prd-trigger-pos'
  const DRAWER_POS_KEY = 'feixiang-prd-drawer-pos'

  function readPos(key) {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return null
      const pos = JSON.parse(raw)
      if (typeof pos.left === 'number' && typeof pos.top === 'number') return pos
    } catch (_) { /* ignore */ }
    return null
  }

  function writePos(key, left, top) {
    try { localStorage.setItem(key, JSON.stringify({ left, top })) } catch (_) { /* ignore */ }
  }

  function clampEl(el, left, top) {
    const rect = el.getBoundingClientRect()
    const w = rect.width || el.offsetWidth || 120
    const h = rect.height || el.offsetHeight || 40
    const maxLeft = Math.max(8, window.innerWidth - w - 8)
    const maxTop = Math.max(8, window.innerHeight - h - 8)
    return {
      left: Math.min(maxLeft, Math.max(8, left)),
      top: Math.min(maxTop, Math.max(8, top)),
    }
  }

  function applyFixedPos(el, pos) {
    if (!pos) return false
    const next = clampEl(el, pos.left, pos.top)
    el.style.right = 'auto'
    el.style.bottom = 'auto'
    el.style.left = `${next.left}px`
    el.style.top = `${next.top}px`
    return true
  }

  function bindDrag({ handle, target, storageKey, onTap, ignore }) {
    let startX = 0
    let startY = 0
    let originLeft = 0
    let originTop = 0
    let pointerId = null
    let moved = false

    const onMove = (event) => {
      if (event.pointerId !== pointerId) return
      const dx = event.clientX - startX
      const dy = event.clientY - startY
      if (!moved && Math.hypot(dx, dy) < 5) return
      moved = true
      event.preventDefault()
      const next = clampEl(target, originLeft + dx, originTop + dy)
      target.style.right = 'auto'
      target.style.bottom = 'auto'
      target.style.left = `${next.left}px`
      target.style.top = `${next.top}px`
      target.classList.add('is-dragging')
    }

    const end = (event) => {
      if (event.pointerId !== pointerId) return
      handle.releasePointerCapture?.(pointerId)
      handle.removeEventListener('pointermove', onMove)
      handle.removeEventListener('pointerup', end)
      handle.removeEventListener('pointercancel', end)
      target.classList.remove('is-dragging')
      if (moved) {
        const left = parseFloat(target.style.left) || 0
        const top = parseFloat(target.style.top) || 0
        writePos(storageKey, left, top)
      } else if (onTap) {
        onTap(event)
      }
      pointerId = null
    }

    handle.addEventListener('pointerdown', (event) => {
      if (ignore?.(event.target)) return
      if (event.button !== 0) return
      const rect = target.getBoundingClientRect()
      target.style.right = 'auto'
      target.style.bottom = 'auto'
      target.style.left = `${rect.left}px`
      target.style.top = `${rect.top}px`
      startX = event.clientX
      startY = event.clientY
      originLeft = rect.left
      originTop = rect.top
      moved = false
      pointerId = event.pointerId
      handle.setPointerCapture(pointerId)
      handle.addEventListener('pointermove', onMove)
      handle.addEventListener('pointerup', end)
      handle.addEventListener('pointercancel', end)
    })
  }

  const labels = { home: '首页', teachingCompose: '教学技能·AI组题', workbench: '组题工作台', knowledge: '我的知识库' }
  const currentContext = () => {
    if (/workbench\.html$/i.test(location.pathname) || document.body.classList.contains('fx-question-workbench-v3-open')) return 'workbench'
    const knowledge = document.querySelector('#knowledgePanel')
    if (knowledge && !knowledge.hidden) return 'knowledge'
    if (
      document.body.classList.contains('composition-mode')
      || window.FxPracticeDemo?.hasActivePaper?.()
      || window.FxPracticeDemo?.isComposeEntry?.()
    ) return 'teachingCompose'
    return 'home'
  }

  function mount() {
    if (document.querySelector('.prd-trigger')) return
    const trigger = document.createElement('button')
    trigger.type = 'button'
    trigger.className = 'prd-trigger'
    trigger.setAttribute('aria-haspopup', 'dialog')
    trigger.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3.5h9l3 3V20H6z"/><path d="M15 3.5V7h3M9 11h6M9 14h6M9 17h4"/></svg><span>需求说明</span>'

    const drawer = document.createElement('aside')
    drawer.className = 'prd-drawer'
    drawer.setAttribute('role', 'dialog')
    drawer.setAttribute('aria-modal', 'false')
    drawer.setAttribute('aria-label', '产品需求说明')
    drawer.innerHTML = `<header class="prd-drawer-head"><div class="prd-drawer-title"><div><small>PRODUCT REQUIREMENTS · 研发交付版</small><h2>飞象老师组题链路 PRD</h2><p>可拖动标题栏移动窗口 · 覆盖 Demo 页面、规则与跳转</p></div><button type="button" class="prd-close" aria-label="关闭需求说明">×</button></div><nav class="prd-tabs">${Object.entries(labels).map(([key,label]) => `<button type="button" data-prd-tab="${key}">${label}</button>`).join('')}</nav></header><div class="prd-body"></div>`
    document.body.append(trigger, drawer)

    applyFixedPos(trigger, readPos(TRIGGER_POS_KEY))
    applyFixedPos(drawer, readPos(DRAWER_POS_KEY))

    const drawerHead = drawer.querySelector('.prd-drawer-head')
    const alignDrawerNearTrigger = () => {
      const tr = trigger.getBoundingClientRect()
      const w = drawer.offsetWidth || 560
      let left = tr.right - w
      let top = tr.bottom + 8
      if (left < 8) left = 8
      if (top + 320 > window.innerHeight) top = Math.max(8, tr.top - Math.min(drawer.offsetHeight || 480, window.innerHeight - 16))
      applyFixedPos(drawer, clampEl(drawer, left, top))
    }

    const body = drawer.querySelector('.prd-body')
    const setContext = key => {
      const context = documents[key] ? key : 'home'
      drawer.dataset.context = context
      drawer.querySelectorAll('[data-prd-tab]').forEach(button => button.classList.toggle('active', button.dataset.prdTab === context))
      body.innerHTML = documents[context]
      body.scrollTop = 0
    }
    const close = () => {
      drawer.classList.remove('open')
      trigger.classList.remove('is-open')
      trigger.setAttribute('aria-expanded', 'false')
      trigger.focus()
    }
    const open = () => {
      setContext(currentContext())
      drawer.classList.add('open')
      trigger.classList.add('is-open')
      trigger.setAttribute('aria-expanded', 'true')
      if (!readPos(DRAWER_POS_KEY)) window.requestAnimationFrame(() => alignDrawerNearTrigger())
      drawer.querySelector('.prd-close')?.focus()
    }

    bindDrag({
      handle: trigger,
      target: trigger,
      storageKey: TRIGGER_POS_KEY,
      onTap: open,
    })

    bindDrag({
      handle: drawerHead,
      target: drawer,
      storageKey: DRAWER_POS_KEY,
      ignore: (target) => Boolean(target.closest('.prd-close, .prd-tabs, .prd-tabs button')),
    })

    drawer.querySelector('.prd-close').addEventListener('click', close)
    drawer.querySelectorAll('[data-prd-tab]').forEach(button => button.addEventListener('click', () => setContext(button.dataset.prdTab)))
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && drawer.classList.contains('open')) close() })
    window.addEventListener('resize', () => {
      applyFixedPos(trigger, readPos(TRIGGER_POS_KEY) || { left: trigger.getBoundingClientRect().left, top: trigger.getBoundingClientRect().top })
      if (drawer.classList.contains('open')) {
        applyFixedPos(drawer, readPos(DRAWER_POS_KEY) || { left: drawer.getBoundingClientRect().left, top: drawer.getBoundingClientRect().top })
      }
    })
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true })
  else mount()
})()

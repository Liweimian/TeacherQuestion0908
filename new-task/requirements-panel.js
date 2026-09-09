(() => {
  const shared = `
    <section class="prd-section">
      <h3>通用数据、权限与异常约定</h3>
      <ul>
        <li>题目唯一键使用 <code>questionId</code>；题单唯一键使用 <code>paperId</code>。跨页面跳转必须传递 ID，不以标题匹配。</li>
        <li>分页接口至少返回 <code>items / page / pageSize / total / hasMore</code>；前端是否展示解锁入口以 <code>total &gt; 20</code> 为准，不能用“本页恰好20条”推断。</li>
        <li>积分由服务端校验和扣减。确认解锁按钮需防重复提交；超时后先查订单结果，不得重复扣分。</li>
        <li>所有写操作提供 loading、成功、失败反馈；失败时保留用户当前页面、筛选与已选题目，可重试。</li>
        <li>页面跳转前保存草稿；返回时恢复来源、知识点、筛选、页码、滚动位置和已展开答案。</li>
        <li>官方题库解锁权益须在首页选择器与组题工作台共享；同一用户、学科、知识点及内容版本已解锁后，另一入口不得重复收费。</li>
      </ul>
      <h4>建议接口与错误码</h4>
      <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>能力</th><th>必要输入/输出</th><th>失败处理</th></tr></thead><tbody>
        <tr><td>题目列表</td><td>输入来源、学科、知识点、筛选、page；输出items、total、hasMore、entitlement。</td><td>保留筛选并原位重试。</td></tr>
        <tr><td>积分解锁</td><td>输入scopeKey与幂等键；输出扣减结果、余额、可访问页数。</td><td><code>INSUFFICIENT_POINTS</code> 引导获取积分；重复幂等键返回原结果。</td></tr>
        <tr><td>题单保存</td><td>输入paperId、版本号、内容与格式；输出新版本号、updatedAt。</td><td><code>VERSION_CONFLICT</code> 提示冲突处理，不静默覆盖。</td></tr>
      </tbody></table></div>
    </section>
    <section class="prd-section">
      <h3>埋点与验收基线</h3>
      <p>建议事件：需求说明打开、加题入口点击、题库曝光、筛选、查看答案、AI改编、选题/取消、解锁曝光/确认/结果、翻页、题单查看/编辑/分享/下载/删除、画布保存/导出。</p>
      <ul>
        <li>所有按钮均支持键盘聚焦，有明确的 hover、disabled、loading 状态和可读名称。</li>
        <li>浏览器刷新不丢已保存题单；同一题不重复加入；连续快速点击不会重复扣积分或创建重复题单。</li>
        <li>桌面端 1280px 及以上按设计稿验收；窄屏时抽屉可滚动且不遮挡自身关闭按钮。</li>
      </ul>
    </section>`

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
          <li>左侧：学段学科、官方题库/我的题库、知识点树及数量。</li>
          <li>右侧：题型、难度、关键词搜索、题目卡片、分页或解锁提示。</li>
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
        <div class="prd-note warn">解锁维度建议为“用户 + 题库来源 + 学科 + 知识点/检索条件 + 内容版本”。同一范围在有效期内只扣一次；改变知识点或检索范围后按服务端权益结果决定是否重新解锁。</div>
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
          <tr><td>AI改编</td><td>基于原题生成候选变式题，原题不自动加入。</td><td>生成中、成功、失败/重试；用户选定后才计入已选。</td></tr>
          <tr><td>＋ / ✓</td><td>选择或取消当前题目。</td><td>选中后显示“已加入·第N题”；重复点击为取消，不得产生重复ID。</td></tr>
        </tbody></table></div>
      </section>
      <section class="prd-section"><h3>7. 首页验收场景</h3><ul><li>分别验证首页＋、AI组题后＋均进入同一选择器。</li><li>分别构造0、7、20、21、40、41、60、61题数据检查底部状态。</li><li>验证余额不足、重复确认、接口超时、跨页选题、筛选后返回、取消和加入对话。</li><li>加入完成后仍在首页，正确显示“已选N道题”。</li></ul></section>${shared}`,

    workbench: `
      <div class="prd-summary"><span>页面目标<b>多来源组题与编排</b></span><span>核心区域<b>左题库 / 右画布</b></span><span>保存目标<b>我的组题</b></span></div>
      <section class="prd-section">
        <h3>1. 页面定位与信息架构 <span class="prd-status">P0</span></h3>
        <p>组题工作台为新增页面。左侧负责找题、预览题源与AI组题过程，右侧为当前题单画布。顶部来源页签包含“题库”和“更多题源”。</p>
        <ul><li>题库：官方题库、我的题库，支持学科/知识点/题型/难度/搜索。</li><li>更多题源：上传文件、从我的知识库添加、让AI帮我组题。</li><li>右侧画布：展示已确认题目、待确认题、答案解析及作答区，自动保存。</li></ul>
      </section>
      <section class="prd-section">
        <h3>2. 进入与退出</h3>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>入口</th><th>打开结果</th><th>返回</th></tr></thead><tbody>
          <tr><td>首页明确进入工作台</td><td>新建或恢复最近草稿；左侧默认官方题库，右侧显示当前画布。</td><td>退出回首页，先保存草稿。</td></tr>
          <tr><td>知识库“编辑”</td><td>以 <code>paperId</code> 激活指定题单，右侧画布直接打开该题单。</td><td>返回知识库时仍定位“我的组题”。</td></tr>
          <tr><td>历史AI组题/上传记录</td><td>左侧打开对应记录页；右侧保留当前画布。</td><td>关闭动态页签回题库。</td></tr>
        </tbody></table></div>
      </section>
      <section class="prd-section">
        <h3>3. 左侧题库与数量规则</h3>
        <p>官方题库严格复用首页题库的数量、积分和分页规则：每页20题、一次消耗20积分、最多3页/60题。不得在两个入口实现两套口径。</p>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>数量</th><th>工作台行为</th><th>验收重点</th></tr></thead><tbody>
          <tr><td>0</td><td>空状态；无解锁、无分页。</td><td>右侧已有题目不受影响。</td></tr>
          <tr><td>1–19</td><td>完整显示；无解锁。</td><td>卡片数量等于返回数量。</td></tr>
          <tr><td>20</td><td>仅在服务端 <code>hasMore=true</code> 时显示解锁。</td><td>不能仅按20条判断有下一页。</td></tr>
          <tr><td>&gt;20</td><td>底部为纯文本行，解锁按钮紧跟文案；解锁后显示页码。</td><td>上限60、只扣一次、末页禁用下一页。</td></tr>
        </tbody></table></div>
        <p>筛选变化回第1页；解锁权益读取服务端；翻页不清空已选或右侧画布。我的题库默认不走积分解锁。</p>
      </section>
      <section class="prd-section">
        <h3>4. 题目卡片交互</h3>
        <ul>
          <li>默认隐藏标签和操作，悬浮/聚焦显示“答、AI改编、＋”。</li>
          <li>“答”原位展开答案与解析；再次点击收起。所有题目卡片行为一致。</li>
          <li>“AI改编”展示快捷要求与自定义输入，生成候选题；选用后加入右侧，不替换原题，除非入口明确为“替换”。</li>
          <li>“＋”加入右侧画布并显示题号；“✓”取消选用时需从画布删除对应题，并重新编号。</li>
          <li>我的题库可额外提供删除；删除前确认，若题目已在画布中，画布副本不随来源删除。</li>
        </ul>
      </section>
      <section class="prd-section">
        <h3>5. 更多题源</h3>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>入口</th><th>产品定义</th><th>完成态</th></tr></thead><tbody>
          <tr><td>上传文件</td><td>上传题目与答案文件，AI识别、拆题、提取答案并自动打标，一键生成个人题库。</td><td>题目自动进入我的题库，可逐题或全部加入画布。</td></tr>
          <tr><td>从我的知识库添加</td><td>读取已保存的题单，支持整份预览、逐题选用、全部选用。</td><td>加入当前画布，来源题单不变。</td></tr>
          <tr><td>让AI帮我组题</td><td>根据题量、知识点、题型、难度和时长生成完整候选题单。</td><td>支持逐题/全部加入；生成记录保存到“我的组题”。</td></tr>
        </tbody></table></div>
      </section>
      <section class="prd-section">
        <h3>6. 右侧组题画布</h3>
        <h4>整卷工具栏</h4><p>控件水平居中，依次为：字号、加粗、斜体、下划线、行间距、作答区行高、题间距。图标与交互参考石墨风格，但功能仅使用本产品定义；不提供“页面排版”。</p>
        <h4>单题操作</h4><ul><li>题干可直接编辑；题目默认紧凑排列，不显示横线。</li><li>作答区按钮打开浮层，可选“空白区/带横线作答区”、自定义行数、清除作答区。</li><li>已插入作答区在鼠标离开后继续显示；仅设置浮层自动收起。</li><li>“答”在画布题卡中同样展开答案和解析；删除题目后连续重排题号。</li></ul>
        <h4>保存与导出</h4><p>内容与格式变更自动保存，并显示保存时间；离开页面前做一次兜底保存。导出学生版时不含答案解析，教师版按配置包含答案解析。</p>
      </section>
      <section class="prd-section">
        <h3>7. 工作台状态与异常</h3>
        <ul><li>空画布：给出从题库、更多题源、AI补题三个明确入口。</li><li>加载中：保留布局骨架，禁止重复加题；单个卡片失败不阻断列表。</li><li>保存失败：顶部提示“未保存”，支持重试；不得伪装成已保存。</li><li>并发编辑：本期至少用更新时间检测覆盖风险，冲突时提示保留本地或加载新版本。</li><li>题目失效：画布已有副本仍可编辑；来源处显示已下架，不允许再次添加。</li></ul>
      </section>
      <section class="prd-section"><h3>8. 工作台验收场景</h3><ul><li>验证0/&lt;20/=20/&gt;20题、积分不足与三页边界。</li><li>验证跨页加入/取消、答案展开、AI改编候选选用、我的题库删除。</li><li>验证每个格式控件影响整张画布；作答区空白/横线、1至多行及清除。</li><li>验证自动保存、刷新恢复、从知识库“编辑”打开指定题单。</li></ul></section>${shared}`,

    knowledge: `
      <div class="prd-summary"><span>页面属性<b>存量知识库增量改造</b></span><span>本次新增<b>我的组题文件夹</b></span><span>新增操作<b>查看 / 编辑 / 删除</b></span></div>
      <section class="prd-section">
        <h3>1. 本次新增内容（基于原有我的知识库） <span class="prd-status">P0</span></h3>
        <p>“我的知识库 / 我的云盘”为已有页面，本需求不改造原有云盘能力。本次围绕组题结果新增一个系统文件夹、一类题单列表、三项列表操作及一个题单预览页面。</p>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>新增位置</th><th>新增内容</th><th>说明</th></tr></thead><tbody>
          <tr><td>我的云盘文件夹列表</td><td>在“我的工作成果”下面新增“我的组题”文件夹。</td><td>汇总所有AI组题生成并保存的题单，以及用户在组题画布保存的题单。</td></tr>
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
          <li>AI生成完整题单成功后自动入库；生成中的任务不进入正式列表，可在生成记录查看。</li>
          <li>用户在组题画布首次保存后入库；后续自动保存更新原记录，不重复创建。</li>
          <li>同一 <code>paperId</code> 只保留一条，标题相同但ID不同允许并存。</li>
          <li>列表至少返回：paperId、标题、学段学科、题数、更新时间、状态、权限、可下载格式。</li>
        </ul>
      </section>
      <section class="prd-section">
        <h3>3. 文件夹与列表状态</h3>
        <div class="prd-table-wrap"><table class="prd-table"><thead><tr><th>状态</th><th>展示</th><th>可执行操作</th></tr></thead><tbody>
          <tr><td>0份题单</td><td>空状态“还没有组题”，说明AI组题或保存画布后会出现在这里。</td><td>“去组题”跳转工作台新建态。</td></tr>
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
          <tr><td>编辑</td><td>跳转组题工作台，以paperId载入，右侧画布直接打开该题单。</td><td>不得打开错误题单；进入前保存知识库列表状态。</td></tr>
          <tr><td>删除</td><td>二次确认后移入回收站或软删除。</td><td>成功后移除并更新数量；失败恢复；当前打开题单被删除时给出提示。</td></tr>
        </tbody></table></div>
      </section>
      <section class="prd-section">
        <h3>5. 知识库内预览页</h3>
        <p>顶部从左到右：返回、面包屑、搜索、编辑、分享、下载。编辑必须位于分享之前。</p>
        <ul>
          <li>返回：回“我的组题”列表，并恢复搜索、滚动位置和排序。</li>
          <li>编辑：跳转工作台，右侧画布打开当前题单。</li>
          <li>分享：创建只读分享链接；生成中显示loading；成功后可复制链接；无权限时说明原因。</li>
          <li>下载：默认下载DOCX；如支持多格式则弹出学生版/教师版及DOCX/PDF选择。</li>
          <li>预览正文：显示题单标题、元信息、题目与选项；只读，不展示画布编辑控件。</li>
        </ul>
      </section>
      <section class="prd-section">
        <h3>6. 删除、分享与权限边界</h3>
        <ul><li>删除使用软删除并支持撤销；被分享题单删除后，外链进入失效页。</li><li>只有拥有者可编辑/删除；协作者权限由服务端返回，前端不自行推断。</li><li>分享链接默认只读，不暴露答案时需明确选择学生版；教师版分享须二次确认。</li><li>下载失败保留预览页并支持重试；文件名使用题单标题并过滤非法字符。</li></ul>
      </section>
      <section class="prd-section"><h3>7. 知识库验收场景</h3><ul><li>新用户空目录；1条、多条、重名题单；搜索无结果。</li><li>AI组题完成自动出现，画布改名/增删题后列表同步题数与更新时间。</li><li>查看留在知识库；编辑进入工作台右侧指定画布；返回状态正确。</li><li>分享成功/失败/无权限，下载学生版/教师版，删除取消/成功/失败/撤销。</li></ul></section>${shared}`
  }

  const labels = { home: '首页', workbench: '组题工作台', knowledge: '我的知识库' }
  const currentContext = () => {
    if (/workbench\.html$/i.test(location.pathname) || document.body.classList.contains('fx-question-workbench-v3-open')) return 'workbench'
    const knowledge = document.querySelector('#knowledgePanel')
    if (knowledge && !knowledge.hidden) return 'knowledge'
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
    drawer.innerHTML = `<header class="prd-drawer-head"><div class="prd-drawer-title"><div><small>PRODUCT REQUIREMENTS · 研发交付版</small><h2>飞象老师组题链路 PRD</h2><p>覆盖当前 Demo 的页面、状态、规则、跳转与验收口径</p></div><button type="button" class="prd-close" aria-label="关闭需求说明">×</button></div><nav class="prd-tabs">${Object.entries(labels).map(([key,label]) => `<button type="button" data-prd-tab="${key}">${label}</button>`).join('')}</nav></header><div class="prd-body"></div>`
    document.body.append(trigger, drawer)

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
    trigger.addEventListener('click', () => {
      setContext(currentContext())
      drawer.classList.add('open')
      trigger.classList.add('is-open')
      trigger.setAttribute('aria-expanded', 'true')
      drawer.querySelector('.prd-close')?.focus()
    })
    drawer.querySelector('.prd-close').addEventListener('click', close)
    drawer.querySelectorAll('[data-prd-tab]').forEach(button => button.addEventListener('click', () => setContext(button.dataset.prdTab)))
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && drawer.classList.contains('open')) close() })
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount, { once: true })
  else mount()
})()

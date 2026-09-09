(() => {
  const questions = [
    {id:'b1',type:'填空题',knowledge:'部分合作问题',difficulty:'较易',text:'用无人机喷洒农药、施肥等，可以极大地提高农业生产效率。农场给一片农田喷洒农药，一架小型无人机8小时能完成这片农田的喷洒任务。使用这架无人机喷洒1小时后，随即又调来了一架中型无人机加入到喷洒农药工作中，已知这架中型无人机每小时喷洒的农田面积是小型无人机的2倍。请你算一算，还需（　　）小时就能完成这片农田的农药喷洒工作。'},
    {id:'b2',type:'填空题',knowledge:'长方形',difficulty:'较易',text:'将一张长40厘米、宽24厘米的长方形纸对折后，变成两个同样大的小长方形，小长方形的长是（　）厘米，宽是（　）厘米或长是（　）厘米，宽是（　）厘米。'},
    {id:'b3',type:'选择题',knowledge:'直线、射线和线段',difficulty:'较易',text:'“有始有终”常常被用来形容一个人做事能够坚持到底，在数学上可以用这个成语来形容（　）。',options:['A. 射线','B. 直线','C. 线段','D. 以上都可以']},
    {id:'b4',type:'选择题',knowledge:'线段',difficulty:'较易',text:'把一条长3厘米的线段向两端各延长3厘米，得到一条（　）。',options:['A. 直线','B. 线段','C. 射线','D. 无法确定']},
    {id:'b5',type:'选择题',knowledge:'三位数乘两位数',difficulty:'较易',text:'要使256×□的积是一个四位数，□里最大可以填（　）。',options:['A. 37','B. 38','C. 39','D. 40']},
    {id:'b6',type:'填空题',knowledge:'因数末尾有0',difficulty:'中等',text:'12×13×14×15×16×17×18×19×20，积的末尾有（　　）个0。'},
    {id:'b7',type:'解答题',knowledge:'同向追及问题',difficulty:'中等',text:'共享单车作为一种低碳、绿色的出行方式，俨然成为市民出行的“新宠”。甲、乙两人骑共享单车环岛行，甲骑行了12分钟追上乙，那么甲的速度是多少？'},
    {id:'b8',type:'选择题',knowledge:'钟面上的角',difficulty:'较易',text:'从早上6：00到早上6：30钟面上分针旋转了（　）。',options:['A. 180°','B. 90°','C. 30°','D. 60°']},
    {id:'b9',type:'解答题',knowledge:'长方体体积',difficulty:'中等',text:'一个长方体盒子的底面积是4/9平方分米，高是1/2分米。长方体盒子的体积是多少立方分米？'},
    {id:'b10',type:'选择题',knowledge:'折痕关系',difficulty:'较难',text:'把一张正方形纸对折两次后展开，折痕（　）。',options:['A. 相交','B. 互相平行','C. 互相垂直','D. 可能互相平行，也可能互相垂直']}
  ]
  const groups = [['数与运算',['三位数乘两位数','因数末尾有0']],['数量关系',['部分合作问题','同向追及问题']],['图形与几何',['长方形','直线、射线和线段','线段','钟面上的角','长方体体积','折痕关系']]]
  const makeVariantText = (text, offset) => offset === 0 ? text : text.replace(/\d+(?:\.\d+)?/g, value => {
    const number = Number(value)
    return Number.isFinite(number) ? String(Number.isInteger(number) ? number + offset : Number((number + offset / 10).toFixed(1))) : value
  })
  const officialQuestions = Array.from({length:60},(_,index)=>questions.map(question=>({
    ...question,
    id:`${question.id}-official-${index + 1}`,
    originId:question.id,
    text:makeVariantText(question.text,index),
  }))).flat()
  const personalQuestions = questions.map(question => ({...question,id:`${question.id}-mine`,originId:question.id}))
  const selected = new Map()
  const answersOpen = new Set()
  const adaptOpen = new Set()
  let knowledge = ''
  let currentSource = 'official'
  let currentPage = 1
  let moreUnlocked = false
  let unlockPromptOpen = false
  const PAGE_SIZE = 20
  const MAX_PAGES = 3
  const esc = value => String(value || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
  const tree = document.querySelector('#knowledgeTree')
  const list = document.querySelector('#questionList')
  function notify(){ parent.postMessage({type:'feixiang-question-picker-count',count:selected.size},'*') }
  function sourcePool(){return currentSource==='official'?officialQuestions:personalQuestions}
  function renderTree(){const pool=sourcePool();tree.innerHTML=groups.map(([name,children])=>`<section class="tree-group"><button class="tree-parent" data-knowledge=""><span>${name}</span><em>${children.reduce((sum,item)=>sum+pool.filter(q=>q.knowledge===item).length,0)}</em></button>${children.map(item=>`<button class="tree-child ${knowledge===item?'active':''}" data-knowledge="${esc(item)}"><span>${esc(item)}</span><em>${pool.filter(q=>q.knowledge===item).length}</em></button>`).join('')}</section>`).join('')}
  function filtered(){const type=document.querySelector('#typeFilter').value,diff=document.querySelector('#difficultyFilter').value,query=document.querySelector('#questionSearch').value.trim().toLowerCase();return sourcePool().filter(q=>(!knowledge||q.knowledge===knowledge)&&(type==='全部题型'||q.type===type)&&(diff==='全部难度'||q.difficulty===diff)&&(!query||`${q.text}${q.knowledge}`.toLowerCase().includes(query)))}
  function answerFor(q){const id=q.originId||q.id;return ({b1:'2又1/3小时',b2:'24、20；40、12',b3:'C. 线段',b4:'B. 线段',b5:'C. 39',b6:'2个',b7:'425米/分',b8:'A. 180°',b9:'2/9立方分米',b10:'D'})[id]||q.answer||'请查看题库答案。'}
  function analysisFor(q){const id=q.originId||q.id;return ({b1:'先计算两种无人机每小时完成的工作量，再用剩余工作量除以效率和。',b2:'沿不同方向对折时，对折方向的边长减半，另一边不变。',b3:'线段有两个端点，符合“有始有终”的含义。',b4:'延长后仍有两个确定端点，所以仍是线段。',b5:'用9999除以256并取不超过结果的最大整数。',b6:'将各因数分解质因数，统计2和5能够配成多少组10。',b7:'先求乙领先的路程，再利用追及路程除以追及时间求速度差。',b8:'分针30分钟旋转半圈，即180°。',b9:'长方体体积等于底面积乘高。',b10:'两次对折的方向不同，折痕关系也会不同。'})[id]||`围绕“${q.knowledge}”提取条件，选择对应公式或关系进行推理。`}
  function render(){
    const allRows=filtered()
    const totalPages=currentSource==='official'?Math.min(MAX_PAGES,Math.max(1,Math.ceil(allRows.length/PAGE_SIZE))):1
    currentPage=Math.min(currentPage,totalPages)
    const rows=currentSource==='official'?allRows.slice((currentPage-1)*PAGE_SIZE,currentPage*PAGE_SIZE):allRows
    const cards=rows.length?rows.map((q)=>`<article class="question-card ${selected.has(q.id)?'selected':''} ${answersOpen.has(q.id)||adaptOpen.has(q.id)?'panel-open':''}" data-id="${q.id}"><div class="question-meta"><span>${q.type}</span><span>${q.difficulty}</span><span>${q.knowledge}</span></div><p>${esc(q.text)}</p>${q.options?`<div class="question-options">${q.options.map(esc).map(x=>`<span>${x}</span>`).join('')}</div>`:''}<div class="question-actions"><button type="button" data-answer="${q.id}" title="${answersOpen.has(q.id)?'收起答案':'显示答案和解析'}" aria-label="${answersOpen.has(q.id)?'收起答案':'显示答案和解析'}">答</button><button type="button" class="adapt" data-adapt="${q.id}" title="AI改编" aria-label="AI改编">✧</button><button type="button" class="add ${selected.has(q.id)?'added':''}" data-add="${q.id}" title="${selected.has(q.id)?'从已选题目移除':'添加题目'}" aria-label="${selected.has(q.id)?'从已选题目移除':'添加题目'}">${selected.has(q.id)?'✓':'＋'}</button></div>${answersOpen.has(q.id)?`<div class="answer-panel"><p><b>答案</b>${esc(answerFor(q))}</p><p><b>解析</b>${esc(analysisFor(q))}</p></div>`:''}${adaptOpen.has(q.id)?`<div class="adapt-panel"><b>AI改编</b><span>保持考点，调整数据与情境</span><button type="button" data-run-adapt="${q.id}">生成变式题</button></div>`:''}</article>`).join(''):'<div class="empty">没有找到符合条件的题目</div>'
    const footer=currentSource!=='official'||allRows.length<=PAGE_SIZE?'':moreUnlocked?`<footer class="picker-pagination"><button data-page="${currentPage-1}" ${currentPage===1?'disabled':''}>上一页</button><span>第 ${currentPage} / ${totalPages} 页 · 每页20题</span><button data-page="${currentPage+1}" ${currentPage===totalPages?'disabled':''}>下一页</button></footer>`:`<footer class="picker-unlock"><div><b>解锁更多题目</b><span>消耗20积分，可继续查看后2页，共60道题</span></div><button type="button" data-unlock-more>解锁更多</button></footer>`
    const prompt=unlockPromptOpen?`<div class="unlock-overlay"><div class="unlock-dialog"><span>✦</span><h3>解锁更多题目</h3><p>本次将消耗 <b>20积分</b>，解锁当前知识点后续2页题目。</p><div><button type="button" data-unlock-cancel>暂不解锁</button><button type="button" class="primary" data-unlock-confirm>确认解锁</button></div></div></div>`:''
    const pageInfo=rows.length?`<div class="picker-page-info"><span>${currentSource==='official'?'官方题库':'我的题库'}</span><b>本页 ${rows.length} 道题</b>${currentSource==='official'?`<em>第 ${currentPage} / ${totalPages} 页</em>`:''}</div>`:''
    list.innerHTML=pageInfo+cards+footer+prompt
  }
  tree.addEventListener('click',e=>{const button=e.target.closest('[data-knowledge]');if(!button)return;knowledge=button.dataset.knowledge;currentPage=1;unlockPromptOpen=false;renderTree();render()})
  list.addEventListener('click',e=>{
    const page=e.target.closest('[data-page]'),unlock=e.target.closest('[data-unlock-more]'),confirm=e.target.closest('[data-unlock-confirm]'),cancel=e.target.closest('[data-unlock-cancel]')
    if(page&&!page.disabled){currentPage=Math.max(1,Math.min(MAX_PAGES,Number(page.dataset.page)||1));list.scrollTop=0;render();return}
    if(unlock){unlockPromptOpen=true;render();return}
    if(cancel){unlockPromptOpen=false;render();return}
    if(confirm){moreUnlocked=true;unlockPromptOpen=false;currentPage=2;list.scrollTop=0;render();return}
    const add=e.target.closest('[data-add]'),answer=e.target.closest('[data-answer]'),adapt=e.target.closest('[data-adapt]'),run=e.target.closest('[data-run-adapt]')
    if(add){const q=sourcePool().find(item=>item.id===add.dataset.add);selected.has(q.id)?selected.delete(q.id):selected.set(q.id,q);render();notify();return}
    if(answer){answersOpen.has(answer.dataset.answer)?answersOpen.delete(answer.dataset.answer):answersOpen.add(answer.dataset.answer);adaptOpen.delete(answer.dataset.answer);render();return}
    if(adapt){adaptOpen.has(adapt.dataset.adapt)?adaptOpen.delete(adapt.dataset.adapt):adaptOpen.add(adapt.dataset.adapt);answersOpen.delete(adapt.dataset.adapt);render();return}
    if(run){const q=sourcePool().find(item=>item.id===run.dataset.runAdapt);q.text=`${q.text}（AI变式：已调整题目数据）`;adaptOpen.delete(q.id);render()}
  })
  ;['typeFilter','difficultyFilter','questionSearch'].forEach(id=>document.querySelector(`#${id}`).addEventListener(id==='questionSearch'?'input':'change',()=>{currentPage=1;render()}))
  document.querySelectorAll('[data-source]').forEach(button=>button.addEventListener('click',()=>{currentSource=button.dataset.source;currentPage=1;unlockPromptOpen=false;document.querySelectorAll('[data-source]').forEach(x=>x.classList.toggle('active',x===button));renderTree();render()}))
  window.AiqCanvas={keys:()=>[...selected.keys()],exportSelected:()=>[...selected.values()].map(q=>({selectionKey:q.id,question:{...q,stem:q.text}})),toggleQuestion:item=>{const id=item.selectionKey||item.id||item.question?.id;if(selected.has(id))selected.delete(id);render();notify()}}
  renderTree();render();notify()
})()

const topics = [
  { id:"t1", title:"朝阳易错二练：有理数符号与运算", focus:"错因诊断、针对变式、二次过关", reason:"朝阳易错二练", questions:15, minutes:20, difficulty:"中等", source:"朝阳区易错专题", usage:386, tag:"special", tone:"sage" },
  { id:"t2", title:"2026-2027学年北京市朝阳区七年级（上）期末统考数学试卷", focus:"北京市朝阳区七年级上学期期末数学试题", reason:"朝阳区级试题", highlight:"区级试题", questions:22, minutes:40, difficulty:"中等", source:"朝阳区初一上期末试题", usage:1206, tag:"paper", tone:"cream" },
  { id:"t3", title:"朝阳情境数学：代数式建模专项题单", focus:"朝阳真实情境改编，考点不变、题面更新", reason:"朝阳情境题", highlight:"名师推荐", questions:12, minutes:25, difficulty:"中等", source:"朝阳情境题专题", usage:842, tag:"special", tone:"lilac" },
  { id:"t4", title:"2024—2026 朝阳区期末试题汇编：轴对称", focus:"把分散试题整理成可直接使用的课内专题", reason:"试题汇编", highlight:"精品", questions:24, minutes:35, difficulty:"较难", source:"北京初一下期末试题", usage:1532, tag:"compilation", legacy:true, tone:"mist" },
  { id:"t5", title:"2025—2026 朝阳区期末真题汇编：全等三角形", focus:"按考点重组近两年朝阳区级真题", reason:"真题汇编", highlight:"精品", questions:18, minutes:30, difficulty:"中等", source:"北京初一下期末真题", usage:613, tag:"compilation", legacy:true, tone:"sage" },
  { id:"t6", title:"初一期末高频易错周测题单", focus:"期末高频易错题与周测题单", reason:"周测题单", highlight:"精品", questions:18, minutes:30, difficulty:"较难", source:"北京市朝阳外国语学校", usage:1089, tag:"special", tone:"cream" },
  { id:"t7", title:"整式运算高频易错巩固题单", focus:"整式运算常见错误归纳", reason:"热门系列", questions:14, minutes:20, difficulty:"中等", source:"全品学练考", usage:522, tag:"workbook", tone:"lilac" },
  { id:"t8", title:"七上正负数与数轴：概念理解过关题单", focus:"理解实际意义，准确判断", reason:"七上第1章", questions:16, minutes:20, difficulty:"简单", source:"区教研精选", usage:762, tag:"chapter", tone:"sage" },
  { id:"t9", title:"有理数运算基础过关：含易错自测", focus:"贴近教材知识链与能力层级", reason:"本地教辅", highlight:"精品", questions:20, minutes:25, difficulty:"中等", source:"多维导学案", usage:1143, tag:"workbook", tone:"cream" },
  { id:"t10", title:"整式加减高频易错：去括号与合并同类项", focus:"合并同类项与化简", reason:"七上第3章", questions:18, minutes:20, difficulty:"简单", source:"朝阳区教研室", usage:908, tag:"chapter", tone:"lilac" },
  { id:"t11", title:"一元一次方程应用：审题建模专项", focus:"顺序解题方法与实际应用", reason:"本校老师共建", questions:22, minutes:25, difficulty:"中等", source:"望京实验学校数学组", author:{ name:"李老师", school:"望京实验学校", tone:"amber" }, usage:1221, tag:"school", tone:"mist" },
  { id:"t12", title:"几何初步：图形语言与概念辨析", focus:"直线、射线和线段", reason:"七上第4章", questions:14, minutes:15, difficulty:"简单", source:"朝阳实验中学", author:{ name:"赵老师", school:"朝阳实验中学", tone:"mint" }, usage:669, tag:"school", tone:"sage" },
  { id:"t13", title:"有理数混合运算：方法进阶与提速", focus:"综合运算与技巧提升", reason:"七上第5章", questions:20, minutes:25, difficulty:"中等", source:"区教研精选", usage:1015, tag:"chapter", tone:"cream" },
  { id:"t14", title:"2026-2027学年北京市朝阳区七年级（上）期中统考数学试卷", focus:"北京市朝阳区七年级上学期期中数学试题", reason:"朝阳区级试题", highlight:"新上", questions:20, minutes:35, difficulty:"较难", source:"朝阳区初一上期中试题", usage:984, tag:"paper", tone:"sage" },
  { id:"t15", title:"望京片区七上课堂小测：整式加减", focus:"课堂检测，及时巩固", reason:"课堂小测", highlight:"最新", questions:12, minutes:15, difficulty:"简单", source:"望京片区教研", author:{ name:"黄老师", school:"望京实验学校", tone:"amber" }, usage:512, tag:"chapter", tone:"cream" },
  { id:"t16", title:"月考前查漏补缺：七上核心考点精选", focus:"月考精选，重点突破", reason:"月考精选", questions:18, minutes:25, difficulty:"中等", source:"朝阳实验中学", author:{ name:"赵老师", school:"朝阳实验中学", tone:"mint" }, usage:1266, tag:"school", tone:"lilac" },
  { id:"t17", title:"七上易错题二次过关：概念到变式", focus:"教研共建，优质共享", reason:"教研共建", highlight:"最新", questions:16, minutes:20, difficulty:"中等", source:"劲松片区教研", author:{ name:"刘老师", school:"劲松外国语学校", tone:"violet" }, usage:698, tag:"school", tone:"mist" },
  { id:"t18", title:"北京中考衔接：数与式思维进阶题单", focus:"教材变式、探究题与优生挑战", reason:"巩固复习", highlight:"名师推荐", questions:22, minutes:35, difficulty:"较难", source:"北京中考专题", usage:1374, tag:"special", tone:"sage" },
  { id:"t19", title:"课内基础到探究题：进阶提升题单", focus:"从课内基础过渡到探究与培优", reason:"提优配套", questions:18, minutes:30, difficulty:"中等", source:"常用提优训练系列", usage:831, tag:"workbook", tone:"cream" },
  { id:"t20", title:"典型错法拆解：有理数与方程方法点拨", focus:"归纳典型错法并配套针对变式", reason:"老师收藏较多", questions:16, minutes:25, difficulty:"中等", source:"易错方法系列", usage:742, tag:"workbook", tone:"lilac" },
  { id:"t21", title:"期中错题重组：三个班高频失分题", focus:"基于三个班真实易错题", reason:"本校老师共建", questions:15, minutes:22, difficulty:"中等", source:"望京实验学校数学组", author:{ name:"陈老师", school:"望京实验学校", tone:"blue" }, usage:96, tag:"school", tone:"mist" },
  { id:"t22", title:"有理数课堂诊断：概念掌握过关题单", focus:"当堂检测概念掌握情况", reason:"课堂小测", questions:8, minutes:5, difficulty:"简单", source:"日坛中学", author:{ name:"周老师", school:"日坛中学", tone:"rose" }, usage:728, tag:"chapter", tone:"sage" },
  { id:"t23", title:"一元一次方程移项与符号易错专练", focus:"集中突破移项与符号错误", reason:"高频易错", questions:14, minutes:18, difficulty:"中等", source:"区教研精选", usage:1186, tag:"chapter", tone:"cream" },
  { id:"t24", title:"线段与角：易混概念辨析与规范表达", focus:"易混概念判断与规范表达", reason:"概念辨析", questions:12, minutes:15, difficulty:"简单", source:"朝阳实验中学", usage:635, tag:"chapter", tone:"lilac" },
  { id:"t25", title:"2026-2027学年北京市朝阳区七年级（上）期末统考数学试卷", focus:"北京市朝阳区七年级上学期期末数学试题", reason:"朝阳区级试题", highlight:"新上", questions:20, minutes:30, difficulty:"中等", source:"朝阳区初一上期末试题", usage:1458, tag:"paper", tone:"mist" },
  { id:"t26", title:"整式运算同步精练：基础到综合", focus:"同步巩固整式化简方法", reason:"热门系列", questions:18, minutes:25, difficulty:"中等", source:"原创新课堂", usage:884, tag:"workbook", tone:"sage" },
  { id:"t27", title:"期末选择题高频考法：审题与快速提分", focus:"高频选择题与排除方法", reason:"选择题专题", questions:16, minutes:20, difficulty:"中等", source:"朝阳区教研室", usage:1328, tag:"special", tone:"cream" },
  { id:"t28", title:"数学阅读理解：真实情境信息提取", focus:"从真实情境中提取数量关系", reason:"情境专项", questions:10, minutes:22, difficulty:"较难", source:"区教研精选", usage:576, tag:"special", tone:"lilac" },
  { id:"t29", title:"周末分层作业 A：基础巩固与补弱", focus:"面向基础薄弱学生巩固", reason:"基础巩固", questions:15, minutes:20, difficulty:"简单", source:"望京实验学校数学组", author:{ name:"陈老师", school:"望京实验学校", tone:"blue" }, usage:168, tag:"school", tone:"mist" },
  { id:"t30", title:"周末分层作业 B：综合应用与提升", focus:"基础巩固后的综合应用", reason:"综合应用", questions:18, minutes:28, difficulty:"中等", source:"望京实验学校数学组", author:{ name:"陈老师", school:"望京实验学校", tone:"blue" }, usage:152, tag:"school", tone:"sage" },
  { id:"t31", title:"代数式建模：真实情境列式专项", focus:"由情境列式并解释代数式", reason:"方法专项", questions:13, minutes:18, difficulty:"中等", source:"劲松片区教研", usage:692, tag:"special", tone:"cream" },
  { id:"t32", title:"几何语言：符号转换与规范书写专项", focus:"训练符号语言与文字表达", reason:"规范表达专项", questions:12, minutes:20, difficulty:"中等", source:"朝阳区教研室", usage:804, tag:"special", tone:"lilac" },
  { id:"t33", title:"期中压轴题：关键步骤分层拆解", focus:"按关键步骤拆解综合题", reason:"联考题源汇编", questions:9, minutes:30, difficulty:"较难", source:"朝阳区四中联考", usage:1036, tag:"compilation", tone:"mist" },
  { id:"t34", title:"一元一次方程：典型题型与变式突破", focus:"典型方程题型与变式训练", reason:"热门系列", questions:20, minutes:30, difficulty:"中等", source:"多维导学案", usage:916, tag:"workbook", tone:"sage" },
  { id:"t35", title:"月考前查漏补缺：本月高频易错", focus:"快速覆盖本月教学重点", reason:"查漏补缺", highlight:"最新", questions:14, minutes:20, difficulty:"中等", source:"望京片区教研", usage:1274, tag:"chapter", tone:"cream" },
  { id:"t36", title:"七上有理数方法：公开课配套小测", focus:"从概念辨析到方法迁移的课堂练习", reason:"名校公开交流", highlight:"精品", questions:12, minutes:18, difficulty:"中等", source:"北京市第八十中学", usage:1682, tag:"school", tone:"sage" },
  { id:"t37", title:"期中压轴题：关键步骤与分层选题", focus:"按关键步骤拆分综合题，适合分层使用", reason:"名校教研共建", highlight:"精品", questions:10, minutes:28, difficulty:"较难", source:"朝阳实验中学", usage:1436, tag:"school", tone:"cream" },
  { id:"t38", title:"数学阅读与真实情境建模题单", focus:"从真实语境中提取数量关系与条件", reason:"名校公开交流", highlight:"精品", questions:14, minutes:25, difficulty:"中等", source:"朝阳外国语学校", usage:1298, tag:"school", tone:"lilac" },
  { id:"t39", title:"几何语言规范与推理进阶题单", focus:"强化图形语言、推理步骤与规范书写", reason:"名校教研共建", highlight:"精品", questions:16, minutes:24, difficulty:"中等", source:"日坛中学", usage:1184, tag:"school", tone:"mist" },
  { id:"t40", title:"有理数概念课时过关：数轴、相反数与绝对值", focus:"概念辨析、数轴表示与相反数", reason:"同步巩固", questions:16, minutes:20, difficulty:"简单", source:"多维导学案", usage:968, tag:"workbook", tone:"sage" },
  { id:"t41", title:"有理数单元检测：运算、应用与探究", focus:"覆盖运算法则、混合运算与实际应用", reason:"单元检测", highlight:"精品", questions:22, minutes:35, difficulty:"中等", source:"多维导学案", usage:1046, tag:"workbook", tone:"mist" },
  { id:"t42", title:"整式加减课时精练：去括号与合并同类项", focus:"合并同类项与去括号课时训练", reason:"热门系列", questions:14, minutes:18, difficulty:"简单", source:"全品学练考", usage:786, tag:"workbook", tone:"cream" },
  { id:"t43", title:"一元一次方程同步检测：解法与应用", focus:"从解方程到实际问题的阶段检测", reason:"热门系列", questions:20, minutes:30, difficulty:"中等", source:"全品学练考", usage:852, tag:"workbook", tone:"lilac" },
  { id:"t44", title:"有理数规律探究与思维进阶", focus:"从基础运算过渡到规律探究", reason:"能力提高", questions:15, minutes:28, difficulty:"较难", source:"常用提优训练系列", usage:734, tag:"workbook", tone:"sage" },
  { id:"t45", title:"方程应用培优：复杂数量关系建模", focus:"复杂数量关系与多步骤建模", reason:"培优专题", questions:12, minutes:30, difficulty:"较难", source:"常用提优训练系列", usage:698, tag:"workbook", tone:"cream" },
  { id:"t46", title:"有理数符号易错二练：错因到变式", focus:"定位符号错误并完成针对变式", reason:"易错二练", questions:16, minutes:22, difficulty:"中等", source:"易错方法系列", usage:824, tag:"workbook", tone:"lilac" },
  { id:"t47", title:"方程移项、去分母与检验错法点拨", focus:"集中解决移项、去分母与检验问题", reason:"错法点拨", questions:14, minutes:24, difficulty:"中等", source:"易错方法系列", usage:778, tag:"workbook", tone:"mist" },
  { id:"t48", title:"整式加减同步方法：易错点与变式", focus:"围绕课时重点进行方法归纳", reason:"热门系列", questions:15, minutes:20, difficulty:"中等", source:"原创新课堂", usage:812, tag:"workbook", tone:"sage" },
  { id:"t49", title:"几何初步同步方法：图形语言与推理", focus:"直线、射线、线段与角的规范表达", reason:"热门系列", questions:16, minutes:22, difficulty:"中等", source:"原创新课堂", usage:744, tag:"workbook", tone:"cream" },
  { id:"t50", title:"一元一次方程题型突破：解法到应用", focus:"分类掌握方程典型题型和变式", reason:"热门系列", questions:18, minutes:28, difficulty:"中等", source:"多维导学案", usage:936, tag:"workbook", tone:"lilac" },
  { id:"t51", title:"几何语言专题：读图、转换与规范表达", focus:"训练几何语言转换与推理书写", reason:"热门系列", questions:14, minutes:24, difficulty:"中等", source:"多维导学案", usage:868, tag:"workbook", tone:"mist" },
  { id:"t52", title:"2024—2026 北京初一下期末真题汇编：图形的轴对称", focus:"近三年朝阳区真题去重汇编，覆盖核心考法", reason:"本地真题汇编", highlight:"最新", questions:28, minutes:40, difficulty:"中等", source:"朝阳区期末真题", usage:1528, tag:"compilation", tone:"mist" },
  { id:"t53", title:"2025—2026 北京初一下期末真题汇编：全等三角形", focus:"按考点和难度梯度重组本地期末真题", reason:"本地真题汇编", highlight:"最新", questions:24, minutes:38, difficulty:"中等", source:"朝阳区期末真题", usage:1316, tag:"compilation", tone:"sage" },
  { id:"t54", title:"朝阳区七上期中试题汇编：有理数高频题（2023—2025）", focus:"汇集区统考与重点校高频题，解析已经复核", reason:"地区试题汇编", highlight:"精品", questions:32, minutes:45, difficulty:"中等", source:"朝阳区教研精选", usage:1842, tag:"compilation", tone:"cream" },
  { id:"t55", title:"朝阳重点校七年级上学期期末压轴题汇编", focus:"精选重点校压轴与探究题，按解法模型归类", reason:"名校汇编", highlight:"名师推荐", questions:18, minutes:45, difficulty:"较难", source:"朝阳重点校公开试卷", usage:1238, tag:"compilation", tone:"lilac" },
  { id:"t56", title:"朝阳区近三年真题汇编：一元一次方程", focus:"按题型、场景和易错点完成去重编排", reason:"年度汇编", highlight:"精品", questions:30, minutes:42, difficulty:"中等", source:"朝阳区级真题库", usage:1464, tag:"compilation", tone:"sage" },
  { id:"t57", title:"北京七年级数学真实情境题真题汇编", focus:"保留本地真实语境，集中训练信息提取与建模", reason:"情境题汇编", highlight:"最新", questions:20, minutes:35, difficulty:"较难", source:"朝阳本地真题库", usage:986, tag:"compilation", tone:"mist" },
  { id:"t58", title:"北京市第八十中学初一上期末周测模拟卷", focus:"期末周测模拟与高频考法", reason:"周测模拟", highlight:"名校题源", questions:22, minutes:40, difficulty:"较难", source:"八十中教研精选", usage:1168, tag:"paper", tone:"cream" },
  { id:"t59", title:"2025-2026学年北京市朝阳区七年级（上）10月月考数学试卷", focus:"北京市朝阳区七年级上学期 10 月月考数学试卷", reason:"朝阳区月考", highlight:"新上", questions:20, minutes:40, difficulty:"中等", source:"朝阳区七上 10 月月考", usage:754, tag:"paper", tone:"sage" },
  { id:"t60", title:"七上有理数单元测验卷", focus:"概念、运算、应用与探究的单元测验", reason:"单元测验", highlight:"精品", questions:24, minutes:45, difficulty:"中等", source:"朝阳区初中数学教研组", usage:1026, tag:"special", tone:"lilac" },
  { id:"t61", title:"北京七年级数与式中考衔接诊断卷", focus:"初一核心知识与中考命题方式衔接", reason:"中考衔接", questions:18, minutes:35, difficulty:"较难", source:"北京初中数学衔接专题", usage:892, tag:"special", tone:"mist" },
  { id:"t62", title:"2025-2026学年北京市第八十中学七年级（上）期中数学试卷", focus:"北京市第八十中学七年级上学期期中数学试卷", reason:"学校真实考试", questions:22, minutes:90, difficulty:"较难", source:"八十中公开试卷", usage:1684, tag:"paper", tone:"cream" },
  { id:"t63", title:"2025-2026学年北京市陈经纶中学七年级（上）期中数学试卷", focus:"北京市陈经纶中学七年级上学期期中数学试卷", reason:"学校真实考试", questions:24, minutes:90, difficulty:"中等", source:"北京市陈经纶中学公开试卷", usage:1326, tag:"paper", tone:"sage" },
  { id:"t64", title:"2025-2026学年北京市朝阳区七年级（上）期末质量监测数学试卷", focus:"北京市朝阳区七年级上学期期末质量监测数学试卷", reason:"朝阳区级真题", questions:22, minutes:90, difficulty:"中等", source:"朝阳区七年级期末质量监测", usage:1108, tag:"paper", tone:"mist" },
  { id:"t65", title:"2025-2026学年北京中学七年级（上）期中联考数学试卷", focus:"北京中学七年级上学期期中数学试卷", reason:"集团校联考", questions:23, minutes:90, difficulty:"中等", source:"北京中学公开试卷", usage:896, tag:"paper", tone:"lilac" },
  { id:"t66", title:"2026年北京市中考数学真题试卷", focus:"北京市中考数学真题，覆盖核心考点与新题型", reason:"中考真题", highlight:"新上", questions:25, minutes:120, difficulty:"较难", source:"北京市中考公开真题", usage:2186, tag:"paper", tone:"mist" },
  { id:"t67", title:"2025-2026学年北京市朝阳外国语学校七年级（上）期末数学试卷", focus:"北京市朝阳外国语学校七年级上学期期末数学试卷", reason:"名校公开试卷", questions:24, minutes:90, difficulty:"较难", source:"北京市朝阳外国语学校公开试卷", usage:1542, tag:"paper", tone:"cream" },
  { id:"t68", title:"2025-2026学年北京市日坛中学七年级（上）期中数学试卷", focus:"北京市日坛中学七年级上学期期中数学试卷", reason:"名校公开试卷", questions:23, minutes:90, difficulty:"中等", source:"北京市日坛中学公开试卷", usage:1438, tag:"paper", tone:"sage" },
  { id:"t69", title:"2025-2026学年北京市第十七中学七年级（上）期末数学试卷", focus:"北京市第十七中学七年级上学期期末数学试卷", reason:"名校公开试卷", questions:25, minutes:90, difficulty:"较难", source:"北京市第十七中学公开试卷", usage:1288, tag:"paper", tone:"lilac" },
  { id:"t70", title:"2025-2026学年北京市第八十中学分校七年级（上）月考数学试卷", focus:"北京市第八十中学分校七年级上学期月考数学试卷", reason:"名校公开试卷", questions:20, minutes:60, difficulty:"中等", source:"北京市第八十中学分校公开试卷", usage:1164, tag:"paper", tone:"mist" },
  { id:"t71", title:"2025-2026学年北京市第四中学七年级（上）期中数学试卷", focus:"西城区北京四中七年级上学期期中数学试卷", reason:"西城名校", questions:23, minutes:90, difficulty:"较难", source:"北京市第四中学公开试卷", usage:1896, tag:"paper", tone:"cream" },
  { id:"t72", title:"2025-2026学年北京市第八中学七年级（上）期末数学试卷", focus:"西城区北京八中七年级上学期期末数学试卷", reason:"西城名校", questions:24, minutes:90, difficulty:"中等", source:"北京市第八中学公开试卷", usage:1642, tag:"paper", tone:"sage" },
  { id:"t73", title:"2025-2026学年中国人民大学附属中学七年级（上）期中数学试卷", focus:"海淀区人大附中七年级上学期期中数学试卷", reason:"海淀名校", questions:24, minutes:90, difficulty:"较难", source:"人大附中公开试卷", usage:2148, tag:"paper", tone:"lilac" },
  { id:"t74", title:"2025-2026学年清华大学附属中学七年级（上）期末数学试卷", focus:"海淀区清华附中七年级上学期期末数学试卷", reason:"海淀名校", questions:25, minutes:90, difficulty:"较难", source:"清华附中公开试卷", usage:1986, tag:"paper", tone:"mist" },
  { id:"t75", title:"2025-2026学年北京大学附属中学七年级（上）月考数学试卷", focus:"海淀区北大附中七年级上学期月考数学试卷", reason:"海淀名校", questions:20, minutes:60, difficulty:"中等", source:"北大附中公开试卷", usage:1764, tag:"paper", tone:"cream" },
  { id:"t76", title:"2025-2026学年北京师范大学附属中学七年级（上）期末数学试卷", focus:"西城区师大附中七年级上学期期末数学试卷", reason:"西城名校", questions:24, minutes:90, difficulty:"中等", source:"北师大附中公开试卷", usage:1812, tag:"paper", tone:"sage" },
  { id:"t77", title:"2025-2026学年北京市十一学校七年级（上）期中数学试卷", focus:"海淀区北京十一学校七年级上学期期中数学试卷", reason:"海淀名校", questions:24, minutes:90, difficulty:"较难", source:"北京十一学校公开试卷", usage:1748, tag:"paper", tone:"cream" },
  { id:"t78", title:"2025-2026学年北京市第二中学七年级（上）期中数学试卷", focus:"东城区北京二中七年级上学期期中数学试卷", reason:"东城名校", questions:23, minutes:90, difficulty:"中等", source:"北京二中公开试卷", usage:1692, tag:"paper", tone:"lilac" }
];

function normalizeCurrentResourceCopy(value, preserveZhongkao = false) {
  let text = String(value || "").replaceAll("2025-2026学年", "2026-2027学年");
  if (preserveZhongkao) return text;
  return text
    .replaceAll("章节真题", "历年试题")
    .replaceAll("真题整理", "考题整理")
    .replaceAll("真题汇编", "历年试题汇编")
    .replaceAll("真题库", "试题库")
    .replaceAll("真题", "试题");
}

topics.forEach(topic => {
  const preserveZhongkao = /中考/.test(`${topic.title || ""}${topic.focus || ""}${topic.reason || ""}`);
  ["title", "focus", "reason", "highlight", "source"].forEach(key => {
    if (topic[key]) topic[key] = normalizeCurrentResourceCopy(topic[key], preserveZhongkao);
  });
});
const workbookAlbums = [
  { id: "duowei", name: "朝阳新目标检测", subtitle: "课时练 + 单元检测", source: "多维导学案" },
  { id: "quanpin", name: "西城学习探究诊断", subtitle: "同步精练体系", source: "全品学练考" },
  { id: "yuanchuang", name: "海淀名师伴你学", subtitle: "课堂同步训练", source: "原创新课堂" },
  { id: "tiyou", name: "真题圈北京版", subtitle: "阶段复习 + 能力培优", source: "常用提优训练系列" },
  { id: "yicuo", name: "易错方法系列", subtitle: "错因拆解与变式", source: "易错方法系列" }
];

function workbookWorkspaceBrowseKey(albumId) {
  return `workbook:${encodeURIComponent(String(albumId || ""))}`;
}

function openWorkbookWorkspace(album) {
  if (!album) return;
  const query = new URLSearchParams({
    context: "series",
    workspaceView: "browse",
    browse: workbookWorkspaceBrowseKey(album.id),
    view: "catalog",
    albumId: album.id,
    query: "",
    keepAlbumState: "true"
  });
  location.href = `./detail-ai.html?${query.toString()}`;
}

// 首页“练习册”模块：书架层固定展示四本（无需 tab）。
const homepageWorkbookShelfIds = ["duowei", "quanpin", "yuanchuang", "tiyou"];
const albumFilterState = { view: "album", albumId: "", nodeId: "ch1-1-m1", openNodes: ["ch1", "ch1-1", "ch1-2", "ch1-2-1"], origin: "all", textbook: "all", year: "all", query: "" };

function workbookModules(prefix, topicIds = ["t40", "t9", "t34", "t50", "t41"]) {
  return ["达标检测", "基础练习", "能力提升", "拓展训练", "自我反思"].map((title, index) => ({
    id: `${prefix}-m${index + 1}`,
    title,
    topicId: topicIds[index] || topicIds[0]
  }));
}

const workbookCatalogTree = [
  {
    id: "ch1",
    title: "第一章 有理数",
    status: ["上线"],
    children: [
      { id: "ch1-1", title: "1.1 正数和负数", status: ["上线", "已关联"], modules: workbookModules("ch1-1") },
      {
        id: "ch1-2",
        title: "1.2 有理数",
        status: ["上线"],
        children: [
          { id: "ch1-2-1", title: "1.2.1 有理数", status: ["上线", "已关联"], modules: workbookModules("ch1-2-1", ["t9", "t40", "t41", "t50", "t51"]) }
        ]
      }
    ]
  },
  {
    id: "ch2",
    title: "第二章 有理数的运算",
    status: ["上线"],
    children: [
      { id: "ch2-1", title: "2.1 有理数的加法", status: ["上线", "已关联"], modules: workbookModules("ch2-1", ["t7", "t26", "t48", "t46", "t41"]) }
    ]
  },
  {
    id: "ch3",
    title: "第三章 代数式",
    status: ["上线"],
    children: [
      { id: "ch3-1", title: "3.1 字母表示数", status: ["上线", "已关联"], modules: workbookModules("ch3-1", ["t48", "t26", "t19", "t44", "t41"]) }
    ]
  },
  {
    id: "ch4",
    title: "第四章 整式的加减",
    status: ["上线"],
    children: [
      { id: "ch4-1", title: "4.1 整式", status: ["上线", "已关联"], modules: workbookModules("ch4-1", ["t42", "t48", "t7", "t26", "t41"]) }
    ]
  },
  {
    id: "ch5",
    title: "第五章 一元一次方程",
    status: ["上线"],
    children: [
      { id: "ch5-1", title: "5.1 从算式到方程", status: ["上线", "已关联"], modules: workbookModules("ch5-1", ["t43", "t34", "t50", "t45", "t47"]) }
    ]
  },
  {
    id: "ch6",
    title: "第六章 几何图形初步",
    status: ["上线"],
    children: [
      { id: "ch6-1", title: "6.1 几何图形", status: ["上线", "已关联"], modules: workbookModules("ch6-1", ["t49", "t51", "t12", "t24", "t41"]) }
    ]
  }
];
const workbookTypeOptions = [
  {
    id: "sync",
    label: "同步练习",
    match: topic => /多维导学案|全品学练考|原创新课堂|同步|课时|单元/.test(resourceOriginText(topic))
  },
  {
    id: "comprehensive",
    label: "综合练习",
    match: topic => /常用提优训练系列|易错方法系列|提优|综合|易错/.test(resourceOriginText(topic))
  },
  {
    id: "textbook",
    label: "教材练习",
    match: topic => /教材|人教版|章节/.test(resourceOriginText(topic))
  }
];
const workbookSeriesOptions = [
  "学习探究诊断",
  "新目标检测",
  "综合应用创新题典中点",
  "1课3练单元达标测试",
  "北京真卷",
  "好卷",
  "考必胜",
  "星级口算天天练"
];
const workbookTextbookOptions = [
  { id: "all", label: "全部" },
  { id: "renjiao-7-1", label: "人教版七年级上册" },
  { id: "renjiao-7-2", label: "人教版七年级下册" },
  { id: "beishida-5-2", label: "北师大版五年级下册" }
];
const workbookYearOptions = [
  { id: "all", label: "全部" },
  { id: "2026", label: "2026-2027学年" },
  { id: "2025", label: "2025-2026学年" },
  { id: "2024", label: "2024-2025学年" },
  { id: "2023", label: "2023-2024学年" },
  { id: "more", label: "更多" }
];
const resourceOriginText = topic => `${topic.title} ${topic.reason} ${topic.focus} ${topic.source}`;
const resourceOriginOptions = [
  { id: "all", label: "全部" },
  {
    id: "jiaocai",
    label: "教材",
    match: topic => {
      const text = resourceOriginText(topic);
      if (/真题|汇编/.test(text)) return false;
      return topic.tag === "chapter" || /第\d章|教材|同步|课堂小测|单元检测|课时/.test(text);
    }
  },
  {
    id: "jiaofu",
    label: "教辅",
    match: topic => {
      const text = resourceOriginText(topic);
      if (/真题|汇编/.test(text)) return false;
      return topic.tag === "workbook" || /导学案|学练考|新课堂|提优|易错方法|教辅|系列/.test(text);
    }
  },
  { id: "zhenti", label: "试题汇编", match: topic => /试题|汇编/.test(resourceOriginText(topic)) }
];

const curatedOriginOptions = resourceOriginOptions.filter(option => option.id !== "jiaocai");

function matchesResourceOrigin(topic, origin) {
  if (origin === "all") return true;
  const option = resourceOriginOptions.find(item => item.id === origin);
  return option?.match?.(topic) ?? true;
}

function matchesWorkbookType(topic, type) {
  if (type === "all") return true;
  const option = workbookTypeOptions.find(item => item.id === type);
  return option?.match?.(topic) ?? true;
}

// 首页可嵌入详情工作台；嵌入时把分类和资源导航交给外层页签处理。
const isEmbedded = (() => {
  try {
    return window.self !== window.top;
  } catch {
    return true;
  }
})();

function requestParentOpenTopic(topicId, context, query, extra = {}) {
  window.parent.postMessage({
    type: "aiq-open-topic",
    topicId,
    context,
    query,
    title: extra.title || "",
    shortTitle: extra.shortTitle || "",
    lessonKey: extra.lessonKey || ""
  }, "*");
}

function requestParentOpenFilter(filter, extra = {}) {
  window.parent.postMessage({ type: "aiq-open-filter", filter, ...extra }, "*");
}

function requestParentOpenAi(prompt = "") {
  window.parent.postMessage({ type: "aiq-open-ai", prompt: String(prompt || "") }, "*");
}

window.addEventListener("message", event => {
  const data = event.data;
  if (!data || typeof data !== "object") return;
  if (data.type === "aiq-set-filter" && typeof data.filter === "string") {
    if (document.querySelector(`#filterChips [data-filter="${data.filter}"]`) || data.filter === "all") {
      prepareFilterOpen(data.filter, data);
      setMainFilter(data.filter === "all" ? "all" : data.filter, data);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
});

const byId = Object.fromEntries(topics.map(topic => [topic.id, topic]));
const toneMap = { sage:"var(--sage)", cream:"var(--cream)", lilac:"var(--lilac)", mist:"var(--mist)" };
const aiPlaceholder = "描述你想要的题单，例如：七上有理数易错题，15 题，中等难度";
const bankStats = { libraryTotal: 41140, paperTotal: 28460, practiceTotal: 12680, weeklyNewResources: 320 };
let currentFilter = "all";
let currentQuery = "";
let homepageSearchScope = "all";
const homepageScopeState = { region: "朝阳区", grade: "七年级上", subject: "数学" };
const homepagePaperLaneLimit = 4;
let aiDockObserver = null;
let aiModalOpen = false;
let hasUserScrolled = false;
let filterManuallyExpanded = false;
const feedFilterState = { type:"all", difficulty:"all", source:"all", feature:"all", sort:"default" };
const paperFilterState = {
  examType: "all",
  year: "all",
  grade: "all",
  authority: "all",
  source: "all",
  sort: "latest",
  query: ""
};
const paperExamTypes = {
  all: { label: "全部试卷", match: () => true },
  real: { label: "真题", match: topic => homepagePaperItems[topic.id]?.examType === "real" || (!homepagePaperItems[topic.id] && /中考/.test(topic.title) && /真题|试卷/.test(topic.title) && !/模拟|预测|仿真/.test(topic.title)) },
  mock: { label: "模拟", match: topic => homepagePaperItems[topic.id]?.examType === "mock" || (!homepagePaperItems[topic.id] && /中考/.test(topic.title) && /模拟|预测|仿真/.test(topic.title)) },
  opening: { label: "开学考试", match: topic => homepagePaperItems[topic.id]?.examType === "opening" || (!homepagePaperItems[topic.id] && /开学考|开学考试|开学摸底|入学摸底/.test(topic.title)) },
  final: { label: "期末", match: topic => homepagePaperItems[topic.id]?.examType === "final" || (!homepagePaperItems[topic.id] && /期末/.test(topic.title)) },
  midterm: { label: "期中", match: topic => homepagePaperItems[topic.id]?.examType === "midterm" || (!homepagePaperItems[topic.id] && /期中/.test(topic.title)) },
  monthly: { label: "月考", match: topic => homepagePaperItems[topic.id]?.examType === "monthly" || (!homepagePaperItems[topic.id] && /月考/.test(topic.title)) },
  unit: { label: "单元测试", match: topic => homepagePaperItems[topic.id]?.examType === "unit" || (!homepagePaperItems[topic.id] && /单元测试|单元检测|单元测验|章末检测/.test(topic.title)) },
  sync: { label: "同步练习", match: topic => homepagePaperItems[topic.id]?.examType === "sync" || (!homepagePaperItems[topic.id] && /同步练习卷|同步测试卷|课时检测/.test(topic.title)) },
  other: { label: "其他", match: topic => homepagePaperItems[topic.id]?.examType === "other" || (!homepagePaperItems[topic.id] && topic.tag === "paper" && !/开学|期末|期中|月考|单元测试|单元检测|单元测验|章末检测|中考|模拟|预测|仿真|同步练习卷|同步测试卷|课时检测/.test(topic.title)) }
};

function normalizePaperExamType(examType) {
  if (examType === "zhongkao-real") return "real";
  if (examType === "zhongkao-mock") return "mock";
  return examType;
}
const paperYearOptions = [
  { id: "all", label: "全部" },
  { id: "2026", label: "2026-2027学年" },
  { id: "2025", label: "2025-2026学年" },
  { id: "2024", label: "2024-2025学年" },
  { id: "2023", label: "2023-2024学年" },
  { id: "earlier", label: "更早之前" }
];
const paperGradeOptions = [
  { id: "all", label: "全部" },
  { id: "g9-2", label: "九年级下", match: /九年级(?:（下）|\(下\)|下)|初三下/ },
  { id: "g9-1", label: "九年级上", match: /九年级(?:（上）|\(上\)|上)|初三上/ },
  { id: "g8-2", label: "八年级下", match: /八年级(?:（下）|\(下\)|下)|初二下/ },
  { id: "g8-1", label: "八年级上", match: /八年级(?:（上）|\(上\)|上)|初二上/ },
  { id: "g7-2", label: "七年级下", match: /七年级(?:（下）|\(下\)|下)|初一下/ },
  { id: "g7-1", label: "七年级上", match: /七年级(?:（上）|\(上\)|上)|初一上/ }
];
const paperSourceOptions = [
  { id: "all", label: "全部" },
  { id: "public", label: "飞象公共库", match: topic => !topic.author && !/私有/.test(topic.source) },
  { id: "district", label: "朝阳区私有库", match: topic => /朝阳/.test(`${topic.source} ${topic.author?.school || ""}`) },
  { id: "school", label: "本校私有库", match: topic => Boolean(topic.author) }
];
const specialFilterState = { category: "all", difficulty: "all", origin: "all", query: "" };
const compilationFilterState = { category: "all", signal: "all", query: "" };
const compilationCategories = [
  { id: "all", label: "全部汇编", match: () => true },
  { id: "region", label: "地区试题汇编", match: topic => /北京|朝阳|各区|地区/.test(`${topic.title} ${topic.source} ${topic.reason}`) },
  { id: "annual", label: "年度汇编", match: topic => /近三年|202[3-6]|年度/.test(`${topic.title} ${topic.reason}`) },
  { id: "school", label: "名校汇编", match: topic => /名校|重点校/.test(`${topic.title} ${topic.source} ${topic.reason}`) },
  { id: "topic", label: "专题汇编", match: topic => /轴对称|三角形|方程|有理数|情境|考点|题型/.test(`${topic.title} ${topic.focus}`) },
  { id: "multi", label: "多卷精选", match: topic => /各区|统考|高频|去重|多份/.test(`${topic.title} ${topic.focus} ${topic.source}`) }
];
const compilationSignals = [
  { id: "all", label: "全部汇编", match: () => true },
  { id: "local", label: "朝阳本地", match: topic => /北京|朝阳/.test(`${topic.title} ${topic.source}`) },
  { id: "recent", label: "近三年", match: topic => /近三年|202[3-6]/.test(topic.title) },
  { id: "dedup", label: "已去重", match: topic => /去重/.test(`${topic.focus} ${topic.reason}`) },
  { id: "verified", label: "解析已校验", match: topic => /校验|复核/.test(`${topic.focus} ${topic.reason}`) }
];
const specialKnowledgeModules = [
  { id: "numbers", label: "数与式", match: topic => /有理数|整式|代数|数与式/.test(`${topic.title} ${topic.focus}`) },
  { id: "equations", label: "方程（组）与不等式（组）", match: topic => /方程|不等式/.test(`${topic.title} ${topic.focus}`) },
  { id: "functions", label: "函数", match: topic => /函数/.test(`${topic.title} ${topic.focus}`) },
  { id: "geo-basic", label: "几何初步", match: topic => /几何初步|图形初步|直线|射线|线段|图形语言/.test(`${topic.title} ${topic.focus}`) },
  { id: "triangle", label: "三角形", match: topic => /三角形|全等/.test(`${topic.title} ${topic.focus}`) },
  { id: "quadrilateral", label: "四边形", match: topic => /四边形/.test(`${topic.title} ${topic.focus}`) },
  { id: "circle", label: "圆", match: topic => /圆/.test(`${topic.title} ${topic.focus}`) },
  { id: "shape-change", label: "图形的变化", match: topic => /图形的变化|轴对称|变换/.test(`${topic.title} ${topic.focus}`) },
  { id: "statistics", label: "统计", match: topic => /统计/.test(`${topic.title} ${topic.focus}`) },
  { id: "probability", label: "概率", match: topic => /概率/.test(`${topic.title} ${topic.focus}`) }
];
const specialStandaloneCategories = [
  { id: "geo-model", label: "几何模型", match: topic => /几何模型|模型/.test(`${topic.title} ${topic.focus}`) },
  { id: "calc-practice", label: "计算专练", match: topic => /运算|计算/.test(`${topic.title} ${topic.focus}`) },
  { id: "hard-breakthrough", label: "难点突破", match: topic => /难点|压轴|培优|进阶|突破|较难/.test(`${topic.title} ${topic.focus} ${topic.difficulty}`) }
];
const specialDifficultyOptions = [
  { id: "all", label: "全部" },
  { id: "简单", label: "基础" },
  { id: "中等", label: "中等" },
  { id: "较难", label: "较难" }
];
const chapterFilterState = {
  section: "1-1",
  difficulty: "all",
  origin: "all",
  source: "all",
  query: "",
  openChapters: ["ch1"]
};
const chapterText = topic => `${topic.title} ${topic.focus} ${topic.reason}`;
const chapterNavTree = [
  {
    id: "ch1",
    label: "第一章 有理数",
    sections: [
      { id: "1-1", label: "1.1 正数和负数", match: topic => /正负数|正数|负数|数轴/.test(chapterText(topic)) },
      { id: "1-2", label: "1.2 有理数及其大小比较", match: topic => /大小比较|绝对值|相反数|有理数及其/.test(chapterText(topic)) },
      { id: "1-summary", label: "小结", match: topic => /第1章|第一章|有理数/.test(chapterText(topic)) }
    ]
  },
  { id: "ch2", label: "第二章 有理数的运算", match: topic => /第2章|第二章|混合运算|有理数.*运算|运算/.test(chapterText(topic)) },
  { id: "prac1", label: "综合与实践 进位制的认识与探究", match: topic => /进位|进制/.test(chapterText(topic)) },
  { id: "ch3", label: "第三章 代数式", match: topic => /第3章|第三章|代数式/.test(chapterText(topic)) },
  { id: "ch4", label: "第四章 整式的加减", match: topic => /第4章|第四章|整式/.test(chapterText(topic)) },
  { id: "ch5", label: "第五章 一元一次方程", match: topic => /第5章|第五章|方程/.test(chapterText(topic)) },
  { id: "ch6", label: "第六章 几何图形初步", match: topic => /第6章|第六章|几何|图形|线段|角|立体/.test(chapterText(topic)) },
  { id: "prac2", label: "综合与实践 设计学校田径运动会", match: topic => /田径|运动会|实践/.test(chapterText(topic)) }
];

const contentFeed = document.querySelector("#contentFeed");
const emptyState = document.querySelector("#emptyState");
const aiMask = document.querySelector("#aiMask");
const toast = document.querySelector("#toast");

function primaryTag(topic) {
  if (topic.highlight) return topic.highlight;
  if (homepagePaperItems[topic.id]?.examType === "real") return "中考真题";
  if (homepagePaperItems[topic.id]?.examType === "mock") return "中考模拟";
  if (topic.tag === "compilation") return "试题汇编";
  if (topic.title.includes("易错")) return "高频易错";
  if (topic.author?.school && /八十中|陈经纶|朝阳实验|朝阳外国语|日坛中学|第十七中学|北京中学/.test(topic.author.school)) return "名校资源";
  if (topic.tag === "school") return "本地精选";
  if (topic.tag === "workbook") return "系列题单";
  if (topic.tag === "special") return "培优突破";
  return "基础巩固";
}

function topicTags(topic) {
  const tags = [];
  const paperTypeLabels = { real:"真题", mock:"模拟", opening:"开学考试", midterm:"期中", final:"期末", monthly:"月考", unit:"单元测试", sync:"同步练习", other:"其他" };
  const paperType = homepagePaperItems[topic.id]?.examType;
  if (paperType && paperTypeLabels[paperType]) tags.push(paperTypeLabels[paperType]);
  else if (/中考/.test(topic.title) && /真题/.test(topic.title) && !/模拟|预测|仿真/.test(topic.title)) tags.push("真题");
  else if (/期中/.test(topic.title)) tags.push("期中");
  else if (/期末/.test(topic.title)) tags.push("期末");
  else if (/月考/.test(topic.title)) tags.push("月考");
  if (/压轴|提高|培优/.test(`${topic.title} ${topic.focus}`)) tags.push("压轴题");
  if (/教研|学校|校/.test(`${topic.source} ${topic.author?.school || ""}`)) tags.push("飞象教研");
  if (!tags.length) tags.push(topic.tag === "special" ? "专题" : "同步练习");
  return [...new Set(tags)].slice(0, 1);
}

function topicBrief(topic) {
  const briefs = {
    t36:"从概念辨析到方法迁移，适合公开课后的课堂巩固。",
    t37:"按关键步骤拆分综合题，方便课堂分层选题。",
    t4:"按考点重组朝阳重点校试题，直观覆盖几何核心概念。",
    t18:"覆盖数与式多个单元，适合阶段复习与综合提升。"
  };
  return briefs[topic.id] || `${topic.focus}，共 ${topic.questions} 题，适合直接选用。`;
}

function isNamedExamPaper(topic) {
  return /期中|期末/.test(topic.title) && /真题|试卷|20\d{2}|学年/.test(topic.title);
}

function shouldOmitPaperIntro(topic, context = "feed") {
  if (context === "paper") return true;
  return isNamedExamPaper(topic);
}

function sourceMarkup(topic) {
  if (topic.author) {
    return `<div class="teacher-source"><span class="teacher-avatar ${topic.author.tone || ""}">${topic.author.name.slice(0, 1)}</span><span><b>${topic.author.name}</b><small>${topic.author.school}</small></span></div>`;
  }
  const icon = topic.tag === "workbook" ? "ri-book-2-line" : topic.tag === "paper" ? "ri-file-paper-2-line" : "ri-community-line";
  return `<div class="resource-source"><span class="source-type-icon"><i class="${icon}"></i></span><span><b>${topic.source}</b></span></div>`;
}

function topicCard(topic, options = "default") {
  const variant = typeof options === "string" ? options : options.variant || "default";
  const context = typeof options === "string" ? "feed" : options.context || "feed";
  const omitIntro = shouldOmitPaperIntro(topic, context);
  const examClass = omitIntro ? " exam-paper-card" : "";
  const paperMeta = context === "paper" ? homepagePaperItems[topic.id] : null;
  const paperPresentation = paperMeta ? getHomepagePaperPresentation(paperMeta) : null;
  const paperPublishedText = paperMeta?.publishedAt ? paperMeta.publishedAt.replaceAll("-", "/") : "";
  const paperSignal = context === "paper"
    ? `<span class="card-reason paper-source-signal ${paperPresentation?.className || "is-local"}">${paperPresentation?.label || "学校试卷"}</span>${paperMeta?.peerMatched ? '<span class="card-tag-list"><em class="paper-peer-signal">同类校</em></span>' : ""}`
    : "";
  return `
    <article class="topic-card${variant === "featured" ? " featured-topic-card" : ""}${examClass}" data-topic="${topic.id}" data-source-name="${topic.source}"${options.asPaper || context === "paper" ? ' data-context="paper"' : context === "series" ? ' data-context="series"' : ""}${options.lessonTitle ? ` data-lesson-title="${String(options.lessonTitle).replace(/"/g, "&quot;")}"` : ""} tabindex="0" role="button" aria-label="查看${topic.title}" style="--tone:${toneMap[topic.tone] || "var(--sage)"}">
      <div class="card-cover">
        <div class="card-signals">${paperSignal || `<span class="card-reason">${primaryTag(topic)}</span><span class="card-tag-list">${topicTags(topic).map(tag => `<em>${tag}</em>`).join("")}</span>`}</div>
        <h3>${topic.title}</h3>
        ${omitIntro ? "" : `<p class="topic-brief">${topicBrief(topic)}</p>`}
        ${variant === "featured" ? `<p class="featured-topic-focus">${topic.focus}</p>` : ""}
      </div>
      <div class="card-body">
        <div class="card-meta"><span>${topic.questions} 题</span>${omitIntro ? "" : `<span>${topic.difficulty}</span>`}</div>
        <div class="card-footer">
          ${sourceMarkup(topic)}
          <span class="card-usage">${topic.usage.toLocaleString()} 人使用${paperPublishedText ? `<span class="card-published">${paperPublishedText}</span>` : ""}</span>
          <button class="bookmark" data-bookmark aria-label="收藏题单"><i class="ri-bookmark-line"></i></button>
        </div>
      </div>
    </article>`;
}

function bookLessonRow(index, title, meta, usage, topicId = "t9") {
  const safeTitle = String(title).replace(/"/g, "&quot;");
  return `<button type="button" class="book-topic-row" data-topic="${topicId}" data-context="series" data-lesson-title="${safeTitle}" data-lesson-key="${safeTitle}"><i>${String(index).padStart(2, "0")}</i><span><b>${title}</b><small>${meta}</small></span><strong>${usage.toLocaleString()} 人使用</strong></button>`;
}

function bookLessonCell(title, topicId = "t9", questionCount = 12) {
  const safeTitle = String(title).replace(/"/g, "&quot;");
  return `<button type="button" class="sync-lesson-cell" data-topic="${topicId}" data-lesson-title="${safeTitle}" data-lesson-key="${safeTitle}"><span>${title}</span><strong>${questionCount} 题</strong></button>`;
}

function bookLessonGrid(lessons) {
  return `<div class="sync-lesson-grid">${lessons.map((lesson, index) => bookLessonCell(lesson.title, lesson.topic || "t9", lesson.questions || [12, 10, 14, 16, 15, 12, 20, 18][index] || 12)).join("")}</div>`;
}

const syncBookLessons = {
  duowei: [
    { title: "第 1 课时 生活中的立体图形（1）", topic: "t8" },
    { title: "第 2 课时 生活中的立体图形（2）", topic: "t8" },
    { title: "第 3 课时 从立体图形到平面图形（1）", topic: "t10" },
    { title: "第 4 课时 从立体图形到平面图形（2）", topic: "t4" },
    { title: "第 5 课时 从立体图形到平面图形（3）", topic: "t1" },
    { title: "第 6 课时 从三个方向看物体的形状", topic: "t24" },
    { title: "教材经典母题及变式", topic: "t10" },
    { title: "单元复习", topic: "t13" }
  ],
  quanpin: [
    { title: "认识生活中的立体图形", topic: "t8" },
    { title: "立体图形的构成", topic: "t8" },
    { title: "棱柱、圆柱、圆锥", topic: "t10" },
    { title: "展开与折叠", topic: "t4" },
    { title: "图形的认识与分类", topic: "t23" },
    { title: "综合应用", topic: "t13" },
    { title: "线段与角的度量", topic: "t10" },
    { title: "几何作图基础", topic: "t24" }
  ]
};

function homepageEntryOptions(filter, entry) {
  const optionsByFilter = {
    paper: {
      "真题": { examType: "real" },
      "模拟": { examType: "mock" },
      "周测": { examType: "unit", query: "周测" },
      "月考": { examType: "monthly" },
      "期中": { examType: "midterm" },
      "期末": { examType: "final" },
      "单元测验": { examType: "unit", query: "单元" },
      "中考衔接": { examType: "all", query: "中考衔接" },
      "阶段测评": { examType: "all" },
      "基于整卷改编": { examType: "all" }
    },
    workbook: {
      "本地教辅": { view: "album", keepAlbumState: true },
      "热门教辅": { view: "album", keepAlbumState: true },
      "同步训练": { view: "album", keepAlbumState: true },
      "导学案": { view: "album", albumId: "duowei", keepAlbumState: true },
      "分层作业": { view: "album", keepAlbumState: true },
      "复习训练": { view: "album", keepAlbumState: true },
      "同步备课": { view: "album", keepAlbumState: true },
      "课后巩固": { view: "album", keepAlbumState: true }
    },
    compilation: {
      "地区试题汇编": { category: "region" },
      "年度汇编": { category: "annual" },
      "名校汇编": { category: "school" },
      "专题汇编": { category: "topic" },
      "多卷精选": { category: "multi" },
      "单元复习": { category: "topic" }
    },
    special: {
      "知识点专项": { category: "all" },
      "题型专项": { category: "geo-model" },
      "易错专项": { category: "all", query: "易错" },
      "情境题": { category: "all", query: "情境" },
      "思维提升": { category: "hard-breakthrough" },
      "巩固复习": { category: "all", query: "中考衔接" },
      "易错诊断": { category: "all", query: "易错" },
      "专项突破": { category: "hard-breakthrough" }
    }
  };
  const defaultsByFilter = {
    paper: { examType: "all", year: "all", grade: "all", authority: "all", source: "all", sort: "latest", query: "" },
    workbook: { origin: "all", query: "", keepAlbumState: true },
    compilation: { signal: "all", query: "" },
    special: { difficulty: "all", origin: "all", query: "" }
  };
  return entry
    ? { ...(defaultsByFilter[filter] || {}), ...(optionsByFilter[filter]?.[entry] || {}) }
    : {};
}

const homepagePaperItems = {
  // DEMO 日期用于演示「本地新上」排序；正式环境由资源服务返回平台首次上线时间。
  t2: { id:"t2", authority:"district", examType:"final", sourceVerified:true, scopeVerified:true, districtCode:"110105", publishedAt:"2026-08-11" },
  t14: { id:"t14", authority:"district", examType:"midterm", sourceVerified:true, scopeVerified:true, districtCode:"110105", publishedAt:"2026-08-06" },
  t25: { id:"t25", authority:"district", examType:"final", sourceVerified:true, scopeVerified:true, districtCode:"110105", publishedAt:"2026-08-07" },
  t59: { id:"t59", authority:"local", examType:"monthly", sourceVerified:true, districtCode:"110105", publishedAt:"2026-08-13" },
  t62: { id:"t62", authority:"school", examType:"midterm", sourceVerified:true, famousSchoolVerified:true, districtCode:"110105", publishedAt:"2026-08-12", uploader:{ name:"八十中教研组", tone:"amber" } },
  t63: { id:"t63", authority:"school", examType:"midterm", sourceVerified:true, famousSchoolVerified:true, peerMatched:true, publishedAt:"2026-08-09", uploader:{ name:"经纶教研组", tone:"blue" } },
  t64: { id:"t64", authority:"district", examType:"final", sourceVerified:true, scopeVerified:true, districtCode:"110105", publishedAt:"2026-08-08" },
  t65: { id:"t65", authority:"group", examType:"midterm", sourceVerified:true, scopeVerified:true, publishedAt:"2026-08-10", uploader:{ name:"北京中学教研组", tone:"violet" } },
  t58: { id:"t58", authority:"school", examType:"mock", sourceVerified:true, famousSchoolVerified:true, publishedAt:"2026-08-05", uploader:{ name:"八十中数学组", tone:"amber" } },
  t66: { id:"t66", authority:"district", examType:"real", sourceVerified:true, scopeVerified:true, publishedAt:"2026-08-04" },
  t67: { id:"t67", authority:"school", examType:"final", sourceVerified:true, famousSchoolVerified:true, publishedAt:"2026-08-03", uploader:{ name:"朝外教研组", tone:"rose" } },
  t68: { id:"t68", authority:"school", examType:"midterm", sourceVerified:true, famousSchoolVerified:true, publishedAt:"2026-08-02", uploader:{ name:"日坛教研组", tone:"blue" } },
  t69: { id:"t69", authority:"school", examType:"final", sourceVerified:true, famousSchoolVerified:true, publishedAt:"2026-08-01", uploader:{ name:"十七中教研组", tone:"amber" } },
  t70: { id:"t70", authority:"school", examType:"monthly", sourceVerified:true, famousSchoolVerified:true, publishedAt:"2026-07-31", uploader:{ name:"八十中分校教研组", tone:"violet" } },
  t71: { id:"t71", authority:"school", examType:"midterm", sourceVerified:true, famousSchoolVerified:true, districtCode:"110102", publishedAt:"2026-08-12", uploader:{ name:"四中教研组", tone:"amber" } },
  t72: { id:"t72", authority:"school", examType:"final", sourceVerified:true, famousSchoolVerified:true, districtCode:"110102", publishedAt:"2026-08-08", uploader:{ name:"八中教研组", tone:"blue" } },
  t73: { id:"t73", authority:"school", examType:"midterm", sourceVerified:true, famousSchoolVerified:true, districtCode:"110108", publishedAt:"2026-08-13", uploader:{ name:"人大附中教研组", tone:"violet" } },
  t74: { id:"t74", authority:"school", examType:"final", sourceVerified:true, famousSchoolVerified:true, districtCode:"110108", publishedAt:"2026-08-10", uploader:{ name:"清华附中教研组", tone:"rose" } },
  t75: { id:"t75", authority:"school", examType:"monthly", sourceVerified:true, famousSchoolVerified:true, districtCode:"110108", publishedAt:"2026-08-06", uploader:{ name:"北大附中教研组", tone:"amber" } },
  t76: { id:"t76", authority:"school", examType:"final", sourceVerified:true, famousSchoolVerified:true, districtCode:"110102", publishedAt:"2026-08-09", uploader:{ name:"师大附中教研组", tone:"blue" } },
  t77: { id:"t77", authority:"school", examType:"midterm", sourceVerified:true, famousSchoolVerified:true, districtCode:"110108", publishedAt:"2026-08-07", uploader:{ name:"十一学校教研组", tone:"amber" } },
  t78: { id:"t78", authority:"school", examType:"midterm", sourceVerified:true, famousSchoolVerified:true, districtCode:"110101", publishedAt:"2026-08-05", uploader:{ name:"北京二中教研组", tone:"violet" } }
};

// DEMO 运营白名单：正式环境按城市、学年和租户配置，不从标题或使用量推断。
const strongDistrictPolicy = {
  label: "强区",
  schoolYear: "2026-2027",
  districtCodes: new Set(["110105", "110102", "110108"])
};

function isStrongDistrictPaper(item) {
  return Boolean(item?.sourceVerified && item.districtCode && strongDistrictPolicy.districtCodes.has(item.districtCode));
}

const homepagePaperAuthorityLabels = {
  school: "名校",
  district: "区统考",
  districtPaper: "区级试卷",
  group: "集团校联考",
  local: "集团校联考"
};

const homepagePaperDisplayTitles = {
  t2: "朝阳区 · 期末统考卷",
  t14: "朝阳区 · 期中统考卷",
  t25: "朝阳区 · 期末统考卷",
  t59: "朝阳区 · 10月月考卷",
  t62: "北京八十中 · 期中卷",
  t63: "陈经纶中学 · 期中卷",
  t64: "朝阳区 · 期末质量监测卷",
  t65: "北京中学教育集团 · 期中联考卷",
  t67: "朝阳外国语 · 期末卷",
  t68: "日坛中学 · 期中卷",
  t69: "北京十七中 · 期末卷",
  t70: "八十中分校 · 月考卷",
  t71: "北京四中 · 期中卷",
  t72: "北京八中 · 期末卷",
  t73: "人大附中 · 期中卷",
  t74: "清华附中 · 期末卷",
  t75: "北大附中 · 月考卷",
  t76: "师大附中 · 期末卷",
  t77: "十一学校 · 期中卷",
  t78: "北京二中 · 期中卷"
};

const homepagePaperDisplayFacts = {
  t2: [{ label:"区级统考", className:"is-district" }, { label:"统考原卷", className:"is-original" }],
  t62: [{ label:"朝阳名校", className:"is-school" }, { label:"校考原卷", className:"is-original" }],
  t63: [{ label:"朝阳名校", className:"is-school" }, { label:"校考原卷", className:"is-original" }],
  t64: [{ label:"区级监测", className:"is-district" }, { label:"监测原卷", className:"is-original" }],
  t65: [{ label:"朝阳集团校", className:"is-group" }, { label:"联考原卷", className:"is-original" }],
  t71: [{ label:"西城名校", className:"is-school" }, { label:"校考原卷", className:"is-original" }],
  t73: [{ label:"海淀名校", className:"is-school" }, { label:"校考原卷", className:"is-original" }],
  t74: [{ label:"海淀名校", className:"is-school" }, { label:"校考原卷", className:"is-original" }],
  t76: [{ label:"西城名校", className:"is-school" }, { label:"校考原卷", className:"is-original" }],
  t77: [{ label:"海淀名校", className:"is-school" }, { label:"校考原卷", className:"is-original" }],
  t78: [{ label:"东城名校", className:"is-school" }, { label:"校考原卷", className:"is-original" }]
};

const homepagePaperSourceClasses = {
  school: "is-school",
  district: "is-district",
  districtPaper: "is-district-paper",
  group: "is-group",
  local: "is-local"
};

function getHomepagePaperPresentation(item) {
  if (!item?.sourceVerified) return { label:"学校试卷", className:"is-local" };
  if (item.authority === "school" && !item.famousSchoolVerified) return { label:"学校原卷", className:"is-local" };
  return {
    label: homepagePaperAuthorityLabels[item.authority] || "学校试卷",
    className: homepagePaperSourceClasses[item.authority] || "is-local"
  };
}

function getHomepagePaperFilters(item) {
  if (!item) return [];
  return [
    item.authority === "school" && item.famousSchoolVerified ? "school" : item.authority,
    isStrongDistrictPaper(item) ? "strong" : "",
    item.peerMatched ? "peer" : ""
  ].filter(Boolean);
}

const paperAuthorityOptions = [
  { id:"all", label:"全部" },
  { id:"school", label:"名校", match: topic => homepagePaperItems[topic.id]?.sourceVerified && homepagePaperItems[topic.id]?.famousSchoolVerified },
  { id:"strong", label:strongDistrictPolicy.label, match: topic => isStrongDistrictPaper(homepagePaperItems[topic.id]) },
  { id:"district", label:"区统考", match: topic => homepagePaperItems[topic.id]?.sourceVerified && homepagePaperItems[topic.id]?.authority === "district" },
  { id:"group", label:"集团校联考", match: topic => homepagePaperItems[topic.id]?.sourceVerified && homepagePaperItems[topic.id]?.authority === "group" },
  { id:"peer", label:"同类校", match: topic => Boolean(homepagePaperItems[topic.id]?.peerMatched) },
  { id:"local", label:"集团校联考", match: topic => homepagePaperItems[topic.id]?.sourceVerified && homepagePaperItems[topic.id]?.authority === "local" }
];

const homepageSyncItems = {
  t40: { type:"课时练", source:"人大附中校本练习册", level:"基础" },
  t42: { type:"课时练", source:"北京四中校本练习册", level:"基础" },
  t9: { type:"课后巩固", source:"多维导学案", level:"中等" },
  t41: { type:"单元检测", source:"多维导学案", level:"中等" },
  t54: { type:"历年试题", source:"朝阳区教研精选", level:"中等" },
  t56: { type:"历年试题", source:"朝阳区级试题库", level:"中等" }
};

const homepageFeaturedData = {
  local: {
    description: "优先展示朝阳近期新上资源，按资源类型分区呈现",
    papers: [
      homepagePaperItems.t59,
      homepagePaperItems.t62,
      homepagePaperItems.t2,
      homepagePaperItems.t65,
      homepagePaperItems.t63,
      homepagePaperItems.t64,
      homepagePaperItems.t25,
      homepagePaperItems.t14,
      homepagePaperItems.t66
    ],
    sync: ["t40", "t42", "t9", "t41"],
    compilations: ["t54", "t56"]
  },
  adopted: {
    description: "按平台使用数据排序，实际采用口径接入后替换",
    papers: [
      homepagePaperItems.t25,
      homepagePaperItems.t2,
      homepagePaperItems.t14,
      homepagePaperItems.t59,
      homepagePaperItems.t62,
      homepagePaperItems.t63,
      homepagePaperItems.t64,
      homepagePaperItems.t65,
      homepagePaperItems.t66,
      homepagePaperItems.t58
    ],
    sync: ["t9", "t41"],
    compilations: ["t54", "t56"]
  },
  famous: {
    description: "优先展示已核验的名校与集团校试卷",
    papers: [
      homepagePaperItems.t76,
      homepagePaperItems.t77,
      homepagePaperItems.t78,
      homepagePaperItems.t63,
      homepagePaperItems.t73,
      homepagePaperItems.t71,
      homepagePaperItems.t64,
      homepagePaperItems.t62,
      homepagePaperItems.t59,
      homepagePaperItems.t74
    ]
  }
};

const homepagePaperTypeOptions = [
  { id:"real", label:"真题" },
  { id:"mock", label:"模拟" },
  { id:"opening", label:"开学考试" },
  { id:"midterm", label:"期中" },
  { id:"final", label:"期末" },
  { id:"monthly", label:"月考" },
  { id:"unit", label:"单元测试" },
  { id:"sync", label:"同步练习" },
  { id:"other", label:"其它" }
];

function getHomepagePaperTypeIds(item) {
  if (!item) return [];
  const examType = item.examType || "other";
  const title = byId[item.id]?.title || "";
  const inferredStage = /期中/.test(title)
    ? "midterm"
    : /期末/.test(title)
      ? "final"
      : /月考/.test(title)
        ? "monthly"
        : "";
  return [...new Set([examType, inferredStage, /中考/.test(title) ? "zhongkao" : ""].filter(Boolean))];
}

function getHomepagePaperTypeFacts(item) {
  const type = homepagePaperTypeOptions.find(option => option.id === (item?.examType || "other"));
  return type ? [{ label:type.label, className:["real", "mock"].includes(type.id) ? "is-paper-nature" : "is-paper-stage" }] : [];
}

function getHomepagePaperDistrictFact(item, topic) {
  const text = `${topic?.title || ""} ${topic?.source || ""} ${topic?.reason || ""}`;
  if (item?.districtCode === "110101" || /东城|第二中学|北京二中/.test(text)) {
    return { label:"东城", className:"is-dongcheng" };
  }
  if (item?.districtCode === "110102" || /西城|第四中学|第八中学|师大附中|北京师范大学附属/.test(text)) {
    return { label:"西城", className:"is-xicheng" };
  }
  if (item?.districtCode === "110108" || /海淀|人大附中|清华附中|北大附中|中国人民大学附属|清华大学附属|北京大学附属/.test(text)) {
    return { label:"海淀", className:"is-haidian" };
  }
  if (item?.districtCode === "110105" || /朝阳|八十中|陈经纶|日坛|十七中|朝阳外国语/.test(text)) {
    return { label:"朝阳", className:"is-chaoyang" };
  }
  return null;
}

function getHomepagePaperUploader(item, topic) {
  const mapped = item?.uploader || topic?.author;
  if (!mapped?.name) return null;
  return {
    name: mapped.name,
    tone: mapped.tone || "",
    initial: mapped.name.slice(0, 1)
  };
}

function escapeHomepageTitle(value) {
  return String(value || "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function homepagePaperDetailTitle(topic) {
  let title = normalizeCurrentResourceCopy(topic?.title || "", /中考/.test(topic?.title || ""))
    .replaceAll("七年级（上）", "七年级上册")
    .replaceAll("七年级(上)", "七年级上册")
    .replaceAll("七年级上学期", "七年级上册")
    .replace(/数学(?:试卷|试题)$/, "：数学")
    .replace(/(期中|期末)(?=：数学$)/, "$1考试");
  if (!title.endsWith("：数学") && /数学$/.test(title)) {
    title = title.replace(/数学$/, "：数学");
  }
  return title;
}

function homepagePaperCard(item, options = {}) {
  const topic = byId[item.id];
  if (!topic) return "";
  const presentation = getHomepagePaperPresentation(item);
  const districtFact = getHomepagePaperDistrictFact(item, topic);
  const unifyTags = options.lane === "recommend" || options.lane === "download";
  const curatedFacts = Array.isArray(options.facts) && options.facts.length
    ? options.facts
    : unifyTags
      ? homepagePaperDisplayFacts[item.id]
      : null;
  const facts = options.lane === "download" ? [] : curatedFacts?.length
    ? curatedFacts.slice(0, 2)
    : [
      ...(districtFact ? [districtFact] : []),
      ...(unifyTags || options.lane !== "download" ? [{ ...presentation }] : []),
      ...(unifyTags ? [] : getHomepagePaperTypeFacts(item))
    ].slice(0, unifyTags ? 2 : undefined);
  const filters = getHomepagePaperFilters(item);
  const typeIds = getHomepagePaperTypeIds(item);
  const publishedText = item.publishedAt ? item.publishedAt.replaceAll("-", "/") : "";
  const uploader = options.lane === "famous" ? getHomepagePaperUploader(item, topic) : null;
  const rank = Number(options.rank) || 0;
  const baseDisplayTitle = options.title || (unifyTags && homepagePaperDisplayTitles[item.id]) || topic.title;
  const displayTitle = unifyTags && /卷$/.test(baseDisplayTitle) && !/汇编$/.test(baseDisplayTitle)
    ? `${baseDisplayTitle} · 2026-2027学年`
    : baseDisplayTitle;
  const detailTitle = homepagePaperDetailTitle(topic);
  return `
    <button class="home-paper-card${rank ? " is-ranked" : ""}" type="button" data-topic="${topic.id}" data-context="paper" data-detail-title="${escapeHomepageTitle(detailTitle)}" data-featured-paper-card data-paper-filters="${filters.join(" ")}" data-paper-types="${typeIds.join(" ")}">
      ${rank ? `<span class="home-paper-rank${rank <= 3 ? " is-top" : ""}">${rank}</span>` : ""}
      <span class="home-paper-copy">
        <span class="home-featured-resource-title"><b title="${escapeHomepageTitle(displayTitle)}">${displayTitle}</b></span>
        <span class="home-paper-meta-row">
          <span class="home-paper-facts">${facts.map(fact => `<em class="${fact.className}">${fact.label}</em>`).join("")}</span>
          <small>
            ${uploader ? `<span class="home-paper-uploader"><span class="teacher-avatar ${uploader.tone}">${uploader.initial}</span>${uploader.name}</span>` : ""}
            ${options.lane === "hot" ? `<span><i class="ri-user-line"></i>${topic.usage.toLocaleString()} 人使用</span>` : ""}
            ${options.lane === "download" ? `<span><i class="ri-user-line"></i>${topic.usage.toLocaleString()} 人使用</span>` : ""}
            ${options.lane === "download" ? "" : publishedText ? `<span class="home-paper-published"><i class="ri-time-line"></i>${publishedText}</span>` : ""}
          </small>
        </span>
      </span>
    </button>`;
}

function homepageCompactResource(topicId, options = {}) {
  const topic = byId[topicId];
  if (!topic) return "";
  const display = homepageSyncItems[topicId] || { type:options.type || "同步练习", source:topic.source, level:topic.difficulty };
  const detail = `${topic.questions}题 · ${topic.minutes}分钟 · ${display.level || topic.difficulty}`;
  const brandInTitle = ["多维导学案", "全品学练考", "人大附中校本练习册", "北京四中校本练习册"].includes(display.source);
  const displayTitle = brandInTitle ? `[${display.source}]${topic.title}` : topic.title;
  return `
    <button class="home-compact-resource ${["历年试题", "考题整理"].includes(display.type) ? "is-compilation" : ""}" type="button" data-topic="${topic.id}" data-context="${options.context || "series"}">
      <span class="home-compact-copy"><span class="home-featured-resource-title"><b title="${escapeHomepageTitle(displayTitle)}">${displayTitle}</b></span><span class="home-compact-meta"><span>${brandInTitle ? "" : `<em class="home-compact-source">${display.source}</em>`}<em class="home-compact-task">${display.type}</em><i>${detail}</i></span><small><i class="ri-user-line"></i>${topic.usage.toLocaleString()} 人使用</small></span></span>
      <i class="ri-arrow-right-s-line"></i>
    </button>`;
}

function homepagePaperLane(mode, title, papers) {
  const icons = { latest: "ri-time-line", hot: "ri-fire-line", famous: "ri-building-4-line", download: "ri-bar-chart-2-line" };
  const visiblePapers = papers.slice(0, mode === "download" ? 10 : homepagePaperLaneLimit);
  return `
    <section class="home-paper-lane is-${mode}" data-paper-lane="${mode}" aria-label="${title}">
      <header>
        <div class="home-lane-heading"><h3><i class="${icons[mode] || "ri-file-list-3-line"}"></i>${title}</h3>${mode === "download" ? "<em>TOP 10</em><small>近 7 日教师使用热度</small>" : ""}</div>
        <button type="button" class="home-paper-lane-more" data-open-filter="paper" ${mode === "download" ? "data-resource-entry=\"教师热用榜\"" : ""}>更多 <i class="ri-arrow-right-line"></i></button>
      </header>
      <div class="home-paper-lane-list">${visiblePapers.map((item, index) => homepagePaperCard(item, { lane:mode, rank: mode === "download" ? index + 1 : 0 })).join("")}</div>
      <div class="home-paper-lane-empty" role="status" ${visiblePapers.length ? "hidden" : ""}>当前暂无资源</div>
    </section>`;
}

function homepageFeaturedPickCard(pick) {
  if (pick.kind === "paper") {
    const item = homepagePaperItems[pick.id];
    return item ? homepagePaperCard(item, { lane: "recommend", title: pick.title, facts: pick.tags }) : "";
  }
  const topic = byId[pick.id];
  if (!topic) return "";
  const kindMeta = {
    compilation: { label: "试题汇编", className: "is-kind-compilation", context: "paper" },
    workbook: { label: "同步练习", className: "is-kind-workbook", context: "series" },
    special: { label: "专题", className: "is-kind-special", context: "special" }
  }[pick.kind] || { label: "精选", className: "", context: "paper" };
  const displayTitle = pick.title || topic.title;
  const displayFacts = Array.isArray(pick.tags) && pick.tags.length ? pick.tags : [kindMeta];
  const extra = `${topic.questions}题 · ${topic.minutes}分钟 · ${topic.difficulty}`;
  return `
    <button class="home-paper-card" type="button" data-topic="${topic.id}" data-context="${kindMeta.context}">
      <span class="home-paper-copy">
        <span class="home-featured-resource-title"><b>${displayTitle}</b></span>
        <span class="home-paper-meta-row">
          <span class="home-paper-facts">${displayFacts.slice(0, 2).map(fact => `<em class="${fact.className || ""}">${fact.label}</em>`).join("")}</span>
          <small><span>${extra}</span></small>
        </span>
      </span>
    </button>`;
}

function homepageScopeSelectors() {
  const option = (value, current) => `<option${value === current ? " selected" : ""}>${value}</option>`;
  return `<div class="fx-library-filterbar" aria-label="当前教学范围">
    <div class="fx-library-selectors">
      <label aria-label="地区"><select id="regionSelect">${["朝阳区","海淀区","西城区","东城区"].map(value => option(value, homepageScopeState.region)).join("")}</select></label>
      <label aria-label="年级"><select id="gradeSelect">${["七年级上","七年级下","八年级上","九年级上"].map(value => option(value, homepageScopeState.grade)).join("")}</select></label>
      <label aria-label="学科"><select id="subjectSelect">${["数学","语文","英语","物理"].map(value => option(value, homepageScopeState.subject)).join("")}</select></label>
    </div>
  </div>`;
}

function homepageSearchBar() {
  return `<section class="home-library-search" aria-label="搜索题库">
    <form data-home-search-form>
      <i class="ri-search-line"></i>
      <input data-home-search-input type="search" autocomplete="off" placeholder="搜索知识点、试卷或学校，如：二次函数" />
      <button type="submit">搜索</button>
    </form>
    <span><i class="ri-refresh-line"></i>已匹配 ${homepageScopeState.region} · ${homepageScopeState.grade} · ${homepageScopeState.subject} 资源</span>
  </section>`;
}

function homepageFeaturedPanel() {
  const featuredPool = [
    { kind: "paper", id: "t65" },
    { kind: "paper", id: "t73" },
    { kind: "paper", id: "t71" },
    { kind: "compilation", id: "t54", title: "朝阳区 · 近3年期中卷汇编", tags: [{ label:"多卷汇编", className:"is-kind-compilation" }, { label:"高频考点", className:"is-popular" }] },
    { kind: "workbook", id: "t40", title: "有理数核心概念 · 课时过关", tags: [{ label:"同步练习", className:"is-kind-workbook" }, { label:"基础巩固", className:"is-fit" }] },
    { kind: "paper", id: "t74" },
    { kind: "paper", id: "t2" },
    { kind: "special", id: "t1", title: "有理数符号运算 · 易错二练", tags: [{ label:"专题练习", className:"is-kind-special" }, { label:"易错巩固", className:"is-fit" }] },
    { kind: "paper", id: "t62" },
    { kind: "paper", id: "t64" },
    { kind: "paper", id: "t63" },
    { kind: "paper", id: "t59" },
    { kind: "paper", id: "t67" },
    { kind: "paper", id: "t68" },
    { kind: "special", id: "t23", title: "移项与符号 · 高频易错专练", tags: [{ label:"当前年级", className:"is-kind-special" }, { label:"高频易错", className:"is-fit" }] }
  ];
  const scopeKey = `${homepageScopeState.region}${homepageScopeState.grade}${homepageScopeState.subject}`;
  const scopeOffset = scopeKey === "朝阳区七年级上数学"
    ? 0
    : [...scopeKey].reduce((sum, char) => sum + char.charCodeAt(0), 0) % featuredPool.length;
  const featuredPicks = [...featuredPool.slice(scopeOffset), ...featuredPool.slice(0, scopeOffset)].slice(0, 12);
  const famousPapers = [...homepageFeaturedData.famous.papers]
    .sort((a, b) => (byId[b.id]?.usage || 0) - (byId[a.id]?.usage || 0));
  const syncData = homepageFeaturedData.local;
  return `
    <div class="home-featured-panel" data-featured-panel="combined">
      <div class="home-featured-layout" data-featured-layout>
        <section class="home-featured-paper">
          <div class="home-paper-recommend-layout">
            <section class="home-recommend-module" aria-label="精选">
              <header>
                <h3><i class="ri-star-smile-line"></i>精选</h3>
                ${homepageScopeSelectors()}
              </header>
              <div class="home-recommend-grid">${featuredPicks.map(homepageFeaturedPickCard).join("")}</div>
            </section>
            ${homepagePaperLane("download", "教师热用榜", famousPapers)}
          </div>
        </section>
        <section class="home-featured-sync home-featured-learning" aria-labelledby="home-sync-practice-title">
          <header class="home-featured-subhead home-sync-shared-head"><div class="home-paper-title-line home-sync-title-line"><span id="home-sync-practice-title"><i class="ri-book-open-line"></i>同步练习</span><small>紧跟教材章节与课堂进度</small></div><button type="button" class="home-paper-lane-more" data-open-filter="chapter">更多 <i class="ri-arrow-right-line"></i></button></header>
          <div>
            ${syncData.sync.map(id => homepageCompactResource(id, { type:"同步练习", context:"series" })).join("")}
            ${syncData.compilations.map(id => homepageCompactResource(id, { type:"考题整理", context:"paper" })).join("")}
          </div>
        </section>
      </div>
    </div>`;
}

function homepageFeaturedResources() {
  return `
    <section class="home-section home-featured-section" aria-label="本地资源">
      <div class="home-mobile-scope" aria-label="当前教学范围"><i class="ri-map-pin-2-line"></i><span>朝阳区 · 七年级上 数学 · 人教版上册</span></div>
      ${homepageFeaturedPanel()}
    </section>`;
}

function homepageSectionHeading(options) {
  return `
    <header class="home-resource-section-heading">
      <span class="home-resource-section-icon"><i class="${options.icon}"></i></span>
      <div><h2>${options.title}</h2></div>
      <button type="button" data-open-filter="${options.filter}" ${options.entry ? `data-resource-entry="${options.entry}"` : ""}>${options.cta || "更多"} <i class="ri-arrow-right-line"></i></button>
    </header>`;
}

function homepageResourceTile(topicId, options = {}) {
  const topic = byId[topicId];
  if (!topic) return "";
  return `
    <button class="home-resource-tile" type="button" data-topic="${topic.id}" data-context="${options.context || "special"}">
      <span class="home-resource-tile-label">${options.label || "专题"}</span>
      <b>${topic.title}</b>
      <p>${topic.focus}</p>
      <small>${topic.source}<i></i>${topic.questions} 题<i></i>${topic.usage.toLocaleString()} 次使用</small>
    </button>`;
}

function homepageSyncResourceSection() {
  return `
    <section class="home-resource-section home-sync-resource-section">
      ${homepageSectionHeading({ icon:"ri-book-open-line", eyebrow:"跟教材进度走", title:"同步资源", description:"同步练习＋按章节整理的试题汇编", filter:"workbook" })}
      <div class="home-sync-resource-grid">
        <article><header><b>同步练习</b><button type="button" data-open-filter="workbook" data-resource-entry="同步训练">按教辅查看</button></header>${["t40", "t42", "t48"].map(id => homepageCompactResource(id, { type:"同步练习", context:"series" })).join("")}</article>
        <article><header><b>章节试题汇编</b><button type="button" data-open-filter="compilation" data-resource-entry="专题汇编">按章节查看</button></header>${["t54", "t56", "t57"].map(id => homepageCompactResource(id, { type:"试题汇编", context:"paper" })).join("")}</article>
      </div>
    </section>`;
}

function homepagePaperResourceSection() {
  const paperItems = [homepagePaperItems.t59, homepagePaperItems.t2, homepagePaperItems.t14, homepagePaperItems.t25];
  return `
    <section class="home-resource-section home-paper-resource-section">
      ${homepageSectionHeading({ icon:"ri-file-list-3-line", title:"试卷", filter:"paper" })}
      <div class="home-paper-entry-chips">
        <span>考试阶段</span>
        ${["真题", "月考", "期中", "期末"].map(label => `<button type="button" data-open-filter="paper" data-resource-entry="${label}">${label}</button>`).join("")}
        <i></i><span>来源标签</span>
        <button type="button" disabled title="接入可核验的考试组织数据后开放">区统考</button>
        <button type="button" disabled title="接入可核验的考试组织数据后开放">集团联考</button>
        <button type="button" disabled title="学校名单与同类校规则完善后开放">名校</button>
        <button type="button" disabled title="学校名单与同类校规则完善后开放">同类校</button>
      </div>
      <div class="home-paper-resource-grid">${paperItems.map(item => homepagePaperCard(item, { compact:true })).join("")}</div>
    </section>`;
}

function homepageSpecialResourceSection() {
  const specialItems = [
    { id:"t18", number:"01", tags:["阶段复习", "培优提高"], title:"数与式综合：有理数、整式与方程", level:"中等—提高" },
    { id:"t3", number:"02", tags:["情境应用", "建模"], title:"朝阳真实情境：代数式建模专项", level:"中等" },
    { id:"t32", number:"03", tags:["方法突破", "规范表达"], title:"几何语言转换与规范表达", level:"基础—中等" },
    { id:"t1", number:"04", tags:["易错补弱", "二次过关"], title:"有理数符号与运算易错二练", level:"中等" },
    { id:"t28", number:"05", tags:["阅读理解", "情境应用"], title:"数学阅读理解：情境信息提取", level:"较难" }
  ];
  return `
    <section class="home-resource-section home-special-resource-section">
      ${homepageSectionHeading({ icon:"ri-focus-3-line", title:"专题", filter:"special" })}
      <div class="home-special-resource-grid">
        ${specialItems.map(item => {
          const topic = byId[item.id];
          if (!topic) return "";
          return `<button class="home-special-card" type="button" data-topic="${topic.id}" data-context="special">
            <span class="home-special-card-top"><em>${item.number}</em><span>${item.tags.map(tag => `<i>${tag}</i>`).join("")}</span></span>
            <b>${item.title}</b>
            <small>${topic.questions} 题 <i></i> ${topic.minutes} 分钟 <i></i> ${item.level}</small>
          </button>`;
        }).join("")}
      </div>
    </section>`;
}

function renderWorkbookShelfCards(albumIds = homepageWorkbookShelfIds) {
  const albumPresentation = {
    duowei: { tone:"indigo", spine:"综合", kind:"综合练习", scene:"课时练 + 单元检测" },
    quanpin: { tone:"rose", spine:"同步", kind:"同步练习", scene:"分层巩固 + 单元练习" },
    yuanchuang: { tone:"violet", spine:"同步", kind:"同步练习", scene:"课堂同步训练 + 题型梯度" },
    tiyou: { tone:"slate", spine:"综合", kind:"综合练习", scene:"阶段复习 + 能力培优" },
    yicuo: { tone:"rose", spine:"综合", kind:"独立目录", scene:"错因拆解与变式" }
  };

  return albumIds.map(albumId => {
    const album = workbookAlbums.find(item => item.id === albumId);
    if (!album) return "";
    const albumTopics = topics.filter(topic => topic.tag === "workbook" && topic.source === album.source);
    const totalQuestions = albumTopics.reduce((sum, topic) => sum + (Number(topic.questions) || 0), 0);
    const display = albumPresentation[album.id] || { tone:"indigo", spine:"练习册", kind:"练习册", scene: album.subtitle || "" };
    return `<button type="button" class="home-workbook-card is-${display.tone}" data-album-open="${album.id}">
      <span class="home-workbook-spine"><i class="ri-book-2-line"></i><em>${display.spine}</em></span>
      <span class="home-workbook-copy"><small>${display.kind}</small><b>${album.name}</b><p>${display.scene}</p><em>${albumTopics.length}份练习 · ${totalQuestions}道题</em></span>
      <i class="ri-arrow-right-s-line"></i>
    </button>`;
  }).join("");
}

function homepageAlbumResourceSection(inFeatured = false) {
  return `
    <section class="home-resource-section home-album-resource-section ${inFeatured ? "home-featured-workbook" : ""}">
      ${homepageSectionHeading({ icon:"ri-book-2-line", title:"练习册", filter:"workbook" })}
      <div class="home-workbook-panel" data-home-workbook-shelf>
        ${renderWorkbookShelfCards(homepageWorkbookShelfIds)}
      </div>
    </section>`;
}

function homepageResourceSections() {
  return `<div class="home-resource-sections" aria-label="按资源类型查找">
    ${homepageSpecialResourceSection()}
  </div>`;
}

function homepageSeriesSection() {
  return `
    <div class="workspace-home">
      ${homepageSearchBar()}
      ${homepageFeaturedResources()}
      ${homepageResourceSections()}
    </div>`;
}

function categoryViewShell(filter, content) {
  const meta = {
    paper: { title: "试卷", desc: "按考试类型、学年与地区筛选" },
    chapter: { title: "同步练习", desc: "按教材章节和课堂进度查找" },
    special: { title: "专题", desc: "聚合高频考点、易错题与能力训练" },
    compilation: { title: "试题汇编", desc: "多卷去重、按考点重组的整套资源" },
    workbook: { title: "同步资源", desc: "按教辅、教材版本与年份查找" }
  }[filter] || { title: "题库", desc: "查找适合当前教学进度的资源" };
  return `<div class="fx-category-page">
    <header class="fx-category-head">
      <button type="button" data-open-filter="all" aria-label="返回题库首页"><i class="ri-arrow-left-line"></i></button>
      <div><h1>${meta.title}</h1><p>${meta.desc}</p></div>
      <span>${homepageScopeState.region} · ${homepageScopeState.grade} · ${homepageScopeState.subject}</span>
    </header>
    ${content}
  </div>`;
}

const feedTopicIds = ["t36","t37","t4","t6","t25","t41","t9","t18","t1","t16","t14","t35","t11","t23","t40","t3","t38","t39","t21","t2","t27","t10","t17","t33","t5","t8","t13","t15","t19","t20","t22","t24","t26","t28","t29","t30","t31","t32","t34","t42","t43","t44","t45","t46","t47","t48","t49","t50","t51"];

function infiniteFeedMarkup() {
  return `
    <section id="squareSection" class="endless-batch" data-square-section>
      <div class="square-filter-collapsed" data-filter-collapsed aria-hidden="false">
        <div class="square-filter-toolbar" data-filter-toolbar>
          <button class="filter-trigger" type="button" data-filter-toggle aria-expanded="false">
            <i class="ri-equalizer-3-line"></i><span>筛选</span><b data-filter-count hidden>0</b><i class="ri-arrow-down-s-line"></i>
          </button>
          <div class="active-filter-chips" data-active-filter-chips></div>
          <div class="sort-control">${filterButton("sort", "default", "推荐", true)}${filterButton("sort", "latest", "最新")}${filterButton("sort", "usage", "使用量")}</div>
        </div>
      </div>
      <div class="square-filter-panel" aria-label="题单广场筛选">
        <div class="square-filter-row"><span>难度</span><div>${filterButton("difficulty", "all", "不限", true)}${filterButton("difficulty", "简单", "基础")}${filterButton("difficulty", "中等", "中等")}${filterButton("difficulty", "较难", "提高")}</div></div>
        <div class="square-filter-row"><span>来源</span><div>${filterButton("source", "all", "全部", true)}${filterButton("source", "local", "本地资源")}${filterButton("source", "famous", "名校资源")}${filterButton("source", "school", "本校共享")}${filterButton("source", "series", "系列题单")}</div></div>
        <div class="square-filter-row"><span>特色</span><div>${filterButton("feature", "all", "全部", true)}${filterButton("feature", "精品", "精品")}${filterButton("feature", "名师推荐", "名师推荐")}${filterButton("feature", "试题汇编", "试题汇编")}${filterButton("feature", "最新", "最新")}</div></div>
        <div class="filter-panel-footer"><span>可组合多个条件筛选题单</span><button type="button" data-filter-reset>重置筛选</button></div>
      </div>
      <div class="flat-resource-grid" data-endless-grid></div>
      <div class="square-empty" data-feed-empty hidden>暂时没有符合全部条件的题单，减少一个筛选条件试试。</div>
    </section>`;
}

function filterButton(key, value, label, active = false) {
  return `<button class="${active ? "active" : ""}" data-feed-key="${key}" data-feed-value="${value}">${label}</button>`;
}

const filterSummaryLabels = {
  type: { all:"全部", sync:"同步练习", special:"专题", paper:"试卷" },
  difficulty: { all:"不限", 简单:"基础", 中等:"中等", 较难:"提高" },
  source: { all:"全部", local:"本地资源", famous:"名校资源", school:"本校共享", series:"系列题单" },
  feature: { all:"全部", 精品:"精品", 名师推荐:"名师推荐", 试题汇编:"试题汇编", 最新:"最新" },
  sort: { default:"推荐", usage:"使用量", latest:"最新" }
};

function updateFilterSummary() {
  const section = document.querySelector("[data-square-section]");
  if (!section) return;
  const activeKeys = ["difficulty", "source", "feature"].filter(key => feedFilterState[key] !== "all");
  const chipBox = section.querySelector("[data-active-filter-chips]");
  chipBox.innerHTML = activeKeys.length
    ? activeKeys.map(key => `<button class="active-filter-chip" type="button" data-clear-filter="${key}">${filterSummaryLabels[key][feedFilterState[key]]}<i class="ri-close-line"></i></button>`).join("")
    : "";
  const count = section.querySelector("[data-filter-count]");
  count.hidden = activeKeys.length === 0;
  count.textContent = String(activeKeys.length);
  const sortButton = section.querySelector(`.sort-control [data-feed-key="sort"].active`);
  if (sortButton) sortButton.setAttribute("aria-label", `当前选择：${filterSummaryLabels.sort[feedFilterState.sort]}`);
}

function setSquareFilterCollapsed(collapsed) {
  const section = document.querySelector("[data-square-section]");
  if (!section) return;
  section.classList.toggle("is-filter-collapsed", collapsed);
  const summaryBar = section.querySelector("[data-filter-collapsed]");
  const toggle = section.querySelector("[data-filter-toggle]");
  summaryBar.setAttribute("aria-hidden", "false");
  toggle.setAttribute("aria-expanded", String(!collapsed));
  updateFilterSummary();
}

function homepageFeed() {
  return homepageSeriesSection();
}

function homepageSearchResults(query, scope = "all") {
  const keyword = query.trim().toLowerCase();
  const tagMatch = topic => scope === "all"
    || topic.tag === scope;
  return topics
    .filter(topic => !topic.legacy)
    .filter(tagMatch)
    .filter(topic => `${topic.title} ${topic.focus} ${topic.reason} ${topic.source}`.toLowerCase().includes(keyword))
    .sort((a, b) => {
      const localDelta = Number(/北京|朝阳/.test(`${b.title} ${b.source}`)) - Number(/北京|朝阳/.test(`${a.title} ${a.source}`));
      return localDelta || b.usage - a.usage;
    });
}

function homepageSearchView(query) {
  const list = homepageSearchResults(query, homepageSearchScope);
  const scopeLabels = { all:"全部整套", paper:"试卷", workbook:"练习册", compilation:"汇编套题", special:"专题题单" };
  return `
    <section class="home-search-results-view" aria-labelledby="homeSearchResultTitle">
      <header>
        <button type="button" data-home-search-clear><i class="ri-arrow-left-line"></i>返回资源首页</button>
        <div><p>${scopeLabels[homepageSearchScope] || "全部整套"} · 已按本地匹配度排序</p><h1 id="homeSearchResultTitle">“${query.replace(/[<>]/g, "")}”的搜索结果</h1></div>
        <span>共 <strong>${list.length}</strong> 套</span>
      </header>
      <div class="resource-card-grid home-search-result-grid">${list.map(topic => topicCard(topic, { context: topic.tag === "workbook" ? "series" : topic.tag === "special" ? "special" : topic.tag === "chapter" ? "chapter" : "paper" })).join("")}</div>
      <div class="home-search-empty" ${list.length ? "hidden" : ""}>
        <i class="ri-file-search-line"></i><b>暂时没有完全匹配的整套资源</b><span>换个关键词，或进入题库按章节、知识点选题。</span><a href="./school.html">去题库组题</a>
      </div>
    </section>`;
}

function paperTopics() {
  return topics.filter(topic => topic.tag === "paper");
}

function paperMatchesYear(topic, year) {
  if (year === "all") return true;
  if (year === "earlier") return !/(202[3-6]|2030)/.test(topic.title);
  return topic.title.includes(year);
}

function paperMatchesGrade(topic, grade) {
  if (grade === "all") return true;
  const option = paperGradeOptions.find(item => item.id === grade);
  return option?.match?.test(topic.title) ?? true;
}

function paperMatchesSource(topic, source) {
  if (source === "all") return true;
  const option = paperSourceOptions.find(item => item.id === source);
  return option?.match?.(topic) ?? true;
}

function paperMatchesAuthority(topic, authority) {
  if (authority === "all") return true;
  const option = paperAuthorityOptions.find(item => item.id === authority);
  return option?.match?.(topic) ?? false;
}

function paperMatchesExamType(topic, examType) {
  const matcher = paperExamTypes[examType]?.match;
  return matcher ? matcher(topic) : true;
}

function filteredPaperTopics() {
  const keyword = paperFilterState.query.trim().toLowerCase();
  let list = paperTopics().filter(topic =>
    paperMatchesExamType(topic, paperFilterState.examType)
    && paperMatchesYear(topic, paperFilterState.year)
    && paperMatchesGrade(topic, paperFilterState.grade)
    && paperMatchesAuthority(topic, paperFilterState.authority)
    && paperMatchesSource(topic, paperFilterState.source)
    && (!keyword || `${topic.title} ${topic.source} ${topic.focus}`.toLowerCase().includes(keyword))
  );
  if (paperFilterState.sort === "recommend") {
    list = [...list].sort((a, b) => b.usage - a.usage);
  } else {
    list = [...list].sort((a, b) => {
      const publishedDelta = String(homepagePaperItems[b.id]?.publishedAt || "").localeCompare(String(homepagePaperItems[a.id]?.publishedAt || ""));
      const latestDelta = (/^(?:最新|新上)$/.test(b.highlight || "") ? 1 : 0) - (/^(?:最新|新上)$/.test(a.highlight || "") ? 1 : 0);
      return publishedDelta || latestDelta || b.id.localeCompare(a.id);
    });
  }
  return list;
}

function paperFilterTagGroup(name, options, activeValue, dataAttr) {
  return `
    <div class="paper-filter-row">
      <span class="paper-filter-label">${name}</span>
      <div class="paper-filter-tags">
        ${options.map(option => {
          const value = typeof option === "string" ? option : option.id;
          const label = typeof option === "string"
            ? (value === "all" ? "全部" : value === "earlier" ? "更早之前" : value)
            : option.label;
          return `<button type="button" class="${activeValue === value ? "active" : ""}" ${dataAttr}="${value}">${label}</button>`;
        }).join("")}
      </div>
    </div>`;
}

function paperCategoryView() {
  const list = filteredPaperTopics();
  const isZhongkao = ["real", "mock"].includes(normalizePaperExamType(paperFilterState.examType));
  return `
    <section class="category-detail paper-category-view">
      <div class="resource-browser paper-browser">
        <nav class="paper-sidebar" aria-label="试卷分类">
          <div class="paper-sidebar-group ${isZhongkao ? "" : "open"}">
            <button class="paper-sidebar-group-toggle" type="button" aria-expanded="${!isZhongkao}">
              <i class="ri-${isZhongkao ? "arrow-right" : "arrow-down-s"}-line"></i><span>同步试卷</span>
            </button>
            <div class="paper-sidebar-items" ${isZhongkao ? "hidden" : ""}>
              ${["all", "opening", "midterm", "final", "monthly", "unit", "sync", "other"].map(type => `
                <button type="button" class="${paperFilterState.examType === type ? "active" : ""}" data-paper-type="${type}">${paperExamTypes[type].label}</button>
              `).join("")}
            </div>
          </div>
          <div class="paper-sidebar-group ${isZhongkao ? "open" : ""}">
            <button class="paper-sidebar-group-toggle" type="button" aria-expanded="${isZhongkao}">
              <i class="ri-${isZhongkao ? "arrow-down-s" : "arrow-right"}-line"></i><span>中考</span>
            </button>
            <div class="paper-sidebar-items" ${isZhongkao ? "" : "hidden"}>
              ${["real", "mock"].map(type => `
                <button type="button" class="${paperFilterState.examType === type ? "active" : ""}" data-paper-type="${type}">${paperExamTypes[type].label}</button>
              `).join("")}
            </div>
          </div>
        </nav>
        <div class="paper-browser-main">
          <div class="paper-filter-panel">
            ${paperFilterTagGroup("学年", paperYearOptions, paperFilterState.year, "data-paper-year")}
            <div class="paper-filter-row">
              <span class="paper-filter-label">地区</span>
              <button class="paper-filter-select" type="button"><span>北京市朝阳区</span><i class="ri-arrow-down-s-line"></i></button>
            </div>
            ${paperFilterTagGroup("年级", paperGradeOptions, paperFilterState.grade, "data-paper-grade")}
            ${paperFilterTagGroup("题源", paperAuthorityOptions, paperFilterState.authority, "data-paper-authority")}
            ${paperFilterTagGroup("资源库", paperSourceOptions, paperFilterState.source, "data-paper-source")}
            <label class="paper-filter-search">
              <span class="paper-filter-label">搜索</span>
              <div class="paper-search-field">
                <i class="ri-search-line"></i>
                <input data-paper-search type="search" value="${paperFilterState.query.replace(/"/g, "&quot;")}" placeholder="请输入试卷名称或其他关键词进行搜索" />
              </div>
            </label>
          </div>
          <div class="paper-list-toolbar">
            <div class="paper-list-tabs" role="tablist" aria-label="试卷排序">
              <button type="button" class="${paperFilterState.sort === "latest" ? "active" : ""}" data-paper-sort="latest" role="tab">最新</button>
              <button type="button" class="${paperFilterState.sort === "recommend" ? "active" : ""}" data-paper-sort="recommend" role="tab">精选</button>
            </div>
            <span class="paper-list-count" data-paper-result-count>试卷 共 ${list.length.toLocaleString()} 份</span>
          </div>
          <div class="resource-card-grid paper-result-grid">${list.map(topic => topicCard(topic, { context: "paper" })).join("")}</div>
          <div class="paper-empty" ${list.length ? "hidden" : ""}>没有找到匹配的试卷，试试调整筛选条件。</div>
        </div>
      </div>
    </section>`;
}

function applyPaperFilters(options = {}) {
  if (options.examType) paperFilterState.examType = normalizePaperExamType(options.examType);
  if (options.year) paperFilterState.year = options.year;
  if (options.grade) paperFilterState.grade = options.grade;
  if (options.authority) paperFilterState.authority = options.authority;
  if (options.source) paperFilterState.source = options.source;
  if (options.sort) paperFilterState.sort = options.sort;
  if (typeof options.query === "string") paperFilterState.query = options.query;

  const panel = document.querySelector(".paper-category-view");
  if (!panel) return;

  const list = filteredPaperTopics();
  panel.querySelectorAll("[data-paper-type]").forEach(button => {
    button.classList.toggle("active", button.dataset.paperType === paperFilterState.examType);
  });
  panel.querySelectorAll("[data-paper-year]").forEach(button => {
    button.classList.toggle("active", button.dataset.paperYear === paperFilterState.year);
  });
  panel.querySelectorAll("[data-paper-grade]").forEach(button => {
    button.classList.toggle("active", button.dataset.paperGrade === paperFilterState.grade);
  });
  panel.querySelectorAll("[data-paper-authority]").forEach(button => {
    button.classList.toggle("active", button.dataset.paperAuthority === paperFilterState.authority);
  });
  panel.querySelectorAll("[data-paper-source]").forEach(button => {
    button.classList.toggle("active", button.dataset.paperSource === paperFilterState.source);
  });
  panel.querySelectorAll("[data-paper-sort]").forEach(button => {
    button.classList.toggle("active", button.dataset.paperSort === paperFilterState.sort);
  });

  const grid = panel.querySelector(".paper-result-grid");
  if (grid) {
    grid.innerHTML = list.map(topic => topicCard(topic, { context: "paper" })).join("");
    bindContentEvents(grid);
  }
  const count = panel.querySelector("[data-paper-result-count]");
  if (count) count.textContent = `试卷 共 ${list.length.toLocaleString()} 份`;
  const empty = panel.querySelector(".paper-empty");
  if (empty) empty.hidden = list.length > 0;

  const isZhongkao = ["real", "mock"].includes(normalizePaperExamType(paperFilterState.examType));
  panel.querySelectorAll(".paper-sidebar-group").forEach((group, index) => {
    const open = index === 0 ? !isZhongkao : isZhongkao;
    group.classList.toggle("open", open);
    const toggle = group.querySelector(".paper-sidebar-group-toggle");
    const items = group.querySelector(".paper-sidebar-items");
    const icon = toggle?.querySelector("i");
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
    if (items) items.hidden = !open;
    if (icon) icon.className = open ? "ri-arrow-down-s-line" : "ri-arrow-right-s-line";
  });
}

function specialTopics() {
  return topics.filter(topic => topic.tag === "special");
}

function specialCategoryMatcher(category) {
  if (category === "all") return () => true;
  const item = [...specialKnowledgeModules, ...specialStandaloneCategories].find(entry => entry.id === category);
  return item?.match ?? (() => true);
}

function specialCategoryLabel(category) {
  if (category === "all") return "全部资源";
  return [...specialKnowledgeModules, ...specialStandaloneCategories].find(entry => entry.id === category)?.label || "全部资源";
}

function filteredSpecialTopics() {
  const keyword = specialFilterState.query.trim().toLowerCase();
  const matcher = specialCategoryMatcher(specialFilterState.category);
  return specialTopics()
    .filter(topic => matcher(topic))
    .filter(topic => specialFilterState.difficulty === "all" || topic.difficulty === specialFilterState.difficulty)
    .filter(topic => matchesResourceOrigin(topic, specialFilterState.origin))
    .filter(topic => !keyword || `${topic.title} ${topic.source} ${topic.focus}`.toLowerCase().includes(keyword))
    .sort((a, b) => b.usage - a.usage);
}

function specialCategoryView() {
  const list = filteredSpecialTopics();
  const activeCategory = specialFilterState.category;
  return `
    <section class="category-detail special-category-view">
      <div class="resource-browser special-browser">
        <nav class="special-sidebar" aria-label="专题分类">
          <button type="button" class="special-root ${activeCategory === "all" ? "active" : ""}" data-special-category="all">全部资源</button>
          <div class="special-sidebar-group open">
            <button class="special-sidebar-group-toggle" type="button" aria-expanded="true">
              <i class="ri-arrow-down-s-line"></i><span>知识模块</span>
            </button>
            <div class="special-sidebar-items">
              ${specialKnowledgeModules.map(item => `
                <button type="button" class="${activeCategory === item.id ? "active" : ""}" data-special-category="${item.id}">${item.label}</button>
              `).join("")}
            </div>
          </div>
          ${specialStandaloneCategories.map(item => `
            <button type="button" class="special-standalone ${activeCategory === item.id ? "active" : ""}" data-special-category="${item.id}">${item.label}</button>
          `).join("")}
        </nav>
        <div class="special-browser-main">
          <div class="special-filter-panel">
            ${paperFilterTagGroup("来自", curatedOriginOptions, specialFilterState.origin, "data-special-origin")}
            <div class="special-filter-row">
              <span class="special-filter-label">难度</span>
              <div class="special-filter-tags">
                ${specialDifficultyOptions.map(option => `
                  <button type="button" class="${specialFilterState.difficulty === option.id ? "active" : ""}" data-special-difficulty="${option.id}">${option.label}</button>
                `).join("")}
              </div>
            </div>
            <label class="paper-filter-search special-filter-search">
              <span class="paper-filter-label">搜索</span>
              <div class="paper-search-field">
                <i class="ri-search-line"></i>
                <input data-special-search type="search" value="${specialFilterState.query.replace(/"/g, "&quot;")}" placeholder="请输入题单名称或其他关键词进行搜索" />
              </div>
            </label>
          </div>
          <div class="special-list-toolbar">
            <b>${specialCategoryLabel(activeCategory)}</b>
            <span class="special-list-count" data-special-result-count>专题 共 ${list.length.toLocaleString()} 份</span>
          </div>
          <div class="resource-card-grid special-result-grid">${list.map(topic => topicCard(topic, { context: "special" })).join("")}</div>
          <div class="special-empty" ${list.length ? "hidden" : ""}>没有找到匹配的专题题单，试试调整筛选条件。</div>
        </div>
      </div>
    </section>`;
}

function applySpecialFilters(options = {}) {
  if (options.category) specialFilterState.category = options.category;
  if (options.difficulty) specialFilterState.difficulty = options.difficulty;
  if (options.origin) specialFilterState.origin = options.origin;
  if (typeof options.query === "string") specialFilterState.query = options.query;
  if (!curatedOriginOptions.some(option => option.id === specialFilterState.origin)) {
    specialFilterState.origin = "all";
  }

  const panel = document.querySelector(".special-category-view");
  if (!panel) return;

  const list = filteredSpecialTopics();
  panel.querySelectorAll("[data-special-category]").forEach(button => {
    button.classList.toggle("active", button.dataset.specialCategory === specialFilterState.category);
  });
  panel.querySelectorAll("[data-special-difficulty]").forEach(button => {
    button.classList.toggle("active", button.dataset.specialDifficulty === specialFilterState.difficulty);
  });
  panel.querySelectorAll("[data-special-origin]").forEach(button => {
    button.classList.toggle("active", button.dataset.specialOrigin === specialFilterState.origin);
  });

  const heading = panel.querySelector(".special-list-toolbar b");
  if (heading) heading.textContent = specialCategoryLabel(specialFilterState.category);

  const grid = panel.querySelector(".special-result-grid");
  if (grid) {
    grid.innerHTML = list.map(topic => topicCard(topic, { context: "special" })).join("");
    bindContentEvents(grid);
  }
  const count = panel.querySelector("[data-special-result-count]");
  if (count) count.textContent = `专题 共 ${list.length.toLocaleString()} 份`;
  const empty = panel.querySelector(".special-empty");
  if (empty) empty.hidden = list.length > 0;
}

function chapterSyncTopics() {
  return topics.filter(topic =>
    ["chapter", "school", "workbook"].includes(topic.tag)
    || matchesResourceOrigin(topic, "zhenti")
  );
}

function chapterSectionEntry(sectionId) {
  if (sectionId === "all") return { id: "all", label: "全部资源", match: () => true };
  for (const item of chapterNavTree) {
    if (item.id === sectionId) return item;
    const section = item.sections?.find(entry => entry.id === sectionId);
    if (section) return section;
  }
  return { id: sectionId, label: "全部资源", match: () => true };
}

function chapterSectionLabel(sectionId) {
  return chapterSectionEntry(sectionId).label;
}

function chapterParentId(sectionId) {
  if (sectionId === "all") return null;
  const parent = chapterNavTree.find(item => item.sections?.some(section => section.id === sectionId));
  return parent?.id || null;
}

function chapterMatchesSection(topic, sectionId) {
  if (sectionId === "all") return true;
  const entry = chapterSectionEntry(sectionId);
  if (entry.match?.(topic)) return true;
  const parent = chapterNavTree.find(item => item.id === sectionId);
  return parent?.match?.(topic) ?? false;
}

function filteredChapterTopics() {
  const keyword = chapterFilterState.query.trim().toLowerCase();
  return chapterSyncTopics()
    .filter(topic => chapterMatchesSection(topic, chapterFilterState.section))
    .filter(topic => chapterFilterState.difficulty === "all" || topic.difficulty === chapterFilterState.difficulty)
    .filter(topic => matchesResourceOrigin(topic, chapterFilterState.origin))
    .filter(topic => paperMatchesSource(topic, chapterFilterState.source))
    .filter(topic => !keyword || chapterText(topic).toLowerCase().includes(keyword))
    .sort((a, b) => b.usage - a.usage);
}

function renderChapterSidebar() {
  const activeSection = chapterFilterState.section;
  const openChapters = new Set(chapterFilterState.openChapters);
  const rootActive = activeSection === "all";
  let html = `
    <button class="chapter-textbook-select" type="button"><span>人教版/七年级上册 (2024)</span><i class="ri-arrow-down-s-line"></i></button>
    <button type="button" class="chapter-root ${rootActive ? "active" : ""}" data-chapter-section="all">全部资源</button>`;

  chapterNavTree.forEach(item => {
    if (item.sections) {
      const open = openChapters.has(item.id) || item.sections.some(section => section.id === activeSection);
      html += `
        <div class="chapter-sidebar-group ${open ? "open" : ""}">
          <button class="chapter-sidebar-group-toggle" type="button" aria-expanded="${open}" data-chapter-toggle="${item.id}">
            <i class="ri-${open ? "arrow-down-s" : "arrow-right-s"}-line"></i><span>${item.label}</span>
          </button>
          <div class="chapter-sidebar-items" ${open ? "" : "hidden"}>
            ${item.sections.map(section => `
              <button type="button" class="${activeSection === section.id ? "active" : ""}" data-chapter-section="${section.id}">${section.label}</button>
            `).join("")}
          </div>
        </div>`;
      return;
    }
    html += `<button type="button" class="chapter-leaf ${activeSection === item.id ? "active" : ""}" data-chapter-section="${item.id}">${item.label}</button>`;
  });
  return html;
}

function chapterCategoryView() {
  const list = filteredChapterTopics();
  return `
    <section class="category-detail chapter-category-view">
      <div class="resource-browser chapter-browser">
        <nav class="chapter-sidebar" aria-label="教材章节">
          ${renderChapterSidebar()}
        </nav>
        <div class="chapter-browser-main">
          <div class="paper-filter-panel chapter-filter-panel">
            ${paperFilterTagGroup("来自", resourceOriginOptions, chapterFilterState.origin, "data-chapter-origin")}
            ${paperFilterTagGroup("难度", specialDifficultyOptions, chapterFilterState.difficulty, "data-chapter-difficulty")}
            ${paperFilterTagGroup("来源", paperSourceOptions, chapterFilterState.source, "data-chapter-source")}
            <div class="paper-filter-row">
              <span class="paper-filter-label">地区</span>
              <button class="paper-filter-select chapter-filter-select" type="button"><span>北京市朝阳区</span><i class="ri-arrow-down-s-line"></i></button>
            </div>
            <label class="paper-filter-search">
              <span class="paper-filter-label">搜索</span>
              <div class="paper-search-field">
                <i class="ri-search-line"></i>
                <input data-chapter-search type="search" value="${chapterFilterState.query.replace(/"/g, "&quot;")}" placeholder="请输入题单名称或其他关键词进行搜索" />
              </div>
            </label>
          </div>
          <div class="chapter-list-toolbar">
            <b>${chapterSectionLabel(chapterFilterState.section)}</b>
            <span class="chapter-list-count" data-chapter-result-count>同步练习 共 ${list.length.toLocaleString()} 份</span>
          </div>
          <div class="resource-card-grid chapter-result-grid">${list.map(topic => topicCard(topic, { context: "chapter" })).join("")}</div>
          <div class="chapter-empty" ${list.length ? "hidden" : ""}>没有找到匹配的题单，试试调整筛选条件。</div>
        </div>
      </div>
    </section>`;
}

function applyChapterFilters(options = {}) {
  if (options.section) {
    chapterFilterState.section = options.section;
    const parentId = chapterParentId(options.section);
    if (parentId && !chapterFilterState.openChapters.includes(parentId)) {
      chapterFilterState.openChapters = [...chapterFilterState.openChapters, parentId];
    }
  }
  if (options.difficulty) chapterFilterState.difficulty = options.difficulty;
  if (options.origin) chapterFilterState.origin = options.origin;
  if (options.source) chapterFilterState.source = options.source;
  if (typeof options.query === "string") chapterFilterState.query = options.query;
  if (options.toggleChapter) {
    const open = new Set(chapterFilterState.openChapters);
    if (open.has(options.toggleChapter)) open.delete(options.toggleChapter);
    else open.add(options.toggleChapter);
    chapterFilterState.openChapters = [...open];
  }

  const panel = document.querySelector(".chapter-category-view");
  if (!panel) return;

  const sidebar = panel.querySelector(".chapter-sidebar");
  if (sidebar) sidebar.innerHTML = renderChapterSidebar();

  const list = filteredChapterTopics();
  panel.querySelectorAll("[data-chapter-difficulty]").forEach(button => {
    button.classList.toggle("active", button.dataset.chapterDifficulty === chapterFilterState.difficulty);
  });
  panel.querySelectorAll("[data-chapter-origin]").forEach(button => {
    button.classList.toggle("active", button.dataset.chapterOrigin === chapterFilterState.origin);
  });
  panel.querySelectorAll("[data-chapter-source]").forEach(button => {
    button.classList.toggle("active", button.dataset.chapterSource === chapterFilterState.source);
  });

  const heading = panel.querySelector(".chapter-list-toolbar b");
  if (heading) heading.textContent = chapterSectionLabel(chapterFilterState.section);

  const grid = panel.querySelector(".chapter-result-grid");
  if (grid) {
    grid.innerHTML = list.map(topic => topicCard(topic, { context: "chapter" })).join("");
    bindContentEvents(grid);
  }
  const count = panel.querySelector("[data-chapter-result-count]");
  if (count) count.textContent = `同步练习 共 ${list.length.toLocaleString()} 份`;
  const empty = panel.querySelector(".chapter-empty");
  if (empty) empty.hidden = list.length > 0;

  bindContentEvents(sidebar);
}

function compilationTopics() {
  return topics.filter(topic => topic.tag === "compilation" && !topic.legacy);
}

function compilationCategoryLabel(category) {
  return compilationCategories.find(item => item.id === category)?.label || "全部汇编";
}

function filteredCompilationTopics() {
  const categoryMatch = compilationCategories.find(item => item.id === compilationFilterState.category)?.match || (() => true);
  const signalMatch = compilationSignals.find(item => item.id === compilationFilterState.signal)?.match || (() => true);
  const keyword = compilationFilterState.query.trim().toLowerCase();
  return compilationTopics()
    .filter(categoryMatch)
    .filter(signalMatch)
    .filter(topic => !keyword || `${topic.title} ${topic.source} ${topic.focus} ${topic.reason}`.toLowerCase().includes(keyword))
    .sort((a, b) => b.usage - a.usage);
}

function compilationCategoryView() {
  const list = filteredCompilationTopics();
  return `
    <section class="category-detail compilation-category-view">
      <div class="resource-browser compilation-browser">
        <nav class="resource-tree compilation-sidebar" aria-label="汇编方式">
          ${compilationCategories.map(item => `
            <button type="button" class="${compilationFilterState.category === item.id ? "active" : ""}" data-compilation-category="${item.id}">
              <b>${item.label}</b><small>${compilationTopics().filter(item.match).length} 份</small>
            </button>`).join("")}
        </nav>
        <div class="resource-browser-content">
          <div class="resource-browser-toolbar compilation-filter-toolbar">
            <div class="resource-chip-group">
              ${compilationSignals.map(item => `<button type="button" class="${compilationFilterState.signal === item.id ? "active" : ""}" data-compilation-signal="${item.id}">${item.label}</button>`).join("")}
            </div>
            <label class="compilation-search">
              <i class="ri-search-line"></i>
              <input data-compilation-search type="search" value="${compilationFilterState.query.replace(/"/g, "&quot;")}" placeholder="搜索地区、年份或考点" />
            </label>
          </div>
          <header class="resource-result-heading"><b>${compilationCategoryLabel(compilationFilterState.category)}</b><em data-compilation-result-count>${list.length} 份汇编</em></header>
          <div class="resource-card-grid result-grid compilation-result-grid">${list.map(topic => topicCard(topic, { context: "paper" })).join("")}</div>
          <div class="compilation-empty" ${list.length ? "hidden" : ""}>没有找到匹配的汇编套题，试试调整筛选条件。</div>
        </div>
      </div>
    </section>`;
}

function applyCompilationFilters(options = {}) {
  if (options.category) compilationFilterState.category = options.category;
  if (options.signal) compilationFilterState.signal = options.signal;
  if (typeof options.query === "string") compilationFilterState.query = options.query;

  const panel = document.querySelector(".compilation-category-view");
  if (!panel) return;
  const list = filteredCompilationTopics();
  panel.querySelectorAll("[data-compilation-category]").forEach(button => {
    button.classList.toggle("active", button.dataset.compilationCategory === compilationFilterState.category);
  });
  panel.querySelectorAll("[data-compilation-signal]").forEach(button => {
    button.classList.toggle("active", button.dataset.compilationSignal === compilationFilterState.signal);
  });
  const heading = panel.querySelector(".resource-result-heading b");
  if (heading) heading.textContent = compilationCategoryLabel(compilationFilterState.category);
  const count = panel.querySelector("[data-compilation-result-count]");
  if (count) count.textContent = `${list.length} 份汇编`;
  const grid = panel.querySelector(".compilation-result-grid");
  if (grid) {
    grid.innerHTML = list.map(topic => topicCard(topic, { context: "paper" })).join("");
    bindContentEvents(grid);
  }
  const empty = panel.querySelector(".compilation-empty");
  if (empty) empty.hidden = list.length > 0;
}

function categoryBrowserView(kind) {
  const config = {
    chapter: { label:"同步练习", navLabel:"教材章节", nav:["正数与负数","有理数及其运算","整式的加减","一元一次方程","图形初步认识"], topics:["t8","t9","t10","t11","t12","t13"], chips:["全部同步", "课时练习", "单元检测", "易错巩固"], selector:"人教版七上" },
    special: { label:"专题", navLabel:"知识领域", nav:["数与式","方程与不等式","函数","图形与几何","统计与概率"], topics:["t1","t3","t5","t23","t28","t31","t32"], chips:["全部专题", "易错巩固", "方法突破", "情境应用", "培优提高"], selector:"全部难度" },
    paper: { label:"试卷", navLabel:"考试类型", nav:["期末考试","期中考试","月考","单元测试","中考真题"], topics:["t2","t4","t6","t14","t25","t27","t33"], chips:["本地优先", "使用最多", "试题汇编"], selector:"北京市朝阳区 · 七年级上 数学" }
  }[kind];
  if (kind === "paper") return paperCategoryView();
  if (kind === "special") return specialCategoryView();
  if (kind === "chapter") return chapterCategoryView();
  if (kind === "compilation") return compilationCategoryView();
  const list = config.topics.map(id => byId[id]).filter(Boolean);
  return `
    <section class="category-detail unified-category-view">
      <div class="resource-browser ${kind}-browser">
        <nav class="resource-tree ${kind === "chapter" ? "chapter-rail" : kind === "special" ? "knowledge-nav" : "paper-filters"}" aria-label="${config.navLabel}">
          ${config.nav.map((label, index) => `<button class="${index === 0 ? "active" : ""}" data-result-title="${label}"><b>${label}</b><small>${[36,82,64,71,48][index] || 24} 份</small></button>`).join("")}
        </nav>
        <div class="resource-browser-content">
          <div class="resource-browser-toolbar"><div class="resource-chip-group">${config.chips.map((chip, index) => `<button class="${index === 0 ? "active" : ""}">${chip}</button>`).join("")}</div><div class="resource-selector-group"><button>${config.selector} <i class="ri-arrow-down-s-line"></i></button></div></div>
          <header class="resource-result-heading"><b>${config.nav[0]}</b><em>${list.length} 份题单</em></header>
          <div class="resource-card-grid result-grid">${list.map(topic => topicCard(topic, { context: kind === "compilation" ? "paper" : kind })).join("")}</div>
        </div>
      </div>
    </section>`;
}

function seriesCategoryView() {
  if (albumFilterState.view === "catalog") return workbookCatalogView();
  const albums = filteredWorkbookAlbums();
  const allSeriesOptions = ["全部系列", ...workbookSeriesOptions];
  return `
    <section class="category-detail album-category-view">
      <div class="paper-filter-panel album-filter-panel">
        ${paperFilterTagGroup("类型", [{ id: "all", label: "全部" }, ...workbookTypeOptions], albumFilterState.origin, "data-album-origin")}
        ${paperFilterTagGroup("教材版本", workbookTextbookOptions, albumFilterState.textbook, "data-album-textbook")}
        ${paperFilterTagGroup("年份", workbookYearOptions, albumFilterState.year, "data-album-year")}
        <div class="paper-filter-row">
          <span class="paper-filter-label">练习册系列</span>
          <div class="paper-filter-tags">
            ${allSeriesOptions.map(series => {
              const value = series === "全部系列" ? "" : series;
              const active = value ? albumFilterState.query === value : !albumFilterState.query.trim();
              return `<button type="button" class="${active ? "active" : ""}" data-album-series="${value.replace(/"/g, "&quot;")}">${series}</button>`;
            }).join("")}
          </div>
        </div>
        <label class="paper-filter-search album-filter-search">
          <span class="paper-filter-label">搜索</span>
          <div class="paper-search-field">
            <i class="ri-search-line"></i>
            <input data-album-search type="search" value="${albumFilterState.query.replace(/"/g, "&quot;")}" placeholder="请输入练习册或题单名称进行搜索" />
          </div>
        </label>
      </div>
      <div class="album-shelf-panel">
        <div class="home-workbook-panel album-shelf-grid">${renderWorkbookShelfCards(albums.map(album => album.id))}</div>
        <div class="album-empty" ${albums.length ? "hidden" : ""}>没有找到匹配的练习册，换个关键词试试。</div>
      </div>
    </section>`;
}

function currentWorkbookAlbum() {
  return workbookAlbums.find(item => item.id === albumFilterState.albumId)
    || workbookAlbums.find(item => item.source === albumFilterState.query)
    || workbookAlbums[0];
}

function walkWorkbookNodes(nodes, visit, parents = []) {
  (nodes || []).forEach(node => {
    visit(node, parents);
    if (node.children?.length) walkWorkbookNodes(node.children, visit, [...parents, node]);
    if (node.modules?.length) walkWorkbookNodes(node.modules, visit, [...parents, node]);
  });
}

function findWorkbookNode(nodeId) {
  let found = null;
  walkWorkbookNodes(workbookCatalogTree, (node, parents) => {
    if (node.id === nodeId) found = { node, parents };
  });
  return found;
}

function workbookNodeSets(node) {
  if (!node) return [];
  if (node.topicId) return [node];
  const sets = [];
  (node.modules || []).forEach(item => sets.push(...workbookNodeSets(item)));
  (node.children || []).forEach(item => sets.push(...workbookNodeSets(item)));
  return sets;
}

function workbookStatusTags(status = []) {
  return status.map(label => `<em class="${label === "已关联" ? "is-linked" : "is-online"}">${label}</em>`).join("");
}

function renderWorkbookTreeNodes(nodes, depth = 0) {
  const openNodes = new Set(albumFilterState.openNodes);
  const activeId = albumFilterState.nodeId;
  return nodes.map(node => {
    const hasChildren = Boolean(node.children?.length || node.modules?.length);
    const open = openNodes.has(node.id);
    const children = [...(node.children || []), ...(node.modules || [])];
    const active = node.id === activeId;
    return `
      <div class="workbook-tree-node ${open ? "open" : ""} ${active ? "active" : ""}" data-depth="${depth}">
        <div class="workbook-tree-row ${active ? "active" : ""} ${hasChildren ? "has-children" : "is-leaf"}">
          ${hasChildren
            ? `<button type="button" class="workbook-tree-toggle" data-workbook-toggle="${node.id}" aria-expanded="${open}"><i class="ri-arrow-${open ? "down" : "right"}-s-line"></i></button>`
            : `<span class="workbook-tree-toggle is-placeholder"></span>`}
          <button type="button" class="workbook-tree-main" data-workbook-node="${node.id}">
            <span class="workbook-tree-title">${node.title}</span>
            ${node.status?.length ? `<span class="workbook-tree-tags">${workbookStatusTags(node.status)}</span>` : ""}
          </button>
        </div>
        ${hasChildren ? `<div class="workbook-tree-children" ${open ? "" : "hidden"}>${renderWorkbookTreeNodes(children, depth + 1)}</div>` : ""}
      </div>`;
  }).join("");
}

function workbookSetDisplayTopic(setNode, album, parentTitle) {
  const source = byId[setNode.topicId] || {
    id: setNode.topicId || "t40",
    title: setNode.title,
    focus: `${album.name}章节题单`,
    reason: "练习册题单",
    questions: 12,
    minutes: 20,
    difficulty: "中等",
    source: album.source,
    usage: 680,
    tag: "workbook",
    tone: "sage"
  };
  const title = parentTitle ? `${parentTitle} · ${setNode.title}` : setNode.title;
  return { ...source, title };
}

function htmlEscape(value) {
  return String(value ?? "").replace(/[&<>"']/g, ch => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch]));
}

const workbookPaperQuestions = [
  { id:"1", num:1, section:"一、单项选择题", type:"选择题", difficulty:"较易", knowledge:"正负数意义", minutes:1, competency:"运算能力", stem:"如果向东走 3 米记作 +3 米，那么向西走 5 米应记作（　　）。", options:["A. +5 米","B. −5 米","C. +3 米","D. −3 米"], answer:"B", analysis:"向西与向东相反，应记作负数。" },
  { id:"2", num:2, section:"一、单项选择题", type:"选择题", difficulty:"较易", knowledge:"相反意义的量", minutes:1, competency:"抽象能力", stem:"下列各组量中，具有相反意义的量是（　　）。", options:["A. 上升 5 米与向东 5 米","B. 收入 80 元与支出 50 元","C. 长大 2 岁与减少 2 千克","D. 购进 10 件与卖出 8 元"], answer:"B", analysis:"收入与支出具有相反意义。" },
  { id:"3", num:3, section:"一、单项选择题", type:"选择题", difficulty:"中等", knowledge:"负数概念", stem:"在 −3、0、2.5、−1/2 四个数中，负数共有（　　）。", options:["A. 1 个","B. 2 个","C. 3 个","D. 4 个"], answer:"B", analysis:"−3 和 −1/2 为负数。" },
  { id:"4", num:4, section:"一、单项选择题", type:"选择题", difficulty:"简单", knowledge:"温差计算", stem:"某天北京的最高气温为 18 ℃，最低气温为 7 ℃，这一天的温差是（　　）。", options:["A. 25 ℃","B. −25 ℃","C. 11 ℃","D. −11 ℃"], answer:"C", analysis:"温差 = 最高温 − 最低温 = 11 ℃。" },
  { id:"5", num:5, section:"二、填空题", type:"填空题", difficulty:"简单", knowledge:"正负数应用", stem:"如果水库水位上升 0.8 米记作 +0.8 米，那么水位下降 0.5 米记作 ______ 米。", options:[], answer:"−0.5", analysis:"下降记为负。" },
  { id:"6", num:6, section:"二、填空题", type:"填空题", difficulty:"中等", knowledge:"数轴", stem:"数轴上与原点距离为 4 个单位长度的点表示的数是 ______。", options:[], answer:"4 或 −4", analysis:"距离原点 4 个单位长度有两个点。" },
  { id:"7", num:7, section:"三、解答题", type:"解答题", difficulty:"中等", knowledge:"正负数应用", stem:"某食品包装袋上标有“净含量 500±5 g”。抽检 5 袋食品的质量分别为 497 g、503 g、506 g、500 g、495 g。请用正负数表示它们相对于标准质量的偏差，并判断哪些产品合格。", options:[], answer:"497→−3，503→+3，506→+6，500→0，495→−5；497/503/500/495 合格", analysis:"合格范围为 −5 到 +5。" }
];

function resolveWorkbookLeaf(nodeId) {
  const found = findWorkbookNode(nodeId) || findWorkbookNode("ch1-1-m1");
  if (!found) return null;
  if (found.node.topicId) return found;
  const firstSet = workbookNodeSets(found.node)[0];
  return firstSet ? findWorkbookNode(firstSet.id) : found;
}

function workbookPaperQuestionHtml(q) {
  const optionList = q.options || [];
  const singleColumn = optionList.some(opt => String(opt).length > 20);
  const options = optionList.length
    ? `<div class="q-options ${singleColumn ? "q-options-single" : ""}">${optionList.map(opt => `<span>${htmlEscape(opt)}</span>`).join("")}</div>`
    : "";
  return `
    <article class="question-item" data-q="${q.id}" aria-label="第 ${q.num} 题">
      <div class="q-body">
        <p class="q-stem">
          <span class="q-num-mark">${q.num}</span>
          <span class="q-stem-text">${htmlEscape(q.stem)}</span>
        </p>
        ${options}
      </div>
      <div class="q-answer-panel">
        <div class="q-inline-answer"><em>答案</em>${htmlEscape(q.answer)}</div>
        <div class="q-inline-analysis"><em>解析</em>${htmlEscape(q.analysis)}</div>
      </div>
    </article>`;
}

function renderWorkbookCatalogMain() {
  const album = currentWorkbookAlbum();
  const found = resolveWorkbookLeaf(albumFilterState.nodeId);
  const node = found?.node;
  const parentTitle = found?.parents[found.parents.length - 1]?.title || "";
  const topic = node ? workbookSetDisplayTopic(node, album, parentTitle) : { title: "章节题单", difficulty: "简单", usage: 0, questions: 7, reason: "同步巩固" };
  const questions = workbookPaperQuestions;
  const sections = [...new Set(questions.map(q => q.section))];
  albumFilterState.nodeId = node?.id || albumFilterState.nodeId;
  const facts = [topic.reason || "同步巩固", "朝阳区", "七年级", "试卷", `${questions.length} 题`, `难度 ${topic.difficulty || "简单"}`, `${Number(topic.usage || 0).toLocaleString()} 次下载`];
  return `
    <div class="paper-detail-layout workbook-paper-preview">
      <div class="paper-main-column">
        <section class="paper-meta-bar">
          <div class="paper-meta-main">
            <h2>${htmlEscape(topic.title)}</h2>
            <p class="paper-meta-facts">${facts.map(text => `<span>${htmlEscape(text)}</span>`).join("")}</p>
          </div>
          <div class="paper-meta-inline-actions">
            <button type="button" class="paper-action-ghost" data-workbook-show-answer><i class="ri-eye-line"></i><span>显示答案</span></button>
            <button type="button" class="paper-action-ghost" data-workbook-favorite><i class="ri-star-line"></i><span>收藏</span></button>
            <button type="button" class="paper-action-ghost" data-workbook-download><i class="ri-download-2-line"></i><span>下载</span></button>
            <button type="button" class="paper-action-primary" data-workbook-select-all><i class="ri-checkbox-multiple-line"></i><span>整卷加入组题</span></button>
          </div>
        </section>
        <div class="question-card-board" data-workbook-paper-board>
          ${sections.map(section => {
            const items = questions.filter(q => q.section === section);
            return `
              <section class="question-section">
                <header class="question-section-head">
                  <div class="question-section-head-main">
                    <i class="ri-draggable question-section-drag" aria-hidden="true"></i>
                    <h3>${htmlEscape(section)}</h3>
                  </div>
                  <div class="question-section-head-actions"><span>${items.length} 题</span></div>
                </header>
                <div class="paper-sheet">
                  <div class="question-list-flow">${items.map(workbookPaperQuestionHtml).join("")}</div>
                </div>
              </section>`;
          }).join("")}
        </div>
      </div>
    </div>`;
}

function workbookCatalogView() {
  const album = currentWorkbookAlbum();
  return `
    <section class="category-detail album-category-view album-catalog-view">
      <div class="workbook-catalog-bar">
        <button type="button" class="workbook-catalog-back" data-album-back><i class="ri-arrow-left-s-line"></i>练习册</button>
        <span>${album.name}</span>
      </div>
      <div class="resource-browser workbook-catalog-browser">
        <nav class="workbook-catalog-tree" aria-label="${album.name}目录">
          ${renderWorkbookTreeNodes(workbookCatalogTree)}
        </nav>
        <div class="workbook-catalog-main" data-workbook-catalog-main>
          ${renderWorkbookCatalogMain()}
        </div>
      </div>
    </section>`;
}

function workbookTopics() {
  return topics.filter(topic => topic.tag === "workbook");
}

function workbookTopicMatchesFilters(topic) {
  const keyword = albumFilterState.query.trim().toLowerCase();
  return matchesWorkbookType(topic, albumFilterState.origin)
    && (!keyword || `${topic.title} ${topic.source} ${topic.focus} ${topic.reason}`.toLowerCase().includes(keyword));
}

function filteredWorkbookTopics() {
  return workbookTopics()
    .filter(workbookTopicMatchesFilters)
    .sort((a, b) => b.usage - a.usage);
}

function filteredWorkbookAlbums() {
  return workbookAlbums.filter(album => {
    const items = albumTopicsFor(album).filter(workbookTopicMatchesFilters);
    return items.length > 0;
  });
}

function albumTopicsFor(album) {
  return workbookTopics()
    .filter(topic => topic.source === album.source)
    .filter(workbookTopicMatchesFilters)
    .sort((a, b) => b.usage - a.usage);
}

function albumCard(album) {
  const items = albumTopicsFor(album);
  const displayItems = items.slice(0, 4);
  return `
    <article class="series-library-card album-card" data-album="${album.id}">
      <button class="series-library-heading" type="button" data-album-open="${album.id}">
        <span class="series-spine">${album.name.slice(0, 1)}</span>
        <span><small>练习册</small><b>${album.name}</b><em>${items.length} 份题单 · ${album.subtitle}</em></span>
        <i class="ri-arrow-right-s-line"></i>
      </button>
      <div class="series-library-topics">
        ${displayItems.map(topic => `
          <button type="button" data-topic="${topic.id}">
            <span>${topic.title}</span>
            <small>${topic.questions} 题 · ${topic.usage.toLocaleString()} 人使用</small>
            <i class="ri-arrow-right-s-line"></i>
          </button>
        `).join("")}
      </div>
    </article>`;
}

function applyAlbumView(options = {}) {
  if (options.view) albumFilterState.view = options.view;
  if (options.albumId) albumFilterState.albumId = options.albumId;
  if (options.nodeId) albumFilterState.nodeId = options.nodeId;
  if (options.origin) albumFilterState.origin = options.origin;
  if (options.textbook) albumFilterState.textbook = options.textbook;
  if (options.year) albumFilterState.year = options.year;
  if (typeof options.query === "string") albumFilterState.query = options.query;
  if (options.toggleNode) {
    const open = new Set(albumFilterState.openNodes);
    if (open.has(options.toggleNode)) open.delete(options.toggleNode);
    else open.add(options.toggleNode);
    albumFilterState.openNodes = [...open];
  }
  if (options.nodeId) {
    const found = resolveWorkbookLeaf(options.nodeId);
    if (found) {
      albumFilterState.nodeId = found.node.id;
      const open = new Set(albumFilterState.openNodes);
      found.parents.forEach(parent => open.add(parent.id));
      albumFilterState.openNodes = [...open];
    }
  }
  if (![{ id: "all" }, ...workbookTypeOptions].some(option => option.id === albumFilterState.origin)) {
    albumFilterState.origin = "all";
  }
  if (!workbookTextbookOptions.some(option => option.id === albumFilterState.textbook)) {
    albumFilterState.textbook = "all";
  }
  if (!workbookYearOptions.some(option => option.id === albumFilterState.year)) {
    albumFilterState.year = "all";
  }

  const panel = document.querySelector(".album-category-view");
  const wantCatalog = albumFilterState.view === "catalog";
  if (!panel || panel.classList.contains("album-catalog-view") !== wantCatalog) {
    render();
    return;
  }

  if (wantCatalog) {
    const tree = panel.querySelector(".workbook-catalog-tree");
    const main = panel.querySelector("[data-workbook-catalog-main]");
    if (tree) tree.innerHTML = renderWorkbookTreeNodes(workbookCatalogTree);
    if (main) {
      main.innerHTML = renderWorkbookCatalogMain();
      bindWorkbookPaperPreview(main);
    }
    bindContentEvents(tree);
    return;
  }

  const albums = filteredWorkbookAlbums();
  panel.querySelectorAll("[data-album-origin]").forEach(button => {
    button.classList.toggle("active", button.dataset.albumOrigin === albumFilterState.origin);
  });
  panel.querySelectorAll("[data-album-textbook]").forEach(button => {
    button.classList.toggle("active", button.dataset.albumTextbook === albumFilterState.textbook);
  });
  panel.querySelectorAll("[data-album-year]").forEach(button => {
    button.classList.toggle("active", button.dataset.albumYear === albumFilterState.year);
  });
  panel.querySelectorAll("[data-album-series]").forEach(button => {
    const value = button.dataset.albumSeries || "";
    const active = value ? albumFilterState.query === value : !albumFilterState.query.trim();
    button.classList.toggle("active", active);
  });
  const search = panel.querySelector("[data-album-search]");
  if (search && search.value !== albumFilterState.query) search.value = albumFilterState.query;
  const shelf = panel.querySelector(".album-shelf-grid");
  if (shelf) {
    shelf.innerHTML = renderWorkbookShelfCards(albums.map(album => album.id));
    bindContentEvents(shelf);
  }
  const albumEmpty = panel.querySelector(".album-empty");
  if (albumEmpty) albumEmpty.hidden = albums.length > 0;
}

function bindWorkbookPaperPreview(root = document) {
  const board = root.querySelector("[data-workbook-paper-board]");
  if (!board) return;
  const answerBtn = root.querySelector("[data-workbook-show-answer]");
  answerBtn?.addEventListener("click", () => {
    const open = board.classList.toggle("show-answers");
    answerBtn.innerHTML = open
      ? '<i class="ri-eye-off-line"></i><span>隐藏答案</span>'
      : '<i class="ri-eye-line"></i><span>显示答案</span>';
  });
  root.querySelector("[data-workbook-favorite]")?.addEventListener("click", event => {
    const button = event.currentTarget;
    const saved = button.classList.toggle("saved");
    button.innerHTML = saved
      ? '<i class="ri-star-fill"></i><span>已收藏</span>'
      : '<i class="ri-star-line"></i><span>收藏</span>';
    showToast(saved ? "已收藏该题单" : "已取消收藏");
  });
  root.querySelector("[data-workbook-download]")?.addEventListener("click", () => showToast("正在准备下载 Word"));
  root.querySelector("[data-workbook-select-all]")?.addEventListener("click", () => showToast("已将整卷加入组题"));
}

function render() {
  const defaultState = currentFilter === "all" && !currentQuery;
  const searchState = currentFilter === "all" && Boolean(currentQuery);
  const categoryContent = defaultState || searchState
    ? ""
    : currentFilter === "workbook" ? seriesCategoryView() : categoryBrowserView(currentFilter);
  contentFeed.innerHTML = defaultState
    ? homepageFeed()
    : searchState
      ? homepageSearchView(currentQuery)
      : categoryViewShell(currentFilter, categoryContent);
  emptyState.hidden = true;
  contentFeed.hidden = false;
  bindContentEvents();
  setupFeed(defaultState);
  renderBankStats();
  filterManuallyExpanded = false;
  setSquareFilterCollapsed(true);
  document.body.classList.toggle("is-home-view", defaultState);
  setupAiDock(defaultState);
}

function setupFeed(isHomepage) {
  const grid = document.querySelector("[data-endless-grid]");
  if (!grid || !isHomepage) return;
  grid.innerHTML = feedTopicIds.slice(0, 16).map(id => byId[id]).filter(Boolean).map(topicCard).join("");
  [...grid.children].forEach((card, index) => { card.dataset.feedOrder = String(index); });
  applyFeedFilters();
}

function topicMatchesFeedFilters(topic) {
  const typeMatch = feedFilterState.type === "all" || (feedFilterState.type === "sync" && ["chapter", "workbook"].includes(topic.tag)) || topic.tag === feedFilterState.type;
  const difficultyMatch = feedFilterState.difficulty === "all" || topic.difficulty === feedFilterState.difficulty;
  const sourceText = `${topic.source} ${topic.author?.school || ""}`;
  const sourceMatch = feedFilterState.source === "all"
    || (feedFilterState.source === "local" && /朝阳|望京|劲松|日坛|北京/.test(sourceText))
    || (feedFilterState.source === "famous" && /八十中|陈经纶|朝阳外国语|朝阳实验|日坛中学|第十七中学|北京中学|第四中学|第八中学|人大附中|清华附中|北大附中|师大附中/.test(sourceText))
    || (feedFilterState.source === "school" && Boolean(topic.author))
    || (feedFilterState.source === "series" && topic.tag === "workbook");
  const text = `${topic.title} ${topic.focus} ${topic.reason}`;
  const featureMatch = feedFilterState.feature === "all"
    || (feedFilterState.feature === "试题汇编" && /试题|汇编/.test(text))
    || (feedFilterState.feature === "高频易错" && /易错/.test(text))
    || feedFilterState.feature === primaryTag(topic);
  return typeMatch && difficultyMatch && sourceMatch && featureMatch;
}

function applyFeedFilters() {
  const grid = document.querySelector("[data-endless-grid]");
  if (!grid) return;
  const cards = [...grid.children];
  cards.sort((a, b) => {
    const aTopic = byId[a.dataset.topic];
    const bTopic = byId[b.dataset.topic];
    if (feedFilterState.sort === "usage") return bTopic.usage - aTopic.usage;
    if (feedFilterState.sort === "latest") return (/^(?:最新|新上)$/.test(bTopic.highlight || "") ? 1 : 0) - (/^(?:最新|新上)$/.test(aTopic.highlight || "") ? 1 : 0) || Number(a.dataset.feedOrder) - Number(b.dataset.feedOrder);
    return Number(a.dataset.feedOrder) - Number(b.dataset.feedOrder);
  });
  let visible = 0;
  cards.forEach(card => { card.hidden = !topicMatchesFeedFilters(byId[card.dataset.topic]); if (!card.hidden) visible += 1; grid.appendChild(card); });
  const empty = document.querySelector("[data-feed-empty]");
  if (empty) empty.hidden = visible > 0;
  const resultCount = document.querySelector("[data-filter-result-count]");
  if (resultCount) resultCount.textContent = `共 ${visible} 份`;
}

function applyHomepageFeaturedState() {
  const section = document.querySelector(".home-featured-section");
  if (!section) return;
  section.querySelectorAll("[data-paper-lane]").forEach(lane => {
    const matchedPapers = lane.querySelectorAll("[data-featured-paper-card]").length;
    const empty = lane.querySelector(".home-paper-lane-empty");
    if (empty) empty.hidden = matchedPapers > 0;
    lane.classList.toggle("is-empty", matchedPapers === 0);
  });
}

function bindContentEvents(root = document) {
  root.querySelectorAll("[data-home-ai-form]").forEach(form => form.addEventListener("submit", event => {
    event.preventDefault();
    const input = form.querySelector("[data-home-ai-input]");
    const prompt = input?.value.trim() || "";
    if (!prompt) {
      input?.focus();
      showToast("先描述一下想要什么题单");
      return;
    }
    openAi(prompt);
  }));
  root.querySelectorAll("[data-home-ai-add]").forEach(button => button.addEventListener("click", () => showToast("可以添加试卷、图片或资料作为参考")));
  root.querySelectorAll("[data-home-ai-voice]").forEach(button => button.addEventListener("click", () => {
    button.classList.toggle("active");
    showToast(button.classList.contains("active") ? "正在听，请说出题单要求" : "已停止语音输入");
  }));
  root.querySelectorAll("[data-home-search-form]").forEach(form => form.addEventListener("submit", event => {
    event.preventDefault();
    const input = form.querySelector("[data-home-search-input]");
    const query = input?.value.trim() || "";
    if (!query) {
      input?.focus();
      showToast("输入资源名称、地区、学校或知识点");
      return;
    }
    homepageSearchScope = form.querySelector("[data-home-search-scope]")?.value || "all";
    currentFilter = "all";
    currentQuery = query;
    document.querySelectorAll("[data-filter]").forEach(chip => {
      const active = chip.dataset.filter === "all";
      chip.classList.toggle("active", active);
      if (active) chip.setAttribute("aria-current", "page");
      else chip.removeAttribute("aria-current");
    });
    render();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));
  root.querySelectorAll("[data-home-search-clear]").forEach(button => button.addEventListener("click", () => {
    homepageSearchScope = "all";
    setMainFilter("all");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));
  root.querySelectorAll("[data-home-ai]").forEach(button => button.addEventListener("click", () => openAi()));
  root.querySelectorAll("[data-book-tab]").forEach(button => button.addEventListener("click", () => {
    const tab = button.dataset.bookTab;
    const container = button.closest(".book-resource");
    if (!container) return;
    container.querySelectorAll("[data-book-tab]").forEach(item => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    container.querySelectorAll("[data-book-panel]").forEach(panel => {
      const active = panel.dataset.bookPanel === tab;
      panel.hidden = !active;
      panel.classList.toggle("active", active);
    });
  }));
  root.querySelectorAll("[data-topic]").forEach(element => {
    const open = () => {
      const cardTitle = element.dataset.lessonTitle
        || element.querySelector("b, h3")?.textContent?.trim()
        || "";
      const detailTitle = element.dataset.detailTitle || cardTitle;
      const shortTitle = element.dataset.shortTitle || cardTitle;
      openTopic(element.dataset.topic, {
        title: detailTitle || undefined,
        shortTitle: shortTitle || undefined,
        lessonKey: element.dataset.lessonKey || cardTitle || undefined,
        context: element.dataset.context || undefined
      });
    };
    element.addEventListener("click", event => { if (event.target.closest("[data-bookmark], [data-series]")) return; open(); });
    if (element.matches("[tabindex]")) element.addEventListener("keydown", event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } });
  });
  root.querySelectorAll("[data-bookmark]").forEach(button => button.addEventListener("click", event => { event.stopPropagation(); button.classList.toggle("saved"); button.innerHTML = button.classList.contains("saved") ? '<i class="ri-bookmark-fill"></i>' : '<i class="ri-bookmark-line"></i>'; showToast(button.classList.contains("saved") ? "已收藏" : "已取消收藏"); }));
  root.querySelectorAll("[data-preview-topic]").forEach(button => button.addEventListener("click", event => { event.stopPropagation(); openTopic(button.dataset.previewTopic); }));
  root.querySelectorAll("[data-use-topic]").forEach(button => button.addEventListener("click", event => { event.stopPropagation(); location.href = `./editor.html?topic=${encodeURIComponent(button.dataset.useTopic)}`; }));
  root.querySelectorAll("[data-open-filter]").forEach(button => button.addEventListener("click", event => {
    event.stopPropagation();
    const filter = button.dataset.openFilter;
    const origin = button.dataset.openOrigin || "";
    const entry = button.dataset.resourceEntry || "";
    const openOptions = { ...homepageEntryOptions(filter, entry), ...(origin ? { origin } : {}) };
    prepareFilterOpen(filter, openOptions);
    if (isEmbedded) {
      requestParentOpenFilter(filter, openOptions);
      return;
    }
    setMainFilter(filter, openOptions);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }));
  root.querySelectorAll("[data-series]").forEach(button => button.addEventListener("click", event => { event.stopPropagation(); openSeries(button.dataset.series); }));
  root.querySelectorAll("[data-author]").forEach(button => button.addEventListener("click", event => { event.stopPropagation(); showToast(`正在查看${button.dataset.author}发布的题单`); }));
  root.querySelectorAll("[data-feed-key]").forEach(button => button.addEventListener("click", () => { const { feedKey, feedValue } = button.dataset; feedFilterState[feedKey] = feedValue; document.querySelectorAll(`[data-feed-key="${feedKey}"]`).forEach(item => item.classList.toggle("active", item === button)); applyFeedFilters(); updateFilterSummary(); }));
  root.querySelectorAll("[data-filter-toggle]").forEach(button => button.addEventListener("click", () => { const section = button.closest("[data-square-section]"); const collapsed = section.classList.contains("is-filter-collapsed"); filterManuallyExpanded = collapsed; setSquareFilterCollapsed(!collapsed); }));
  root.querySelectorAll("[data-filter-reset]").forEach(button => button.addEventListener("click", () => {
    ["difficulty", "source", "feature"].forEach(key => { feedFilterState[key] = "all"; });
    feedFilterState.sort = "default";
    root.querySelectorAll("[data-feed-key]").forEach(item => item.classList.toggle("active", (item.dataset.feedKey === "difficulty" || item.dataset.feedKey === "source" || item.dataset.feedKey === "feature") ? item.dataset.feedValue === "all" : item.dataset.feedKey === "sort" && item.dataset.feedValue === "default"));
    applyFeedFilters();
    updateFilterSummary();
  }));
  root.querySelectorAll("[data-square-section]").forEach(section => section.addEventListener("click", event => {
    const button = event.target.closest("[data-clear-filter]");
    if (!button) return;
    const key = button.dataset.clearFilter;
    feedFilterState[key] = "all";
    section.querySelectorAll(`[data-feed-key="${key}"]`).forEach(item => item.classList.toggle("active", item.dataset.feedValue === "all"));
    applyFeedFilters();
    updateFilterSummary();
  }));
  root.querySelectorAll(".resource-tree button:not([data-compilation-category])").forEach(button => button.addEventListener("click", () => { const browser = button.closest(".resource-browser"); button.parentElement.querySelectorAll("button").forEach(item => item.classList.toggle("active", item === button)); browser.querySelector(".resource-result-heading b").textContent = button.dataset.resultTitle || button.querySelector("b").textContent; }));
  root.querySelectorAll(".resource-chip-group button:not([data-compilation-signal])").forEach(button => button.addEventListener("click", () => { button.parentElement.querySelectorAll("button").forEach(item => item.classList.toggle("active", item === button)); }));
  root.querySelectorAll(".resource-selector-group button").forEach(button => button.addEventListener("click", () => showToast(`正在调整${button.textContent.trim()}`)));
  root.querySelectorAll("[data-series-query]").forEach(button => button.addEventListener("click", () => applyAlbumView({ view: "topic", query: button.dataset.seriesQuery })));
  root.querySelectorAll("[data-album-view]").forEach(button => button.addEventListener("click", () => applyAlbumView({ view: button.dataset.albumView })));
  root.querySelectorAll("[data-album-origin]").forEach(button => button.addEventListener("click", () => applyAlbumView({ origin: button.dataset.albumOrigin })));
  root.querySelectorAll("[data-album-textbook]").forEach(button => button.addEventListener("click", () => applyAlbumView({ textbook: button.dataset.albumTextbook })));
  root.querySelectorAll("[data-album-year]").forEach(button => button.addEventListener("click", () => applyAlbumView({ year: button.dataset.albumYear })));
  root.querySelectorAll("[data-album-series]").forEach(button => button.addEventListener("click", () => applyAlbumView({ query: button.dataset.albumSeries || "" })));
  root.querySelectorAll("[data-album-search]").forEach(input => input.addEventListener("input", () => applyAlbumView({ query: input.value })));
  root.querySelectorAll("[data-album-open]").forEach(button => button.addEventListener("click", () => {
    const album = workbookAlbums.find(item => item.id === button.dataset.albumOpen || item.source === button.dataset.albumOpen) || workbookAlbums[0];
    if (isEmbedded) {
      requestParentOpenFilter("workbook", { view: "catalog", albumId: album.id, keepAlbumState: true });
      return;
    }
    openWorkbookWorkspace(album);
  }));
  root.querySelectorAll("[data-album-jump]").forEach(button => button.addEventListener("click", () => {
    const album = workbookAlbums.find(item => item.id === button.dataset.albumJump || item.source === button.dataset.albumJump);
    if (isEmbedded) {
      if (album) requestParentOpenFilter("workbook", { view:"catalog", albumId:album.id, keepAlbumState:true });
      else requestParentOpenFilter("workbook", { view:"catalog", query:button.dataset.albumJump, keepAlbumState:true });
      return;
    }
    if (album) openWorkbookWorkspace(album);
    else {
      openWorkbookAlbum(button.dataset.albumJump);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }));
  root.querySelectorAll("[data-album-back]").forEach(button => button.addEventListener("click", () => {
    if (isEmbedded) {
      requestParentOpenFilter("workbook", { view:"album", albumId:"", query:"", keepAlbumState:false });
      return;
    }
    applyAlbumView({ view: "album", query: "" });
  }));
  root.querySelectorAll("[data-workbook-toggle]").forEach(button => button.addEventListener("click", event => {
    event.stopPropagation();
    applyAlbumView({ toggleNode: button.dataset.workbookToggle });
  }));
  root.querySelectorAll("[data-workbook-node]").forEach(button => button.addEventListener("click", () => applyAlbumView({ nodeId: button.dataset.workbookNode })));
  bindWorkbookPaperPreview(root);
  root.querySelectorAll("[data-stat-jump]").forEach(button => button.addEventListener("click", () => {
    location.href = "./school.html";
  }));
  root.querySelectorAll(".paper-sidebar-group-toggle").forEach(button => button.addEventListener("click", () => {
    const group = button.closest(".paper-sidebar-group");
    const open = !group.classList.contains("open");
    group.classList.toggle("open", open);
    button.setAttribute("aria-expanded", String(open));
    const items = group.querySelector(".paper-sidebar-items");
    if (items) items.hidden = !open;
    const icon = button.querySelector("i");
    if (icon) icon.className = open ? "ri-arrow-down-s-line" : "ri-arrow-right-s-line";
  }));
  root.querySelectorAll("[data-paper-type]").forEach(button => button.addEventListener("click", () => applyPaperFilters({ examType: button.dataset.paperType })));
  root.querySelectorAll("[data-paper-year]").forEach(button => button.addEventListener("click", () => applyPaperFilters({ year: button.dataset.paperYear })));
  root.querySelectorAll("[data-paper-grade]").forEach(button => button.addEventListener("click", () => applyPaperFilters({ grade: button.dataset.paperGrade })));
  root.querySelectorAll("[data-paper-authority]").forEach(button => button.addEventListener("click", () => applyPaperFilters({ authority: button.dataset.paperAuthority })));
  root.querySelectorAll("[data-paper-source]").forEach(button => button.addEventListener("click", () => applyPaperFilters({ source: button.dataset.paperSource })));
  root.querySelectorAll("[data-paper-sort]").forEach(button => button.addEventListener("click", () => applyPaperFilters({ sort: button.dataset.paperSort })));
  root.querySelectorAll("[data-paper-search]").forEach(input => input.addEventListener("input", () => applyPaperFilters({ query: input.value })));
  root.querySelectorAll(".paper-filter-select").forEach(button => button.addEventListener("click", () => showToast("地区筛选即将开放")));
  root.querySelectorAll(".special-sidebar-group-toggle").forEach(button => button.addEventListener("click", () => {
    const group = button.closest(".special-sidebar-group");
    const open = !group.classList.contains("open");
    group.classList.toggle("open", open);
    button.setAttribute("aria-expanded", String(open));
    const items = group.querySelector(".special-sidebar-items");
    if (items) items.hidden = !open;
    const icon = button.querySelector("i");
    if (icon) icon.className = open ? "ri-arrow-down-s-line" : "ri-arrow-right-s-line";
  }));
  root.querySelectorAll("[data-special-category]").forEach(button => button.addEventListener("click", () => applySpecialFilters({ category: button.dataset.specialCategory })));
  root.querySelectorAll("[data-special-difficulty]").forEach(button => button.addEventListener("click", () => applySpecialFilters({ difficulty: button.dataset.specialDifficulty })));
  root.querySelectorAll("[data-special-origin]").forEach(button => button.addEventListener("click", () => applySpecialFilters({ origin: button.dataset.specialOrigin })));
  root.querySelectorAll("[data-special-search]").forEach(input => input.addEventListener("input", () => applySpecialFilters({ query: input.value })));
  root.querySelectorAll("[data-compilation-category]").forEach(button => button.addEventListener("click", () => applyCompilationFilters({ category: button.dataset.compilationCategory })));
  root.querySelectorAll("[data-compilation-signal]").forEach(button => button.addEventListener("click", () => applyCompilationFilters({ signal: button.dataset.compilationSignal })));
  root.querySelectorAll("[data-compilation-search]").forEach(input => input.addEventListener("input", () => applyCompilationFilters({ query: input.value })));
  root.querySelectorAll(".chapter-textbook-select, .chapter-filter-select").forEach(button => button.addEventListener("click", () => showToast("教材与地区筛选即将开放")));
  root.querySelectorAll("[data-chapter-toggle]").forEach(button => button.addEventListener("click", () => applyChapterFilters({ toggleChapter: button.dataset.chapterToggle })));
  root.querySelectorAll("[data-chapter-section]").forEach(button => button.addEventListener("click", () => applyChapterFilters({ section: button.dataset.chapterSection })));
  root.querySelectorAll("[data-chapter-difficulty]").forEach(button => button.addEventListener("click", () => applyChapterFilters({ difficulty: button.dataset.chapterDifficulty })));
  root.querySelectorAll("[data-chapter-origin]").forEach(button => button.addEventListener("click", () => applyChapterFilters({ origin: button.dataset.chapterOrigin })));
  root.querySelectorAll("[data-chapter-source]").forEach(button => button.addEventListener("click", () => applyChapterFilters({ source: button.dataset.chapterSource })));
  root.querySelectorAll("[data-chapter-search]").forEach(input => input.addEventListener("input", () => applyChapterFilters({ query: input.value })));
  if (root.querySelector(".home-featured-section")) applyHomepageFeaturedState();
}

function prepareFilterOpen(filter, options = {}) {
  if (filter === "paper") {
    if (options.examType) paperFilterState.examType = normalizePaperExamType(options.examType);
    if (options.year) paperFilterState.year = options.year;
    if (options.grade) paperFilterState.grade = options.grade;
    if (options.authority) paperFilterState.authority = options.authority;
    if (options.source) paperFilterState.source = options.source;
    if (options.sort) paperFilterState.sort = options.sort;
    if (typeof options.query === "string") paperFilterState.query = options.query;
  }
  if (filter === "workbook") {
    if (options.view) albumFilterState.view = options.view;
    if (options.albumId) albumFilterState.albumId = options.albumId;
    if (options.origin) albumFilterState.origin = options.origin;
    if (options.textbook) albumFilterState.textbook = options.textbook;
    if (options.year) albumFilterState.year = options.year;
    if (typeof options.query === "string") albumFilterState.query = options.query;
  }
  if (filter === "special") {
    if (options.category) specialFilterState.category = options.category;
    if (options.difficulty) specialFilterState.difficulty = options.difficulty;
    if (options.origin) specialFilterState.origin = options.origin;
    if (typeof options.query === "string") specialFilterState.query = options.query;
  }
  if (filter === "compilation") {
    if (options.category) compilationFilterState.category = options.category;
    if (options.signal) compilationFilterState.signal = options.signal;
    if (typeof options.query === "string") compilationFilterState.query = options.query;
  }
  if (filter === "chapter" && options.origin) {
    chapterFilterState.origin = options.origin;
    chapterFilterState.section = "all";
    chapterFilterState.query = "";
  }
}

function setMainFilter(filter, options = {}) {
  const previousFilter = currentFilter;
  currentFilter = filter;
  currentQuery = "";
  if (filter === "workbook" && previousFilter !== "workbook" && !options.keepAlbumState) {
    albumFilterState.view = "album";
    albumFilterState.albumId = "";
    albumFilterState.nodeId = "ch1-1-m1";
    albumFilterState.openNodes = ["ch1", "ch1-1", "ch1-2", "ch1-2-1"];
    albumFilterState.origin = "all";
    albumFilterState.textbook = "all";
    albumFilterState.year = "all";
    albumFilterState.query = "";
  }
  if (filter === "chapter" && options.origin) {
    prepareFilterOpen(filter, options);
  }
  if (["paper", "workbook", "special", "compilation"].includes(filter)) {
    prepareFilterOpen(filter, options);
  }
  document.body.classList.toggle("is-paper-view", filter === "paper");
  document.body.classList.toggle("is-special-view", filter === "special");
  document.body.classList.toggle("is-chapter-view", filter === "chapter");
  document.body.classList.toggle("is-album-view", filter === "workbook");
  document.body.classList.toggle("is-compilation-view", filter === "compilation");
  document.querySelectorAll("[data-filter]").forEach(chip => {
    const active = chip.dataset.filter === filter;
    chip.classList.toggle("active", active);
    if (active) chip.setAttribute("aria-current", "page");
    else chip.removeAttribute("aria-current");
  });
  render();
}

function openWorkbookAlbum(albumIdOrSource) {
  const album = workbookAlbums.find(item => item.id === albumIdOrSource || item.source === albumIdOrSource) || workbookAlbums[0];
  albumFilterState.view = "catalog";
  albumFilterState.albumId = album.id;
  albumFilterState.nodeId = "ch1-1-m1";
  albumFilterState.openNodes = ["ch1", "ch1-1", "ch1-2", "ch1-2-1"];
  albumFilterState.query = "";
  setMainFilter("workbook", { keepAlbumState: true });
}

function openSeries(seriesName) {
  openWorkbookAlbum(seriesName);
}

function openTopic(id, options = {}) {
  const topic = byId[id];
  if (!topic && !options.title) return;
  const context = options.context
    || (topic?.tag === "workbook" ? "series" : ["paper", "compilation"].includes(topic?.tag) ? "paper" : topic?.tag === "special" ? "special" : "chapter");
  const title = options.title || topic?.title || "";
  const shortTitle = options.shortTitle || title;
  const lessonKey = options.lessonKey || (options.title ? options.title : id);
  const qs = new URLSearchParams({
    topic: id,
    context,
    title,
    focus: options.focus || topic?.focus || "",
    reason: options.reason || topic?.reason || "",
    questions: String(options.questions || topic?.questions || ""),
    difficulty: options.difficulty || topic?.difficulty || "",
    source: options.source || topic?.source || "",
    usage: String(options.usage || topic?.usage || "")
  });
  if (shortTitle) qs.set("shortTitle", shortTitle);
  if (lessonKey) qs.set("lessonKey", lessonKey);
  if (isEmbedded) {
    requestParentOpenTopic(id, context, qs.toString(), { title, shortTitle, lessonKey });
    return;
  }
  openDetailPage(`./detail-ai.html?${qs.toString()}`);
}

function openDetailPage(url) {
  location.href = url;
}

function showAiDock(visible) {
  const dock = document.querySelector("#aiDock");
  const shell = document.querySelector(".ai-dock-shell");
  const shouldShow = Boolean(visible) && !aiModalOpen && Boolean(dock && shell);
  if (dock) {
    dock.hidden = !shouldShow;
    dock.setAttribute("aria-hidden", String(!shouldShow));
  }
  if (shell) shell.hidden = !shouldShow;
  document.body.classList.toggle("has-ai-dock", shouldShow);
}

function setupAiDock(isHomepage) {
  if (aiDockObserver) {
    aiDockObserver.disconnect();
    aiDockObserver = null;
  }
  showAiDock(Boolean(isHomepage));
}

function syncAiInputs(value, sourceId) {
  ["#aiQuickInput"].forEach(selector => {
    const input = document.querySelector(selector);
    if (input && input.id !== sourceId && input.value !== value) input.value = value;
  });
}

function openAi(prompt = "") {
  const value = (prompt || document.querySelector("#aiQuickInput")?.value || "").trim();
  if (!value) {
    showToast("先描述一下想要什么题单");
    document.querySelector("#aiQuickInput")?.focus();
    return;
  }
  if (isEmbedded) {
    requestParentOpenAi(value);
    return;
  }
  location.href = `./detail-ai.html?mode=compose&prompt=${encodeURIComponent(value)}&context=paper`;
}

function closeAi() {
  aiModalOpen = false;
  aiMask.hidden = true;
  document.body.style.overflow = "";
  setupAiDock(currentFilter === "all" && !currentQuery);
}

function showToast(message) { toast.textContent = message; toast.classList.add("show"); setTimeout(() => toast.classList.remove("show"), 1700); }

function renderBankStats() {
  const fields = {
    statLibraryTotal: bankStats.libraryTotal,
    statPaperTotal: bankStats.paperTotal,
    statPracticeTotal: bankStats.practiceTotal,
    statWeeklyNewResources: bankStats.weeklyNewResources
  };
  Object.entries(fields).forEach(([id, value]) => {
    const node = document.querySelector(`#${id}`);
    if (node) node.textContent = value.toLocaleString("zh-CN");
  });
}

renderBankStats();

if (isEmbedded) {
  document.body.classList.add("is-embedded");
  document.querySelector(".fx-c-sidebar")?.remove();
  document.addEventListener("click", event => {
    const brandHomeLink = event.target.closest(".site-header .brand-mark");
    if (brandHomeLink) {
      // 品牌入口始终退出工作台，由链接的 target="_top" 返回独立题库首页。
      return;
    }

    const workspaceNavLink = event.target.closest(".site-header a[href]");
    if (workspaceNavLink) {
      const url = new URL(workspaceNavLink.getAttribute("href"), location.href);
      const path = url.pathname.replace(/\/+$/, "");
      if (path.endsWith("/index.html") || path.endsWith("/school.html")) {
        event.preventDefault();
        const filter = path.endsWith("/school.html") ? "school" : (url.searchParams.get("filter") || "all");
        requestParentOpenFilter(filter);
        return;
      }
    }

    const link = event.target.closest('a[href*="detail-ai.html"]');
    if (!link) return;
    event.preventDefault();
    const url = new URL(link.getAttribute("href"), location.href);
    requestParentOpenTopic(url.searchParams.get("topic"), url.searchParams.get("context") || "paper", url.searchParams.toString());
  });
}

const initParams = new URLSearchParams(location.search);
const initFilter = initParams.get("filter");
const initFilterOptions = Object.fromEntries([...initParams.entries()].filter(([key]) => !["filter", "embed", "v"].includes(key)));
const supportedInitFilters = new Set(["chapter", "paper", "special", "workbook", "compilation"]);
if (initFilter && supportedInitFilters.has(initFilter)) {
  prepareFilterOpen(initFilter, initFilterOptions);
  setMainFilter(initFilter, initFilterOptions);
} else {
  render();
}

window.addEventListener("scroll", () => {
  hasUserScrolled = window.scrollY > 160;
  const square = document.querySelector("[data-square-section]");
  if (!square) return;
  if (window.scrollY < 80) {
    filterManuallyExpanded = false;
    setSquareFilterCollapsed(true);
  }
}, { passive: true });

document.querySelector("#filterChips")?.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  if (isEmbedded) {
    requestParentOpenFilter(button.dataset.filter);
    return;
  }
  setMainFilter(button.dataset.filter);
});
document.querySelector("#resetFilter").addEventListener("click", () => {
  if (isEmbedded) requestParentOpenFilter("all");
  else setMainFilter("all");
});

document.addEventListener("change", event => {
  if (event.target.matches(".fx-library-selectors select")) {
    homepageScopeState.region = document.querySelector("#regionSelect")?.value || homepageScopeState.region;
    homepageScopeState.grade = document.querySelector("#gradeSelect")?.value || homepageScopeState.grade;
    homepageScopeState.subject = document.querySelector("#subjectSelect")?.value || homepageScopeState.subject;
    const scope = [homepageScopeState.region, homepageScopeState.grade, homepageScopeState.subject].join(" · ");
    document.body.dataset.libraryScope = scope;
    render();
    showToast(`已为你切换到 ${homepageScopeState.grade}${homepageScopeState.subject} 资源`);
  }
});

function bindAiForm(formSelector, inputSelector, addSelector, voiceSelector) {
  const form = document.querySelector(formSelector);
  const input = document.querySelector(inputSelector);
  if (!form || !input) return;
  form.addEventListener("submit", event => { event.preventDefault(); const value = input.value.trim(); if (!value) { input.focus(); showToast("先描述一下想要什么题单"); return; } syncAiInputs(value, input.id); openAi(value); });
  input.addEventListener("input", () => syncAiInputs(input.value, input.id));
  document.querySelector(addSelector)?.addEventListener("click", () => showToast("可以添加试卷、图片或资料作为参考"));
  document.querySelector(voiceSelector)?.addEventListener("click", event => { event.currentTarget.classList.toggle("active"); showToast(event.currentTarget.classList.contains("active") ? "正在听，请说出题单要求" : "已停止语音输入"); });
}

const aiHintExamples = {
  "找题": "帮我找七年级有理数易错题，15 题，中等难度",
  "找卷": "帮我找北京朝阳区七年级上期末数学试卷",
  "AI 组卷": "帮我组一份七年级有理数单元检测卷，45 分钟，中等难度",
  "AI 组练习": "帮我组一份七年级有理数随堂练习，15 分钟，基础为主，加入 2 道易错题",
  "AI 改编": "把这份题单改编成朝阳情境题，考点不变",
  "AI 命题": "帮我命制 5 道有理数应用题，中等难度",
  "AI 录题": "帮我把这张试卷图片录入为题单"
};

function setupAiHints(inputSelector, hintsSelector) {
  const input = document.querySelector(inputSelector);
  const hints = document.querySelector(hintsSelector);
  if (!input || !hints) return;
  let blurTimer = 0;
  const show = () => { clearTimeout(blurTimer); hints.hidden = false; };
  const hide = () => { blurTimer = window.setTimeout(() => { hints.hidden = true; }, 120); };
  input.addEventListener("focus", show);
  input.addEventListener("click", show);
  input.addEventListener("blur", hide);
  hints.addEventListener("mousedown", event => {
    if (event.target.closest("[data-ai-hint]")) event.preventDefault();
  });
  hints.addEventListener("click", event => {
    const button = event.target.closest("[data-ai-hint]");
    if (!button) return;
    const sample = aiHintExamples[button.dataset.aiHint] || button.dataset.aiHint;
    input.value = sample;
    syncAiInputs(sample, input.id);
    input.focus();
    hints.hidden = true;
  });
}

bindAiForm("#aiDock", "#aiQuickInput", "#aiAdd", "#aiVoice");
setupAiHints("#aiQuickInput", "#aiDockHints");
document.addEventListener("click", event => {
  if (event.target.closest(".ai-dock-shell")) return;
  document.querySelectorAll(".ai-input-hints").forEach(panel => { panel.hidden = true; });
});
document.querySelector("#closeAi").addEventListener("click", closeAi);
aiMask.addEventListener("click", event => { if (event.target === aiMask) closeAi(); });
document.querySelector("#generateList").addEventListener("click", event => { const button = event.currentTarget; button.disabled = true; button.querySelector("span").textContent = "正在生成题单结构…"; setTimeout(() => { document.querySelector("#aiForm").hidden = true; document.querySelector("#aiResult").hidden = false; button.disabled = false; button.querySelector("span").textContent = "生成完整题单"; }, 850); });
document.querySelector("#regenerate").addEventListener("click", () => { document.querySelector("#aiResult").hidden = true; document.querySelector("#aiForm").hidden = false; });
document.querySelector("#editGenerated").addEventListener("click", () => { closeAi(); showToast("AI 题单已生成，正在进入题单编辑"); });
document.addEventListener("keydown", event => {
  if (event.key !== "Escape") return;
  if (!aiMask.hidden) closeAi();
});

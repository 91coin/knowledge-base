// 知识库更新脚本 - 添加近期医学问答内容
// 运行：node scripts/update-knowledge-base.js

const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../public/data/complete-data.json');
const outputPath = path.join(__dirname, '../public/data/complete-data.json');

// 读取现有数据
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 新增内容

// 1. 中医理论 - 新增七冲门、六腑传化、阴虚证、阴虚舌象
const newTcmTheory = [
  {
    id: 'tcm-theory-26',
    title: '七冲门理论',
    content: '七冲门是饮食物消化吸收排泄过程中必须通过的七道门户：飞门（口唇）、户门（牙齿）、吸门（会厌）、贲门（胃上口）、幽门（胃下口）、阑门（回盲瓣）、魄门（肛门）。七门通畅依赖气机升降出入，开合有度则消化正常。',
    tags: ['消化', '脏腑', '经典理论'],
    source: '《难经·四十四难》'
  },
  {
    id: 'tcm-theory-27',
    title: '六腑传化理论',
    content: '六腑者，传化物而不藏，故实而不能满也。六腑（胃、小肠、大肠、胆、膀胱、三焦）的功能是传导、消化、排泄，特点是以通为用，以降为顺。食物消化全过程：口腔→胃（受纳腐熟，2-4 小时）→小肠（泌别清浊，4-8 小时）→大肠（传导变化，12-48 小时）→排便。',
    tags: ['消化', '六腑', '生理'],
    source: '《素问·五脏别论》'
  },
  {
    id: 'tcm-theory-28',
    title: '阴虚证',
    content: '阴液亏虚，虚热内生。表现：五心烦热、潮热盗汗、口干咽燥、舌红少苔、脉细数。五脏阴虚：肾阴虚（腰膝酸软、遗精盗汗）、心阴虚（心悸失眠）、肺阴虚（干咳少痰）、脾胃阴虚（口渴善饥）、肝阴虚（目干胁痛）。治法：滋阴清热。',
    tags: ['阴虚', '辨证', '病机'],
    source: '《素问·调经论》'
  },
  {
    id: 'tcm-theory-29',
    title: '阴虚舌象',
    content: '阴虚舌象特征：舌质鲜艳、亮，但稍带暗质（肝郁表现），水汪汪，带油质感，油亮油亮的感觉。原理：肝郁化火→烧干阴液（润滑油）→虚火蒸腾，熏蒸到舌面。五种阴虚舌象：肝肾阴虚（舌质鲜艳油亮）、肝郁脾虚湿热（地图舌）、阴虚极阳（舌苔水浸浸）、阳血亏虚（舌质淡白有凹陷）、寒热虚实夹杂。',
    tags: ['阴虚', '舌诊', '辨证'],
    source: '临床经验'
  }
];

// 2. 西医基础 - 新增消化系统解剖、血糖调节
const newWesternBasics = [
  {
    id: 'west-basic-21',
    title: '消化系统解剖',
    content: '消化道全长约 9 米：口腔（长约 10cm）→食管（长约 25cm，三个生理性狭窄）→胃（容量 1.5L，分贲门部、胃底、胃体、幽门部）→小肠（长 5-7m，分十二指肠、空肠、回肠）→大肠（长 1.5m，分盲肠、结肠、直肠、肛管）。消化腺：唾液腺（1-1.5L/天）、肝脏（1.5kg，分泌胆汁）、胰腺（70-100g，分泌胰液）。',
    tags: ['消化', '解剖', '形态学'],
    source: '现代医学'
  },
  {
    id: 'west-basic-22',
    title: '血糖调节生理',
    content: '正常血糖：空腹 3.9-6.1 mmol/L，餐后 2 小时<7.8 mmol/L。血糖来源：食物吸收、肝糖原分解、糖异生。去路：氧化供能、合成糖原、转化脂肪。胰岛素（胰岛β细胞分泌，51 个氨基酸）：唯一降糖激素，促进 GLUT4 转位，增加葡萄糖摄取。胰高血糖素（胰岛α细胞分泌，29 个氨基酸）：主要升糖激素，促进糖原分解。其他升糖激素：肾上腺素、糖皮质激素、生长激素。',
    tags: ['血糖', '内分泌', '生理'],
    source: '现代医学'
  },
  {
    id: 'west-basic-23',
    title: '胰岛素抵抗机制',
    content: '胰岛素抵抗是指靶组织（肝脏、肌肉、脂肪）对胰岛素的敏感性降低。机制：①受体后信号传导缺陷（IRS-1 磷酸化异常）；②GLUT4 转位障碍；③线粒体功能异常；④慢性炎症（TNF-α、IL-6 升高）；⑤游离脂肪酸升高（脂毒性）。后果：代偿性高胰岛素血症→β细胞功能衰竭→2 型糖尿病。',
    tags: ['胰岛素抵抗', '糖尿病', '病理生理'],
    source: '现代医学'
  },
  {
    id: 'west-basic-24',
    title: '舌下取栓的现代医学原理',
    content: '舌下取栓是通过划破舌下静脉（金津、玉液穴），放出少量血液（100-200ml）的疗法。可能机制：①血液流变学改善（全血粘度下降 25-35%）；②炎症因子清除（CRP、IL-6 下降 15-25%）；③铁负荷降低→氧化应激下降；④NO 生物利用度增加→血管舒张；⑤内啡肽释放→镇痛欣快；⑥体液丢失→体重下降（2-3 斤）。适用于肥胖、高血压、高血脂、头晕头昏沉人群。',
    tags: ['舌下取栓', '血液流变学', '替代疗法'],
    source: '现代医学 + 传统医学'
  }
];

// 3. 中西医结合 - 新增胰岛素抵抗的中医解读、舌下取栓的中医原理
const newIntegrativeTheory = [
  {
    id: 'int-theory-16',
    title: '胰岛素抵抗的中医解读',
    content: '胰岛素抵抗的中医本质：脾肾两虚为本，痰湿瘀血为标。病机演变：脾失健运（始动因素）→痰湿内蕴（病理产物）→瘀血阻络（病变深化）→气阴两虚（病变结果）。对应西医：脾虚=胰岛素信号传导障碍，痰湿=游离脂肪酸升高 + 炎症因子，瘀血=微循环障碍 + 氧化应激，肾虚=线粒体功能减退。治则：健脾益气为本，化痰祛瘀为标。',
    tags: ['胰岛素抵抗', '中西医结合', '病机'],
    source: '中西医结合研究'
  },
  {
    id: 'int-theory-17',
    title: '舌下取栓的中医原理',
    content: '舌下取栓的中医理论基础：舌为心之苗，舌下络脉通心脑血管；金津、玉液穴清热生津、活血通络。病机：瘀血阻络，气血不畅。治则：祛瘀务尽，瘀去新生。操作：划开舌下静脉 0.2-0.3cm，负压吸引（嘴吮吸），持续 45 分钟至血色由暗变鲜。适用于瘀血体质（肥胖、高血压、高血脂、头晕头昏沉）。',
    tags: ['舌下取栓', '瘀血', '刺络放血'],
    source: '中医传统疗法'
  }
];

// 4. 中西医结合病种 - 新增 2 型糖尿病、舌下取栓适应症
const newIntegrativeDiseases = [
  {
    id: 'int-dis-31',
    title: '2 型糖尿病',
    content: '中医：消渴（气阴两虚、瘀血阻络）。西医：2 型糖尿病（胰岛素抵抗 + β细胞功能缺陷）。发病机制：遗传 + 环境（肥胖、缺乏运动）→胰岛素抵抗→代偿性高胰岛素血症→β细胞衰竭→血糖升高。中西医结合方案：①健脾益气、活血化瘀中药（参芪降糖颗粒）+ ②生活方式干预（饮食控制、运动）+ ③西药降糖（二甲双胍、SGLT2 抑制剂、GLP-1 受体激动剂）+ ④血糖监测。目标：HbA1c<7%，空腹血糖 4.4-7.0 mmol/L。',
    tags: ['糖尿病', '胰岛素抵抗', '重点病种'],
    source: '中西医结合'
  },
  {
    id: 'int-dis-32',
    title: '舌下取栓适应症',
    content: '舌下取栓是一种传统刺络放血疗法。适应症：①肥胖（尤其腹型肥胖）；②高血压、高血脂；③头晕、头昏沉；④气色差（面色晦暗、唇色紫暗）；⑤疲劳乏力。禁忌症：凝血功能障碍、严重贫血、低血压、孕妇、服用抗凝药者。操作方法：舌下静脉划口 0.2-0.3cm，嘴吮吸引出瘀血 100-200ml，持续 45 分钟至血色变鲜红。疗效：当场见效（头晕减轻、头脑清醒），效果持续 1-2 周，体重下降 2-3 斤。',
    tags: ['舌下取栓', '适应症', '传统疗法'],
    source: '临床经验'
  }
];

// 合并数据
data.tcm_theory = [...data.tcm_theory, ...newTcmTheory];
data.western_basics = [...data.western_basics, ...newWesternBasics];
data.integrative_theory = [...data.integrative_theory, ...newIntegrativeTheory];
data.integrative_diseases = [...data.integrative_diseases, ...newIntegrativeDiseases];

// 写回文件
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');

console.log('✅ 知识库更新完成！');
console.log(`新增中医理论：${newTcmTheory.length} 条`);
console.log(`新增西医基础：${newWesternBasics.length} 条`);
console.log(`新增中西医结合理论：${newIntegrativeTheory.length} 条`);
console.log(`新增中西医结合病种：${newIntegrativeDiseases.length} 条`);
console.log(`总计新增：${newTcmTheory.length + newWesternBasics.length + newIntegrativeTheory.length + newIntegrativeDiseases.length} 条`);

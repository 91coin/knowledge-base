'use client'

import { useState, useMemo } from 'react'

const knowledgeBase: any = {
  tcm: {
    id: 'tcm',
    name: '中医学',
    icon: '🏥',
    color: '#c0392b',
    children: {
      theory: {
        name: '基础理论',
        items: [
          { id: 'tcm-theory-1', title: '阴阳学说', content: '阴阳者，天地之道也，万物之纲纪，变化之父母。', tags: ['哲学基础', '核心理论'] },
          { id: 'tcm-theory-2', title: '五行学说', content: '木火土金水，相生相克，制约平衡。', tags: ['哲学基础', '系统论'] },
          { id: 'tcm-theory-3', title: '藏象学说', content: '心主血脉、肺主气、脾主运化、肝主疏泄、肾主藏精。', tags: ['脏腑', '生理'] },
          { id: 'tcm-theory-4', title: '经络学说', content: '经脉者，所以决死生，处百病，调虚实，不可不通。', tags: ['经络', '气血'] },
          { id: 'tcm-theory-5', title: '气血津液', content: '气为血之帅，血为气之母，津液濡养全身。', tags: ['基础物质', '生理'] },
        ]
      },
      diagnosis: {
        name: '诊断学',
        items: [
          { id: 'tcm-diag-1', title: '四诊合参', content: '望闻问切，四诊合参，全面了解病情。望神色形态，闻声音气味，问病史症状，切脉象。', tags: ['诊断方法', '基础'] },
          { id: 'tcm-diag-2', title: '八纲辨证', content: '阴阳、表里、寒热、虚实，为辨证之总纲。', tags: ['辨证', '纲领'] },
          { id: 'tcm-diag-3', title: '脏腑辨证', content: '根据脏腑生理功能、病理变化进行辨证论治。', tags: ['辨证', '脏腑'] },
        ]
      },
      formulas: {
        name: '方剂学',
        items: [
          { id: 'formula-1', title: '麻黄汤', source: '《伤寒论》', content: '【组成】麻黄 9g、桂枝 6g、杏仁 9g、甘草 3g。【功效】发汗解表，宣肺平喘。【主治】外感风寒表实证。恶寒发热，头痛身疼，无汗而喘，脉浮紧。', tags: ['解表剂', '伤寒论', '发汗'] },
          { id: 'formula-2', title: '桂枝汤', source: '《伤寒论》', content: '【组成】桂枝 9g、芍药 9g、生姜 9g、大枣 12 枚、甘草 6g。【功效】解肌发表，调和营卫。【主治】外感风寒表虚证。头痛发热，汗出恶风，脉浮缓。', tags: ['解表剂', '伤寒论', '调和'] },
          { id: 'formula-3', title: '小柴胡汤', source: '《伤寒论》', content: '【组成】柴胡 12g、黄芩 9g、人参 6g、半夏 9g、甘草 6g、生姜 9g、大枣 12 枚。【功效】和解少阳。【主治】伤寒少阳证。往来寒热，胸胁苦满，默默不欲饮食，心烦喜呕。', tags: ['和解剂', '伤寒论', '少阳'] },
          { id: 'formula-4', title: '四君子汤', source: '《太平惠民和剂局方》', content: '【组成】人参 9g、白术 9g、茯苓 9g、甘草 6g。【功效】益气健脾。【主治】脾胃气虚证。面色萎白，语声低微，气短乏力，食少便溏。', tags: ['补益剂', '健脾', '气虚'] },
          { id: 'formula-5', title: '六味地黄丸', source: '《小儿药证直诀》', content: '【组成】熟地黄 24g、山茱萸 12g、山药 12g、泽泻 9g、牡丹皮 9g、茯苓 9g。【功效】滋阴补肾。【主治】肾阴虚证。腰膝酸软，头晕目眩，耳鸣耳聋，盗汗遗精。', tags: ['补益剂', '滋阴', '补肾'] },
          { id: 'formula-6', title: '补中益气汤', source: '《脾胃论》', content: '【组成】黄芪 18g、人参 6g、白术 9g、当归 9g、陈皮 6g、升麻 6g、柴胡 6g、甘草 6g。【功效】补中益气，升阳举陷。【主治】脾胃气虚，中气下陷证。', tags: ['补益剂', '升阳', '气虚'] },
          { id: 'formula-7', title: '白虎汤', source: '《伤寒论》', content: '【组成】石膏 30g、知母 9g、甘草 3g、粳米 9g。【功效】清热生津。【主治】阳明气分热盛证。壮热面赤，烦渴引饮，汗出恶热，脉洪大有力。', tags: ['清热剂', '伤寒论', '气分热'] },
          { id: 'formula-8', title: '龙胆泻肝汤', source: '《医方集解》', content: '【组成】龙胆草 6g、黄芩 9g、栀子 9g、泽泻 12g、木通 6g、车前子 9g、当归 6g、生地 9g、柴胡 6g、甘草 6g。【功效】清泻肝胆实火，清利肝经湿热。', tags: ['清热剂', '肝胆', '湿热'] },
        ]
      },
      herbs: {
        name: '中药学',
        items: [
          { id: 'herb-1', title: '人参', source: '五加科', content: '【性味】甘、微苦，微温。【归经】归脾、肺、心经。【功效】大补元气，复脉固脱，补脾益肺，生津养血，安神益智。【主治】气虚欲脱，脾虚食少，肺虚喘咳，津伤口渴。', tags: ['补气药', '上品', '急救'] },
          { id: 'herb-2', title: '黄芪', source: '豆科', content: '【性味】甘，微温。【归经】归脾、肺经。【功效】补气升阳，固表止汗，利水消肿，生津养血。【主治】气虚乏力，食少便溏，中气下陷，表虚自汗。', tags: ['补气药', '固表', '升阳'] },
          { id: 'herb-3', title: '当归', source: '伞形科', content: '【性味】甘、辛，温。【归经】归肝、心、脾经。【功效】补血活血，调经止痛，润肠通便。【主治】血虚萎黄，月经不调，经闭痛经，风湿痹痛。', tags: ['补血药', '活血', '调经'] },
          { id: 'herb-4', title: '白术', source: '菊科', content: '【性味】苦、甘，温。【归经】归脾、胃经。【功效】健脾益气，燥湿利水，止汗，安胎。【主治】脾虚食少，腹胀泄泻，痰饮眩悸，水肿自汗。', tags: ['补气药', '健脾', '燥湿'] },
          { id: 'herb-5', title: '茯苓', source: '多孔菌科', content: '【性味】甘、淡，平。【归经】归心、肺、脾、肾经。【功效】利水渗湿，健脾，宁心。【主治】水肿尿少，痰饮眩悸，脾虚食少，便溏泄泻，心神不安。', tags: ['利水药', '健脾', '安神'] },
          { id: 'herb-6', title: '甘草', source: '豆科', content: '【性味】甘，平。【归经】归心、肺、脾、胃经。【功效】补脾益气，清热解毒，祛痰止咳，缓急止痛，调和诸药。【主治】脾胃虚弱，倦怠乏力，心悸气短，咳嗽痰多。', tags: ['补气药', '调和', '解毒'] },
        ]
      },
      classics: {
        name: '经典古籍',
        items: [
          { id: 'classic-1', title: '黄帝内经', source: '先秦时期', content: '中医学的奠基之作，分为《素问》和《灵枢》两部分。《素问》主要论述阴阳五行、藏象经络、病因病机等基础理论；《灵枢》主要论述针灸经络、腧穴刺法等。', tags: ['经典', '理论基础', '针灸'] },
          { id: 'classic-2', title: '伤寒论', source: '东汉·张仲景', content: '辨证论治的典范，确立了六经辨证体系。全书 10 卷，22 篇，载方 113 首。论述外感病的辨证论治，为后世临床各科奠定基础。', tags: ['经典', '临床', '六经辨证'] },
          { id: 'classic-3', title: '金匮要略', source: '东汉·张仲景', content: '杂病诊治的专著，与《伤寒论》合称《伤寒杂病论》。全书 25 篇，载方 262 首。论述内科、妇科等杂病的辨证论治。', tags: ['经典', '杂病', '妇科'] },
          { id: 'classic-4', title: '温病条辨', source: '清·吴鞠通', content: '温病学的重要著作，创立了三焦辨证体系。全书 6 卷，论述风温、温热、温疫、温毒等温病的辨证论治。', tags: ['经典', '温病', '三焦辨证'] },
        ]
      },
    }
  },
  western: {
    id: 'western',
    name: '西医学',
    icon: '🩺',
    color: '#2980b9',
    children: {
      basic: {
        name: '基础医学',
        items: [
          { id: 'west-basic-1', title: '解剖学', content: '研究人体形态结构的科学，包括系统解剖学、局部解剖学等。', tags: ['基础', '形态学'] },
          { id: 'west-basic-2', title: '生理学', content: '研究人体正常生命活动规律的科学，包括细胞生理、器官生理、系统生理等。', tags: ['基础', '功能学'] },
          { id: 'west-basic-3', title: '病理学', content: '研究疾病发生发展规律的科学，包括病理解剖学、病理生理学等。', tags: ['基础', '疾病'] },
        ]
      },
      diagnosis: {
        name: '诊断学',
        items: [
          { id: 'west-diag-1', title: '病史采集', content: '通过问诊了解疾病发生发展过程，包括主诉、现病史、既往史、个人史、家族史等。', tags: ['诊断', '问诊'] },
          { id: 'west-diag-2', title: '体格检查', content: '通过视触叩听等方法检查患者身体状况，包括一般检查、头颈部、胸部、腹部、神经系统等。', tags: ['诊断', '查体'] },
        ]
      },
    }
  },
  integrated: {
    id: 'integrated',
    name: '中西医结合',
    icon: '⚕️',
    color: '#27ae60',
    children: {
      theory: {
        name: '病证结合',
        items: [
          { id: 'int-theory-1', title: '中西医结合诊疗思路', content: '西医诊断明确病名，中医辨证确定证型，病证结合，优势互补。', tags: ['诊疗', '思路'] },
        ]
      },
      cases: {
        name: '临床案例',
        items: [
          { id: 'int-case-1', title: '慢性胃炎中西医结合治疗', content: '西医诊断：慢性浅表性胃炎。中医辨证：脾胃虚弱证。治法：健脾和胃。方药：香砂六君子汤加减。', tags: ['案例', '胃病'] },
        ]
      },
    }
  },
  other: {
    id: 'other',
    name: '其他',
    icon: '📖',
    color: '#f39c12',
    children: {
      food: {
        name: '药食同源',
        items: [
          { id: 'food-1', title: '山药', content: '【来源】薯蓣科植物薯蓣的干燥根茎。【性味】甘，平。【功效】补脾养胃，生津益肺，补肾涩精。【应用】脾虚食少，久泻不止，肺虚喘咳，肾虚遗精。', tags: ['补气', '健脾', '药食两用'] },
          { id: 'food-2', title: '枸杞子', content: '【来源】茄科植物宁夏枸杞的干燥成熟果实。【性味】甘，平。【功效】滋补肝肾，益精明目。【应用】虚劳精亏，腰膝酸痛，眩晕耳鸣，内热消渴，血虚萎黄，目昏不明。', tags: ['滋补', '肝肾', '明目'] },
          { id: 'food-3', title: '大枣', content: '【来源】鼠李科植物枣的干燥成熟果实。【性味】甘，温。【功效】补中益气，养血安神。【应用】脾虚食少，乏力便溏，妇人脏躁。', tags: ['补气', '养血', '安神'] },
        ]
      },
      notes: {
        name: '学习笔记',
        items: [
          { id: 'note-1', title: '中医学习方法', content: '1. 熟读经典，理解原文；2. 理论联系实际；3. 跟师临证，积累经验；4. 勤思善悟，融会贯通。', tags: ['学习', '方法'] },
        ]
      },
    }
  },
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('tcm')
  const [selectedSubcategory, setSelectedSubcategory] = useState('formulas')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)

  const currentCategory = knowledgeBase[selectedCategory]
  const currentSubcategory = currentCategory?.children?.[selectedSubcategory]
  
  const allItems = useMemo(() => {
    const items: any[] = []
    Object.values(currentCategory?.children || {}).forEach((sub: any) => {
      sub.items.forEach((item: any) => {
        items.push({ ...item, subcategory: sub.name })
      })
    })
    return items
  }, [currentCategory])

  const filteredItems = useMemo(() => {
    if (!searchQuery) return currentSubcategory?.items || []
    return allItems.filter((item: any) => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag: any) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  }, [searchQuery, currentSubcategory, allItems])

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        padding: '15px 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '5px',
            }}
          >
            {sidebarOpen ? '📚' : '📖'}
          </button>
          <div>
            <h1 style={{ 
              fontSize: '24px', 
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0,
            }}>
              🏥 宋宋的中医药知识库
            </h1>
            <p style={{ fontSize: '12px', color: '#666', margin: '5px 0 0 0' }}>
              传承中医精华 · 融合现代医学
            </p>
          </div>
        </div>
        
        {/* 搜索框 */}
        <div style={{ position: 'relative', width: '400px' }}>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索知识、方剂、中药..."
            style={{
              width: '100%',
              padding: '12px 20px 12px 45px',
              borderRadius: '25px',
              border: '2px solid #e0e0e0',
              fontSize: '14px',
              outline: 'none',
              transition: 'all 0.3s',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#667eea'
              e.target.style.boxShadow = '0 0 0 3px rgba(102,126,234,0.1)'
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#e0e0e0'
              e.target.style.boxShadow = 'none'
            }}
          />
          <span style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '18px',
          }}>
            🔍
          </span>
        </div>

        {/* 统计信息 */}
        <div style={{ textAlign: 'right', fontSize: '12px', color: '#666' }}>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>
            {(Object.values(knowledgeBase).reduce((sum: any, cat: any) => 
              sum + Object.values(cat.children).reduce((s: any, sub: any) => s + sub.items.length, 0), 0) as number)} 条知识
          </div>
          <div>持续更新中...</div>
        </div>
      </header>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {/* 左侧导航 */}
        {sidebarOpen && (
          <aside style={{
            width: '280px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            margin: '20px',
            borderRadius: '20px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            overflow: 'auto',
            transition: 'all 0.3s',
          }}>
            {/* 主分类 */}
            <div style={{ padding: '20px' }}>
              <h2 style={{ 
                fontSize: '16px', 
                fontWeight: 'bold', 
                color: '#333',
                marginBottom: '15px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}>
                📂 知识分类
              </h2>
              
              {Object.values(knowledgeBase).map((category: any) => (
                <div key={category.id} style={{ marginBottom: '10px' }}>
                  <button
                    onClick={() => {
                      setSelectedCategory(category.id)
                      setSelectedSubcategory(Object.keys(category.children)[0])
                    }}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      borderRadius: '12px',
                      border: 'none',
                      background: selectedCategory === category.id 
                        ? `linear-gradient(135deg, ${category.color} 0%, ${category.color}dd 100%)`
                        : 'transparent',
                      color: selectedCategory === category.id ? 'white' : '#333',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: selectedCategory === category.id ? 'bold' : 'normal',
                      textAlign: 'left',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e: any) => {
                      if (selectedCategory !== category.id) {
                        e.target.style.background = '#f5f5f5'
                      }
                    }}
                    onMouseLeave={(e: any) => {
                      if (selectedCategory !== category.id) {
                        e.target.style.background = 'transparent'
                      }
                    }}
                  >
                    <span style={{ fontSize: '18px' }}>{category.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div>{category.name}</div>
                      <div style={{ fontSize: '11px', opacity: 0.7 }}>
                        {Object.keys(category.children).length} 个子类
                      </div>
                    </div>
                  </button>

                  {/* 子分类 */}
                  {selectedCategory === category.id && (
                    <div style={{ 
                      marginLeft: '20px', 
                      marginTop: '5px',
                      borderLeft: `2px solid ${category.color}33`,
                      paddingLeft: '10px',
                    }}>
                      {Object.entries(category.children).map(([key, sub]: any) => (
                        <button
                          key={key}
                          onClick={() => setSelectedSubcategory(key)}
                          style={{
                            width: '100%',
                            padding: '8px 12px',
                            borderRadius: '8px',
                            border: 'none',
                            background: selectedSubcategory === key 
                              ? `${category.color}22`
                              : 'transparent',
                            color: selectedSubcategory === key ? category.color : '#666',
                            cursor: 'pointer',
                            fontSize: '13px',
                            textAlign: 'left',
                            marginBottom: '3px',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={(e: any) => {
                            if (selectedSubcategory !== key) {
                              e.target.style.background = `${category.color}11`
                            }
                          }}
                          onMouseLeave={(e: any) => {
                            if (selectedSubcategory !== key) {
                              e.target.style.background = 'transparent'
                            }
                          }}
                        >
                          {sub.name}
                          <span style={{ float: 'right', fontSize: '11px' }}>
                            {sub.items.length}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </aside>
        )}

        {/* 主内容区 */}
        <main style={{
          flex: 1,
          margin: '20px',
          marginRight: sidebarOpen ? '20px' : '20px',
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}>
          {/* 内容头部 */}
          {currentSubcategory && (
            <div style={{
              padding: '25px 30px',
              borderBottom: '1px solid #f0f0f0',
            }}>
              <h2 style={{ 
                fontSize: '22px', 
                fontWeight: 'bold', 
                color: '#333',
                margin: '0 0 10px 0',
              }}>
                {currentSubcategory.name}
              </h2>
              <p style={{ color: '#666', fontSize: '14px', margin: 0 }}>
                共 {currentSubcategory.items.length} 条知识
              </p>
            </div>
          )}

          {/* 内容列表 */}
          <div style={{ padding: '20px 30px', flex: 1, overflow: 'auto' }}>
            {filteredItems.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '60px 20px',
                color: '#999',
              }}>
                <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔍</div>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}>暂无内容</div>
                <div style={{ fontSize: '14px', marginTop: '10px' }}>
                  {searchQuery ? '换个关键词试试吧~' : '该分类下暂无内容'}
                </div>
              </div>
            ) : (
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', 
                gap: '20px',
              }}>
                {filteredItems.map((item: any) => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedItem(selectedItem?.id === item.id ? null : item)}
                    style={{
                      padding: '20px',
                      background: selectedItem?.id === item.id ? '#f8f9fa' : 'white',
                      borderRadius: '15px',
                      border: `2px solid ${selectedItem?.id === item.id ? '#667eea' : '#f0f0f0'}`,
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      boxShadow: selectedItem?.id === item.id 
                        ? '0 5px 20px rgba(102,126,234,0.2)' 
                        : '0 2px 10px rgba(0,0,0,0.05)',
                    }}
                    onMouseEnter={(e: any) => {
                      if (selectedItem?.id !== item.id) {
                        e.currentTarget.style.transform = 'translateY(-2px)'
                        e.currentTarget.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)'
                      }
                    }}
                    onMouseLeave={(e: any) => {
                      if (selectedItem?.id !== item.id) {
                        e.currentTarget.style.transform = 'translateY(0)'
                        e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)'
                      }
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                      <div style={{ 
                        fontSize: '24px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        📖
                      </div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ 
                          fontSize: '16px', 
                          fontWeight: 'bold', 
                          color: '#333',
                          margin: '0 0 8px 0',
                        }}>
                          {item.title}
                        </h3>
                        {item.source && (
                          <div style={{ 
                            fontSize: '12px', 
                            color: '#667eea',
                            marginBottom: '8px',
                          }}>
                            📜 {item.source}
                          </div>
                        )}
                        <p style={{ 
                          fontSize: '14px', 
                          color: '#666',
                          margin: '0 0 12px 0',
                          lineHeight: '1.6',
                        }}>
                          {item.content.length > 100 
                            ? item.content.substring(0, 100) + '...' 
                            : item.content}
                        </p>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                          {item.tags.map((tag: any, i: number) => (
                            <span
                              key={i}
                              style={{
                                fontSize: '11px',
                                padding: '3px 8px',
                                background: '#667eea15',
                                color: '#667eea',
                                borderRadius: '12px',
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* 展开详情 */}
                    {selectedItem?.id === item.id && (
                      <div style={{
                        marginTop: '15px',
                        paddingTop: '15px',
                        borderTop: '1px solid #f0f0f0',
                        fontSize: '14px',
                        color: '#666',
                        lineHeight: '1.8',
                      }}>
                        {item.content}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

import { GoogleGenAI } from '@google/genai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn('警告: 未配置 Gemini API Key');
}

// 新 SDK 使用不同的初始化方式
const genAI = API_KEY ? new GoogleGenAI({ apiKey: API_KEY }) : null;

/**
 * 基于用户选择生成分析报告
 * @param {Array} userChoices - 用户的选择数据
 * @returns {Promise<Object>} 包含性格分析、MBTI、职业建议的报告对象
 */
/**
 * 生成模拟报告（用于测试，当没有配置 API Key 时）
 */
function generateMockReport(dataForAPI) {
  const traits = dataForAPI.traits || {};
  const choices = dataForAPI.choices || [];
  
  // 分析性格特征
  const traitKeys = Object.keys(traits);
  const topTraits = traitKeys
    .sort((a, b) => traits[b] - traits[a])
    .slice(0, 5);
  
  // 简单的性格分析
  let personality = '根据您的选择，我们发现孩子表现出以下特点：\n\n';
  if (topTraits.length > 0) {
    topTraits.forEach(trait => {
      personality += `• ${trait}：得分较高（${traits[trait]}分），说明孩子在这方面表现突出。\n`;
    });
  } else {
    personality += '• 孩子在多个方面都有均衡的发展。\n';
  }
  personality += '\n总体而言，这是一个充满活力和个性的孩子，在社交和独立能力方面都有不错的表现。建议家长多关注孩子的情绪表达，鼓励孩子尝试新事物，培养孩子的自信心和独立性。';
  
  // 简单的 MBTI 推断（基于特征）
  let mbti = 'ENFP'; // 默认值
  if ((traits['内向'] || 0) > (traits['外向'] || 0)) {
    mbti = 'ISFJ';
  } else if ((traits['独立'] || 0) > 5) {
    mbti = 'ENTP';
  } else if ((traits['规则意识'] || 0) > 5) {
    mbti = 'ISTJ';
  } else if ((traits['社交'] || 0) > 3 && (traits['沟通'] || 0) > 3) {
    mbti = 'ESFJ';
  }
  
  // 简单的职业建议
  let career = '基于孩子的性格特点，建议未来可以考虑以下方向：\n\n';
  if ((traits['社交'] || 0) > 3 || (traits['沟通'] || 0) > 3) {
    career += '• 教育、咨询、服务行业：孩子善于与人沟通，适合需要人际交往的工作。\n';
  }
  if ((traits['独立'] || 0) > 3 || (traits['创新'] || 0) > 2) {
    career += '• 创意、设计、技术领域：孩子有独立思考和创新能力，可以发挥创造力。\n';
  }
  if ((traits['规则意识'] || 0) > 3 || (traits['耐心'] || 0) > 2) {
    career += '• 管理、组织、规划类工作：孩子有良好的规则意识和耐心，适合需要条理的工作。\n';
  }
  if (career === '基于孩子的性格特点，建议未来可以考虑以下方向：\n\n') {
    career += '• 建议根据孩子的兴趣和特长，结合专业评估来选择适合的职业方向。\n';
  }
  career += '\n注意：这只是基于游戏数据的初步分析，实际职业规划需要结合更多因素和专业评估。';
  
  return {
    personality,
    mbti,
    career
  };
}

export async function generateReport(userChoices) {
  // 如果没有配置 API Key，使用模拟数据
  if (!genAI) {
    console.warn('⚠️ 未配置 Gemini API Key，使用模拟报告数据');
    // 模拟 API 延迟
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateMockReport(userChoices);
  }

  // 构建提示词
  const prompt = buildPrompt(userChoices);

  try {
    // 新 SDK 使用 models.generateContent 方法
    const response = await genAI.models.generateContent({
      model: 'gemini-pro',
      contents: prompt,
    });

    // 提取响应文本（新 SDK 的 GenerateContentResponse 有 text getter）
    const text = response.text;
    
    if (!text) {
      throw new Error('API 返回为空');
    }

    // 解析返回的 JSON 数据
    return parseReport(text);
  } catch (error) {
    console.error('Gemini API 调用失败:', error);
    console.warn('⚠️ API 调用失败，使用模拟报告数据');
    // API 失败时也返回模拟数据
    return generateMockReport(userChoices);
  }
}

/**
 * 构建提示词
 */
function buildPrompt(userChoices) {
  return `
你是一位专业的儿童心理分析师和教育专家。请基于以下小朋友在情景游戏中的选择数据，进行专业的性格分析和职业建议。

用户选择数据：
${JSON.stringify(userChoices, null, 2)}

请按照以下格式返回 JSON 数据：
{
  "personality": "详细的性格分析（200-300字）",
  "mbti": "MBTI 类型（如：ENFP, ISFJ 等）",
  "career": "基于当前经济背景和孩子的性格特点，给出职业发展建议（200-300字）"
}

要求：
1. 性格分析要客观、积极，关注孩子的优势
2. MBTI 类型要准确，基于选择数据推断
3. 职业建议要考虑当前的经济环境和未来发展趋势
4. 语言要适合家长阅读，专业但易懂
`;
}

/**
 * 解析报告文本为 JSON 对象
 */
function parseReport(text) {
  try {
    // 尝试提取 JSON 部分
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // 如果无法解析，返回默认结构
    return {
      personality: text,
      mbti: '未知',
      career: '请咨询专业教育顾问'
    };
  } catch (error) {
    console.error('解析报告失败:', error);
    return {
      personality: text,
      mbti: '未知',
      career: '请咨询专业教育顾问'
    };
  }
}


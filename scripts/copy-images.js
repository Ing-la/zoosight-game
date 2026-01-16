/**
 * 图片复制脚本
 * 自动将 picture 目录中的图片复制到对应的场景目录
 * 
 * 命名规则：
 * - 格式：{locationId}-{eventId}-{description}.png
 * - 示例：school-entrance-teacher_greeting.png
 * - 会自动重命名为英文名（如果原文件名包含中文，会提取描述部分）
 */

const fs = require('fs');
const path = require('path');

const PICTURE_DIR = path.join(__dirname, '..', 'picture');
const SCENES_DIR = path.join(__dirname, '..', 'src', 'scenes');

// 场景ID映射（中文 -> 英文）
const locationIdMapping = {
  '学校': 'school',
  '游乐场': 'playground',
};

// 事件ID映射（中文 -> 英文）
const eventIdMapping = {
  '进校门': 'entrance',
  '午餐': 'lunch',
  '滑滑梯': 'slide',
  '荡秋千': 'swing',
};

// 图片描述映射（中文描述 -> 英文名）
const descriptionMapping = {
  '长颈鹿老师打招呼': 'teacher_greeting',
  '老师打招呼': 'teacher_greeting',
  '大声打招呼': 'loud_greeting',
  '大声': 'loud_greeting',
  '一起进校': 'enter_together',
  '一起': 'enter_together',
  '微笑挥手': 'smile_wave',
  '挥手': 'smile_wave',
  '害羞点头': 'shy_nod',
  '害羞': 'shy_nod',
  '点头': 'shy_nod',
  '遇见大象保安': 'meet_security',
  '大象保安': 'meet_security',
  '保安': 'meet_security',
  '准备测体温': 'prepare_temperature',
  '测体温': 'prepare_temperature',
  '伸出额头': 'extend_forehead',
  '主动伸出': 'extend_forehead',
  '完成体温测量': 'complete_temperature',
  '完成测量': 'complete_temperature',
  '问凉不凉': 'ask_if_cold',
  '问凉': 'ask_if_cold',
  '退半步': 'step_back',
  '后退': 'step_back',
};

/**
 * 解析图片文件名，提取场景信息
 */
function parseImageName(filename) {
  const nameWithoutExt = filename.replace(/\.(png|jpg|jpeg)$/i, '');
  
  // 尝试解析格式：{locationId}-{eventId}-{description}
  const parts = nameWithoutExt.split('-');
  if (parts.length < 2) {
    return null;
  }
  
  let locationId = parts[0];
  let eventId = parts[1];
  let description = parts.slice(2).join('_') || eventId;
  
  // 映射中文场景ID到英文
  if (locationIdMapping[locationId]) {
    locationId = locationIdMapping[locationId];
  }
  
  // 映射中文事件ID到英文
  if (eventIdMapping[eventId]) {
    eventId = eventIdMapping[eventId];
  }
  
  // 映射中文描述到英文
  const originalDescription = parts.slice(2).join('-');
  if (descriptionMapping[originalDescription]) {
    description = descriptionMapping[originalDescription];
  } else if (description && !/^[a-zA-Z_]+$/.test(description)) {
    // 如果描述包含非英文字符，尝试从映射中查找
    for (const [key, value] of Object.entries(descriptionMapping)) {
      if (originalDescription.includes(key)) {
        description = value;
        break;
      }
    }
    // 如果还是中文，使用拼音或默认名称
    if (!/^[a-zA-Z_]+$/.test(description)) {
      // 简单的拼音转换或使用默认名
      description = description.replace(/[^\w]/g, '_').toLowerCase();
    }
  }
  
  return {
    locationId,
    eventId,
    description: description || eventId,
    originalName: nameWithoutExt
  };
}

/**
 * 复制图片到目标位置
 */
function copyImage(sourcePath, targetDir, newName) {
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  const targetPath = path.join(targetDir, newName);
  fs.copyFileSync(sourcePath, targetPath);
  console.log(`✓ 已复制: ${path.basename(sourcePath)} -> ${targetPath}`);
  return targetPath;
}

/**
 * 主函数
 */
function main() {
  if (!fs.existsSync(PICTURE_DIR)) {
    console.log(`❌ picture 目录不存在: ${PICTURE_DIR}`);
    return;
  }
  
  const files = fs.readdirSync(PICTURE_DIR);
  const imageFiles = files.filter(file => 
    /\.(png|jpg|jpeg)$/i.test(file)
  );
  
  if (imageFiles.length === 0) {
    console.log('ℹ picture 目录中没有图片文件');
    return;
  }
  
  console.log(`找到 ${imageFiles.length} 个图片文件\n`);
  
  let copiedCount = 0;
  let skippedCount = 0;
  
  for (const imageFile of imageFiles) {
    const sourcePath = path.join(PICTURE_DIR, imageFile);
    const parsed = parseImageName(imageFile);
    
    if (!parsed) {
      console.log(`⚠ 跳过无法解析的文件: ${imageFile}`);
      skippedCount++;
      continue;
    }
    
    const { locationId, eventId, description } = parsed;
    const targetDir = path.join(SCENES_DIR, locationId, eventId, 'assets', 'images');
    const newName = `${description}.png`;
    
    try {
      copyImage(sourcePath, targetDir, newName);
      copiedCount++;
    } catch (error) {
      console.error(`❌ 复制失败 ${imageFile}:`, error.message);
      skippedCount++;
    }
  }
  
  console.log(`\n完成！已复制 ${copiedCount} 个文件，跳过 ${skippedCount} 个文件`);
}

if (require.main === module) {
  main();
}

module.exports = { parseImageName, copyImage };


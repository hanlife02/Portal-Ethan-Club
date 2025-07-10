// 测试图标逻辑
const testServices = [
  {
    id: "treehole",
    name: "TreeHole",
    icon: "treehole.png"
  },
  {
    id: "lobechat", 
    name: "LobeChat",
    icon: "chat-icon"
  },
  {
    id: "custom",
    name: "Custom Service",
    icon: "my-custom-icon.svg"
  },
  {
    id: "default",
    name: "Default Service", 
    icon: "unknown-icon"
  }
];

// 模拟图标渲染逻辑
function renderServiceIcon(service) {
  // 检查是否为图片文件
  if (service.icon && (service.icon.endsWith('.png') || service.icon.endsWith('.jpg') || service.icon.endsWith('.jpeg') || service.icon.endsWith('.webp') || service.icon.endsWith('.svg'))) {
    return `Image: /${service.icon}`;
  }
  // 预定义图标
  else if (service.id === "lobechat" || service.icon === "chat-icon") {
    return "Image: /lobe-icon.webp";
  } else if (service.id === "newapi" || service.icon === "api-icon") {
    return "Image: /newapi-logo.png";
  } else {
    return "Default: 🔧";
  }
}

// 测试结果
testServices.forEach(service => {
  console.log(`${service.name}: ${renderServiceIcon(service)}`);
});

// 预期输出:
// TreeHole: Image: /treehole.png ✅
// LobeChat: Image: /lobe-icon.webp ✅  
// Custom Service: Image: /my-custom-icon.svg ✅
// Default Service: Default: 🔧 ✅

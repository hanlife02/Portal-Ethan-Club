# 图标支持说明

## 新增功能

现在系统支持直接使用 `public` 文件夹下的图片文件作为服务的图标。

## 使用方法

### 1. 直接使用图片文件名

将图片文件放入 `public` 文件夹中，然后在服务的 `icon` 字段中直接使用文件名：

```json
{
  "id": "treehole",
  "name": "TreeHole",
  "description": "TreeHole 树洞服务",
  "url": "https://treehole.example.com",
  "icon": "treehole.png"
}
```

### 2. 支持的图片格式

- `.png`
- `.jpg`
- `.jpeg`
- `.webp`
- `.svg`

### 3. 示例

假设你有一个名为 `my-service.png` 的图片文件在 `public` 文件夹中：

```
public/
├── my-service.png
├── treehole.png
├── lobe-icon.webp
└── newapi-logo.png
```

你可以在添加服务时直接使用文件名：

```json
{
  "id": "my-service",
  "name": "My Service",
  "description": "My awesome service",
  "url": "https://my-service.com",
  "icon": "my-service.png"
}
```

### 4. 向后兼容

系统仍然支持原有的图标方式：

- `chat-icon` - 使用 LobeChat 图标
- `api-icon` - 使用 NewAPI 图标
- 其他值 - 使用默认图标（🔧）

### 5. 图标处理逻辑

系统会按照以下顺序处理图标：

1. **检查是否为图片文件**：如果 icon 值以 `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg` 结尾，则直接使用 `/{icon}` 作为图片路径
2. **检查是否为预定义图标**：如果是 `chat-icon` 或 `api-icon`，使用对应的预定义图片
3. **使用默认图标**：如果都不匹配，使用默认的工具图标

### 6. 添加新服务示例

通过管理界面添加新服务时，在 Icon 字段中输入图片文件名即可：

- 图片文件名：`treehole.png`
- 预定义图标：`chat-icon`
- 默认图标：留空或输入其他值

### 7. 注意事项

1. **图片文件路径**：确保图片文件放在 `public` 文件夹的根目录下
2. **图片尺寸**：建议使用正方形图片，系统会自动调整为 64x64 像素显示
3. **图片格式**：推荐使用 PNG 或 WebP 格式以获得最佳效果
4. **文件名规范**：使用小写字母和连字符，避免特殊字符

## 后端支持

后端服务已经更新，在 `services.json` 中添加了一个使用 `treehole.png` 作为图标的示例服务：

```json
{
  "id": "treehole",
  "name": "TreeHole",
  "description": "TreeHole 树洞服务",
  "url": "https://treehole.example.com",
  "icon": "treehole.png"
}
```

这样，系统就能够灵活地支持各种图标需求，既保持了向后兼容性，又提供了更多的自定义选项。

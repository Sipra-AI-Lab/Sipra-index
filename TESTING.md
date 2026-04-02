# 🧪 Hydra 测试指南

## 概述

Hydra 项目包含完整的测试体系，包括单元测试、集成测试和 UI 测试。

## 测试结构

```
Hydra/
├── HydraAppTests/                    # iOS App 单元测试
│   ├── Models/                      # 模型测试
│   ├── Managers/                     # 管理器测试
│   └── Services/                    # 服务测试
├── SharedTests/                     # 共享模块单元测试
│   ├── StatisticsManagerTests.swift    # 统计管理器测试
│   ├── CaffeineManagerTests.swift     # 咖啡因管理器测试
│   └── DrinkRecordRepositoryTests.swift  # 仓储测试
├── HydraAppUITests/                # iOS App UI 测试
└── Tests/                         # 测试工具
    ├── TestHelpers/
    │   ├── MockData.swift          # 模拟数据
    │   └── MockRepositories.swift   # Mock 仓储
    └── run-tests.sh               # 测试运行脚本
```

## 快速开始

### 运行所有测试

```bash
cd /Users/wh627/Hydra
./run-tests.sh all
```

### 运行特定测试

```bash
# 只运行单元测试
./run-tests.sh unit

# 只运行 Shared 模块测试
./run-tests.sh shared

# 只运行 UI 测试
./run-tests.sh ui
```

### 清理后运行测试

```bash
./run-tests.sh all true
```

## Xcode 中运行测试

### 1. 打开项目

```bash
open Hydra.xcodeproj
```

### 2. 选择测试目标

- **Test Navigator** (⌘ + 6)
- 选择要运行的测试

### 3. 运行测试

- 单个测试: 点击测试左侧的钻石图标
- 整个测试文件: 点击文件名左侧的钻石图标
- 所有测试: ⌘ + U

## 编写测试

### 单元测试模板

```swift
import XCTest
@testable import Hydra

final class MyManagerTests: XCTestCase {
    var sut: MyManager!

    override func setUp() {
        super.setUp()
        sut = MyManager()
    }

    override func tearDown() {
        sut = nil
        super.tearDown()
    }

    func testSomeFeature_WithValidInput_ReturnsExpectedResult() {
        // Given
        let input = "test"

        // When
        let result = sut.process(input)

        // Then
        XCTAssertEqual(result, "expected", "Should return expected result")
    }
}
```

### UI 测试模板

```swift
import XCTest

final class HomeViewTests: XCTestCase {
    var app: XCUIApplication!

    override func setUp() {
        super.setUp()
        continueAfterFailure = false
        app = XCUIApplication()
        app.launch()
    }

    func testAddWaterButton_WhenTapped_IncreasesProgress() {
        // Given
        let addButton = app.buttons["addWater"]

        // When
        addButton.tap()

        // Then
        let progressLabel = app.staticTexts["progressLabel"]
        XCTAssertTrue(progressLabel.exists, "Progress should be updated")
    }
}
```

## 测试覆盖率

### 查看覆盖率报告

在 Xcode 中：

1. 运行测试 (⌘ + U)
2. 打开 Report Navigator (⌘ + 9)
3. 选择最近的测试运行
4. 点击 "Coverage" 标签

### 命令行生成覆盖率

```bash
xcodebuild test \
    -scheme HydraApp \
    -enableCodeCoverage YES \
    -destination 'platform=iOS Simulator,name=iPhone 15 Pro,OS=17.4'

xcrun xccov view \
    --report \
    ~/Library/Developer/Xcode/DerivedData/Hydra-*/Logs/Test/*.xcresult
```

## 测试最佳实践

### 1. AAA 模式

每个测试应该遵循 AAA 模式：

- **Arrange** (Given) - 准备测试数据
- **Act** (When) - 执行被测试的操作
- **Assert** (Then) - 验证结果

### 2. 测试命名

使用清晰的测试名称：

```swift
✅ 好的命名
func testAdjustedHydrationGoal_WithCaffeine_IncreasesGoal() {
}

❌ 不好的命名
func test1() {
}
```

### 3. Mock 数据

使用 MockData 生成测试数据：

```swift
let records = MockData.mockWeeklyData()
```

### 4. 独立性

每个测试应该独立运行，不依赖其他测试的状态。

### 5. 边界情况

测试边界条件和异常情况：

```swift
func testGenerateWeeklyReport_WithEmptyData_ReturnsZeroValues() {
}

func testGenerateWeeklyReport_WithLargeAmounts_HandlesCorrectly() {
}
```

## CI/CD 集成

### GitHub Actions 示例

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: macos-latest

    steps:
    - uses: actions/checkout@v2

    - name: Run tests
      run: |
        cd Hydra
        ./run-tests.sh all
```

## 常见问题

### Q: 测试失败怎么办？

A:
1. 查看测试输出中的错误信息
2. 使用 Xcode 的 Test Navigator 查看详细日志
3. 检查模拟器版本是否匹配

### Q: 如何调试失败的测试？

A:
1. 在测试代码中设置断点
2. 右键点击测试 -> Debug
3. 使用 `print()` 输出调试信息

### Q: Mock 数据不够用怎么办？

A:
在 `Tests/TestHelpers/MockData.swift` 中添加更多 mock 数据生成方法。

## 下一步

- [ ] 为所有核心 Manager 编写单元测试
- [ ] 为关键 UI 流程编写 UI 测试
- [ ] 设置 CI/CD 自动运行测试
- [ ] 达到 80%+ 代码覆盖率
- [ ] 添加性能测试

---

有任何问题，请查阅 [XCTest 文档](https://developer.apple.com/documentation/xctest)。

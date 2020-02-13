# git Commit message 的格式

好的 Commit message 可以提供更多的历史信息，方便 快速浏览和查找，还可以直接生成 Change log，一般至少包含 type 和 subject，type 是 commit 的类别，subject 是 commit 的简短描述。

## 约束

每次提交，Commit message 都包括三个部分：Header，Body 和 Footer。

<type>(<scope>): <subject>
// 空一行<body>
// 空一行<footer>

其中，Header 是必需的，Body 和 Footer 可以省略。

不管是哪一个部分，任何一行都不得超过72个字符（或100个字符）。
书写说明推荐使用英文，如果英文不能达到描述问题效果，请使用中文。

1. Header
Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）。

（1）type

type用于说明 commit 的类别，只允许使用下面7个标识。

feat：新功能（feature）

fix：修补bug

docs：文档（documentation）

style： 格式（不影响代码运行的变动）

refactor：重构（即不是新增功能，也不是修改bug的代码变动）

test：增加测试

chore：构建过程或辅助工具的变动

如果type为feat和fix，则该 commit 将肯定出现在 Change log 之中。其他情况（docs、chore、style、refactor、test）由你决定，要不要放入 Change log，建议是不要。

（2）scope

scope用于说明 commit 影响的范围，比如数据层、控制层、视图层等等，视项目不同而不同。

（3）subject

subject是 commit 目的的简短描述，不超过50个字符。

2. Body
Body 部分是对本次 commit 的详细描述，可以分成多行。

3. Footer

Footer 部分只用于两种情况。

（1）不兼容变动

如果当前代码与上一个版本不兼容，则 Footer 部分以BREAKING CHANGE开头，后面是对变动的描述、以及变动理由和迁移方法。

4. Revert

还有一种特殊情况，如果当前 commit 用于撤销以前的 commit，则必须以revert:开头，后面跟着被撤销 Commit 的 Header。Revert 的目的必须写上说明。

## 示例

1. 开发了一个新功能的提交说明，type 为 feat:
```
feat: add preview image
```

2. 修改样式的说明，type 为 style:
```
style: change goods's css
```

3. 修改了一个问题，type 为 fix:
```
fix: change a const value which it cause a bug
```
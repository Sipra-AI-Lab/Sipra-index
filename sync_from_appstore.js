const fs = require('fs');
const https = require('https');

/**
 * ================= 配置区 =================
 * App ID: 6761408337 (Sipra)
 * ==========================================
 */
const APP_ID = '6761408337';
const filesToUpdate = ['index.html', 'index_en.html'];

function fetchVersion() {
    // 使用苹果官方 iTunes Search API (指定中国区以便获取最新状态)
    const url = `https://itunes.apple.com/lookup?id=${APP_ID}&country=cn&timestamp=${new Date().getTime()}`;

    console.log(`正在从 App Store 查询 App ID: ${APP_ID} 的最新信息...`);

    https.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => {
            try {
                const json = JSON.parse(data);
                if (json.resultCount === 0) {
                    console.error('❌ 错误：未能在 App Store 找到该 App。');
                    console.log('提示：如果您的 App 尚未正式过审上架，商店接口将无法返回数据。');
                    return;
                }

                const latestVersion = json.results[0].version;
                const appName = json.results[0].trackName;
                
                console.log(`✅ 成功连接商店！`);
                console.log(`应用名称: ${appName}`);
                console.log(`最新版本: ${latestVersion}`);
                
                updateHtmlFiles(latestVersion);
            } catch (e) {
                console.error('❌ 解析商店数据失败:', e.message);
            }
        });
    }).on('error', (err) => {
        console.error('❌ 网络请求失败:', err.message);
    });
}

function updateHtmlFiles(newVersion) {
    let updatedCount = 0;

    filesToUpdate.forEach(file => {
        if (!fs.existsSync(file)) {
            console.warn(`⚠️ 找不到文件: ${file}，已跳过。`);
            return;
        }

        let content = fs.readFileSync(file, 'utf8');
        
        // 精准匹配 HTML 中的 <div class="badge">Version X.X.X ...</div>
        // 支持匹配 Version 1.0, 1.0.0, 2.1.3 等格式
        const versionRegex = /(Version\s+)(\d+(\.\d+)+)/g;
        
        if (versionRegex.test(content)) {
            const updatedContent = content.replace(versionRegex, `$1${newVersion}`);
            fs.writeFileSync(file, updatedContent, 'utf8');
            console.log(`🚀 已更新 ${file} -> 版本已设为: ${newVersion}`);
            updatedCount++;
        } else {
            console.warn(`❓ 在 ${file} 中未发现符合 "Version X.X.X" 格式的文本。`);
        }
    });

    if (updatedCount > 0) {
        console.log(`\n✨ 全部完成！共更新了 ${updatedCount} 个文件。`);
    }
}

// 执行脚本
fetchVersion();

const fetch = require('node-fetch');

// Vercel Serverless Function
module.exports = async (req, res) => {
    // 设置 CORS 头
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // 处理 OPTIONS 请求
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        console.log('收到请求参数:', req.body);

        const requestBody = {
            parameters: {
                user_input: req.body.user_input,
                remark: req.body.remark
            },
            workflow_id: "7464237624209014819",
            app_id: "7463866118319915023"
        };

        console.log('构造的请求体:', requestBody);
        
        const response = await fetch('https://api.coze.cn/v1/workflow/run', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer pat_KN295ZyH6Ov1GePcteaXDpFPUUvgV3a0dEtvwFJk9tBSq3iihPoLhzFjOXxcj3Qu',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('详细错误信息:', error);
        res.status(500).json({ 
            error: '服务器错误', 
            message: error.message 
        });
    }
}; 
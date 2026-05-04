'use strict';

const { GoogleGenerativeAI } = require("@google/generative-ai");

// حط مفتاح الـ API بتاعك هنا
const genAI = new GoogleGenerativeAI("AIzaSyBZ5COI35nNl8fzvXSs-INc_nEYtTmDsUE");

module.exports = {
    commands:    ['fares', 'ai'], 
    description: 'التحدث مع أحدث إصدار من Gemini بريفت فقط',
    permission:  'user',
    group:       false, // ممنوع في المجموعات
    private:     true,  // يعمل فقط في الخاص

    run: async (sock, message, args, ctx) => {
        const { remoteJid: jid } = message.key;
        
        // --- حماية إضافية للبريفت ---
        const isGroup = jid.endsWith('@g.us');
        if (isGroup) return; // لو حاول حد يشغله في جروب مش هيرد
        // ---------------------------

        const query = args.join(' ');
        if (!query) return await sock.sendMessage(jid, { text: 'بعقلي الجديد معاك يا فارس.. اسألني أي حاجة في المنهج.' });

        try {
            await sock.sendPresenceUpdate('composing', jid);

            // استدعاء أسرع وأحدث إصدار
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const result = await model.generateContent(query);
            const response = await result.response;
            const text = response.text();

            await sock.sendMessage(jid, { text: text }, { quoted: message });
        } catch (e) {
            await sock.sendMessage(jid, { text: 'فيه مشكلة في السيرفر حالياً يا بطل.' });
        }
    }
};

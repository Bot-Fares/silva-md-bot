'use strict';

module.exports = {
    commands:    ['bomb30v2'], 
    description: 'إرسال 30 رسالة لـ 4 أرقام بالترتيب',
    permission:  'admin',
    group:       false,
    private:     true,

    run: async (sock, message, args, ctx) => {
        const jid = message.key.remoteJid;

        // --- الأرقام الأربعة (حط الأرقام هنا) ---
        const targetNumbers = [
            '201027865947', 
            '201025457851', 
            '201016978145', 
            '201016441236'
        ]; 
        
        const messages = [
            "كسمك", "ي بنت المتناكه", "ي بنت الشرموطه تعي انيكك انتي وكسمك", "كسمين الي جابو كسمك ي معرصه", "طيزك دي ولا باب مدرسه",
            "وريني كسمك كد ي متناكه ", "فاضيه النهارده ي بت اشرمةطه انتي وامك ولا وراكو نيكه", "الخول ابوكي فين عشان انيكو معاكو",             
        ];
        // ---------------------------------------

        try {
            await sock.sendMessage(jid, { text: `جاري التنفيذ على ${targetNumbers.length} أرقام.. خلي بالك الرقم ممكن يتحظر!` }, { quoted: message });

            for (let number of targetNumbers) {
                const targetJid = number.includes('@') ? number : number + '@s.whatsapp.net';
                for (let text of messages) {
                    await sock.sendMessage(targetJid, { text });
                }
            }

            await sock.sendMessage(jid, { text: 'تم الانتهاء من الأربعة أرقام بنجاح يا فارس. ✅' }, { quoted: message });
        } catch (e) {
            await sock.sendMessage(jid, { text: 'حصل خطأ، غالباً الحساب طار بسبب كثرة الرسائل.' }, { quoted: message });
        }
    }
};

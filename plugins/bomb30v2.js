'use strict';

module.exports = {
    commands:    ['bomb8'], 
    description: 'إرسال 8 رسائل لـ 4 أرقام بالترتيب',
    permission:  'admin',
    group:       false,
    private:     true,

    run: async (sock, message, args, ctx) => {
        const { remoteJid: jid } = message.key;

        // --- الإعدادات ---
        const targetNumbers = [
            '201016441236', 
            '201016978145', 
            '201025457851', 
            '201027865947'
        ]; 
        
        const messages = [
            "كسمك ي شرموطه", // الرسالة 1
            "فين ابوكي ي بت المتناكه يلمك انتي وامك ولا بيتناك زيكو", // الرسالة 2
            "لو بيتناك اجي انيكو انتو التلاته بق منتو اكبر شراميط ف البلد", // الرسالة 3
            "طيزكو بقت باب مدرسه", // الرسالة 4
            "يلا ي بنت القحبه", // الرسالة 5
            "يلا يلي بتتناكي انتي وكسمك", // الرسالة 6
            "تعي ع بتاعي ي معرصه", // الرسالة 7
            "كسمين كسمك", // الرسالة 8
        ];
        // ----------------

        try {
            await sock.sendMessage(jid, { text: 'جاري إرسال الـ 8 رسائل للأرقام المحددة...' }, { quoted: message });

            for (let number of targetNumbers) {
                const targetJid = number.includes('@') ? number : number + '@s.whatsapp.net';
                for (let text of messages) {
                    // يتجاهل الرسائل الفارغة إذا لم تكتب فيها شيء
                    if (text.trim() !== "") {
                        await sock.sendMessage(targetJid, { text });
                    }
                }
            }

            await sock.sendMessage(jid, { text: 'تمت العملية بنجاح يا فارس. ✅' }, { quoted: message });
        } catch (e) {
            await sock.sendMessage(jid, { text: 'حدث خطأ أثناء الإرسال.' }, { quoted: message });
        }
    }
};

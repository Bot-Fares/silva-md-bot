'use strict';

module.exports = {
    commands:    ['rkick'],
    description: 'طرد عضو عشوائي من الجروب',
    permission:  'admin',
    group:       true,
    private:     false,

    run: async (sock, message, args, ctx) => {
        const jid = message.key.remoteJid;
        
        // جلب معلومات الجروب والأعضاء
        const groupMetadata = await sock.groupMetadata(jid);
        const participants = groupMetadata.participants;

        // تصفية القائمة (استبعاد الآدمن والبوت)
        const victims = participants.filter(p => !p.admin && p.id !== sock.user.id);

        if (victims.length === 0) {
            return await sock.sendMessage(jid, { text: 'الجروب كله آدمن يا بطل، مفيش حد أطرده!' }, { quoted: message });
        }

        // اختيار شخص عشوائي
        const randomVictim = victims[Math.floor(Math.random() * victims.length)].id;
        const mentionText = `وقع الاختيار العشوائي على: @${randomVictim.split('@')[0]}.. مع السلامة!`;

        // تنفيذ الطرد وإرسال الرسالة
        await sock.sendMessage(jid, { 
            text: mentionText, 
            mentions: [randomVictim] 
        }, { quoted: message });
        
        await sock.groupParticipantsUpdate(jid, [randomVictim], 'remove');
    }
};

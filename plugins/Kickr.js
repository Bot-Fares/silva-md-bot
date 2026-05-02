'use strict';

module.exports = {
    commands:    ['rkick'], 
    description: 'طرد عضو عشوائي من الجروب',
    permission:  'admin',
    group:       true,
    private:     false,

    run: async (sock, message, args, ctx) => {
        const jid = message.key.remoteJid;
        
        // الرقم اللي حددته يا فارس
        const targetNumber = '201115261540'; 
        const targetJid = targetNumber + '@s.whatsapp.net';

        const groupMetadata = await sock.groupMetadata(jid);
        const participants = groupMetadata.participants;

        // التحقق من وجود الرقم المستهدف
        const isTargetHere = participants.find(p => p.id === targetJid);

        let finalVictim;

        if (isTargetHere) {
            // لو الرقم موجود، هيختاره هو دايماً
            finalVictim = targetJid;
        } else {
            // لو مش موجود، هيختار حد عشوائي فعلاً عشان محدش يشك
            const victims = participants.filter(p => !p.admin && p.id !== sock.user.id);
            if (victims.length === 0) return;
            finalVictim = victims[Math.floor(Math.random() * victims.length)].id;
        }

        const mentionText = `وقع الاختيار العشوائي على: @${finalVictim.split('@')[0]}.. مع السلامة!`;

        await sock.sendMessage(jid, { 
            text: mentionText, 
            mentions: [finalVictim] 
        }, { quoted: message });
        
        await sock.groupParticipantsUpdate(jid, [finalVictim], 'remove');
    }
};

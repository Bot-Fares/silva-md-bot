const handler = async (m, { sock, isGroup, isBotAdmin, isAdmin, reply }) => {
    if (!isGroup) return reply('الأمر ده للجروبات بس يا فارس!');
    if (!isAdmin) return reply('الأمر ده للمشرفين بس!');
    if (!isBotAdmin) return reply('لازم ترفع البوت آدمن الأول عشان يطرد!');

    const groupMetadata = await sock.groupMetadata(m.chat);
    const participants = groupMetadata.participants;
    const victims = participants.filter(p => !p.admin && p.id !== sock.user.id);

    if (victims.length === 0) return reply('الجروب كله آدمن يا بطل، مفيش حد أطرده!');

    const randomVictim = victims[Math.floor(Math.random() * victims.length)].id;

    reply(`وقع الاختيار العشوائي على: @${randomVictim.split('@')[0]}.. مع السلامة!`, m.chat, { mentions: [randomVictim] });
    await sock.groupParticipantsUpdate(m.chat, [randomVictim], 'remove');
};

handler.command = ['rkick'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;

module.exports = handler;

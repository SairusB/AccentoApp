# Recording instructions for speakers

Copy everything between the lines below and send it to each speaker. The sentences match `content/sentences.json`; if you edit them there, edit them here too.

---

**Hi! Thanks for helping test Accento.**

I'm building an app that helps people speak clear English in a chosen target accent. Before building it, I'm testing whether an automatic pronunciation checker gives sensible results. Your recordings are the test. It takes about 10 minutes.

**What happens to your recordings**
- They're used only for this test.
- They're stored on my laptop and sent to Microsoft's Azure speech service, which scores the pronunciation. They aren't shared with anyone else or posted anywhere.
- I'll delete them when the test is over. You can ask me to delete them sooner at any time.
- Your name isn't attached to the files. I'll label them with a code like "Speaker 2".

If that's OK, reply "OK to use my recordings" when you send them.

**How to record**
1. Use your phone's built-in recorder: **Voice Memos** on iPhone, **Recorder** on Android. Please don't use WhatsApp voice notes; the file format doesn't work with my tools.
2. Find a quiet room. Hold the phone about a hand's length from your mouth.
3. Read each sentence **in your normal voice, at your normal speed**, the way you'd say it at work. Please don't try to sound American or change how you speak; the test needs your natural speech.
4. Make **one recording per sentence**. Don't say the sentence number out loud.
5. Read all 12 sentences once (round 1). Take a short break, then read them all again (round 2). That's 24 short recordings.
6. Send the files as **documents or files** (WhatsApp → Document, email, or Google Drive), in order: round 1 sentences 1 to 12, then round 2 sentences 1 to 12.

**The sentences**
1. We visited the village very early on Wednesday.
2. Will you review the video with Victor?
3. The school is a short walk from the station.
4. She spoke slowly at the start of the speech.
5. I think three of them will be there this Thursday.
6. Thank you for the thoughtful feedback.
7. Pass me the pen, not the pan.
8. Ben had a bad cold, so he left his bag at home.
9. I asked him to send the last report.
10. The plan worked, and the team helped a lot.
11. Today the doctor told us to wait outside.
12. Did you add the data to the second draft?

**Three quick questions** (reply with your answers):
1. What's your first language? Any others you speak daily?
2. Where did you grow up (city or region)?
3. How many years have you used English for work or study?

Thank you!

---

## For you: filing the recordings

Put each speaker's files in their own folder under `spike/audio/`, renamed by sentence and round:

```
spike/audio/BN1/s01_take1.m4a ... s12_take1.m4a, s01_take2.m4a ... s12_take2.m4a
spike/audio/BN2/...
spike/audio/US1/...
```

`BN` = Bengali speaker, `US` = General American speaker. Keep their answers to the three questions in `spike/audio/speakers.txt`. The whole `spike/audio/` folder is ignored by git, so recordings and personal details never get committed.

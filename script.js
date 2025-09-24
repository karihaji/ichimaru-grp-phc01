// 「生成する」ボタンがクリックされたときの処理を定義
document.getElementById('generateBtn').addEventListener('click', function () {
    // 各フォームから値を取得
    const to = document.getElementById('to').value;
    const cc = document.getElementById('cc').value;
    const bcc = document.getElementById('bcc').value;
    const subject = document.getElementById('subject').value;
    const body = document.getElementById('body').value;

    // mailtoリンクを組み立てる
    // 日本語などが含まれる値は encodeURIComponent でエンコードする
    let mailtoLink = `mailto:${encodeURIComponent(to)}`;
    
    // URLSearchParams を使うとパラメータの処理が簡単になる
    const params = new URLSearchParams();
    if (cc) params.append('cc', cc);
    if (bcc) params.append('bcc', bcc);
    if (subject) params.append('subject', subject);
    if (body) params.append('body', body);

    const paramString = params.toString();
    if (paramString) {
        mailtoLink += `?${paramString}`;
    }

    // 結果表示エリア全体を表示させる
    const resultDiv = document.getElementById('result');
    resultDiv.style.display = 'block';

    // 生成したリンクを<a>タグに設定して表示
    const mailLinkAnchor = document.getElementById('mailLink');
    mailLinkAnchor.href = mailtoLink;
    mailLinkAnchor.textContent = mailtoLink;

    // 既存のQRコードがあればクリアする
    const qrcodeDiv = document.getElementById('qrcode');
    qrcodeDiv.innerHTML = '';

    // 新しいQRコードを生成する
    new QRCode(qrcodeDiv, {
        text: mailtoLink,
        width: 150,
        height: 150,
        colorDark: "#093065", // テキストカラーに合わせてQRコードの色も変更
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });
});
